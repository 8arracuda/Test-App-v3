sdApp.controller('PL_IndexedDBCtrl', function ($scope, $rootScope, testDataFactory, IndexedDBClearObjectStore, TestHelperFactory) {

    //for setting up the color of the titlebar
    $rootScope.section = 'PL';

    var dbName = "PL_Test1";
    var objStoreName = "PL_Test1";

    $scope.databaseOpened = false;

    $scope.currentIteration = 0;

    $scope.result = '';
    $scope.isPrepared = false;
    $scope.testInProgress = false;

    $scope.prepare = function () {
        clearObjectStore();
        $scope.isPrepared = true;
        $scope.currentIteration = '';
        $scope.$apply();
    };


    $scope.prepare = function () {
        $scope.prepareInProgress = true;
        $scope.$apply();
        IndexedDBClearObjectStore.clearObjectStore($scope.db, objStoreName, function () {
            $scope.prepareInProgress = false;
            $scope.isPrepared = true;
            $scope.$apply();
            console.log('prepare function finished');
        });
    };

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 1);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);

            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                $scope.db = request.result;

                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {
                console.log('request.onupgradeneeded (in openDatabase)');
                $scope.db = event.target.result;

                //create a new objectStore
                var objectStore = $scope.db.createObjectStore(objStoreName, {});

            }
        }
    };

    $scope.startPlatformTest = function () {

        $scope.currentIteration = 0;

        var errorAlreadyShown = false;

        var datasetStringToSave = JSON.stringify(testDataFactory.getDatasetForPlatformTest());

        var transaction;

        function writeNext() {

            //console.log('nextLoop' + $scope.currentIteration);
            transaction = $scope.db.transaction([objStoreName], "readwrite");
            //console.log('nextLoop-1');
            var objectStore = transaction.objectStore(objStoreName);
            //console.log('nextLoop-2');
            objectStore.add(datasetStringToSave, 'dataset_' + $scope.currentIteration);
            //console.log('nextLoop-3');
            //$scope.currentIteration = $scope.currentIteration + 1;
            $scope.currentIteration += 1;
            //console.log('nextLoop-4');

            transaction.oncomplete = function (event) {
                console.log('nextLoop-5');
                transaction = null;
                console.log('onComplete ' + $scope.currentIteration);

                if (errorAlreadyShown == false) {
                    console.log('nextLoop-6');
                    console.log('calling nextLoop');
                    if ((parseInt($scope.currentIteration) % 100) == 0) {
                        $scope.$apply();
                        setTimeout(function () {
                            writeNext();
                        }, 1000);
                    } else {
                        writeNext();
                    }
                }
            };

            transaction.onerror = function (event) {
                console.log('onerror');
                console.error('onerror');
                console.dir(event);
                errorAlreadyShown = true;

                console.error('transaction.onerror');
            };
        };

        writeNext();

    };

    $scope.closeDatabase = function () {
        $scope.db.close();
        console.log('database closed');
        $scope.isPrepared = false;
        $scope.databaseOpened = null;
        $scope.$apply();
    };

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 2);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);

            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                $scope.db = request.result;

                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {

                $scope.db = event.target.result;

                //on update: when objectStore existed
                //before it needs to be deleted, before it's created again with new keys.
                //$scope.db.deleteObjectStore(objStoreName);

                var objectStore = $scope.db.createObjectStore(objStoreName, {});

            }
        }
    };


});