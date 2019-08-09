const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cardUrl:'/getBasket.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/100x150',
    search: " ",
    filtered: [],
    itemsInCard:[],
    show:false,
  },
  methods: {
    getJson(url){
      console.log('dwdwd');
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      let thisItem = this.itemsInCard.find(el => +el.id_product === +product.id_product);
      if (thisItem){
        thisItem.quantity++;
      } else {
        this.itemsInCard.push(Object.assign({quantity:1}, product ))
      }

    },
    remove(item){
      this.itemsInCard = this.itemsInCard.filter( el => +el.id_product != +item.id_product
        );

      console.log(this.itemsInCard)
    },
    filterGoods(){
      const regexp = new RegExp(this.search, 'i');
      this.filtered = this.products.filter( el => regexp.test(el.product_name));
    }

  },
  computed:{
    emptyCart(){
      return this.itemsInCard.length === 0
    }

  },
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
          this.filtered.push(el)
        }
      });
    this.getJson(`${API + this.cardUrl}`)
        .then(data => {
          for(let el of data.contents){
            this.itemsInCard.push(el);
          }
        });
  }
});
