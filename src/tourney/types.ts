import { PathLike } from 'fs';

type Player = {
    _line: number,
    player: string,
    rating: any,
    score?: number
}

type Pairings = Array<Array<Player>>;

type PlayerFile = {
    path: PathLike,
    content: Array<Player>
}

export { Player, Pairings, PlayerFile };