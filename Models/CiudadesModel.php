<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : CiudadesModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo de ciudades, Interaccion en la base de datos
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class CiudadesModel extends MySQL
{
    public $strCiudad;
    public $strCodigoDane;
    public $intDepartamento;
    
    public function __construct(){
        parent::__construct();
    }

    public function AgregarCiudadModel(string $ciudad, string $codigo_dane, int $departamento){
        $this->strCiudad = $ciudad;
        $this->strCodigoDane = $codigo_dane;
        $this->intDepartamento = $departamento;

        $ExisteUsuario = $this->SelectAll("SELECT * FROM ciudades WHERE nombre_ciudad = '$this->strCiudad' AND departamentos_id = '$this->departamento'");
        if (empty($ExisteUsuario)) {
            $consulta = "INSERT INTO ciudades(nombre_ciudad, codigo_dane, departamentos_id) VALUES(?, ?, ?)";
            $arrInformacion = array($this->strCiudad, $this->strCodigoDane, $this->intDepartamento);
            $peticion = $this->Insert($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function ObtenerCiudadModel(string $id){
        $consulta = "SELECT * FROM ciudades WHERE id = $id";
        $peticion = $this->Select($consulta);
        return $peticion;
    }

    public function ObtenerCiudadesModel(){
        $consulta = "SELECT c.id AS ciudad_id, d.id AS departamento_id, p.id AS pais_id, nombre_pais AS pais, nombre_departamento AS departamento ,nombre_ciudad AS ciudad   FROM ciudades AS c INNER JOIN departamentos AS d ON (c.departamentos_id = d.id) INNER JOIN paises AS p ON (d.paises_id = p.id) ORDER BY c.nombre_ciudad";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function ActualizarCiudadModel(string $ciudad, string $codigo_dane, int $departamento, int $ciudad_id){
        $this->strCiudad = $ciudad;
        $this->strCodigoDane = $codigo_dane;
        $this->intDepartamento = $departamento;
        $this->intCiudadId = $ciudad_id;
        $ExisteCiudad = $this->SelectAll("SELECT * FROM ciudades WHERE nombre_ciudad = '$this->strCiudad' AND departamentos_id = '$this->departamento' OR  id NOT IN($this->intCiudadId) ");

        if (empty($ExisteCiudad)) {
            $consulta = "UPDATE ciudades SET nombre_ciudad = ?, codigo_dane = ?, departamento_id = ? WHERE id = $this->intCiudadId";
            $arrInformacion = array($this->strCiudad, $this->strCodigoDane,$this->intDepartamento);
            $peticion = $this->Update($consulta, $arrInformacion);
            
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function EliminarCiudadModel(int $id){
        $this->intCiudadId = $id;
        $consulta = "DELETE FROM ciudades WHERE id = $this->intCiudadId";
        $peticion = $this->Delete($consulta);
        return $peticion;
    }
}
