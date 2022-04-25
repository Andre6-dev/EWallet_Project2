// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

const getFormattedTime = () => {
    const now = new Date().toLocaleTimeString('en-us', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return `${date[1]} ${date[0]}, ${time}`;
}

const sep = (amount) => {
    amount = parseInt(amount);
    return amount.toLocaleString();
}

document.querySelector("#ewallet-form")
    .addEventListener('submit',
        (e) => {
            e.preventDefault();
            console.log('form submitted');
            const type = document.querySelector('.add__type').value;
            const desc = document.querySelector('.add__description').value;
            const value = document.querySelector('.add__value').value;
            console.log(type, desc, value)

            if (desc.length > 0 && value.length > 0) {
                addItems(type, desc, value);
                resetForm();
            }
});

function showItems() {
    let items = getItemsFromLS();

    const collection = document.querySelector('.collection');

    for (let item of items) {
        const newHtml = `
            <div class="item">
              <div class="item-description-time">
                <div class="item-description">
                  <p>${item.desc}</p>
                </div>
                <div class="item-time">
                  <p>${item.time}</p>
                </div>
              </div>
              <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
                <p>${item.type}$${item.value}</p>
              </div>
            </div>       
            `;
        collection.insertAdjacentHTML('afterbegin', newHtml);
    }
}

const addItems = (type, desc, value) => {

    const time = getFormattedTime();

    const newHtml = `
            <div class="item">
              <div class="item-description-time">
                <div class="item-description">
                  <p>${desc}</p>
                </div>
                <div class="item-time">
                  <p>${time}</p>
                </div>
              </div>
              <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
                <p>${type}$${sep(value)}</p>
              </div>
            </div>       
            `

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);

    addItemToLS(type, desc, value, time);

    showTotalIncome();
    showTotalExpense();
    showTotalBalance();
}

const resetForm = () => {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

const getItemsFromLS = () => {
    let items = localStorage.getItem('items');

    if (items) {
        items = JSON.parse(items);
    } else {
        items = []
    }
    return items;
}

const addItemToLS = (type, desc, value, time) => {

    let items = getItemsFromLS();
    items.push({
        desc: desc,
        time: time,
        type: type,
        value: value,
    })

    localStorage.setItem('items', JSON.stringify(items));
};

showItems();

const showTotalIncome = () => {
    let items = getItemsFromLS();
    let totalIncome = 0;

    for (let item of items) {
        if (item.type === '+') {
            totalIncome += parseInt(item.value);
        }
    }

    console.log(totalIncome);
    document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;
}

showTotalIncome();

const showTotalExpense = () => {
    let items = getItemsFromLS();
    let totalExpense = 0;

    for (let item of items) {
        if (item.type === '-') {
            totalExpense += parseInt(item.value)
        }
    }
    console.log(totalExpense)
    document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`;
}

showTotalExpense();

const showTotalBalance = () => {
    let items = getItemsFromLS();
    let balance = 0;
    for (let item of items) {
        if (item.type === '+') {
            balance += parseInt(item.value);
        } else {
            balance -= parseInt(item.value);
        }
    }
    document.querySelector('.balance__amount p').innerText = sep(balance);

    document.querySelector('header').className = (balance >= 0) ? 'green' : 'red';
}

showTotalBalance();

