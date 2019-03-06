// displays an alert to ask visitors to diable ad block

window.onload = function () {
    function adblockReq() {
        var disableReq = "If you're using an advertisement blocking software LSWeb requests you disable it to support the site.";

        setTimeout(function() {alert(disableReq)}, 3000);
    }
    
    adblockReq();
}