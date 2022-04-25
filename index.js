// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

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

const addItems = (type, desc, value) => {
    const newHtml = `
            <div class="item">
              <div class="item-description-time">
                <div class="item-description">
                  <p>${desc}</p>
                </div>
                <div class="item-time">
                  <p>25 Feb, 06:45 PM</p>
                </div>
              </div>
              <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
                <p>${type}$${value}</p>
              </div>
            </div>       
            `

    const collection = document.querySelector('.collection')
    collection.insertAdjacentHTML('afterbegin', newHtml)
}

const resetForm = () => {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

