var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.factory('myService', function(){
	var users = [
	{id:1, fName:'Hege', lName:"Pege", Age:"18", Sex:"Male" },
	{id:2, fName:'Kim',  lName:"Pim", Age:"22", Sex:"Female" },
	{id:3, fName:'Sal',  lName:"Smith", Age:"33", Sex:"Female" },
	{id:4, fName:'Jack', lName:"Jones", Age:"28", Sex:"Male" },
	{id:5, fName:'John', lName:"Doe", Age:"27", Sex:"Female" },
	{id:6, fName:'Peter',lName:"Pan", Age:"19", Sex:"Male" },
	{id:7, fName:'Hege11', lName:"Pege44", Age:"18", Sex:"Male" },
	];

	return{
		getUsers : function() {
			return users;
		},
		createANewUser : function(newUser) {
			users.push(newUser);
		}, 
		removeRow : function(id){
			for(var i in users){
				if( users[i].id == id){
					users.splice(i, 1);
				}
			}
  } // end delete

	}//end 1st return

});//end myService

//build routers
app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'UserList.html',
		controller  : 'mainController'
	})

	.when('/newUser', {
		templateUrl : 'NewUser.html',
		controller  : 'newUserController'
	})

	.when('/editUser/:passid', {
		templateUrl : 'EditUser.html',
		controller  : 'editUserController'
	})

	.otherwise({
		redirectTo : '/'
	});
});


app.controller('mainController', function($scope, myService) {

	$scope.users = myService.getUsers();
	//console.log($scope.users);
	
	$scope.sort = function(keyname) {
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}
	//var del = myService.removeRow(name);
	
	$scope.removeRow = function(id){
		myService.removeRow(id);
	};

    //https://hello-angularjs.appspot.com/searchtable
	/*$scope.removeRow = function(name){        
		var index = -1;   
		var comArr = eval( $scope.users );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].fName === name ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.users.splice( index, 1 );    
	};*/ 

	}); //end mainController




app.controller('newUserController', function($scope, $location, myService) {
	$scope.edit = true;
	var users = myService.getUsers();
	
	var test = function() {
		
		if ($scope.passw1 !== $scope.passw2) {
			$scope.error = true;
		} else {
			$scope.error = false;
		}
		$scope.incomplete = false;
		if ($scope.edit && (!$scope.fName.length ||
			!$scope.lName.length ||
			!$scope.passw1.length || !$scope.passw2.length || 
			!$scope.Age.length || !$scope.Sex.length)) {
			$scope.incomplete = true;
	}

	} // end test
	$scope.error = false;

	$scope.createNewUser = function() {
		test();
		$scope.$watch('passw1',function() {test();});
		$scope.$watch('passw2',function() {test();});
		$scope.$watch('fName', function() {test();});
		$scope.$watch('lName', function() {test();});
		$scope.$watch('Age', function() {test();});
		$scope.$watch('Sex', function() {test();});
		//$scope.incomplete = true;
		var maxLength = users[users.length - 1].id + 1;
		var newUser = { 
			id : maxLength, 
			fName : $scope.fName,
			lName : $scope.lName, 
			Age : $scope.Age, 
			Sex : $scope.Sex,  
			Pwd : $scope.passw1 
		};

		myService.createANewUser(newUser)
		$location.path('/');
	}

});//end newUserController




app.controller('editUserController', function($scope,$routeParams,$location,myService) {
	$scope.edit = true;
	$scope.passid = $routeParams.passid;
	var users = myService.getUsers();
	var uid = $scope.passid;
	//console.log(users[uid]);

	$scope.fName = users[uid].fName;
	$scope.lName = users[uid].lName;
	$scope.Sex = users[uid].Sex;
	$scope.Age = users[uid].Age;

	
	/*$scope.editUser = function(id) {
		console.log(id);
		
		$scope.fName = $scope.users[id - 1].fName;
		$scope.lName = $scope.users[id - 1].lName;
		console.log($scope.fName);

	}*/
}); //end editUserController






