<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : FichaPoliza.php
// Inicio       : 2021-02-04
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
class FichaPolizaModel extends MySQL
{

    private $data;
    public function __construct()
    {
        parent::__construct();
    }
    public function ConsultarTypes($data)
    {

        $urlPeticion = "types/params";
        $postFields = array("codigo" => $data);
        $response = peticion_sga($urlPeticion, "GET", $postFields);
        $arrayResponse = json_decode($response);

        return $arrayResponse->result;
    }



    public function ConsultarNegocios($datoBusqueda, $ramoBusqueda)
    {
        // $this->data = $data;

        $urlPeticionPolizas = "policies/params";                                                    //Url de consumo
        $urlPeticionCustomers = "customers/params";
        
        $postFieldsPoliza = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
        );

        if (!empty($datoBusqueda)) {
            $postFieldsPoliza["placa"] = $datoBusqueda;
            $postFieldsPoliza["numero_poliza"] = $datoBusqueda;
        }

        if (!empty($ramoBusqueda)) {
            $postFieldsPoliza['ramo'] = $ramoBusqueda;
        }

        
        $responseWsPolizas = peticion_sga($urlPeticionPolizas, "GET", $postFieldsPoliza);           //Consumimos el Ws enviando los parametros
        $arrayInfoPoliza = json_decode($responseWsPolizas);                                         //Convertimos el la respuesta en array


        if ($arrayInfoPoliza->status == "success") {

            foreach ($arrayInfoPoliza->result as $key => $value) {

                $idCliente = $value->cliente_id;
                $postFieldsCustomer = array(
                    "funcionario" => $_SESSION['userData']['id'],
                    "aplicacion" => 640,
                    "id" => $idCliente
                );
                $responseWsClientes = peticion_sga($urlPeticionCustomers, "GET", $postFieldsCustomer);   //Consumimos el Ws enviando los parametros
                $arrayInfoCliente = json_decode($responseWsClientes);

                $filterResponse[$key]['infoPoliza'] = $value;
                $filterResponse[$key]['infoCliente'] = $arrayInfoCliente->result[0];
            }
        }

        return (isset($filterResponse)) ? $filterResponse : false;
    }



    public function ConsultarRemision($data)
    {
        $this->data = $data;

        $urlPeticionPolizas = "policies/params";                                            //Url de consumo
        $postFieldsPoliza = array("funcionario" => $_SESSION['userData']['id'], "aplicacion" => 640, "id" => $data);              //Consultamos por placa o por numero de poliza 
        $responseWsPolizas = peticion_sga($urlPeticionPolizas, "GET", $postFieldsPoliza);   //Consumimos el Ws enviando los parametros
        $arrayInfoPoliza = json_decode($responseWsPolizas);

        $idCliente = $arrayInfoPoliza->result[0]->cliente_id;
        $urlPeticionCustomers = "customers/params";
        $postFieldsCustomer = array("funcionario" => $_SESSION['userData']['id'], "aplicacion" => 640, "id" => $idCliente);
        $responseWsClientes = peticion_sga($urlPeticionCustomers, "GET", $postFieldsCustomer);   //Consumimos el Ws enviando los parametros
        $arrayInfoCliente = json_decode($responseWsClientes);


        $peticion = array(
            "infoPoliza" => $arrayInfoPoliza->result[0],
            "infoCliente" => $arrayInfoCliente->result[0]
        );


        return $peticion;
    }



    public function ConsultaGeneralRemision($data)
    {
        $this->data = $data;

        $infoPolizaCliente = $this->ConsultarRemision($data);

        $query = "SELECT * FROM `usuarios` WHERE `id` = {$infoPolizaCliente['infoPoliza']->broker}";
        $resultBroker = $this->Select($query);
        
        if (!empty($resultBroker)) {
            $arrayInfoBroker = $resultBroker;
        } else {
            $arrayInfoBroker = null;
        }


        // $urlBroker = "users/{$infoPolizaCliente['infoPoliza']->broker}";
        // $responseWsBroker = peticion_sga($urlBroker, "GET", null);
        // $resultBroker = json_decode($responseWsBroker);

        // if ($resultBroker->status == "success") {
        //     $arrayInfoBroker = $resultBroker->result[0];
        // } else {
        //     $arrayInfoBroker = null;
        // }


        $peticion = array(
            "infoPoliza" => $infoPolizaCliente['infoPoliza'],
            "infoCliente" => $infoPolizaCliente['infoCliente'],
            "infoBroker" => $arrayInfoBroker
        );


        return $peticion;
    }



    public function ConsultarSiniestrosPoliza($data)
    {
        $this->data = $data;

        $urlPeticion = "insuranceclaims/params";

        $postFields = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "poliza_id" => $data
        );

        $responseWs = peticion_sga($urlPeticion, "GET", $postFields);
        $jsonRespo = json_decode($responseWs);

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }



    public function ConsultarArchivosPoliza($data)
    {

        $this->data = $data;

        $urlPeticion = "policyfiles/params";

        $postFields = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "poliza_id" => $data
        );

        $responseWs = peticion_sga($urlPeticion, "GET", $postFields);
        $jsonRespo = json_decode($responseWs);

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }



    public function AddDocument($tipoDocumento, $poliza_id, $archivo)
    {


        $urlPeticionFiles = "uploads/";
        $postFieldsFiles = array('image' => new CURLFILE($archivo['tmp_name'], $archivo['type'], $archivo['name']));
        $responseWsFiles = peticion_sga($urlPeticionFiles, "POST", $postFieldsFiles);
        $jsonRespoFiles = json_decode($responseWsFiles);

        if ($jsonRespoFiles->filename) {

            $urlPeticion = "policyfiles";
            $tamanioArchivoEnMB =  round(($jsonRespoFiles->size / 1024 / 1024), 2);

            $postFields = array(
                "tipo_documento_siniestro" => $tipoDocumento,
                "poliza" =>  $poliza_id,
                "tamanio_archivo" =>  $tamanioArchivoEnMB,
                "ruta_archivo" =>  $jsonRespoFiles->filename,
                "nombre_archivo" =>  $jsonRespoFiles->filename
            );

            $responseWs = peticion_sga($urlPeticion, "POST", $postFields);
            $jsonRespo = json_decode($responseWs);
        }

        return ($jsonRespo->status == "success") ? $jsonRespo->result : false;
    }
}
