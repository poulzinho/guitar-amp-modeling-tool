'use strict';
(function(){

class OrdersComponent {

  constructor(Auth, $http, $scope, $location, socket) {
    this.getCurrentUser = Auth.getCurrentUser;
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.socket = socket;
    this.orders = [];
  }

  $onInit() {
    this.$http.get('/api/orders', {params: {userId: this.getCurrentUser()._id}})
      .then(response => {
        this.orders= response.data;
        this.socket.syncUpdates('order', this.orders);
      });
  }
  
  viewOrder(order) {
    // go to snd conf editor page
    this.$location.path('orderViewer').search({
      _id: order._id
    })
  }

}

angular.module('sebaWebappApp')
  .component('orders', {
    templateUrl: 'app/orders/orders.html',
    controller: OrdersComponent
  });

})();
