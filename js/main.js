class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this.render();
        this.summaryOfAll()

    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 1000},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    summaryOfAll() {
        return this.allProducts.reduce((summary, current) => {
            return summary + current.price
        }, 0);
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}


class Basket {
    constructor(container = ".basket") {
        this.container = constructor;
        //массив с обьектами всех выбранных продуктов
        this.productsInBasket = [];
        //общая стоимость всех товаров
        this.total = 0;
        //метод выведения корзины
        this.render();
        //метод возвращающий общую стоимость товаров
        this.getTotal();
        //метод навешивающий события
        this.bindHandlers();
        //метод добовляющий продукт
        this.addProduct();
        //метод удаляющий продукт из корзины
        this.removeProduct();
        //метод очищающий корзину
        this.clearData();

    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.productsInBasket) {
            const productObject = new choosenProduct(product);
            block.insertAdjacentHTML('beforeend', productObject.render());

        }
    }
}

class ChoosenProduct {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.price = product.price;
        this.id = product.id;
        this.amount = 0;
        this.subtotal = this.amount * this.price;
        this.img = product.img;
        this.color = product.color;
        // метод отображающий товар
        this.render();
        // метод выбора цвета товара
        this.chooseColor();
        // метод изменения количества данного товара в корзине
        this.chooseAmount();

    }


}

const list = new ProductList();
console.log(list.summaryOfAll());
