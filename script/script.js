'use strict'

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};
let money,
    start = () => {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
    }
;

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 2000,
    period: 6,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: () => {
        let addExpenses = prompt('Перечислите возможные расходы, через запятую?');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит?');

        let expenses1;
        let expenses2;
        let amount1 = 0;
        let amount2 = 0;
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
        appData.expenses = {
            [expenses1]: +amount1,
            [expenses2]: +amount2
        };

        appData.getExpensesMonth();
        appData.getBudget();
        console.log('Расходы за месяц: ', appData.expensesMonth);
        appData.getTargetMonth();
        appData.getStatusIncome(appData.budgetDay);
        for(let key in appData){
            console.log('Программа включает: ' + key + ': ' + appData[key]);
        }
    },

    getExpensesMonth: () => {
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getBudget: () => {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay =  Math.floor(appData.budgetMonth/30);
    },

    getTargetMonth: () => {
        console.log('Сроки достижения цели ' + Math.ceil(appData.mission/appData.budgetMonth));
    },

    getStatusIncome: (status) => {
        if(status >= 50){
            console.log('У вас высокий уровень дохода!');
        } else if(status >= 20 && status <= 35) {
            console.log('У вас средний уровень дохода!');
        } else if(status < 20 && status > 0) {
            console.log('К сожелению у вас уровень дохода ниже среднего!');
        } else {
            console.log('Что-то пошло не так!');
        }
    }

};

appData.asking();
