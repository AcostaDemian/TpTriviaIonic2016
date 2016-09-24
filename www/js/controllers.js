angular.module('app.controllers', ['firebase','ngCordova'])

.controller('triviaCtrl', ['$scope', '$stateParams','$ionicPopup' , '$firebaseArray', '$timeout', '$cordovaVibration', '$state', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup , $firebaseArray, $timeout, $cordovaVibration,$state, $window) {


  var pregsRef = new Firebase("https://triviapoke.firebaseio.com/preguntas");
  var rtaRef = new Firebase("https://triviapoke.firebaseio.com/respuestas");

  $scope.pregElegida;
  $scope.rtaCorrecta;
  $scope.rtaElegida;
  $scope.boton= "";
  $scope.arrayPreguntas = [];
  $scope.arrayRespuestas = [];
  $scope.correcto= 0;

   function NuevaPregunta(){

    do{
      $scope.rand = Math.floor((Math.random() * 4) + 1);
      //console.log($scope.rand);
      //console.log($scope.arrayPreguntas.indexOf($scope.rand));
    }while ($scope.arrayPreguntas.indexOf($scope.rand) != -1 )
    
    pregsRef.on("child_added", function(snapshot){
    	$timeout(function(){
    		var info = snapshot.val();
    		if(info.id === $scope.rand)
    		{
          $scope.arrayPreguntas.push(info.id);
  	  		$scope.pregElegida = info;
  	  		$scope.rtaCorrecta = info.respuesta;  
  	  		//console.log($scope.pregElegida);	
  	  		//console.log($scope.rtaCorrecta);		
    		}  		
    	});
    });
  };

  function Alerta() {
   var alertPopup = $ionicPopup.alert({
     title: localStorage.getItem('username'),
     template: 'Gracias por jugar!!'
   });

   alertPopup.then(function(res) {
   });
 };

  NuevaPregunta();

//Funcion validar respuesta correcta
  $scope.validar = function(rtaElegida){

  $scope.arrayRespuestas.push(rtaElegida);

  //console.log("length " + $scope.arrayPreguntas.length);
    if($scope.arrayPreguntas.length<3)
    {
      $scope.boton= "Continuar -->";
      $scope.siguiente = siguiente;
    }
    else
    {
      $scope.boton = "Finalizar";
      $scope.siguiente = finalizar;
    }


    $('.respuesta').prop( "disabled", true );
    $('#siguiente').removeClass("ng-hide");

  	if(rtaElegida == $scope.rtaCorrecta)
  	{
      $scope.correcto ++;
      document.getElementById(rtaElegida).className = "button respuesta button-balanced button-block botonRes";
      	//Vibracion y Sonido
      try
      {
        window.plugins.NativeAudio.play('correcto');
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
          //Vibracion y Sonido
        try
        {
          window.plugins.NativeAudio.play('incorrecto');
          $cordovaVibration.vibrate([100,100,100]);
        }
        catch(err)
        {
          console.log("No es un disposivio movil");
        }
  		}

  };

  function habilitarBotones()
  {  
    $('.respuesta').prop( "disabled", false );
    $('#siguiente').addClass("ng-hide");
    document.getElementById("r1").className = "button button-energized  respuesta button-block botonRes";
    document.getElementById("r2").className = "button button-energized  respuesta button-block botonRes";
    document.getElementById("r3").className = "button button-energized  respuesta button-block botonRes";
  };


  function siguiente() {

    habilitarBotones();

   var pregsRef = new Firebase("https://triviapoke.firebaseio.com/preguntas");

    $scope.pregElegida;
    $scope.rtaCorrecta;
    $scope.rtaElegida;  



    NuevaPregunta();
  };

  function finalizar(){
    Alerta();
    rtaRef.push({ 
      'username': localStorage.getItem('username'),
      'preguntas': $scope.arrayPreguntas,
      'respuestas': $scope.arrayRespuestas,
      'cantidadCorrectas': $scope.correcto
    });

    habilitarBotones();
    $scope.arrayPreguntas = [];
    $scope.correcto= 0;
    NuevaPregunta();
  };

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$location) {

  $scope.login = function(username ){    
    localStorage.setItem('username', username);
  };


}])
.controller('inicioCtrl', ['$scope', '$stateParams','$timeout' , // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$timeout) {


  var pregsRef = new Firebase("https://triviapoke.firebaseio.com/respuestas");
  $scope.list = [];

  pregsRef.on("child_added", function(snapshot){
    $timeout(function(){
      $scope.list.push(snapshot.val()); 
    });
  });




}])
   
.controller('infoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 