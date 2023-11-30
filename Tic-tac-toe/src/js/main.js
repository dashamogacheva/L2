const items = document.getElementsByClassName("app_block");
const firstPlayerStat = document.getElementById('firstPlayer');
const secondPlayerStat = document.getElementById('secondPlayer');
const otherStat = document.getElementById('other');
const newGameBtn = document.getElementById('newGame');
const clearStatisticBtn = document.getElementById('clearStatistic');
let firstPlayerCount = localStorage.getItem('firstPlayerCount');
let secondPlayerCount = localStorage.getItem('secondPlayerCount');
let otherCount = localStorage.getItem('otherCount');
let movePlayer = true;
let game = true;

newGameBtn.onclick = function (event) {
    event.preventDefault();
    clearAppBlocks();
    startGame();
}

clearStatisticBtn.onclick = function (event) {
    event.preventDefault();
    resettingStatistics();
    updateStatistics();
}

function resettingStatistics() {
    firstPlayerCount = 0;
    secondPlayerCount = 0;
    otherCount = 0;
    setToLocalStorage();
}

function setToLocalStorage() {
    localStorage.setItem(`firstPlayerCount`, `${firstPlayerCount}`);
    localStorage.setItem(`secondPlayerCount`, `${secondPlayerCount}`);
    localStorage.setItem(`otherCount`, `${otherCount}`);
}

function updateStatistics() {
    firstPlayerStat.textContent = localStorage.getItem('firstPlayerCount');
    secondPlayerStat.textContent = localStorage.getItem('secondPlayerCount');
    otherStat.textContent = localStorage.getItem('otherCount');
}

function startGame() {
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            let collection = document.querySelectorAll(".app_block:not(.active)");
            if (collection.length === 1) {
                otherCount++;
                updateStatistics();
                exit({win: "Ничья"});
            }
            if (!this.classList.contains("active")) {
                if (movePlayer) {
                    firstPlayer(this);
                } else {
                    secondPlayer(this);
                }
            }
        });
    }
}

function firstPlayer(that) {
    if (that.innerHTML === "") {
        that.classList.add("active");
        that.classList.add("active_x");
        that.innerHTML = "x";
    }
    let result = checkMap();
    if (result.val) {
        game = false;
        setTimeout(function () {
            exit(result);
        }, 10);
    }
    movePlayer = !movePlayer;
}

function secondPlayer(that) {
    if (that.innerHTML === "") {
        that.classList.add("active");
        that.classList.add("active_o");
        that.innerHTML = "0"
    }
    let result = checkMap();
    if (result.val) {
        game = false;
        setTimeout(function () {
            exit(result);
        }, 10);
    }
    movePlayer = !movePlayer;
}

function checkMap() {
    let block = document.querySelectorAll(".app_block");
    let items = [];
    for (let i = 0; i < block.length; i++) {
        items.push(block[i].innerHTML);
    }
    if (items[0] === "x" && items[1] === 'x' && items[2] === 'x' ||
        items[3] === "x" && items[4] === 'x' && items[5] === 'x' ||
        items[6] === "x" && items[7] === 'x' && items[8] === 'x' ||
        items[0] === "x" && items[3] === 'x' && items[6] === 'x' ||
        items[1] === "x" && items[4] === 'x' && items[7] === 'x' ||
        items[2] === "x" && items[5] === 'x' && items[8] === 'x' ||
        items[0] === "x" && items[4] === 'x' && items[8] === 'x' ||
        items[6] === "x" && items[4] === 'x' && items[2] === 'x') {
        firstPlayerCount++;
        return {val: true, win: "Игрок 1"};
    }
    if (items[0] === "0" && items[1] === '0' && items[2] === '0' ||
        items[3] === "0" && items[4] === '0' && items[5] === '0' ||
        items[6] === "0" && items[7] === '0' && items[8] === '0' ||
        items[0] === "0" && items[3] === '0' && items[6] === '0' ||
        items[1] === "0" && items[4] === '0' && items[7] === '0' ||
        items[2] === "0" && items[5] === '0' && items[8] === '0' ||
        items[0] === "0" && items[4] === '0' && items[8] === '0' ||
        items[6] === "0" && items[4] === '0' && items[2] === '0') {
        secondPlayerCount++;
        return {val: true, win: "Игрок 2"};
    }
    return {val: false}
}

function clearAppBlocks() {
    let collection = document.querySelectorAll(".app_block");
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains("active_x")) {
            collection[i].classList.remove("active_x");
        } else {
            collection[i].classList.remove("active_o");
        }
        collection[i].innerHTML = "";
        collection[i].classList.remove("active");
    }
}

function exit(obj) {
    alert(obj.win + " - игра закончилась");
    setToLocalStorage();
    updateStatistics();
}

updateStatistics();
startGame();