function setDownloadLoc() {
    var a = document.querySelector('#download');
    a.href = `${window.self.location.protocol}//${window.self.location.host}/sites/vidilly/vidilly.zip`;
}
setDownloadLoc();