const canvasParent = document.querySelector("body");

// 1. retina 확인 함수
const windowPixelScale = (c) => {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio; // retina
        }
    }
    return 1; // not retina = 1.0
}

// 2. canvas 만들기
let canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-9999";
canvasParent.appendChild(canvas);

// 2-1. canvas.style 설정
canvas.style.width = "100%";
canvas.style.height = "100%";

// 2-2. Retina 적용
let ctx = canvas.getContext("2d");
let scaleFactor = windowPixelScale(ctx);

if (scaleFactor > 1) {
    canvas.width = window.innerWidth * scaleFactor;
    canvas.height = window.innerHeight * scaleFactor;
    ctx = canvas.getContext("2d");
    window.onresize = (e) => {
        e.preventDefault();
        canvas.width = window.innerWidth * scaleFactor;
        canvas.height = window.innerHeight * scaleFactor;
    }
} else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    window.onresize = (e) => {
        e.preventDefault();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function canvasHide() {
    canvas.style.opacity = "1.0";
    // setTimeout(() => {
    //     canvas.style.opacity = "0";
    //     canvas.style.zIndex = "-9999";
    // }, 1200);
}

const makeRanNum = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// resize 좌표 유지
// window.addEventListener("resize", makeCanvas);

// // canvas 그리기
// const preloader_Out = document.querySelector(`#js-preloader`);
// function transitionedCheck(e) {
//     if (e.target.style.transform == `translateY(200%)`) {
//         preloader_Out.removeEventListener(`transitionend`, transitionedCheck);
//         setTimeout(() => {
//             makeClickClue();
//             ClickClueOpacity_1();
//         }, 1200);
//     }
// }

// preloader_Out.addEventListener(`transitionend`, transitionedCheck);

let iconArry = [];
let iconNum = 48;
let fontValue = Math.floor((window.innerWidth * scaleFactor) / 12);
let delay = 20;

class makeIcon {
    constructor(x, y, dy, acceleration, txt, opacity) {
        this._x = x;
        this._y = y;
        this._dy = dy;
        this._acceleration = acceleration;
        this._txt = txt;
        this._opacity = opacity;
        this._opacityValue = 1;
    }

    draw() {
        ctx.font = `${fontValue}px Roboto`;;
        ctx.fillStyle = `rgba(0, 0, 0,${this._opacityValue}`;
        ctx.fillText(this._txt, this._x, this._y);
    }

    update() {
        this._y = this._y - (this._dy + ((this._acceleration / 60) * 5));
        ++this._acceleration;

        this._opacityValue = (this._opacity + delay) * 0.01;
        --this._opacity;

        this.draw();
    }
}

const iconPush = () => {
    let s = scaleFactor;

    for (let i = 0; i < iconNum; i++) {
        let x = makeRanNum(window.innerWidth * s, 0),
            y = makeRanNum(window.innerHeight * s + (fontValue * 8), window.innerHeight * s + fontValue),
            dy = makeRanNum(6, 10),
            acceleration = 2,
            txt = `🔥`,
            opacity = 100; // icon 받아올 자리

        iconArry.push(new makeIcon(x, y, dy, acceleration, txt, opacity));
    }
}

const animate = () => {
    let s = scaleFactor;

    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width * s, canvas.height * s);

    for (let i = 0; i < iconArry.length; i++) {
        iconArry[i].update()
    }
}

iconPush();
animate();