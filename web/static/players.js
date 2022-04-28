var playerstate = [];

function getAllPlayers() {}

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