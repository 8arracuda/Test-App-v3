sdApp.controller('DE_PG_FileAPI_strDataCtrl', function ($scope, $rootScope) {

    $scope.tableFromPGFileAPI = [];

    var filenameForMethod1 = 'table1';
    var filenameForMethod1NumberOfRows = 'table1_numberOfRows.txt';
    var filenameForMethod2 = 'table2.txt';

    $scope.saveTable1 = function () {

        //TODO Problem with removing the old data
        //delete files before saving new ones
        //$scope.deleteTable1FromPGFileAPI();

        //writes numberOfRows first, then calls writeAddress
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                function writeAddress(i) {
                    if (i < $rootScope.numberOfRows) {
                        var filename = filenameForMethod1 + '_' + i + '.txt';
                        fs.root.getFile(filename, {create: true}, function (fileEntry) {

                            fileEntry.createWriter(function (fileWriter) {

                                fileWriter.onwriteend = function (e) {
                                    console.log(fileEntry.name + ' written successfully.');

                                    //calls the function again to write the next file
                                    writeAddress(i + 1);
                                };

                                fileWriter.onerror = function (e) {
                                    console.log('Write failed: ' + e.toString());
                                    console.dir(e);
                                };

                                //overwrites the file from the beginning
                                fileWriter.seek(0);
                                fileWriter.write(JSON.stringify($rootScope.data[i]));

                            }, errorHandler);
                        }, errorHandler);

                    } else {
                        alert($rootScope.numberOfRows + ' addressfiles has been written.');
                    }

                }

                //var filename = filenameForMethod1NumberOfRows;
                fs.root.getFile(filenameForMethod1NumberOfRows, {create: true}, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log(fileEntry.name + ' written successfully.');

                            //when numberOfRows is written, write the address-files
                            writeAddress(0);
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write(JSON.stringify($rootScope.numberOfRows));

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );

    };

    $scope.saveTable = function () {

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var filename = filenameForMethod2;

                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.');

                            console.log('filename:' + fileEntry.name + " url:" + fileEntry.toURL() + '(from saveTable2ToPGFileAPI)');

                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //saves a subset of $rootScope.data to tableToSave
                        var tableToSave = [];
                        for (var i = 0; i < $rootScope.numberOfRows; i++) {

                            tableToSave.push($rootScope.data[i]);

                        }

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write(JSON.stringify(tableToSave));

                    }, errorHandler);

                }, errorHandler);
            },
            errorHandler
        );
    };


    $scope.loadTable = function () {

        $scope.tableFromPGFileAPI = [];

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {


                var filename = filenameForMethod2;
                fs.root.getFile(filename, {}, function (fileEntry) {

                    // Get a File object representing the file,
                    // then use FileReader to read its contents.
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function (e) {

                            //alert(this.result);
                            console.log('this result: ' + this.result + '(from loadTable2FromPGFileAPI)');
                            //alert(JSON.parse(this.result));
                            $scope.tableFromPGFileAPI = [];
                            $scope.tableFromPGFileAPI = JSON.parse(this.result);

                            highlightDestinationTableTitle($scope);

                        };

                        reader.readAsText(file);
                    }, errorHandler);

                }, errorHandler2);
            },
            errorHandler
        )
        ;

    };

    $scope.deleteTable = function () {
        var filename = filenameForMethod2;
        //$scope.inProgress = true;

        console.log('deleteTable2FromPGFileAPI');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {

            fs.root.getFile(filename, {create: false}, function (fileEntry) {

                fileEntry.remove(function () {
                    console.log(filename + ' has been removed.');

                    //$scope.inProgress = false;
                    //$scope.$apply();
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
        ;


        console.log('Error: ' + msg);
    }

    function errorHandler2(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');

                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                $scope.tableFromPGFileAPI = [];

                highlightDestinationTableTitle($scope);

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
        ;

        console.log('Error: ' + msg);
    }

})
;