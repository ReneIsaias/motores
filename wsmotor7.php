<?php

set_time_limit(10);
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Configuración
date_default_timezone_set('America/Mexico_City');
define('SQLSERVER', '54.243.64.189');
define('SQLUSER', 'superoperador');
define('SQLPASS', 'TcYzJZ1swAIjMtZI9oTG');
define('SQLBD', 'motor_navigation');
define('SQLPORT', 3310);
define('MOTORWS_VERSION', 1);
define('DEBUG', false);
define('SSL', false);
$SOAP_URL = "http://ws4.altotrack.com/WSPosiciones_WalmartMX/WSPosiciones_WalmartMX.svc?wsdl";
$SOAP_URL2 = "http://ws4.altotrack.com/WSPosiciones_WalmartMX/WSPosiciones_WalmartMX.svc?singleWsdl";
$SOAP_FUNCTION = "ProcessXML";
$SOAP_FUNCTION_2 = "ProcessXMLResponse";

$Functions = [
  "IServicePositions_ProcessXML_InputMessage",
  "IServicePositions_ProcessXML_OutputMessage",
  "IServicePositions",
  "ServicePositions"
];
//Cargar WS por enviar
$MYSQLI = new mysqli(SQLSERVER, SQLUSER, SQLPASS, SQLBD, SQLPORT);
if($MYSQLI->connect_errno){
  echo "Error: Fallo al conectarse a MySQL debido a: \n";
  echo "Errno: " . $MYSQLI->connect_errno . "\n";
  echo "Error: " . $MYSQLI->connect_error . "\n";
  exit;
}
$MYSQLI->set_charset("utf8");
if (!$resultadoIntegrador = $MYSQLI->query('SELECT id, intervalo, ultintegracion, inputs, unidades FROM integrarws FORCE INDEX (indexbusquedamotor) WHERE motorselector = 2 AND caducidad > "'.date("Y-m-d").'"  AND activo = 1;')){
    echo "Error: La ejecución de la consulta falló debido a: \n";
    echo "Errno: " . $MYSQLI->errno . "\n";
    echo "Error: " . $MYSQLI->error . "\n";
    exit;
}
$now = date("Y-m-d H:i:s");
$resultadoIntegradorArray = [];
while ($item = $resultadoIntegrador->fetch_assoc()) {
  $date1 = new DateTime($item['ultintegracion']);
  $date2 = new DateTime($now);
  $diff = $date1->diff($date2);
  $segundos = ($diff->s) + ($diff->i * 60) + ($diff->h * 60 * 60) + ($diff->d * 60 * 60 * 24) + ($diff->m * 60 * 60 * 24 * 30) + ($diff->y * 60 * 60 * 24 * 365);
  if($segundos > floatval($item['intervalo'])){
    $arr_inputs =  explode("%7C", $item['inputs']);
    foreach($arr_inputs as &$input){
      $newinput = explode("%2C", $input);
      $input = array($newinput[0] => $newinput[1]);
    }
    if($item['unidades'] != ''){
	    $item['inputs'] = $arr_inputs;
	    $item['unidades'] = rtrim($item['unidades'], ",");
	    $resultadoIntegradorArray[] = $item;
    }
  }
}
$resultadoIntegrador->free();
// Cargar integrdor individual
foreach($resultadoIntegradorArray as &$resultadoIntegradorItem){
  $errorIntegrador = 0;
  $errorIntegradorMsn = '';
var_dump($resultadoIntegradorItem);
  if (!$equiposWS = $MYSQLI->query('SELECT A.c34 AS asset, A.c21 AS serialNumber, B.c07 AS code, B.c09 AS latitude, B.c10 AS longitude, 0 AS altitude, B.c12 AS speed, B.c05 AS date, B.c17 AS ignition, B.c11 AS course, B.c19 AS odometer, A.id AS Direction FROM t004 AS A FORCE INDEX (primary) CROSS JOIN  t001 AS B ON B.r31 = A.id AND B.c22 = 0 CROSS JOIN  mensajes AS C ON C.id = B.c08 WHERE A.id  IN  ('.$resultadoIntegradorItem['unidades'].');')){
    echo "Error: La ejecución de la consulta falló definido a: \n";
    echo "Errno: " . $MYSQLI->errno . "\n";
    echo "Error: " . $MYSQLI->error . "\n";
    exit;
  }
  // PreLOGIN
  
  // PreLOGIN end
  
  //LOGIN
  if($token ==''){
	  $SOAP_PARAM_LOGIN = array(
    'userId'=>$resultadoIntegradorItem['inputs'][0]['userId'],
    'password' => $resultadoIntegradorItem['inputs'][1]['Password']
    );
	  $SOAP_CLIENTE_LOGIN = new SoapClient($SOAP_URL);
	  try { 
	    $LOGIN = $SOAP_CLIENTE_LOGIN->__call($SOAP_FUNCTION, array($SOAP_PARAM_LOGIN));
		var_dump($LOGIN);	
	  } catch (SoapFault $fault) { 
	    $errorIntegrador = 1; 
	    $errorIntegradorMsn = $fault->faultcode."-".$fault->faultstring;
		var_dump($errorIntegradorMsn);
		echo 'error';
	  }
  }
  
  //LOGIN
  
  
  //exit;
  if(!$LOGIN->GetUserTokenResult->exception || $token != ''){
	  if($token == ''){
		  $token = $LOGIN->GetUserTokenResult->token;
	  }
    
    while ($unidad = $equiposWS->fetch_assoc()) {
	    $unidad['Direction'] = 'N/A';
	    $unidad['ignition'] = (floatval($unidad['ignition'])==1?"true":"false");
	    if($resultadoIntegradorItem['inputs'][2]['customer_id']){
		    $unidad['customer']['id'] = $resultadoIntegradorItem['inputs'][2]['customer_id'];
		    echo 'Customer.id:'.$unidad['customer']['id'];
	    }
	    if($resultadoIntegradorItem['inputs'][3]['customer_name']){
		    $unidad['customer']['name'] = urldecode($resultadoIntegradorItem['inputs'][3]['customer_name']);
	    }
      $unidad['date'] = str_replace(' ', 'T', $unidad['date']);
      $SOAP_PARAM = array(
        'token' => $token,
        'events' => array('Event'=>array($unidad))
      );
      $SOAP_CLIENTE = new SoapClient($SOAP_URL);
      try { 
        $INFO = $SOAP_CLIENTE->__call($SOAP_FUNCTION_2, array($SOAP_PARAM)); 
      } catch (SoapFault $fault) { 
        $errorIntegrador = 1; 
        $errorIntegradorMsn = $fault->faultcode."-".$fault->faultstring;
      }
      if($INFO->GPSAssetTrackingResult->AppointResult->idJob > 0){
        //Hacer registro
        $nowPrintEvt = date("Y-m-d H:i:s");
        $mensaje = "SERVER AWS:MW_2 Registro exitoso unidad:".$unidad['asset']." codigo: ".$INFO->GPSAssetTrackingResult->AppointResult->idJob;
        $sqlevento = "INSERT INTO integrarhistorialws (relintegrarid,fecharegistro,mensaje) VALUES (".$resultadoIntegradorItem["id"].", '".$nowPrintEvt."', '".$mensaje."')";
        if (!$MYSQLI->query($sqlevento)){
          echo "Error: La ejecución de la insert falló debido a: \n";
          echo "Errno: " . $MYSQLI->errno . "\n";
          echo "Error: " . $MYSQLI->error . "\n";
          exit;
        }
      }else{
        $errorIntegrador = 1;
        $errorIntegradorMsn = 'Respuesta no definida';
      }
      // Operacion si es correcto
    }
  }else{
    $errorIntegrador = 1; 
    $errorIntegradorMsn = 'Error de usuario o contraseña';
  }
  $equiposWS->free();
  if($errorIntegrador == 0){
    $ultmensaje = 'Actualización con exito';
  }else{
    $ultmensaje = $errorIntegradorMsn;
  }
  $nowPrint = date("Y-m-d H:i:s");
  $idintegrador = $resultadoIntegradorItem['id'];
  $sqlUpdate = "UPDATE integrarws SET ultintegracion = '".$nowPrint."', ultmensaje = '".$ultmensaje."' WHERE id = ".$idintegrador.";";
  if (!$MYSQLI->query($sqlUpdate)){
    echo "Error: La ejecución de la update falló debido a: \n";
    echo "Errno: " . $MYSQLI->errno . "\n";
    echo "Error: " . $MYSQLI->error . "\n";
    exit;
  }
}
$MYSQLI->close();
exit;
?>

