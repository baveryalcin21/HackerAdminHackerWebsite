! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";

    function b() {
        return "undefined" != typeof window.performance && window.performance.now ? window.performance.now() : Date.now()
    }

    function c(a) {
        return "string" == typeof a && -1 != a.indexOf("%")
    }
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    for (var d = ["webkit", "moz"], e = 0; e < d.length && !window.requestAnimationFrame; ++e) {
        var f = d[e];
        window.requestAnimationFrame = window[f + "RequestAnimationFrame"], window.cancelAnimationFrame = window[f + "CancelAnimationFrame"] || window[f + "CancelRequestAnimationFrame"]
    }
    if (/iP(ad|hone|od).*OS (6|7)/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var g = 0;
        window.requestAnimationFrame = function(a) {
            var c = b(),
                d = Math.max(g + 16, c);
            return setTimeout(function() {
                a(g = d)
            }, d - c)
        }, window.cancelAnimationFrame = clearTimeout
    }
    var h = function(b, c) {
            var d = document.createElementNS("http://www.w3.org/2000/svg", b);
            return a.each(c, function(a, b) {
                d.setAttribute(a, b)
            }), d
        },
        i = "createElementNS" in document && new h("svg", {}).createSVGRect,
        j = "asPieProgress",
        k = a[j] = function(b, c) {
            this.element = b, this.$element = a(b), this.options = a.extend({}, k.defaults, c, this.$element.data()), this.namespace = this.options.namespace, this.classes = this.options.classes, this.easing = k.easing[this.options.easing] || k.easing.ease, this.$element.addClass(this.classes.element), this.min = this.$element.attr("aria-valuemin"), this.max = this.$element.attr("aria-valuemax"), this.min = this.min ? parseInt(this.min, 10) : this.options.min, this.max = this.max ? parseInt(this.max, 10) : this.options.max, this.first = this.$element.attr("aria-valuenow"), this.first = this.first ? parseInt(this.first, 10) : this.options.first ? this.options.first : this.min, this.now = this.first, this.goal = this.options.goal, this._frameId = null, this.initialized = !1, this._trigger("init"), this.init()
        };
    k.defaults = {
        namespace: "asPieProgress",
        classes: {
            svg: "pie_progress__svg",
            element: "pie_progress",
            number: "pie_progress__number",
            content: "pie_progress__content"
        },
        min: 0,
        max: 100,
        goal: 100,
        size: 160,
        speed: 15,
        barcolor: "#ef1e25",
        barsize: "4",
        trackcolor: "#333",
        fillcolor: "none",
        easing: "ease",
        numberCallback: function(a) {
            var b = Math.round(this.getPercentage(a));
            return b + "%"
        },
        contentCallback: null
    };
    var l = function(a, b, c, d) {
        function e(a, b) {
            return 1 - 3 * b + 3 * a
        }

        function f(a, b) {
            return 3 * b - 6 * a
        }

        function g(a) {
            return 3 * a
        }

        function h(a, b, c) {
            return ((e(b, c) * a + f(b, c)) * a + g(b)) * a
        }

        function i(a, b, c) {
            return 3 * e(b, c) * a * a + 2 * f(b, c) * a + g(b)
        }

        function j(b) {
            for (var d = b, e = 0; 4 > e; ++e) {
                var f = i(d, a, c);
                if (0 === f) return d;
                var g = h(d, a, c) - b;
                d -= g / f
            }
            return d
        }
        return a === b && c === d ? {
            css: "linear",
            fn: function(a) {
                return a
            }
        } : {
            css: "cubic-bezier(" + a + "," + b + "," + c + "," + d + ")",
            fn: function(a) {
                return h(j(a), b, d)
            }
        }
    };
    a.extend(k.easing = {}, {
        ease: l(.25, .1, .25, 1),
        linear: l(0, 0, 1, 1),
        "ease-in": l(.42, 0, 1, 1),
        "ease-out": l(0, 0, .58, 1),
        "ease-in-out": l(.42, 0, .58, 1)
    }), k.prototype = {
        constructor: k,
        init: function() {
            this.$number = this.$element.find("." + this.classes.number), this.$content = this.$element.find("." + this.classes.content), this.size = this.options.size, this.width = this.size, this.height = this.size, this.prepare(), this.initialized = !0, this._trigger("ready")
        },
        prepare: function() {
            i && (this.svg = new h("svg", {
                version: "1.1",
                preserveAspectRatio: "xMinYMin meet",
                viewBox: "0 0 " + this.width + " " + this.height
            }), this.buildTrack(), this.buildBar(), a('<div class="' + this.classes.svg + '"></div>').append(this.svg).appendTo(this.$element))
        },
        buildTrack: function() {
            var a = this.size,
                b = this.size,
                c = a / 2,
                d = b / 2,
                e = this.options.barsize,
                f = new h("ellipse", {
                    rx: c - e / 2,
                    ry: d - e / 2,
                    cx: c,
                    cy: d,
                    stroke: this.options.trackcolor,
                    fill: this.options.fillcolor,
                    "stroke-width": e
                });
            this.svg.appendChild(f)
        },
        buildBar: function() {
            if (i) {
                var a = new h("path", {
                    fill: "none",
                    "stroke-width": this.options.barsize,
                    stroke: this.options.barcolor
                });
                this.bar = a, this.svg.appendChild(a), this._drawBar(this.first), this._updateBar()
            }
        },
        _drawBar: function(a) {
            if (i) {
                this.bar_goal = a;
                var b = this.size,
                    c = this.size,
                    d = b / 2,
                    e = c / 2,
                    f = 0,
                    g = this.options.barsize,
                    h = Math.min(d, e) - g / 2;
                this.r = h;
                var j = this.getPercentage(a);
                100 === j && (j -= 1e-4);
                var k = f + j * Math.PI * 2 / 100,
                    l = d + h * Math.sin(f),
                    m = e - h * Math.cos(f),
                    n = d + h * Math.sin(k),
                    o = e - h * Math.cos(k),
                    p = 0;
                k - f > Math.PI && (p = 1);
                var q = "M" + l + "," + m + " A" + h + "," + h + " 0 " + p + " 1 " + n + "," + o;
                this.bar.setAttribute("d", q)
            }
        },
        _updateBar: function() {
            if (i) {
                var a = this.getPercentage(this.now),
                    b = this.bar.getTotalLength(),
                    c = b * (1 - a / this.getPercentage(this.bar_goal));
                this.bar.style.strokeDasharray = b + " " + b, this.bar.style.strokeDashoffset = c
            }
        },
        _trigger: function(a) {
            var b = Array.prototype.slice.call(arguments, 1),
                c = [this].concat(b);
            this.$element.trigger(j + "::" + a, c), a = a.replace(/\b\w+\b/g, function(a) {
                return a.substring(0, 1).toUpperCase() + a.substring(1)
            });
            var d = "on" + a;
            "function" == typeof this.options[d] && this.options[d].apply(this, b)
        },
        getPercentage: function(a) {
            return 100 * (a - this.min) / (this.max - this.min)
        },
        go: function(a) {
            var d = this;
            this._clear(), c(a) && (a = parseInt(a.replace("%", ""), 10), a = Math.round(this.min + a / 100 * (this.max - this.min))), "undefined" == typeof a && (a = this.goal), a > this.max ? a = this.max : a < this.min && (a = this.min), this.bar_goal < a && this._drawBar(a);
            var e = d.now,
                f = b(),
                g = f + 100 * Math.abs(e - a) * d.options.speed / (d.max - d.min),
                h = function(b) {
                    var c;
                    if (b > g) c = a;
                    else {
                        var i = (b - f) / d.options.speed;
                        c = Math.round(d.easing.fn(i / 100) * (d.max - d.min)), a > e ? (c = e + c, c > a && (c = a)) : (c = e - c, a > c && (c = a))
                    }
                    d._update(c), c === a ? (window.cancelAnimationFrame(d._frameId), d._frameId = null, d.now === d.goal && d._trigger("finish")) : d._frameId = window.requestAnimationFrame(h)
                };
            d._frameId = window.requestAnimationFrame(h)
        },
        _update: function(a) {
            this.now = a, this._updateBar(), this.$element.attr("aria-valuenow", this.now), this.$number.length > 0 && "function" == typeof this.options.numberCallback && this.$number.html(this.options.numberCallback.call(this, [this.now])), this.$content.length > 0 && "function" == typeof this.options.contentCallback && this.$content.html(this.options.contentCallback.call(this, [this.now])), this._trigger("update", a)
        },
        _clear: function() {
            this._frameId && (window.cancelAnimationFrame(this._frameId), this._frameId = null)
        },
        get: function() {
            return this.now
        },
        start: function() {
            this._clear(), this._trigger("start"), this.go(this.goal)
        },
        reset: function() {
            this._clear(), this._drawBar(this.first), this._update(this.first), this._trigger("reset")
        },
        stop: function() {
            this._clear(), this._trigger("stop")
        },
        finish: function() {
            this._clear(), this._update(this.goal), this._trigger("finish")
        },
        destory: function() {
            this.$element.data(j, null), this._trigger("destory")
        }
    }, a.fn[j] = function(b) {
        if ("string" != typeof b) return this.each(function() {
            a.data(this, j) || a.data(this, j, new k(this, b))
        });
        var c = b,
            d = Array.prototype.slice.call(arguments, 1);
        if (/^\_/.test(c)) return !1;
        if (!/^(get)$/.test(c)) return this.each(function() {
            var b = a.data(this, j);
            b && "function" == typeof b[c] && b[c].apply(b, d)
        });
        var e = this.first().data(j);
        return e && "function" == typeof e[c] ? e[c].apply(e, d) : void 0
    }
});