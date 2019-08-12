Vue.component("error",{
    data(){
        return{
            message: ""
        }
    },
    methods: {
        getTextMsg(value){
            this.message = value
        }
    },
    template:`<div v-if="message"><h3>There is an error    {{message}}</h3></div>`
});