sdApp.controller('DE_IndexedDB_mediaDataCtrl', function ($scope, ImageHelperFactory) {

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    var dbName = "MediaData";
    var objStoreName = "MediaData";

    $scope.openDatabase = function () {
        console.log('openDatabase start');

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

                //for updating the "status-light" on the openDatabase butto n
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {

                $scope.db = event.target.result;

                var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "id"});
            }
        }
    };

    $scope.saveImage = function () {

        //removes the old image before the new one is written
        //in this demonstration the image is always saved with id=0
        $scope.deleteImage(function () {

            var transaction = $scope.db.transaction([objStoreName], "readwrite");

            var objectStore = transaction.objectStore(objStoreName);

            var imageFilename = $scope.images[$scope.currentImage];
            var imageData = ImageHelperFactory.convertImageToBase64Format(imageFilename, "image/jpeg");

            var objectToSave = {id: 0, imageData: imageData};
            objectStore.put(objectToSave);

            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete');
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });

    };

    $scope.deleteImage = function (callback) {

        var request = $scope.db.transaction([objStoreName], "readwrite")
            .objectStore(objStoreName).delete("0");
        request.onsuccess = function (event) {
            //console.log('key ' + $scope.keyToRemove + ' was removed');
            console.log('has been deleted');
            callback();
        };
    };

    $scope.loadImage = function () {

        var transaction = $scope.db.transaction([objStoreName], "readonly");

        var objectStore = transaction.objectStore(objStoreName);

        //get object with id=0
        var request = objectStore.get(0);

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
        };

        request.onsuccess = function (event) {

            if (request.result) {
                document.getElementById("imagePlaceholder").src = request.result.imageData;
            }

        };
    };

});