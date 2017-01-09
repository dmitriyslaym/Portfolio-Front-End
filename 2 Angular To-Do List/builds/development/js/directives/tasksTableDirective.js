app.directive('tasksTable', ['TimeRemain', 'TasksRemain', 'numbersFilter', 'completeFilter', 'firstLetterUppercaseFilter',  function(TimeRemain, TasksRemain, numbers, complete, firstLetterUppercase) {
	return {
		restrict: 'E',
		templateUrl: 'views/tasksTableTemplate.html',
		scope: {
			items: '=',
			settings: '='
		},
		link: function(scope, elem, attr) {
				scope.tasksRemain = function(items, item) {
		    		return TasksRemain(items, item);
				};				
				scope.deleteTask = function(items, item) {
    				items.splice(items.indexOf(item), 1);
  				};
  				scope.turnOnEditMode = function(items, item) {
        			items[items.indexOf(item)].editable = true;
    			};
   				scope.turnOffEditMode = function(items, item) {
    				if (event.target.nodeName != 'INPUT' && event.target.nodeName != 'SELECT' && event.target.nodeName != 'SPAN') {
    					items[items.indexOf(item)].editable = false;
    				}
  				};
  				scope.timeRemainCalc = function(items, item) {
  					var timeRemain = TimeRemain.getTimeRemain(items, item);
  					if (timeRemain >= 0) {
			        	if (timeRemain < 3) {
			        		items[items.indexOf(item)].timeRemainClass = "attention";
			        	}
			        	else {
			        		items[items.indexOf(item)].timeRemainClass = "success";
			        	}
			        	return timeRemain;
			        }
			        else {
			        	items[items.indexOf(item)].timeRemainClass = "attention";
			        	return 'Missed deadline!';
			        }
  				};				
			}
		}
}]);