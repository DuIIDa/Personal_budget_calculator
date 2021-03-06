'use strict';


const 
    //Месячный доход
    salaryAmount = document.querySelector('.salary-amount'),

    //Кнопки +
    btnPlusIncome = document.getElementsByTagName('button')[0],
    btnPlusExpenses = document.getElementsByTagName('button')[1],

    //Возможные расходы
    addExpensesItem = document.querySelector('.additional_expenses-item'),

    //Чекбокс депозт
    checkBoxDeposit = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),

    //Цель
    targetAmount = document.querySelector('.target-amount'),

    //Период
    period = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),

    //Результаты
    resBudgetMonth = document.querySelector('.budget_month-value'),
    resBudgetDay = document.querySelector('.budget_day-value'),
    resExpensesMonth = document.querySelector('.expenses_month-value'),
    resAddIncome = document.querySelector('.additional_income-value'),
    resAddExpenses = document.querySelector('.additional_expenses-value'),
    resIncomePeriod = document.querySelector('.income_period-value'),
    restTargetMonth = document.querySelector('.target_month-value'),

//Кнопки Расчитать и Сбросить
reset = document.getElementById('cancel'),
start = document.getElementById('start');

//Дополнительные доходы
let incomeTitle = document.querySelectorAll('.income-title'),
    incomeAmount = document.querySelectorAll('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
//Обязательные расходы
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesAmount = document.querySelectorAll('.expenses-amount'),
expensesItems = document.querySelectorAll('.expenses-items');



let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n) && n > 0;
};

const provNumber = (value) => {
    value.value = value.value.replace(/[^\d]/g, '');
};

const provText = (value) => {
    value.value = value.value.replace(/[^а-яА-ЯёЁ ,\-]/g, '');
};

const сheckIncomeAmount = () => {
    incomeAmount = document.querySelectorAll('.income-amount');
    incomeAmount.forEach(function(item) {
        item.addEventListener('input', function(event) {
            let target = event.target;
            provNumber(target);
    
        });
    });
};

const сheckIncomeTitle = () => {
    incomeTitle = document.querySelectorAll('.income-title');
    incomeTitle.forEach(function(item) {
        item.addEventListener('input', function(event) {
            let target = event.target;
            provText(target);
    
        });
    });
};

const сheckExpensesAmount = () => {
    expensesAmount = document.querySelectorAll('.expenses-amount');
    expensesAmount.forEach(function(item) {
        item.addEventListener('input', function(event) {
            let target = event.target;
            provNumber(target);
    
        });
    });
};

const сheckExpensesTitle = () => {
    expensesTitle = document.querySelectorAll('.expenses-title');
    expensesTitle.forEach(function(item) {
        item.addEventListener('input', function(event) {
            let target = event.target;
            provText(target);
    
        });
    });
};

let saveAppData = {
    resBudgetMonthSave: '',
    resBudgetDaySave: '',
    resExpensesMonthSave: '',
    resAddIncomeSave: '',
    resAddExpensesSave: '',
    resIncomePeriodSave: '',
    restTargetMonthSave: '',
    resperiod: '',
};

//Проверка имеются ли данные в локале
if(localStorage.getItem('localsaveAppData')){
    saveAppData = JSON.parse(localStorage.getItem('localsaveAppData'));

    resBudgetMonth.value = saveAppData.resBudgetMonthSave;
    resBudgetDay.value = saveAppData.resBudgetDaySave;
    resExpensesMonth.value = saveAppData.resExpensesMonthSave;
    resAddIncome.value = saveAppData.resAddIncomeSave;
    resAddExpenses.value = saveAppData.resAddExpensesSave;
    resIncomePeriod.value = saveAppData.resIncomePeriodSave;
    restTargetMonth.value = saveAppData.restTargetMonthSave;
    period.value = saveAppData.resperiod;
    periodAmount.innerHTML = period.value;

    start.style.display = 'none';
    reset.style.display = 'block';
    period.disabled = true;

    salaryAmount.readOnly = true;
    addIncomeItem[0].readOnly = true;
    addIncomeItem[1].readOnly = true;
    addExpensesItem.readOnly = true;
    targetAmount.readOnly = true;
    depositPercent.readOnly = true;
    depositAmount.readOnly = true;
    depositBank.disabled = true;
    checkBoxDeposit.disabled = true;
    
    expensesItems.forEach( (item) => {
        item.querySelector('.expenses-title').readOnly = true;
        item.querySelector('.expenses-amount').readOnly = true;  
    });
    
    incomeItems.forEach( (item) => {
        item.querySelector('.income-title').readOnly = true;
        item.querySelector('.income-amount').readOnly = true; 
    });

    
}

class AppData {
    constructor(){
        this.budget = 0;
        this.income = {};
        this.addIncome = [];

        this.expenses = {};
        this.addExpenses = [];

        this.deposit = false;
        this.moneyDeposit = 0;
        this.percentDeposit = 0;

        
        this.budgetMonth = 0;
        this.budgetDay = 0;
        this.expensesMonth = 0;

        this.incomeMonth = 0;
        
    }

    dataUpdateToLocalS() {
        saveAppData.resBudgetMonthSave = resBudgetMonth.value;
        saveAppData.resBudgetDaySave = resBudgetDay.value;
        saveAppData.resExpensesMonthSave = resExpensesMonth.value;
        saveAppData.resAddIncomeSave = resAddIncome.value;
        saveAppData.resAddExpensesSave = resAddExpenses.value;
        saveAppData.resIncomePeriodSave = resIncomePeriod.value;
        saveAppData.restTargetMonthSave = restTargetMonth.value;
        saveAppData.resperiod = period.value;

        localStorage.setItem('localsaveAppData', JSON.stringify(saveAppData));
    }



    start() {

        salaryAmount.readOnly = true;
        addIncomeItem[0].readOnly = true;
        addIncomeItem[1].readOnly = true;
        addExpensesItem.readOnly = true;
        targetAmount.readOnly = true;
        depositPercent.readOnly = true;
        depositAmount.readOnly = true;
        depositBank.disabled = true;
        checkBoxDeposit.disabled = true;
    
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
       
        this.getTargetMonth();
    
        this.getAddExpenses();
        this.getAddincome();

        this.depositHandler();
        this.getInfoDeposit();
        this.getBudget();

        this.getStatusIncome(this.budgetDay);
    
        this.showResult();


        this.dataUpdateToLocalS();
    }
    
    reset() {
        window.localStorage.clear();

        salaryAmount.readOnly = false;
        addIncomeItem[0].readOnly =false;
        addIncomeItem[1].readOnly = false;
        addExpensesItem.readOnly = false;
        targetAmount.readOnly = false;
        depositPercent.readOnly = false;
        depositAmount.readOnly = false;
        depositBank.disabled = false;
        checkBoxDeposit.disabled = false;
        checkBoxDeposit.checked = false;
        period.disabled = false;
    
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
        depositAmount.value = '';
        depositBank.value = '';


        depositBank.style.display = 'none';  
        depositPercent.style.display = 'nane';         
        depositAmount.style.display = 'none';
    
        expensesItems.forEach( (item, i) => {
            item.querySelector('.expenses-title').value =  '';
            item.querySelector('.expenses-amount').value =  ''; 
            if(i>0){
               item.remove();
            }
        });
        expensesItems = document.querySelectorAll('.expenses-items');
        btnPlusExpenses.style.display = 'block'; 
    
    
        incomeItems.forEach( (item, i) => {
           item.querySelector('.income-title').value =  '';
           item.querySelector('.income-amount').value =  '';
           if(i>0){
              item.remove();
           } 
        });
        incomeItems = document.querySelectorAll('.income-items');
        btnPlusIncome.style.display = 'block';
    
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
    
    }
    
    showResult()  {
        resBudgetMonth.value = this.budgetMonth;
        resBudgetDay.value = this.budgetDay;
        resExpensesMonth.value = this. expensesMonth;
        resAddExpenses.value = this.addExpenses.join(', ');
        resAddIncome.value = this.addIncome.join(', ');
        restTargetMonth.value = this.getTargetMonth();
        resIncomePeriod.value = this.calcSavedMoney();
        period.addEventListener('input', this.addPeriodAmount);
    }
    
    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
        }
    
        сheckIncomeAmount();
        сheckIncomeTitle();
    }
    
    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            btnPlusExpenses.style.display = 'none'; 
        }
    
        сheckExpensesAmount();
        сheckExpensesTitle();
    }
    
    addPeriodAmount() {
        periodAmount.innerHTML = period.value;
        resIncomePeriod.value = appData.calcSavedMoney();
    }
    
    getExpenses() {
        expensesItems.forEach( (item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    getIncome() {
        incomeItems.forEach( (item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
    
        });
    
        for(let key in this.income){
            this.incomeMonth +=this.income[key];
        }
    }
    
    getAddExpenses()  {
        
        let addExpenses = addExpensesItem.value.toLowerCase().split(',');
        addExpenses.forEach( (item) => {
            if(item !== ''){
                this.addExpenses.push(item.trim().charAt(0).toUpperCase() + item.trim().substr(1));
            }
    
        });
    }
    
    getAddincome() {
        addIncomeItem.forEach( (item) => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    
    getExpensesMonth()  {
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    }
    
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
        this.budgetDay =  Math.floor(this.budgetMonth/30);
    }
    
    getTargetMonth()  {
        if(this.budgetMonth>0){
            return Math.ceil(targetAmount.value/this.budgetMonth);
        }else{
            return 'Цель не будет достигнута';
        }
    }
    
    getStatusIncome(status) {
        console.log('status: ', status);
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

    changePercent(){
        const valueIndex = this.value;
        if(valueIndex === 'other'){
            depositPercent.style.display = 'inline-block'; 
            depositPercent.value = '';
            depositPercent.addEventListener('input', () => {
                depositPercent.value = depositPercent.value.replace(/[^\d]/g, '');
                if(depositPercent.value > 99){
                    depositPercent.value = '';
                }
            });
        }else{
            depositPercent.value = valueIndex;
            depositPercent.style.display = 'none'; 
        }

    }
    
    getInfoDeposit(){
        if(this.deposit){
           this.percentDeposit = depositPercent.value;
           this.moneyDeposit = depositAmount.value;
        }
    }

    depositHandler() {
        if(checkBoxDeposit.checked){
            depositBank.style.display = 'inline-block';      
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
            depositAmount.addEventListener('input', () => {
                provNumber(depositAmount);
            });
        }else{
            depositBank.style.display = 'none';  
            depositPercent.style.display = 'nane';         
            depositAmount.style.display = 'none';

            depositBank.value = '';
            depositPercent.value = '';
            depositAmount.value ='';

            this.deposit = false;

            depositBank.removeEventListener('change', this.changePecent);
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * period.value;
    }
    
    eventListeners() {

        const lock = () => {
            start.disabled = !salaryAmount.value ? true : false;
            provNumber(salaryAmount);
        };
        
        
        reset.addEventListener('click', () => {
            start.style.display = 'block';
            reset.style.display = 'none';
            this.reset();
            lock();
        });
        
        
        start.addEventListener('click', () => {
            start.style.display = 'none';
            reset.style.display = 'block';
            this.start();
        }); 
        
        salaryAmount.addEventListener('input', lock);
        
        сheckIncomeAmount();
    
        сheckIncomeTitle();
        
        addIncomeItem[0].addEventListener('input', () => {
            provText(addIncomeItem[0]);
        });
        
        addIncomeItem[1].addEventListener('input', () => {
            provText(addIncomeItem[1]);
        });
        
        сheckExpensesAmount();
        
        сheckExpensesTitle();
        
        targetAmount.addEventListener('input', () => {
            provNumber(targetAmount);
        });
            
        btnPlusIncome.addEventListener('click', this.addIncomeBlock);
        btnPlusExpenses.addEventListener('click', this.addExpensesBlock);
        
        period.addEventListener('input', () => {
            periodAmount.innerHTML = period.value;
        });

        checkBoxDeposit.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();
appData.eventListeners();