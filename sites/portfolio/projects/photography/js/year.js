// sets year in footer

setYear();

function setYear() {
    var year = document.getElementById('year');
    var date = new Date();
    
    year.innerHTML = date.getFullYear();
}