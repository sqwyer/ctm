function pair(list, next) {
    list.sort((a, b) => Number(b.rating) - Number(a.rating));
    let pairs = [];
    if (list.length % 2 != 0) {
        pairs.push([list[list.length-1], {player: null, rating: null, score: null, num: null}]);
        list.splice(list.length, 1);
    }
    let split = [list.splice(0, list.length/2), list];
    for(let i = 0; i < split[0].length; i++) {
        pairs.unshift([split[0][i], split[1][i]]);
    }
    if(next) next(pairs);
    return pairs;
}

function makePairing() {
    let tableE = document.createElement('table');
    tableE.innerHTML = '<br />'
    let table = document.createElement('tbody');
    
    tableE.id = 'pairings';

    let headerRow = document.createElement('tr');
    let header1 = document.createElement('th');
    let header2 = document.createElement('th');
    let header3 = document.createElement('th');
    let header4 = document.createElement('th');
    let header5 = document.createElement('th');
    let header6 = document.createElement('th');

    header1.innerText = '#'
    header2.innerText = 'BlackScore'
    header3.innerText = 'BlackPlayer'
    header4.innerText = '#'
    header5.innerText = 'WhiteScore'
    header6.innerText = 'WhitePlayer'

    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);
    headerRow.appendChild(header5);
    headerRow.appendChild(header6);

    table.appendChild(headerRow);

    let players = deriveAllPlayers();
    let pairs = pair(players);
    pairs.map(pair => {
        return pair.map(player => {
            for(let key in player) {
                if(player[key] === undefined || player[key] === null)  player[key] = 'Waiting'
            }
            return player;
        })
    })
    for(let i = 0; i < pairs.length; i++) {
        let row = document.createElement('tr');
        let n1 = document.createElement('td');
        // console.log(pairs[i]);

        n1.innerText = pairs[i][0].num;
        let n2 = document.createElement('td');
        n2.innerText = pairs[i][1].num;

        let s1 = document.createElement('td');
        // s1.innerText = pairs[i][0].rating;
        s1.innerText = '0.0';
        let s2 = document.createElement('td');
        // s2.innerText = pairs[i][1].rating;
        s2.innerText = '0.0';

        let p1 = document.createElement('td');
        p1.innerText = pairs[i][0].player;
        let p2 = document.createElement('td');
        p2.innerText = pairs[i][1].player;

        n1.className = 'no-hover';
        n2.className = 'no-hover';
        p1.className = 'no-hover';
        p2.className = 'no-hover';

        s1.addEventListener('click', () => {});
        s2.addEventListener('click', () => {});

        row.appendChild(n1);
        row.appendChild(s1);
        row.appendChild(p1);
        row.appendChild(n2);
        row.appendChild(s2);
        row.appendChild(p2);

        table.appendChild(row);
    }

    tableE.appendChild(table);

    document.getElementById('pairings-slot').innerHTML = '';
    document.getElementById('pairings-slot').appendChild(tableE);
}