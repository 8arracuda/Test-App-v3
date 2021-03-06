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
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {

        console.log('onDeviceReady');

        //enabling/starting AngularJS
        var htmlElement = document.getElementsByTagName("html")[0];
        angular.bootstrap(htmlElement, ['sdApp']);

    }
};

startAngularJS = function() {
    console.log('startAngularJS');
    alert('Angular JS will be bootstrapped, but no cordova functions will be available.')
    var htmlElement = document.getElementsByTagName("html")[0];
    angular.bootstrap(htmlElement, ['sdApp']);

};

var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui", "TestHelperFactory","ImageHelperFactory", "techSupportFactory", "SQLDatabaseClearTable", "IndexedDBClearObjectStore", "FileApiDeleteAllFilesFactory", "testDataFactory", "PE_ParameterFactory", "ngAnimate"]);

//copied from
// http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
//On Windows Phone this cannot be used to fetch files from the local file system.
//It is used only for Android and iOS.
//
function FileHelper() {

}
{
    FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();

        //false = synchronous!
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;
        return returnValue;
    }
}

function highlightSourceTableTitle(scope) {
    scope.cssVarForSourceTable = 'sourceTableWasUpdated';
    scope.$apply();

    setTimeout(function () {
        scope.cssVarForSourceTable = '';
        scope.$apply();
    }, 1500);
}

function highlightDestinationTableTitle(scope) {
    scope.cssVarForDestinationTable = 'destinationTableWasUpdated';
    scope.$apply();

    setTimeout(function () {
        scope.cssVarForDestinationTable = '';
        scope.$apply();
    }, 1500);
}

//Code take from http://www.stephenpauladams.com/articles/angularjs-cordova-windows-phone-quirk/
//it makes links work in Windows Phone
//Without this Windows Phone want's to search for an appropiate app for that link.
sdApp.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    }
]);
