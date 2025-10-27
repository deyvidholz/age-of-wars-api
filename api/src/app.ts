import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express, { Application } from 'express';
import { Server } from 'http';
import { createConnection } from 'typeorm';
import * as socketio from 'socket.io';
import path from 'path';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { router } from './routes';
import { playerRepository } from './modules/player/player.repository';
import { TemplateHelper } from './helpers/template.helper';
import countryEventHandlers from './modules/country/country.event-handlers';
import playerEventHandlers from './modules/player/player.event-handlers';
import { onlinePlayerRepository } from './modules/online-player/online-player.repository';

export class App {
  private app: Application;
  private io: socketio.Server;

  constructor() {
    console.log('');
    console.log('Loading application...');

    this.initExpress();
    this.setRoutes();
    this.setPassport();

    this.connect().then(async () => {
      console.log('Application loaded!');
      console.log('');
    });

    this.createDefaultData();
  }

  private initExpress() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: '*' }));
    this.app.use('/', express.static(path.join(__dirname, '..', 'public')));
  }

  private initSocketIo(server: Server) {
    this.io = new socketio.Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    const onConnection = (socket: socketio.Socket) => {
      socket.on('join-room', (payload) => {
        if (!payload.gameId || !payload.playerId) {
          return;
        }

        socket.join(payload.gameId);

        const onlinePlayer = onlinePlayerRepository().create({
          gameId: payload.gameId,
          playerId: payload.playerId,
          socketId: socket.id,
          playerNickname: payload.nickname || payload.gameId,
        });

        onlinePlayerRepository().save(onlinePlayer);
      });

      socket.on('disconnect', async () => {
        const onlinePlayer = await onlinePlayerRepository().findOne({
          socketId: socket.id,
        });

        if (!onlinePlayer) {
          return;
        }

        socket.to(onlinePlayer.gameId).emit('@player-disconnected', {
          player: {
            id: onlinePlayer.playerId,
            nickname: onlinePlayer.playerNickname,
          },
        });

        onlinePlayerRepository().delete(onlinePlayer);
      });

      playerEventHandlers(this.io, socket);
      countryEventHandlers(this.io, socket);
    };

    this.io.on('connection', onConnection);
  }

  private async connect() {
    await createConnection();
  }

  private setRoutes() {
    this.app.use(router);
  }

  private setPassport() {
    const extractJWT = passportJWT.ExtractJwt;
    const JWTStrategy = passportJWT.Strategy;

    const JWTOptions = {
      secretOrKey: process.env.JWT_SECRET_KEY || 'aowisamazing2021!',
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    };

    let strategy = new JWTStrategy(JWTOptions, async function (
      JWTPayload,
      next
    ) {
      const id = JWTPayload.id;
      const player = await playerRepository().findOne(id);

      if (player) {
        next(null, player);
      } else {
        next(null, false);
      }
    });

    passport.use(strategy);
    this.app.use(passport.initialize());
  }

  private createDefaultData() {
    TemplateHelper.saveTemplatesToJSON();
  }

  public start() {
    return new Promise((resolve, reject) => {
      const port: number = +(process.env.PORT as string) || 3000;

      const server = this.app
        .listen(port, () => {
          resolve(console.log(`Application running on ${port}`));
        })
        .on('error', (err: Object) => reject(err));

      this.initSocketIo(server);
    });
  }
}
