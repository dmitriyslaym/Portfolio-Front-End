app.factory('TimeRemain', function TimeRemainFactory() {
	return {
		getTimeRemain: function(items, item) {
			var currentDate = Date.parse(new Date());
			var deadlineDate = Date.parse(items[items.indexOf(item)].deadline);
			return items[items.indexOf(item)].timeRemain = Math.floor((deadlineDate - currentDate)/(1000 * 60 * 60 * 24) + 1);
		},
	};
});
