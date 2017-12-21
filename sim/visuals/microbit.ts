namespace pxsim.visuals {
     const MB_STYLE = `
        svg.sim {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: block;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button {
            pointer-events: none;
        }

        .sim-button-outer:hover {
            stroke:grey;
            stroke-width: 3px;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
        .sim-pin:hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }

        .sim-pin-touch.touched:hover {
            stroke:darkorange;
        }

        .sim-led-back:hover {
            stroke:#a0a0a0;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }

        .sim-light-level-button {
            stroke:#fff;
            stroke-width: 3px;
        }

        .sim-antenna {
            stroke:#555;
            stroke-width: 2px;
        }

        .sim-text {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:25px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-text-pin {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:20px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 3px;
        }

        /* animations */
        .sim-theme-glow {
            animation-name: sim-theme-glow-animation;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
        }
        @keyframes sim-theme-glow-animation {
            from { opacity: 1; }
            to   { opacity: 0.75; }
        }

        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
       
        sim-board {
            stroke-width: 2px;
            fill: #4D90FE;
        }

        *:focus {
            outline: none;
        }
        *:focus .sim-button-outer,
        .sim-pin:focus,
        .sim-thermometer:focus,
        .sim-shake:focus,
        .sim-light-level-button:focus {
            stroke: #4D90FE;
            stroke-width: 5px !important;
        }
        .sim-bg {
            stroke-width: 2px;
            fill: #F00000;
            stroke: #9A916C;
          
        }
        .no-drag, .sim-text, .sim-text-pin {
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
    `;
    const MB_HIGHCONTRAST = `
.sim-led {
    stroke: red;
}
*:focus .sim-button-outer,
.sim-pin:focus,
.sim-thermometer:focus,
.sim-shake:focus,
.sim-light-level-button:focus {
    stroke: #10C8CD !important;
}
    `
    
   
    const pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6, 188.9, 201.3, 213.6, 275.2, 287.5, 299.8, 312.1, 324.5, 385.1, 397.4, 409.7, 422];
    const pins4onMids = pins4onXs.map(x => x + 5);
    const littlePinDist = pins4onMids[1] - pins4onMids[0];
    const bigPinWidth = pins4onMids[4] - pins4onMids[3];
    const pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
    const pin3mid = pin0mid - bigPinWidth / 2.0;
    const pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
    const pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
    const pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
    const pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
    const pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = [
        "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
        "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"];
    const pinTitles = [
        "P0, ANALOG IN",
        "P1, ANALOG IN",
        "P2, ANALOG IN",
        "P3, ANALOG IN, LED Col 1",
        "P4, ANALOG IN, LED Col 2",
        "P5, BUTTON A",
        "P6, LED Col 9",
        "P7, LED Col 8",
        "P8",
        "P9, LED Col 7",
        "P10, ANALOG IN, LED Col 3",
        "P11, BUTTON B",
        "P12, RESERVED ACCESSIBILITY",
        "P13, SPI - SCK",
        "P14, SPI - MISO",
        "P15, SPI - MOSI",
        "P16, SPI - Chip Select",
        "P17, +3v3",
        "P18, +3v3",
        "P19, I2C - SCL",
        "P20, I2C - SDA",
        "GND", "GND", "+3v3", "GND"
    ];
    const MB_WIDTH = 500;
    const MB_HEIGHT = 408;
    export interface IBoardTheme {
        highContrast?: boolean;
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUp?: string;
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE", "#FFD43A", "#3AFFB3", "#FF3A54"].map(accent => {
        return {
            accent: accent,
            display: "#000",
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7f7f",
            ledOff: "#202020",
            buttonOuter: "#979797",
            buttonUp: "#000",
            buttonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "yellow",
            lightLevelOff: "#555"
        }
    });

    export function randomTheme(highContrast?: boolean): IBoardTheme {
        let theme = themes[Math.floor(Math.random() * themes.length)];
        if (highContrast) {
            theme = JSON.parse(JSON.stringify(theme)) as IBoardTheme;
            theme.highContrast = true;
            theme.ledOff = "#888";
            theme.ledOn = "#0000bb";
            theme.display = "#ffffff";
            theme.pin = "#D4AF37";
            theme.accent = "#273EE2";
        }
        return theme;
    }

    export interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
        wireframe?: boolean;
    }

    export class MicrobitBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;

        private logos: SVGElement[];
        private head: SVGGElement; private headInitialized = false;
        private headText: SVGTextElement;
        private display: SVGElement;
        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        private buttonABText: SVGTextElement;
        private pins: SVGElement[];
        private pinGradients: SVGLinearGradientElement[];
        private pinTexts: SVGTextElement[];
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private systemLed: SVGCircleElement;
        private antenna: SVGPolylineElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerText: SVGTextElement;
        private shakeButton: SVGCircleElement;
        private shakeText: SVGTextElement;
        public board: pxsim.DalBoard;
        private pinNmToCoord: Map<Coord> = {};

        constructor(public props: IBoardProps) {
            this.recordPinCoords();
            this.buildDom();
            if (props && props.wireframe)
                svg.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
                this.attachEvents();
            }
        }

        public getView(): SVGAndSize<SVGSVGElement> {
            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            return this.pinNmToCoord[pinNm];
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return littlePinDist * 1.7;
        }

        public recordPinCoords() {
            const pinsY = 356.7 + 40;
            pinNames.forEach((nm, i) => {
                let x = pinMids[i];
                this.pinNmToCoord[nm] = [x, pinsY];
            });
        }

        private updateTheme() {
            let theme = this.props.theme;

            //svg.fill(this.display, theme.display);
            
            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
            svg.fills(this.buttons.slice(0, 2), theme.buttonUp);
            svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
            svg.fill(this.buttons[2], theme.virtualButtonUp);
            svg.fills(this.logos, theme.accent);
            if (this.shakeButton) svg.fill(this.shakeButton, theme.virtualButtonUp);

            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
            svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);

            svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
        }

        public updateState() {
            let state = this.board;
            if (!state) return;
            let theme = this.props.theme;

            let bpState = state.buttonPairState;
            let buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            buttons.forEach((btn, index) => {
                svg.fill(this.buttons[index], btn.pressed ? theme.buttonDown : theme.buttonUp);
            });

            if (state.ledMatrixState.disabled) {
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStylable><any>led)
                    sel.style.opacity = "0";
                })
            } else {
                const bw = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw
                const img = state.ledMatrixState.image;
                const br = state.ledMatrixState.brigthness != undefined ? state.ledMatrixState.brigthness : 255;
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStylable><any>led)
                    let imgbr = bw ? (img.data[i] > 0 ? br : 0) : img.data[i];
                    // correct brightness
                    const opacity = imgbr > 0 ? imgbr / 255 * 155 + 100 : 0;
                    const transfrom = imgbr > 0 ? imgbr / 255 * 0.4 + 0.6 : 0;
                    sel.style.opacity = (opacity / 255) + "";
                    if (transfrom > 0) {
                        sel.style.transformOrigin = '50% 50%';
                        sel.style.transform = `scale(${transfrom})`;
                    }
                })
            }
            this.updatePins();
            this.updateTilt();
            this.updateHeading();
            this.updateLightLevel();
            this.updateTemperature();
            this.updateButtonAB();
            this.updateGestures();

            if (!runtime || runtime.dead) svg.addClass(this.element, "grayscale");
            else svg.removeClass(this.element, "grayscale");
        }

        private updateGestures() {
            let state = this.board;
            if (state.accelerometerState.useShake && !this.shakeButton) {
                this.shakeButton = svg.child(this.g, "circle", { cx: 380, cy: 100, r: 16.5, class: "sim-shake" }) as SVGCircleElement;
                accessibility.makeFocusable(this.shakeButton);
                svg.fill(this.shakeButton, this.props.theme.virtualButtonUp)
                this.shakeButton.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.buttonDown);
                })
                this.shakeButton.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                })
                this.shakeButton.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    svg.fill(this.shakeButton, this.props.theme.virtualButtonUp);
                    this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, 11); // GESTURE_SHAKE
                })
                accessibility.enableKeyboardInteraction(this.shakeButton, undefined, () => {
                    this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, 11);
                });
                accessibility.setAria(this.shakeButton, "button", "Shake the board");
                this.shakeText = svg.child(this.g, "text", { x: 400, y: 110, class: "sim-text" }) as SVGTextElement;
                this.shakeText.textContent = "SHAKE"
            }
        }

        private updateButtonAB() {
            let state = this.board;
            if (state.buttonPairState.usesButtonAB && !this.buttonABText) {
                (<any>this.buttonsOuter[2]).style.visibility = "visible";
                (<any>this.buttons[2]).style.visibility = "visible";
                this.buttonABText = svg.child(this.g, "text", { class: "sim-text", x: 370, y: 272 }) as SVGTextElement;
                this.buttonABText.textContent = "A+B";
                this.updateTheme();
            }
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;
            let text = this.pinTexts[index];
            let v = "";
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "1" : "0";
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = "";
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index], v);

            if (pin.mode !== PinFlags.Unused) {
                accessibility.makeFocusable(this.pins[index]);
                accessibility.setAria(this.pins[index], "slider", this.pins[index].firstChild.textContent);
                this.pins[index].setAttribute("aria-valuemin", "0");
                this.pins[index].setAttribute("aria-valuemax", pin.mode & PinFlags.Analog ? "1023" : "100");
                this.pins[index].setAttribute("aria-orientation", "vertical");
                this.pins[index].setAttribute("aria-valuenow", text ? text.textContent : v);
                accessibility.setLiveContent(text ? text.textContent : v);
            }
        }

        private updateTemperature() {
            let state = this.board;
            if (!state || !state.thermometerState.usesTemperature) return;

            let tmin = -5;
            let tmax = 50;
            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(this.defs, gid);
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer no-drag",
                    x: 120,
                    y: 110,
                    width: 20,
                    height: 160,
                    rx: 5, ry: 5,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130 }) as SVGTextElement;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (260 - cur.y) / 140))
                        state.thermometerState.temperature = Math.floor(tmin + t * (tmax - tmin));
                        this.updateTemperature();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            state.thermometerState.temperature--;
                            if (state.thermometerState.temperature < -5) {
                                state.thermometerState.temperature = 50;
                            }
                            this.updateTemperature();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            state.thermometerState.temperature++;
                            if (state.thermometerState.temperature > 50) {
                                state.thermometerState.temperature = -5;
                            }
                            this.updateTemperature();
                        }
                    })

                accessibility.makeFocusable(this.thermometer);
                accessibility.setAria(this.thermometer, "slider", "Thermometer");
                this.thermometer.setAttribute("aria-valuemin", "-5");
                this.thermometer.setAttribute("aria-valuemax", "50");
                this.thermometer.setAttribute("aria-orientation", "vertical");
                this.thermometer.setAttribute("aria-valuenow", "21");
                this.thermometer.setAttribute("aria-valuetext", "21°C");
            }

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature))
            let per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
            this.thermometerText.textContent = t + "°C";
            this.thermometer.setAttribute("aria-valuenow", t.toString());
            this.thermometer.setAttribute("aria-valuetext", t + "°C");
            accessibility.setLiveContent(t + "°C");
        }

        private updateHeading() {
            let xc = 258;
            let yc = 75;
            let state = this.board;
            if (!state || !state.compassState.usesHeading) return;
            if (!this.headInitialized) {
                let p = this.head.firstChild.nextSibling as SVGPathElement;
                p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                this.updateTheme();
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(
                    this.head,
                    (ev: MouseEvent) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        state.compassState.heading = Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI + 90);
                        if (state.compassState.heading < 0) state.compassState.heading += 360;
                        this.updateHeading();
                    });
                this.headInitialized = true;
            }

            let txt = state.compassState.heading.toString() + "°";
            if (txt != this.headText.textContent) {
                svg.rotateElement(this.head, xc, yc, state.compassState.heading + 180);
                this.headText.textContent = txt;
            }
        }

        private lastFlashTime: number = 0;
        public flashSystemLed() {
            if (!this.systemLed)
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 300, cy: 20, r: 5 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private lastAntennaFlash: number = 0;
        public flashAntenna() {
            if (!this.antenna) {
                let ax = 380;
                let dax = 18;
                let ayt = 10;
                let ayb = 40;
                this.antenna = <SVGPolylineElement>svg.child(this.g, "polyline", { class: "sim-antenna", points: `${ax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt}` })
            }
            let now = Date.now();
            if (now - this.lastAntennaFlash > 200) {
                this.lastAntennaFlash = now;
                svg.animate(this.antenna, 'sim-flash-stroke')
            }
        }

        private updatePins() {
            let state = this.board;
            if (!state) return;

          //  state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
        }

        private updateLightLevel() {
            let state = this.board;
            if (!state || !state.lightSensorState.usesLightLevel) return;

            if (!this.lightLevelButton) {
                let gid = "gradient-light-level";
                this.lightLevelGradient = svg.linearGradient(this.defs, gid)
                let cy = 50;
                let r = 35;
                this.lightLevelButton = svg.child(this.g, "circle", {
                    cx: `50px`, cy: `${cy}px`, r: `${r}px`,
                    class: 'sim-light-level-button no-drag',
                    fill: `url(#${gid})`
                }) as SVGCircleElement;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.lightLevelButton,
                    // move
                    (ev) => {
                        let pos = svg.cursorPoint(pt, this.element, ev);
                        let rs = r / 2;
                        let level = Math.max(0, Math.min(255, Math.floor((pos.y - (cy - rs)) / (2 * rs) * 255)));
                        if (level != this.board.lightSensorState.lightLevel) {
                            this.board.lightSensorState.lightLevel = level;
                            this.applyLightLevel();
                        }
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            this.board.lightSensorState.lightLevel--;
                            if (this.board.lightSensorState.lightLevel < 0) {
                                this.board.lightSensorState.lightLevel = 255;
                            }
                            this.applyLightLevel();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            this.board.lightSensorState.lightLevel++;
                            if (this.board.lightSensorState.lightLevel > 255) {
                                this.board.lightSensorState.lightLevel = 0;
                            }
                            this.applyLightLevel();
                        }
                    });
                this.lightLevelText = svg.child(this.g, "text", { x: 85, y: cy + r - 5, text: '', class: 'sim-text' }) as SVGTextElement;
                this.updateTheme();

                accessibility.makeFocusable(this.lightLevelButton);
                accessibility.setAria(this.lightLevelButton, "slider", "Light level");
                this.lightLevelButton.setAttribute("aria-valuemin", "0");
                this.lightLevelButton.setAttribute("aria-valuemax", "255");
                this.lightLevelButton.setAttribute("aria-orientation", "vertical");
                this.lightLevelButton.setAttribute("aria-valuenow", "128");
            }

            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(state.lightSensorState.lightLevel * 100 / 255))) + '%')
            this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
        }

        private applyLightLevel() {
            let lv = this.board.lightSensorState.lightLevel;
            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor(lv * 100 / 255))) + '%')
            this.lightLevelText.textContent = lv.toString();
            this.lightLevelButton.setAttribute("aria-valuenow", lv.toString());
            accessibility.setLiveContent(lv.toString());
        }

        private updateTilt() {
            if (this.props.disableTilt) return;
            const state = this.board;
            if (!state || !state.accelerometerState.accelerometer.isActive) return;

            const x = state.accelerometerState.accelerometer.getX();
            const y = -state.accelerometerState.accelerometer.getY();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);

            this.element.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            this.element.style.perspectiveOrigin = "50% 50% 50%";
            this.element.style.perspective = "30em";
        }

        private buildDom() {
            this.element = <SVGSVGElement>svg.elt("svg")
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE + (this.props.theme.highContrast ? MB_HIGHCONTRAST : "");

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let ledglow = svg.child(this.defs, "filter", { id: "ledglow", x: "-75%", y: "-75%", width: "300%", height: "300%" });
            svg.child(ledglow, "feMorphology", { operator: "dilate", radius: "4", in: "SourceAlpha", result: "thicken"});
            svg.child(ledglow, "feGaussianBlur", { stdDeviation: "5", in: "thicken", result: "blurred"});
            svg.child(ledglow, "feFlood", { "flood-color": "rgb(255, 17, 77)", result: "glowColor"});
            svg.child(ledglow, "feComposite", { in: "glowColor", in2: "blurred", operator: "in", result: "ledglow_colored"});
            let ledglowMerge = svg.child(ledglow, "feMerge", {});
            svg.child(ledglowMerge, "feMergeNode", { in: "ledglow_colored"});
            svg.child(ledglowMerge, "feMergeNode", { in: "SourceGraphic"});

            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            // outline

          this.display=  svg.path(this.g, "sim-bg", "M74.8159,3.55419A6.12,6.12,0,0,1,79.141,1.76372L182.07,1.76372A6.12,6.12,0,0,1,186.402,3.56026L259.14,76.4345A6.12,6.12,0,0,1,260.928,80.7581L260.928"+
                                            ",184.141A5.04,5.04,0,0,1,259.453,187.703L186.185,261.041A6.12,6.12,0,0,1,181.855,262.836L78.9307,262.836A6.12001,6.12001,0,0,1,74.5985,261.039L1.78843"+
                                            ",188.091A6.12,6.12,0,0,1,0,183.768L0,80.8366A6.12,6.12,0,0,1,1.79454,76.5072L74.8159,3.55419M209.574,39.7296a1.13386,1.13386,0,1,0,2.26772,0,1.13386,"+
                                            "1.13386,0,1,0,-2.26772,0zM213.583,43.7384a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM217.591,47.7472a1.13386,1.13386,0,1,0,"+
                                            "2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM221.6,51.756a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM35.7219,53.7327a1.13386,"+
                                            "1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM39.7307,49.724a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM43.7394,"+
                                            "45.7152a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM47.7482,41.7064a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,"+
                                            "-2.26772,0zM86.058,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM93.258,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,"+
                                            "1.13386,0,1,0,-2.26772,0zM100.458,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM107.658,223.308a1.13386,1.13386,0,1,0,2.26772,"+
                                            "0,1.13386,1.13386,0,1,0,-2.26772,0zM114.858,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM122.058,223.308a1.13386,1.13386,"+
                                            "0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM129.258,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM136.458,"+
                                            "223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM143.658,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,"+
                                            "-2.26772,0zM150.858,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM158.058,223.308a1.13386,1.13386,0,1,0,2.26772,"+
                                            "0,1.13386,1.13386,0,1,0,-2.26772,0zM165.258,223.308a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM172.458,223.308a1.13386,"+
                                            "1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM172.458,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM165.258,"+
                                            "230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM158.058,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,"+
                                            "-2.26772,0zM150.858,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM143.658,230.508a1.13386,1.13386,0,1,0,2.26772,0,"+
                                            "1.13386,1.13386,0,1,0,-2.26772,0zM136.458,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM129.258,230.508a1.13386,1.13386,"+
                                            "0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM122.058,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM114.858,"+
                                            "230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM107.658,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,"+
                                            "0,-2.26772,0zM100.458,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM93.258,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,"+
                                            "1.13386,0,1,0,-2.26772,0zM86.058,230.508a1.13386,1.13386,0,1,0,2.26772,0,1.13386,1.13386,0,1,0,-2.26772,0zM245.304,182.385a6.48,6.48,0,1,0,12.96,0,6.48,"+
                                            "6.48,0,1,0,-12.96,0zM245.304,81.972a6.48,6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,0zM174.348,10.8318a6.48,6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,"+
                                            "0zM2.664,82.044a6.48,6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,0zM2.664,182.556a6.48,6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,0zM73.656,253.692a6.48,"+
                                            "6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,0zM174.069,253.763a6.48,6.48,0,1,0,12.96,0,6.48,6.48,0,1,0,-12.96,0zM73.872,10.8318a6.48,6.48,0,1,0,12.96,0,"+
                                            "6.48,6.48,0,1,0,-12.96,0z");
            // script background
            this.display = svg.path(this.g, "sim-display", "M333.8,310.3H165.9c-8.3,0-15-6.7-15-15V127.5c0-8.3,6.7-15,15-15h167.8c8.3,0,15,6.7,15,15v167.8C348.8,303.6,342.1,310.3,333.8,310.3z");
         
      //   this.display.style.transformOrigin = '0  0';
      //   this.display.style.transform = `scale(${1.6})`;
           
            this.logos = [];

            // leds
            this.leds = [];
            this.ledsOuter = [];
            let left = 106, top = 100, ledoffw = 18, ledoffh = 19;
            for (let i = 0; i < 12; ++i) {
                let ledtop = i * ledoffh + top;
                for (let j = 0; j < 12; ++j) {
                    let ledleft = j * ledoffw + left;
                    let k = i * 12 + j;
                    this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: 12, height: 8, rx: 2, ry: 2 }));
                    let led = svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 2, y: ledtop - 2, width: 14, height: 10, rx: 3, ry: 3, title: `(${j},${i})` });
                    svg.filter(led, `url(#ledglow)`)
                    this.leds.push(led);
                }
            }

            // head
            this.head = <SVGGElement>svg.child(this.g, "g", { class: "sim-head no-drag" });
          //  svg.child(this.head, "circle", { cx: 258, cy: 75, r: 100, fill: "transparent" })
         //   this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M269.9,50.2L269.9,50.2l-39.5,0v0c-14.1,0.1-24.6,10.7-24.6,24.8c0,13.9,10.4,24.4,24.3,24.7v0h39.6c14.2,0,24.8-10.6,24.8-24.7C294.5,61,284,50.3,269.9,50.2 M269.7,89.2L269.7,89.2l-39.3,0c-7.7-0.1-14-6.4-14-14.2c0-7.8,6.4-14.2,14.2-14.2h39.1c7.8,0,14.2,6.4,14.2,14.2C283.9,82.9,277.5,89.2,269.7,89.2"));
         //   this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
         //   this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
           // this.headText = <SVGTextElement>svg.child(this.g, "text", { x: 310, y: 100, class: "sim-text" })

            // https://www.microbit.co.uk/device/pins
            // P0, P1, P2
           /*
            this.pins = [
                "M16.5,341.2c0,0.4-0.1,0.9-0.1,1.3v60.7c4.1,1.7,8.6,2.7,12.9,2.7h34.4v-64.7h0.3c0,0,0-0.1,0-0.1c0-13-10.6-23.6-23.7-23.6C27.2,317.6,16.5,328.1,16.5,341.2z M21.2,341.6c0-10.7,8.7-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3c0,10.7-8.6,19.3-19.3,19.3C29.9,360.9,21.2,352.2,21.2,341.6z",
                "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z",
                "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h46.2v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z"
            ].map((p, pi) => svg.path(this.g, "sim-pin sim-pin-touch", p));
*/
this.pins= [];

            // P3
            /*
            this.pins.push(svg.path(this.g, "sim-pin", "M0,357.7v19.2c0,10.8,6.2,20.2,14.4,25.2v-44.4H0z"));
*/
            pins4onXs.forEach(x => {
                this.pins.push(svg.child(this.g, "rect", { x: x, y: 356.7, width: 10, height: 50, class: "sim-pin" }));
            })
 
            
/*
            this.pins.push(svg.path(this.g, "sim-pin", "M483.6,402c8.2-5,14.4-14.4,14.4-25.1v-19.2h-14.4V402z"));
            this.pins.push(svg.path(this.g, "sim-pin", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406H383v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z"));
            this.pins.push(svg.path(this.g, "sim-pin", "M458,317.6c-13,0-23.6,10.6-23.6,23.6c0,0,0,0.1,0,0.1h0V406H469c4.3,0,8.4-1,12.6-2.7v-60.7c0-0.4,0-0.9,0-1.3C481.6,328.1,471,317.6,458,317.6z M457.8,360.9c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C477.1,352.2,468.4,360.9,457.8,360.9z"));

            this.pins.forEach((p, i) => svg.hydrate(p, { title: pinTitles[i] }));
*/
           this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            })

            this.pinTexts = [67, 165, 275].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: x, y: 345 }));

//    let b = svg.child(this.g, "g", { class: "sim-button-group" });
 //   b.innerHTML += svbg;

            let usbtop = svg.child(this.g, "g", { class: "sim-button-group" });
          usbtop.innerHTML+=
         ' <g xmlns="http://www.w3.org/2000/svg" id="47642-0001" transform="matrix(1, 0, 0, 1, 121.717, 4.2692)">'+
         ' <g transform="matrix(-1, 0, 0, -1, 22.677, 16.654)" id="g20031">'+
          '  <g id="g20033">'+
            '    <rect width="22.677" y="7.157" x="0" fill="#B4B4B4" height="3.969" id="rect20035"/>'+
             '   <rect width="0.567" x="11.055" fill="#DCDCDC" height="3.402" id="rect20037"/>'+
             '   <rect width="0.567" y="0" x="12.898" fill="#DCDCDC" height="3.402" id="rect20039"/>'+
             '   <rect width="0.567" y="0" x="14.74" fill="#DCDCDC" height="3.402" id="rect20041"/>'+
             '   <rect width="0.567" y="0" x="9.21298" fill="#DCDCDC" height="3.402" id="rect20043"/>'+
              '  <rect width="0.567" y="0" x="7.36999" fill="#DCDCDC" height="3.402" id="rect20045"/>'+
             '   <rect width="14.173" y="1.489" x="4.252" fill="#B4B4B4" height="0.709" id="rect20047"/>'+
             '   <rect width="14.173" y="1.771" x="4.252" height="2.976" id="rect20049"/>'+
             '   <polygon fill="#DCDCDC" points="17.008,1.347,17.008,3.473,14.74,3.473,14.74,4.182,13.323,4.182,13.323,1.63,9.35402,1.63,9.35402,4.182,7.93699,4.182,7.93699,3.473,5.669,3.473,5.669,1.347,0.567,1.347,0.567,14.953,22.11,14.953,22.11,1.347" id="polygon20051"/>'+
             '   <polygon points="5.811,12.119,3.827,12.119,4.11,7.86701,5.527,7.86701" id="polygon20053"/>'+
             '   <polygon points="18.85,12.119,16.866,12.119,17.149,7.86701,18.567,7.86701" id="polygon20055"/>'+
             '   <polygon fill="#F0F0F0" points="20.976,16.654,1.701,16.653,1.134,14.953,21.543,14.953" id="polygon20057"/>'+
             '   <polygon fill="#B4B4B4" points="0.567,16.653,0,16.653,0.567,14.953,1.134,14.953" id="polygon20059"/>'+
             '   <polygon fill="#B4B4B4" points="22.677,16.654,22.11,16.654,21.543,14.953,22.11,14.953" id="polygon20061"/>'+
            ' </g>'
            ' </g>'
          ' </g>'
            this.buttonsOuter = []; this.buttons = [];



            const outerBtn = (left: number, top: number, label: string,index:number) => {
                const btnr = 4;
                const btnw = 56.2;
                const btnn = 6;
                const btnnm = 10
                let btng = svg.child(this.g, "g", { class: "sim-button-group" });

                accessibility.makeFocusable(btng);
                accessibility.setAria(btng, "button", label);
                this.buttonsOuter.push(btng);
              
             //   btng.innerHTML +=  '<g xmlns="http://www.w3.org/2000/svg" id="g19978" transform="matrix(1.20493, 0, 0, 1.20507, 0, -4.35976)">'+
                let btn = [
                    '<g xmlns="http://www.w3.org/2000/svg" id="g19968" transform="matrix(1, 0, 0, 1, 26.9942, 103.631)">'+
                    '<g transform="matrix(0, 1, -1, 0, 17.008, 0)" id="g19970">'+
                        '<g xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" i:extraneous="self" id="g19974">'+
                          '<sodipodi:namedview xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" bordercolor="#666666" guidetolerance="10" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:document-units="mm" fit-margin-left="0" showgrid="false" inkscape:current-layer="Ebene_1" window-width="1745" cx="-10.948433" inkscape:window-x="0" id="namedview19976" gridtolerance="10" fit-margin-right="0" borderopacity="1" objecttolerance="10" zoom="9.9966114" inkscape:window-height="650" window-maximized="0" inkscape:cy="13.840712" inkscape:pageopacity="0" fit-margin-bottom="0" window-y="0" fit-margin-top="0" pageshadow="2" units="mm" pagecolor="#ffffff"/>'+
                          '<g id="g19978" transform="matrix(1.20493, 0, 0, 1.20507, 0, -4.35976)">'+
                            '<path xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0" fill="#B4B4B4" d="M14.113,16.581c0,0.634,-0.517,1.15,-1.15,1.15L1.15,17.731c-0.632,0,-1.15,-0.517,-1.15,-1.15L0,4.768c0.002,-0.634,0.518,-1.15,1.15,-1.15l11.814,0c0.634,0,1.15,0.517,1.15,1.15L14.113,16.581C14.113,16.581,14.113,16.581,14.113,16.581z" id="path19980"/>'+
                            '<circle cx="2.056" cy="5.674" fill="#505050" r="1.223" id="circle19982"/>'+
                            '<circle cx="12.093" cy="5.695" fill="#505050" r="1.223" id="circle19984"/>'+
                            '<circle cx="12.072" cy="15.731" fill="#505050" r="1.222" id="circle19986"/>'+
                            '<circle cx="2.036" cy="15.709" fill="#505050" r="1.222" id="circle19988"/>'+
                            '<circle cx="7.057" cy="10.675" fill="#3F3F3F" r="4.116" id="circle19990"/>'+
                            '<circle cx="7.057" cy="10.675" fill="#505050" r="4.116" id="circle19992"/>'+
                            '<circle cx="7.063" cy="10.699" fill="#282828" r="3.53" id="circle19994"/>'+
                          '</g>'+
                        '</g>'+
                  '</g>'+
                  '</g>',
            
      '<g xmlns="http://www.w3.org/2000/svg" id="switch" transform="matrix(1, 0, 0, 1, 218.87, 103.064)">'+
      ' <g transform="matrix(0, -1, 1, 0, 0, 17.008)" id="g19952">'+
      '     <g xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" i:extraneous="self" id="g19956">'+
      '       <sodipodi:namedview xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" bordercolor="#666666" guidetolerance="10" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:document-units="mm" fit-margin-left="0" showgrid="false" inkscape:current-layer="Ebene_1" window-width="1745" cx="-10.948433" inkscape:window-x="0" id="namedview38" gridtolerance="10" fit-margin-right="0" borderopacity="1" objecttolerance="10" zoom="9.9966114" inkscape:window-height="650" window-maximized="0" inkscape:cy="13.840712" inkscape:pageopacity="0" fit-margin-bottom="0" window-y="0" fit-margin-top="0" pageshadow="2" units="mm" pagecolor="#ffffff"/>'+
      '       <g id="g4149" transform="matrix(1.20493, 0, 0, 1.20507, 0, -4.35976)">'+
      '         <path xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0" fill="#B4B4B4" d="M14.113,16.581c0,0.634,-0.517,1.15,-1.15,1.15L1.15,17.731c-0.632,0,-1.15,-0.517,-1.15,-1.15L0,4.768c0.002,-0.634,0.518,-1.15,1.15,-1.15l11.814,0c0.634,0,1.15,0.517,1.15,1.15L14.113,16.581C14.113,16.581,14.113,16.581,14.113,16.581z" id="path5"/>'+
      '         <circle cx="2.056" cy="5.674" fill="#505050" r="1.223" id="circle7"/>'+
      '         <circle cx="12.093" cy="5.695" fill="#505050" r="1.223" id="circle9"/>'+
      '         <circle cx="12.072" cy="15.731" fill="#505050" r="1.222" id="circle11"/>'+
      '         <circle cx="2.036" cy="15.709" fill="#505050" r="1.222" id="circle13"/>'+
      '         <circle cx="7.057" cy="10.675" fill="#3F3F3F" r="4.116" id="circle15"/>'+
      '         <circle cx="7.057" cy="10.675" fill="#505050" r="4.116" id="circle22"/>'+
      '         <circle cx="7.063" cy="10.699" fill="#282828" r="3.53" id="circle26"/>'+
      '       </g>'+
      '     </g>'+
      '</g>'+
    ' </g>' 
            ];

           
            
              btng.innerHTML+=btn[index];
                 /*
                svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });
           */
            }


            outerBtn(25.9, 176.4, "A",0);
            this.buttons.push(svg.path(this.g, "sim-button", "M69.7,203.5c0,8.7-7,15.7-15.7,15.7s-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7S69.7,194.9,69.7,203.5"));
            outerBtn(380, 176.4, "B",1);
            this.buttons.push(svg.path(this.g, "sim-button", "M461.9,203.5c0,8.7-7,15.7-15.7,15.7c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7C454.9,187.8,461.9,194.9,461.9,203.5"));
            outerBtn(417, 250, "A+B",1);
            this.buttons.push(svg.child(this.g, "circle", { class: "sim-button", cx: 446, cy: 278, r: 16.5 }));
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
           // (<any>this.buttonsOuter[0]).style.transformOrigin = '50%  50%';
           // (<any>this.buttonsOuter[0]).style.transform = `scale(${0.5})`;
            

           

        /*

            svg.path(this.g, "sim-label", "M35.7,376.4c0-2.8,2.1-5.1,5.5-5.1c3.3,0,5.5,2.4,5.5,5.1v4.7c0,2.8-2.2,5.1-5.5,5.1c-3.3,0-5.5-2.4-5.5-5.1V376.4zM43.3,376.4c0-1.3-0.8-2.3-2.2-2.3c-1.3,0-2.1,1.1-2.1,2.3v4.7c0,1.2,0.8,2.3,2.1,2.3c1.3,0,2.2-1.1,2.2-2.3V376.4z");
            svg.path(this.g, "sim-label", "M136.2,374.1c2.8,0,3.4-0.8,3.4-2.5h2.9v14.3h-3.4v-9.5h-3V374.1z");
            svg.path(this.g, "sim-label", "M248.6,378.5c1.7-1,3-1.7,3-3.1c0-1.1-0.7-1.6-1.6-1.6c-1,0-1.8,0.6-1.8,2.1h-3.3c0-2.6,1.8-4.6,5.1-4.6c2.6,0,4.9,1.3,4.9,4.3c0,2.4-2.3,3.9-3.8,4.7c-2,1.3-2.5,1.8-2.5,2.9h6.1v2.7h-10C244.8,381.2,246.4,379.9,248.6,378.5z");

            svg.path(this.g, "sim-button-label", "M48.1,270.9l-0.6-1.7h-5.1l-0.6,1.7h-3.5l5.1-14.3h3.1l5.2,14.3H48.1z M45,260.7l-1.8,5.9h3.5L45,260.7z");
            svg.path(this.g, "sim-button-label", "M449.1,135.8h5.9c3.9,0,4.7,2.4,4.7,3.9c0,1.8-1.4,2.9-2.5,3.2c0.9,0,2.6,1.1,2.6,3.3c0,1.5-0.8,4-4.7,4h-6V135.8zM454.4,141.7c1.6,0,2-1,2-1.7c0-0.6-0.3-1.7-2-1.7h-2v3.4H454.4z M452.4,144.1v3.5h2.1c1.6,0,2-1,2-1.8c0-0.7-0.4-1.8-2-1.8H452.4z")

            svg.path(this.g, "sim-label", "M352.1,381.1c0,1.6,0.9,2.5,2.2,2.5c1.2,0,1.9-0.9,1.9-1.9c0-1.2-0.6-2-2.1-2h-1.3v-2.6h1.3c1.5,0,1.9-0.7,1.9-1.8c0-1.1-0.7-1.6-1.6-1.6c-1.4,0-1.8,0.8-1.8,2.1h-3.3c0-2.4,1.5-4.6,5.1-4.6c2.6,0,5,1.3,5,4c0,1.6-1,2.8-2.1,3.2c1.3,0.5,2.3,1.6,2.3,3.5c0,2.7-2.4,4.3-5.2,4.3c-3.5,0-5.5-2.1-5.5-5.1H352.1z")
            svg.path(this.g, "sim-label", "M368.5,385.9h-3.1l-5.1-14.3h3.5l3.1,10.1l3.1-10.1h3.6L368.5,385.9z")
            svg.path(this.g, "sim-label", "M444.4,378.3h7.4v2.5h-1.5c-0.6,3.3-3,5.5-7.1,5.5c-4.8,0-7.5-3.5-7.5-7.5c0-3.9,2.8-7.5,7.5-7.5c3.8,0,6.4,2.3,6.6,5h-3.5c-0.2-1.1-1.4-2.2-3.1-2.2c-2.7,0-4.1,2.3-4.1,4.7c0,2.5,1.4,4.7,4.4,4.7c2,0,3.2-1.2,3.4-2.7h-2.5V378.3z")
            svg.path(this.g, "sim-label", "M461.4,380.9v-9.3h3.3v14.3h-3.5l-5.2-9.2v9.2h-3.3v-14.3h3.5L461.4,380.9z")
            svg.path(this.g, "sim-label", "M472.7,371.6c4.8,0,7.5,3.5,7.5,7.2s-2.7,7.2-7.5,7.2h-5.3v-14.3H472.7z M470.8,374.4v8.6h1.8c2.7,0,4.2-2.1,4.2-4.3s-1.6-4.3-4.2-4.3H470.8z")
    */
        }

        private attachEvents() {
            Runtime.messagePosted = (msg) => {
                switch (msg.type || "") {
                    case "serial": this.flashSystemLed(); break;
                    case "radiopacket": this.flashAntenna(); break;
                }
            }
            let tiltDecayer = 0;
            this.element.addEventListener(pointerEvents.move, (ev: MouseEvent) => {
                const state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (tiltDecayer) {
                    clearInterval(tiltDecayer);
                    tiltDecayer = 0;
                }

                const bbox = this.element.getBoundingClientRect();
                const ax = (ev.clientX - bbox.width / 2) / (bbox.width / 3);
                const ay = (ev.clientY - bbox.height / 2) / (bbox.height / 3);

                const x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                const y = - Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
                const z2 = 1023 * 1023 - x * x - y * y;
                const z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));

                state.accelerometerState.accelerometer.update(x, y, z);
                this.updateTilt();
            }, false);
            this.element.addEventListener(pointerEvents.leave, (ev: MouseEvent) => {
                let state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                if (!tiltDecayer) {
                    tiltDecayer = setInterval(() => {
                        let accx = state.accelerometerState.accelerometer.getX(MicroBitCoordinateSystem.RAW);
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = state.accelerometerState.accelerometer.getY(MicroBitCoordinateSystem.RAW);
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            clearInterval(tiltDecayer);
                            tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        state.accelerometerState.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }, 50)
                }
            }, false);

           /*
            this.pins.forEach((pin, index) => {
                if (!this.board.edgeConnectorState.pins[index]) return;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(pin,
                    // move
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // start
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.addClass(svgpin, "touched");
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.removeClass(svgpin, "touched");
                        this.updatePin(pin, index);
                        return false;
                    },
                    // keydown
                    (ev: KeyboardEvent) => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];

                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            pin.value -= 10;
                            if (pin.value < 0) {
                                pin.value = 1023;
                            }
                            this.updatePin(pin, index);
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            pin.value += 10;
                            if (pin.value > 1023) {
                                pin.value = 0;
                            }
                            this.updatePin(pin, index);
                        }
                    });
            }) 
            */
            /*
            this.pins.slice(0, 3).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = true;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
                accessibility.enableKeyboardInteraction(btn, undefined, () => {
                    let state = this.board;
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });
            })
*/
            let bpState = this.board.buttonPairState;
            let stateButtons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            this.buttonsOuter.slice(0, 2).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = true;
                    svg.fill(this.buttons[index], this.props.theme.buttonDown);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
                accessibility.enableKeyboardInteraction(btn, undefined, () => {
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.down, ev => {
                let state = this.board;
                stateButtons[0].pressed = true;
                stateButtons[1].pressed = true;
                stateButtons[2].pressed = true;
                svg.fill(this.buttons[0], this.props.theme.buttonDown);
                svg.fill(this.buttons[1], this.props.theme.buttonDown);
                svg.fill(this.buttons[2], this.props.theme.buttonDown);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);

                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            })
            accessibility.enableKeyboardInteraction(this.buttonsOuter[2], undefined, () => {
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            });
        }
    }
}
