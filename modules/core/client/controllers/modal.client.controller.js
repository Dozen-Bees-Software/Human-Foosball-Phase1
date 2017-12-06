/*'use strict';
//This file is unused and shold be ignored.
var playerModal = angular.module('core').controller('modalController', function ($scope) {
  $scope.showModal = false;
  $scope.open = function(){
    $scope.showModal = !$scope.showModal;
  };
});

playerModal.directive('modal', function () {
  return {
      template: '<div class="modal fade">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ title }}</h4>' +
              '</div>' +
              '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {

        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value === true){
            document.getElementById('element').modal('show');
          }
          else
            document.getElementById('element').modal('hide');
        });

        document.getElementById('element').on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        document.getElementById('element').on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
});*/
