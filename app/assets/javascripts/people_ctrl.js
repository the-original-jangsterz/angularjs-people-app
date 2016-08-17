/* global angular */

(function() {
  angular.module('app').controller('peopleCtrl', function($scope, $http) {
    $scope.setup = function() {
      $http.get('/api/v1/people.json').then(function(response) {
        $scope.people = response.data;
      });
    };

    $scope.toggleBio = function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    };

    $scope.addPerson = function(inputName, inputBio) {
      var params = {
        name: inputName,
        bio: inputBio
      };
      $http.post('/api/v1/people.json', params).then(function(response) {
        $scope.people.push(response.data);
        $scope.errors = [];
      }, function(errorResponse) {
        $scope.errors = errorResponse.data.errors;
      });
    };

    $scope.deletePerson = function(inputIndex) {
      $scope.people.splice(inputIndex, 1);
    };

    window.$scope = $scope;
  });
})();
