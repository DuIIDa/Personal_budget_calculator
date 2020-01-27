'use strict'

let money;
let income = 'Фриланс';
let addExpenses;
let deposit;
let mission = 8000;
let period = 12;
let budgetDay;
let expenses1;
let expenses2;
let amount1 = 0;
let amount2 = 0;
let budgetMonth;

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период, через запятую.');
deposit = confirm('Есть ли у вас депозит?');
expenses1 = confirm('Введите обязательную статью расхода?');
if(expenses1){
    amount1 = prompt('Во сколько это обойдетя?');
}

expenses2 = confirm('Введите обязательную статью расхода?');
if(expenses2){
    amount2 = prompt('Во сколько это обойдетя?');
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' + mission);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split([', ']);
console.log(addExpenses);


budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

period = Math.ceil(mission/budgetMonth);//Округление в большую сторону
console.log('Цель будет достигнута за: ', period, ' мес.');

budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);


if(budgetDay >= 50){
    console.log('У вас высокий уровень дохода!');
} else if(budgetDay >= 20 && budgetDay <= 35) {
    console.log('У вас средний уровень дохода!');
} else if(budgetDay < 20) {
    console.log('К сожелению у вас уровень дохода ниже среднего!');
} else {
    console.log('Что-то пошло не так!');
}
