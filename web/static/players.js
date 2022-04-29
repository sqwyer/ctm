var playerstate = [];

function getAllPlayerElemsAsArray() {
    let arr = [...playersElem.children[0].children];
    arr.splice(0, 1);
    return arr;
}

function deriveAllPlayers() {
    let og = getAllPlayerElemsAsArray();
    let players = [];
    for(let i = 0; i < og.length; i++) {
        let spec = {};
        for(let k = 1; k < og[i].children.length; k++) {
            spec.num = Number(og[i].children[0].innerText);
            spec.player = og[i].children[1].innerText;
            spec.rating = Number(og[i].children[2].innerText);
        }
        players.push(spec);
    }
    return players;
}

function getPlayerElemById(id) {
    for(let i = 0; i < playersElem.children[0].children.length; i++) {
        let child = playersElem.children[0].children[i];
        if(Number(id) === Number(child.children[0].innerText)) return child;
    }
}

const getSpecificPlayer = getPlayerElemById;
const getSpecPlayer = getPlayerElemById;

function addPlayer(player, rating) {
    let tr = document.createElement('tr');
    let tdN = document.createElement('td');
    let tdR = document.createElement('td');
    let tdP = document.createElement('td');

    tdN.innerText = playersElem.children[0].children.length-1;
    tdN.addEventListener('click', () => clickOnElem(tdN));
    tr.appendChild(tdN);

    tdR.innerText = player;
    tdR.addEventListener('click', () => clickOnElem(tdR));
    tr.appendChild(tdR);

    tdP.innerText = rating;
    tdP.addEventListener('click', () => clickOnElem(tdP));
    tr.appendChild(tdP);

    playersElem.children[0].appendChild(tr);
}

function reload() {
    let col = playersElem.children[0].children;
    for(let i = 1; i < col.length; i++) {
        col[i].children[0].innerText = (i-1).toString();
    }
}