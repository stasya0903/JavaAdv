Vue.component('search', {
    data() {
        return {
            userSearch: "",
        }
    },
    methods: {},
    template: `<form action="#" method="post" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
           <input type="text" class="search-field" v-model="userSearch">
           <button class="btn-search" type="submit">search
          <!--<i class="fas fa-search"></i>-->
            </button>
        </form> `
});
