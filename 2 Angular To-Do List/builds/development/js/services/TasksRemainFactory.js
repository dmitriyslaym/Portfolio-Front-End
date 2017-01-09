app.factory('TasksRemain', function TasksRemainFactory() {
	return function(items, item) {
			var count = 0;
	        angular.forEach(items, function(item) {
	        	count += item.done;
	        });
	        return items.length - count;
	};
});