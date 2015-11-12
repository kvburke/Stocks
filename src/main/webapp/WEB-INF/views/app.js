var app = angular.module('app', ['ui.grid']);
var grid1;
app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
   
	
	$interval(run, 5000);
	function run(){
	$http.get('http://54.172.193.233:8080/stocks/Controller1/grid')
	 .success(function(data, status, headers, config) {
	      $scope.myData = data;
	 })
	 .error(function(error, status, headers, config) {
	      console.log(status);
	      console.log("Error occured");
	 });
	
	};
	
	
	
	$scope.$watch('$viewContentLoaded', function(){
	    run();
	 });
	
	
	

}]);