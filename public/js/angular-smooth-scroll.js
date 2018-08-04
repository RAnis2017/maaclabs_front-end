/*!
 *   Angular Smooth Scroll (ngSmoothScroll)
 *   Animates scrolling to elements, by David Oliveros.
 *
 *   Callback hooks contributed by Ben Armston https://github.com/benarmston
 *   Easing support contributed by Willem Liu. https://github.com/willemliu
 *   Easing functions forked from Gaëtan Renaudeau. https://gist.github.com/gre/1650294
 *   Infinite loop bugs in iOS and Chrome (when zoomed) by Alex Guzman. https://github.com/alexguzman
 *   Support for scrolling in custom containers by Joseph Matthias Goh. https://github.com/zephinzer
 *   Influenced by Chris Ferdinandi
 *   https://github.com/cferdinandi
 *
 *   Version: 2.0.0
 *   License: MIT
 */
! function() {
    "use strict";
    var e = angular.module("smoothScroll", []),
        t = function(e, t) {
            t = t || {};
            var n = t.duration || 800,
                c = t.offset || 0,
                r = t.easing || "easeInOutQuart",
                a = t.callbackBefore || function() {},
                o = t.callbackAfter || function() {},
                l = document.getElementById(t.containerId) || null,
                u = void 0 != l && null != l,
                f = function() { return u ? l.scrollTop : window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop },
                i = function(e, t) {
                    switch (e) {
                        case "easeInQuad":
                            return t * t;
                        case "easeOutQuad":
                            return t * (2 - t);
                        case "easeInOutQuad":
                            return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t;
                        case "easeInCubic":
                            return t * t * t;
                        case "easeOutCubic":
                            return --t * t * t + 1;
                        case "easeInOutCubic":
                            return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                        case "easeInQuart":
                            return t * t * t * t;
                        case "easeOutQuart":
                            return 1 - --t * t * t * t;
                        case "easeInOutQuart":
                            return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
                        case "easeInQuint":
                            return t * t * t * t * t;
                        case "easeOutQuint":
                            return 1 + --t * t * t * t * t;
                        case "easeInOutQuint":
                            return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
                        default:
                            return t
                    }
                },
                s = function(e) {
                    var t = 0;
                    if (e.offsetParent)
                        do t += e.offsetTop, e = e.offsetParent; while (e);
                    return t = Math.max(t - c, 0)
                };
            setTimeout(function() {
                var t, c, d, b, k = null,
                    m = f(),
                    I = s(e),
                    v = 0,
                    g = I - m,
                    h = function() { k = f(), u ? (d = l.scrollHeight, b = l.clientHeight + k) : (d = document.body.scrollheight, b = window.innerHeight + k), c != I && k != I && d > b || (clearInterval(A), o(e)) },
                    p = function() { v += 16, t = v / n, t = t > 1 ? 1 : t, c = m + g * i(r, t), u ? l.scrollTop = c : window.scrollTo(0, c), h() };
                a(e);
                var A = setInterval(p, 16)
            }, 0)
        };
    e.factory("smoothScroll", function() { return t }), e.directive("smoothScroll", ["smoothScroll", function(e) {
        return {
            restrict: "A",
            scope: { callbackBefore: "&", callbackAfter: "&" },
            link: function(t, n, c) {
                (void 0 === c.scrollIf || "true" === c.scrollIf) && setTimeout(function() {
                    var r = function(e) { if (c.callbackBefore) { var n = t.callbackBefore({ element: e }); "function" == typeof n && n(e) } },
                        a = function(e) { if (c.callbackAfter) { var n = t.callbackAfter({ element: e }); "function" == typeof n && n(e) } };
                    e(n[0], { duration: c.duration, offset: c.offset, easing: c.easing, callbackBefore: r, callbackAfter: a, containerId: c.containerId })
                }, 0)
            }
        }
    }]), e.directive("scrollTo", ["smoothScroll", function(e) {
        return {
            restrict: "A",
            scope: { callbackBefore: "&", callbackAfter: "&" },
            link: function(t, n, c) {
                var r;
                n.on("click", function(n) {
                    if (n.preventDefault(), r = document.getElementById(c.scrollTo)) {
                        var a = function(e) { if (c.callbackBefore) { var n = t.callbackBefore({ element: e }); "function" == typeof n && n(e) } },
                            o = function(e) { if (c.callbackAfter) { var n = t.callbackAfter({ element: e }); "function" == typeof n && n(e) } };
                        return e(r, { duration: c.duration, offset: c.offset, easing: c.easing, callbackBefore: a, callbackAfter: o, containerId: c.containerId }), !1
                    }
                })
            }
        }
    }])
}();