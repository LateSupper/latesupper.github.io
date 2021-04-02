function dmCnS() {
    if (localStorage.getItem("darkmode") === null) {
        window.localStorage.setItem("darkmode", "T");
        sdm("T");
    } else if (localStorage.getItem("darkmode") == "T") {
        window.localStorage.removeItem("darkmode");
        sdm("F");
    }
}

function dmS() {
    if (localStorage.getItem("darkmode") === null) {
        sdm("F");
    } else if (localStorage.getItem("darkmode") == "T") {
        sdm("T");
    }
}

function sdm(mode) {
    if (mode == "T") {
        document.getElementsByTagName("body").item(0).classList.add("dm");
        var elems = document.querySelectorAll("body *");
        elems.forEach(e => { e.classList.add("dm"); });
    } else {
        document.getElementsByTagName("body").item(0).classList.remove("dm");
        var elems = document.querySelectorAll("body *");
        elems.forEach(e => { if (e.classList.contains("dm")) { e.classList.remove("dm"); }});
    }
}

function sY() {
    var y = new Date();
    document.getElementById("year").innerHTML = y.getFullYear();
}

dmS();
sY();

$(document).ready(function() {
    var ht = document.getElementById("headtext");
    var htv = "info";
    var i = 0, s = 120, fv = "a", ft = true;

    function httw(f) {
        if (f == "a") {
            if (i < htv.length) {
                ht.innerHTML += htv.charAt(i);
                i++;
                setTimeout(function() {
                    httw(fv);
                }, 100);
            } else {
                i = 0; fv = "d";
                setTimeout(function() {
                    httw(fv);
                }, 10000);
            }
        } else {
            if (i < htv.length) {
                ht.innerHTML = ht.innerHTML.slice(0, -1);
                i++;
                setTimeout(function() {
                    httw(fv);
                }, 100);
            } else {
                i = 0; fv = "a";
                setTimeout(function() {
                    httw(fv);
                }, 10000);
            }
        }
    }

    setTimeout(function() {
        httw(fv);
    }, 1500);

    //tablet or desktop
    $("#abt").click(function() {
        $("#head nav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#intro").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#head nav a").css("pointer-events", "auto");
        }, 500)
    });
    $("#skl").click(function() {
        $("#head nav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#skills").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#head nav a").css("pointer-events", "auto");
        }, 500)
    });
    $("#prt").click(function() {
        $("#head nav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#portfolio").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#head nav a").css("pointer-events", "auto");
        }, 500)
    });
    //mobile
    $("#abtM").click(function() {
        $("#mnav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#intro").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#mnav a").css("pointer-events", "auto");
        }, 500)
    });
    $("#sklM").click(function() {
        $("#mnav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#skills").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#mnav a").css("pointer-events", "auto");
        }, 500)
    });
    $("#prtM").click(function() {
        $("#mnav a").css("pointer-events", "none");
        $("html, body").animate({
            scrollTop: $("#portfolio").offset().top - 114
        }, 500);
        setTimeout(function() {
            $("#mnav a").css("pointer-events", "auto");
        }, 500)
    });

    $("#mnav-t").click(function() {
        if ($("#mnav").css("display") == "none") {
            $("#mnav-t").html('<i class="fas fa-times"></i>');
            $("#mnav").css("display", "table");
        } else {
            $("#mnav-t").html('<i class="fas fa-bars"></i>');
            $("#mnav").css("display", "none");
        }
    });

    $("#dms").click(function() {
        dmCnS();
    });

    window.addEventListener("resize", function() {
        if ($(window).width() > 768 && $("#mnav").css("display") != "none") {
            $("#mnav-t").click();
        }
    }, { passive: true });

    // $(window).resize(function() {
    //     if ($(window).width() > 768 && $("#mnav").css("display") != "none") {
    //         $("#mnav-t").click();
    //     }
    // });
});