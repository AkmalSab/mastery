const app = Vue.createApp({
    data: function(){
        return {
            cart: [],
            premium: false
        }
    },
    computed: {
    },
    methods: { 
        updateCart(id){
            this.cart.push(id)
        },
        removeCart(id){
            const index = this.cart.indexOf(id)
            if(index > -1) {
                //(The position to add/remove items, Number of items to be removed.)
                this.cart.splice(index, 1)
            }
        }
    }
})