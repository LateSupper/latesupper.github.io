var TEST_D = null;

function sitemap() {
    var sm = document.querySelector('#sitemap');
    if (sm) {
        var c = 'sitemap-link';
        const D = {
            'portfolio': {
                desc: 'My legacy portfolio site from 2019 containing smaller, design-focused projects.'
            },
            'wheel': {
                desc: 'Wheel to help make a decision.'
            },
            'crash': {
                desc: 'Funny-money gambling game.'
            },
            'BL4 Side Missions': {
                desc: 'Collection of Borderlands 4 side missions as a checklist.'
            },
        }
        for (const property in D) {
            var dc = property.charAt(0).toUpperCase() + property.slice(1);
            sm.insertAdjacentHTML('beforeend', `
                <a href="/sites/${property}/index.htm" class="${c}">
                    <figure>
                        <figcaption>${dc}</figcaption>
                        <img src="src/screenshots/${property}.jpg" alt="${dc}" width="1920" height="1080">
                        <figcaption>${D[property].desc}</figcaption>
                    </figure>
                </a>`);
        }
        var sv = document.querySelector('#siteview');
        var hdr = document.querySelector('#content header');
        var links = document.querySelectorAll(`a.${c}`);
        links.forEach(e => {
            e.addEventListener('click', (ev) => {
                ev.preventDefault();
                links.forEach(e => e.setAttribute('style', 'pointer-events: none;'));
                sv.contentWindow.location.replace(`${ev.currentTarget.href}`);
                // sv.setAttribute('src', ev.currentTarget.href);
                var btia = document.querySelector('#back-to-index');
                var svBR = sv.getBoundingClientRect();
                var hdrBR = hdr.getBoundingClientRect();
                var imgBR = ev.currentTarget.querySelector('img').getBoundingClientRect();
                
                sv.setAttribute('style', `transform: translate(${imgBR.left}px, ${imgBR.top - hdrBR.height}px) scale(${imgBR.width / svBR.width}, ${imgBR.height / svBR.height});`);
                if (!btia.classList.contains('show')) btia.classList.add('show');
                setTimeout(() => {
                    sv.classList.toggle('show');
                }, 250);
            });
        });
    }
}

function backToIndex() {
    var btia = document.querySelector('#back-to-index');
    btia.addEventListener('click', (ev) => {
        ev.preventDefault();
        var sv = document.querySelector('#siteview');
        if (sv) {
            sv.classList.remove('show');
            sv.contentWindow.location.replace('');
            sv.removeAttribute('style');
        }
        if (btia.classList.contains('show')) btia.classList.remove('show');
        document.querySelectorAll('a.sitemap-link').forEach(e => e.removeAttribute('style'));
    });
}

function year() {
    let y = document.querySelector('#year');
    if (y) {
        let ndy = new Date().getFullYear();
        if (ndy !== 2019) y.textContent += `-${ndy}`;
    }
}

function mainHeight() {
    var m = document.querySelector('#content main');
    var sms = document.querySelector('#sitemap-scroll');
    window.onresize = (ev) => {
        if (sms.hasAttribute('style')) sms.removeAttribute('style');
        sms.setAttribute('style', `height: ${m.getBoundingClientRect().height}px;`);
    }
}

(() => {
    sitemap();
    backToIndex();
    year();
    mainHeight();
})();