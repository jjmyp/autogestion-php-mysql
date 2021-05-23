<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : tiposdocumentos.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo de gestion de tipos documentos 
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class TiposDocumentos extends Controllers
{
    //Metodo constructor
    public function __construct()
    {
        parent::__construct();
    }

    public function AgregarTipoDocumentoController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $abreviacion = limpiar_cadena($_POST['txtAbreviacion']);
            $descripcion = limpiar_cadena($_POST['txtDescripcion']);
            $peticion = $this->model->AgregarTipoDocumentoModel($abreviacion, $descripcion);
            if ($peticion > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Tipo documento regitrado satisfactoriamente');
            } else if ($peticion == 'exist') {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'El tipo de documento que esta intentado registrar, ya se encuentra registrado');
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    public function ActualizarTipoDocumentoController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $abreviacion = limpiar_cadena($_POST['txtAbreviacion']);
            $descripcion = limpiar_cadena($_POST['txtDescripcion']);
            $estado = limpiar_cadena($_POST['txtEstado']);
            $tipo_documento_id = limpiar_cadena($_POST['intTipoDocumentoId']);
            $peticion = $this->model->ActualizarTipoDocumentoModel($abreviacion, $descripcion, $estado, $tipo_documento_id);
            if ($peticion > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Tipo documento actualizado satisfactoriamente');
            } else if ($peticion == 'exist') {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'El tipo de documento que esta intentado registrar, ya se encuentra registrado');
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    public function ObtenerTiposDocumentosController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerTiposDocumentosModel();
            if ($arrData > 0) {
                $arrRespuesta = $arrData;
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se encontro ninguna ciudad');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function ObtenerTipoDocumentoController($idTipoDocumento)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerTipoDocumentoModel($idTipoDocumento);
            if ($arrData > 0) {
                $arrRespuesta = $arrData;
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se encontro ningun tipo de documento');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function EliminarTipoDocumentoController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $idTipoDocumento = limpiar_cadena($_POST['intTipoDocumentoId']);
            $arrData = $this->model->EliminarTipoDocumentoModel($idTipoDocumento);

            if ($arrData > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Tipo de documento eliminado con exito.');
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se pudo eliminar el tipo de documento');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }
}


