app.factory('Tasks', function TasksFactory($http) {
	return {
		getDefaultTasks: function() {
			return $http.get('js/defaultTasks.json');
		},
		getSavedTasks: function() {
        	return JSON.parse(localStorage.getItem("newValues"));
		},
		saveTasks: function(items) {
        	var sItems = JSON.stringify(items);
        	localStorage.setItem("newValues", sItems);
		},
		addTask: function(items, inputs) {
			items.push({ text: inputs.itemText, done: false, deadline: inputs.itemDeadline, priority: inputs.itemPriority });
		}
	};
});