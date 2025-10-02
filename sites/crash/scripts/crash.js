class Crash {
    constructor() {
        this.COUNTDOWN_MAX = 10.0;
        this.DEFAULT_BALANCE = 1000;
        this.DEFAULT_CRASH = 1.00;
        // this.COIN_GENERATION_RATE = 1000 * 30;
        this.crash = this.DEFAULT_CRASH;
        this.countdown = null;
        this.countdownTime = this.COUNTDOWN_MAX;
        this.currentWager = 0;
        this.eAdd = document.querySelector('#add');
        this.eBalance = document.querySelector('#balance');
        this.eCashout = document.querySelector('#cashout');
        this.eCointainerDiv = document.querySelector('#cointainer div');
        this.eCountdown = document.querySelector('#countdown');
        this.eCustom = document.querySelector('#custom input[type=number]');
        this.eMulti = document.querySelector('#multi');
        this.eMultiN = document.querySelector('#multi span');
        this.eMyWager = document.querySelector('#my-wager');
        this.eTime = document.querySelector('#time');
        this.eWager = document.querySelector('#wager');
        this.generator = null;
        this.playing = false;
    }

    // dec2hex :: Integer -> String
    // i.e. 0-255 -> '00'-'ff'
    dec2hex(dec) {
        return dec.toString(16).padStart(2, "0");
    }
    // generateId :: Integer -> String
    generateId(len) {
        var arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, this.dec2hex).join('');
    }

    init() {
        this.setDefaultBalance();
        this.createWagerButtons();
        setTimeout(() => {
            this.startCountdown();
        }, 500);
    }

    setDefaultBalance() {
        this.eBalance.textContent = this.DEFAULT_BALANCE;
    }
    createWagerButtons() {
        var amounts = [100, 25, 5, 1];
        amounts.forEach(n => {
            let ba = document.createElement('button');
            ba.textContent = `+${n}`;
            ba.setAttribute('onclick', `CRASH.wager(${n})`);
            this.eAdd.prepend(ba);
        });
    }

    getBalance() {
        return parseInt(this.eBalance.textContent);
    }

    clearWager() {
        this.eMyWager.textContent = '0';
    }
    wager(amount) {
        var nv = parseInt(this.eMyWager.textContent) + amount;
        if (this.isValidWager(nv)) {
            this.eMyWager.textContent = `${nv}`;
        } else {
            this.eMyWager.textContent = this.getBalance();
        }
    }
    wagerCustom() {
        if (!isNaN(parseInt(this.eCustom.value))) {
            var nv = parseInt(this.eMyWager.textContent) + parseInt(this.eCustom.value);
            if (this.isValidWager(nv)) {
                this.eMyWager.textContent = `${parseInt(this.eMyWager.textContent) + parseInt(this.eCustom.value)}`;
            } else {
                this.eMyWager.textContent = this.getBalance();
            }
        } else {
            this.eCustom.value = '0';
        }
    }
    validateCustomWager(ev) {
        var charCode = (ev.which) ? ev.which : ev.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
        if (parseInt(ev.currentTarget.value) > parseInt(this.eBalance.textContent)) {
            ev.currentTarget.value = this.eBalance.textContent;
            return false;
        }
        return true;
    }
    isValidWager(value) {
        return (value > this.getBalance()) ? false : true;
    }

    startCountdown() {
        this.countdown = setInterval(() => {
            this.countdownTime -= 0.1;
            this.eTime.textContent = this.countdownTime.toFixed(1);
            if (this.countdownTime <= 0.1) {
                clearInterval(this.countdown);
                this.countdownTime = this.COUNTDOWN_MAX;
                this.playCrash();
            }
        }, 100);
    }
    playCrash() {
        this.toggleWagerHide();
        this.toggleCountdownHide();

        this.currentWager = parseInt(this.eMyWager.textContent);
        // if (this.currentWager <= 0) {
        //     setTimeout(() => {
        //         this.toggleWagerHide();
        //         this.toggleCountdownHide();
        //         this.startCountdown();
        //     }, 500);
        //     return;
        // }
        this.eBalance.textContent = this.eBalance.textContent - this.currentWager;

        var hash = this.generateId(64).toString();
        var h = parseInt(hash.slice(0, 52 / 4), 16);
        var e = Math.pow(2, 52);
        const result = (100 * e - h) / (e - h);
        const INSTANT_CRASH_PERCENTAGE = 5.00;
        const houseEdgeModifier = 1 - INSTANT_CRASH_PERCENTAGE / 100;
        const endResult = (Math.max(100, result * houseEdgeModifier) / 100).toFixed(2);

        if (this.currentWager > 0) {
            this.playing = true;
            this.toggleCashoutShow();
        }
        this.toggleMultiBreathe();
        this.session = setInterval(() => {
            if (this.crash >= endResult) {
                clearInterval(this.session);
                if (this.playing) this.toggleCashoutShow();
                this.playing = false;
                this.eMultiN.textContent = `x${parseFloat(endResult).toFixed(2)}`;
                this.endCrash();
            } else {
                this.crash += (this.crash * 0.000777); // speed
                this.eMultiN.textContent = `x${this.crash.toFixed(2)}`;
            }
        }, 1);
    }
    endCrash() {
        this.playAudioEXPLOSION();
        this.toggleMultiCrashed();
        setTimeout(() => {
            this.resetCrash();
        }, 3000);
        this.toggleMultiBreathe();
        this.clearWager();
        this.toggleWagerHide();
        this.toggleCountdownHide();
        this.startCountdown();
    }
    resetCrash() {
        this.toggleMultiCrashed();
        this.crash = this.DEFAULT_CRASH;
    }

    cashOut() {
        this.playing = false;
        this.toggleCashoutShow();
        this.toggleCointainerWin();
        var nb = parseInt(this.currentWager * this.crash);
        this.eBalance.textContent = parseInt(this.eBalance.textContent) + nb;
        setTimeout(() => {
            this.toggleCointainerWin();
        }, 3000);
    }

    toggleCountdownHide() {
        this.eCountdown.classList.toggle('hide');
    }
    toggleMultiBreathe() {
        this.eMulti.classList.toggle('breathe');
    }
    toggleMultiCrashed() {
        this.eMulti.classList.toggle('crashed');
    }
    toggleCashoutShow() {
        this.eCashout.classList.toggle('show');
    }
    toggleWagerHide() {
        this.eWager.classList.toggle('hide');
    }
    toggleCointainerWin() {
        this.eCointainerDiv.classList.toggle('win');
    }
    toggleCointainerLose() {
        this.eCointainerDiv.classList.toggle('lose');
    }

    playAudioEXPLOSION() {
        var EXPLOSION = new Audio();
        EXPLOSION.src = "sound/explosion.wav";
        EXPLOSION.volume = 0.05;
        EXPLOSION.play();
    }

    // generateCoins() {
    //     this.generator = setInterval(() => {
    //         this.eBalance.textContent = parseInt(this.eBalance.textContent) + 1;
    //     }, this.COIN_GENERATION_RATE);
    // }
}

const CRASH = new Crash();
CRASH.init();