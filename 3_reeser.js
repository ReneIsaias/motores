const axios = require('axios')
//URL´s
const url_insert = "https://rastreows.resser.com/api/Positions"
const url_insert_mult = "https://rastreows.resser.com/Help/Api/POST-api-PositionBatch"

//Datos usuario
let usuario ="ilog-admin"
let contrasena = "U2FsdGVkX1+D/MWZkEjdWGMz80XdYHHNT0eX22JZjMI="
let contra_decode = 'Salted__řHXc3E`qOGbY'
let relunidades = "eyIyMzMiOjQ1MDQxfQ=="
let unidades_decode = {"233": "45041"}

//Se encarga de enviar datos al webservices solo de una unidad
const enviarDatos = async (user, password, events) => {
    var dataEnviar = {
        "customerId": 92,
        "id": 32,
        "plates": "cadena de pruea",
        "dateTime": "2021-09-02T12:30:44",
        "latitude": 19.521206,
        "longitude": -99.083629,
        "course": 0,
        "speed": 2,
        "eventId": 1,
        "odometer": 198470459,
        "gpsFix": true,
        "satellites": 3,
        "batteryPercent": 12,
        "batteryVoltage": 12.25
    };

    try{
        await axios.post(
            url_insert,
            dataEnviar,
            {
                headers: {
                    authorization: {
                        auth: {
                            username: 'ilog-admin',
                            password: 'U2FsdGVkX1+D/MWZkEjdWGMz80XdYHHNT0eX22JZjMI='
                        }
                    }
                }
            }
        )
        .then(response => {
            console.log(`Esta es la solicitud del webservices de Resser`)
            console.log(response)
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud Resser')
            console.log(error)
            console.log('CONFIFG')
            console.log(error.config)
        });
    }catch(error){
        console.log(`Error al consumir el webservices:`)
        console.log(error)
    }
};

//Se encarga de enviar difentes datos de distintas unidades al webservices
const enviarDatosMultiple = async (user, password, events) => {
    var positions = [
        {
            "customerId": 92,
            "id": 45041,
            "plates": "cadena de prueba uno",
            "dateTime": "2021-09-02T12:30:00",
            "latitude": 19.521176,
            "longitude": -99.083565,
            "course": 0,
            "speed": 4,
            "eventId": 1,
            "odometer": 198470459,
            "gpsFix": true,
            "satellites": 3,
            "batteryPercent": 12,
            "batteryVoltage": 12.21
        },
        {
            "customerId": 92,
            "id": 45041,
            "plates": "cadena de prueba dos",
            "dateTime": "2021-09-02T12:40:00",
            "latitude": 19.521176,
            "longitude": -99.083565,
            "course": 0,
            "speed": 6,
            "eventId": 1,
            "odometer": 198470459,
            "gpsFix": true,
            "satellites": 2,
            "batteryPercent": 12,
            "batteryVoltage": 12.25
        },
        {
            "customerId": 92,
            "id": 45041,
            "plates": "cadena de prueba tres",
            "dateTime": "2021-09-02T12:50:00",
            "latitude": 19.521176,
            "longitude": -99.083565,
            "course": 0,
            "speed": 2,
            "eventId": 1,
            "odometer": 198470459,
            "gpsFix": true,
            "satellites": 3,
            "batteryPercent": 12,
            "batteryVoltage": 12.25
        },
    ]

    try{
        await axios.post(
            url_insert_mult,
            {positions},
            {
                headers: {
                    authorization: {
                        auth: {
                            username: 'ilog-admin',
                            password: 'U2FsdGVkX1+D/MWZkEjdWGMz80XdYHHNT0eX22JZjMI='
                        }
                    }
                }
            }
        )
        .then(response => {
            console.log(`Esta es la solicitud del webservices multiple de Resser`)
            console.log(response)
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud multiple Resser')
            console.log(error)
            console.log('CONFIFG')
            console.log(error.config)
        });
    }catch(error){
        console.log(`Error al consumir el webservices:`)
        console.log(error)
    }
};

//Exportamos los módulos creados
module.exports = {
    enviarDatos,
    enviarDatosMultiple
};

enviarDatos()
enviarDatosMultiple()