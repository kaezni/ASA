window.onload = function(){
	link_cont = document.getElementById("contacto");
	sizScreen();
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

	
/* -------- Cuando se selecciona un producto con click izquierdo 
 	        se envia el id del articulo a la url correspondiente
			para que esta lo busque en la BD y devuelva la 
			descripcion junto con el precio e imagen ---------*/ 
async function moreInfoArtSel(e){

	let mainInd = document.getElementById("mainIndex");
	mainInd.style.setProperty('grid-column','3/8'); 

	let container = document.getElementsByClassName("container");

	for (let i =0; i<container.length; i++){ container[i].style.setProperty('grid-template-columns', 'repeat(5, 14%)')}; 

	document.getElementsByTagName('aside')[0].style.setProperty('visibility','visible');

	let response = await fetch('/art_info',{method:'POST', body:JSON.stringify({'artic id':e.target.dataset.articid})}); 

	if(response.ok){
		let artic_sel = await response.json();
		let artic_view = document.querySelectorAll("#selected_art>*");
		artic_view[0].setAttribute("src","static/images/articles/"+artic_sel[2] );
		artic_view[1].innerHTML="$ " + artic_sel[0].toFixed(2);
		artic_view[2].innerHTML=artic_sel[1];
	}else{
		console.log('Http error: '+ response.status);
	} 
}


 
/* -------- mediaqueries --------*/
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

	setTimeout(function(){
		for(let i=0; i<iconos_info.length; i++){
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


	

