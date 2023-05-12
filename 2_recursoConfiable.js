const soap = require('soap')
//URL´S
const url_dev = "http://integraciones.qa.rcontrol.com.mx/Tracking/wcf/RCService.svc?wsdl"
const url_prod = "http://gps.rcontrol.com.mx/Tracking/wcf/RCService.svc?wsdl"

//Datos webservices
let userId ="user_avl_granados"
let password = "dIXE$!346emxz*/0"
let customer_id = [0, 41013, 0, 0]
let customer_name = [
    'LOGISTICA Y TRANSPORTACION GRANADOS SA DE CV',
    'MARIA EUGENIA MEJIA LOPEZ',
    'PEREZ MONTES DE OCA RICARDO',
    'CARLOS JOVANI CUEVAS GARZA'
]
let unidades = [
    [955,199,461,418,746,106,442,371,183,155,184,834,529,198,186,167,443,195,419,181,180,169,182,539,192,202,190,499,188,421,772,154,110,444,734,187,893,903,904,905,1424,1541,1543,872,505,518,1471,1604]
]

//Token
var token = 'a626f229-1ef7-46a7-bf7b-6d8d52364ce4'
var tokens = ''

//Argumentos para logueo
var argumentos = {userId, password}

//Datos para enviar al webservices
var events = {
    Event: {
        code: "1",
        date: '2021-09-06T08:30:00',
        latitude: "19.666031",
        longitude: "-99.36693",
        asset: '10AG7M',
        serialNumber: '0',
        direction: 'Tlanepantla de Baz, Edo de México',
        speed: "0",
        altitude: "20",
        customer: {
            id: "41013",
            name: "LOGISTICA Y TRANSPORTACION GRANADOS SA DE CV"
        },
        shipment: '1604',
        odometer: "53258718",
        ignition: "false",
        battery: "0",
        course: '0'
    }
}

//Parametros para enviar
var parametros = {token, events}

//Funciones del webservices
var funciones = [
    "GetUserToken",
    "GPSAssetTracking",
    "RCService"
]

//Creamos un cliente con la url de la API
soap.createClient(url_dev, (error, cliente) => {
    if(error){
        console.log(`Error al tratar de conectarnos al servicio de web services: ${error}`)
        return
    }

    //Ahora que tenemos la conexion ejecutamos el evento de GetUserToken el cual nos devulve el token para hacer las peticiones
    cliente.GetUserToken(argumentos, (error, resultado) => {
        //Si obtenemos un error lo imprimos por consola
        if(error || resultado == 'undefined'){
            console.log(`Ocurrio un error al tratar de acceder al webservices: ${error}`)
        }
        try {
            //Si devulve algo que sea diferente de undefined es que el token es correcto
            if(typeof resultado.GetUserTokenResult.token != 'undefined'){
                tokens = resultado.GetUserTokenResult.token
                console.log(`Se obtuvo el token correctamente:`)
                console.log(tokens)
                //Devolvemos el token que obtuvimos en esta solicitud
                //return tokens
            }else{
                console.log('Error en los datos ingresados, no se obtuvo el token correctamente')
                console.log(resultado.GetUserTokenResult.token)
            }
        }catch(error){
            console.log('Error al hacer la peticion de obtener el token')
            console.log(error)
        }
    });

    //Esta funcion es para enviar los datos al servidor de ese webservices
    cliente.GPSAssetTracking(parametros, (error, resultado) => {
        if(error){
            console.log(`Ocurrio un error al tratar de agregar los datos de la unidad: ${error}`)
        }
        try {
            if(resultado.GPSAssetTrackingResult.AppointResult.idJob != null){
                console.log('La solicitud al webservices se realizó correctamente')
                console.log(resultado.GPSAssetTrackingResult.AppointResult.idJob)
                //Devolvemos el tipo de respuesta y tambien debemos de almacenar ese valor en la base de datos,
                //es decir la unidad que se modifico, el mensaje que se recibio, y la fecha
                //Todo por cada unidad
                //return resultado.GPSAssetTrackingResult.AppointResult.idJob
            }else{
                console.log('No se realizo correctamente la solicitud al webservices')
                console.log(resultado.GPSAssetTrackingResult)
            }
        }catch(error){
            console.log('Error al tratar de realizar la peticion al webservices')
            console.log(error)
        }
    });
});