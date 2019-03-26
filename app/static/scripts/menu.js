window.onload =function(){

    /*Mover las siguientes lineas correspondientes
    al link de contacto a un archivo independiente =D*/

    var contenedor_info = document.getElementById("general_container_info");   
    var logo = document.getElementById("logo");    
    var cont_iconos_cont = document.getElementById("container_info");    
    var iconos_info = document.getElementsByClassName("info");
    var iconos_info_spn = document.getElementById("container_info");
    var link_cont = document.getElementById("contacto")


    link_cont.onclick = function(e){
        e.preventDefault();        
 
        /*Buscar alternativa a slideDown y fadeIn con
        JS puro*/
        $(logo).slideUp(2000);
        $(contenedor_info).slideDown(2000)
        $(cont_iconos_cont).delay(2000).fadeIn(4000);

        // La propiedad prevent defautl no nos permite redirigirnos 
        // de vuelta a la pagina de inicio
        var el = document.getElementById("contacto"); 
        var newEl = document.createElement('a');
        var t = document.createTextNode("inicio"); 
        newEl.appendChild(t);

        newEl.setAttribute('href', '/');
            
        el.parentNode.replaceChild(newEl,el);
//        link_cont.innerHTML = "Inicio";
//        link_cont.href = "/";
        
        //parpadeo de iconos

        resaltar_iconos()

        // setTimeout(resaltar_iconos(true), 6000);
        // iconos_info_spn.onmouseover = resaltar_iconos;
    }


    // Mimificar codigo y corregir variable sin uso

    var cont_menu = document.getElementById("wrapper_menu");    
    var cont_cat = document.getElementById("cont_cat");
    var menu_cat_gnrl = document.getElementById("menu_cat_gnrl");
    var cont_sub_cat = document.getElementById("sub_categ");

        
    cont_cat.onmouseleave = function () {        
        cont_cat.classList.add("disp_none");            
    }

    cont_menu.onmouseleave =function () {
        cont_cat.classList.add("disp_none");
    }


    cont_menu.addEventListener("mouseover", function(e){        
               
        padre_n2 = e.target.parentElement.parentElement;
        elem_act = e.target;

     
        if (elem_act.id == "link_cat" ) {
            menu_cat_gnrl.classList.remove("visib_hidd");
            cont_sub_cat.classList.add("visib_hidd");
            cont_cat.classList.remove("disp_none");
            
            menu_cat_gnrl.classList.add("backgrnd");
            cont_cat.classList.remove("backgrnd");
        }

        if (elem_act.id == "contacto" ) {
            cont_cat.classList.add("disp_none");
        }

        
            
        if (padre_n2.id == "menu_cat_gnrl" ) {
            cont_sub_cat.classList.remove("visib_hidd");                      
            
            menu_cat_gnrl.classList.remove("backgrnd");
            cont_cat.classList.add("backgrnd");
        }
      
    })

    function resaltar_iconos(){

        setTimeout(function() {
            for(var i=0; i<iconos_info.length; i++){
                iconos_info[i].classList.add("animated", "infinite", "flash");
            }                        
        }, 6000);
        
        iconos_info_spn.onmouseover = function(){
                       
            for(var i=0; i<iconos_info.length; i++){
                iconos_info[i].classList.remove("animated", "infinite", "flash");    
            }                
            return;
        }

    }


}; 
