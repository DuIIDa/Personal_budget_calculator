'use strict'

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за расчитываемый период, через запятую.');
let deposit = confirm('Есть ли у вас депозит?');
let mission = 2000;
let period = 12;
let budgetDay;
let expenses1;
let expenses2;
let amount1 = 0;
let amount2 = 0;
let sumAmount;
let accumulatedMonth;

let start = () => {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

let showTypeof = (data) => {
    console.log(data);
};

let getAccumulatedMonth = () => {
    return money - sumAmount;
};

let getExpensesMonth = () => {
    expenses1 = prompt('Введите обязательную статью расхода?');
    if(expenses1){
        do {
            amount1 = (prompt('Во сколько это обойдетя?'));
        } while (!isNumber(amount1));
    }
    expenses2 = prompt('Введите обязательную статью расхода?');
    if(expenses2){
        do {
            amount2 = (prompt('Во сколько это обойдетя?'));
        } while (!isNumber(amount2));
    }

    return Number(amount1) + Number(amount2);
};

let getTargetMonth = () => {
    return Math.ceil(mission/accumulatedMonth);
};

let getStatusIncome = (status) => {
    if(status >= 50){
        console.log('У вас высокий уровень дохода!');
    } else if(status >= 20 && status <= 35) {
        console.log('У вас средний уровень дохода!');
    } else if(status < 20 && status > 0) {
        console.log('К сожелению у вас уровень дохода ниже среднего!');
    } else {
        console.log('Что-то пошло не так!');
    }
};

start();
sumAmount = getExpensesMonth();

showTypeof(typeof money);
showTypeof(typeof income);
showTypeof(typeof deposit);
showTypeof(income.length);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' + mission);

addExpenses = addExpenses.toLowerCase();//Пеевод в нижний регистр
addExpenses = addExpenses.split([', ']);//Разбиение строки на массив
console.log(addExpenses);

console.log('Расходы за месяц месяц: ', sumAmount);
accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ', accumulatedMonth);

period = getTargetMonth();//Округление в большую сторону
if(period > 0) {
    console.log('Цель будет достигнута за: ', period, ' мес.');
}else {
    console.log('Цель не будет достигнута!');
}

budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день: ', budgetDay);


getStatusIncome(budgetDay);
