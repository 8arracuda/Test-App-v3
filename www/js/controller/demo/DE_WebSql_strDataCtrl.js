sdApp.controller('DE_WebSql_strDataCtrl', function ($scope, $rootScope, SQLDatabaseClearTable) {

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    const dbName = "strData";
    const dbVersion = "1.0";
    const tableName = "strData";

    $scope.openDatabase = function () {

        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTableStrData, $scope.errorHandlerWebSQL);
        $scope.databaseOpened = true;
    };

    $scope.createTableStrData = function (tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS strData (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, street TEXT, zipcode TEXT, city TEXT, email TEXT, randomNumber1 INTEGER, randomNumber2 INTEGER)');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

    $scope.loadTable= function () {

        $scope.tableFromWebSQL = [];


        $scope.db.transaction(function (tx) {

            console.log('SELECT * FROM strData');

            tx.executeSql("SELECT * FROM strData", [], function (transaction, results) {

                var length = results.rows.length;

                for (var i = 0; i < length; i++) {

                    var address = [];

                    var addressFromResults = results.rows.item(i);

                    address[0] = addressFromResults.id;
                    address[1] = addressFromResults.firstName;
                    address[2] = addressFromResults.lastName;
                    address[3] = addressFromResults.street;
                    address[4] = addressFromResults.zipcode;
                    address[5] = addressFromResults.city;
                    address[6] = addressFromResults.email;
                    address[7] = addressFromResults.randomNumber1;
                    address[8] = addressFromResults.randomNumber2;

                    $scope.tableFromWebSQL.push(address);

                }

                highlightDestinationTableTitle($scope);

            }, function (t, e) {
                // couldn't read database
                alert("couldn't read database (" + e.message + ")");
            });

        });

    };

    //$scope.saveTable1ToWebSQL = function () {
    $scope.saveTable= function () {

        SQLDatabaseClearTable.clearTable($scope.db, tableName, function () {


            $scope.db.transaction(function (tx) {

                for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    tx.executeSql("INSERT INTO strData(id, firstName, lastName, street, zipcode, city, email, randomNumber1, randomNumber2) VALUES(?,?,?,?,?,?,?,?,?)", [$rootScope.data[i][0], $rootScope.data[i][1], $rootScope.data[i][2], $rootScope.data[i][3], $rootScope.data[i][4], $rootScope.data[i][5], $rootScope.data[i][6], $rootScope.data[i][7], $rootScope.data[i][8]]);
                }

                //alert($rootScope.numberOfRows + ' addresses saved in WebSQL database  -' + tableName + '-?');

            }, function errorHandler(transaction, error) {
                alert("Error : " + transaction.message);
                alert("Error : " + error.message);
            });

            console.log('saveTable1ToWebSQL executed');

        });


    };

});