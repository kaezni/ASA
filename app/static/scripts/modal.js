$(document).ready(function(){
    $("#prod_principales figure").click(function(e){
        e.preventDefault(); 
   
        var id = $("#dialog");

        
        //alto y ancho de la pantalla(Get the screen height and width)
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();      

    
        //Establece el alto y ancho para cubrir la pantalla completa         
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        
        
        $('#mask').fadeIn(1000);    
        $('#mask').fadeTo("slow",0.8);  
    
        //Obtiene el ancho y alto de la ventana
        var winH = $(window).height();
        var winW = $(window).width();
              
        // alert("maskHeight: "+ maskHeight+"\nmaskWidth: "+maskWidth+"\nwinH: "+winH+"\nwinW: "+winW);


        //Establece el popup al centro
        $(id).css('top',  winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);
    
        
        $(id).fadeIn(2000); 
    });



    //boton cerrar
    $('.window .close').click(function (e) {       
        e.preventDefault();
        
        $('#mask').hide();
        $('.window').hide();
    });     
    

    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });         


    // REdimension de la ventana
    $(window).resize(function () {
     
        var box = $('#boxes .window');
 
        
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
      
        $('#mask').css({'width':maskWidth,'height':maskHeight});
               

        var winH = $(window).height();
        var winW = $(window).width();

        box.css('top',  winH/2 - box.height()/2);
        box.css('left', winW/2 - box.width()/2);
     
    });
});