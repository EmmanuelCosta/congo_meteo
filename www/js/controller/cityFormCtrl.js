starter.controller('CityFormCtrl', function($scope,$ionicPopup,CongoWeatherFactory){

  $scope.changeCity = function() {
             $ionicPopup.confirm({
               title: 'Choisissez une autre ville',
               content: 'Are you sure you want to eat this ice cream?'
             }).then(function(res) {
               if(res) {
                 console.log('You are sure');

               } else {
                 console.log('You are not sure');
               }
             });
           };

})
