$(document).ready(function() {
    var info_c = document.querySelectorAll("#medios_contacto p a");

    for(var i=0; i<info_c.length; i++){
        info_c[i].addEventListener('mouseover',function(e){ 
            var elem = $(this).text().trim();

            switch(elem){
                case "Correo":
                    $(this).html("<span class='icon-mail5' ></span>asaelectronia@hotmail.com");
                    break;
                case "Telefono":
                    $(this).html("<span class='icon-phone2' ></span>0380 443-0827");
                    break;
                case "Direccion de ASA":
                    $(this).html("<span class='icon-location-pin' ></span>Lamadrid 245, F5302 La Rioja");
                    break;
                case "Facebook":
                    $(this).html("<span class='icon-facebook-with-circle' ></span>Ir al Facebook de ASA");
                    break;
            } 
        },false);
        info_c[i].addEventListener('mouseout',function(e){ 
            var elem = $(this).text().trim();

            switch(elem){
                case "asaelectronia@hotmail.com":
                    $(this).html("<span class='icon-mail5' ></span>Correo");
                    break;
                case "0380 443-0827":
                    $(this).html("<span class='icon-phone2' ></span>Telefono");
                    break;
                case "Lamadrid 245, F5302 La Rioja":
                    $(this).html("<span class='icon-location-pin' ></span>Direccion de ASA");
                    break;
                case "Ir al Facebook de ASA":
                    $(this).html("<span class='icon-facebook-with-circle' ></span>Facebook");
                    break;
            } 
        },false);
    }

    $("#correo").flip();


});

