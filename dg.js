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
        var asec = document.getElementsByClassName("a-sec"), bsec = document.getElementsByClassName("b-sec");
        for (i = 0; i < asec.length; i++) {
            asec[i].classList.add("dm");
        }
        for (i = 0; i < bsec.length; i++) {
            bsec[i].classList.add("dm");
        }
        document.getElementById("head").classList.add("dm");
        document.getElementById("dm").classList.add("dm");
        document.getElementById("dms").classList.add("dm");
        document.getElementById("dms-k").classList.add("dm");
        document.getElementById("intro").classList.add("dm");
        document.getElementById("osl").classList.add("dm");
        var porti = document.getElementsByClassName("porti");
        for (i = 0; i < porti.length; i++) {
            porti[i].classList.add("dm");
        }
        document.getElementById("foot").classList.add("dm");
    } else {
        document.getElementsByTagName("body").item(0).classList.remove("dm");
        var asec = document.getElementsByClassName("a-sec"), bsec = document.getElementsByClassName("b-sec");
        for (i = 0; i < asec.length; i++) {
            asec[i].classList.remove("dm");
        }
        for (i = 0; i < bsec.length; i++) {
            bsec[i].classList.remove("dm");
        }
        document.getElementById("head").classList.remove("dm");
        document.getElementById("dm").classList.remove("dm");
        document.getElementById("dms").classList.remove("dm");
        document.getElementById("dms-k").classList.remove("dm");
        document.getElementById("intro").classList.remove("dm");
        document.getElementById("osl").classList.remove("dm");
        var porti = document.getElementsByClassName("porti");
        for (i = 0; i < porti.length; i++) {
            porti[i].classList.remove("dm");
        }
        document.getElementById("foot").classList.remove("dm");
    }
}

function sY() {
    var y = new Date();
    document.getElementById("year").innerHTML = y.getFullYear();
}

$(document).ready(function() {
    dmS();
    sY();

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

    $("#dms").click(function() {
        dmCnS();
    })
});