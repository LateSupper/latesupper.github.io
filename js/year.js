// displays current year in footer

function setDate() {
    var date = new Date();
    var year = document.getElementById('year');

    year.innerHTML = date.getFullYear();
}

setDate();
// end