const axios = require('axios')

//Url´s
const url_token = "https://recservices.azurewebsites.net/Token"
const url_insert = "https://recservices.azurewebsites.net/api/ServiciosApi/WS_GPS_InsertaSimple"

//Para almacenar los tokens que nos regrese el webservices
var token = ""
var tokens

//Obtenemos el token del usuario para validar si es correcto
const obtenerToken = async(user, password) => {
    var headers = {
        username: "M.ESTRADA",
        password: "WS_ZUC2021",
    };
    try{
        await axios.post(
            url_token,
            headers,
            {headers}
        )
        .then(response => {
            console.log('Respuesta de la solictud del webservices')
            console.log(response)
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud al webservices')
            console.log(error)
        });
    }catch(error){
        console.log(`Ocurrio un error al tratar de obtener el token: ${error}`)
    }
};

//Se encarga de agregar una unidad al webservices
const enviarEventos = async(tokenUsuario, eventoUsuario) => {
    var eventos = {
        "username": "M.ESTRADA",
        "imei":"807085067",
        "event": "1",
        "latitude": "19.566147",
        "longitude": "-99.205000",
        "altitude": "0",
        "speed": "0.0",
        "azimuth": "0",
        "odometer": "10",
        "dateTimeUTC": "20210901132030"
    }
    try{
        await axios.post(
            url_insert,
            eventos,
            {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        )
        .then(response => {
            console.log('Respuesta de la solcicitud al webservices para insertar')
            console.log(response)
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud al webservices')
            console.log(error)
        });
    }catch(error){
        console.log(`Error en inicar la solicitud: ${error}`)
    }
};

//Exportamos las funciones
module.exports = {
    obtenerToken,
    enviarEventos
};

obtenerToken()
/* enviarEventos() */