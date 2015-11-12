
mainApp.controller('mainCtrl', function($scope, $rootScope) {
	$scope.message = 'This is our Home Page';
});

mainApp.controller('executiveSummaryCtrl', function($scope, $rootScope) {
	$scope.message = 'Executive Summary';
});

mainApp.controller('globalDataAnalysisCtrl', function($scope, $rootScope) {
	$scope.message = 'Global Data Analysis';
});

mainApp.controller('malwareAttacksCtrl', function($scope, $rootScope, $http) {
	$scope.message = 'Malware Attacks';
});