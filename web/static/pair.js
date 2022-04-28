function pair(list, next) {
    list.sort((a, b) => Number(b.rating) - Number(a.rating));
    let pairs = [];
    if (list.length % 2 != 0) {
        pairs.push([list[list.length-1], {player: null, rating: null, score: null, id: null}]);
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

    // get all players

    // create pairings

    // append pairings

    tableE.appendChild(table);

    document.getElementById('pairings-slot').innerHTML = '';
    document.getElementById('pairings-slot').appendChild(tableE);
}