angular.module("demo").controller("AdvancedDemoController", function($scope) {

    $scope.dragoverCallback = function(event, index, external, type) {
        $scope.logListEvent('dragged over', event, index, external, type);
        return index < 10; // Disallow dropping in the third row.
    };

    $scope.dropCallback = function(event, index, item, external, type) {
        $scope.logListEvent('dropped at', event, index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
        return item;
    };

    $scope.logEvent = function(message, event) {
        console.log(message);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };

    // Initialize model
    $scope.model = [[], []];
    var id = 10;
    angular.forEach(['all', 'move', 'copy', 'link', 'copyLink', 'copyMove'], function(effect, i) {
      var container = {items: [], effectAllowed: effect};
      for (var k = 0; k < 7; ++k) {
        container.items.push({label: effect + ' ' + id++, effectAllowed: effect});
      }
      $scope.model[i % $scope.model.length].push(container);
    });

    $scope.$watch('model', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});
