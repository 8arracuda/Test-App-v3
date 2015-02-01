sdApp.config(function ($routeProvider) {

    $routeProvider.
        when('/overview', {
            templateUrl: 'overview.html',
            controller: 'OverviewCtrl'
        }).
        when('/PL_localStorage', {
            templateUrl: 'PL_localStorage.html',
            controller: 'PL_LocalStorageCtrl'
        }).
        when('/PL_webSQL', {
            templateUrl: 'PL_webSQL.html',
            controller: 'PL_WebSqlCtrl'
        }).
        when('/PL_indexedDB', {
            templateUrl: 'PL_indexedDB.html',
            controller: 'PL_IndexedDBCtrl'
        }).
        when('/PL_filePlugin', {
            templateUrl: 'PL_fileAPI.html',
            controller: 'PL_FileAPICtrl'
        }).
        when('/PL_PGSQLite', {
            templateUrl: 'PL_PG_SQLite.html',
            controller: 'PL_PGSQLiteCtrl'
        }).
        when('/PE_localStorage', {
            templateUrl: 'PE_localStorage.html',
            controller: 'PE_LocalStorageCtrl'
        }).
        when('/PE_sessionStorage', {
            templateUrl: 'PE_sessionStorage.html',
            controller: 'PE_SessionStorageCtrl'
        }).
        when('/PE_indexedDB', {
            templateUrl: 'PE_indexedDB.html',
            controller: 'PE_IndexedDBCtrl'
        }).
        when('/PE_webSql', {
            templateUrl: 'PE_webSql.html',
            controller: 'PE_WebSqlCtrl'
        }).
        when('/PE_filePlugin', {
            templateUrl: 'PE_fileAPI.html',
            controller: 'PE_FileAPICtrl'
        }).
        when('/PE_SQLitePlugin', {
            templateUrl: 'PE_SQLitePlugin.html',
            controller: 'PE_SQLitePluginCtrl'
        }).
        when('/DE_localStorage', {
            templateUrl: 'DE_localStorage.html',
            controller: 'DE_LocalStorageCtrl'
        }).
        when('/DE_sessionStorage', {
            templateUrl: 'DE_sessionStorage.html',
            controller: 'DE_SessionStorageCtrl'
        }).
        when('/DE_indexedDB', {
            templateUrl: 'DE_indexedDB.html',
            controller: 'DE_IndexedDBCtrl'
        }).
        when('/DE_webSql', {
            templateUrl: 'DE_webSql.html',
            controller: 'DE_WebSqlCtrl'
        }).
        when('/DE_filePlugin', {
            templateUrl: 'DE_PG_fileAPI.html',
            controller: 'DE_PG_FileAPICtrl'
        }).
        when('/localStorage/list2/:key', {
            templateUrl: 'localStorage_list2_details.html',
            controller: 'LocalStorageList2DetailsCtrl'
        }).
        //when('/sessionStorage', {
        //    templateUrl: 'sessionStorage.html',
        //    controller: 'SessionStorageCtrl'
        //}).
        //when('/indexedDB', {
        //    templateUrl: 'indexedDB.html',
        //    controller: 'IndexedDBCtrl'
        //}).
        //when('/webSql', {
        //    templateUrl: 'webSql.html',
        //    controller: 'WebSqlCtrl'
        //}).
        //when('/PGSQLite', {
        //    templateUrl: 'PG_SQLite.html',
        //    controller: 'PGSQLiteCtrl'
        //}).
        when('/directoryVariables', {
            templateUrl: 'directoryVariables.html',
            controller: 'DirectoryVariablesCtrl'
        }).
        otherwise({
            redirectTo: '/PE_localStorage'
            //redirectTo: '/PE_filePlugin'
        });
});
