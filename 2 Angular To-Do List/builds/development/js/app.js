var app = angular.module("myApp", []);

app.controller("ListCtrl", function($scope) {
    $scope.viewType = 'table';
    $scope.actionPattern = /^[A-Za-zА-Яа-я]/;
    // Checking if there is any useful information in local store - if there is none, set default values
    if (localStorage.getItem("newValues") == null) {
        $scope.items = [
          { text: 'Go to Gym', done: false, deadline: "2016-12-30", priority: 5 },
          { text: 'Prepare for a test', done: false, deadline: "2016-12-30", priority: 5 },
          { text: 'Find more information about AngularJS', done: false, deadline: "2016-12-30", priority: 5 },
          { text: 'Read a book', done: false, deadline: "2016-12-30", priority: 4 }
        ];
    }
    else {
        var sNewValues = localStorage.getItem("newValues");
        $scope.items = JSON.parse(sNewValues);
    }

    // Updating local store on each change of the model
    $scope.$watch('items', function(oldValue, newValue) {
        var sItems = JSON.stringify($scope.items);
        localStorage.setItem("newValues", sItems);
    }, true);

    $scope.addItem = function () {
            $scope.items.push({ text: $scope.itemText, done: false, deadline: $scope.itemDeadline, priority: $scope.itemPriority });
            $scope.itemText = '';
            $scope.itemDeadline = ''; 
            $scope.itemPriority = '';            
    };

    $scope.getError = function(error) {
        if (angular.isDefined(error)) {
            if (error.pattern) {
                return "The task can't start with a number";
            }
            else if (error.minlength) {
                return "The task's length can't be less than 5"
            }
        }
    };

    $scope.remain = function () {
        var count = 0;
        angular.forEach($scope.items, function(item) {
            count += item.done;
        });
        return $scope.items.length - count;
    };

    $scope.deleteTask = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1); // this.$index - отобразит порядковый номер элемента
    };

    $scope.turnOnEditMode = function(item) {
        $scope.items[$scope.items.indexOf(item)].editable = true;
    }

    $scope.turnOffEditMode = function(item) {
    	if (event.target.nodeName != 'INPUT' && event.target.nodeName != 'SELECT' && event.target.nodeName != 'SPAN') {
    		$scope.items[$scope.items.indexOf(item)].editable = false;
    	}
    }

    $scope.timeRemainCalc = function(item) {
        var currentDate = Date.parse(new Date());
        var deadlineDate = Date.parse($scope.items[$scope.items.indexOf(item)].deadline);
        $scope.items[$scope.items.indexOf(item)].timeRemain = Math.floor((deadlineDate - currentDate)/(1000 * 60 * 60 * 24) + 1);
        if ($scope.items[$scope.items.indexOf(item)].timeRemain >= 0) {
        	if ($scope.items[$scope.items.indexOf(item)].timeRemain < 3) {
        		$scope.items[$scope.items.indexOf(item)].timeRemainClass = "attention";
        	}
        	else {
        		$scope.items[$scope.items.indexOf(item)].timeRemainClass = "success";
        	}
        	return $scope.items[$scope.items.indexOf(item)].timeRemain;
        }
        else {
        	$scope.items[$scope.items.indexOf(item)].timeRemainClass = "attention";
        	return 'Missed deadline!';
        }
    };

    $scope.dataFilter = 'fullDate';

    $scope.setDateFilter = function() {
        dateFilter == 'shortDate' ? $scope.dataFilter = 'shortDate' : $scope.dataFilter = 'fullDate';
    };
});

app.filter('numbersFilter', function() {
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

app.filter('completeFilter', function() {
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

