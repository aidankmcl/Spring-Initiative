
angular.module('springInitiativeApp')
  .factory('utilityService', [function () {
    var utilityService = {};

    utilityService.findWithAttr = function(array, attr, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][attr] === value) return i;
      }
      return -1;
    }

    utilityService.mongoDate = function(objectID) {
      var timehex = objectID.slice(0,8);
      var secondsSinceEpoch = parseInt(timehex, 16);
      return dt = new Date(secondsSinceEpoch*1000);
    };

    utilityService.getDate = function(item) {
      var date = (item.date) ? moment(item.date) : moment(utilityService.mongoDate(item._id));
      return date.format('MM/DD/YYYY');
    }

    utilityService.getObject = function(array, attr, value) {
      return array[utilityService.findWithAttr(array, attr, value)];
    }

    utilityService.schemaHasNumberField = function(schema) {
      var viableInput = ['number', 'stars'];

      for (var i=0; i<viableInput.length; i++) {
        var index = utilityService.findWithAttr(schema.questions, 'input', viableInput[i]);
        if (index > -1) return true;
      }

      return false;
    }

    utilityService.removeFromArray = function(array, attr, value) {
      return array.splice(utilityService.findWithAttr(array, attr, value), 1);
    }

    utilityService.logErr = function error(res) {
      console.log('error', res);
    }

    utilityService.sanitizeSchema = function(scopeSchema) {
      var schema = angular.copy(scopeSchema);
      schema.tag = schema.name.toLowerCase().split(" ").join("_");
      for (var i=0; i<schema.questions.length; i++) {
        schema.questions[i]["key"] = schema.questions[i].name.toLowerCase().split(" ").join("_");
      }
      return angular.toJson(schema);
    }

    utilityService.getKeys = function(notes) {
      var keys = {};
      notes.forEach(function(note) {
        Object.keys(note).forEach(function(key) {
          keys[key] = key;
        });
      })
      return keys;
    }

    return utilityService;
  }]);