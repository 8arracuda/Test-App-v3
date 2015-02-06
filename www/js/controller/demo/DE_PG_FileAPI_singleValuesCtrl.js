sdApp.controller('DE_PG_FileAPI_singleValuesCtrl', function ($scope, $rootScope) {

    $scope.keyToLoad = "a";
    $scope.keyToSave = "a";
    $scope.valueToSave = "b";
    $scope.keyToRemove = "";

    function getFilenameForSingleValues(key) {
        return 'key_' + key + '.txt';
    }

    $scope.save= function () {
        console.log('saveEinzelwerte');

        $scope.inProgress = true;

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var filename = getFilenameForSingleValues($scope.keyToSave);
                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.');
                            alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
                            $scope.inProgress = false;
                            $scope.$apply();
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write($scope.valueToSave);

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );

    };

    $scope.updateView = function () {
        console.log('updateEinzelwerteView');

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var filename = getFilenameForSingleValues($scope.keyToLoad);
                fs.root.getFile(filename, {}, function (fileEntry) {

                    // Get a File object representing the file,
                    // then use FileReader to read its contents.
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function (e) {
                            $scope.keyLoaded = $scope.keyToLoad;
                            $scope.valueLoaded= this.result;

                            if (this.result == null) {
                                $scope.valueLoaded= 'does not exist';
                            } else {
                                $scope.valueLoaded= 'has value "' + this.result + '"';
                            }
                            $scope.$apply();

                        };

                        reader.readAsText(file);
                    }, errorHandler);


                }, errorHandlerForUpdateMethod);
            },
            errorHandler
        );

    };

    $scope.removeKey= function () {

        $scope.inProgress = true;
        console.log('removeKeyFromFileAPI');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
            var filename = getFilenameForSingleValues($scope.keyToRemove);
            fs.root.getFile(filename, {create: false}, function (fileEntry) {

                fileEntry.remove(function () {
                    console.log(filename + ' has been removed.');
                    alert(filename + ' has been removed.');

                    $scope.inProgress = false;
                    $scope.$apply();
                }, errorHandler);

            }, errorHandler);
        }, errorHandler);

    };

    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR(1)';
                alert('File not found');
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }

        console.log('Error: ' + msg);
    }

    function errorHandlerForUpdateMethod(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR(2)';
                $scope.valueLoaded= 'does not exist';
                $scope.$apply();
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }

        console.log('Error: ' + msg);
    }

});