describe('editRoundDatesModalService Test Suite', function(){

    var editRoundDatesModalService, httpBackend;

    // Initiliaze the Teams R It module
    beforeEach(function(){
        module('teamsRIt');
        module('ngRoute');
    });

    // Assign service and httpBackend references
    beforeEach(inject(function(_editRoundDatesModalService_, $httpBackend){
        editRoundDatesModalService = _editRoundDatesModalService_;
        httpBackend = $httpBackend;
        $httpBackend.whenGET(/\/pages\//).respond(200);
    }));

    it('should confirm that all AJAX requests return a resolved promise if APIs return a successful response', function(){
        // Test PUT endpoint
        var updateRoundDatesResult = editRoundDatesModalService.updateRoundDates();
        httpBackend.when('PUT', /\/event/).respond({
            myKey: 'myString'
        });
        httpBackend.flush();
        expect(updateRoundDatesResult.$$state.value).toEqual({
            myKey: 'myString'
        });
    });

    it('should confirm that all AJAX requests return a promise call failed message if APIs return a failure', function(){
        // Test PUT endpoint
		var updateRoundDatesResult = editRoundDatesModalService.updateRoundDates();
        httpBackend.when('PUT', /\/event/).respond(500, 'chicken fingers');
        httpBackend.flush();
        expect(updateRoundDatesResult.$$state.value).toEqual('chicken fingers');
    });

});