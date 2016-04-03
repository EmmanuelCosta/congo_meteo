starter.factory('CongoWeatherFactory',function($http,$q){

    var factory = {
      cache:false,

      getTowns : function(){
        var deferred = $q.defer();
        if(factory.cache ==true){

          deferred.resolve(factory);
        }else {
        $http.get('localDB/area.json')
              .success(function(data, status){
                  factory.towns = data.cities;
                  factory.cache = true;
                  factory.default = data.default.name;


                  deferred.resolve(factory);
              })
              .error(function(data, status){
                  deferred.reject("impossible de recuperer les infos");
              })
            }
              return deferred.promise;
      },
      setDefaultTown: function(city){
          factory.default = name;
      }
    }
    return factory;
})
