import { PathLike, readFile, writeFile } from 'fs';
import { parse } from './tourney/csv';
import { pair } from './tourney/pair';
import { Player, PlayerFile, Pairings } from './tourney/types';

class Tourney {
    public users: Array<Player> = [];
    public files: Array<PlayerFile> = [];

    public generatrPairs(next?: Function) {
        return pair(this.users, next || undefined);
    }

    public addCsvFile(path: PathLike, next?: Function) {
        readFile(path, (err?: NodeJS.ErrnoException|null, data?: Buffer|null) => {
            if(err) {
                if(next) next(err, null);
                else throw err;
            }
            else if(data) {
                let parsed = parse(data.toString());
                this.files.push({path, content: parsed});
                this.users = [...this.users, ...parsed];
                if(next) next(null, parsed);
            }
        });
    }

    public addPlayer(player: Player) {
        this.users.push(player);
    }

    public printPairs(pairs: Pairings, path: PathLike, next?: Function) {
        let content = `Board,ScoreW,White,ScoreB,Black`;
        for(let i = 0; i < pairs.length; i++) {
            content+=`\n${i+1},${pairs[i][0].score},${pairs[i][0].player},${pairs[i][1].score},${pairs[i][1].player}`;
        }
        writeFile(path, content, (...args) => {
            if(next) next(...args);
            else if(args[0]) throw args[0];
        });
    }
}

export { Tourney, parse, pair };
