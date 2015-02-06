sdApp.controller('DE_PG_FileAPI_mediaDataCtrl', function ($scope, $rootScope, ImageHelperFactory) {
    var filename = "image";

    $scope.loadImage = function () {

        //document.getElementById("imagePlaceholder").src = null;

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                fs.root.getFile(filename, {}, function (fileEntry) {

                    // Get a File object representing the file,
                    // then use FileReader to read its contents.
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function (e) {


                            document.getElementById("imagePlaceholder").src = this.result;

                        };

                        reader.readAsText(file);
                    }, errorHandler);


                }, errorHandlerForUpdateMethod);
            },
            errorHandler
        );

    };

    $scope.saveImage = function () {

        var imageFilename = $scope.images[$scope.currentImage];
        var imageData = ImageHelperFactory.convertImageToBase64Format(imageFilename, "image/jpeg");
        console.log('will save image: ' + imageFilename);

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.');
                            //alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
                            $scope.inProgress = false;
                            $scope.$apply();
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        //fileWriter.write($scope.valueToSave);
                        fileWriter.write(imageData);

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );

    };


    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
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
               // $scope.valueLoaded= 'does not exist';
                document.getElementById("imagePlaceholder").src = null;
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

    $scope.deleteImage= function () {

        $scope.inProgress = true;
        console.log('removeKeyFromFileAPI');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
            fs.root.getFile(filename, {create: false}, function (fileEntry) {

                fileEntry.remove(function () {
                    $scope.inProgress = false;
                    $scope.$apply();
                }, errorHandler);

            }, errorHandler);
        }, errorHandler);

    };

});