const Modal = {
    open(){
        //Abrir Modal
        //Adicionar a class active ao 
        document
                .querySelector('.modal-overlay')
                .classList
                .toggle('active');
    },
    close(){
            //fecha o modal
            //remove a class active do modal
            document
                .querySelector('modal-overlay')
                .classList
                .remove('active');
    }
}
//Eu preciso somar as entradas
//depois eu preciso somar as saídas e
//remover das entradas o valor das saídas
const Transaction = {
    all:  [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021',
    },
        {
            description: 'Criação website',
            amount: 500000,
            date: '23/01/2021',
    },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021',
    },
        {
            description: 'APP',
            amount: 20000,
            date: '23/01/2021',
    },
    ],//Agrupando o transactions! para guarda no navegador.
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes() {
        let income   = 0;
        //Pegar todas as transactions
           //para cada transaçao,
        Transaction.all.forEach(transaction => {
            // se ela for  maior que zero
            if ( transaction.amount  >  0 ) {
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses() {
        let expense   =  0;
        //Pegar todas as transactions
           //para cada transaçao,
        Transaction.all.forEach(transaction => {
            // se ela for  menor que zero
            if ( transaction.amount  <  0) {
                //somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    } 
}
//Substituir os dados do HTML com os dados do JS

const DOM = { 
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass =  transaction.amount  >  0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover Transação">
            </td>
    `
    return html
    },
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = { 
    formatAmount(value) {
        value = Number(value) * 100
    },
    formatCurrency(value) {
        const signal = Number(value)  <  0  ?  "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}
const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    getValues() {
        return{
            description: form.description.value,
            amount: form.amount.value,
            date: form.date.value
        }
    },
    validateFields(){
        const {description, amount, date} = form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    formatValues(){
        let {description, amount, date} = form.getValues()
        amount = util.formatAmount(amount)
    },
    submit(event) {
        event.preventDefault()

        try {
             //verificar se todas as informaçoes foram preenchidas
            form.validateFields()
            //formata os dados para salvar
            form.formatValues()
            // salvar
            //apagar os dados do formulario
            //modal feche
            //Atualizar a aplicaçao
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() { 
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}
App.init()
