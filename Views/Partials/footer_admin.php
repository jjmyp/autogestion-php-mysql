    <!-- Essential javascripts for application to work-->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?= media();?>js/popper.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/moment.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/main.js"></script>
    <!-- Se envia un parametro random a la funcion de JS para limpiar la caché -->
    <!-- The javascript plugin to display page loading on top-->
    <script type="text/javascript" src="<?= media();?>js/plugins/pace.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/select2.min.js"></script>
    <!-- Page specific javascripts-->
    <script type="text/javascript" src="<?= media();?>js/plugins/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/bootstrap-notify.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/jquery.validate.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/sweetalert2-10.15.5/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/jquery-numeric/jquery.numeric.js"></script>
    <script type="text/javascript" src="<?= media();?>js/plugins/bs-stepper.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/colreorder/1.5.2/js/dataTables.colReorder.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/rowgroup/1.1.2/js/dataTables.rowGroup.min.js"></script>
   <script  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script>
    <script type="text/javascript" src="<?= media();?>js/<?= $data['page_functions_js']."?v=".rand() ?>"></script>
    <!-- Google analytics script-->
    <script>
      const base_url = "<?= base_url(); ?>";
    </script>
    <script type="text/javascript">
      if(document.location.hostname == 'grupoasistencia.com') {
      	(
          function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      	ga('create', 'UA-72504830-1', 'auto');
      	ga('send', 'pageview');
      }
    </script>
  </body>
</html>