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
function makeCanvas() {
    let c = ctx;
    let s = scaleFactor;

    console.log(c);


    // Rect 그리기
    // let Cx = ClueX + ClueWidth / 2,
    //     Cy = ClueY + ClueHeight / 2,
    //     Cwidth = 220,
    //     Cmargin = 32;

    // let X = Cx - (Cwidth / 2 + Cmargin) * s,
    //     Y = Cy - (Cwidth / 2 + Cmargin) * s,
    //     width = (Cwidth + Cmargin * 2) * s;

    c.fillStyle = 'rgba(0, 0, 0, 1.0)';
    // c.fillRect(0, 0, window.innerWidth * s, window.innerHeight * s);
    // c.clearRect(100, 100, 400, 400);

    let icon_Xpos = makeRanNum(window.innerWidth, 0);
    icon_Ypos = window.innerHeight - 200;
    console.log(icon_Xpos, icon_Ypos);

    // let icon = `🔥`; // icon 데이터 받기
    // c.font = `80px Roboto`;

    for(let i = 0; i < makeRanNum(30,10); i++){
         c.fillText(icon, icon_Xpos, icon_Ypos);
    }  
    // Click txt 그리기 
    // let font = "700 32px Montserrat, 'san-selif'",
    //     message = "Click",
    //     fontX = X + width / 2,
    //     fontY = Y + width,
    //     fontMargin = 32 * s;

    // c.fillStyle = "rgba(255, 255, 255, 1.0)";
    // c.textAlign = "center";
    // c.textBaseline = "Top";
    // c.font = font;
    // c.fillText(message, fontX, fontY + fontMargin);
}
makeCanvas();
// resize 좌표 유지
window.addEventListener("resize", makeCanvas);

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
let icon;
let speed;

for (let i = 0; makeRanNum(30,10); i++){

}

class icon {
    constructor(x){
        this._x = makeRanNum(window.innerWidth, 0);
        this._y = window.innerHeight + 30;
        this._txt = `🔥`,
    }
}

// let ballsArr = []
// var ball;
// var gravity = 1.5;
// var friction = 0.8;
// var bounce = 0.8;
// let ballWidth = 32;

// function ballTank() {
//     ballsArr = []
// }

// ballTank();

// function init2() {
//     console.log(canvas.width);
//     if (canvas.width < 1200) {
//         ballWidth = 24;
//     }
//     for (let i = 0; i < 6; i++) {
//         var radius =
//             (Math.floor(generateRandom(3, 5) * ballWidth) + 5) * 2,
//             x, y,
//             dx = (Math.random() - 0.5) * 50,
//             dy = -28,
//             color = 'rgba(47,117,255,' + generateRandom(6, 9) / 10 + ')'
//         ballsArr.push(new Ball(x, y, dx, dy, radius, color))
//     }
// }

// function animate() {
//     window.requestAnimationFrame(animate);
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     for (let i = 0; i < ballsArr.length; i++) {
//         ballsArr[i].update()
//     }
// }

// animate();

// class Ball {
//     constructor(x, y, dx, dy, radius, color, stroke) {
//         this._x = canvas.width / 2
//         this._y = canvas.height / 2
//         this._dx = dx
//         this._dy = dy
//         this._radius = radius
//         this._color = color
//     }

//     draw() {
//         c.beginPath()
//         c.arc(this._x, this._y, this._radius, 0, Math.PI * 2)
//         c.fillStyle = this._color
//         c.fill()
//         c.closePath()
//     }

//     update() {
//         if (this._y + this._radius + this._dy > canvas.height) {
//             this._dy = -this._dy * friction
//             this._dx = this._dx * friction

//         } else {
//             this._dy += gravity
//             this._radius = this._radius

//         }
//         if (this._x + this._radius > canvas.width || this._x - this._radius < 0) this._dx = -this._dx
//         if (this._dy < 0.5 && this._dy > -5.5)
//             this._dy = 0;
//         if (Math.abs(this._dx) < 2.1)
//             this._dx = 0;

//         this._y += this._dy
//         this._x += this._dx
//         this.draw()
//     }
// }