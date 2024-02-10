// This script allows images in the gallery to move around on viewport change

$(window).ready(function() {
    galleryAdjust();
});

$(window).resize(function() {
    galleryAdjust();
});

function galleryAdjust() {
    var winWidth = $(window).width();

    // check if window <= 768PX AND if window > 425PX
    if (winWidth <= 768 && winWidth > 425) {
        $('.col-2-image').appendTo('#columnOne');
        $('.col-3-image').appendTo('#columnThree');
        $('.col-4-image').appendTo('#columnThree');
        $('#columnTwo').hide();
        $('#columnThree').show();
        $('#columnFour').hide();
    } else if (winWidth <= 425) { // check if window <= 425PX
        $('.col-2-image').appendTo('#columnOne');
        $('.col-3-image').appendTo('#columnOne');
        $('.col-4-image').appendTo('#columnOne');
        $('#columnTwo').hide();
        $('#columnThree').hide();
        $('#columnFour').hide();
    } else { // else display full gallery with all columns
        $('.col-2-image').appendTo('#columnTwo');
        $('.col-3-image').appendTo('#columnThree');
        $('.col-4-image').appendTo('#columnFour');
        $('#columnTwo').show();
        $('#columnThree').show();
        $('#columnFour').show();
    }
}