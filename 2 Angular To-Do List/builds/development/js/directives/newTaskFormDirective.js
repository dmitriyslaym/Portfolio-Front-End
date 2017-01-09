app.directive('newTaskForm', function(Tasks) {
	return {
		restrict: 'E',
		templateUrl: 'views/newTaskFormTemplate.html',
		controller: 'formValidationCtrl',
		controllerAs: 'validationCtrl',
		scope: {
			items: '=',
			pattern: '@',
			minlength: '@'
		},
		link: function(scope, element, attr) {
			var inputs = scope.inputs;
			var module = document.getElementById('module');
			scope.addItem = function (items, inputs) {
	            Tasks.addTask(items, scope.inputs);
	            inputs.itemText = '';
	            inputs.itemDeadline = ''; 
	            inputs.itemPriority = '';  
	            scope.showModule = function() {
	            	return true;
	            };
  			};
  			scope.closeModule = function() {
  				scope.showModule = false;			
			};
		}
	};
});