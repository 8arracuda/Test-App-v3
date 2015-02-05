sdApp.controller('DE_WebSql_singleValuesCtrl', function ($scope) {

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    $scope.keyToLoad = "a";
    $scope.keyToSave = "a";
    $scope.valueToSave = "b";
    $scope.keyToRemove = "";

    var dbName = "singleValues";
    var dbVersion = "1.0";


    $scope.save = function () {

        $scope.db.transaction(function (tx) {

            tx.executeSql("INSERT INTO singleValues(keyName, value) VALUES(?,?)", [$scope.keyToSave, $scope.valueToSave]);
        }, function errorHandler(transaction, error) {
            alert("Error : " + transaction.message);
        });

    };

    $scope.inputString = "";

    $scope.initWebSQL = function () {
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTableSingleValues, $scope.errorHandlerWebSQL);
        $scope.databaseOpened = true;
    };

    $scope.createTableSingleValues = function (tx) {

        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS singleValues(keyName TEXT PRIMARY KEY, value TEXT)');

    };

    $scope.errorHandlerWebSQL = function (e) {

        console.log(e.message);
        console.dir(e.message);
        console.log('errorHandlerWebSQL executed');
    };

    $scope.deleteTableSingleValues = function () {

        $scope.db.transaction(function (tx) {
            tx.executeSql('DROP TABLE singleValues', [], $scope.gotResults_Check, $scope.errorHandlerWebSQL);
        });

    };

    $scope.update = function () {

        $scope.keyLoaded = $scope.keyToLoad;

        $scope.db.transaction(function (tx) {

            console.log('SELECT * FROM singleValues WHERE keyName = ' + $scope.keyToLoad);

            tx.executeSql("SELECT * FROM singleValues WHERE keyName = ?", [$scope.keyToLoad], function (transaction, results) {

                if (results.rows.length == 0) {
                    $scope.valueLoadedFromWebSQL = 'does not exist';
                } else {
                    $scope.valueLoadedFromWebSQL = 'has value "' + results.rows.item(0).value + '"';
                }
                $scope.$apply();

            }, function (t, e) {
                // couldn't read database
                alert("couldn't read database (" + e.message + ")");
            });
        });
    };

    $scope.removeKey = function () {

        $scope.db.transaction(function (tx) {

            tx.executeSql('DELETE FROM singleValues WHERE keyName = ?', [$scope.keyToLoad], function (transaction, results) {

                console.log('deleted rows with key: ' + $scope.keyToLoad);

            }, function (t, e) {
                alert("couldn't read database (" + e.message + ")");
            });

        });

    };

});