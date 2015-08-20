
//開頭動畫

function opening(){
        $("#pi").addClass("addpi");
        $("#cus2").css({
            "-webkit-animation":"fly 8s cubic-bezier(0.000, 0.995, 0.000, 1.005) forwards",
            "-moz-animation":"fly 8s cubic-bezier(0.000, 0.995, 0.000, 1.005) forwards"
        });

        $("#cus").css({
            "-webkit-animation":"cus 6s cubic-bezier(0.320, 0.010, 0.000, 0.995) forwards",
            "-moz-animation":"cus 6s cubic-bezier(0.320, 0.010, 0.000, 0.995) forwards"
        });

        $("#title1").delay( 6000 ).fadeIn( 2000 );
        $("#title2").delay( 8000 ).fadeIn( 2000 );
         setTimeout(function(){
            $("#logoa").css("display","inline-block");
        },11000);
    }
