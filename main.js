// fetch options from the server and add them to DOM

class Options {
    constructor() {
        this.sizes = [];
        this.staffing = [];
        this.toppings = [];
        this._fetchSizes();
        this._fetchStaffing();
        this._fetchTopping();
        this.sizesContainer = "#size";
        this.staffingContainer = "#staffing";
        this.toppingsContainer = ".toppings"

    };

    _fetchSizes() {
        this.sizes = [
            {name: "big", price: 100, cal: 40},
            {name: "small", price: 50, cal: 20},

        ];
    };

    _fetchStaffing() {
        this.staffing = [
            {name: "сыр", price: 10, cal: 20},
            {name: "салат", price: 20, cal: 5},
            {name: "картофель", price: 15, cal: 10}
        ]
    };

    _fetchTopping() {
        this.toppings = [
            {name: "приправа", price: 15, cal: 0},
            {name: "майонез", price: 20, cal: 5}
        ]
    };

    renderOptions(container, optionsArray) {
        const block = document.querySelector(container);
        for (let option of optionsArray) {
            const optionObject = new Option(option);
            block.insertAdjacentHTML("beforeend", optionObject.render())
        }
    };

    renderToppings(container, toppingsArray) {
        const block = document.querySelector(container);
        for (let topping of toppingsArray) {
            const optionObject = new Topping(topping);
            block.insertAdjacentHTML("beforeend", optionObject.render())
        }
    };

    unit() {
        this.renderOptions(this.sizesContainer, this.sizes);
        this.renderOptions(this.staffingContainer, this.staffing);
        this.renderToppings(this.toppingsContainer, this.toppings);
    }
};

class Option {
    constructor(option) {
        this.name = option.name;
        this.price = option.price;
        this.cal = option.cal;
    }

    render() {
        return `<option value="${this.name}" data-price="${this.price}" data-cal="${this.cal}" >${this.name}</option>`;
    }
}

class Topping {
    constructor(topping) {
        this.name = topping.name;
        this.price = topping.price;
        this.cal = topping.cal;
    }

    render() {
        return `<input type="checkbox"
                class="topping" 
                value="${this.name}" 
                data-price="${this.price}" 
                data-cal="${this.cal}">${this.name}</input>`;
    }
}

class Hamburger {
    constructor() {
        this.size = {};
        this.staffing = {};
        this.toppings = [];
        this.sizesContainer = document.getElementById("size");
        this.staffingContainer = document.getElementById("staffing");
    };

    getChosenOptions(option, container) {
        option.name = container.options[container.selectedIndex].value;
        option.price = container.options[container.selectedIndex].dataset.price;
        option.cal = container.options[container.selectedIndex].dataset.cal;
    };

    getChosenToppings() {
        document.querySelectorAll(".topping").forEach((element) => {
                if (element.checked) {
                    let toppingObject = {};
                    toppingObject.name = element.value;
                    toppingObject.price = element.dataset.price;
                    toppingObject.cal = element.dataset.cal;
                    this.toppings.push(toppingObject)
                }
            }
        )
    }

    getCustomerSelection() {
        this.getChosenOptions(this.size, this.sizesContainer,);
        this.getChosenOptions(this.staffing, this.staffingContainer,);
        this.getChosenToppings();

    }

    getToppingPrice() {
        return this.toppings.reduce((summary, current) => {
            return summary + +current.price
        }, 0)
    }


    getToppingCal() {
        return this.toppings.reduce((summary, current) => {
            return summary + +current.cal
        }, 0)
    }

    calculatePrice() {
        return +this.size.price + +this.staffing.price + this.getToppingPrice()
    }

    calculateCalories() {
        return +this.size.cal + +this.staffing.cal + this.getToppingCal()
    }
}

window.addEventListener("load", ()=>{
    let menu = new Options();
    menu.unit()
});
document.querySelector(".getTotal").addEventListener('click', () => {
    let myBurger = new Hamburger();
    myBurger.getCustomerSelection();
    document.querySelector('.price').innerHTML = myBurger.calculatePrice();
    document.querySelector('.calories').innerHTML = myBurger.calculateCalories();


});



