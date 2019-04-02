window.onload = function(){
    hidenShowCont();
    sendReqCreatArtic();
   
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





//-------- Manejar alta de articulos --------
function sendReqCreatArtic(){

    document.getElementById("createArtic").addEventListener("click", function(event){
        event.preventDefault();
        
        createArtic();
    });



    function createArtic(){

        var httpRequest = new XMLHttpRequest(); 

        var artic_title = document.getElementById("artic_title").value;
        var artic_descr = document.getElementById("artic_descr").value;
        var artic_sect= document.getElementById("list_sect").value;
        var new_sect= document.getElementById("new_sect").value;
        var artic_img = document.getElementById("artic_img").value;


        if(new_sect){
            artic_sect=new_sect;
        }



        if (!httpRequest){
            alert("cant create instance")
            return false
        }


        httpRequest.onreadystatechange = function(){ 
            if(this.readyState==4 && this.status==200){
              console.log("server response "); 
            }else{
              //console.log(this.readyState); 
              //console.log(this.status); 
              //console.log(httpRequest); 
            } 
        }


        httpRequest.open("POST", "/loadArtic", true);
        
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //httpRequest.send("fname=Henry&lname=Ford"); 
        httpRequest.send ('artic_title='+encodeURIComponent(artic_title)+'&artic_descr='+encodeURIComponent(artic_descr)+'&artic_sect='+encodeURIComponent(artic_sect));
            
           // ,+'artic_descr='+encodeURIComponent(artic_descr),+'artic_sect='+encodeURIComponent(artic_sect));
        }
    }
