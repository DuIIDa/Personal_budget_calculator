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
let accumulatedMonth;

let showTypeof = (data) => {
    console.log(data);
};

let getAccumulatedMonth = (resBudgetMonth, sumAmount) => {
    return resBudgetMonth - sumAmount;
};

let getExpensesMonth = (cost1, cost2) => {
    return cost1 + cost2;
};

let getTargetMonth = (costMonth, target) => {
    return Math.ceil(target/costMonth);
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

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за расчитываемый период, через запятую.');
deposit = confirm('Есть ли у вас депозит?');
expenses1 = confirm('Введите обязательную статью расхода?');

if(expenses1){
    amount1 = Number(prompt('Во сколько это обойдетя?'));
}

expenses2 = confirm('Введите обязательную статью расхода?');
if(expenses2){
    amount2 = Number(prompt('Во сколько это обойдетя?'));
}

showTypeof(typeof money);
showTypeof(typeof income);
showTypeof(typeof deposit);
showTypeof(income.length);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' + mission);

addExpenses = addExpenses.toLowerCase();//Пеевод в нижний регистр
addExpenses = addExpenses.split([', ']);//Разбиение строки на массив
console.log(addExpenses);

console.log('Расходы за месяц месяц: ', getExpensesMonth(amount1, amount2));
accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
console.log('Бюджет на месяц: ', accumulatedMonth);

period = getTargetMonth(accumulatedMonth, mission);//Округление в большую сторону
console.log('Цель будет достигнута за: ', period, ' мес.');

budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день: ', budgetDay);


getStatusIncome(budgetDay);
