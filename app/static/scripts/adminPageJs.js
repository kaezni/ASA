window.onload = function(){

        hidenShowCont();

		adm_table = document.getElementById("adm_table");
		edit_form = document.getElementById("edit_form"); 
		wrapper_load_artic = document.getElementById("wrapper_load_artic");
		edit_form= document.getElementById("edit_form");
		wrapper_admin_art = document.getElementById("wrapper_admin_art"); 
        articName = document.getElementById("searchTxtArticAdm")


}

/* -------- cuando se presionala tecla enter en la busqueda 
 	        de productos se ejecuta esta funcion que llama 
            a la funcion searchTxtArticAdm que envia el nombre del 
			articulo a la ruta correspondiente para busca el articulo
			en la BD--------*/ 
function searchEnter(e){
	if(e.keyCode === 13){ 
		searchArticAdm(articName.value);
		articName.value="";
	}
}


/* --------  search product for name --------*/ 
async function searchArticAdm(txtSearch){

		let adm_table_exist = await document.getElementById("adm_table");
		edit_form.setAttribute("class","data_load disp_none");

    	if(!adm_table_exist){ 
    		wrapper_admin_art.appendChild(adm_table);
    	}

		let nodes_to_del = document.getElementById("tb_adm_art"); 

		if (nodes_to_del){
		    nodes_to_del.remove();
		}

		
        let response= await fetch('/searchArticAdm',{method:'POST', body:JSON.stringify({'artic name':txtSearch})}); 

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
	edit_form.removeAttribute("disp_none");


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

	edit_form.classList.remove("disp_none");
	adm_table.remove();
	
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

