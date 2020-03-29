window.onload = function(){

    if(document.baseURI.indexOf("admin")!=-1){
        hidenShowCont();
        //sendReqCreatArtic(); 

		adm_table = document.getElementById("adm_table");
		adm_table_clone = adm_table.cloneNode(true)
		wrapper_load_artic = document.getElementById("wrapper_load_artic");
		edit_form= document.getElementById("edit_form");
		wrapper_admin_art = document.getElementById("wrapper_admin_art"); 

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



/* --------  search product for name --------*/ 
async function searchArticAdm(){

		let adm_table_exist = await document.getElementById("adm_table");

    	if(!adm_table_exist){ 
    		//wrapper_edit_artic.remove();
    		wrapper_admin_art.appendChild(adm_table);
    	}

		let nodes_to_del = document.getElementById("tb_adm_art"); 

		if (nodes_to_del){
		    nodes_to_del.remove();
		}

        let articName = document.getElementById("searchTxtArticAdm").value
        let response= await fetch('/searchArticAdm',{method:'POST', body:JSON.stringify({'artic name':articName})}); 

		if(response.ok){
			let found_artics = await response.json();
			let tb = document.getElementsByTagName("tbody");
			let art_name = document.getElementById("art_name_tabl");
			let del_art = document.getElementById("del_art_tabl");

			found_artics.forEach(
				function(item){ 

					let th1 = document.createElement("th");	
					th1.setAttribute("class","first-c");
					let tn = document.createTextNode(item[0]);
					th1.appendChild(tn);
					adm_table.appendChild(th1);

					let th2 = document.createElement("th");	
					th2.setAttribute("class","second-c");
					tn = document.createTextNode(item[1]);
					th2.appendChild(tn);	
					let img  = document.createElement("img");
					img.setAttribute("src","static/images/articles/"+item[3] );
					th2.appendChild(img);	
					adm_table.appendChild(th2);


					let th3 = document.createElement("th");	
					th3.setAttribute("class","third-c");
					let btn = document.createElement("input");
					btn.setAttribute("type","button");
					btn.setAttribute("value","eliminar");
					btn.setAttribute("href","/delete/"+ item[2]);
					th3.appendChild(btn);	


					let btn2 = document.createElement("input");
					btn2.setAttribute("type","button");
					btn2.setAttribute("value","editar");
					btn2.setAttribute("id","editArt");
					btn2.setAttribute("onclick","getEditArtic("+item[2]+");");
					th3.appendChild(btn2);	

					let tr = document.createElement("tr");	
					tr.setAttribute("class","artic_det");

					tr.appendChild(th1);
					tr.appendChild(th2);
					tr.appendChild(th3);


					if (tb.length==0){
						tbody= document.createElement("tbody");	
						tbody.setAttribute("id","tb_adm_art");
						adm_table.appendChild(tbody); 
					}

					tbody.appendChild(tr); 
				}
			)
		}else{
			console.log('Http error: '+ response.status);
		} 
}



/* -------- get edit article information --------*/ 
async function getEditArtic(id_art){

	let response = await fetch('/art_info',{method:'POST', body:JSON.stringify({'artic id':id_art})}); 

	if (response.ok){
		let artic = await response.json();
		document.getElementById("edit_form").setAttribute("data-articid",id_art);
		document.getElementById("edit_artic_title").value=artic[3];
		document.getElementById("edit_artic_price").value=artic[0];
		document.getElementById("edit_artic_descr").value=artic[1];
		document.getElementById("edit_list_sect").value=artic[4];
	}else{
		console.log("HTTP error: " + response.status); 
	}

	//wrapper_edit_artic.setAttribute("id","wrapper_edit_artic");
	edit_form.classList.remove("disp_none");
	adm_table.remove();
	//wrapper_admin_art.appendChild(wrapper_edit_artic)
	
}


/* -------- Create article --------*/ 
function createArtic(){
	let creatArticForm = document.getElementById("load_form")
	creatArticForm.onsubmit = async (e) => { 
		e.preventDefault();
		let fd = new FormData(creatArticForm);
		let response = await fetch('/createArtic', {
			method:'POST',
			body: fd
		}); 
		console.log(await response.json())
	}
}



/* -------- edit article --------*/ 
function setEditArtic(){
	let editArticForm = document.getElementById("edit_form")
	editArticForm.onsubmit = async (e) => { 
		e.preventDefault();
		let fd = new FormData(editArticForm );
		fd.append('artic id', editArticForm.getAttribute('data-articid'));
		let response = await fetch('/editArtic', {
			method:'POST',
			body: fd
		}); 
		console.log(await response.json())
	}
}


/* --------show more info - selected articles--------*/ 
function moreInfoArtSel(){

	let selec_artic = document.querySelectorAll(".container .art_cont");

	for(let i=0;i<selec_artic.length;i++){ 

		selec_artic[i].onclick = async function(e){

			let mainInd = document.getElementById("mainIndex");
			mainInd.style.setProperty('grid-column','3/8'); 

			let container = document.getElementsByClassName("container");

			for (let i =0; i<container.length; i++){console.log(container[i]); container[i].style.setProperty('grid-template-columns', 'repeat(5, 14%)')}; 

			document.getElementsByTagName('aside')[0].style.setProperty('visibility','visible');

			let response = await fetch('/art_info',{method:'POST', body:JSON.stringify({'artic id':e.target.dataset.articid})}); 

			if(response.ok){
				let artic_sel = await response.json();
				let artic_view = document.querySelectorAll("#selected_art>*");
				artic_view[0].setAttribute("src","static/images/articles/"+artic_sel[2] );
				artic_view[1].innerHTML=artic_sel[1];
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

