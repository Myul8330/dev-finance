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
const transactions = [
    {
        id: 1, 
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
},
    {
        id: 2, 
        description: 'Criação website',
        amount: 500000,
        date: '23/01/2021',
},
    {
        id: 3, 
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
},
]
//Eu preciso somar as entradas
//depois eu preciso somar as saídas e
//remover das entradas o valor das saídas
const Transaction = {
    incomes() {
        //somar as entradas
    },
    expenses() {
        //somar as saídas
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

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date"${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover Transação">
            </td>
    `
    return html
    }
}

DOM.addTransaction(transactions[1])