<!-- Sidebar menu-->
<div class="app-sidebar__overlay" data-toggle="sidebar"></div>
<aside class="app-sidebar">
  <div class="app-sidebar__user">
    <img class="app-sidebar__user-avatar" src="<?= $picture; ?>" width="50px" alt="User Image">
    <div>
      <p class="app-sidebar__user-name"><?= '¡Hola! ' ?> </p>
      <p class="app-sidebar__user-designation"><?= $_SESSION['userData']['nombre']; ?></p>
    </div>
  </div>
  <ul class="app-menu">
    <li><a class="app-menu__item" href="<?= base_url(); ?>dashboard/"><i class="app-menu__icon fa fa-dashboard"></i><span class="app-menu__label"><strong>Inicio</strong> </span></a></li>
    <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-search"></i><span class="app-menu__label"><strong>Consultas</strong> </span><i class="treeview-indicator fa fa-angle-right"></i></a>
      <ul class="treeview-menu">
        <?php if (!empty($_SESSION['permisos'][6]['r'])) { ?>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>fichapoliza/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Tus negocios</strong> </span></a></li>
        <?php } ?>

        <?php if (!empty($_SESSION['permisos'][5]['r'])) { ?>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>fichacliente/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Tus clientes y prospectos</strong> </span></a></li>
        <?php } ?>

        <?php if (!empty($_SESSION['permisos'][17]['r'])) { ?>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>cartera/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Cartera de tus negocios</strong> </span></a></li>
        <?php } ?>

        <?php if (!empty($_SESSION['permisos'][6]['r'])) { ?>
          <li style="display: none;"><a class="app-menu__item" href="<?php echo base_url(); ?>comisiones/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Mis comisiones</strong> </span></a></li>
        <?php } ?>

        <?php if (!empty($_SESSION['permisos'][9]['r'])) { ?>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>siniestros/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Siniestros</strong> </span></a></li>
        <?php } ?>

        <?php if (!empty($_SESSION['permisos'][10]['r'])) { ?>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>vehiculos/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Vehiculos</strong> </span></a></li>
        <?php } ?>


      </ul>
    </li>
    <?php if (!empty($_SESSION['permisos'][18]['r'])) { ?>
      <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-car"></i><span class="app-menu__label"><strong>Cotizar</strong> </span><i class="treeview-indicator fa fa-angle-right"></i></a>
        <ul class="treeview-menu">
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>polizas/soatplaca/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Soat</strong> </span></a></li>
          <li><a class="app-menu__item" href="<?php echo base_url(); ?>polizas/CotizacionesTodoRiesgo/"><i class="app-menu__icon"></i><span class="app-menu__label"><strong>Todo riesgo</strong> </span></a></li>
        </ul>
      </li>
    <?php } ?>

    <li style="display: none;"><a class="app-menu__item" href="<?= base_url(); ?>capacitacionseguros/"><i class="app-menu__icon fa fa-television"></i><span class="app-menu__label"><strong>Educate en seguros</strong> </span></a></li>
    <?php if (!empty($_SESSION['permisos'][16]['r'])) { ?>
      <li><a class="app-menu__item" href="<?= base_url(); ?>invitacionregistro/"><i class="app-menu__icon fa fa-envelope-o"></i><span class="app-menu__label"><strong>Invitación de registro</strong> </span></a></li>
    <?php } ?>
    <?php if (!empty($_SESSION['permisos'][19]['r'])) { ?>
      <li><a class="app-menu__item" href="<?= base_url(); ?>fichabroker/"><i class="app-menu__icon fa fa-address-book"></i><span class="app-menu__label"><strong>Consulta broker</strong> </span></a></li>
    <?php } ?>
    <?php if (!empty($_SESSION['permisos'][1]['r'])) { ?>
      <li><a class="app-menu__item" href="<?= base_url(); ?>roles/"><i class="app-menu__icon fa fa-user-secret"></i><span class="app-menu__label"><strong>Roles y permisos</strong> </span></a></li>
    <?php } ?>
    <li><a class="app-menu__item" href="<?= base_url() ?>logout/"><i class="app-menu__icon fa fa-sign-out fa-lg"></i><span class="app-menu__label"><strong>Cerrar sesión</strong></span></a></li>
  </ul>
</aside>