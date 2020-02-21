window.onload = function(){

    if(document.baseURI.indexOf("admin")!=-1){
        hidenShowCont();
        sendReqCreatArtic(); 
    }else{
        link_cont = document.getElementById("contacto")
        sizScreen(); 
        //hideExtChar();
        moreInfoArtSel();
        //getJson();
    }

}



/* --------Setup googlemap--------*/ 
var map;
function initMap(){
    var map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: -29.4101729, lng: -66.8542679}, zoom: 18
    }); 

    var marker = new google.maps.Marker({
    position:{
        lat: -29.4101729,
        lng: -66.8542679}, 
        map: map,
    });
}


/* --------hide character in description--------*/ 
function hideExtChar(){
var artics_descr = document.querySelectorAll("#mainIndex .container .art_cont .artic_descr");

var i;
for (i = 0; i < artics_descr.length; i++) {
    if (artics_descr[i].textContent.length > 200){
        console.log("texto largo " + artics_descr[i].textContent)
    }else{
        console.log("texto corto")
    } 
} 
}


/* --------show more info - selected articles--------*/ 
function moreInfoArtSel(){
    let selec_artic = document.querySelectorAll(".container .art_cont");
    for(i=0;i<selec_artic.length;i++){ 
        selec_artic[i].onclick = async function(e){

			let response = await fetch('/art_info',{method:'POST', body:JSON.stringify({'artic id':e.target.dataset.articid})}); 

            if(response.ok){
				let artic_sel = await response.json();
				let artic_view = document.querySelectorAll("#selected_art>*");
				artic_view[0].setAttribute("src","static/images/articles/"+artic_sel[2] );
				artic_view[1].innerHTML=artic_sel[0];
            	//let text= await response.text();
            }else{
            	console.log('Http error: '+ response.status);
            }

            //var  nodClon = e.cloneNode(true);
            //console.log('.......');
            //console.log(e);
            //console.log('.......');
            //console.log(nodClon);
            //var N = document.getElementById('selected_art');
            //N.appendChild(nodClon);
        };
    }
}


// mediaqueries
function sizScreen(){
    x= window.matchMedia("(max-width: 600px)");
    if (x.matches){
        element = document.getElementById("home");
        element.parentNode.removeChild(element);
        //codigo si no pasa los 600px
        link_cont.setAttribute("class", "myClass"); 
    }else{
        //codigo si pasa los 600px
        flgMap=false;
        link_cont.removeAttribute("href", ""); 
        link_cont.addEventListener("click",showMap); 
        //var node = document.createElement("a");
        //var textnode = document.createTextNode("contacto");
        //node.appendChild(textnode)
        //document.getElementById("wrapper_menu").appendChild(node);
        
    }   
}
 

// Ocultar y mostrar controles
function hidenShowCont(){
    var load_artic= document.getElementById("load_artic");   
    var flg_load_artic= false;
    var del_artic= document.getElementById("del_artic");   
    var flg_del_artic= false;


    var wrapper_load_artic= document.getElementById("wrapper_load_artic");
    

    load_artic.onclick = function(){
       flg_load_artic=!flg_load_artic
        if(flg_load_artic){
            wrapper_del_artic.classList.add("disp_none");            
            wrapper_load_artic.classList.remove("disp_none");            
            flg_load_artic=!flg_load_artic
        }else{
            wrapper_load_artic.classList.add("disp_none");            
        }
    }

    del_artic.onclick = function(){
       flg_del_artic=!flg_del_artic
        if(flg_del_artic){
            wrapper_load_artic.classList.add("disp_none");            
            wrapper_del_artic.classList.remove("disp_none");            
            flg_del_artic=!flg_del_artic 
        }else{
            wrapper_del_artic.classList.add("disp_none");            
        }
    } 
}


/* --------Mostrar oculpar mapA--------*/
function showMap(){ 
    var contenedor_info = document.getElementById("general_container_info");   
    var logo = document.getElementById("logo");
    var cont_iconos_cont = document.getElementById("container_info");    

    flgMap = !flgMap;

    if (flgMap){
        logo.classList.remove("animated","fadeInDown");
        logo.classList.add("animated", "fadeOutUp");
        icons();
    }
    else{
        logo.classList.remove("animated", "fadeOutUp");
        logo.classList.add("animated","fadeInDown");
    }

    function icons(){
        var iconos_info = document.getElementsByClassName("info");
        var iconos_info_spn = document.getElementById("container_info");
        
        iconos_info_spn.classList.remove("disp_none");  
        // setTimeout(resaltar_iconos(true), 6000);
        // iconos_info_spn.onmouseover = resaltar_iconos;

        setTimeout(function(){
            for(var i=0; i<iconos_info.length; i++){
                iconos_info[i].classList.add("animated", "infinite", "flash");
            }                        
        }, 7000);

        
        
        iconos_info_spn.onmouseover = function(){
                        
            for(var i=0; i<iconos_info.length; i++){
                iconos_info[i].classList.remove("animated", "infinite", "flash");    
            }                
            return;
        } 
    }
}


function getJson(){
    fetch('/getJson').then(
        function(response){
            return response.text();
        }
    ).then(
        function (text){
            console.log('GET response text: ');
            console.log(JSON.parse(text));
        }
    ); 
} 

