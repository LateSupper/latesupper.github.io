// Collection of "onscroll" functions

window.onscroll = function() {
    navbarStick();
    ifScrolled();
}

// ----------------

// navbarStick()
// Makes navbar "sticky" when certain offset is reached

var navbar = document.getElementById("navi"); // Get navbar

var sticky = navbar.offsetTop; // Get the offset position of the navbar

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function navbarStick() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// ----------------

// setActive()
// Displays effect for the section of page being viewed on navbar


// ----------------

// ifBottom()
// Displays button to scroll back to the top of a website

var topBtn = document.getElementById('toTopBtn'); // Get button

// Checks if scrolled to/past specific position
function ifScrolled() {
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
        topBtn.style.opacity = '1';
        topBtn.style.visibility = 'visible';
    } else {
        topBtn.style.opacity = '0';
        topBtn.style.visibility = 'hidden';
    }
};

// Button onclick function
// function toTop() {
//     document.body.scrollTop = 0; // Safari
//     document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
// }
$("#toTopBtn").click(function(){
    $('html, body').animate({
        scrollTop: $('#content').offset().top
    }, 333);
});