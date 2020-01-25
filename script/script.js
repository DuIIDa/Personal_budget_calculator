let money = 1000;
let income = 'Фриланс';
let addExpenses = 'КВАРТИРА, комуналка, курсы GloAcademy';
let deposit = false;
let mission = 8000;
let period = 12;
let budgetDay;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' +  period + ' месяцев');
console.log('Цель заработать ' + mission);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split([', ']);
console.log(addExpenses);

budgetDay = money/30;
console.log(budgetDay);