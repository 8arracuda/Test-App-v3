sdApp.controller('PE_WebSql_TestD1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, SQLDatabaseClearTable) {

    var iteration = 1;

    var dataForPreparation;

    var dbName = "PE_TestD1";
    var tableName = "PE_TestD1";
    var dbVersion = "1.0";

    $scope.testInProgress = false;

    var amountOfData;
    var amountOfData_testD1a = PE_ParameterFactory.amountOfData_testD1a;
    var amountOfData_testD1b = PE_ParameterFactory.amountOfData_testD1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'The prepare function will clear the table ' + tableName + '. After that it saves the files needed for the test';
    $scope.mainTestDecription = 'The test deletes addresses by their ids.';
    $scope.testName1 = 'Test D1-500';
    $scope.testDecription1 = 'Stores ' + amountOfData_testD1a + ' items';
    $scope.testName2 = 'Test D1-2000';
    $scope.testDecription2 = 'Stores ' + amountOfData_testD1b + ' items';

    $scope.results = [];

    $scope.isPrepared = false;

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.init = function () {
        console.log('init start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTable, $scope.errorHandler );
        console.log('init executed');
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {
        console.log('createTable start');
        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id TEXT PRIMARY KEY, address TEXT)');
        console.log('createTable executed');
    };

    $scope.errorHandler = function (e) {
        console.log(e.message);
    };

    function saveAddressData(callback) {

        $scope.db.transaction(function (tx) {

            for (var i = 0; i < dataForPreparation.length; i++) {
                tx.executeSql("INSERT INTO " + tableName + "(id, address) VALUES(?,?)", [dataForPreparation[i][0] + '', JSON.stringify(dataForPreparation[i])]);
            }

        }, function errorHandler(transaction, error) {
            console.dir(transaction);
            console.dir(error);
        }, callback);

    }

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {

                    tx.executeSql("DELETE FROM PE_TestD1 WHERE id = ?", [i + '']);

                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                console.log("Error : " + error.message);
            }, function () {
                var timeEnd = new Date().getTime();

                var timeDiff = timeEnd - timeStart;
                $scope.results.push({iteration: iteration, time: timeDiff});
                $scope.testInProgress = false;
                $scope.isPrepared = false;
                iteration++;
                $scope.$apply();

            }
        );

    };

    $scope.prepare = function () {
        $scope.prepareInProgress = true;
        $scope.$apply();
        setTimeout(function () {
            SQLDatabaseClearTable.clearTable($scope.db, tableName, function () {
                loadDataForPreparation();
                saveAddressData(function () {
                    $scope.prepareInProgress = false;
                    $scope.isPrepared = true;
                    $scope.$apply();
                });

            });

        }, 1000);

    };

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

});