const txtarea = document.querySelector(`#js-txtarea`);
const pushBtn = document.querySelector(`#js-push-btn`);
const todoCont = document.querySelector(`#js-todo-cont`);
const editBtn = document.querySelector(`#js-edit-btn`);
const delAllBtn = document.querySelector(`#js-delAll-btn`);

let todoArry = [];

function autoSizeTextarea(a, b) {
    a.style.height = 'auto';
    let newHeight = (a.scrollHeight > b ? a.scrollHeight : b);
    a.style.height = newHeight.toString() + 'px';
}

txtarea.rows = "1";
txtarea.style.height = "32px";
txtarea.addEventListener(`keyup`, e => autoSizeTextarea(txtarea, 32));

let icons = [`📮`, `🔨`, `👀`, `👻`, `📌`, `🧷`, `🖊`, `🕓`, `🔥`, `🎱`, `🤔`, `💩`];

const makeRandomIcon = () => {
    let max = 10;
    let min = 1;
    return icons[Math.floor(Math.random() * (max - min + 1)) + min];
}


const pushTodo = () => {
    if (txtarea.value) {
        let txt = txtarea.value;
        let txtMemo;
        let memoCont = document.querySelector(`#js-memo-cont`);

        if (memoCont.hasChildNodes()) {
            let memos = document.querySelectorAll(`.js-memo`);

            txtMemo = [];
            for (let i = 0; i < memos.length; i++) {
                txtMemo.push(memos[i].value);
            }

        } else {
            txtarea.value = "";
        }

        makeTodo(todoArry.length + 1, null, txt, txtMemo, `set`);

        while (memoCont.hasChildNodes()) {
            memoCont.removeChild(memoCont.lastChild);
        }
    }
}

const makeTodo = (idx, emoji, txt, memo, setOrRead) => {
    if (todoArry.length == 0) {
        todoCont.children[0].remove();
    }

    let li = document.createElement(`li`);
    let icon = document.createElement(`div`);
    let txtCont = document.createElement(`dis`);
    let title = document.createElement(`p`);

    li.id = idx;
    li.appendChild(icon);
    li.appendChild(txtCont);
    li.addEventListener(`click`, finishWork);

    txtCont.appendChild(title);

    if (memo) {
        let memoArry = [];
        for (let i = 0; i < memo.length; i++) {
            memoArry[i] = document.createElement(`p`);
            memoArry[i].innerHTML = memo[i];
            memoArry[i].classList.add(`-body1`);
            memoArry[i].classList.add(`todo-memo`);
            txtCont.appendChild(memoArry[i]);
        }
    }

    txtCont.classList.add(`txt-cont`);
    icon.classList.add(`icon`);

    if (emoji) {
        icon.innerHTML = emoji
    } else {
        icon.innerHTML = makeRandomIcon(); // icon 바꾸기
    }

    title.classList.add(`-h2`);
    title.classList.add(`todo-title`);
    title.innerHTML = txt;


    todoCont.appendChild(li);

    if (setOrRead == `set`) {
        li.classList.add(`test`);

        let todoObj = {
            id: todoArry.length + 1,
            emoji: icon.innerHTML,
            title: txt,
            body: memo
        };

        todoArry.push(todoObj);
        localStorage.setItem(`todoArry`, JSON.stringify(todoArry));
    }
}

const defaultValue = () => {
    if (todoArry.length == 0) {
        let div = document.createElement(`div`);
        div.innerHTML = `local storage is empty`;
        div.style.backgroundColor = `red`;
        todoCont.appendChild(div);
    }
}

const loadIx = (end) => {
    let i = 0;
    let interval = setInterval(() => {
        if (i < end) {
            todoCont.children[i].classList.add(`test`); // 바꾸기
            i++
        } else if (i == end) {
            clearInterval(interval);
        }
    }, 100);
}

const loadTodo = () => {
    if (localStorage.getItem(`todoArry`)) {
        let loaded = JSON.parse(localStorage.getItem(`todoArry`));
        todoArry = loaded;
        // console.log(todoArry);

        if (todoArry.length !== 0) {
            todoArry.forEach(item => {
                makeTodo(item.id, item.emoji, item.title, item.body, `read`);
            });
        }
        loadIx(todoArry.length);
    }
    defaultValue();
}

const delTodo = (e) => {
    let targetId = e.target.parentElement.id;

    todoCont.removeChild(e.target.parentElement);

    let todoArry_del = todoArry.filter(item => {
        return item.id != targetId;
    });

    for (let i = 0; i < todoArry_del.length; i++) {
        todoArry_del[i].id = i;
    }

    todoArry = todoArry_del;

    localStorage.setItem(`todoArry`, JSON.stringify(todoArry));

    for (let i = 0; i < todoCont.children.length; i++) {
        todoCont.children[i].id = i;
    }
    defaultValue();
}

const showDelBtn = () => {
    showDelAllBtn();
    if (editBtn.innerHTML == edit_before) {
        if (todoCont.children) {
            let icon = document.querySelectorAll(`.icon`);
            for (let i = 0; i < todoArry.length; i++) {
                icon[i].innerHTML = icon_del;
                icon[i].addEventListener(`click`, delTodo);
            }
        }
        editBtn.innerHTML = edit_after;

    } else if (editBtn.innerHTML == edit_after) {
        if (todoCont.children) {
            let icon = document.querySelectorAll(`.icon`);
            for (let i = 0; i < todoArry.length; i++) {
                icon[i].innerHTML = icon_do;
                icon[i].removeEventListener(`click`, delTodo);
            }
        }
        editBtn.innerHTML = edit_before;
    }
}

delAllBtn.classList.add(`hide`);

const showDelAllBtn = () => {
    delAllBtn.classList.toggle(`hide`);
}

const delAll = () => {
    todoArry = [];
    localStorage.setItem(`todoArry`, JSON.stringify(todoArry));

    while (todoCont.hasChildNodes()) {
        todoCont.removeChild(todoCont.firstChild);
    }

    defaultValue();
}

const finishWork = () => {
    console.log(1)
}

pushBtn.addEventListener(`click`, pushTodo);
const edit_before = "편집";
const edit_after = "아몰랑";
const icon_do = "icon";
const icon_del = "del";

loadTodo();
editBtn.addEventListener(`click`, showDelBtn);
delAllBtn.addEventListener(`click`, delAll);