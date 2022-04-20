import { Player } from './types';

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

export { pair };