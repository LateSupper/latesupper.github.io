// Collect of "onclick" functions

// JavaScript / jQuery mix

// Scrolls to About page section
$("#toAbout").click(function() {
    if (navbar.classList.contains("sticky")) {
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 333);
    } else {
        $('html, body').animate({
            scrollTop: $("#about").offset().top - 54
        }, 333);
    }
});

// Scrolls to Portfolio page section
$("#toPortfolio").click(function() {
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top - 53
    }, 333);
});

// $(".testimony").click(function(e) {

// });