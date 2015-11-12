$(document).ready(function () {
    var initUrl = "https://api.twitch.tv/kraken/streams?game=rocket+league&callback=?";
    var arr = [];
    var total = 0;
    var iter = 0; //for debugging
    var settings = {
        "offset" : 0,
        "limit" : 100
    }

    $(".aDiv").empty();

    function getter() {
        iter++; //for debugging
        $.getJSON(initUrl, settings, function (rsp) {
            var resp = rsp.streams;
            $.merge(arr, resp);
            total = rsp._total;
            console.log(total);
            settings.offset += settings.limit;
            if (settings.offset < total) {
                getter();
            }else{
                console.log("finished. " + iter + " iterations");
                arr = arr.sort(function (a, b) {
                    return b.viewers - a.viewers;
                }).filter(function(item, ind) {
                    return item.game == "Rocket League" && ind < 10;
                });
                builder(arr);
            }          
        });
    };

    function builder(arra) {
        console.log("building");
        for (var i = 0; i < arra.length; i++) {
            $(".aDiv").append(
                '<a href="' + arra[i].channel.url + '" target="_blank" class="bDiv">' +
                    '<div class="row">' +
                        '<div class = " proPic col-sm-3">' +
                            '<img src="' + arr[i].channel.logo + '" class="img-responsive">' +
                        '</div>' +
                        '<div class="col-sm-9">' +
                                '<span>' + arr[i].channel.url.slice(21) + '</span><br/>' +
                                '<span>Viewers: ' +  arr[i].viewers + '</span>' + 
                        '</div>' +
                    '</div>' +
                '</a>'
            );
        }
        $(".bDiv").children().filter(":even").css({"background-color" : "rgba(100, 100, 100, 0.95"});
        $(".bDiv").children().filter(":odd").css({"background-color" : "rgba(200, 200, 200, 0.95"});
    };
    getter();
    console.log(arr);
});


/*function jsonCallback(rsp) {
            var resp = rsp.streams;
            $.merge(arr, resp);
            total = rsp._total;
            settings.offset += settings.limit;
            console.log(settings.offset, total, arr.length);
            if (settings.offset < total) {
                getter();
            }else{
                console.log("finished " + iter);
                arr = arr.sort(function (a, b) {
                    return b.viewers - a.viewers;
                }).filter(function(item, ind) {
                    return item.game == "Rocket League" && ind < 10;
                });
                builder(arr);
            }          
        }*/