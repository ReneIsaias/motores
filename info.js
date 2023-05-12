const motores = [
    {
        id_motor: 1,
        nombre_motor: "ASSIST CARGO SA DE CV",
        motor_integrador: 1,
        urls: {
            url: "http://unigis2.unisolutions.com.ar/HUB/UNIGIS/MAPI/SOAP/COMMServer/service.asmx?wsdl",
        },
        login: {
            SystemUser: "TrackNavigation",
            Password: "WLX105qvk",
        },
        funciones: ["LoginYInsertarEvento"],
        descripcion: "Utilizan servicios SOAP - Web Services",
        documentacion: "Es la misma que UNIGIS",
        resultado: "Como es la UNIGIS solo se debe de verificar los usuarios y su informacion de cada uno que esten bien"
    },
    {
        id_motor: 2,
        nombre_motor: "RECURSO CONFIABLE",
        motor_integrador: 2,
        urls: {
            dev: "http://integraciones.qa.rcontrol.com.mx/Tracking/wcf/RCService.svc?singleWsdl",
            prod: "http://gps.rcontrol.com.mx/Tracking/wcf/RCService.svc?singleWsdl"
        },
        login: {
            userId: "user_avl_granados",
            password: "dIXE$!346emxz*/0",
            customer_id: 41013,
            customer_name: 'MARIA EUGENIA MEJIA LOPEZ',
        },
        funciones: [
            "GetUserToken",
            "GPSAssetTracking"
        ],
        descripcion: "Utilizan servicios SOAP - Web Services",
        documentacion: "Ya la tengo, tambien esta en la url el servidor",
        resultado: "Ya estan las peticiones funcionando, solo hace falta pulir bien todo y revisar con Jos las dudas de la hora, unidad, imei, etc"
    },
    {
        id_motor: 3,
        nombre_motor: "INDUSTRIAS REESER",
        motor_integrador: 3,
        urls: {
            url_uno: "https://rastreows.resser.com/api/Positions",
            url_dos: "https://rastreows.resser.com/api/PositionBatch",

            api_one: "https://rastreows.resser.com/Help/Api/POST-api-Positions",
            api_mult: "https://rastreows.resser.com/Help/Api/POST-api-PositionBatch"

        },
        login: {
            usuario: "ilog-admin",
            contrasena: "U2FsdGVkX1+D/MWZkEjdWGMz80XdYHHNT0eX22JZjMI=",
            contra_decrep: 'Salted__řHXc3E`qOGbY',
            relunidades: "eyIyMzMiOjQ1MDQxfQ==",
            unidades_decrep: {233: "45041"},
        },
        funciones: [""],
        descripcion: "aun no la tengo"
    },
    {
        id_motor: 4,
        nombre_motor: "UNIGIS",
        motor_integrador: 2,
        urls: {
            url: "http://unigis2.unisolutions.com.ar/HUB/UNIGIS/MAPI/SOAP/COMMServer/service.asmx?wsdl",
        },
        login: {
            SystemUser: "TrackNavigation",
            Password: "WLX105qvk",
        },
        funciones: ["LoginYInsertarEvento"],
        descripcion: "Utilizan servicios SOAP - Web Services",
        documentacion: "Solo esta en la URL",
        resultado: "Ya esta implementado las funciones princiapales del webservices, solo falta definir bien los parametros, que significan y el tipo de respuesta"
    },
    {
        id_motor: 5,
        nombre_motor: "BLACK SOLUTIONS",
        motor_integrador: 5,
        urls: {
            token: "http://n2.ws.blacsol.com/track/v2/devices/get/token",
            insert: "http://n2.ws.blacsol.com/track/v2/devices/set/Event"
        },
        login: {
            username:"M.ESTRADA",
            password: "WS_ZUC2021"
        },
        funciones: [""],
        descripcion: "Trabaja con JTW y metodos post. Es decir API-REST",
        documentacion: "Ya la tengo y esta bien documentada",
        resultado: "Ya logre hacer las principales peticiones del webservice, solo hace falta agregarlas al integrador"
    },
    {
        id_motor: 0,
        nombre_motor: "REC SERVICES",
        motor_integrador: 0,
        urls: {
            token: "https://recservices.azurewebsites.net/Token",
            insert: "https://recservices.azurewebsites.net/api/ServiciosApi/WS_GPS_InsertaSimple"
        },
        funciones: [""],
        descripcion: "",
        documentacion: ""
    }
]