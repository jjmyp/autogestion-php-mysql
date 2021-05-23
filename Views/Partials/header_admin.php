<?php
$picture = media() . 'images/default-image.png';
if (!empty($_SESSION['userData']['imagen_perfil'])) {
  $picture = media() . 'images/' . $_SESSION['userData']['imagen_perfil'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de autogestión - SGA">
  <meta name="author" content="Mi seguro digital">
  <meta name="theme-color" content="#67b5fb">
  <title><?php echo PROJECT_NAME; ?></title>
  <link rel="icon" type="image/x-icon" href="<?= media(); ?>/images/favicon.png">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.dataTables.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/colreorder/1.5.2/css/colReorder.dataTables.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/rowgroup/1.1.2/css/rowGroup.dataTables.min.css">
   <link rel="stylesheet" type="text/css" href="<?=media(); ?>css/select2-bootstrap.min.css">
  <!-- Main CSS-->
  <link rel="stylesheet" type="text/css" href="<?= media(); ?>css/main.css">
  <link rel="stylesheet" type="text/css" href="<?= media(); ?>js/plugins/sweetalert2-10.15.5/sweetalert2.min.css">
  <link rel="stylesheet" type="text/css" href="<?= media(); ?>css/bs-stepper.min.css">
  <!-- Font-icon css-->
  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body class="app sidebar-mini">
  <?php if ($data['page_header'] == 1) { ?>


    <header class="app-header">
      <a class="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
      <a class="app-header__logo" href="<?= base_url() ?>dashboard">
        <center><img src="<?php echo media(); ?>/images/logo.png" width="100px"></center>
      </a>
      <!-- Sidebar toggle button-->
      <!-- Navbar Right Menu-->
      <ul class="app-nav">
        <!-- User Menu-->
        <li class="dropdown"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><img src="<?= $picture; ?>" width="30px" alt="User Image" alt=""></a>
          <ul class="dropdown-menu settings-menu dropdown-menu-right">
            <li><a class="dropdown-item" href="<?= base_url(); ?>perfil"><i class="fa fa-user fa-lg"></i> Perfil</a></li>
            <li><a class="dropdown-item" href="<?= base_url(); ?>logout"><i class="fa fa-sign-out fa-lg"></i> Cerrar sesion</a></li>
          </ul>
        </li>
      </ul>
    </header>
    <?php require_once('aside_admin.php'); ?>
  <?php } ?>