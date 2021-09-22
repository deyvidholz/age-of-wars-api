import express from 'express';
import passport from 'passport';
import { GameController } from './modules/game/game.controller';
import { PlayerController } from './modules/player/player.controller';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello world'));

// Player routes
router.post('/players/auth', PlayerController.auth);

router.post(
  '/players/join-game',
  passport.authenticate('jwt', { session: false }),
  PlayerController.joinGame
);

router.post(
  '/players/pick-country',
  passport.authenticate('jwt', { session: false }),
  PlayerController.pickCountry
);

router.post('/players', PlayerController.create);

router.put(
  '/players',
  passport.authenticate('jwt', { session: false }),
  PlayerController.update
);

// Game routes

router.get(
  '/games/start',
  passport.authenticate('jwt', { session: false }),
  GameController.startGame
);

router.get(
  '/games/start-picking-phase',
  passport.authenticate('jwt', { session: false }),
  GameController.startPickingPhase
);

router.get(
  '/games/force-next-turn',
  passport.authenticate('jwt', { session: false }),
  GameController.forceNextTurn
);

router.get(
  '/games',
  passport.authenticate('jwt', { session: false }),
  GameController.getGames
);

router.delete(
  '/games/:gameId',
  passport.authenticate('jwt', { session: false }),
  GameController.delete
);

router.post(
  '/games/kick-player',
  passport.authenticate('jwt', { session: false }),
  GameController.kickPlayer
);

router.post(
  '/games',
  passport.authenticate('jwt', { session: false }),
  GameController.create
);

export { router };
