import { PathLike, readFile, writeFile } from 'fs';

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

function parse(content: string) {
    let lines = content.split('\n');
    let result: Array<any> = [];
    let keys = lines[0].split(',').map((self: string) => self.trim());
    lines.splice(0, 1);
    for(let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(',');
        let self: any = {_line: i+1};
        for(let k = 0; k < parts.length; k++) {
            self[keys[k].toLowerCase()] = parts[k];
        }
        result.push(self);
    }
    return result;
}

function pair(list: Array<Player>, next?: Function) {
    list.sort((a, b) => Number(b.rating) - Number(a.rating));
    let pairs = [];
    if (list.length % 2 != 0) {
        pairs.push([list[list.length-1], {player: null, rating: null, score: null, _line: null}]);
        list.splice(list.length, 1);
    }
    let split = [list.splice(0, list.length/2), list];
    for(let i = 0; i < split[0].length; i++) {
        pairs.unshift([split[0][i], split[1][i]]);
    }
    if(next) next(pairs);
    return pairs;
}

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

    public printPairs(pairs: Pairings, path: PathLike, next?: Function) {
        let content = `Score,White,Score,Black`;
        for(let i = 0; i < pairs.length; i++) {
            content+=`\n${pairs[i][0].score},${pairs[i][0].player},${pairs[i][1].score},${pairs[i][1].player}`;
        }
        writeFile(path, content, (...args) => {
            if(next) next(...args);
            else if(args[0]) throw args[0];
        });
    }

    public getLinesFromPlayer(player: string) {
        return this.users.filter(self => self.player === player).map(s => s._line);
    }

    public assignScore(line: number, score: number) {
        console.log(this.users);
        let elem = this.users.find(self => self._line === line);
        let index = this.users.indexOf(elem);

        this.users[index].score = score;
    }
}

export { Tourney, parse, pair };
