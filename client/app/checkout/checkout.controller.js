'use strict';
(function () {

  class CheckoutComponent {

    constructor(Auth, $http, $localStorage) {
      this.$http = $http;
      this.getCurrentUser = Auth.getCurrentUser;
      this.localStorage = $localStorage;
      this.subtotal;
      this.vat;
      this.total;
      this.VAT_VAL;
      this.successfulPayOrder;
      this.alerts = [];
    }

    $onInit() {
      this.VAT_VAL = (19 / 100);
      this.updateOrder();
    }

    updateOrder() {
      var subT = 0;
      this.localStorage.cart.forEach(function (cartItem) {
        cartItem.price = _.find(cartItem.sndfx.publications, {'license': cartItem.license}).price;
        subT += cartItem.price;
      })
      this.subtotal = subT;
      this.vat = subT * this.VAT_VAL;
      this.total = this.subtotal + this.vat;
    }

    placeOrder() {
      if (this.localStorage.cart) {

        var orderedSndfxs = [];

        this.localStorage.cart.forEach(function (cartItem) {
          orderedSndfxs.push({
            sndfx: cartItem.sndfx,
            license: cartItem.license,
            price: cartItem.price
          })
        });

        this.$http.post('/api/orders', {
          user: this.getCurrentUser(),
          orderDate: new Date(),
          vat: this.VAT_VAL,
          publishedSndfxs: orderedSndfxs,
        });

        // save all new bought sndfx
        for (var i = 0; i < orderedSndfxs.length; i++) {
          this.addNewSndfx(orderedSndfxs[i]);
        }

        this.localStorage.cart = new Array();
        this.updateOrder();
        this.alerts.push({
          type: 'success',
          msg: 'Your order has been placed!' });
      }

    }

    addNewSndfx(newSndfx) {
      this.$http.post('/api/sndfxs', {
        creator: newSndfx.sndfx.creator,
        owner: this.getCurrentUser(),
        license: newSndfx.license,
        name: newSndfx.sndfx.name,
        class: newSndfx.sndfx.class,
        imgURL: newSndfx.sndfx.imgURL,
        rating: newSndfx.sndfx.rating,
        description: newSndfx.sndfx.description,
        filters: newSndfx.sndfx.filters,
        publications: []
      });
    }

    isCartEmpty() {
      var empty = false;
      if (this.localStorage.cart.length < 1) {
        empty = true;
      }
      return empty;
    }
    
    closeAlert(index) {
      this.alerts.splice(index, 1);
    };

  }

  angular.module('sebaWebappApp')
    .component('checkout', {
      templateUrl: 'app/checkout/checkout.html',
      controller: CheckoutComponent
    });

})();
