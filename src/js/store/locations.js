import api from "../services/apiService";

class Locations {
    constructor(api) {
        this.api = api;
        this.products = null;
        this.category = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.products(),
            this.api.category()
        ]);

        const [products, category] = response;
        this.category = category;
        this.products = products;

        return response;
    }

    getCreateNewCarts(data) {
        const cartsEl = document.querySelector('.row');

        const cartEl = document.createElement('div');
        cartEl.classList.add('card', 'col', 's12');
        cartEl.innerHTML = `
                <div class="card-image">
                    <img src="${data.image}" />
                </div>
                <div class="card-content">
                    <p>${data.title}</p>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1">More</a>
                    <div id="modal1" class="modal"></div>
                </div>
            `
        cartEl.addEventListener('click', () => this.modalContent(data.id))
        cartsEl.appendChild(cartEl);

    }

    getProductByCategories(category) {
        return this.products.filter(products => products.category === category);
    }

    createCarts(data) {

        this.products.forEach((carts) => {
            this.getCreateNewCarts(carts)
        });  
    }

    filterCategory(data) {
        data.preventDefault();
        const targetId = data.target.dataset.id;
        const obj = this.getProductByCategories(`${targetId}`);
        document.querySelector('.row').innerHTML = '';

        if(targetId) {
            obj.forEach(el => {
                this.getCreateNewCarts(el);
            })  
        } else {
            this.createCarts()
        } 
    }

    filter() {
        const list = document.querySelector('.list');
        const burger = document.querySelector('.burger');

        list.addEventListener('click', e => {
            this.filterCategory(e);
        })

        burger.addEventListener('click', e => {
            this.filterCategory(e);
        })

    }

    async modalContent(id) {
        const modalWindow = document.querySelector('.modal');
        M.Modal.init(modalWindow);

        const resp = await fetch('https://fakestoreapi.com/products/' + id)
        const respData = await resp.json();
        modalWindow.innerHTML = `
                <div class="modal-content">
                    <div class="card-image">
                        <img src="${respData.image}" />
                    </div>
                    <div class="card-content">
                        <p>${respData.title}</p>
                        <p>${respData.description}</p>
                        <p>${respData.price}$</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
        `
    }
}

const locations = new Locations(api);

export default locations;