// makes dots on redirect.html animate to show loading

window.onload = function () {
    var timer = 0;

    setInterval(function() {
        timer++;

        var i;
        for (i = 0; i < 1; i++) {
            if (timer > 3) {
                window.location.replace('../home.html');
            }
        }
    }, 1000);
}