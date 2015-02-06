sdApp.controller('DE_IndexedDB_strDataCtrl', function ($scope, $rootScope, IndexedDBClearObjectStore) {

        //bool value used for the status-light in the "open database" section
        $scope.databaseOpened = false;

        var dbName = "StrData";
        var objStoreName = "StrData";

        $scope.clearObjectStore = function () {
            IndexedDBClearObjectStore.clearObjectStore($scope.db, objStoreName, function () {
            });
        };

        $scope.saveTable = function () {

            $scope.clearObjectStore();

            if ($scope.keyToSave == '' || $scope.valueToSave == '') {
                alert('You need to enter a key and a value');
            } else {

                var transaction = $scope.db.transaction([objStoreName], "readwrite");

                var objectStore = transaction.objectStore(objStoreName);

                for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    var address = {};

                    address.id = $rootScope.data[i][0];
                    address.firstName = $rootScope.data[i][1];
                    address.lastName = $rootScope.data[i][2];
                    address.street = $rootScope.data[i][3];
                    address.zipcode = $rootScope.data[i][4];
                    address.city = $rootScope.data[i][5];
                    address.email = $rootScope.data[i][6];
                    address.randomNumber1 = $rootScope.data[i][7];
                    address.randomNumber2 = $rootScope.data[i][8];

                    objectStore.put(address);
                }

                console.log('addded ' + $rootScope.numberOfRows + ' addresses to ObjectStore strDaten.');

                transaction.oncomplete = function (event) {
                    console.log('transaction.oncomplete (in saveTable)');
                };

                transaction.onerror = function (event) {
                    console.error('transaction.onerror (in saveTable)');
                };

            }
        };

        $scope.loadTable = function () {

            $scope.tableFromIndexedDB = [];

            var transaction = $scope.db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);

            var request = objectStore.openCursor();

            transaction.oncomplete = function (event) {
            };

            transaction.onerror = function (event) {
            };

            request.onsuccess = function (event) {

                var cursor = event.target.result;

                if (cursor) {

                    var address = [];

                    address[0] = cursor.value.id;
                    address[1] = cursor.value.firstName;
                    address[2] = cursor.value.lastName;
                    address[3] = cursor.value.street;
                    address[4] = cursor.value.zipcode;
                    address[5] = cursor.value.city;
                    address[6] = cursor.value.email;
                    address[7] = cursor.value.randomNumber1;
                    address[8] = cursor.value.randomNumber2;

                    $scope.tableFromIndexedDB.push(address);

                    cursor.continue();
                }

                highlightDestinationTableTitle($scope);

            };

        };

        $scope.openDatabase = function () {
            console.log('openDatabase start');

            if (!window.indexedDB) {
                window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
            } else {

                var request = window.indexedDB.open(dbName, 2);

                request.onerror = function (event) {
                    alert("Database error: " + event.target.errorCode);
                };
                request.onsuccess = function (event) {
                    $scope.db = request.result;

                    //for updating the "status-light" on the openDatabase button
                    $scope.databaseOpened = true;
                    $scope.$apply();
                };

                request.onupgradeneeded = function (event) {

                    $scope.db = event.target.result;

                    var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "id"});

                    objectStore.createIndex("lastName", "lastName", {unique: true});

                }
            }
        };
    }
);