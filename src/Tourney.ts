import { PathLike, readFile } from 'fs';

function parse(content: string) {
    let lines = content.split('\n');
    let result: Array<any> = [];
    let keys = lines[0].split(',').map((self: string) => self.trim());
    lines.splice(0, 1);
    for(let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(',');
        let self: any = {};
        for(let k = 0; k < parts.length; k++) {
            console.log(keys[k]);
            self[keys[k]] = parts[k];
        }
        result.push(self);
    }
    return result;
}

class Tourney {
    public users: Array<any> = [];
    public files: Array<any> = [];

    public addFile(path: PathLike, next?: Function) {
        readFile(path, (err?: NodeJS.ErrnoException|null, data?: Buffer|null) => {
            if(err) {
                if(next) next(err, null);
                else throw err;
            }
            else if(data) {
                if(next) {
                    let parsed = parse(data.toString());
                    this.files.push(parsed);
                    next(null, parsed)
                } else this.files.push(parse(data.toString()));
            }
        });
    }
}

export { Tourney };