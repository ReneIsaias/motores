const axios = require('axios')

//Url´s
const url_token = "http://n2.ws.blacsol.com/track/v2/devices/get/token"
const url_list = "http://n2.ws.blacsol.com/track/v2/devices/set/Event"
const url_insert = "http://n2.ws.blacsol.com/track/v2/devices/set/ListEvents"

//El token no dura mucho tiempo
var token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2Iiwia2lkIjpudWxsLCJjdHkiOiJKV1QifQ..ZA2ebaAnSsMcHFl9ljJK9w.AfBZwAdb7vBRy3Tgpeh3OPgETeDUeSLcU9pvAkd8F2oyvcP4D7-SbDRE2xjfh9fGFx6w6amt74RvJzGXgqta6_cCIIq5YoewqGyv2KWsREE_uvhzecOySX8klwNNdyHcx_hDaP6MdgLQqYZVSS0TEv6a2odpXTtcawRwT86uYwtL3Xi4k5Aln64inynzZEHhvdMp3ZU-SAZ2owqE5IlL4DYGtrE9wdbqHfMjMEag2jaN1kX4Sr1y15B1UZCkkPx_lZt4eP9Wnrl27qD-joJ-eLJP3EhP3VzAoi5Ly53a7ngccZOa_la7KlvVNvcYa98KApiJ-qPrzm8tMy3bHecizMCSWCTW1cRRcfMsOkXPvpM3uVgxBB3apSLJN9GXtPgN.Et0EqnGoo8SW1l7tz3GnRA"
var tokens

//Obtenemos el token del usuario para validar si es correcto
const obtenerToken = async(user, password) => {
    var headers = {
        username: "M.ESTRADA",
        password: "WS_ZUC2021",
    };
    try{
        const respuesta = await axios.post(url_token, null, {headers})
        if(respuesta.data.status_code == "200"){
            console.log('La solicitud del token se hizo correctamente')
            tokens = respuesta.data.message
            console.log(respuesta.data)
            //Regresamos el token del usuario
            //return respuesta.data.message
        }else{
            console.log('No se logro obtener el token')
            console.log(respuesta.data)
        }
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
        "dateTimeUTC": "20210901132030",
    }
    try{
        await axios.post(
            url_list,
            eventos,
            {
                headers: {
                    token
                }
            }
        )
        .then(response => {
            if(response.data.status_code == "201"){
                console.log('La solicitud se realizo satisfactoriamente')
                console.log(response.data)
                //Devolvemos el tipo de respuesta y tambien debemos de almacenar ese valor en la base de datos,
                //es decir la unidad que se modifico, el mensaje que se recibio, y la fecha
                //Todo por cada unidad
                //return response.data
            }else{
                console.log('La solicitud no se completo correctamente')
                console.log(response.data)
            }
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud')
            console.log(error.data)
        });
    }catch(error){
        console.log(`Error en inicar la solicitud: ${error}`)
    }
};

//Se encarga de agregar distintas unidades al web services
const enviarEventosMulti = async(tokenUsuario, eventoUsuario) => {
    var eventos = [
        {
            "username": "M.ESTRADA",
            "imei":"807085067",
            "event": "1",
            "latitude": "19.566147",
            "longitude": "-99.205875",
            "altitude": "0",
            "speed": "14.0",
            "azimuth": "0",
            "odometer": "10",
            "dateTimeUTC": "20210901132000"
        },
        {
            "username": "M.ESTRADA",
            "imei":"807085068",
            "event": "1",
            "latitude": "19.465053",
            "longitude": "-99.139163",
            "altitude": "0",
            "speed": "7.0",
            "azimuth": "0",
            "odometer": "11",
            "dateTimeUTC": "20210901132000"
        },
        {
            "username": "M.ESTRADA",
            "imei":"007519376",
            "event": "1",
            "latitude": "18.506393",
            "longitude": "-98.611177",
            "altitude": "0",
            "speed": "3.0",
            "azimuth": "0",
            "odometer": "12",
            "dateTimeUTC": "20210901132000"
        },
        {
            "username": "M.ESTRADA",
            "imei":"007777065",
            "event": "1",
            "latitude": "19.245692",
            "longitude": "-98.882068",
            "altitude": "0",
            "speed": "0.0",
            "azimuth": "0",
            "odometer": "13",
            "dateTimeUTC": "20210901132000"
        }
    ];
    try{
        await axios.post(
            url_insert,
            eventos,
            {
                headers: {
                    token
                }
            }
        )
        .then(response => {
            if(response.data.status_code == "201"){
                console.log('La solicitud multiple se realizo satisfactoriamente')
                console.log(response.data)
                //Devolvemos el tipo de respuesta y tambien debemos de almacenar ese valor en la base de datos,
                //es decir la unidad que se modifico, el mensaje que se recibio, y la fecha
                //Todo por cada unidad
                //return response.data
            }else{
                console.log('La solicitud multiple no se completo correctamente')
                console.log(response.data)
            }
        })
        .catch(error => {
            console.log('Ocurrio en error al realizar la solicitud multiple')
            console.log(error.data)
        });
    }catch(error){
        console.log(`Error en iniciar la solicitud multiple: ${error}`)
    }
};

//Exportamos las funciones
module.exports = {
    obtenerToken,
    enviarEventos,
    enviarEventosMulti
};


obtenerToken()
enviarEventos()
enviarEventosMulti()


