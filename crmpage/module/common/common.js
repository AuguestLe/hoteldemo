/**
 * @file common js
 * @author zhajiashun(zhajiashun@baidu.com)
 */
require(['jquery', 'underscore', 'md5', 'env'], function ($, _, md5, env) {
    function buildAjaxParams(data) {
        var privateKey = 'bdbus&luzhandui2015~Y~';
        // var BDUSS = Cookies.get('BDUSS');
        var BDUSS = '';
        var head = {
            version: '1.0',
            BDUSS: BDUSS || '',
            ct: '0',
            time: Math.floor(new Date().getTime() / 1000),
            sign: ''
        };
        var sign = [];
        for (var i in data) {
            if (data[i] == null || data[i] === '') {
                delete data[i];
            } else {
                sign.push(i);
            }
        }
        sign.sort();
        var signstr = '';
        $.each(sign, function (i, it) {
            data[it] && (signstr += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]));
        });
        // console.log(signstr);
        signstr = md5(signstr + privateKey);
        head.sign = signstr + '';
        data.head = head;
        return data;
    }

    $._ajax = function (opts) {
        var data = opts.data || {};
        var params = opts.url.match(/\?(.*)/);
        params = params && params[1] && params[1].split('&');
        if (params) {
            $.each(params, function (i, it) {
                var p = it.split('=');
                if (!data.hasOwnProperty(p[0])) {
                    data[p[0]] = decodeURIComponent(p[1]) || '';
                }
            });
        }
        opts.url = opts.url.replace(/\?.*/, '');
        data.us = data.us || 'mis';
        opts.data = buildAjaxParams(data);
        return $.ajax(opts).success(function (data) {
        });
    };
    // utils
    _.dateFormat = function (t, format) {
        if (!t) {
            return '';
        }
        if (_.isDate(t)) {
            t = t.getTime();
        } else {
            t = parseInt(t, 10) * 1000;
        }
        var date = new Date(parseInt(t, 10));
        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        var H = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var padding = function (s) {
            if (s < 10) {
                return '0' + s;
            }
            return s;
        };
        return y + '-' + padding(M) + '-' + padding(d) + ' ' + padding(H) + ':' + padding(m) + ':' + padding(s);
    };

    // price format to string
    _.priceText = function (p) {
        p = p || '';
        p = p + '';
        if (!p) {
            return '0.00';
        }
        var dot = -1;
        if ((dot = p.indexOf('.')) !== -1) {
            p = p.substring(0, dot);
        }
        if (p.length < 3) {
            return '0.' + ('000' + (p || '')).substr(-2);
        } else {
            return p.substring(0, p.length - 2) + '.' + p.substring(p.length - 2);
        }
    };

    _.jsonHtml = function (obj) {
        if (!obj) {
            return '';
        }
        if (typeof obj === 'string') {
            try {
                obj = JSON.parse(obj);
            } catch (e) {
                return obj;
            }
        }
        try {
            return JSON.stringify(obj, null, 4).replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
        } catch (e) {}
    };
});
