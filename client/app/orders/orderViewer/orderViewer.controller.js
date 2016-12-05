'use strict';
(function(){

class OrderViewerComponent {

  constructor($http, $scope, $location, socket) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.socket = socket;
    this.order;
  }

  $onInit() {
    this.$http.get('/api/orders/' + this.$location.search()._id)
      .then(response => {
        this.order = response.data;
        this.socket.syncUpdates('order', this.order);
        this.calculateOrder();
      });
  }

  calculateOrder() {
    var subT = 0;
    this.order.publishedSndfxs.forEach(function (orderItem) {
      subT += orderItem.price;
    })
    this.subtotal = subT;
    this.vat = subT * this.order.vat;
    this.total = this.subtotal + this.vat;
  }
}

angular.module('sebaWebappApp')
  .component('orderViewer', {
    templateUrl: 'app/orders/orderViewer/orderViewer.html',
    controller: OrderViewerComponent
  });

})();
