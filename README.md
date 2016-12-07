# Canvas-Writer

Originally the function is made for angularjs there fore it is uses $scope, but it has been alternated as stand alone function for wider use.

The cw.js should be included, then the function is usable as follows:

    <script type="text/javascript" src="cw.js"></script>
    <script type="text/javascript">
    <!--
        
        //Declare the settings. These settings are declared in cw.js as well, therefore they are not required if not changed.
        $scope.settings={
                fontStyle               : "normal",
                fontVariant             : "normal",
                fontWeight              : "normal",
                fontSize                : 150,
                textPositionHorizontal  : "Center", //Left,Center,Right
                textPositionVertical    : "Middle", //Bottom, Top, Middle
                textBoxShow             : true,
                fontColor               : "#ffffff",
                boxColor                : "#ffffff"
        } 
        
        //Wait until the window loads then call the function
        window.onload = function () {
            //Call the function
            //First parameter is the id of the picture element,
            //Second parameter is the desired text on the picture. (Multi line is not supported)
            $scope.addWatermark('myPicture', "Hello World");
        }        
    -->
    </script>
