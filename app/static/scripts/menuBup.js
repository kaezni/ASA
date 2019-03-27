window.onload =function(){
    
    /*Mover las siguientes lineas correspondientes
    al link de contacto a un archivo independiente =D*/

    var contenedor_info = document.getElementById("general_container_info");   
    var logo = document.getElementById("logo");    
    var cont_iconos_cont = document.getElementById("container_info");    

    document.getElementById("contacto").onclick = function(e){
        e.preventDefault();        
        // logo.classList.add("hide");
        // contenedor_info.classList.remove("hide");
        

        /*Buscar alternativa a slideDown y fadeIn con
        JS puro*/
        $(logo).slideUp(2000);
        $(contenedor_info).slideDown(2000);
        $(cont_iconos_cont).fadeIn(7000); 
    }

    // Mimificar codigo y corregir variable sin uso

    var cont_menu = document.getElementById("wrapper_menu");    
    var cont_cat = document.getElementById("cont_cat");
    var menu_cat_gnrl = document.getElementById("menu_cat_gnrl");
    var cont_sub_cat = document.getElementById("sub_categ");

        
    cont_cat.onmouseleave = function () {        
        cont_cat.classList.add("hide");            
        cont_cat.classList.remove("background");
        menu_cat_gnrl.classList.add("background");             
    }

    cont_menu.onmouseleave =function () {
        cont_cat.classList.add("hide");
    }


    cont_menu.addEventListener("mouseover", function(e){        
               
        padre_n2 = e.target.parentElement.parentElement;
        elem_act = e.target;

     
        if (elem_act.id == "link_cat" ) {
            menu_cat_gnrl.classList.remove("hide");
            menu_cat_gnrl.classList.add("background");
            cont_sub_cat.classList.add("hide");
            cont_cat.classList.remove("background");
            cont_cat.classList.remove("hide");            

        }

        if (elem_act.id == "contacto" ) {
            cont_cat.classList.add("hide");
        }

        
            
        if (padre_n2.id == "menu_cat_gnrl" ) {
            cont_sub_cat.classList.remove("hide");                      
            menu_cat_gnrl.classList.remove("background");
            cont_cat.classList.add("background");                      
        }
      
    })

}
