$(document).ready(function(){
    $(document).on('keyup', 'input.delete',function (e) { 
        var idInput = $(this).data('id') - 1
        if (e.keyCode == 8) {
          $('#input'+idInput).focus()
        }
    });
})