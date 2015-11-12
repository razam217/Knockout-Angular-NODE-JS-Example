var mainApp = angular.module('mainApp',['ngRoute', 'chart.js']); //mainApp is our main module
mainApp.config(function($routeProvider) {
	$routeProvider
	
	.when('/', {
		templateUrl : 'views/main.html',
		controller : 'mainCtrl'
	})
	
	.when('/summary', {					// route for the home page
		templateUrl : 'views/executive_summary.html',
		controller  : 'executiveSummaryCtrl'
	})

	.when('/globalDataAnalysis', {				// route for the about page
		templateUrl : 'views/global_data_analysis.html',
		controller  : 'globalDataAnalysisCtrl'
	})

	.when('/malwareAttacks', {				// route for the contact page
		templateUrl : 'views/malware_attacks.html',
		controller  : 'malwareAttacksCtrl'
	}).otherwise({ redirectTo: "/"});
});