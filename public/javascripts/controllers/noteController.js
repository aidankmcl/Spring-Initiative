angular.module('springInitiativeApp')
  .controller('noteController', ["$scope", "$http", "$state", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $http, $state, $stateParams, dataFactory, utilityService) {
      $scope.activeSchema = dataFactory.activeSchema;
      $scope.activeStudents = dataFactory.activeStudents;
      $scope.actionSteps = dataFactory.actionSteps;
      $scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);
      $scope.utilityService = utilityService;
      $scope.activeItems = dataFactory.activeItems;
      
      $scope.notes = {};
      $scope.noteFields = {};
      $scope.colorScheme = {};
      $scope.hiddenFields = ["noteType", "studentID", "entityID", "_id", "__v", "created", "date", "attachments"];
      $scope.now = new Date().getTime();
      $scope.editNote = {
        attachments: []
      };

      $scope.showNoteID = $stateParams.note_id || '';
      if ($scope.showNoteID) {
        dataFactory.getNote($scope.showNoteID).then(function(res) {
          $scope.showNote = res.data[0];
          $scope.showNote.date = utilityService.getDate($scope.showNote);
          $scope.editNote = $scope.showNote;
        }, utilityService.logErr);
      }

      $scope.$on('setSchema', function(event, schema) {
        $scope.activeSchema = schema;
      });

      $scope.$on('actionSteps', function(event, actionSteps) {
        $scope.actionSteps = actionSteps;
        $scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);
      });

      $scope.$on('toggleStudent', function(event, students) {
        $scope.activeStudents = students;
        $scope.studentIDs = _.map(students, '_id');
      });

      $scope.$on('toggleCohort', function(event, cohorts) {
        $scope.activeCohorts = cohorts;
        $scope.cohortIDs = _.map(cohorts, '_id');
      });

      $scope.$on('activeItems', function(event, items) {
        $scope.activeItems = items;
        $scope.refreshNotes();
      });

      $scope.setItem = dataFactory.setItem;

      $scope.startNote = function(schema) {
        dataFactory.setSchema(schema);
        $state.go('index.dashboard.addNote');
      }

      $scope.refreshNotes = function() {
        if (!$scope.schemas || $scope.activeItems.length == 0) return;

        var items = ($scope.activeStudents.length > 0) ? $scope.activeStudents : $scope.activeItems;
        $scope.schemas.forEach(function(schema) {
          $scope.getNotes(items, schema.name, $scope.startDate, $scope.endDate);
        });

        for (var i=0; i<items.length; i++) {
          $scope.colorScheme[items[i]._id] = "color-" + i;
        }
      }

      $scope.setSchema = function(schema) {
        $scope.activeSchema = schema;
      }

      $scope.refreshSchemas = function() {
        dataFactory.getSchemas({}).then(function success(res) {
          $scope.schemas = res.data.data;
          $scope.activeSchema = (JSON.stringify($scope.activeSchema) !== JSON.stringify({})) ?
            $scope.activeSchema : $scope.schemas.filter(function (v) { return !v.private })[0];
          $scope.activeSchema = $scope.schemas.filter(function(schema) {
            return schema.name == $scope.activeSchema.name
          })[0];
          $scope.refreshNotes();
        }, utilityService.logErr);
      }
      $scope.refreshSchemas();

      $scope.selectOption = function(question, answer) {
        if ($scope.editNote[question.key] === answer) {
          $scope.editNote[question.key] = '';
        } else {
          $scope.editNote[question.key] = answer;
        }
      }

      $scope.addAttachment = function(attachment) {
        $scope.editNote.attachments.push(attachment);
        $scope._tempAttachment = null;
      }

      $scope.createNote = function(item, entityID, activeSchema) {
        item.date = new Date(item.date).getTime();
        dataFactory.addNote(item, entityID, activeSchema.name).then(function success(res) {
          alert("Note Created Successfully!");
          $state.go('index.dashboard.viewStudent', {entityID: entityID, activeSchema: $scope.activeSchema});
          $scope.refreshNotes();
        }, utilityService.logErr);
      }

      $scope.getNotes = function(activeItems, noteType, startDate, endDate) {
        if (!activeItems || activeItems.length < 1) return;

        dataFactory.getNotes(activeItems, noteType, startDate, endDate).then(function success(res) {
          $scope.notes[noteType] = res.data.data;
          $scope.noteFields[noteType] = res.data.noteFields;
        }, utilityService.logErr);
      }

      $scope.updateNote = function(editedNote) {
        dataFactory.updateNote(editedNote).then(function success(res) {
          alert("Note Updated Successfully!");
          $state.go('index.dashboard.viewStudent', {entityID: editedNote.entityID, activeSchema: $scope.activeSchema});
          $scope.refreshNotes();
        }, utilityService.logErr);
      }

      $scope.logNote = function(note) {
        console.log(note);
      }
    }
  ]);