'use strict';


let 
    salaryAmount = document.querySelector('.salary-amount'),

    incomeTitle = document.querySelectorAll('.income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    btnPlusIncome = document.getElementsByTagName('button')[0],
    
    addIncomeItem = document.querySelectorAll('.additional_income-item'),

    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    btnPlusExpenses = document.getElementsByTagName('button')[1],

    addExpensesItem = document.querySelector('.additional_expenses-item'),
    checkBoxDeposit = document.querySelector('#deposit-check'),

    targetAmount = document.querySelector('.target-amount'),

    period = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),

    resBudgetMonth = document.querySelector('.budget_month-value'),
    resBudgetDay = document.querySelector('.budget_day-value'),
    resExpensesMonth = document.querySelector('.expenses_month-value'),
    resAddIncome = document.querySelector('.additional_income-value'),
    resAddExpenses = document.querySelector('.additional_expenses-value'),
    resIncomePeriod = document.querySelector('.income_period-value'),
    restTargetMonth = document.querySelector('.target_month-value'),

start = document.getElementById('start');

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    incomeMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: () => {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();

        appData.getExpensesMonth();
        appData.getBudget();
       
        appData.getTargetMonth();
        appData.getStatusIncome(appData.budgetDay);

        appData.getAddExpenses();
        appData.getAddincome();

        appData.showResult();

        appData.getInfoDeposit();
    },

    showResult: () => {
        resBudgetMonth.value = appData.budgetMonth;
        resBudgetDay.value = appData.budgetDay;
        resExpensesMonth.value = appData. expensesMonth;
        resAddExpenses.value = appData.addExpenses.join(', ');
        resAddIncome.value = appData.addIncome.join(', ');
        restTargetMonth.value = appData.getTargetMonth();
        resIncomePeriod.value = appData.calcSavedMoney();

    },

    addIncomeBlock: () => {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
        }
    },

    addExpensesBlock: () => {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            btnPlusExpenses.style.display = 'none'; 
        }
    },

    addPeriodAmount: () => {
        periodAmount.innerHTML = period.value;
         resIncomePeriod.value = appData.calcSavedMoney();
    },

    getExpenses: () => {
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: () => {
        incomeItems.forEach( (item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }

        });

        for(let key in appData.income){
            appData.incomeMonth +=appData.income[key];
        }
    },

    getAddExpenses: () => {
        
        let addExpenses = addExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach( (item) => {
            if(item !== ''){
                appData.addExpenses.push(item.trim().charAt(0).toUpperCase() + item.trim().substr(1));
            }

        });
    },

    getAddincome: () => {
        addIncomeItem.forEach( (item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },


    getExpensesMonth: () => {
        for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: () => {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay =  Math.floor(appData.budgetMonth/30);
    },

    getTargetMonth: () => {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
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
    },

    getInfoDeposit: () => {
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?');
            }while(!isNumber(appData.percentDeposit));

            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }while(!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: () => {
        return appData.budgetMonth * period.value;
    }

};

const provNumber = (value) => {
    value.value = value.value.replace(/[^\d]/g, '');
};

const provText = (value) => {
    value.value = value.value.replace(/[^а-яА-ЯёЁ ,\-]/g, '');
};

const lock = () => {
    start.disabled = !salaryAmount.value ? true : false;
    provNumber(salaryAmount);
};

lock();


start.addEventListener('click', appData.start); 
salaryAmount.addEventListener('input', lock);


incomeAmount.addEventListener('input', () => {
    provNumber(incomeAmount);
});

incomeTitle.addEventListener('input', () => {
    provText(incomeTitle);
});

expensesTitle.addEventListener('input', () => {
    provText(expensesTitle);
});

expensesAmount.addEventListener('input', () => {
    provNumber(expensesAmount);
});

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click', appData.addIncomeBlock);
period.addEventListener('input', appData.addPeriodAmount);

//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
