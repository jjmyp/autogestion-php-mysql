<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : fichacliente.php
// Inicio       : 2021-02-01
// Ultima actualizacion : 
//
// Description : Permitirá ver los clientes y prospectos que los comerciales hayan ingresado al sitema
//
// Author: Jose Carlos Avila
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer2@grupoasistencia.com
//============================================================+




class FichaCliente extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(5);
        parent::__construct();
    }




    //Metodo para obtener vista del registro
    public function FichaCliente()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = 'FichaCliente';
        $data['page_title'] = 'Consulta tus clientes y prospectos';
        $data['page_name'] = 'Pagina principal';
        $data['page_functions_js'] = 'function_ficha_cliente.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "fichacliente", $data);
    }




    public function consultarClientesController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['datoBusqueda']);
            // $arrRespuesta = "";

            // if (empty($datoBusqueda)) {             //Caundo el dato está vacio

            //     $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            // } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarClientesYProspectos($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            // }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }




    public function ConsultarArchivosRelacionadosCliente()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['hiddenKey']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarArchivosRelacionadosCliente($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }




    public function ConsultarFichaCliente()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['idCliente']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarFichaCliente($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }




    public function ConsultarCiudad()
    {

        $arrInformacion = $this->model->ConsultarCiudad();

        $select = "";
        $select .= "<option selected disabled> </option>";
        foreach ($arrInformacion as $key => $value) {
            $select .= "<option value=" . $value['ciudad_id'] . ">" . $value['ciudad'] . "</option>";
        }

        echo $select;
        die();
    }




    public function ConsultarHoraSeguimiento()
    {

        $select = "";
        $select .= "
            <option disabled selected></option>
            <option value='07:30:00'>7:30 AM</option>
            <option value='08:00:00'>8:00 AM</option>
            <option value='08:30:00'>8:30 AM</option>
            <option value='09:00:00'>9:00 AM</option>
            <option value='09:30:00'>9:30 AM</option>
            <option value='10:00:00'>10:00 AM</option>
            <option value='10:30:00'>10:30 AM</option>
            <option value='11:00:00'>11:00 AM</option>
            <option value='11:30:00'>11:30 AM</option>
            <option value='12:00:00'>12:00 AM</option>
            <option value='12:30:00'>12:30 PM</option>
            <option value='13:00:00'>1:00 PM</option>
            <option value='13:30:00'>1:30 PM</option>
            <option value='14:00:00'>2:00 PM</option>
            <option value='14:30:00'>2:30 PM</option>
            <option value='15:00:00'>3:00 PM</option>
            <option value='15:30:00'>3:30 PM</option>
            <option value='16:00:00'>4:00 PM</option>
            <option value='16:30:00'>4:30 PM</option>
            <option value='17:00:00'>5:00 PM</option>
            <option value='17:30:00'>5:30 PM</option>
        ";

        echo $select;
        die();
    }




    public function ConsultarTypes()
    {

        $datoBusqueda = limpiar_cadena($_POST['codigo']);

        $arrInformacion = $this->model->ConsultarTypes($datoBusqueda);

        $select = "";
        $select .= "<option selected disabled> </option>";
        foreach ($arrInformacion as $key => $value) {
            $select .= "<option value=" . $value->tipos_id . ">" . strtoupper($value->descripcion_tipos) . "</option>";
        }

        echo $select;
        die();
    }




    public function AddSeguimientoCliente()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $asuntoSeguimiento =        limpiar_cadena($_POST['asuntoSeguimiento']);
            $productoCampania =         limpiar_cadena($_POST['productoCampania']);
            $fechaSeguimiento =         limpiar_cadena($_POST['fechaSeguimiento']);
            $horaSeguimiento =          limpiar_cadena($_POST['horaSeguimiento']);
            $observacionesSeguimiento = limpiar_cadena($_POST['observacionesSeguimiento']);
            $hiddenKey =                limpiar_cadena($_POST['hiddenKey']);


            if (
                empty($asuntoSeguimiento) &&
                empty($productoCampania) &&
                empty($fechaSeguimiento) &&
                empty($horaSeguimiento) &&
                empty($observacionesSeguimiento)
            ) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'error', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo los datos no estáa vacios

                $infoArray = array(
                    "asuntoSeguimiento" => $asuntoSeguimiento,
                    "productoCampania" => $productoCampania,
                    "fechaSeguimiento" => $fechaSeguimiento,
                    "horaSeguimiento" => $horaSeguimiento,
                    "observacionesSeguimiento" => $observacionesSeguimiento,
                    "funcionario" => "{$_SESSION['userData']['id']}",
                    "idCliente" => $hiddenKey
                );

                $arrInformacion = $this->model->AddSeguimientoCliente($infoArray);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }




    public function ConsultarSeguimientos()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $datoBusqueda = limpiar_cadena($_POST['hiddenKey']);
            // $arrRespuesta = "";

            if (empty($datoBusqueda)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar información para consultar');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->ConsultarSeguimientos($datoBusqueda);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
    
    
    
        public function AddDocument()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $tipoDocumento = $_POST['tipoDocumento'];
            $cliente = $_POST['hiddenKey'];
            $archivo = $_FILES['file-input'];

            if (empty($archivo)) {             //Caundo el dato está vacio

                $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que debes ingresar un documento para guardarlo');
            } else {                //Caundo el dato no está vacio

                $arrInformacion = $this->model->AddDocument($tipoDocumento, $cliente, $archivo);

                if (empty($arrInformacion)) {       //Cuando la busqueda sea vacia

                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {                        // Si la busqueda trae datos

                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                    // $arrRespuesta = array('status' => 'success', 'data' => "1212");
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
}
