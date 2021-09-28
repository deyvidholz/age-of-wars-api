import express from 'express';
import passport from 'passport';
import { CountryController } from './modules/country/country.controller';
import { GameController } from './modules/game/game.controller';
import { PlayerController } from './modules/player/player.controller';
import { ShopController } from './modules/shop/shop.controller';

const router = express.Router();

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
  '/games/find/:gameId',
  passport.authenticate('jwt', { session: false }),
  GameController.find
);

router.get(
  '/games/start/:gameId',
  passport.authenticate('jwt', { session: false }),
  GameController.startGame
);

router.get(
  '/games/start-picking-phase/:gameId',
  passport.authenticate('jwt', { session: false }),
  GameController.startPickingPhase
);

router.get(
  '/games/force-next-turn',
  passport.authenticate('jwt', { session: false }),
  GameController.forceNextTurn
);

router.post(
  '/games/next-turn',
  passport.authenticate('jwt', { session: false }),
  GameController.nextTurn
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

// Shop routes
router.post(
  '/shop/order',
  passport.authenticate('jwt', { session: false }),
  ShopController.buy
);

router.post(
  '/shop/get-order-price',
  passport.authenticate('jwt', { session: false }),
  ShopController.getOrderPrice
);

router.post(
  '/shop/get-improvement-province-price',
  passport.authenticate('jwt', { session: false }),
  ShopController.getProvincesImprovementPrice
);

// Country routes
router.get(
  '/countries/provinces/:mapRef',
  passport.authenticate('jwt', { session: false }),
  CountryController.getProvince
);

export { router };
