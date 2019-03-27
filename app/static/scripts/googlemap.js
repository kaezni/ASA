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


