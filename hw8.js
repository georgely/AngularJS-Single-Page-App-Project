myApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/hw7Create', {
                    templateUrl: 'hw7Create.html',
                    controller: 'hw7CreateCtrl'
                }).
                when('/hw7Edit/:editId', {
                    templateUrl: 'hw7Edit.html',
                    controller: 'hw7EditCtrl'
                }).
				when('/', {
                    templateUrl: 'userList.html',
                    controller: 'home7Ctrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
}]);

myApp.service('userService', function() {
  var newArray = [
		{id:1, fName:'Hege', lName:"Pege", Age:"23", Sex:"Female", Major:"Sales", Pwd:"123" },
		{id:3, fName:'Kim',  lName:"Pim", Age:"24", Sex:"Male", Major:"Market", Pwd:"123" },
		{id:4, fName:'Sal',  lName:"Smith", Age:"25", Sex:"Male", Major:"Computer", Pwd:"123" },
		{id:7, fName:'Jack', lName:"Jones", Age:"22", Sex:"Male", Major:"Sales", Pwd:"123" },
		{id:9, fName:'John', lName:"Doe", Age:"24", Sex:"Male", Major:"Computer", Pwd:"123" },
		{id:12, fName:'Peter',lName:"Pan", Age:"32", Sex:"Male", Major:"Music", Pwd:"123" },
		{id:13, fName:'Jocelyn',lName:"Yi", Age:"29", Sex:"Female", Major:"History", Pwd:"123" },
		{id:15, fName:'Liyuan',lName:"Peng", Age:"27", Sex:"Female", Major:"Music", Pwd:"123" },
		{id:18, fName:'Yun',lName:"Ma", Age:"35", Sex:"Male", Major:"Market", Pwd:"123" },
		{id:21, fName:'Liyin',lName:"Zhao", Age:"19", Sex:"Female", Major:"Movie", Pwd:"123" },
		{id:22, fName:'Qucheng',lName:"Shen", Age:"23", Sex:"Female", Major:"Math", Pwd:"123" },
		{id:23, fName:'Jianhua',lName:"Huo", Age:"29", Sex:"Male", Major:"Movie", Pwd:"123" },
	];

    this.getArray = function () {
        return newArray;
    };
  
	 this.addNew = function(x){
		newArray.push(x);
	 };

	this.editUser = function(id, Age, Sex, Major){
		for( var i in newArray){
		  if( newArray[i].id == id) 
		  {
			newArray[i].Age = Age;
			newArray[i].Sex = Sex;
			newArray[i].Major = Major;
		  }
		}
	};
	  
	this.deleteUser = function(id){
		for( var i in newArray){
		  if( newArray[i].id == id) 
		  {
			newArray.splice(i, 1);
		  }
		}
	};
});

myApp.controller('home7Ctrl', function($scope, $http, userService) {
	$scope.fName = '';
	$scope.lName = '';
	$scope.Age = '';
	$scope.Sex = '';
	$scope.Major = '';
	$scope.passw1 = '';
	$scope.passw2 = '';
	$scope.users = userService.getArray();
	$scope.edit = true;
	$scope.hideform = true; 
	
	$scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    }

	$scope.deleteUser = function(id){
		userService.deleteUser(id);
	}
});

myApp.controller('hw7EditCtrl', function($scope, $location, $routeParams, userService) {
	$scope.editId = $routeParams.editId;
	$scope.users = userService.getArray();
	
	$scope.edit = false;
	var currentUser;
	for( var i in $scope.users){
		if( $scope.users[i].id == $scope.editId) currentUser = $scope.users[i];
	}
	$scope.fName = currentUser.fName;
	$scope.lName = currentUser.lName; 
	$scope.Age = Number(currentUser.Age);
	$scope.Sex = currentUser.Sex;
	$scope.Major = currentUser.Major;
	$scope.passw1 = '';
	$scope.passw2 = '';
	
	$scope.error = false;
	$scope.incomplete = true; 
	
	$scope.$watch('passw1',function() {$scope.test();});
	$scope.$watch('passw2',function() {$scope.test();});
	$scope.$watch('fName', function() {$scope.test();});
	$scope.$watch('lName', function() {$scope.test();});
	$scope.$watch('Age', function() {$scope.test();});
	$scope.$watch('Sex', function() {$scope.test();});
	$scope.$watch('Major', function() {$scope.test();});

	$scope.test = function() {
	  if ($scope.passw1 !== $scope.passw2) {
		$scope.error = true;
		} else {
		$scope.error = false;
	  }
	  $scope.incomplete = true; 
	  if( $scope.passw1.length > 0 &&  $scope.passw2.length > 0 &&
			$scope.fName.length > 0 && $scope.lName.length > 0 &&
			$scope.Sex.length > 0 && $scope.Major.length > 0  && $scope.Age > 0)
			$scope.incomplete = false;
	};

	$scope.editChange = function (){
		userService.editUser($scope.editId,$scope.Age,$scope.Sex,$scope.Major);
		$location.path('/');
	}
	
	$scope.cancle = function(){
		$location.path('/');
	}
});

myApp.controller('hw7CreateCtrl', function($scope, $location, userService) {
	$scope.error = false;
	$scope.incomplete = true; 
	$scope.users = userService.getArray();
	
	$scope.$watch('passw1',function() {$scope.test();});
	$scope.$watch('passw2',function() {$scope.test();});
	$scope.$watch('fName', function() {$scope.test();});
	$scope.$watch('lName', function() {$scope.test();});
	$scope.$watch('Age', function() {$scope.test();});
	$scope.$watch('Sex', function() {$scope.test();});
	$scope.$watch('Major', function() {$scope.test();});

	$scope.test = function() {
	  if ($scope.passw1 !== $scope.passw2) {
		$scope.error = true;
		} else {
		$scope.error = false;
	  }
	  $scope.incomplete = true; 
	  if( $scope.passw1.length > 0 &&  $scope.passw2.length > 0 &&
			$scope.fName.length > 0 && $scope.lName.length > 0 &&
			$scope.Sex.length > 0 && $scope.Major.length > 0  && $scope.Age > 0)
			$scope.incomplete = false;
	};
	
	$scope.createUser = function(){
		var newUser = { id : $scope.users[$scope.users.length - 1].id + 1, 
						fName : $scope.fName,
						lName : $scope.lName, 
						Age : $scope.Age, 
						Sex : $scope.Sex, 
						Major : $scope.Major, 
						Pwd : $scope.passw1 };
		userService.addNew(newUser);
		$location.path('/');
	}	
	
	$scope.cancle = function(){
		$location.path('/');
	}
});