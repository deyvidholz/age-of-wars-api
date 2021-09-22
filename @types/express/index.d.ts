import { Request } from 'express';
import { Player } from '../../src/modules/player/player.entity';

declare module 'express' {
  export interface Request {
    user: Player;
    uploadedFileName: string;
  }
}
