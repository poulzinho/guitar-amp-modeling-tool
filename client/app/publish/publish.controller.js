'use strict';
(function () {

  class PublishComponent {
    constructor($http, $scope, $controller, $location, $uibModal, socket) {
      this.$http = $http;
      this.$scope = $scope;
      this.$location = $location;
      this.$uibModal = $uibModal;
      this.socket = socket;
      this.alerts = [];
      this.sndfxLicenses = [];
    }

    $onInit() {
      this.getSndfxInfo();
    }

    getSndfxInfo() {
      this.$http.get('/api/sndfxs/' + this.$location.search()._id)
        .then(response => {
          this.$scope.sndfx = response.data;
          this.getLicenses();
        });
    }

    getLicenses() {

      this.sndfxLicenses = [
        {
          license: 'basic',
          price: 0,
          updated: null,
          published: false
        },
        {
          license: 'full',
          price: 0,
          updated: null,
          published: false
        }
      ];

      var publications = this.$scope.sndfx.publications;
      if (publications) {

        for (var i = 0; i < publications.length; i++) {
          var publication = publications[i];
          if (publication.license === 'basic') {
            this.sndfxLicenses[0] = {
              license: publication.license,
              price: publication.price,
              updated: publication.updated,
              published: true
            };
          } else if (publication.license === 'full') {
            this.sndfxLicenses[1] = {
              license: publication.license,
              price: publication.price,
              updated: publication.updated,
              published: true
            };
          }
        }

      }

    }

    updateSndfxInfo() {
      this.$http.put('/api/sndfxs/' + this.$scope.sndfx._id, this.$scope.sndfx)
        .then(response => {
          this.$scope.sndfx = response.data;
        });
    }

    publishSndfx(sndfxLicense) {
      sndfxLicense.published = true;
      sndfxLicense.updated = Date.now();
      this.$scope.sndfx.publications.splice(
        _.findIndex(this.$scope.sndfx.publications, {'license': sndfxLicense.license}),
        0,
        sndfxLicense
      );
      this.$http.put('/api/sndfxs/' + this.$scope.sndfx._id, this.$scope.sndfx)
        .then(response => {
          this.$scope.sndfx = response.data;
          this.getLicenses();
        });

      this.alerts.push({
        type: 'success',
        msg: (sndfxLicense.license.toUpperCase() + ' license for "' + this.$scope.sndfx.name + '"' + ' was published on the market')
      });
    }

    unpublishSndfx(sndfxLicense) {
      sndfxLicense.published = false;
      sndfxLicense.price = 0;
      sndfxLicense.updated = null;
      this.$scope.sndfx.publications.splice(
        _.findIndex(this.$scope.sndfx.publications, {'license': sndfxLicense.license}),
        1
      );
      this.$http.put('/api/sndfxs/' + this.$scope.sndfx._id, this.$scope.sndfx)
        .then(response => {
          this.$scope.sndfx = response.data;
          this.getLicenses();
        });

      this.alerts.push({
        type: 'warning',
        msg: (sndfxLicense.license.toUpperCase() + ' license for "' + this.$scope.sndfx.name + '"' + ' was removed from the market')
      });
    }

    closeAlert(index) {
      this.alerts.splice(index, 1);
    };

  }

  angular.module('sebaWebappApp')
    .component('publish', {
      templateUrl: 'app/publish/publish.html',
      controller: PublishComponent
    });

})();
