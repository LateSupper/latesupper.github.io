class EXPGenerator {
    constructor() {
        this.DOCUMENT = window.self.document;
        this.OPTS = {
            maxlevel: {
                element: 'input',
                type: 'text',
                label: 'Max Level',
                flex: 'column',
                default: 100
            },
            basexp: {
                element: 'input',
                type: 'text',
                label: 'Initial EXP',
                flex: 'column',
                default: 50
            },
            multi: {
                element: 'input',
                type: 'text',
                label: 'Per Level Multiplier',
                flex: 'column',
                default: 1.1
            },
            rounded: {
                element: 'input',
                type: 'checkbox',
                label: 'Round EXP (No Decimals)',
                flex: 'row',
                checked: true
            },
            delimit: {
                element: 'input',
                type: 'checkbox',
                label: 'Include Delimiter (,)',
                flex: 'row',
                checked: true
            }
        };
        this.ELEMENTS = {};
        this.EXPORT = this.DOCUMENT.querySelector('#export');
        this.EXPORT_JSON = this.DOCUMENT.querySelector('#export-json');
        this.EXPTABLE = this.DOCUMENT.querySelector('#exptable tbody');
        this.CURRENT = null;
    }

    initControls() {
        const TARGET = this.DOCUMENT.querySelector('#options');
        const CLS = 'options-set';
        const ID_ATTRIBUTES = ['id', 'name'];

        for (const option in this.OPTS) {
            var parent = this.DOCUMENT.createElement('div');
            parent.classList.add(CLS);
            parent.setAttribute('style', `flex-direction: ${this.OPTS[option].flex};`);

            var label = this.DOCUMENT.createElement('label');
            label.setAttribute('for', option);
            label.textContent = this.OPTS[option].label;

            var el = this.DOCUMENT.createElement(this.OPTS[option].element);
            ID_ATTRIBUTES.forEach(attribute => {
                el.setAttribute(attribute, option);
            });
            el.setAttribute('type', this.OPTS[option].type);
            if (this.OPTS[option].default) {
                el.setAttribute('value', this.OPTS[option].default);
            }

            if (this.OPTS[option].type == 'checkbox') {
                el.checked = this.OPTS[option].checked;
            }

            parent.appendChild(label);
            parent.appendChild(el);

            TARGET.appendChild(parent);

            this.ELEMENTS[option] = el;
        }

        var generateButton = this.DOCUMENT.createElement('button');
        generateButton.id = 'generate';
        generateButton.setAttribute('type', 'button');
        generateButton.textContent = "Generate";
        generateButton.addEventListener('click', () => {
            this.generate();
        });
        TARGET.appendChild(generateButton);
    }

    delimitNumber(n) {
        var nString = n.toString().split('.');
        var delimits = [];
        var segment = '';
        for (let i = nString[0].length - 1; i > -1; i--) {
            segment = nString[0][i] + segment;
            if (segment.length === 3 || i === 0) {
                delimits.push(segment);
                segment = '';
            }
        }
        return delimits.reverse().join(',') + (nString.length > 1 ? '.' + nString[1] : '');
    }
    
    generate() {
        if (this.EXPTABLE.hasChildNodes()) {
            this.EXPTABLE.innerHTML = '';
        }

        const MAXLEVEL = parseInt(this.ELEMENTS.maxlevel.value);
        const BASEXP = parseInt(this.ELEMENTS.basexp.value);
        const MULTI = parseFloat(this.ELEMENTS.multi.value);
        const ROUNDED = this.ELEMENTS.rounded.checked;
        const DELIMITED = this.ELEMENTS.delimit.checked;
        
        var expTable = {};
        for (let i = 1; i < MAXLEVEL + 1; i++) {
            if (i === 1) {
                expTable[i] = {
                    expRequired: BASEXP,
                    expTotal: 0
                };
            } else {
                var xpReq = ROUNDED ? Math.floor(expTable[i - 1].expRequired * MULTI) : expTable[i - 1].expRequired * MULTI;
                expTable[i] = {
                    expRequired: xpReq,
                    expTotal: expTable[i - 1].expRequired + expTable[i - 1].expTotal
                };
            }
        }
        this.CURRENT = expTable;

        for (const level in expTable) {
            this.EXPTABLE.insertAdjacentHTML('beforeend',
                `<tr>
                    <td>${DELIMITED ? this.delimitNumber(level) : level}</td>
                    <td>${DELIMITED ? this.delimitNumber(expTable[level].expTotal) : expTable[level].expTotal}</td>
                    <td>${DELIMITED ? this.delimitNumber(expTable[level].expRequired): expTable[level].expRequired}</td>
                </tr>`
            );
        }

        if (!this.EXPORT.hasAttribute('style')) {
            this.EXPORT.setAttribute('style', 'display: block;');
            this.EXPORT.addEventListener('click', () => {
                this.export();
            });
        }
    }

    export() {
        const currentExpTable = JSON.stringify(this.CURRENT, undefined, 4);
        navigator.clipboard.writeText(currentExpTable);
        window.self.alert('Exported JSON copied!');
    }
}

const EXPGEN = new EXPGenerator();
EXPGEN.initControls();