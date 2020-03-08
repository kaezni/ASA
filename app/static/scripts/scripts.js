window.onload = function(){

    if(document.baseURI.indexOf("admin")!=-1){
        hidenShowCont();
        //sendReqCreatArtic(); 
        searchArticAdm();

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
for (let i = 0; i < artics_descr.length; i++) {
    if (artics_descr[i].textContent.length > 200){
        console.log("texto largo " + artics_descr[i].textContent)
    }else{
        console.log("texto corto")
    } 
} 
}



/* --------  search product for name --------*/ 
function searchArticAdm(){
    document.getElementById("searchArticAdm").onclick= async function(){ 

		let nodes_to_del = document.getElementById("tb_adm_art"); 

		if (nodes_to_del){
		    nodes_to_del.remove();
		}else{
			console.log(nodes_to_del); 
		}

        let articName = document.getElementById("searchTxtArticAdm").value
        let response= await fetch('/searchArticAdm',{method:'POST', body:JSON.stringify({'artic name':articName})}); 

		if(response.ok){
			let found_artics = await response.json();
			let adm_table = document.getElementById("adm_table");
			let tb = document.getElementsByTagName("tbody");
			let art_name = document.getElementById("art_name_tabl");
			let del_art = document.getElementById("del_art_tabl");

			found_artics.forEach(
				function(item){ 

					let th1 = document.createElement("th")	
					let tn = document.createTextNode(item[0])
					th1.appendChild(tn)	
					adm_table.appendChild(th1)

					let th2 = document.createElement("th")	
					tn = document.createTextNode(item[1])
					th2.appendChild(tn)	
					let img  = document.createElement("img")
					img.setAttribute("src","static/images/articles/"+item[3] );
					th2.appendChild(img)	
					adm_table.appendChild(th2)


					let th3 = document.createElement("th")	
					let a = document.createElement("a")
					tn = document.createTextNode("borrar")
					a.appendChild(tn)	
					a.setAttribute("href","/delete/"+ item[2]);
					th3.appendChild(a)	

					let th4 = document.createElement("th")	
					let a2 = document.createElement("a")
					tn = document.createTextNode("editar")
					a2.appendChild(tn)	
					a2.setAttribute("href","/edit/"+ item[2]);
					th4.appendChild(a2)	

					let tr = document.createElement("tr")	
					tr.setAttribute("class","artic_det");

					tr.appendChild(th1)
					tr.appendChild(th2)
					tr.appendChild(th3)
					tr.appendChild(th4)


					if (tb.length==0){
						console.log(tb.length);
						tbody= document.createElement("tbody")	
						tbody.setAttribute("id","tb_adm_art");
						adm_table.appendChild(tbody) 
					}

					tbody.appendChild(tr); 
				}
			)
		}else{
			console.log('Http error: '+ response.status);
		} 
	};
}


/* --------show more info - selected articles--------*/ 
function moreInfoArtSel(){

	let selec_artic = document.querySelectorAll(".container .art_cont");

	for(let i=0;i<selec_artic.length;i++){ 

		selec_artic[i].onclick = async function(e){

			let mainInd = document.getElementById("mainIndex");
			document.getElementsByTagName('aside')[0].style.setProperty('visibility','visible');
			mainInd.style.setProperty('grid-column','3/8'); 

			let response = await fetch('/art_info',{method:'POST', body:JSON.stringify({'artic id':e.target.dataset.articid})}); 

			if(response.ok){
				let artic_sel = await response.json();
				console.log(artic_sel); 
				let artic_view = document.querySelectorAll("#selected_art>*");
				artic_view[0].setAttribute("src","static/images/articles/"+artic_sel[2] );
				artic_view[1].innerHTML=artic_sel[1];
				//let text= await response.text();
			}else{
				console.log('Http error: '+ response.status);
			} 
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
			wrapper_admin_art.classList.add("disp_none");            
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
			wrapper_admin_art.classList.remove("disp_none");            
			flg_del_artic=!flg_del_artic 
		}else{
			wrapper_admin_art.classList.add("disp_none");            
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

