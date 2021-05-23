<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : Polizas.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para el acceso a las diferentes areas de la plataforma. 
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Polizas extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(18);
        parent::__construct();
    }

    public function CotizacionesTodoRiesgo()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Cotizar todo riesgo';
        $data['page_title'] = '  Cotizar todo riesgo';
        $data['page_functions_js'] = 'function_cotizaciones_todoriesgo.js';
        //$data['page_icon'] = 'fa fa-car';
        $data['page_header'] = 1;
        $this->views->getView($this, "cotizaciones", $data);
    }
    public function EditarTodoRiesgo()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Editar todo riego';
        $data['page_title'] = '  Editar todo riesgo';
        $data['page_functions_js'] = 'function_cotizar_todoriesgo_editar.js';
        //$data['page_icon'] = 'fa fa-car';
        $data['page_header'] = 1;
        $this->views->getView($this, "cotizartodoriesgo_editar", $data);
    }

    public function CotizarTodoRiesgo()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Cotizar todo riego';
        $data['page_title'] = '  Cotizar todo riesgo';
        $data['page_functions_js'] = 'function_cotizar_todoriesgo.js';
        //$data['page_icon'] = 'fa fa-car';
        $data['page_header'] = 1;
        $this->views->getView($this, "cotizartodoriesgo", $data);
    }
    public function TodoRiesgo()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Cotizar todo riego';
        $data['page_title'] = '  Cotizar todo riesgo';
        $data['page_functions_js'] = 'function_todoriesgo.js';
        //$data['page_icon'] = 'fa fa-car';
        $data['page_header'] = 1;
        $this->views->getView($this, "todoriesgo", $data);
    }



    public function ObtenerCotizaciones()
    {
        $dato = $_GET['dato'];
        $id_usuario = $_SESSION['userData']['id'];
        $cotizaciones = $this->model->ObtenerCotizacionesModelTest($dato, $id_usuario);
        $data = array('status' => 'success', 'result' => $cotizaciones);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        // $cotizaciones = $this->model->ObtenerCotizacionesModel($dato);
        // echo json_encode($cotizaciones, JSON_UNESCAPED_UNICODE);        
    }
    // funciones cotizador soat.
    public function Documento()
    {
        $data['page_id'] = 1;
        $data['page_functions_js'] = 'function_documento.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "documento", $data);
    }

    public function Resumenventa()
    {

        $data['page_id'] = 1;
        $data['page_functions_js'] = 'function_resumen_venta.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "resumenventa", $data);
    }

    public function Emitir()
    {

        $data['page_id'] = 1;
        $data['page_functions_js'] = 'function_emitir.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "emitir", $data);
    }

    public function ResumenExpedicion()
    {
        $data['page_id'] = 1;
        $data['page_functions_js'] = 'function_resumen_expedicion.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "resumenexpedicion", $data);
    }

    public function SoatExpedicion()
    {
        $data['page_id'] = 1;
        $data['page_functions_js'] = 'function_soat_expedicion.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "soatexpedicion", $data);
    }


    public function ResumenSinPlaca()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = 'Cotizador soat';
        $data['page_title'] = 'Cotizador soat';
        $data['page_functions_js'] = 'function_soat_placa.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "resumensinplaca", $data);
    }

    public function ResumenPlaca()
    {

        $data['page_id'] = 1;
        $data['page_tag'] = 'Cotizador soat';
        $data['page_title'] = 'Cotizador soat';
        $data['page_functions_js'] = 'function_resumen_placa.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "resumenplaca", $data);
    }

    public function SoatPlaca()
    {

        $data['page_id'] = 1;
        $data['page_tag'] = 'Cotizador soat';
        $data['page_title'] = 'Cotizador soat';
        $data['page_functions_js'] = 'function_soat_placa.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "soatplaca", $data);
    }

    public function GuardarDocumento()
    {

        $img = $_POST['imagenData'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $im = imagecreatefromstring($data);  //convertir text a imagen
        if ($im !== false) {
            imagejpeg($im, base_url() . "Assets/images/Documento_" . uniqid() . ".png"); //guardar a server 
            imagedestroy($im); //liberar memoria  
            echo 'Todo salio bien tu imagen ha sido guardada';
        } else {
            echo 'Un error ocurrio al convertir la imagen.';
        }
    }

    public function CotizarSoat()
    {
         $placa_cotizar = $_POST['placa'];
        $canal_cotizar = "Cajero";
    
        $xml = ' 
            <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <CotizarPolizaSOATClienteReq xmlns="http://AXAColpatria.Tarea.GestionPolizasSOAT.Cotizacion.Esquemas/CotizarPolizaSOATClienteReq/V1.0">
                    <Header xmlns="">
                        <Canal>'.$canal_cotizar.'</Canal> 
                        <IdCorrelacionConsumidor>2</IdCorrelacionConsumidor>
                        <IdTransaccion>1234567890</IdTransaccion>
                        <PeticionFecha>'. date('Y-m-d\TH:i:s') .'</PeticionFecha>
                        <Usuario>GRUPO ASISTENCIA</Usuario>
                    </Header>
                    <Body xmlns="">
                        <Vehiculo>
                            <Placa>' . $placa_cotizar . '</Placa>
                            <Clase>CAMPERO</Clase>
                            <Tipo>AUTOMOVIL</Tipo>
                        </Vehiculo>
                        <Cliente>
                            <Cliente_TYPE>
                                <PersonaDetalle>
                                    <ContactoPrincipal>
                                        <CelularPersonal>
                                            <Numero>1234567890</Numero> 
                                        </CelularPersonal>
                                        <Email>
                                            <Email>prueba@gmail.com</Email> 
                                        </Email>
                                    </ContactoPrincipal>
                                    <Persona>
                                        <Identificacion>
                                            <Identificacion>1234567890</Identificacion>
                                            <TipoIdentificacion>CC</TipoIdentificacion>
                                        </Identificacion>
                                        <!-- Optional -->
                                        <DatosBasicos>
                                            <NombreCompleto>GRUPO ASISTENCIA</NombreCompleto>
                                        </DatosBasicos>
                                    </Persona>
                                </PersonaDetalle>
                            </Cliente_TYPE>
                            <CotizacionesAsociadas>
                                <Cotizacion>
                                    <CodigoSucursalAlianza>26</CodigoSucursalAlianza>
                                    <CodigoPuntoVentaAliado>'.AXACOLPATRIA_CODIGO_PUNTO_ALIADO.'</CodigoPuntoVentaAliado>
                                    <CodigoDivipola>05001</CodigoDivipola>
                                    <TipoConsulta>PLACA</TipoConsulta>
                                    <CodigoRed>'.AXACOLPATRIA_CODIGO_RED.'</CodigoRed>
                                    <ValorDescuento>0</ValorDescuento>
                                </Cotizacion>
                            </CotizacionesAsociadas>
                        </Cliente>
                        <TipoProceso>Emision</TipoProceso>
                        <Clave>'.AXACOLPATRIA_CLAVE.'</Clave>
                    </Body>
                </CotizarPolizaSOATClienteReq>
            </Body>
        </Envelope> ';
        $certificates = array(
            'sslcertfile' => 'Certificates/e050c2601e9d3d60.pem', // Es el archivo del Certificado SSL.
            'sslkeyfile' => 'Certificates/privatekey.pem', // Es el archivo de la Clave SSL del Certificado.
            'passphrase' => AXACOLPATRIA_PASSPHRASE // Es la Contrase帽a para la clave del Certificado SSL.
        );
        //
        Cotizar(AXACOLPATRIA_WS_URL, $xml, 'CotizarPolizaSOATCliente', true, $certificates);
    }

    public function EmitirSoat()
    {
        $placa = $_POST['placa'];
        $numero_documento = $_POST['numero_documento'];
        $tipo_documento = $_POST['tipo_documento'];
        $celular = $_POST['celular'];
        $email = $_POST['email'];

        // XML de conexion
        $xml_emitir = '
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
        <EmitirPolizaComposicionSOATReq xmlns="http://AXAColpatria.GestionPolizasSOAT.Emision.Esquemas/EmitirPolizaComposicionSOATReq/V1.0">
            <Header xmlns="">
                <Canal>Online</Canal>
                <IdCorrelacionConsumidor>2</IdCorrelacionConsumidor>
                <IdTransaccion>1234567890</IdTransaccion>
                <PeticionFecha>'. date('Y-m-d\TH:i:s') .'</PeticionFecha>
                <Usuario>SBC</Usuario>
            </Header>
            <Body xmlns="">
                <Vehiculo>
                    <Placa>' . $placa . '</Placa>
                </Vehiculo>
                <Cliente>
                    <Cliente_Type>
                        <Persona>
                            <Identificacion>
                                <Identificacion>' . $numero_documento . '</Identificacion>
                                <TipoIdentificacion>' . $tipo_documento . '</TipoIdentificacion>
                            </Identificacion>
                        </Persona>
                        <PersonaDetalle>
                            <ContactoPrincipal>
                                <!-- Optional -->
                                <CelularPersonal>
                                    <Numero>' . $celular . '</Numero>
                                </CelularPersonal>
                                <!-- Optional -->
                                <Email>
                                    <Email>' . $email . '</Email>
                                </Email>
                            </ContactoPrincipal>
                        </PersonaDetalle>
                    </Cliente_Type>
                </Cliente>
                <CodigoPunto>'.AXACOLPATRIA_CODIGO_PUNTO_ALIADO.'</CodigoPunto>
                <Origen>CAJERO</Origen>
                 <Clave>'.AXACOLPATRIA_CLAVE.'</Clave>
                <CodigoRed>'.AXACOLPATRIA_CODIGO_RED.'</CodigoRed>
                <ValorDescuento>0</ValorDescuento>
            </Body>
        </EmitirPolizaComposicionSOATReq>
         </Body>
         </Envelope>
        ';
        $certificates = array(
            'sslcertfile' => 'Certificates/e050c2601e9d3d60.pem', // Es el archivo del Certificado SSL.
            'sslkeyfile' => 'Certificates/privatekey.pem', // Es el archivo de la Clave SSL del Certificado.
            'passphrase' => AXACOLPATRIA_PASSPHRASE // Es la Contrase帽a para la clave del Certificado SSL.
        );
        //
        Cotizar(AXACOLPATRIA_WS_URL, $xml_emitir, 'EmitirPolizaComposicionSOAT', true, $certificates);
    }

    public function InsertRiesgo($data)
    {
        $urlPeticion = "vehicles";
        $response = peticion_sga($urlPeticion, "POST", $data);
        $arrayResponse = json_decode($response);
        return $arrayResponse;
    }

    public function ConsultarCliente($data)
    {
        $urlPeticion = "customers/params";
        $response = peticion_sga($urlPeticion, "GET", $data);
        $arrayResponse = json_decode($response);
        return $arrayResponse;
    }

    public function InsertCliente($data)
    {
        $urlPeticion = "customers";
        $response = peticion_sga($urlPeticion, "POST", $data);
        $arrayResponse = json_decode($response);
        return $arrayResponse;
    }


    public function SaveEmission()
    {

        //dep($_POST);die();

        //dep($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['Persona']['Identificacion']['TipoIdentificacion']);die();
        $tipo_documento_emision = $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['Persona']['Identificacion']['TipoIdentificacion'];
        switch ($tipo_documento_emision) {
            case 'CC':
                $tipo_documento = 9;
                break;
            case 'CE':
                $tipo_documento = 13;
                break;
            case 'NIT':
                $tipo_documento = 10;
                break;
            case 'PS':
                $tipo_documento = 11;
                break;
            default:
                //'OT' = Desconocido
                $tipo_documento = 14;
                break;
        }

        $data = array(
            'funcionario' => $_SESSION['userData']['id'],
            'aplicacion' => '640',
            'identificacion' => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['Persona']['Identificacion']['Identificacion']
        );

        $cliente = self::ConsultarCliente($data);
        // dep($cliente).'Cliente que ya estaba';

        if ($cliente->status == "success") {
            $cliente_id = $cliente->result[0]->cliente_id;
        } else {
            $GuardarCliente = array(
                "tipo_documento" => $tipo_documento,
                "identificacion" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['Persona']['Identificacion']['Identificacion'],
                "primer_nombre" => $_POST['datos']['primer_nombre'],
                "segundo_nombre" => $_POST['datos']['segundo_nombre'],
                "primer_apellido" => $_POST['datos']['primer_apellido'],
                "segundo_apellido" => $_POST['datos']['segundo_apellido'],
                "direccion" => $_POST['datos']['direccion'],
                "correo_electronico" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['ContactoPrincipal']['Email']['Email'],
                "numero_telefonico1" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Propietario']['ContactoPrincipal']['CelularPersonal']['Numero'],
                "fecha_nacimiento" => "1999-11-27",
                "barrio" => "0",
                "ciudad" => 1122, //OTRA.
                "tipo_cliente" => 51, //ACTIVO.
                "estado_civil" => 29, //OTROS.
                "genero" => 23, //OTROS.
                "ocupacion" => 646, //OTROS.
                "punto_venta" => 637, //CANAL VIRTUAL.
                "procedencia" => 642, // 
                "canal_cliente" => 5, //BROUKER
                "estado" => 51, //ACTIVO
                "aplicacion" => 640, //AUTOGESTION
                "funcionario" => $_SESSION['userData']['id']
            );
            $RegistrarCliente  = self::InsertCliente($GuardarCliente);
            // dep($RegistrarCliente).'Cliente que no estaba';
            $cliente_id = $RegistrarCliente->result->insertId;
        }


        // dep()
        $GuardarVehiculo = array(
            "placa"  => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Placa'],
            "marca" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Marca'],
            "linea" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Linea'],
            "modelo" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Modelo'],
            "fasecolda" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['FasecoldaCode'],
            "valor_asegurado" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['ValorPagarDescuento'],
            "ciudad_circulacion" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['CiudadExpedicion'],
            "departamento_circulacion" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['CiudadExpedicion'],
            "tipo_servicio" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Servicio'],
            "clase_vehiculo" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['Clase'],
            "numero_chasis" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['NumeroChasis'],
            "numero_vin" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['NumeroVin'],
            "numero_motor" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['NumeroMotor'],
            "capacidad_pasajeros" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['CapacidadTotalPasajeros'],
            "capacidad_carga" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['CapacidadCarga'],
            "tipo_combustible" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vehiculo']['TipoCombustible'],
            "ciudad_matricula" =>  $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['CiudadExpedicion'],
            "estado_vehiculo" =>  "ACTIVO",
            "clasificacion" =>  "TOMADOR",
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );

        $RegistrarVehiculo = self::InsertRiesgo($GuardarVehiculo);

        //Validamos la forma de pago 
        switch ($_POST['datos']['formapago']) {
            case 'CREDITO':
                $formapago = 1084;
                $estado_cartera = 650;
                break;

            case 'TARJETADECREDITO':
                $formapago = 1104;
                $estado_cartera = 652;
                break;

            case 'PSE':
                $formapago = 1094;
                $estado_cartera = 652;
                break;
        }

        $data = array(
            "numero_poliza" => $_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['NumeroPoliza'],
            "aseguradora" => 159, //AXACOLPATRIA.
            "ramo" => 90, // SOAT.
            "fecha_expedicion" => date('Y-m-d', strtotime($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vigencia']['FechaCreacion'])),
            "fecha_inicio_vigencia" => date('Y-m-d', strtotime($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vigencia']['FechaInicio'])),
            "fecha_final_vigencia" => date('Y-m-d', strtotime($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['Vigencia']['FechaFinal'])),
            "riesgo" =>  $RegistrarVehiculo->result->insertId,
            "tomador" => $cliente_id,
            "responsable_pago" => $cliente_id,
            "asegurado" =>  $cliente_id,
            "sede" => 20, //CANAL VIRTUAL. 
            "procedencia" => 1,
            "estado" => 42, //NUEVA. 
            "tipo_estado" => 1,
            "estado_cartera" => $estado_cartera,
            "punto_venta" => 637,
            "forma_pago" => $formapago,
            "aplicacion" => 640,
            "usuario_expedicion" => $_SESSION['userData']['id'],
            "observacion" => "SOAT AXAColpatria",
            "valor_prima" => intval($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['ImpPrimaTotal']),
            "valor_total" => intval($_POST['emision']['Body']['SOAT']['DatosSoat']['DatoSoat']['ValorPagarDescuento']),
            "subtotal" => 4234234,
            "valor_iva" => 234234234,
            "valor_neto" => 5645645,
            "valor_runt" => 54635345,
            "valor_total" => 345435,
            "renovable" => 1,
            "broker" => $_SESSION['userData']['id']
        );

        // dep($GuardarVehiculo);dep($GuardarCliente);dep($data);die();
        $saveEmission = json_decode(peticion_sga('policies', 'POST', $data));

        echo json_encode($saveEmission, JSON_UNESCAPED_UNICODE);
    }



    public function InscripcionPhone()
    {
        $url_enrollment = TRUORA_URL . '/enrollments?account_id=' . $_POST['account_id'];
        $data_enrollment =  array(
            'type' => 'phone-verification',
            'phone_number' => '+57' . $_POST['celular'],
            'phone_type' => 'home',
            'user_authorized' => true,
            'document_number' => $_POST['identificacion']
        );
        $Enrollment = json_decode(PeticionTruora($url_enrollment, $data_enrollment, 'ctfd'));
        echo json_encode($Enrollment, JSON_UNESCAPED_UNICODE);
    }

    public function ValidacionPhone()
    {
        $url_validation = TRUORA_URL . '/validations?account_id=' . $_POST['account_id'];;
        $data_validation = array(
            'type' => 'phone-verification',
            'verify_channel' => 'sms',
            'phone_locale' => 'es',
            'phone_type' => 'home'
        );
        $Validation = json_decode(PeticionTruora($url_validation, $data_validation, 'ctfd'));
        echo json_encode($Validation, JSON_UNESCAPED_UNICODE);
    }

    public function VerificarValidacionPhone()
    {
        $url_token = TRUORA_URL . '/validations/' . $_POST['validation_id'] . '?account_id' . $_POST['account_id'];
        $data_verificar = array('type' => $_POST['type'], 'question_id' => $_POST['question_id'], 'token' => $_POST['token'], 'account_id' => $_POST['account_id']);
        $token = json_decode(PeticionTruora($url_token, $data_verificar, 'ctfd'), true);
        echo json_encode($token, JSON_UNESCAPED_UNICODE);
    }


    public function UpdateExpedicionUsuario(){
        $user = $_SESSION['userData']['id'];
        // $user = $_POST['id'];
        $usuario = $this->model->UpdateExpedicionUsuarioModel($user);
        if ($usuario) {
            $response = array('status' => 'success', 'message' => 'Registro actualizado con exito');
            $_SESSION['userData']['contador_expedicion'] = 1;
        }else{
            $response = array('status' => 'danger', 'message' => 'No se pudo actualizar el registro');
        }
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }


    public function EnrollmentDocument()
    {
        $url_enrollment = TRUORA_URL . '/enrollments?account_id=' . $_SESSION['userData']['account_id'];
        $data_enrollment =  array(
            'type' => 'document-validation',
            'user_authorized' => true
        );
        $Enrollment = json_decode(PeticionTruora($url_enrollment, $data_enrollment, 'ctfd'));
        echo json_encode($Enrollment, JSON_UNESCAPED_UNICODE);
    }


    public function CreateValidationDocument()
    {
        $url_validation = TRUORA_URL . '/validations?account_id=' . $_SESSION['userData']['account_id'];
        $data_validation = array(
            'type' => 'document-validation',
            'country' => 'CO',
            'document_type' => 'national-id'
        );
        $validation = json_decode(PeticionTruora($url_validation, $data_validation, 'ctfd'));
        echo json_encode($validation, JSON_UNESCAPED_UNICODE);
    }

    public function UploadDocument()
    {
        $url_upload_front = $_POST['front_url'];
        $url_upload_reverse = $_POST['reverse_url'];
        $document_file_front = $_FILES['cedula_frontal'];
        $document_file_reverse = $_FILES['cedula_trasera'];
        $front = PeticionTruoraImage($url_upload_front, ReadBinary($document_file_front['tmp_name']));
        $reverse = PeticionTruoraImage($url_upload_reverse, ReadBinary($document_file_reverse['tmp_name']));
        $array = array('Frontend' => $front, 'Reverse' => $reverse, 'estados' => $_POST);
        echo json_encode($array);
    }

    public function GetValidationDocument()
    {
        $validation_id = $_POST['validation_id'];
        $url_get_validation = TRUORA_URL . '/accounts/' . $_SESSION['userData']['account_id'] . '/validations/' . $validation_id;
        $response = json_decode(PeticionTruora($url_get_validation, null, 'ctfd'));
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    }
    

    public function CreateEnrollmentFaceId(){
        $url_enrollment = TRUORA_URL . '/enrollments?account_id=' . $_SESSION['userData']['account_id'];
        $data_enrollment =  array(
            'type' => 'face-recognition',
            'user_authorized' => true
        );
        $Enrollment = json_decode(PeticionTruora($url_enrollment, $data_enrollment, 'ctfd'));
        echo json_encode($Enrollment, JSON_UNESCAPED_UNICODE);
    }


    public function FileUploadLinkFaceId(){
        $url_upload_link = $_POST['file_upload_link'];
        $base_photo = $_FILES['foto_base'];
        $request = PeticionTruoraImage($url_upload_link, ReadBinary($base_photo['tmp_name']));
        $array = array('status' => 'success', 'message' => 'Foto base subida correctamente', $request);
        echo json_encode($array, JSON_UNESCAPED_UNICODE);
    }

    public function CreateValidationFaceId(){
        $url_validation = TRUORA_URL . '/validations?account_id=' . $_SESSION['userData']['account_id'];
        $data_validation = array(
            'type' => 'face-recognition',
        );
        $validation = json_decode(PeticionTruora($url_validation, $data_validation, 'ctfd'));
        echo json_encode($validation, JSON_UNESCAPED_UNICODE);
    }


    public function FileUploadVideoFaceId(){
        $url_upload_link = $_POST['file_upload_link_video'];
        $file_video = $_FILES['video'];
        $request = PeticionTruoraImage($url_upload_link, ReadBinary($file_video['tmp_name']));
        $array = array('status' => 'success', 'message' => 'Video subido correctamente', $request);
        echo json_encode($array, JSON_UNESCAPED_UNICODE);
    }
}
