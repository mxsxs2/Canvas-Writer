    /*
    * author Mxsxs2
    *
    */
    
    $scope={}; //Scope is declared is from angularjs
    
    //Declare the settings.
    $scope.settings={
            fontStyle               : "normal",
            fontVariant             : "normal",
            fontWeight              : "normal",
            fontSize                : 50,
            textPositionHorizontal  : "Center", //Left,Center,Right
            textPositionVertical    : "Middle", //Bottom, Top, Middle
            textBoxShow             : true,
            fontColor               : "#ffffff",
            boxColor                : "#ffffff"
    } 
    
    //Function used to add watermark
    $scope.addWatermark = function(picture,textToWrite,callback){
        //Variable to prevent infinite loop
        var done=false;
        
        //Create the image from the base64 data
        var imgOri=document.getElementById(picture);
        if(!(imgOri instanceof HTMLImageElement)){
            return;
        }
        //Create a new image
        var img=new Image();
        //Copy the source of the original element
            img.src=imgOri.src;
        //Create a new canvas
        var canvas=document.createElement('canvas');
        //Get the context of the canvas
        var ctx=canvas.getContext("2d");
        
        //When the picture is loaded we begin the operations with it
        img.onload = function(){
            //Set the canvas size to the equivalent of the picture
            canvas.width=img.width;
            canvas.height=img.height;
            //Draw the image onto the canvas
            ctx.drawImage(img,0,0);
            //If there is something to write onto the picture
            if(textToWrite!=''){
                //Set base position         
                var horizontal=10;
                var vertical=30;
                var textAlign='left';  
                var textBaseline='top';  
                
                //Get font style
                var style=$scope.settings.fontStyle.toLowerCase();
                var variant=$scope.settings.fontVariant.toLowerCase();
                var weight=$scope.settings.fontWeight.toLowerCase();
                var size=$scope.settings.fontSize+'px';
                //Set font style
                ctx.font=style+" "+variant+" "+weight+" "+size+" arial";  
                
                
                //Background box position
                var boxVertical=30;
                
                //Decide horizontal position
                switch($scope.settings.textPositionHorizontal){
                    case 'Left':
                        break;
                    case 'Center':
                        textAlign='center';
                        horizontal=canvas.width/2;
                        break;
                    case 'Right':
                        textAlign='right';
                        horizontal=canvas.width-10;
                        break;
                }    
                //Decide vertical position
                switch($scope.settings.textPositionVertical){
                    case 'Top':
                        break;
                    case 'Middle':
                        textBaseline='middle';
                        vertical=canvas.height/2;
                        boxVertical=vertical -($scope.settings.fontSize/2);
                        break;
                    case 'Bottom':
                        textBaseline='bottom';
                        vertical=canvas.height-10;
                        boxVertical=vertical-$scope.settings.fontSize-5;
                        break;
                } 
                //Set text vertical align
                ctx.textBaseline=textBaseline;
                //Set text horizontal aligning
                ctx.textAlign=textAlign; 
                
                
                //Check the box should be shown
                if($scope.settings.textBoxShow){
                    //Set the font color
                    ctx.fillStyle=$scope.settings.boxColor;
                    //Set the opacity of the box
                    ctx.globalAlpha=0.4;
                    //Create background box
                    ctx.fillRect(0,boxVertical,canvas.width,$scope.settings.fontSize+15);
                    //Set alpha back to full
                    ctx.globalAlpha=1;
                }
                //Set the font color
                ctx.fillStyle=$scope.settings.fontColor;             
                //Write onto the image 
                ctx.fillText(textToWrite,horizontal,vertical);
            }
            //Create a new picture and add the source
            //This will return in the callback
            var finalImg= new Image();
                finalImg.src=canvas.toDataURL("image/jpeg");    
            //Call the callback function
            if (typeof callback === "function") callback(finalImg,finalImg.src); 
        }
    }