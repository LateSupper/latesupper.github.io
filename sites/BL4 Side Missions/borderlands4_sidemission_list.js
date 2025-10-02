// https://www.powerpyx.com/borderlands-4-all-side-missions-walkthrough/ - script to grab list of side missions

// Clear new <div> used for list
var msml = document.querySelector('#mySideMissionList');
if (msml) document.remove(msml);

var mnArray = [];
var eArray = [];
document.querySelectorAll('article ul li a').forEach(e => {
    if (!mnArray.includes(e.textContent)) {
        mnArray.push(e.textContent);
        eArray.push(e);
    }
});
var smlArray = Array.from(eArray).sort((a,b) => {
    var aText = a.textContent.trim();
    var bText = b.textContent.trim();
    return aText.localeCompare(bText);
});

var sideMissionList = document.createElement('div');
sideMissionList.setAttribute('id', 'mySideMissionList');
sideMissionList.setAttribute('style', 'position: fixed; top:0; left:0; height: 100%; background-color: black; overflow-y: auto; z-index: 9999;');

smlArray.forEach(e => {
    let ne = e.cloneNode(true);
    sideMissionList.appendChild(ne);
});

document.body.appendChild(sideMissionList);