angular.module('springInitiativeApp')
	.filter('capitalize', function() {
	    return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
	    }
	})

	.filter('split', function() {
		return function(input) {
			return input.split('_').join(' ')
		}
	})

	.filter('mongoDate', function(utilityService) {
		return function(objectID) {
			// first 4 bytes are the timestamp portion (8 hex chars)
			var timehex = objectID.slice(0,8);
			// convert to a number... base 16
			var secondsSinceEpoch = parseInt(timehex, 16);
			// convert to milliseconds, and create a new date
			return dt = new Date(secondsSinceEpoch*1000);
		};
	})

	.filter('truncate', function() {
		return function(input, length) {
			var length = length || 30,
				input = input || '',
				text = input.toString();
			return (text.length > length) ? text.slice(0, length) + '...' : text;
		}
	})
