const input = document.querySelector(".field__form__input");
const btn = document.querySelector("#check__number");
const check = document.querySelector(".result__check__out");
const help = document.querySelector(".result__help__out");
const count = document.querySelector(".result__count__out");
const restartBtn = document.querySelector("#restart__btn");
const descSubtitle = document.querySelector('.desc__subtitle');
const rangeInput = document.querySelector('.field__range__input');
const rangeBtn = document.querySelector('.field__range__btn');

let item = 0;
let range = 100;
let randNum = 1 + Math.floor(Math.random() * range);
let userNum;
let isEvenNum = false;

if (randNum % 2 === 0) {
    isEvenNum = true;
}

function getHelp() {
    if (isEvenNum) {
        help.textContent += 'Число четное.';
    } else {
        help.textContent += 'Число нечетное.';
    }
}

btn.onclick = function (event) {
    event.preventDefault();
    userNum = Number(input.value);
    if (userNum > randNum) {
        check.textContent = "Пока что не угадали";
        help.textContent = "Многовато будет. ";
        item++;
        count.textContent = item;
        if (item % 3 === 0) {
            getHelp();
        }
    }
    if (userNum < randNum) {
        check.textContent = "Пока что не угадали";
        help.textContent = "Маловато будет. ";
        item++;
        count.textContent = item;
        if (item % 3 === 0) {
            getHelp();
        }
    }
    if (userNum > range || userNum <= 0) {
        check.textContent = "Вы ввели недопустимое значение.";
        help.textContent = "Введите число в пределах диапазона от 0 до " + range + ". ";
        if (item % 3 === 0) {
            getHelp();
        }
    }
    if (userNum === randNum) {
        check.textContent = "Поздравляю! Вы угадали число";
        help.textContent = "В самый раз";
        item++;
        count.textContent = item;
    }
};

restartBtn.onclick = function (event) {
    event.preventDefault();
    item = 0;
    range = 100;
    randNum = 1 + Math.floor(Math.random() * range);
    descSubtitle.textContent = 'Компьютер загадал число от 1 до ' + range +'. Ваша задача его угадать.';
    isEvenNum = randNum % 2 === 0;
    check.textContent = "";
    help.textContent = "";
    count.textContent = item;
    input.value = '';
};

rangeBtn.onclick = function (event) {
    event.preventDefault();
    item = 0;
    range = rangeInput.value;
    randNum = 1 + Math.floor(Math.random() * range);
    descSubtitle.textContent = 'Компьютер загадал число от 1 до ' + range +'. Ваша задача его угадать.';
    isEvenNum = randNum % 2 === 0;
    check.textContent = "";
    help.textContent = "";
    count.textContent = item;
    input.value = '';
    rangeInput.value = '';
}