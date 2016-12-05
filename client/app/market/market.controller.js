'use strict';
(function () {

  class MarketComponent {

    constructor($http, $scope, $controller, $location, $localStorage, $uibModal, socket, $filter) {
      this.$http = $http;
      this.$scope = $scope;
      this.$location = $location;
      this.$uibModal = $uibModal;
      this.socket = socket;
      this.sndfxs = [];
      this.localStorage = $localStorage;
      this.alerts = [];
      this.sndfxsCopy = [];
      this.selectedRating = [false,false,false,false,false];
      this.priceRange = [false,false,false,false];
      this.sndfxsRating = [];
      this.sndfxsPrice = [];
      $scope.ItemsPerPageOptions = [5, 10, 15, 20];
      $scope.ItemsPerPage = $scope.ItemsPerPageOptions[0];

      this.pages = $scope.ItemsPerPage;
      this.pager = {};
    }

    $onInit() {
      this.$http.get('/api/sndfxs')
        .then(response => {
          this.sndfxs = response.data;
          this.socket.syncUpdates('sndfx', this.sndfxs);
          this.sndfxsCopy = this.sndfxs;
          this.sndfxsPrice = this.sndfxs;
          this.sndfxsCopy = this.sndfxs;
          this.setPage(1, this.pages, true);
        });
    }

    search(name, pages) {
      this.filterPrice(this.sndfxs, pages, false);
      this.filterRating(this.sndfxs, pages, false);
      var tmp = this.sndfxsCopy;
      var sndfxsNewCopy = [];
      name = name.toLowerCase();
      //console.log(tmp);
      for (var i = 0; i < tmp.length; i++) {
        var check = (tmp[i].name).toLowerCase();
        if (check.indexOf(name) > -1) {
          sndfxsNewCopy.push(tmp[i]);
        }
      }

      if (name === '') {
        this.filterPrice(this.sndfxs, pages, false);
        this.filterRating(this.sndfxs, pages, false);
      } else {
          this.sndfxsCopy = sndfxsNewCopy;
      }

      this.setPage(1, pages, false);
    }

    filterRating(amps, pages, check) {
      var ratings = [1, 2, 3, 4, 5];
      this.sndfxsRating = [];
      var flag1 = false;
      var flag2 = true;
      for (var index in amps) {
        var amp = amps[index];

        for (var i in  this.selectedRating) {
          if (this.selectedRating[i]) {
            if (amp.rating == ratings[i]) {
              this.sndfxsRating.push(amp);
              flag2 = false;
            } else {
              flag2 = false;
            }
          } else {
            flag1 = true;
          }
        }
        if (flag1 && flag2) {
          this.sndfxsRating.push(amp);
        }
      }
      this.sndfxsCopy = [];
      for (var i in this.sndfxsRating) {
        var currentAmp = this.sndfxsRating[i];
        if (this.containsObject(currentAmp, this.sndfxsPrice)) {
          this.sndfxsCopy.push(currentAmp);
        }
      }
      // this.sndfxsCopy = this.sndfxsRating;
      var page = this.sndfxsCopy.length ? 1 : 0;
      if (check) {
        this.setPage(page, pages, false);
      }

    };

    filterPrice(amps, pages, check) {
      var min = [0, 20, 50, 100];
      var max = [20, 50, 100, 5000];
      var flag1 = false;
      var flag2 = true;
      this.sndfxsPrice = [];
      for (var index in amps) {
        var amp = amps[index];
        var j = 0;
        for (var i in  this.priceRange) {
          if (this.priceRange[i]) {
            var price = amp.publications[j].price;
            if (min[i] <= price && price <= max[i]) {
              this.sndfxsPrice.push(amp);
              flag2 = false;
            } else {
              flag2 = false;
            }
          } else {
            flag1 = true;
          }
        }
        if (flag1 && flag2) {
          this.sndfxsPrice.push(amp);
        }
      }
      this.sndfxsCopy = [];
      for (var i in this.sndfxsPrice) {
        var currentAmp = this.sndfxsPrice[i];
        if (this.containsObject(currentAmp, this.sndfxsRating)) {
          this.sndfxsCopy.push(currentAmp);
        }
      }
      //this.sndfxsCopy = this.sndfxsPrice;
      var page = this.sndfxsCopy.length ? 1 : 0;
      if (check) {
        this.setPage(page, pages, false);
      }
    };

    containsObject(obj, list) {
      var i;

      for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
          return true;
        }
      }

      return false;
    }

    setPage(page, pages, flag) {
      if(flag){
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
      }
      // console.log(this.sndfxsCopy.length + "   " + page + "   " + pages);
      // get pager object from service
      this.pager = this.PagerService().GetPager(this.sndfxsCopy.length, page, pages);

      // get current page of items
      this.items = this.sndfxsCopy.slice(this.pager.startIndex, this.pager.endIndex);
    }

    PagerService() {
      // service definition
      var service = {};

      service.GetPager = GetPager;

      return service;

      // service implementation
      function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 5
        pageSize = pageSize || 1;
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 5) {
          // less than 5 total pages so show all
          startPage = 1;
          endPage = totalPages;
        } else {
          // more than 5 total pages so calculate start and end pages
          if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
          } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
          } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
          }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = startIndex + pageSize;

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
        var check = Math.floor(totalItems / pageSize);
        // return object with all pager properties required by the view

        return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages,
          check: check
        };
      }
    }

    orderPrice(page, pages, reverse) {
      if (reverse) {
        this.sndfxsCopy.sort(function (a, b) {
            return parseInt(a.publications[0].price, 10) - parseInt(b.publications[0].price, 10);
          }
        );
      } else {
        this.sndfxsCopy.sort(function (a, b) {
            return parseInt(b.publications[0].price, 10) - parseInt(a.publications[0].price, 10);
          }
        );
      }
      this.setPage(page, pages, false);
    }

    orderRating(page, pages, reverse) {
      if (reverse) {
        this.sndfxsCopy.sort(function (a, b) {
            return parseInt(a.rating, 10) - parseInt(b.rating, 10);
          }
        );
      } else {
        this.sndfxsCopy.sort(function (a, b) {
            return parseInt(b.rating, 10) - parseInt(a.rating, 10);
          }
        );
      }
      this.setPage(page, pages, false);
    }

    trySndfx(sndfx) {
      this.$uibModal.open({
        scope: this.$scope,
        templateUrl: 'app/sndfxs/sndfxConfigurator/sndfxPreview/sndfxPreview.html',
        controller: 'SndfxPreviewCtrl',
        resolve: {
          sndfx: function () {
            return sndfx;
          }
        },
        size: 'lg'
      });
    }

    addToCart(sndfx) {
      if (!_.find(this.localStorage.cart, {'_id': sndfx._id})) {
        this.localStorage.cart.push({
          _id: sndfx._id,
          sndfx: sndfx,
          license: sndfx.publications[0].license,
          price: sndfx.publications[0].price
        });

        this.$location.path('cart').search();
        
      } else {
        this.alerts.push({
          type: 'info',
          msg: ('"' + sndfx.name + '"' + ' is already in your cart')
        });
      }
    }

    ratingStars(count) {
      var ratings = [];
      for (var i = 0; i < count; i++) {
        ratings.push(i)
      }
      return ratings;
    }

    ratingEmptyStars(count) {
      count = 5 - count;
      var ratings = [];
      for (var i = 0; i < count; i++) {
        ratings.push(i)
      }
      return ratings;
    }

    closeAlert(index) {
      this.alerts.splice(index, 1);
    }

  }

  angular.module('sebaWebappApp')
    .component('market', {
        templateUrl: 'app/market/market.html',
        controller: MarketComponent
      }
    )
  ;

})();
