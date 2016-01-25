Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
    angular.module('socially', [
        'angular-meteor',
        'ui.router'
    ]);
  	//angular.module('socially', ['angular-meteor']);PoliceClient
    angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('parties', {
                url: '/parties',
                templateUrl: 'parites-list.html'
            })
            .state('partyDetails', {
                url: '/parties/policeClient',
                templateUrl: 'policeClient.html'
            });

       // })
        $urlRouterProvider.otherwise("/parties");
    }
    )

  	angular.module('socially').controller('PoliceClient', ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.parties = $meteor.collection(Parties);
      $scope.remove = function(party){
		$scope.parties.remove(party);
	  };
	  $scope.removeAll = function(){
		 $scope.parties.remove();
	  };

    $scope.inputing = function(){
      console.log('123');
    }

    }]);

    angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor',
        function($scope, $meteor){

            $scope.parties = $meteor.collection(Parties);
            $scope.remove = function(party){
                $scope.parties.remove(party);
            };
            $scope.removeAll = function(){
                $scope.parties.remove();
            };

            $scope.inputing = function(){
                console.log('123');
            }

        }]);
  	function onReady() {
	  angular.bootstrap(document, ['socially'], {
	    strictDi: true
	  });
	}

	if (Meteor.isCordova)
	  angular.element(document).on("deviceready", onReady);
	else
	  angular.element(document).ready(onReady);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {

      var parties = [
        {
          'type':'小型车辆',
          'number':'黑MR2345',
          'count':'5',
          'points':'2',
          'telnumber':'13324565432'
        }
      ];

      for (var i = 0; i < parties.length; i++)
        Parties.insert(parties[i]);

    }
   });
}