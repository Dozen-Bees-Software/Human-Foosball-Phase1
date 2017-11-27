/*
describe('Unit: brackets controller', function(){
    var $controller, UsersController;

    console.log('first');

    beforeEach(angular.mock.module('brackets.client.controller'));

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        UsersController = $controller('UsersController, {}');
    }));

    describe('Controller Exists', function(){
        it('Should be defined', function(){
            expect(true).toBe(false);
        });
        
    });

    console.log('here');
});
*/

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
console.log('out here');
describe('Users factory', function() {
    console.log('inhere');
    it('has a dummy spec to test 2 + 2', function() {
        console.log('It works if it gets here');
      // An intentionally failing test. No code within expect() will never equal 4.
      expect().toEqual(4);
    });
  });