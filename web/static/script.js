function clickOnElem(elem) {
    let parent = elem.parentElement;
    let children = parent.children;
    
    console.log(children);

    let splits = [...children].map(self => self.innerText);

    popup({
        title: `Edit player #${splits[0]}`,
        message: `
            <input id="edit-name" placeholder="Player Name" value="${splits[1]}" type="text">
            <input id="edit-rating" placeholder="Rating" value="${splits[2]}" type="number">
        `,
        buttons: [
            {type: 'ok', text: 'Save', action: () => {
                let name = document.getElementById('edit-name').value;
                let rating = document.getElementById('edit-rating').value;

                let elem = getPlayerElemById(splits[0]);

                elem.children[1].innerText = name;
                elem.children[2].innerText = rating;
            }},
            {type: 'exit', text: 'Delete User', action: () => {
                getPlayerElemById(splits[0]).remove();
                reload();
            }},
            {type: 'exit', text: 'Cancel'}
        ]
    })
}

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

function addPlayerPopup() {
    popup({
        title: 'Add new player',
        message: `
            <input id="create-name" placeholder="Player Name" type="text">
            <input id="create-rating" placeholder="Rating" type="number">
        `,
        buttons: [
            {type: 'ok', text: 'Save', action: () => {
                let name = document.getElementById('create-name').value;
                let rating = document.getElementById('create-rating').value;

                addPlayer(name, rating);
            }},
            {type: 'exit', text: 'Cancel'}
        ]
    })
}

for(let i = 1; i < playersElem.children[0].children.length; i++) {
    let child = playersElem.children[0].children[i];
    for(let k = 0; k < child.children.length; k++) {
        let childLast = child.children[k];
        childLast.addEventListener('click', () => clickOnElem(childLast))
    }
}