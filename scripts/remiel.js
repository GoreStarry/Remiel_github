
$(function () {


    var browserPass;
    var nowPage = 0;
    var $runPage = $("article").find(".page");
    var lastPage = ($runPage.length) - 1;

    deviceDetect();
    //啟動倒數--------------

    $(window).load(function () {
        var cTime = 5;
        $('.opBoxBR').addClass('starBR');
        $('.opBoxBL').addClass('starBL');
        $('.whitelineL').addClass('rowLine');

        var countDown = setInterval(function () {
            $(".countDown")
                .removeClass('countStart')
                .html(cTime)
                .addClass('countStart');

            cTime--;

            if (cTime < 0) {
                    clearInterval(countDown);
                    $(".loading").css("display", "none");
                    opening();
            }
        }, 1500);
    })


    //-----進入動態----
    $('#logoa').bind('click', function (event) {
        if (browserPass = true) {
            $("#article").css("display", "block");
            $("#LOGO2L,#LOGO2R").addClass("LOGOtran");
            $("#logoa").css({
                "-webkit-animation": "0",
                "-moz-animation": "0"
            });
            $("#ink").css({
                "-webkit-animation": "2.3s inka ease-out  forwards",
                "-moz-animation": "2.3s inka ease-out  forwards"
            });
            $('html, body').stop();

            setTimeout(function () {
                $('html, body').stop().animate({
                    scrollTop: $("#article").offset().top
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
                $("#bgLineS,#bgLineH").css("right", "0");
                $("#bgLineMask").css("opacity", "1");
            }, 3000);

            $("#page0").delay(12000).fadeTo(2000, 1);

            setTimeout(function () {
                $(".touch").fadeTo(500, 1);
                $(".page").addClass("tran");
                $(".menuimg,.menu").css({
                    "display": "block"
                });
                $(".tip").css({
                    "-webkit-animation": "tipdown .5s ease-in forwards",
                    "-moz-animation": "tipdown .5s ease-in forwards"
                });
            }, 14500);
        } else {
            alert("拜託換Chrome或Safari瀏覽器啦～！");
        }

    });
    //--------------

    //------menu hovver--------
    var $findLi = $(".menu").find("li"),
        i = 0;
    $(".menuimg,.menu").hover(function () {
        $(".menuimg").css({
            "-webkit-transform": "rotate(-90deg)"
        });
        $findLi.each(function () {
            $(this).stop(1).delay(i * 100).animate({
                "left": i % 2 - 3 + "rem"
            }, 300);
            i++;
        });
    }, function () {
        $(".menuimg").css({
            "-webkit-transform": "rotate(90deg)"
        });
        $findLi.each(function () {
            $(this).stop(1).delay(i * 50).animate({
                "left": "-12rem"
            }, 300);
            i--;
        });
    });



//    分享留言安三秒歸位
    function hov() {
        var i = 0;

        $(".sticker,.udMt").hover(function () {
            clearInterval(hovtest);
        })

        var hovtest = setInterval(function () {
            if (i == 3) {
                $(".sticker").stop(true).animate({
                    "left": "100vw"
                });
                $(".shareB").stop(true).animate({
                    "bottom": "-10vh"
                });
                clearInterval(hovtest);
            } else {
                i++;
            }
        }, 1000);
    }


    $(".callSti").hover(
        function () {
            $(".shareB").stop(true).animate({
                "bottom": "-10vh"
            }, "swing");
            $(".sticker").stop(true).animate({
                "left": "50vw"
            });
        },
        function () {
            hov();
        });

    $(".share").hover(
        function () {
            $(".sticker").stop(true).animate({
                "left": "100vw"
            });
            $(".shareB").stop(true).animate({
                "bottom": "45vh"
            }, "swing");
        },
        function () {
            hov();
        });



    //--------------

    //------CSS配置--------
    var $udMho = $(".under").find(".udMho");
    $udMho.each(function (i) {
        $(this).css({
            "left": 20 * i + "vw",
            "left": 15 + 22 * i + "vh",
            "top": -7 + (-5 * i) + "rem",
            "z-index": 3 - i
        });
        i++;
    });


    //-------------


    //-----選單效果----

    $(".save").click(function () {
        var pageName = window.location.pathname.split("/").pop();
        $.cookie(pageName, nowPage, {
            expires: 99
        });
        $(".bCard").css({
            "display": "block",
            "-webkit-animation": "bCards 0.5s cubic-bezier(0.320, 0.010, 0.000, 0.995) forwards"
        }).delay(1000).fadeOut(1000);
    });

    $(".load").click(function () {
        var pageName = window.location.pathname.split("/").pop();
        var loadpage = setInterval(function () {
            var savePage = $.cookie(pageName);

            if (nowPage < savePage) {
                nextpage();
                if (nowPage == savePage) {
                    clearInterval(loadpage);
                }
            } else if (nowPage > savePage) {
                prepage();
                if (nowPage == savePage) {
                    clearInterval(loadpage);
                }
            }

        }, 400);
    });

    //--------------




    //-----翻頁區----
    function nextpage() {
        if (nowPage != lastPage) {
            $runPage.eq(lastPage - nowPage).css("left", "100vw");

            nowPage++;
            $runPage.eq(lastPage - nowPage).css("opacity", "1");
            //            $("#page"+nowPage).css("left","100vw");
            //            nowPage++;
            //            //alert(nowPage);
            //            $("#page"+nowPage).css("display","block");
        }
    };

    function prepage() {
        if (nowPage != 0) {
            $runPage.eq(lastPage - nowPage).css("opacity", "0");
            nowPage--;
            $runPage.eq(lastPage - nowPage).css("left", "0");

            //            $("#page"+nowPage).css("left","0");
        }
    };

    document.onkeydown = function () {
        var keycode = event.which || event.keyCode;
        if (keycode == 40 || keycode == 39) {
            nextpage();
        } else if (keycode == 38 || keycode == 37) {
            prepage();
        }
    }

    $("#touchN").click(function () {
        nextpage();
    });
    $("#touchL").click(function () {
        prepage();
    });
    //--------------

    $(".know").click(function () {
        $(".tip").css({
            "-webkit-animation": "knows .5s ease-in forwards",
            "-moz-animation": "knows .5s ease-in forwards"
        });
    });

    $(window).resize(function () {
        $(".pageM").css({
            "font-size": "1.1rem",
            "line-height": "2rem"
        });
        $("article").find(".page").each(function () {
            var i = 0;
            while ($(this).find(".pageM").innerWidth() > $("body").innerWidth()) {
                $(this).find(".pageM").css({
                    "font-size": 20 - i + "px",
                    "line-height": 30 - i + "px"
                });
                i++;
            }
        });
    })

    //瀏覽器偵測
    function deviceDetect() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            alert("未提供最佳閱讀品質，抱歉目前不提供手機裝置瀏覽。");
        } else if (/Firefox|MSIE|Trident\/7\./i.test(navigator.userAgent)) {
            alert("抱歉，Firefox瀏覽器一直不支援中文直式排版，所以我放棄它了... 麻煩改用Chrome或Safari謝謝！");
        } else {
            var browserPass = true;
            //-----破頁保險----
            var bodyWidth = ($("body").innerWidth()) - 170;
            var i = 0;

            $runPage.each(function () {
                while ($(this).find(".pageM").innerWidth() > bodyWidth) {
                    $(this).find(".pageM").css({
                        "font-size": 20 - i + "px",
                        "line-height": 30 - i + "px"
                    });
                    i++;
                }
            });

            //--------------
        }
    }




})
