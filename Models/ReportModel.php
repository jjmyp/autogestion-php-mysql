<?php

include '../vendor/tcpdf/tcpdf.php';
date_default_timezone_set('America/Bogota');

// Crear nuevo documento PDF
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$F_cre = date("d/m/Y", strtotime($_GET["fecha_fc"]));
$F_ini = date("d/m/Y", strtotime($_GET["fecha_fi"]));
$F_fin = date("d/m/Y", strtotime($_GET["fecha_ff"]));
$numero_po= $_GET["num_poli"];
$imprima_po= $_GET["imprima"];
$contribucion_po= $_GET["contribucion"];
$t_runt_po= $_GET["t_runt"];
$valor_pagar_po= $_GET["valor_pagar"];
$nombre_comleto_po= $_GET["nombre_c"];
$t_identificacion_po= $_GET["t_iden"];
$n_identificacion_po= $_GET["indenti"];
$servicio_po= $_GET["servicio"];
$cilindraje_po= $_GET["cilindraje"];
$modelo_po= $_GET["modelo"];
$placa_po= $_GET["placa"];
$marca_po= $_GET["marca"];
$linea_po= $_GET["linea"];
$capacidad_carga_po= $_GET["c_carga"];
$capacidad_pasajeros_po= $_GET["ct_pasa"];
$clase_po= $_GET["clase"];
$numero_motor_po= $_GET["num_motor"];
$numero_chasis_po= $_GET["num_chasis"];
$numero_vin_po= $_GET["num_vin"];
$FECHA_PDF = date('d_m_Y_'.''.'H_i_s');


//Asignar informacion al documento
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('AXA Colpatria');
$pdf->SetTitle('Poliza De Seguros SOAT');
$pdf->SetSubject('AXA COLPATRIA');
$pdf->SetKeywords('AXA COLPATRIA');

// Asignar informacion de la cabecera por defecto
$pdf->SetHeaderData('tcpdf_logo1.png', PDF_HEADER_LOGO_WIDTH,'AXA COLPATRIA SEGUROS S.A NIT: 860002184-6');
// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP);
// helvetica or times to reduce file size.
$pdf->SetFont('dejavusans', '',10, '', true);

// Add a page
$pdf->AddPage();
$pdf->Ln();
$pdf->cell(52, 10, 'INFORMACION DE LA POLIZA', 0, 1, 'C');
$pdf->setFont('Helvetica', '',10);
$pdf->cell(40, 5, 'Fecha expedicion: ', 0);
$pdf->cell(40,5, $F_cre,0);
$pdf->Ln();
$pdf->cell(40, 5, 'Fecha inicio de vigenci: ', 0);
$pdf->cell(40, 5,   $F_ini, 0);
$pdf->Ln();
$pdf->cell(40, 5, 'Fin vigencia: ', 0);
$pdf->cell(40,5, $F_fin, 0);
$pdf->Ln();
$pdf->Ln();
$pdf->cell(40, 5, 'Numero de la poliza: ', 0);
$pdf->cell(40, 5, $numero_po, 0);
$pdf->Ln();
$pdf->cell(40, 5, 'Prima SOAT: ', 0);
$pdf->cell(40, 5, $imprima_po, 0);
$pdf->Ln();
$pdf->cell(40, 5, 'Contribuicion: ', 0);
$pdf->cell(40, 5, $contribucion_po, 0);
$pdf->Ln();
$pdf->cell(40, 5, 'RUNT: ', 0);
$pdf->cell(40, 5, $t_runt_po, 0);
$pdf->Ln();
$pdf->cell(40, 5, 'TOTAL A PAGAR: ', 0);
$pdf->cell(40, 5, $valor_pagar_po, 0);
$pdf->Ln();
$pdf->Ln();
$pdf->cell(55, 10, 'INFORMACION DEL TOMADOR', 0, 1, 'C');
$pdf->cell(18, 5, 'Tomador: ', 0);
$pdf->cell(67, 5, $nombre_comleto_po, 0);
$pdf->Ln();
$pdf->cell(10, 5, 'Tipo documento:'.$t_identificacion_po.'N°:'.$n_identificacion_po,0);
$pdf->Ln();
$pdf->Ln();
$pdf->cell(154, 0, 'Se solicita autorización al tomador para tratamiento de sus datos y se le informa que las políticas', 0, 1, 'C');
$pdf->cell(154, 0, 'y se le informa que las políticas tratamiento de datos y la posibilidad de modificarlos o eliminarlos', 0, 1, 'C');
$pdf->cell(65, 0, 'están el la pagina www.axacolpatria.co  ', 0, 1, 'C');
$pdf->Ln();
$pdf->cell(55, 10, 'INFORMACION DEL VEHICULO', 0, 1, 'C');
$pdf->cell(20, 5, 'Servico :', 0);
$pdf->cell(20, 5, $servicio_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Cilindraje :', 0);
$pdf->cell(20, 5, $cilindraje_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Modelo : ', 0);
$pdf->cell(20, 5, $modelo_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Placa : ', 0);
$pdf->cell(20, 5, $placa_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Marca : ', 0);
$pdf->cell(20, 5, $marca_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Linea : ', 0);
$pdf->cell(20, 5, $linea_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Pasajeros : ', 0);
$pdf->cell(20, 5, $capacidad_pasajeros_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Capacidad : ', 0);
$pdf->cell(20, 5, $capacidad_carga_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'Clase : ', 0);
$pdf->cell(20, 5, $clase_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'N° Motor : ', 0);
$pdf->cell(20, 5, $numero_motor_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'N° Chasis : ', 0);
$pdf->cell(20, 5, $numero_chasis_po, 0);
$pdf->Ln();
$pdf->cell(20, 5, 'N° VIN : ', 0);
$pdf->cell(20, 5, $numero_vin_po, 0);
$pdf->Ln();
$pdf->Ln();
$pdf->cell(132, 0, 'Conserva tu recibo y descargar tu poliza en la pagina www.axacolpatria.com  o  en ', 0, 1, 'C');
$pdf->cell(134, 0, 'https://clientes.axacolpatria.co/descargar-soat las autoridades de control de transito  ', 0, 1, 'C');
$pdf->cell(132, 0, 'deben sertificaar la tenencia del SOAT mediante la consulta en linea en tiempo real ', 0, 1, 'C');
$pdf->cell(89, 0, 'de la base del RUNT por medio de dispositivos moviles. ', 0, 1, 'C');
$pdf->Ln();

$pdf->Output('SOAT_' . $numero_po . '' .$n_identificacion_po. ''. $FECHA_PDF .  '.pdf', 'D');
// END OF FILE

?>