app.directive('taskSettings', function() {
	return {
		restrict: 'E',
		templateUrl: 'views/tasksSettingsTemplate.html',
		scope: {
			settings: '='
		}
	};
});