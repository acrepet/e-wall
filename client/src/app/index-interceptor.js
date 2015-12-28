(function () {

  'use strict';

  angular.module('ew').config(function($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor', 'spinnerInterceptor');
  });

  angular.module('ew-structure').factory('errorInterceptor', function ($rootScope, $q) {
    'ngInject';

    function isFunctionalError(response) {
      return response.headers && response.headers('Content-Type') &&
        response.headers('Content-Type').indexOf('application/json') === 0 &&
        angular.isDefined(response.data.message);
    }

    return {
      responseError: function(response){
        if ((response.status === 401 || response.status === 403) && (response.config && !response.config.ignoreErrorRedirection)) {
          var deferred = $q.defer();
          $rootScope.$emit('$ewError', {type : 'RIGHTS'});
          return deferred.promise;
        }
        else if (!isFunctionalError(response) && (response.config && !response.config.ignoreErrorRedirection)) {
          $rootScope.$emit('$ewError', response);
        }
        return $q.reject(response);
      }
    };
  });

  /**
   * This interceptor is used to display a spinner when a request is executed
   */
  angular.module('ew-structure').factory('spinnerInterceptor', function ($rootScope, $q) {
    'ngInject';

    return {
      request: function(config) {
        $rootScope.spinner = 'on';
        return config;
      },

      requestError: function(rejection) {
        $rootScope.spinner = 'off';
        return $q.reject(rejection);
      },

      response: function(response) {
        $rootScope.spinner = 'off';
        return response;
      },

      responseError: function(rejection) {
        $rootScope.spinner = 'off';
        return $q.reject(rejection);
      }
    };
  });


})();
