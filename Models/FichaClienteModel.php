<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : FichaCliente.php
// Inicio       : 2021-02-01
// Ultima actualizacion : 
//
// Description : Gestion con la base de datos
//
// Author: Jose Carlos Avila Perea
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer2@grupoasistencia.com
//============================================================+
class FichaClienteModel extends MySQL
{
    private $data;

    public function __construct()
    {
        parent::__construct();
    }



    public function ConsultarClientesYProspectos($data)
    {
        $this->data = $data;

        $filterResponse = array();
        $i = 0;

        $urlPeticionCustomers = "customers/params";
        $urlPeticionPolizas = "policies/params";

        // Si la consulta es general, vendra el campo vacio
        if (empty($data)) {
            $postFieldsCustomers = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640
            );
        } else {            // Si la consulta es por parametros, vendrá llena
            $postFieldsCustomers = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640,
                "identificacion" => $data,
                "nombre_cliente" => $data
            );
        }

        $responseWsClientes = peticion_sga($urlPeticionCustomers, "GET", $postFieldsCustomers);
        $arrayInfoCliente = json_decode($responseWsClientes);



        if ($arrayInfoCliente->status == "success") {       //  Si el data conincide con la informacion de clientes, consultaremos la poliza por medio de responsable de pago, tomador, o asegurado


            // Recorremos los clientes que se encuentran en la consulta
            foreach ($arrayInfoCliente->result as $keyCliente => $value_cliente) {

                $cliente_id = $value_cliente->cliente_id;

                // Consultamos el cliente para ver si aparece como responsable de pago, tomador o asegurado
                $postFieldsPoliza = array(
                    "funcionario" => $_SESSION['userData']['id'],
                    "aplicacion" => 640,
                    "cliente_id" => $cliente_id,
                    "asegurado_id" => $cliente_id,
                    "responsable_pago_id" => $cliente_id
                );

                $responseWsPolizas = peticion_sga($urlPeticionPolizas, "GET", $postFieldsPoliza);
                $arrayInfoPoliza = json_decode($responseWsPolizas);

                if ($arrayInfoPoliza->status == "success") {     //Si la busqueda  coincide con alguna poliza, lo guardaremos en una matriz

                    foreach ($arrayInfoPoliza->result as $keyPoliza => $value) {

                        $filterResponse[$i]['infoPoliza'] = $value;
                        $filterResponse[$i]['infoTomador'] = $value_cliente;
                    }

                    $i++;
                }
            }
        } else {             //Si el data no coincide con el cliente, entonces buscaremos en la poliza por placa o numeroPoliza

            //Consultamos por placa o por numero de poliza 
            $postFieldsPoliza = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640,
                "placa" => $data,
                "numero_poliza" => $data
            );

            $responseWsPolizas = peticion_sga($urlPeticionPolizas, "GET", $postFieldsPoliza);
            $arrayInfoPoliza = json_decode($responseWsPolizas);

            if ($arrayInfoPoliza->status == "success") {

                foreach ($arrayInfoPoliza->result as $key => $value) {

                    $infoTomador = $this->ConsultarClienteWS($value->cliente_id);
                    $filterResponse[$key]['infoPoliza'] = $value;
                    $filterResponse[$key]['infoTomador'] = $infoTomador;
                }
            }
        }

        return ($filterResponse) ? $filterResponse : false;
    }



    public function ConsultarClienteWS($idCliente)
    {

        $urlPeticionCustomers = "customers/params";
        $postFieldsCustomers = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "id" => $idCliente
        );
        $responseWsClientes = peticion_sga($urlPeticionCustomers, "GET", $postFieldsCustomers);
        $result = json_decode($responseWsClientes);

        return ($result->status == "success") ? $result->result[0] : "Cliente no encontrado";
    }



    public function ConsultarArchivosRelacionadosCliente($data)
    {
        $this->data = $data;

        $urlPeticion = "customerfiles/params";

        $postFields = array(
            "cliente_id" => $data,
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );

        $responseWsClientes = peticion_sga($urlPeticion, "GET", $postFields);
        $jsonRespo = json_decode($responseWsClientes);

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }



    public function ConsultarCiudad()
    {

        $query = "SELECT c.id AS ciudad_id, d.id AS departamento_id, p.id AS pais_id, nombre_pais AS pais, nombre_departamento AS departamento ,nombre_ciudad AS ciudad   FROM ciudades AS c INNER JOIN departamentos AS d ON (c.departamentos_id = d.id) INNER JOIN paises AS p ON (d.paises_id = p.id) ORDER BY c.nombre_ciudad";

        $peticion = $this->SelectAll($query);

        return $peticion;
    }



    public function ConsultarTypes($data)
    {

        $urlPeticion = "types/params";
        $postFields = array("codigo" => $data);
        $response = peticion_sga($urlPeticion, "GET", $postFields);
        $arrayResponse = json_decode($response);

        return $arrayResponse->result;
    }



    public function ConsultarVehiculo($vehiculoId)
    {
        $postFields = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "id" => $vehiculoId
        );

        $urlPeticion = "vehicles/params";
        $responseWs = peticion_sga($urlPeticion, "GET", $postFields);
        $result = json_decode($responseWs);

        return ($result->status == "success") ? $result->result[0] : "Vehiculo no encontrado";
    }



    public function ConsultarFichaCliente($data)
    {
        $urlPeticionPolizas = "policies/params";
        $cliente_id = $data;
        $arrayInfo = array();
        $arrayInfo['infoCliente'] = $this->ConsultarClienteWS($cliente_id);

        // Consultamos el cliente para ver si aparece como responsable de pago, tomador o asegurado para ver los seguros realacionados a el y los vehiculos
        $postFieldsPoliza = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "cliente_id" => $cliente_id,
            "asegurado_id" => $cliente_id,
            "responsable_pago_id" => $cliente_id
        );

        $responseWsPolizas = peticion_sga($urlPeticionPolizas, "GET", $postFieldsPoliza);
        $arrayInfoPoliza = json_decode($responseWsPolizas);

        if ($arrayInfoPoliza->status == "success") {     //Si la busqueda  coincide con alguna poliza, lo guardaremos en una matriz

            foreach ($arrayInfoPoliza->result as $key => $value) {

                $arrayInfo['infoAdicional'][$key]['infoPoliza'] = $value;
                $arrayInfo['infoAdicional'][$key]['infoVehiculo'] = $this->ConsultarVehiculo($value->riesgo_id);
                $arrayInfo['infoAdicional'][$key]['infoArchivos'] = "";
                $arrayInfo['infoAdicional'][$key]['infoSeguimientos'] = "";
            }
        }

        return ($arrayInfo) ? $arrayInfo : false;
    }


    public function AddSeguimientoCliente($data)
    {

        $this->data = $data;

        $urlPeticion = "customerfollowup/";
        $postFields = array(
            "asunto_seguimiento" => "{$data['asuntoSeguimiento']}",
            "producto_campania" => "{$data['productoCampania']}",
            "fecha_seguimiento" => "{$data['fechaSeguimiento']}",
            "hora_seguimiento" => "{$data['horaSeguimiento']}",
            "observacion" => "{$data['observacionesSeguimiento']}",
            "funcionario" => "{$data['funcionario']}",
            "cliente" => "{$data['idCliente']}"
        );

        $response = peticion_sga($urlPeticion, "POST", $postFields);
        $jsonRespo = json_decode($response);

        return ($jsonRespo->status == "success") ? true : false;
    }


    public function ConsultarSeguimientos($data)
    {
        $this->data = $data;

        $urlPeticion = "customerfollowup/params";

        $postFields = array(
            "funcionario" => $_SESSION['userData']['id'],
            "cliente_id" => $data
        );

        $responseWsClientes = peticion_sga($urlPeticion, "GET", $postFields);
        $jsonRespo = json_decode($responseWsClientes);

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }
    
    
    public function AddDocument($tipoDocumento, $cliente, $archivo)
    {


        $urlPeticionFiles = "uploads/";
        $postFieldsFiles = array('image' => new CURLFILE($archivo['tmp_name'], $archivo['type'], $archivo['name']));
        $responseWsFiles = peticion_sga($urlPeticionFiles, "POST", $postFieldsFiles);
        $jsonRespoFiles = json_decode($responseWsFiles);

        if ($jsonRespoFiles->filename) {

            $urlPeticion = "customerfiles";
            $tamanioArchivoEnMB =  round(($jsonRespoFiles->size / 1024 / 1024), 2);

            $postFields = array(
                "tipo_documento_ficha" => $tipoDocumento,
                "cliente" =>  $cliente,
                "tamanio_archivo" =>  $tamanioArchivoEnMB,
                "ruta_archivo" =>  $jsonRespoFiles->filename,
                "nombre_archivo" =>  $jsonRespoFiles->filename
            );

            $responseWs = peticion_sga($urlPeticion, "POST", $postFields);
            $jsonRespo = json_decode($responseWs);
        } else {
            $jsonRespo = false;
        }

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }
}
