const memoCont = document.querySelector(`#js-memo-cont`);
const memoBtn = document.querySelector(`#js-memo-btn`);

function autoSizeTextarea(a, b) {
    a.style.height = 'auto';
    let newHeight = (a.scrollHeight > b ? a.scrollHeight : b);
    a.style.height = newHeight.toString() + 'px';
}

const makeMemo = () => {
    let li = document.createElement("li");
    let div = document.createElement("div");
    let spanBtn = document.createElement("span");
    let spanCont = document.createElement("span");
    let txtarea = document.createElement("textarea");

    div.classList.add(`txtarea-cont2`);
    div.classList.add(`--surface1`);

    spanBtn.classList.add(`btn1`);
    spanCont.classList.add(`txtarea-cont2-1`);
    spanCont.classList.add(`--surface1`);
    spanBtn.style.cursor = 'pointer';
    spanBtn.addEventListener(`click`, delMemo);

    txtarea.classList.add(`txtarea2`);
    txtarea.classList.add(`-body1`);
    txtarea.classList.add(`js-memo`);

    txtarea.rows = "1";
    txtarea.style.height = "26px";
    txtarea.addEventListener(`keyup`, e => autoSizeTextarea(txtarea, 26));

    li.appendChild(div);
    div.appendChild(spanBtn);
    div.appendChild(spanCont);
    spanCont.appendChild(txtarea);

    memoCont.appendChild(li);
}

const delMemo = (e) => {
    e.preventDefault();
    let li = e.target.parentElement.parentElement;
    memoCont.removeChild(li);
}

memoBtn.addEventListener(`click`, makeMemo);


// const toggleMemo = () => {
//     if (memo.parentElement.parentElement.classList.contains(`hide`)) {
//         memoBtn.children[1].innerHTML = `-`;
//     } else {
//         memoBtn.children[1].innerHTML = `+`;
//     }
//     memo.parentElement.parentElement.classList.toggle(`hide`);
// }
