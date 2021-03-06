describe('deleteFacilityLeaderModalService Test Suite', function(){

    var deleteFacilityLeaderModalService, httpBackend;

    // Initiliaze the Teams R It module
    beforeEach(function(){
        module('teamsRIt');
        module('ngRoute');
    });

    // Assign service and httpBackend references
    beforeEach(inject(function(_deleteFacilityLeaderModalService_, $httpBackend){
        deleteFacilityLeaderModalService = _deleteFacilityLeaderModalService_;
        httpBackend = $httpBackend;
        $httpBackend.whenGET(/\/pages\//).respond(200);
    }));

    it('should confirm that all AJAX requests return a resolved promise if APIs return a successful response', function(){
		// Test DELETE endpoint
        var deleteFacilityLeaderResult = deleteFacilityLeaderModalService.deleteFacilityLeader();
        httpBackend.when('DELETE', /\/facility/).respond({
            myKey: 'myString'
        });
        httpBackend.flush();
        expect(deleteFacilityLeaderResult.$$state.value).toEqual({
            myKey: 'myString'
        });
    });

    it('should confirm that all AJAX requests return a promise call failed message if APIs return a failure', function(){
		// Test DELETE endpoint
        var deleteFacilityLeaderResult = deleteFacilityLeaderModalService.deleteFacilityLeader();
        httpBackend.when('DELETE', /\/facility/).respond(500, 'chicken fingers');
        httpBackend.flush();
        expect(deleteFacilityLeaderResult.$$state.value).toEqual('chicken fingers');
    });

});