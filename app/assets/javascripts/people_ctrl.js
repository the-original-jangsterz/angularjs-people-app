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

    $scope.deletePerson = function(inputPerson) {
      var index = $scope.people.indexOf(inputPerson);
      $scope.people.splice(index, 1);
    };

    $scope.setOrderAttribute = function(inputAttribute) {
      if (inputAttribute !== $scope.orderAttribute) { // clicked on a different button
        $scope.isOrderDescending = false;
      } else { // clicked on the same button
        $scope.isOrderDescending = !$scope.isOrderDescending;
      }
      $scope.orderAttribute = inputAttribute;
    };

    $scope.getSortIcon = function(inputOrderAttribute) {
      if (inputOrderAttribute === $scope.orderAttribute) {
        return $scope.isOrderDescending ? '\u2193' : '\u2191';
      } else {
        return '';
      }
    };

    window.$scope = $scope;
  });
})();
