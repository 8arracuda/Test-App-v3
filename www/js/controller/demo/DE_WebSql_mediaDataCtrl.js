sdApp.controller('DE_WebSql_mediaDataCtrl', function ($scope, ImageHelperFactory) {

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    var tableName = "MediaData";
    var dbName = "MediaData";
    var dbVersion = "1.0";

    $scope.openDatabase = function () {

        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 1024 * 1024);
        $scope.db.transaction($scope.createTable, $scope.errorHandler);

        //for updating the "status-light" on the openDatabase button
        $scope.databaseOpened = true;
        $scope.$apply();
    };

    $scope.createTable = function (tx) {

        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id INT PRIMARY KEY, imageData TEXT)');

    };

    $scope.errorHandler = function (e) {
        alert(e.message);
        console.log(e.message);
    };

    $scope.saveImage = function () {

        $scope.deleteImage(function () {

            var imageFilename = $scope.images[$scope.currentImage];
            var imageData = ImageHelperFactory.convertImageToBase64Format(imageFilename, "image/jpeg");

            $scope.db.transaction(function (tx) {

                tx.executeSql("INSERT INTO MediaData(id, imageData) VALUES(?,?)", ['0', imageData]);
            }, function errorHandler(transaction, error) {
                alert("Error : " + transaction.message);
            });

        });
    };

    $scope.deleteImage = function (callback) {
        console.log('deleteImage');

        $scope.db.transaction(function (tx) {

            tx.executeSql("DELETE FROM MediaData WHERE id = ?", ['0'], function (transaction) {
                //when image is deleted, the callback function is called
                callback();
            }, function errorHandler(transaction, error) {
                alert("Error : " + transaction.message);
            });

        });
    };

    $scope.loadImage = function () {
        console.log("loadImage");
        $scope.db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM MediaData WHERE id = ?", ["0"], function (transaction, results) {

                if (results.rows.length > 0) {
                    console.log(results.rows.item(0).value);
                    console.log(results.rows.item(0).imageData);
                    console.dir(results.rows);

                  document.getElementById("imagePlaceholder").src = results.rows.item(0).imageData;
                    $scope.$apply();
                }

            }, function (t, e) {
                // couldn't read database
                alert("couldn't read database (" + e.message + ")");
            });
        });
    };
});