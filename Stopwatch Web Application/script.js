let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');

let startTimer; // Variable to hold the setInterval reference
let hr = "00";
let min = "00";
let sec = "00";
let ms = "00";
let lapList = [];

startBtn.addEventListener('click', function () {
    startBtn.classList.add("active");
    stopBtn.classList.remove("active");

    startTimer = setInterval(() => {
        ms++;
        ms = ms < 10 ? "0" + ms : ms;

        if (ms == 100) {
            sec++;
            sec = sec < 10 ? "0" + sec : sec;
            ms = "00";
        }
        if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "00";
        }
        if (min == 60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "00";
        }
        putValue();
    }, 10); // 10 milliseconds = 1 centisecond
});

stopBtn.addEventListener('click', function () {
    startBtn.classList.remove("active");
    stopBtn.classList.add("active");
    clearInterval(startTimer);
});

resetBtn.addEventListener('click', function () {
    startBtn.classList.remove("active");
    stopBtn.classList.remove("active");
    clearInterval(startTimer);
    hr = min = sec = ms = "00";
    lapList = [];
    putValue();
    clearLaps();
});

lapBtn.addEventListener('click', function () {
    if (startBtn.classList.contains("active")) {
        let lapTime = ` ${formatWithLeadingZero(hr)} : ${formatWithLeadingZero(min)} : ${formatWithLeadingZero(sec)}.${ms}`;
        lapList.push( lapTime);
        displayLaps();
    }
});

function putValue() {
    document.getElementById('hr').textContent = hr;
    document.getElementById('min').textContent = min;
    document.getElementById('sec').textContent = sec;
    document.getElementById('ms').textContent = ms;
}

function formatWithLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

function displayLaps() {
    let lapTimesContainer = document.getElementById('lapTimes');
    lapTimesContainer.innerHTML = ''; // Clear previous lap times

    lapList.forEach((lapTime, index ) => {
        let lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.textContent = `Lap ${index + 1}:${lapTime}`;
        lapTimesContainer.appendChild(lapItem);
    });
}

function clearLaps() {
    document.getElementById('lapTimes').innerHTML = '';
}
