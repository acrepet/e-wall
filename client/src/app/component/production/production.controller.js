(function () {

  'use strict';

  angular.module('ew-admin').controller('ProductionCtrl', function ($http) {
    'ngInject';

    var ctrl = this;

    $http
      .get('/api/public/category')
      .then(function(response){
        ctrl.categories = response.data;
      });


    ctrl.selectCategory = function(category){
      ctrl.currentTab = 'content';
      ctrl.category = category;
    }

    ctrl.cancel = function(){
      ctrl.currentTab=undefined;
    }
  });

})();