$(document).ready(function () {
        var e = 1;
        $(".formS").submit(function (t) {
            t.preventDefault();
            var n = {
                    name: $("#textStick").val(),
                    comment: $(".formName").val(),
                    story: window.location.pathname
                },
                r = $(this).attr("action");
            $("#textStick").val() && 1 == e ? $.ajax({
                url: r,
                type: "POST",
                data: n,
                dataType: "json"
            }).done(function (t) {
                t.success ? ($(".sticker").addClass("stickerSuc"), setTimeout(function () {
                    $("#textStick").val("ヽ(o’Д`o)ノ～感謝你的留言！"), $(".formName").val("三光吼")
                }, 1e3), $(".sticker").delay(6e3).animate({
                    left: "150vw"
                }), e++) : alert(t.message)
            }).fail(function (e) {
                alert("error"), console.log(e)
            }).always(function () {}) : alert(2 == e ? "(O_o)??已經留過言了喔!?" : "(￣３￣)a 還沒寫下任何留言喔～")
        })
    })
