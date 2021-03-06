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
//var pictureSource;   // picture source
//var destinationType; // sets the format of returned value

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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("deviceready event fired");
        app.receivedEvent('deviceready');
        // api-camera  Photo URI
        //pictureSource=navigator.camera.PictureSourceType;
        //destinationType=navigator.camera.DestinationType;
        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        //window.resolveLocalFileSystemURI("file:///storage/emulated/0/Android/data/com.radicle.ddtest/cache/1398348679247.jpg", onResolveSuccess, fail);
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        // to hide loading splash screen
        //window.setTimeout(function() {
            var appElement = document.querySelector('.app');
            appElement.setAttribute('style', 'display:none;');
        //},2000);
        
        // to show first main clinic page
        var clinicElement = document.querySelector('.clinic-page');
        //window.setTimeout(function() {
                clinicElement.setAttribute('style', 'display:block;');
        //},5000);    
    }
};

//function onFileSystemSuccess(fileSystem) {
//    alert(fileSystem.name);
//    console.log(fileSystem.name);
//}


//function onResolveSuccess(fileEntry) {
//    console.log(fileEntry.name);
//    alert(fileEntry.name);
//}
//
//
//
//function fail(error) {
//    alert(error.code);
//    console.log(error.code);
//}

