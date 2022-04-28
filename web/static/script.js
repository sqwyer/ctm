function popup(options) {
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
    for(let i = 1; i < children.length-1; i++) {
        let child = children[i];
        let splits = child.innerText.split('\t');
        popup({
            title: 'Edit player',
            message: `
                <input placeholder="Player Name" value="${splits[0]}" type="text">
                <input placeholder="Rating" value="${splits[1]}" type="number">
            `,
            buttons: [
                {type: 'ok', text: 'Save', action: () => {

                }},
                {type: 'exit', text: 'Cancel'}
            ]
        })
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
}

for(let i = 0; i < playersElem.children[0].children.length; i++) {
    let child = playersElem.children[0].children[i];

    child.addEventListener('click', () => clickOnElem(child))
}