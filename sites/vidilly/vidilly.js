class Vidilly {
    static insert(videoWidth = 720, videoHeight = 405, videoVolume = 0.1) {
        var v = window.self.document.querySelectorAll('video');
        v.forEach(e => {
            // video defaults
            e.setAttribute('width', videoWidth);
            e.setAttribute('height', videoHeight);
            e.setAttribute('style', `max-width: ${videoWidth}px; max-height: ${videoHeight}px;`);
            if (e.hasAttribute('controls')) e.removeAttribute('controls');
            e.toggleAttribute('preload');
            e.toggleAttribute('disablepictureinpicture');
            e.volume = (videoVolume > 1 || videoVolume < 0) ? 0.5 : videoVolume;

            var p = e.parentNode;
            var i = Array.from(p.childNodes).indexOf(e);
            // create Vidilly elements
            const CLAS = ['vidilly', '-controls', '-seek', '-overlay', '-overlay-play', '-play', '-volume', '-volume-bar', '-spacer', '-fullscreen'];
            var vidilly = [];
            CLAS.forEach(c => {
                let ce = null;
                if (c == '-overlay') {
                    ce = window.self.document.createElement('div');
                    var cei = window.self.document.createElement('img');
                    cei.src = 'src/images/playX.png';
                    cei.width = '96';
                    cei.height = '96';
                    ce.append(cei);
                } else if (c == '-seek') {
                    ce = window.self.document.createElement('progress');
                } else if (c == '-volume-bar') {
                    ce = window.self.document.createElement('input');
                    ce.setAttribute('type', 'range');
                    ce.setAttribute('min', '0');
                    ce.setAttribute('max', '1');
                    ce.setAttribute('step', '0.01');
                    ce.value = e.volume;
                } else {
                    ce = window.self.document.createElement('div');
                }
                ce.setAttribute('class', `${!c.includes(CLAS[0]) ? CLAS[0] + c : c}`);
                vidilly.push(ce);
            });
            vidilly[0].setAttribute('style', `max-width: ${videoWidth}px; max-height: ${videoHeight}px;`);

            // piece-together elements
            for (let i = vidilly.length - 1; i > CLAS.indexOf('-play') - 1; i--) {
                vidilly[CLAS.indexOf('-controls')].prepend(vidilly[i]);
            }
            vidilly[0].appendChild(vidilly[CLAS.indexOf('-overlay')]);
            vidilly[0].appendChild(vidilly[CLAS.indexOf('-seek')]);
            vidilly[0].appendChild(vidilly[CLAS.indexOf('-controls')]);

            if (p.childNodes[i].nextSibling) {
                p.insertBefore(vidilly[0], p.childNodes[i].nextSibling);
            } else {
                p.appendChild(vidilly[0]);
            }
            vidilly[0].prepend(e);

            // events
            e.addEventListener("loadedmetadata", () => {
                vidilly[CLAS.indexOf('-seek')].setAttribute("max", e.duration);
                vidilly[CLAS.indexOf('-seek')].value = 0;
            });
            e.addEventListener("timeupdate", () => {
                if (!vidilly[CLAS.indexOf('-seek')].getAttribute("max"))
                    vidilly[CLAS.indexOf('-seek')].setAttribute("max", e.duration);
                vidilly[CLAS.indexOf('-seek')].value = e.currentTime;
            });
            e.addEventListener("ended", () => {
                vidilly[CLAS.indexOf('-play')].classList.remove('pause');
            });
            vidilly[CLAS.indexOf('-overlay')].addEventListener("click", (ev) => {
                ev.currentTarget.setAttribute("style", "display: none;");
                e.play();
                vidilly[CLAS.indexOf('-play')].classList.add('pause');
            });
            vidilly[CLAS.indexOf('-seek')].addEventListener("click", (ev) => {
                if (!Number.isFinite(e.duration)) return;
                const rect = vidilly[CLAS.indexOf('-seek')].getBoundingClientRect();
                const pos = (ev.pageX - rect.left) / vidilly[CLAS.indexOf('-seek')].offsetWidth;
                e.currentTime = pos * e.duration;
            });
            var pp = [e, vidilly[CLAS.indexOf('-play')]];
            pp.forEach(p => {
                p.addEventListener('click', () => {
                    if (e.paused || e.ended) {
                        e.play();
                        vidilly[CLAS.indexOf('-play')].classList.add('pause');
                    } else {
                        e.pause();
                        vidilly[CLAS.indexOf('-play')].classList.remove('pause');
                    }
                });
            });
            vidilly[CLAS.indexOf('-volume')].addEventListener('click', () => {
                e.muted = !e.muted;
                vidilly[CLAS.indexOf('-volume')].classList.toggle('mute');
            });
            vidilly[CLAS.indexOf('-volume-bar')].addEventListener('input', (ev) => {
                e.volume = ev.currentTarget.value;
            }, {passive: true});

            if (!window.self.document?.fullscreenEnabled) {
                vidilly[CLAS.indexOf('-fullscreen')].style.display = "none";
            } else {
                vidilly[CLAS.indexOf('-fullscreen')].addEventListener('click', () => {
                    if (window.self.document.fullscreenElement) {
                        window.self.document.exitFullscreen();
                        vidilly[0].classList.remove('fullscreen');
                        vidilly[CLAS.indexOf('-fullscreen')].classList.remove('exit');
                    } else {
                        vidilly[0].requestFullscreen();
                        vidilly[0].classList.add('fullscreen');
                        vidilly[CLAS.indexOf('-fullscreen')].classList.add('exit');
                    }
                });
            }
        });
    }
}

Vidilly.insert();