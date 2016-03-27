starter.factory('CongoWeatherFactory',function($http,$q){

    var factory = {

      getTowns : function(){
        var deferred = $q.defer();
        $http.get('localDB/area.json')
              .success(function(data, status){
                  factory.towns = data.cities;

                  deferred.resolve(factory.towns);
              })
              .error(function(data, status){
                  deferred.reject("impossible de recuperer les infos");
              })
              return deferred.promise;
      }
    }
    return factory;
})
