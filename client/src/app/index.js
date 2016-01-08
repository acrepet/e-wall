(function () {

  'use strict';

  angular.module('ew-structure', ['ui.router', 'ew-templates']);
  angular.module('ew-admin', ['ew-templates']);
  angular.module('ew-qrcode', ['ew-templates']);

  angular.module('ew', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngAnimate',
    'ew-structure',
    'ew-admin',
    'ew-qrcode'
   ]);

  /**
   * On startup we read info on application
   */
  angular.module('ew').run(function($http, $rootScope) {
    $http.get('/api/about').then(function(response){
      $rootScope.ewall = response.data;
    });
  });


  angular.module('ew').constant('qrCodeParameters', {
    qrcode_margin: 2,
    qrcode_foreground: '#C4B2F1',
    qrcode_foreground_na :  '#7d5ccf',
    qrcode_background: '#3a3a3a',
    qrcode_colour_hover: '#ECF714',
    qrcode_colour_text: '#7d5ccf'
  });

  angular.module('ew').constant('USER_ROLES', {
    all: '*',
    admin: 'ADMIN',
    public: 'PUBLIC',
    writer: 'WRITER'
  });

  angular.module('ew-admin').constant('STATE', {
    PENDING: 'PENDING',
    VALIDATED: 'VALIDATED',
    CENSORED: 'CENSORED'
  });

})();

