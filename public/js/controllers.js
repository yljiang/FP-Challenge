'use strict';

/* Controller */
angular.module('myApp.controllers', [ 'myApp.services' ]).
	controller('AppCtrl', [ 'dataFactory', AppCtrl ]);

    function AppCtrl(dataFactory) {
		// Insert controller code here
        console.log("controller initialized");
        var vm = this;

        dataFactory.query('/api/apparel')
            .then(function(data){
                vm.data = data;
            }, function(){
                console.log('error');
            });

        vm.update = function(){
            vm.colors = vm.selected.color_codes.split(';');
            vm.sizes = vm.selected.size_codes.split(';');
            vm.weight = vm.selected.weight;
        };
        
    }
