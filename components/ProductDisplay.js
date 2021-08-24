app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img 
                    v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ sale }}</p>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>

                <p>Shipping : {{ shipping }}</p>
                
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <ul>
                    <li v-for="(size, index) in sizes" v-bind:key="index">{{ size }}</li>
                </ul>
                <div 
                    class="color-circle"
                    v-for="(variant, index) in variants" 
                    v-bind:key="variant.id" 
                    v-on:mouseover="updateVariant(index)"
                    v-bind:style="{ backgroundColor: variant.color }">
                </div>
                <button 
                    class="button" 
                    v-bind:class="{ disabledButton: !inStock }"
                    v-bind:disabled="!inStock"
                    v-on:click="addToCart">
                    Add to Cart
                </button>
                <button class="button" v-on:click="removeFromCart">Remove Item</button>
                <a v-bind:href="url">Made by Vue Mastery</a>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data: function(){
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "A warm fuzzy pair of socks",
            url: "https://www.vuemastery.com/",
            onSale: true,
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyster'],
            sizes: ['S', 'M', 'L', 'XL'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
            ],
            reviews: [],
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        },
        shipping(){
            if(this.premium)
                return 'Free'
            else
                return 2.99
        }           
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            // this.cart += 1
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
            // if(this.cart >= 1)
            //     this.cart -= 1
        },   
        updateVariant(index) {
            this.selectedVariant = index
        },  
        addReview(review) {
            this.reviews.push(review)
        }
    }
})