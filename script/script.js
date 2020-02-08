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
reset = document.getElementById('cancel'),
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

    start: function() {

        salaryAmount.readOnly = true;
        addIncomeItem[0].readOnly = true;
        addIncomeItem[1].readOnly = true;
        addExpensesItem.readOnly = true;
        targetAmount.readOnly = true;

        expensesItems.forEach( (item) => {
            item.querySelector('.expenses-title').readOnly = true;
            item.querySelector('.expenses-amount').readOnly = true;  
        });

        incomeItems.forEach( (item) => {
           item.querySelector('.income-title').readOnly = true;
           item.querySelector('.income-amount').readOnly = true; 
        });

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();

        this.getExpensesMonth();
        this.getBudget();
       
        this.getTargetMonth();
        this.getStatusIncome(this.budgetDay);

        this.getAddExpenses();
        this.getAddincome();

        this.showResult();

        this.getInfoDeposit();
    },

    reset: function () {
        salaryAmount.readOnly = false;
        addIncomeItem[0].readOnly =false;
        addIncomeItem[1].readOnly = false;
        addExpensesItem.readOnly = false;
        targetAmount.readOnly = false;

        expensesItems.forEach( (item) => {
            item.querySelector('.expenses-title').readOnly = false;
            item.querySelector('.expenses-amount').readOnly = false;  
        });

        incomeItems.forEach( (item) => {
           item.querySelector('.income-title').readOnly = false;
           item.querySelector('.income-amount').readOnly = false; 
        });

        salaryAmount.value  =  '';
        addIncomeItem[0].value =  '';
        addIncomeItem[1].value =  '';
        addExpensesItem.value =  '';
        targetAmount.value =  '';
        period.value = 1;
        periodAmount.innerHTML = period.value;

        expensesItems.forEach( (item) => {
            item.querySelector('.expenses-title').style.display = 'none';
            item.querySelector('.expenses-amount').style.display = 'none'; 
        });

        incomeItems.forEach( (item) => {
           item.querySelector('.income-title').value =  '';
           item.querySelector('.income-amount').value =  ''; 
        });

        resBudgetMonth.value  =  '';
        resBudgetDay.value  =  '';
        resExpensesMonth.value  =  '';
        resAddIncome.value  =  '';
        resAddExpenses.value  =  '';
        resIncomePeriod.value  =  '';
        restTargetMonth.value  =  '';

        this.income =  {};
        this.addIncome = [];
        this.expenses = {};
        this.incomeMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

    },

    showResult: function()  {
        resBudgetMonth.value = this.budgetMonth;
        resBudgetDay.value = this.budgetDay;
        resExpensesMonth.value = this. expensesMonth;
        resAddExpenses.value = this.addExpenses.join(', ');
        resAddIncome.value = this.addIncome.join(', ');
        restTargetMonth.value = this.getTargetMonth();
        resIncomePeriod.value = this.calcSavedMoney();
        period.addEventListener('input', this.addPeriodAmount);
    },

    addIncomeBlock:  function()  {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
        }
    },

    addExpensesBlock:  function()  {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            btnPlusExpenses.style.display = 'none'; 
        }
    },

    addPeriodAmount:  function()  {
        periodAmount.innerHTML = period.value;
        resIncomePeriod.value = appData.calcSavedMoney();
    },

    getExpenses:  function()  {
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome:  function()  {
        incomeItems.forEach( (item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }

        });

        for(let key in appData.income){
            appData.incomeMonth +=appData.income[key];
        }
    },

    getAddExpenses:  function()  {
        
        let addExpenses = addExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach( (item) => {
            if(item !== ''){
                this.addExpenses.push(item.trim().charAt(0).toUpperCase() + item.trim().substr(1));
            }

        });
    },

    getAddincome:  function()  {
        addIncomeItem.forEach( (item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth:  function()  {
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget:  function()  {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay =  Math.floor(this.budgetMonth/30);
    },

    getTargetMonth:  function()  {
        if(this.budgetMonth){
            return Math.ceil(targetAmount.value/this.budgetMonth);
        }else{
            return '';
        }
    },

    getStatusIncome:  function(status) {
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

    getInfoDeposit:  function()  {
        if(this.deposit){
            do{
                this.percentDeposit = prompt('Какой годовой процент?');
            }while(!isNumber(this.percentDeposit));

            do{
                this.moneyDeposit = prompt('Какая сумма заложена?');
            }while(!isNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney:  function() {
        return this.budgetMonth * period.value;
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

reset.addEventListener('click', () => {
    start.style.display = 'block';
    reset.style.display = 'none';
    appData.reset();
});


start.addEventListener('click', () => {
    start.style.display = 'none';
    reset.style.display = 'block';
    appData.start();
}); 

salaryAmount.addEventListener('input', lock);


incomeAmount.addEventListener('input', function() {
    provNumber(incomeAmount);
});

incomeTitle.addEventListener('input', function() {
    provText(incomeTitle);
});

expensesTitle.addEventListener('input', function() {
    provText(expensesTitle);
});

expensesAmount.addEventListener('input', function() {
    provNumber(expensesAmount);
});

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);

btnPlusIncome.addEventListener('click', appData.addIncomeBlock);

period.addEventListener('input', () => {
    periodAmount.innerHTML = period.value;
});


