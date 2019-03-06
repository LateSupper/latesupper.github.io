// displays a notice to ask visitors to turn off ad blocking plugins

window.onload = function() {
    $('#notice').dialog({
        closeOnEscape: false,
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: false,
        height: 200,
        width: 300
    });

    // setTimeout("$('#notice').dialog('open')", 3000);
}