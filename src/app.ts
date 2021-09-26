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
    this.app.use(cors());
    this.app.use('/', express.static(path.join(__dirname, '..', 'public')));
  }

  private initSocketIo(server: Server) {
    this.io = new socketio.Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
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
      secretOrKey: process.env.JWT_SECRET_KEY,
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
