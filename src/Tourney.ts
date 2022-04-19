import { PathLike, readFile } from 'fs';

function parse(content: string) {
    let lines = content.split('\n');
    // lines.map(self => self.substring(0, self.length - 2));
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

function pair(list: Array<any>, next?: Function) {
    list.sort((a, b) => b.rating - a.rating);
    if (list.length % 2 != 0) list.splice(0, 1);
    let split = [list.splice(0, list.length/2), list];
    let pairs = [];
    for(let i = 0; i < list.length/2; i++) {
        pairs.push([split[0][i], split[1][i]]);
    }
    if(next) next(pairs);
    return pairs;
}

class Tourney {
    public users: Array<any> = [];
    public files: Array<any> = [];

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
}

export { Tourney, parse, pair };
