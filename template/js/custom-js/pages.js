// Add your custom JavaScript for storefront pages here.
import Vue from 'vue'

const affiliateLinkDiv = document.getElementById('affiliate-link')
if (affiliateLinkDiv) {
  import('./components/AffiliateLink.vue').then(({ default: AffiliateLink }) => {
    new Vue(AffiliateLink).$mount(affiliateLinkDiv)
  })
}