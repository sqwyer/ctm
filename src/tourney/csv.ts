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

export { parse }