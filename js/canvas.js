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
// canvas.style.opacity = "0";
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

// 3. canavas 그리기
// function makeCanvas() {
//     let c = ctx;
//     let s = scaleFactor;

//     c.fillStyle = 'rgba(0, 0, 200, 0.5)';
//     c.fillRect(0, 0, window.innerWidth * s, window.innerHeight * s);
// }

// makeCanvas();
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
let limit = 64;

class makeIcon {
    constructor(x, y, dx, dy, acceleration, txt, direction) {
        this._x = x
        this._y = y
        this._dx = dx
        this._dy = dy
        this._acceleration = acceleration
        this._txt = txt
        this._c = x
        this._direction = direction
    }

    draw() {
        ctx.font = `120px Roboto`;
        ctx.fillText(this._txt, this._x, this._y)
    }

    update() {
        this._y -= this._dy * this._acceleration

        if (this._x < this._c - limit) {
            this._direction = 1;
        } else if (this._x > this._c + limit) {
            this._direction = -1;
        }

        this._x = this._x + (this._dx * this._direction);

        this.draw();
    }
}

const iconPush = () => {
    let s = scaleFactor;

    for (let i = 0; i < iconNum; i++) {
        let x = makeRanNum(window.innerWidth * s, 0),
            y = makeRanNum(window.innerHeight * s + 500, window.innerHeight * s),
            dx = makeRanNum(4, 8),
            dy = makeRanNum(6, 12),
            acceleration = 1.5,
            txt = `🔥`, // icon 받아올 자리
            direction = 1;
9.8 - 19.2 - 28.8
        iconArry.push(new makeIcon(x, y, dx, dy, acceleration, txt, direction));
    }
    console.log(iconArry);
}

iconPush();

const animate = () => {
    let s = scaleFactor;

    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width * s, canvas.height * s);

    for (let i = 0; i < iconArry.length; i++) {
        iconArry[i].update()
    }
    // console.log(iconArry[0]._acceleration);
}
animate();