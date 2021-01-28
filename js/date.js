const dateCont = document.querySelector(`#js-date`);

const hourCont = document.querySelector("#js-hour"),
    minuteCont = document.querySelector("#js-minute"),
    secondCont = document.querySelector("#js-second");

const Month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

const week = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`]

const getTime = () => {
    const date = new Date();
    const yyyy = date.getFullYear(),
        mm = date.getMonth() + 1,
        dd = date.getDate(),
        day = date.getDay();

    dateCont.innerText = `${yyyy}. ${mm}. ${dd < 10 ? `0${dd}` : dd} ${week[day
    ]}`;
}

function init() {
    getTime();
    setInterval(getTime, 10000);
}

init();