var app = angular.module("myApp", ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'tasksSettingsCtrl'
    }).
    when('/newtask', {
        templateUrl: 'views/newtask.html',
    }).
    otherwise({
        redirectTo: '/tasks'
    });
}]);


app.filter('numbers', function() {
    return function(values, input, type) {

        // function resetFilter() {
        //     angular.forEach(values, function(value,i) {
        //         values[i]['filteredBy' + type] = false;
        //     });
        //     return values;           
        // }

        if (angular.isString(input)) {
            var symb = input.charAt(0);
            if (symb == '>' || symb == '<') {
                var number = parseInt(input.slice(1));
                if (angular.isNumber(number) && number) {
                    angular.forEach(values, function(value,i) {
                        if (symb == '>') {
                            value[type] <= number ? values[i]['filteredBy' + type] = true : values[i]['filteredBy' + type] = false;
                        }
                        else if (symb == '<') {
                            value[type] >= number ? values[i]['filteredBy' + type] = true : values[i]['filteredBy' + type] = false;
                        }
                    });
                    return values;
                }
                else {
                    angular.forEach(values, function(value,i) {
                        values[i]['filteredBy' + type] = false;
                    });
                    return values;
                }                
            }
            else if (symb != '>' || symb != '<') {
                var number = parseInt(input);
                if (angular.isNumber(number) && number) {
                    angular.forEach(values, function(value,i) {
                        value[type] == number ? values[i]['filteredBy' + type] = false : values[i]['filteredBy' + type] = true;
                    });
                    return values;
                }
                else {
                    angular.forEach(values, function(value,i) {
                        values[i]['filteredBy' + type] = false;
                    });
                    return values;                    
                }
            }
        }
        else {
            angular.forEach(values, function(value,i) {
                values[i]['filteredBy' + type] = false;
            });
            return values;           
        }
    };
});

app.filter('complete', function() {
    return function(values, input) {
        if (input != '') {
            angular.forEach(values, function(value, i) {
                if (input == 'completed') {
                    value.done ? value.filteredByComplete = false : value.filteredByComplete = true;
                }
                else if (input == 'working on') {
                    value.done ? value.filteredByComplete = true : value.filteredByComplete = false;
                }
            });
            return values;            
        }
        else {
            angular.forEach(values, function(value,i) {
                values[i]['filteredByComplete'] = false;
            });
            return values;
        }
    };
});

app.filter('firstLetterUppercase', function() {
	return function(values) {
		angular.forEach(values, function(value, i) {
			if (value.text) {
				value.text = value.text.charAt(0).toUpperCase() + value.text.substr(1);
			}
		});
		return values;
	};
});

