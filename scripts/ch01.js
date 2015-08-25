
//開頭動畫

function opening(){
        $("#pi").addClass("addpi");
        $("#cus2").addClass("flyAct");
        $("#cus").addClass("cusAct");

        $("#title1").delay( 6000 ).fadeIn( 2000 );
        $("#title2").delay( 8000 ).fadeIn( 2000 );
         setTimeout(function(){
            $("#logoa").css("display","inline-block");
        },11000);
    }
