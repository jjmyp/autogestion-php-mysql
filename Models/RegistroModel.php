<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : RegistroModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Registro de plataforma para los referidores
//
// Author: Jairo Rivera Ordo���ez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class RegistroModel extends MySQL
{
    public $strIdentificacion;
    public $strNombre;
    public $strApellido;
    public $strFechaNacimiento;
    public $strGenero;
    public $strDireccion;
    public $strTelefono;
    public $strCelular;
    public $strCorreoElectronico;
    public $strEstado;
    public $strContrasena;
    public $strAccount;
    public $strImage;
    public $strAccountId;
    public $intCiudadesId;
    public $intTiposDocumentosId;
    public $intRolesId;
    public $intUsuarioId;

    public function __construct(){
        parent::__construct();
    }

    public function AgregarUsuarioModel(array $datos){
        extract($datos);
        $this->strIdentificacion = $identificacion;
        $this->strNombre = $nombre;
        $this->strApellido = $apellido;
        $this->strFechaNacimiento = $fecha_nacimiento;
        $this->strGenero = $genero;
        $this->strDireccion = $direccion;
        $this->strTelefono = $telefono;
        $this->strCelular = $celular;
        $this->strCorreoElectronico = $correo_electronico;
        $this->strAccount = $account;
        $this->intCiudadesId = $ciudad;
        $this->intTiposDocumentosId = $tipo_documento;
        $this->intRolesId = 19;
        $this->strAccountId = $account_id;
        // if (isset($imagen)) {            
        //     $this->strImage = $imagen;
        // }else{
        //     $this->strImage = '';
        // }
        if ($contrasena == null) {
            $this->strContrasena = null;
        }else{
            $this->strContrasena = password_hash($contrasena, PASSWORD_DEFAULT);
        }

        $ExisteUsuario = $this->SelectAll("SELECT * FROM usuarios WHERE identificacion = '$this->strIdentificacion' OR correo_electronico = '$this->strCorreoElectronico'");
        if (empty($ExisteUsuario)) {
            $consulta = "INSERT INTO usuarios(identificacion, nombre, apellido, fecha_nacimiento, genero, direccion, telefono, celular, correo_electronico, contrasena, ciudades_id, tipos_documentos_id, roles_id, account_id, account) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $arrInformacion = array($this->strIdentificacion, $this->strNombre, $this->strApellido, $this->strFechaNacimiento, $this->strGenero, $this->strDireccion, $this->strTelefono, $this->strCelular,$this->strCorreoElectronico, $this->strContrasena, $this->intCiudadesId,$this->intTiposDocumentosId, $this->intRolesId, $this->strAccountId, $this->strAccount);
            $peticion = $this->Insert($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }
    
    public function RegistrarCupo($usuarioId){
        $InsertCupo = "INSERT INTO cupos (usuario, cupo_maximo, monto_maximo, canal, causal_bloqueo, saldo, consumo) VALUES (?,?,?,?,?,?,?)";
        $arrayInsert = array($usuarioId, 3, 1000000, 5 , 1074, 1000000, 0);
        $peticion = $this->Insert($InsertCupo, $arrayInsert);
        return $peticion;
    }

    public function ObtenerUsuarioModel($campo, $dato){
        $consulta = "SELECT * FROM usuarios WHERE $campo = '$dato'";
        $peticion = $this->Select($consulta);
        return $peticion;
    }

    public function ObtenerUsuariosModel(){
        $consulta = "SELECT * FROM usuarios";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

}
