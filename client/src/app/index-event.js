(function () {

  'use strict';
  /*global componentHandler */

  /**
   * Event handlers for errors (internal, security...)
   */
  angular.module('ew').run(function ($rootScope, $state, $timeout) {
    'ngInject';

    var waitinPopupTimeout;
    $rootScope.waitingPopup = false;

    $rootScope.wait = function() {
      if(!waitinPopupTimeout){
        waitinPopupTimeout = $timeout(function(){
          //document.location.href='#top';
          $rootScope.waitingPopup = true;
        }, 100);
      }
    };

    $rootScope.stopWaiting = function() {
      $rootScope.waitingPopup = false;
      if(waitinPopupTimeout){
        $timeout.cancel(waitinPopupTimeout);
      }
    };

    //Error are catched to redirect user on error page
    $rootScope.$on('$ewError', function (event, response) {
      $state.go('ewerror', {error: response});
    });

  });

})();
