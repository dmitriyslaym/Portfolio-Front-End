app.controller('RoutesCtrl', function($scope, $location) {
	$scope.$on('$locationChangeSuccess', function () {
		$scope.location = $location.path().replace('/', '');
	});
});