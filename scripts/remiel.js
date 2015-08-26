$(function () {



    var browserPass = false,
        nowPage = 0,
        loadingState = false,
        $article = $("article"),
        $runPage = $article.find(".page"),
        lastPage = ($runPage.length) - 1,
        vw = window.innerWidth,
        vh = window.innerHeight,
        screenState = vw > vh ? "land" : "port";



    deviceDetect();
    //啟動倒數--------------

    $(window).load(function () {
        loadingState = true;
    });

    var cTime = 1;
    $('.opBoxBR').addClass('starBR');
    $('.opBoxBL').addClass('starBL');
    $('.whitelineL').addClass('rowLine');

    var countDown = setInterval(function () {
        $(".countDown")
            .removeClass('countStart')
            .html(cTime)
            .addClass('countStart');
        if (cTime == 0) {
            if (loadingState == true) {
                clearInterval(countDown);
                $(".loading").css("display", "none");
                opening();
            }
        } else {
            cTime--;
        }
    }, 1500);


    //-----進入動態----
    $('#logoa').bind('click', function (event) {
        if (browserPass == true) {
            $("#article").show();
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
            swal("拜託換Chrome或Safari瀏覽器啦～！", "(´ﾟдﾟ`)");
            //            alert("拜託換Chrome或Safari瀏覽器啦～！");
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
                    "left": "150vw"
                });
                $(".shareB").stop(true).animate({
                    "bottom": "-15vh"
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
                "bottom": "-15vh"
            }, "swing");
            $(".sticker").stop(true).animate({
                "left": "40vw"
            });
        },
        function () {
            hov();
        });

    $(".share").hover(
        function () {
            $(".sticker").stop(true).animate({
                "left": "150vw"
            });
            $(".shareB").stop(true).animate({
                "bottom": "45vh"
            }, "swing");
        },
        function () {

        });




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

    //    port首頁破圖保險
    //    alert($runPage.eq(0).innerHeight() +"x/" +$runPage.eq(0).outerHeight(true)+"/" +$runPage.eq(0).height());



    //-----翻頁區----

    function nextpage() {
        if (nowPage != lastPage) {
            $runPage.eq(lastPage - nowPage).css("left", "100vw");

            nowPage++;
            var $newPage = $runPage.eq(lastPage - nowPage),
                nowPageHeigt = $newPage.innerHeight();
            $newPage.css("opacity", "1");
            window.location.href = "#article";
            if (nowPageHeigt > $article.innerHeight()) {
                $article.innerHeight(nowPageHeigt);
            } else {
                $article.innerHeight(vh);
            }
        } else {
            var $under = $(".under");
            $under.show();
            $('html, body').stop().animate({
                scrollTop: $under.offset().top
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        }
    };

    function prepage() {
        if (nowPage != 0) {
            $runPage.eq(lastPage - nowPage).css("opacity", "0");
            nowPage--;
            var $newPage = $runPage.eq(lastPage - nowPage),
                nowPageHeigt = $newPage.innerHeight();
            $runPage.eq(lastPage - nowPage).css("left", "0");
            window.location.href = "#article";
            if (nowPageHeigt > $article.innerHeight()) {
                $article.innerHeight(nowPageHeigt);
            } else {
                $article.innerHeight(vh);
            }
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
        vw = window.innerWidth,
            vh = window.innerHeight,
            screenState = vw > vh ? "land" : "port";
        $(".pageM").css({
            "font-size": "1.1rem",
            "line-height": "2rem"
        });
        if (screenState == "land") {
            breakPrevent()
        }
    })

    //    alert(navigator.userAgent);

    //瀏覽器偵測
    function deviceDetect() {
        if (/Firefox|MSIE|Trident\/7\./i.test(navigator.userAgent)) {
            swal("抱歉，Firefox瀏覽器一直不支援中文直式排版，所以我放棄它了...", "麻煩改用Chrome或Safari拜託～！", "warning");
            //            alert("抱歉，Firefox瀏覽器一直不支援中文直式排版，所以我放棄它了... 麻煩改用Chrome或Safari謝謝！");
        } else if (navigator.userAgent.match(/FB/i)) {
            swal("抱歉，FB內建瀏覽器太過陽春了～", "請擊點右上角改以Chrome或Safari開啟喔～", "warning");
            //            alert("抱歉，FB內建瀏覽器太過陽春了～ 請使用其他瀏覽器嘗試。");
        } else {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                swal("桌上平台以獲得更佳瀏覽體驗喔!");
                //                alert("建議使用桌上平台以獲得最佳瀏覽體驗。");
            }
            //            swal("抱歉，FB內建瀏覽器太過陽春了～", "請擊點右上角改以Chrome或Safari開啟喔～");
            browserPass = true;
            if (screenState == "land") {
                breakPrevent();
            } else {
                $("#frame,.loading,article,.under").css({
                    width: vw,
                    height: vh,
                    "min-height": vh
                });
                $(".LOGO2").css({
                    height: 0.15 * vh
                });
//                $(".countDown").css({
//                    "font-size": 0.7*vh,
//                    "height": 0.8*vh,
//                    "line-height": 1*vw
//                });

                if ($runPage.eq(lastPage).innerHeight() > $article.innerHeight()) {
                    var thisHeight = $runPage.eq(lastPage).innerHeight();
                    $article.innerHeight(thisHeight);
                }
            }
        }
    }


    //-----破頁保險----
    function breakPrevent() {
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
    }
    //--------------


    (function () {
        //-----line分享----
        var title = document.title,
            url = "http://" + location.hostname + location.pathname,
            lineHref = "http://line.naver.jp/R/msg/text/?" + title + " " + url + "&nbsp;",
            fbHerf = "https://www.facebook.com/sharer/sharer.php?u=" + url,
            twiHerf = "https://twitter.com/intent/tweet?text=" + title + " " + url;
        //        alert(fbHerf);
        $("#lineShare").attr("href", lineHref);
        $("#fbShare").attr("href", fbHerf);
        $("#twitterShare").attr("href", twiHerf);
        //--------------

        //-----下一章----
        $("#nextChapter").click(function () {
            if ($(this).attr("href") == false) {
                event.preventDefault();
                swal("～待續～");
            }
        });
        //--------------

    })();






})
