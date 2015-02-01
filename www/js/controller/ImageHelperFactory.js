angular.module('ImageHelperFactory', [])
    .factory('ImageHelperFactory', function () {

        return {
            //Funktion übernommen von http://forums.mozillazine.org/viewtopic.php?f=19&t=856865
            convertImageToBase64Format: function (imageURI, aType) {
                var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
                var image = document.createElementNS("http://www.w3.org/1999/xhtml", "html:img");
                image.src = imageURI;

                canvas.width = image.width;
                canvas.height = image.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                return canvas.toDataURL(aType);
            }
        }
    });