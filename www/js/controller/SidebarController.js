sdApp.controller('SidebarController', function ($scope, techSupportFactory) {

    var ts = techSupportFactory.techSupport();

    $scope.techniques = ts;

    $scope.sidebar_performanceTests = [
        {
            labelText: 'Overview',
            linkURL: 'overview',
            support: true
        },
        {
            labelText: 'SessionStorage',
            linkURL: 'PE_sessionStorage',
            support: ts.sessionStorage
        },
        {
            labelText: 'LocalStorage',
            linkURL: 'PE_localStorage',
            support: ts.localStorage
        },
        {
            labelText: 'IndexedDB',
            linkURL: 'PE_indexedDB',
            support: ts.indexedDB
        },
        {
            labelText: 'WebSQL',
            linkURL: 'PE_webSql',
            support: ts.webSQL
        },
        {
            labelText: 'SQLite Plugin',
            linkURL: 'PE_SQLitePlugin',
            support: ts.sqlitePlugin
        },

        {
            labelText: 'File Plugin',
            linkURL: 'PE_filePlugin',
            support: ts.fileAPI_fullSupport
        }
    ];

    //TODO bei FileAPI wird auf Chrome/Desktop angezeigt, dass es unterstützt wird, obwohl es nicht der Fall ist - Der Test in TechSupport muss verbessert werden


    $scope.sidebar_plattformTests = [
        {
            labelText: 'LocalStorage',
            linkURL: 'PL_localStorage',
            support: ts.localStorage
        },
        {
            labelText: 'IndexedDB',
            linkURL: 'PL_indexedDB',
            support: ts.indexedDB
        },
        {
            labelText: 'WebSQL',
            linkURL: 'PL_webSQL',
            support: ts.webSQL
        },
        {
            labelText: 'SQLite Plugin',
            linkURL: 'PL_PGSQLite',
            support: ts.sqlitePlugin
        },
        {
            labelText: 'File Plugin',
            linkURL: 'PL_filePlugin',
            support: ts.fileAPI_fullSupport
        }
    ];

    $scope.sidebar_demonstration = [
        {
            labelText: 'LocalStorage',
            linkURL: 'DE_localStorage',
            support: ts.localStorage
        },
        {
            labelText: 'IndexedDB',
            linkURL: 'DE_indexedDB',
            support: ts.indexedDB
        },
        {
            labelText: 'WebSQL',
            linkURL: 'DE_webSql',
            support: ts.webSQL
        },
        {
            labelText: 'File Plugin',
            linkURL: 'DE_filePlugin',
            support: ts.fileAPI_fullSupport
        }
    ];

});