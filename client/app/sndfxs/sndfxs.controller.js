'use strict';
(function () {

  class SndfxsComponent {

    constructor(Auth, $http, $scope, $location, socket, dialogs, $window) {
      this.isCreator = Auth.isCreator;
      this.getCurrentUser = Auth.getCurrentUser;
      this.$http = $http;
      this.$scope = $scope;
      this.$location = $location;
      this.socket = socket;
      this.dialogs = dialogs;
      this.window = $window;
      this.sndfxs = [];

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('sndfx');
      });

      $scope.ItemsPerPageOptions = [5, 10, 15, 20];
      $scope.ItemsPerPage = $scope.ItemsPerPageOptions[0];

      this.pages = $scope.ItemsPerPage;
      this.pager = {};
    }

    $onInit() {
      this.getAllSndfx();
    }

    deleteSndfx(sndfx) {
       // this.dialog(sndfx);
      if (this.window.confirm("Please confirm?")) {
          this.$http.delete('/api/sndfxs/' + sndfx._id).then(this.getAllSndfx());
      } else {
      }
    }

    dialog(sndfx){
      var http = this.$http;
      this.dialogs.confirm('DELETE!',
        'Do you want to permanently delete ' + sndfx.name, {'size': 'sm'}
      ).result.then(
        function (btn) {
          http.delete('/api/sndfxs/' + sndfx._id)
          // this.getAllSndfx()
        },
        function (btn) {
        }
      );
    }

    setPage(page, pages, flag) {
      if (flag) {
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
      }
      // console.log(this.sndfxsCopy.length + "   " + page + "   " + pages);
      // get pager object from service
      this.pager = this.PagerService().GetPager(this.sndfxs.length, page, pages);

      // get current page of items
      this.items = this.sndfxs.slice(this.pager.startIndex, this.pager.endIndex);
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

    addNewSndfx() {
      if (this.newSndfx) {
        this.$http.post('/api/sndfxs', {
          creator: this.getCurrentUser(),
          owner: this.getCurrentUser(),
          license: 'full',
          name: this.newSndfx.name,
          class: 'amplifier',
          imgURL: 'imgURL',
          rating: Math.floor(Math.random() * (5 - 0 + 1)) + 0,
          description: 'Add a description...',
          filters: [],
          publications: []
        })
        this.newSndfx.name = '';
        this.getAllSndfx();
      }
    }

    getAllSndfx() {
      this.$http.get('/api/sndfxs', {params: {userId: this.getCurrentUser()._id}})
        .then(response => {
          this.sndfxs = response.data;
          this.socket.syncUpdates('sndfx', this.sndfxs);
          this.setPage(1, this.pages, true);
        });
    }

    configSndfx(sndfx) {
      // go to snd conf editor page
      this.$location.path('sndfxConfigurator').search({
        _id: sndfx._id
      })
    }

    publishSndfx(sndfx) {
      // go to snd conf editor page
      this.$location.path('publish').search({
        _id: sndfx._id
      })
    }

  }

  angular.module('sebaWebappApp')
    .component('sndfxs', {
      templateUrl: 'app/sndfxs/sndfxs.html',
      controller: SndfxsComponent
    });

})();
