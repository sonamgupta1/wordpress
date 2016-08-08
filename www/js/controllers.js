
wooCommerceApp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };
})

wooCommerceApp.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

wooCommerceApp.controller('PlaylistCtrl', function($scope, $stateParams) {
})
wooCommerceApp.controller('LoginController', function($scope, oauth1Client,$cordovaInAppBrowser,loginService) {
    var iabRef = null;

    var httpMethod = 'GET',
      url = 'http://www.eiffel.scaledesk.com/oauth1/request',
      parameters = {
        oauth_consumer_key : 'gKLZ5D6hlDa0',
        oauth_nonce : Math.floor((Math.random() * 100000) + 1),
        oauth_timestamp : Math.round((new Date()).getTime() / 1000.0),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0',
        oauth_callback : "http://www.eiffel.scaledesk.com/oauth1/access"
      },
      consumerSecret = 'JDBgelO7nDhkNTxFdTlR3PLrqS8YNKHKev6EG6tREad6M9XB'
      encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, ''),
      signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, '',
          { encodeSignature: false});
    if(signature){
        loginService.user_auth(parameters,signature).then(function(response) {
      var new_data = response.data;
      var oauth_token = new_data.substring(12, 36);
      var oauth_token_secret = new_data.substring(56, 104)

            console.log("oauth_token_secret",oauth_token_secret)

      function iabLoadStart(event) {
          // console.log("inside load start",event.url);
      }

      function iabLoadStop(event) {
          if (event.url.match("http://www.eiffel.scaledesk.com/oauth1/access")) {
              var url_data = event.url;
              var verifier_token = url_data.substring(98,122);
              console.log("verifier_token",verifier_token);
              loginService.final_auth(verifier_token,oauth_token,parameters,signature,oauth_token_secret).then(function(response){
                  console.log("final response",JSON.stringify(response))
              })
          }
      }


      function iabLoadError(event) {
          alert(event.type + ' - ' + event.message);
      }

      function iabClose(event) {
          iabRef.removeEventListener('loadstart', iabLoadStart);
          iabRef.removeEventListener('loadstop', iabLoadStop);
          iabRef.removeEventListener('loaderror', iabLoadError);
          iabRef.removeEventListener('exit', iabClose);
      }

     if(oauth_token,oauth_token_secret){
          iabRef = window.open('http://www.eiffel.scaledesk.com/oauth1/authorize?oauth_token='+oauth_token+'&oauth_token_secret='+oauth_token_secret, '_blank', 'location=no');
          iabRef.addEventListener('loadstart', iabLoadStart);
          iabRef.addEventListener('loadstop', iabLoadStop);
          iabRef.addEventListener('loaderror', iabLoadError);
          iabRef.addEventListener('exit', iabClose);

     }

  })
}
 

});