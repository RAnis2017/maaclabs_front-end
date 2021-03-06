! function(t, e, n) {
    "use strict";
    var o, i = {},
        s = { sdk: !1, ready: !1 };
    e.module("facebook", []).value("settings", i).value("flags", s).provider("Facebook", [function() {
        i.appId = null, this.setAppId = function(t) { i.appId = t }, this.getAppId = function() { return i.appId }, i.locale = "en_US", this.setLocale = function(t) { i.locale = t }, this.getLocale = function() { return i.locale }, i.status = !0, this.setStatus = function(t) { i.status = t }, this.getStatus = function() { return i.status }, i.channelUrl = null, this.setChannel = function(t) { i.channelUrl = t }, this.getChannel = function() { return i.channelUrl }, i.cookie = !0, this.setCookie = function(t) { i.cookie = t }, this.getCookie = function() { return i.cookie }, i.xfbml = !0, this.setXfbml = function(t) { i.xfbml = t }, this.getXfbml = function() { return i.xfbml }, this.setAuthResponse = function(t) { i.authResponse = t || !0 }, this.getAuthResponse = function() { return i.authResponse }, i.frictionlessRequests = !1, this.setFrictionlessRequests = function(t) { i.frictionlessRequests = t }, this.getFrictionlessRequests = function() { return i.frictionlessRequests }, i.hideFlashCallback = null, this.setHideFlashCallback = function(t) { i.hideFlashCallback = t || null }, this.getHideFlashCallback = function() { return i.hideFlashCallback }, this.setInitCustomOption = function(t, n) { return e.isString(t) ? (i[t] = n, i[t]) : !1 }, this.getInitOption = function(t) { return e.isString(t) && i.hasOwnProperty(t) ? i[t] : !1 }, i.loadSDK = !0, this.setLoadSDK = function(t) { i.loadSDK = !!t }, this.getLoadSDK = function() { return i.loadSDK }, i.version = "v2.0", this.setSdkVersion = function(t) { i.version = t }, this.getSdkVersion = function() { return i.version }, this.init = function(t, n) { e.isString(t) && (i.appId = t), e.isNumber(t) && (i.appId = t.toString()), e.isObject(t) && e.extend(i, t), e.isDefined(n) && (i.loadSDK = !!n) }, this.$get = ["$q", "$rootScope", "$timeout", "$window", function(t, n, r, c) {
            function u() { this.appId = i.appId }
            return u.prototype.isReady = function() { return s.ready }, u.prototype.login = function() {
                var n, o, i = t.defer(),
                    s = Array.prototype.slice.call(arguments);
                return e.forEach(s, function(t, i) { e.isFunction(t) && (n = t, o = i) }), e.isFunction(n) && e.isNumber(o) && s.splice(o, 1, function(t) { r(function() { t && e.isUndefined(t.error) ? i.resolve(t) : i.reject(t), e.isFunction(n) && n(t) }) }), this.isReady() ? c.FB.login.apply(c.FB, s) : r(function() { i.reject("Facebook.login() called before Facebook SDK has loaded.") }), i.promise
            }, e.forEach(["logout", "api", "ui", "getLoginStatus"], function(n) {
                u.prototype[n] = function() {
                    var i, s, u = t.defer(),
                        a = Array.prototype.slice.call(arguments);
                    return e.forEach(a, function(t, n) { e.isFunction(t) && (i = t, s = n) }), e.isFunction(i) && e.isNumber(s) && a.splice(s, 1, function(t) { r(function() { t && e.isUndefined(t.error) ? u.resolve(t) : u.reject(t), e.isFunction(i) && i(t) }) }), r(function() { o.promise.then(function() { c.FB[n].apply(FB, a) }) }), u.promise
                }
            }), u.prototype.parseXFBML = function() { var e = t.defer(); return r(function() { o.promise.then(function() { c.FB.XFBML.parse(), e.resolve() }) }), e.promise }, e.forEach(["subscribe", "unsubscribe"], function(n) {
                u.prototype[n] = function() {
                    var i, s, u = t.defer(),
                        a = Array.prototype.slice.call(arguments);
                    return e.forEach(a, function(t, n) { e.isFunction(t) && (i = t, s = n) }), e.isFunction(i) && e.isNumber(s) && a.splice(s, 1, function(t) { r(function() { t && e.isUndefined(t.error) ? u.resolve(t) : u.reject(t), e.isFunction(i) && i(t) }) }), r(function() { o.promise.then(function() { c.FB.Event[n].apply(FB, a) }) }), u.promise
                }
            }), new u
        }]
    }]).run(["$rootScope", "$q", "$window", "$timeout", function(t, n, r, c) {
        o = n.defer();
        var u = i.loadSDK;
        delete i.loadSDK, r.fbAsyncInit = function() {
                c(function() {
                    if (!i.appId) throw "Missing appId setting.";
                    FB.init(i), s.ready = !0, e.forEach({ "auth.login": "login", "auth.logout": "logout", "auth.prompt": "prompt", "auth.sessionChange": "sessionChange", "auth.statusChange": "statusChange", "auth.authResponseChange": "authResponseChange", "xfbml.render": "xfbmlRender", "edge.create": "like", "edge.remove": "unlike", "comment.create": "comment", "comment.remove": "uncomment" }, function(e, n) { FB.Event.subscribe(n, function(n) { c(function() { t.$broadcast("Facebook:" + e, n) }) }) }), t.$broadcast("Facebook:load"), o.resolve(FB)
                })
            },
            function() { var t = document.getElementById("fb-root"); return t || (t = document.createElement("div"), t.id = "fb-root", document.body.insertBefore(t, document.body.childNodes[0])), t }(), u && ! function() {
                var t = "//connect.facebook.net/" + i.locale + "/sdk.js",
                    e = document.createElement("script");
                e.id = "facebook-jssdk", e.async = !0, -1 !== r.location.protocol.indexOf("file:") && (t = "https:" + t), e.src = t, e.onload = function() { s.sdk = !0 }, document.getElementsByTagName("head")[0].appendChild(e)
            }()
    }])
}(window, angular);