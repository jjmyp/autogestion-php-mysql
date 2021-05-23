<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : TiposDocumentosModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo de tipos documentos, Interaccion en la base de datos
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class TiposDocumentosModel extends MySQL
{

    public $strAbreviacion;
    public $strDescripcion;
    public $strEstado;
    public $intTipoDocumentoId;

    public function __construct(){
        parent::__construct();
    }

    public function AgregarTipoDocumentoModel(string $abreviacion, string $descripcion){
        $this->strAbreviacion = $abreviacion;
        $this->strDescripcion = $descripcion;

        $ExisteTipoDocumento = $this->SelectAll("SELECT * FROM tipos_documentos WHERE abreviacion = '$this->strAbreviacion'");
        if (empty($ExisteTipoDocumento)) {
            
            $consulta = "INSERT INTO tipos_documentos(abreviacion, descripcion) VALUES(?, ?)";
            $arrInformacion = array($this->strAbreviacion, $this->strDescripcion);
            $peticion = $this->Insert($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function ObtenerTipoDocumentoModel(string $id){
        $consulta = "SELECT * FROM tipos_documentos WHERE id = $id";
        $peticion = $this->Select($consulta);
        return $peticion;
    }

    public function ObtenerTiposDocumentosModel(){
        $consulta = "SELECT id, abreviacion, descripcion, estado, fecha_creacion, fecha_actualizacion FROM tipos_documentos";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function ActualizarTipoDocumentoModel(string $abreviacion, string $descripcion, string $estado, int $tipo_documento_id){
        $this->strAbreviacion = $abreviacion;
        $this->strDescripcion = $descripcion;
        $this->strEstado = $estado;
        $this->intTipoDocumentoId = $tipo_documento_id;
        $fecha_actualizacion = date('Y-m-d H:i:s');
        $ExisteTipoDocumento = $this->SelectAll("SELECT * FROM tipos_documentos WHERE abreviacion = '$this->strAbreviacion' AND id NOT IN('$this->intTipoDocumentoId') ");

        if (empty($ExisteTipoDocumento)) {
            $consulta = "UPDATE tipos_documentos SET abreviacion = ?, descripcion = ?, estado = ?, fecha_actualizacion = ? WHERE id = $this->intTipoDocumentoId";
            $arrInformacion = array($this->strAbreviacion, $this->strDescripcion,$this->strEstado, $fecha_actualizacion);
            $peticion = $this->Update($consulta, $arrInformacion);
            
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function EliminarTipoDocumentoModel(int $id){
        $this->intTipoDocumentoId = $id;
        $consulta = "DELETE FROM tipos_documentos WHERE id = $this->intTipoDocumentoId";
        $peticion = $this->Delete($consulta);
        return $peticion;
    }
}
