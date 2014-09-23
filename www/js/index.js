/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.prepareBtn();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    prepareBtn: function(){
        var button = document.getElementById ("Location");
        button.addEventListener("click", this.getGeolocation);
        console.log ("prepareBtn");
    },

    getGeolocation: function(){
        console.log ("Hello");
     //geolocation position lat and long  
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },
    onSuccess: function(position){
       alert('Lat: ' + position.coords.latitude + ' ' +  'Lon: ' + position.coords.longitude);  
       var xhr = new XMLHttpRequest();
       xhr.open("GET","http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + position.coords.latitude + "," + position.coords.longitude,true);
    
      xhr.addEventListener('load',function(){
      if(xhr.status === 200){
          //alert("We got data: " + xhr.response);
          console.log(xhr.response);
          var text= JSON.parse(xhr.response);
          console.log (text.results[0].locations[0].adminArea5);
          console.log (text.results[0].locations[0].latLng.lat+" "+text.results[0].locations[0].latLng.lng);
          document.getElementById("city").innerHTML=text.results[0].locations[0].adminArea5;
          document.getElementById("latLng").innerHTML+="  Lat    "+text.results[0].locations[0].latLng.lat;
            document.getElementById("latLng").innerHTML+="  Lng "+text.results[0].locations[0].latLng.lng;
      }
    },false); 

    // perform the work
    xhr.send();

    },
    // onError Callback receives a PositionError object
    onError: function(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    //Create the XHR object to do GET to /data resource  
//     XmlRequest: function(){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET","http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + position.coords.latitude + "," + position.coords.longitude,true);

//     // register the event handler
  
// }
    //geolocation position lat and long 
    // navigator.geolocation.getCurrentPosition(function(position){  
    //          alert('Lat: ' + position.coords.latitude + ' ' +  'Lon: ' + position.coords.longitude); 
    // });  
};
