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
        content.innerText = title;
        content.className = 'title'
        section.appendChild(content);
        div.appendChild(section);
    }

    if(message && message != null) {
        let section = _div();
        let content = _p();
        content.innerText = message;
        section.appendChild(content);
        div.appendChild(section);
    }

    if(buttons && buttons != [] && buttons != null) {
        let section = _div();
        section.className = 'buttons';
        for(let i = 0; i < buttons.length; i++) {
            let btn = document.createElement('button');
            if(buttons[i].type) {
                console.log(buttons[i].type)
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

popup({
    title: 'Some title',
    message: 'Hello there, this is a test popup!',
    buttons: [
        {type: 'ok', text: 'Hi!', class: 'btn-ok', action: () => {
            alert('hi!');
        }},
        {type: 'exit', text: 'Close'}
    ]
});