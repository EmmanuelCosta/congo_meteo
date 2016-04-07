starter.factory('CongoWeatherFactory',function($http,$q,$localstorage){
//  var r = $localstorage.getObject('post');
//  console.log("answer is == "+r.cities[0].name);
    var factory = {
      cache:false,

      getTowns : function(){
          var towns = $localstorage.getObject('post');
        var deferred = $q.defer();
        if(factory.cache ==true){

          deferred.resolve(factory);
        }else {
        // $http.get('localDB/area.json')
        //       .success(function(data, status){
                  factory.towns = towns.cities;
                  factory.cache = true;

                  deferred.resolve(factory);
              // })
              // .error(function(data, status){
              //     deferred.reject("impossible de recuperer les infos");
              // })
            }
              return deferred.promise;
      },
      getDefaultTown: function(){
        return $localstorage.get('default');
      },
      setDefaultTown: function(city){
          factory.default = city;
          console.log("city has been change "+city);
          $localstorage.set('default', city);
      }
    }
    return factory;
})
