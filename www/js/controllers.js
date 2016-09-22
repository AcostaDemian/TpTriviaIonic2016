angular.module('app.controllers', ['firebase','ngCordova'])

.controller('triviaCtrl', ['$scope', '$stateParams', '$firebaseArray', '$timeout', '$cordovaVibration', '$state', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $timeout, $cordovaVibration,$state, $window) {


  var pregsRef = new Firebase("https://triviapoke.firebaseio.com/preguntas");

  $scope.pregElegida;
  $scope.rtaCorrecta;
  $scope.rtaElegida;

  $scope.rand = Math.floor((Math.random() * 4) + 1);
  
  pregsRef.on("child_added", function(snapshot){
  	$timeout(function(){
  		var info = snapshot.val();
  		if(info.id === $scope.rand)
  		{
	  		$scope.pregElegida = info;
	  		$scope.rtaCorrecta = info.respuesta;  
	  		console.log($scope.pregElegida);	
	  		console.log($scope.rtaCorrecta);		
  		}  		
  	});
  });

//Funcion validar respuesta correcta
  $scope.validar = function(rtaElegida){
    $('.respuesta').prop( "disabled", true );
    $('#siguiente').removeClass("ng-hide");
  	if(rtaElegida == $scope.rtaCorrecta)
  	{
      document.getElementById(rtaElegida).className = "button respuesta button-balanced button-block botonRes";
      	//Vibracion
      try
      {
        $cordovaVibration.vibrate(100);
      }
      catch(err)
      {
        console.log("No es un disposivio movil");
      }
  	}
  	else
  		{
          document.getElementById(rtaElegida).className = "button respuesta button-assertive button-block botonRes";
          //Vibracion
        try
        {
          $cordovaVibration.vibrate([100,100,100]);
        }
        catch(err)
        {
          console.log("No es un disposivio movil");
        }
  		}

  };

  $scope.siguiente = function() {
   //$window.location.reload();

    $('.respuesta').prop( "disabled", false );
    $('#siguiente').addClass("ng-hide");
    document.getElementById("r1").className = "button button-energized  respuesta button-block botonRes";
    document.getElementById("r2").className = "button button-energized  respuesta button-block botonRes";
    document.getElementById("r3").className = "button button-energized  respuesta button-block botonRes";

   var pregsRef = new Firebase("https://triviapoke.firebaseio.com/preguntas");

    $scope.pregElegida;
    $scope.rtaCorrecta;
    $scope.rtaElegida;

    $scope.rand = Math.floor((Math.random() * 4) + 1);
    
    pregsRef.on("child_added", function(snapshot){
      $timeout(function(){
        var info = snapshot.val();
        if(info.id === $scope.rand)
        {
          $scope.pregElegida = info;
          $scope.rtaCorrecta = info.respuesta;  
          console.log($scope.pregElegida);  
          console.log($scope.rtaCorrecta);    
        }     
      });
    });
  }

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.login = function(){
    
  };


}])
.controller('inicioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('infoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 