'use strict';
(function () {

  class CartComponent {

    constructor($localStorage) {
      this.localStorage = $localStorage;
      this.subtotal;
      this.vat;
      this.total;
      this.VAT_VAL;
    }

    $onInit() {
      this.VAT_VAL = (19 / 100);
      this.updateCart();
    }

    removeFromCart(cartItem) {
      this.localStorage.cart.splice(this.localStorage.cart.indexOf(cartItem), 1);
      this.updateCart();
    };

    updateCart() {
      var subT = 0;
      this.localStorage.cart.forEach(function (cartItem) {
        cartItem.price = _.find(cartItem.sndfx.publications, {'license': cartItem.license}).price;
        subT += cartItem.price;
      })
      this.subtotal = subT;
      this.vat = subT * this.VAT_VAL;
      this.total = this.subtotal + this.vat;
    }

    isCartEmpty() {
      var empty = false;
      if (this.localStorage.cart.length < 1) {
        empty = true;
      }
      return empty;
    }

  }

  angular.module('sebaWebappApp')
    .component('cart', {
      templateUrl: 'app/cart/cart.html',
      controller: CartComponent
    });

})();
