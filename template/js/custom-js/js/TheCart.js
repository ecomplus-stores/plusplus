import {
    i19checkout,
    i19continueShopping,
    i19discount,
    i19emptyCart
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    formatMoney
  } from '@ecomplus/utils'

  import ecomClient from '@ecomplus/client'
  
  import ecomCart from '@ecomplus/shopping-cart'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'
  import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'
  import ProductCard from '@ecomplus/storefront-components/src/ProductCard.vue'
  import DiscountApplier from '@ecomplus/storefront-components/src/DiscountApplier.vue'
  import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
  import EarnPointsProgress from '@ecomplus/storefront-components/src/EarnPointsProgress.vue'
  import RecommendedItems from '@ecomplus/storefront-components/src/RecommendedItems.vue'
  
  export default {
    name: 'TheCart',
  
    components: {
      APrices,
      CartItem,
      DiscountApplier,
      ShippingCalculator,
      EarnPointsProgress,
      ProductCard,
      RecommendedItems
    },
  
    props: {
      amount: {
        type: Object,
        default () {
          return {}
        }
      },
      checkoutUrl: {
        type: String,
        default: '/app/#/checkout'
      },
      productCardProps: {
        type: Object,
        default () {
          return {
            isSmall: true
          }
        }
      },
      zipCode: String,
      discountCoupon: String,
      modulesPayload: Object,
      ecomCart: {
        type: Object,
        default () {
          return ecomCart
        }
      }
    },
  
    data () {
      return {
        localZipCode: this.zipCode,
        canApplyDiscount: false,
        isCouponApplied: false
      }
    },
  
    computed: {
      i19checkout: () => i18n(i19checkout),
      i19continueShopping: () => i18n(i19continueShopping),
      i19discount: () => i18n(i19discount),
      i19emptyCart: () => i18n(i19emptyCart),
  
      cart () {
        return this.ecomCart.data
      },
  
      isValidCart () {
        return this.ecomCart.data.items.find(({ quantity }) => quantity)
      },

      bump () {
        if (this.cart.items && this.cart.items.length) {
            const promises = []
            const products = []
            const fetchProduct = _id => {
                return ecomClient.store({
                  url: `/products/${_id}.json`,
                  axiosConfig: {
                    timeout: 30000
                  }
                })
            }
            const array = ['656745ba2cd6b65959c359a9', '65650d4b2cd6b65959bfbfbf', '656745322cd6b65959c35791']
            for (let index = 0; index < array.length; index++) {
                const _id = array[index];
                const promise = fetchProduct(_id)
                promises.push(promise)
            }
            Promise.all(promises).then((data) => {
                data.forEach(item => products.push(item.data))
            })
            return products
        }
        return []
      },
  
      localDiscountCoupon: {
        get () {
          return this.discountCoupon
        },
        set (couponCode) {
          this.$emit('update:discount-coupon', couponCode)
        }
      }
    },
  
    methods: {
      formatMoney,
  
      selectShippingService (service) {
        this.$emit('select-shipping', service)
        this.$nextTick(() => {
          this.canApplyDiscount = true
        })
      },
  
      setDiscountRule (discountRule) {
        this.$emit('set-discount-rule', discountRule)
        this.$nextTick(() => {
          this.isCouponApplied = Boolean(this.discountCoupon && this.amount.discount)
        })
      }
    },
  
    watch: {
      localZipCode (zipCode) {
        this.$emit('update:zip-code', zipCode)
      },
  
      canApplyDiscount (canApplyDiscount) {
        if (!canApplyDiscount) {
          this.isCouponApplied = false
        }
      }
    },
  
    mounted () {
      this.$nextTick(() => {
        this.canApplyDiscount = !this.localZipCode
      })
      const { ecomCart } = this
      const getNumItems = () => ecomCart.data.items.reduce((numItems, { flags, quantity }) => {
        if (!flags || !flags.includes('freebie')) {
          numItems += quantity
        }
        return numItems
      }, 0)
      let oldNumItems = getNumItems()
      const cartWatcher = () => {
        this.canApplyDiscount = !this.localZipCode
        const numItems = getNumItems()
        if (oldNumItems !== numItems) {
          ecomCart.data.items.forEach(({ _id, quantity, flags }) => {
            if (Array.isArray(flags) && flags.includes('freebie') && quantity === 1) {
              ecomCart.removeItem(_id)
            }
          })
          oldNumItems = numItems
        }
      }
      ecomCart.on('change', cartWatcher)
      this.$once('hook:beforeDestroy', () => {
        ecomCart.off('change', cartWatcher)
      })
    }
  }
  