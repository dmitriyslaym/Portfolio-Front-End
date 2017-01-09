app.controller('formValidationCtrl', function($scope) {
	this.actionPattern = /^[A-Za-zА-Яа-я]/;

    this.getError = function(error, patternErrorMsg, minlengthErrorMsg) {
    	console.log(patternErrorMsg);
        if (angular.isDefined(error)) {
            if (error.pattern) {
                return patternErrorMsg;
            }
            else if (error.minlength) {
                return minlengthErrorMsg;
            }
        }
    };
});

