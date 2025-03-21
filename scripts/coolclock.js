"use strict";
window.CoolClock = function (a) {
    return this.init(a)
}, CoolClock.config = {
    tickDelay: 1e3,
    longTickDelay: 15e3,
    defaultRadius: 85,
    renderRadius: 100,
    defaultSkin: "chunkySwiss",
    showSecs: !0,
    showAmPm: !0,
    skins: {
        swissRail: {
            outerBorder: {
                lineWidth: 2,
                radius: 95,
                color: "black",
                alpha: 1
            },
            smallIndicator: {
                lineWidth: 2,
                startAt: 88,
                endAt: 92,
                color: "black",
                alpha: 1
            },
            largeIndicator: {
                lineWidth: 4,
                startAt: 79,
                endAt: 92,
                color: "black",
                alpha: 1
            },
            hourHand: {
                lineWidth: 8,
                startAt: -15,
                endAt: 50,
                color: "black",
                alpha: 1
            },
            minuteHand: {
                lineWidth: 7,
                startAt: -15,
                endAt: 75,
                color: "black",
                alpha: 1
            },
            secondHand: {
                lineWidth: 1,
                startAt: -20,
                endAt: 85,
                color: "red",
                alpha: 1
            },
            secondDecoration: {
                lineWidth: 1,
                startAt: 70,
                radius: 4,
                fillColor: "red",
                color: "red",
                alpha: 1
            }
        },
        chunkySwiss: {
            outerBorder: {
                lineWidth: 4,
                radius: 97,
                color: "black",
                alpha: 1
            },
            smallIndicator: {
                lineWidth: 4,
                startAt: 89,
                endAt: 93,
                color: "black",
                alpha: 1
            },
            largeIndicator: {
                lineWidth: 8,
                startAt: 80,
                endAt: 93,
                color: "black",
                alpha: 1
            },
            hourHand: {
                lineWidth: 12,
                startAt: -15,
                endAt: 60,
                color: "black",
                alpha: 1
            },
            minuteHand: {
                lineWidth: 10,
                startAt: -15,
                endAt: 85,
                color: "black",
                alpha: 1
            },
            secondHand: {
                lineWidth: 4,
                startAt: -20,
                endAt: 85,
                color: "red",
                alpha: 1
            },
            secondDecoration: {
                lineWidth: 2,
                startAt: 60,
                radius: 8,
                fillColor: "red",
                color: "red",
                alpha: 1
            }
        },
        chunkySwissOnBlack: {
            outerBorder: {
                lineWidth: 4,
                radius: 97,
                color: "white",
                alpha: 1
            },
            smallIndicator: {
                lineWidth: 4,
                startAt: 89,
                endAt: 93,
                color: "white",
                alpha: 1
            },
            largeIndicator: {
                lineWidth: 8,
                startAt: 80,
                endAt: 93,
                color: "white",
                alpha: 1
            },
            hourHand: {
                lineWidth: 12,
                startAt: -15,
                endAt: 60,
                color: "white",
                alpha: 1
            },
            minuteHand: {
                lineWidth: 10,
                startAt: -15,
                endAt: 85,
                color: "white",
                alpha: 1
            },
            secondHand: {
                lineWidth: 4,
                startAt: -20,
                endAt: 85,
                color: "red",
                alpha: 1
            },
            secondDecoration: {
                lineWidth: 2,
                startAt: 70,
                radius: 8,
                fillColor: "red",
                color: "red",
                alpha: 1
            }
        }
    },
    isIE: !!document.all,
    clockTracker: {},
    noIdCount: 0
}, CoolClock.prototype = {
    init: function (a) {
        return this.canvasId = a.canvasId, this.skinId = a.skinId || CoolClock.config.defaultSkin, this.displayRadius = a.displayRadius || CoolClock.config.defaultRadius, this.showSecondHand = "boolean" == typeof a.showSecondHand ? a.showSecondHand : !0, this.gmtOffset = null != a.gmtOffset && "" != a.gmtOffset ? parseFloat(a.gmtOffset) : null, this.showDigital = "boolean" == typeof a.showDigital ? a.showDigital : !1, this.logClock = "boolean" == typeof a.logClock ? a.logClock : !1, this.logClockRev = "boolean" == typeof a.logClock ? a.logClockRev : !1, this.tickDelay = CoolClock.config[this.showSecondHand ? "tickDelay" : "longTickDelay"], this.canvas = document.getElementById(this.canvasId), this.canvas.setAttribute("width", "" + 2 * this.displayRadius), this.canvas.setAttribute("height", "" + 2 * this.displayRadius), this.canvas.style.width = 2 * this.displayRadius + "px", this.canvas.style.height = 2 * this.displayRadius + "px", this.renderRadius = CoolClock.config.renderRadius, this.scale = this.displayRadius / this.renderRadius, this.ctx = this.canvas.getContext("2d"), this.ctx.scale(this.scale, this.scale), CoolClock.config.clockTracker[this.canvasId] = this, this.tick(), this
    },
    fullCircleAt: function (a, b, c) {
        this.ctx.save(), this.ctx.globalAlpha = c.alpha, this.ctx.lineWidth = c.lineWidth, CoolClock.config.isIE || this.ctx.beginPath(), CoolClock.config.isIE && (this.ctx.lineWidth = this.ctx.lineWidth * this.scale), this.ctx.arc(a, b, c.radius, 0, 2 * Math.PI, !1), CoolClock.config.isIE && this.ctx.arc(a, b, c.radius, -.1, .1, !1), c.fillColor ? (this.ctx.fillStyle = c.fillColor, this.ctx.fill()) : (this.ctx.strokeStyle = c.color, this.ctx.stroke()), this.ctx.restore()
    },
    drawTextAt: function (a, b, c) {
        this.ctx.save(), this.ctx.font = "15px sans-serif";
        var d = this.ctx.measureText(a);
        d.height || (d.height = 15), this.ctx.fillText(a, b - d.width / 2, c - d.height / 2), this.ctx.restore()
    },
    lpad2: function (a) {
        return (10 > a ? "0" : "") + a
    },
    tickAngle: function (a) {
        var b = 3;
        return this.logClock ? 0 == a ? 0 : Math.log(a * b) / Math.log(60 * b) : this.logClockRev ? (a = (60 - a) % 60, 1 - (0 == a ? 0 : Math.log(a * b) / Math.log(60 * b))) : a / 60
    },
    timeText: function (a, b, c) {
        var d = CoolClock.config;
        return "" + (d.showAmPm ? a % 12 == 0 ? 12 : a % 12 : a) + ":" + this.lpad2(b) + (d.showSecs ? ":" + this.lpad2(c) : "") + (d.showAmPm ? 12 > a ? " am" : " pm" : "")
    },
    radialLineAtAngle: function (a, b) {
        this.ctx.save(), this.ctx.translate(this.renderRadius, this.renderRadius), this.ctx.rotate(Math.PI * (2 * a - .5)), this.ctx.globalAlpha = b.alpha, this.ctx.strokeStyle = b.color, this.ctx.lineWidth = b.lineWidth, CoolClock.config.isIE && (this.ctx.lineWidth = this.ctx.lineWidth * this.scale), b.radius ? this.fullCircleAt(b.startAt, 0, b) : (this.ctx.beginPath(), this.ctx.moveTo(b.startAt, 0), this.ctx.lineTo(b.endAt, 0), this.ctx.stroke()), this.ctx.restore()
    },
    render: function (a, b, c) {
        var d = CoolClock.config.skins[this.skinId];
        d || (d = CoolClock.config.skins[CoolClock.config.defaultSkin]), this.ctx.clearRect(0, 0, 2 * this.renderRadius, 2 * this.renderRadius), d.outerBorder && this.fullCircleAt(this.renderRadius, this.renderRadius, d.outerBorder);
        for (var e = 0; 60 > e; e++) e % 5 && d.smallIndicator && this.radialLineAtAngle(this.tickAngle(e), d.smallIndicator), !(e % 5) && d.largeIndicator && this.radialLineAtAngle(this.tickAngle(e), d.largeIndicator);
        this.showDigital && this.drawTextAt(this.timeText(a, b, c), this.renderRadius, this.renderRadius + this.renderRadius / 2), d.hourHand && this.radialLineAtAngle(this.tickAngle(a % 12 * 5 + b / 12), d.hourHand), d.minuteHand && this.radialLineAtAngle(this.tickAngle(b + c / 60), d.minuteHand), this.showSecondHand && d.secondHand && this.radialLineAtAngle(this.tickAngle(c), d.secondHand), !CoolClock.config.isIE && this.showSecondHand && d.secondDecoration && this.radialLineAtAngle(this.tickAngle(c), d.secondDecoration)
    },
    refreshDisplay: function () {
        var a = new Date;
        if (null != this.gmtOffset) {
            var b = new Date(a.valueOf() + 1e3 * this.gmtOffset * 60 * 60);
            this.render(b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds())
        } else this.render(a.getHours(), a.getMinutes(), a.getSeconds())
    },
    nextTick: function () {
        setTimeout("CoolClock.config.clockTracker['" + this.canvasId + "'].tick()", this.tickDelay)
    },
    stillHere: function () {
        return null != document.getElementById(this.canvasId)
    },
    tick: function () {
        this.stillHere() && (this.refreshDisplay(), this.nextTick())
    }
}, CoolClock.findAndCreateClocks = function () {
    for (var a = document.getElementsByTagName("canvas"), b = 0; b < a.length; b++) {
        var c = a[b].className.split(" ")[0].split(":");
        "CoolClock" == c[0] && (a[b].id || (a[b].id = "_coolclock_auto_id_" + CoolClock.config.noIdCount++), new CoolClock({
            canvasId: a[b].id,
            skinId: c[1],
            displayRadius: c[2],
            showSecondHand: "noSeconds" != c[3],
            gmtOffset: c[4],
            showDigital: "showDigital" == c[5],
            logClock: "logClock" == c[6],
            logClockRev: "logClockRev" == c[6]
        }))
    }
};