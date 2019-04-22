// When the user scrolls down a set amount of px from the top of the document, resize the logo's size
window.onscroll = function() {scrollFunc()};

function scrollFunc() {
    if (document.body.scrollTop > 16 || document.documentElement.scrollTop > 16) {
        document.getElementById("ssbLogo").style.maxWidth = "33.33%";
    } else {
        document.getElementById("ssbLogo").style.maxWidth = "100%";
    }
}