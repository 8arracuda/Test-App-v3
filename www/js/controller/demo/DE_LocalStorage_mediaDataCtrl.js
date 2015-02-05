sdApp.controller('DE_LocalStorage_mediaDataCtrl', function ($scope, $rootScope, ImageHelperFactory ) {

    $scope.saveImage= function () {
        var imageFilename = $scope.images[$scope.currentImage];
        var imageData = ImageHelperFactory.convertImageToBase64Format(imageFilename, "image/jpeg");
        localStorage.setItem('image', imageData);
    };

    $scope.loadImage= function () {

        var imageData = localStorage.getItem('image');
        document.getElementById("imagePlaceholder").src = imageData;

    };

    $scope.deleteImage= function () {
        localStorage.removeItem('image');
    };

    //load image from localStorage when page is loaded
    $scope.loadImage();

});