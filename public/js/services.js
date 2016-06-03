'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('dataFactory',['$http', '$q', dataFactory]);

function dataFactory($https, $q){
    return{
        query: function(url){
          var deferred = $q.defer();

          $https.get(url)
            .success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject('Error');
            });

          return deferred.promise;
      },
  };
}