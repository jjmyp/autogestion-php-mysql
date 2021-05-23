<?php
//Ruta del proyecto

const BASE_URL = "https://www.grupoasistencia.com/autogestionpro/";

//Nombre del proyecto
const PROJECT_NAME = "Autogestión";

//Zona horaria de la región
date_default_timezone_set('America/Bogota');

//Datos de conexion - Base de datos
const DB_HOST = "127.0.0.1";
const DB_USER = "grupoasi_autogestion";
const DB_PASSWORD = "yo3e7@Bt9hcL";
const DB_NAME = "grupoasi_autogestion";
const DB_CHARSET = "charset=utf8";
const DB_DRIVER = "mysql";

//Datos de conexion Facebook
const FACEBOOK_APP_ID = '191205255954101';
const FACEBOOK_APP_SECRET = '9882ab2f96f2d27171a251764b5832b1';
const FACEBOOK_GRAPH_VERSION = 'v2.9';
const FACEBOOK_REDIRECT_URL = BASE_URL.'registro/facebookregister';

//Datos de conexion Google
const GOOGLE_APP_ID = '822288783475-p1ce3d9o14o5pgmjl3tf6btmmp304mmd.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = '2L7SLcdKsdey6UFIVeSa6rWg';
const GOOGLE_API_KEY = 'AIzaSyB4cRnaPQQe_kC4hG5QmQ_9UFHwOzeJukU';
const GOOGLE_APPLICATION_NAME = 'Autogestion';
const GOOGLE_REDIRECT_URL1 = BASE_URL.'registro/googleregister';
const GOOGLE_REDIRECT_URL2 = BASE_URL.'login/google';

//Datos de conexion Truora Validations
const TRUORA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsX2RhdGEiOiJ7fSIsImNsaWVudF9pZCI6IjFscmZzcjZidjJuOHM3ZWFxbmM0NThxMDlvIiwiY2xpZW50X3VzZXJfaWQiOiIiLCJleHAiOjMxODM4MjU4NDUsImdyYW50IjoiIiwiaWF0IjoxNjA3MDI1ODQ1LCJpc3MiOiJodHRwczovL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3VzLWVhc3QtMV9vcGdEbmo5cFkiLCJqdGkiOiI1NjM3MDE2YS0yMmFhLTQ3YzQtYjI2My0zYTdiYTljYjgxODMiLCJrZXlfbmFtZSI6ImF1dG9ncmVmZXJpZG9yZXMiLCJrZXlfdHlwZSI6ImJhY2tlbmQiLCJ1c2VybmFtZSI6InNlZ3Vyb3NncnVwb2FzaXN0ZW5jaWEtYXV0b2dyZWZlcmlkb3JlcyJ9.QsA4i5D7ci0coqNCoTD9t9kUy7Thaoa1oZY2XPWXotg';
const TRUORA_URL = 'https://api.validations.truora.com/v1';

//Datos de conexion
const SGA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkphaXJvIEFsYmVydG8iLCJsYXN0bmFtZSI6IlJpdmVyYSBPcmRvw7FleiIsImVtYWlsIjoiZGV2ZWxvcGVyNUBncnVwb2FzaXN0ZW5jaWEuY29tIiwicG9zaXRpb24iOiJCYWNrZW5kIERldmVsb3BlciIsInJvbGUiOiIxIiwiaWF0IjoxNjExMDExNTQ1fQ.qYPYhxBkedlPtaC_cIwSgHo2NTa87JvgZhIgYqyEPGI';
const SGA_URL = "https://webservice.grupoasistencia.com/";

const SGA_TODORIESGO = 'https://grupoasistencia.com/webserviceAutos/';


const AXACOLPATRIA_PASSPHRASE = "M1graci0n";

//Url Webservices AxaColpatria Produccion 
//const AXACOLPATRIA_WS_URL = "https://pmms.axacolpatria.co:4271/AXAColpatria/Tarea/GestionPolizas/SOAT_V2/PolizaSOAT.svc?wsdl";

//Url claves PRODUCCION
//const AXACOLPATRIA_USUARIO = "GRUPO ASISTENCIA" ;
//const AXACOLPATRIA_CLAVE = "57393";
//const AXACOLPATRIA_CODIGO_RED = "5739301";
//const AXACOLPATRIA_CODIGO_PUNTO_ALIADO = "1";

//Url Webservice AxaColpatria QA
const AXACOLPATRIA_WS_URL = "https://tmms.axacolpatria.co:3271/AXAColpatria/Tarea/GestionPolizas/SOAT_V2/PolizaSOAT.svc?wsdl";

// Url claves QA
const AXACOLPATRIA_USUARIO = "GRUPO ASISTENCIA" ;
const AXACOLPATRIA_CLAVE = "311519";
const AXACOLPATRIA_CODIGO_RED = "31151901";
const AXACOLPATRIA_CODIGO_PUNTO_ALIADO = "01";

//Datos de envio de correo electronico
const SENDER_EMAIL = 'misegurodigital@gmail.com';
const SENDER_PASSWORD = 'M1graci0n';
const SENDER_COMPANY_NAME = 'Seguros Grupo Asistencia Ltda';
const SENDER_HOST = 'smtp.gmail.com';
const SENDER_PORT = 465;

//Delimitadores decimal y millar EJ. 52.000,00
const SPD = '.';
const SPM = ',';

//Simbolo de moneda
const SMONEY = '$';