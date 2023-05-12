const soap = require('soap')
//URL
const url_prod = "http://unigis2.unisolutions.com.ar/HUB/UNIGIS/MAPI/SOAP/COMMServer/service.asmx?wsdl"

//Datos webservices
let SystemUser ="TrackNavigation"
let Password = "WLX105qvk"
/* let SystemUser ="WS_Guarneros"
let Password = "KDMftlzB" */
let userId ="user_avl_granados"
let Passwords = "dIXE$!346emxz*/0"

let unidades = [457,355,356,357,358,800,782,783,813,784,792,932,802,803,825,826,827,836,837,838,839,840,901,108,113,741,743,1032,
                650,746,109,182,106,107,154,155,167,168,169,180,181,183,184,186,187,190,191,194,195,198,199,202,328,371,418,419,421,
                422,443,461,499,779,834,955,110,153,176,178,188,192,383,442,444,529,539,734,772,1066,1069,741,743,1165,2111,2103,1853,
                690,988,1050,1051,1673,1672,931,830,1772,1858,1652,1719,1765,286,1622,1623,223,871,1667,1668,1669,1238,1240,1244,1245,1304,
                1496,1637,773,1066,1069,1397,1460,1524,1632,1663,1111,1112,1116,1161,1358,1359,1360,741,743,1614,1396,781,1472,1473,1474,1536,
                990,991,1032,1539,1587,1591,1592,1593,1594,1598,1371,1537,1428,1267,1269,1275,1276,1277,1278,1279,1280,1288,1289,1290,1291,1293,
                1294,1309,1320,1321,1323,1331,1333,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1350,1351,1369,1370,1372,1392,1402,1403,1404,
                1287,805,915,1206,916,364,733,1190,1184,837,802,803,825,826,827,838,839,840,936]

//Argumentos para logueo
var argumento1 = {SystemUser, Password}
var argumento2 = {userId, Passwords}

//Funciones del webservices
const funciones = [
    "LoginYInsertarEvento",

    "Login", "LoginResponse",
    "Logout", "LogoutResponse",
    "InsertarEvento", "InsertarEventoResponse",
    "LoginYInsertarEventos", "LoginYInsertarEventosResponse",
    "LoginYInsertarEvento2", "LoginYInsertarEvento2Response",
    "InSession", "InSessionResponse",
    "ObtenerComando", "ObtenerComandoResponse",
    "Comando",
    "ComandoProcesado", "ComandoProcesadoResponse",
    "EstadoComando", "EstadoComandoResponse",
    "CambiarClave", "CambiarClaveResponse",
    "LoginYCambiarClave", "LoginYCambiarClaveResponse",
    "LoginYObtenerComando", "LoginYObtenerComandoResponse",
    "LoginYComandoProcesado", "LoginYComandoProcesadoResponse",
    "LoginYEstadoComando", "LoginYEstadoComandoResponse",
    "ObtenerVehiculos", "ObtenerVehiculosResponse",
    "ArrayOfVehiculo",
    "Vehiculo",
    "ConsultarVehiculosEnViaje", "ConsultarVehiculosEnViajeResponse"
]

//Datos para enviar al webservices
var Eventos = {
    pEvento: {
        Dominio: 'dominio_uno',
        NroSerie: 'L21570000611',
        Codigo: '1',
        Latitud: 20.8675498962402,
        Longitud: -100.423568725586,
        Altitud: 0,
        Velocidad: 3.6,
        FechaHoraEvento: '2021-09-06T08:30:00',
        FechaHoraRecepcion: '2021-09-06T10:30:00'
    }
}

//Parametros para enviar
var parametroFuncionUno = {SystemUser, Password, Eventos}

var parametrosFuncionDos = {
    SystemUser: 'TrackNavigation',
    Password: 'WLX105qvk',
    Dominio: 'dominio_dos',
    NroSerie: '11986903',
    Codigo: '1',
    Latitud: 22.1089401245117,
    Longitud: -100.904121398926,
    Altitud: 0,
    Velocidad: 0.0,
    FechaHoraEvento: '2021-09-06T08:30:00',
    FechaHoraRecepcion: '2021-09-06T08:30:00'
}

var parametrosFuncionTres = {
    SystemUser: 'TrackNavigation',
    Password: 'WLX105qvk',
    Dominio: 'dominio_dos',
    NroSerie: '11986903',
    Codigo: '1',
    Latitud: 22.1089401245117,
    Longitud: -100.904121398926,
    Altitud: 0,
    Velocidad: 0.0,
    FechaHoraEvento: '2021-09-06T08:30:00',
    FechaHoraRecepcion: '2021-09-06T08:30:00',
    valido: true
}

//Creamos un cliente con la url de la API
soap.createClient(url_prod, async(error, cliente) => {
    if(error){
        console.log(`Error al tratar de conectarnos al servicio de web services: ${error}`)
        return
    }

    //Se encarga de hacer el login con el webservices
    await cliente.Login(argumento1, (error, resultado) => {
        //Si obtenemos un error lo imprimos por consola
        if(error || resultado == 'undefined'){
            console.log(`Ocurrio un error al tratar de acceder al webservices: ${error}`)
        }
        if(resultado.LoginResult){
            console.log('El logueo al webservices de UNIGIS se hizo correctamente')
            console.log(resultado.LoginResult)
        }else{
            console.log('Las credenciales para el logueo a UNIGIS no son correctas')
            console.log(resultado.LoginResult)
        }
    });
    
    //Cierra la sesion con el webservices
    await cliente.Logout((error, resultado) => {
        if(error){
            console.log(`No se logro cerrar la sesion por este error: ${error}`)
        }
        if(resultado.LogoutResult){
            console.log('La sesión se cerro correctamente')
            console.log(resultado.LogoutResult)
        }else{
            console.log('No se logro cerrar la sesión, vuelve a intentarlo')
            console.log(resultado.LogoutResult)
        }
    });

    //Para insertar eventos al webservices
    await cliente.LoginYInsertarEventos(parametroFuncionUno, (error, resultado) => {
        if(error){
            console.log(`Error al tratar de agregar datos al evento LoginYInsertarEventos del webservices: ${error}`)
        }
        try{
            if(resultado.LoginYInsertarEventosResult){
                console.log('La solicitud LoginYInsertarEventos al webservices se hizo correctamente')
                console.log(resultado.LoginYInsertarEventosResult)
            }
            if(resultado.data){
                console.log('Ocurrio un error al realizar la solicitud al webservices')
                console.log(resultado.data)
            }
        }catch(error){
            console.log();
        }
    });

    //Funcion que se encarga de insertar en el webservices
    await cliente.LoginYInsertarEvento(parametrosFuncionDos, (error, resultado) => {
        if(error){
            console.log(`Error al tratar de agregar datos al evento del webservices LoginYInsertarEvento: ${error}`)
        }
        try{
            if(resultado.LoginYInsertarEventoResult){
                console.log('La solicitud LoginYInsertarEvento al webservices se hizo correctamente')
                console.log(resultado.LoginYInsertarEventoResult)
            }
            if(resultado.data){
                console.log('Ocurrio un error al realizar la solicitud al webservices')
                console.log(resultado.data)
            }
        }catch(error){
            console.log('Error en la funcion LoginYInsertarEvento del webservices')
            console.log(error)
        }
    });

    //Metodo dos del webservices para insertar datos en el webservices
    await cliente.LoginYInsertarEvento2(parametrosFuncionTres, (error, resultado) => {
        if(error){
            console.log(`Error al tratar de agregar datos al evento del webservices LoginYInsertarEvento2: ${error}`)
        }
        try{
            if(resultado.LoginYInsertarEvento2Result){
                console.log('La solicitud LoginYInsertarEvento2 al webservices se hizo correctamente')
                console.log(resultado.LoginYInsertarEvento2Result)
            }
            if(resultado.data){
                console.log('Ocurrio un error al realizar la solicitud al webservices LoginYInsertarEvento')
                console.log(resultado.data)
            }
        }catch(error){
            console.log('Error en la funcion LoginYInsertarEvento2 del webservices')
            console.log(error)
        }
    });
});