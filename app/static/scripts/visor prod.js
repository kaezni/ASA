$(document).ready(function(){
  
    $("#prod_principales figure").click(function(e){
        var ruta_img = $(this).children("a").children("img").attr("src")
        $(".visor #miniaturas").html("<img src='" + ruta_img + "' alt=''>")
        $('#grande').replaceWith('<img src="' + ruta_img +'" id="grande"/>')

        $('#miniaturas img').each(function(){
            $(this).bind("mouseover",function(){                
                var ruta_img = $(this).attr('src');
                $('#grande').replaceWith('<img src="' + ruta_img +'" id="grande"/>').fadeIn(1000);
            });

        });
    });
});