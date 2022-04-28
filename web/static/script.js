function popup(options) {

    if(document.getElementById('popup')) document.getElementById('popup').remove();

    let title = options.title || null;
    let message = options.message || null;
    let buttons = options.buttons || null;
    let _div = () => document.createElement('div');
    let _p = () => document.createElement('p');
    let div = _div();

    div.className = 'popup';
    div.id = 'popup';

    let overlay = _div();
    overlay.id = 'full-overlay';
    overlay.onclick = () => {
        overlay.remove();
        div.remove();
    }

    if(title && title != null) {
        let section = _div();
        let content = _p();
        content.innerHTML = title;
        content.className = 'title'
        section.appendChild(content);
        div.appendChild(section);
    }

    if(message && message != null) {
        let section = _div();
        let content = _p();
        content.innerHTML = message;
        section.appendChild(content);
        div.appendChild(section);
    }

    if(buttons && buttons != [] && buttons != null) {
        let section = _div();
        section.className = 'buttons';
        for(let i = 0; i < buttons.length; i++) {
            let btn = document.createElement('button');
            if(buttons[i].type) {
                switch (buttons[i].type) {
                    case 'exit':
                        btn.className = 'btn-exit';
                        btn.innerText = buttons[i].text || 'Close';
                        btn.onclick = (...e) => {
                            if(buttons[i].action) buttons[i].action(...e);
                            overlay.remove();
                            div.remove();
                        }
                        break;
                    default:
                        btn.className = buttons[i].class ||'btn-ok';
                        btn.innerText = buttons[i].text || 'Close';
                        btn.onclick = (...e) => {
                            if(buttons[i].action) buttons[i].action(...e);
                            overlay.remove();
                            div.remove();
                        }
                        break;
                }
            }
            section.appendChild(btn);
        }
        div.appendChild(section);
    }
    document.body.appendChild(overlay);
    document.body.appendChild(div);
}

// popup({
//     title: 'Some title',
//     message: 'Hello there, this is a test popup!',
//     buttons: [
//         {type: 'ok', text: 'Hi!', class: 'btn-ok', action: () => {
//             alert('hi!');
//         }},
//         {type: 'exit', text: 'Close'}
//     ]
// });

let playersElem = document.getElementById('players');

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

                // console.log(getPlayerElemById(splits[0]));
            }},
            {type: 'exit', text: 'Cancel'}
        ]
    })

    // popup({
    //     title: 'Some title',
    //     message: 'Hello there, this is a test popup!',
    //     buttons: [
    //         {type: 'ok', text: 'Hi!', class: 'btn-ok', action: () => {
    //             alert('hi!');
    //         }},
    //         {type: 'exit', text: 'Close'}
    //     ]
    // });
}

function addPlayer(player, rating) {
    let tr = document.createElement('tr');
    let tdR = document.createElement('td');
    let tdP = document.createElement('td');

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

function getPlayerElemById(id) {
    for(let i = 0; i < playersElem.children[0].children.length; i++) {
        let child = playersElem.children[0].children[i];
        if(Number(id) === Number(child.children[0].innerText)) return child;
    }
}

for(let i = 1; i < playersElem.children[0].children.length; i++) {
    let child = playersElem.children[0].children[i];
    for(let k = 0; k < child.children.length; k++) {
        let childLast = child.children[k];
        childLast.addEventListener('click', () => clickOnElem(childLast))
    }
}