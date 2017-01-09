app.controller('TasksStorageCtrl', function($scope, Tasks) {
	if (localStorage.getItem("newValues") == null) {
		Tasks.getDefaultTasks().success(function(data) {
	      $scope.items = data;
	    });	
	}
	else {
        $scope.items = Tasks.getSavedTasks();
	}

	$scope.$watch('items', function() {
		Tasks.saveTasks($scope.items);
    }, true);
});