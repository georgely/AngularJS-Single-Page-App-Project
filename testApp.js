var app = angular.module('myApp', []);

app.factory("UserService", function() {
	var users = [
	{id:1, fName:'Hege', lName:"Pege", Age:"18", Sex:"Male" },
	{id:2, fName:'Kim',  lName:"Pim", Age:"22", Sex:"Female" },
	{id:3, fName:'Sal',  lName:"Smith", Age:"33", Sex:"Female" },
	{id:4, fName:'Jack', lName:"Jones", Age:"28", Sex:"Male" },
	{id:5, fName:'John', lName:"Doe", Age:"27", Sex:"Female" },
	{id:6, fName:'Peter',lName:"Pan", Age:"19", Sex:"Male" },
	{id:7, fName:'Hege11', lName:"Pege44", Age:"18", Sex:"Male" },
	];

	return {
		getUsers : function(){
			return users;
		}
	}
});

app.controller("MyCtrl", function($scope, UserService) {
	$scope.users = UserService.getUsers();
	console.log($scope.users);
	console.log("//<br>" + "hello");

});

app.controller("AnotherCtrl", function($scope, UserService) {
	$scope.firstUser = UserService.first();
});
