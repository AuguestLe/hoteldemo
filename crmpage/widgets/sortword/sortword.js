/**
 * @file 数据按首字母排序
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(['underscore'], function (_) {
    var defaults = {
        // 数据比较的key
        sortkey: 'name'
    };
    // data,sortkey,columns
    return function (cfg, tpl) {
        var results = new Array(26);
        results = _.map(results, function () {
            return [];
        });
        var sc = 'A'.charCodeAt();
        if (cfg && cfg.data) {
            cfg = _.extend(defaults, cfg);
            var data = cfg.data;
            var sortkey = cfg.sortkey;
            _.each(data, function (it) {
                var n = it[sortkey];
                n && results[n.toUpperCase().charCodeAt(0) - sc].push(it);
            });
            var tabTitle = ['ABCDE', 'FGHJ', 'KLMNP', 'QRST', 'WXYZ'];
            var index = [
                [],
                [],
                [],
                [],
                []
            ];
            var ret = [
                [],
                [],
                [],
                [],
                []
            ];
            _.each(results, function (it, i) {
                var c = String.fromCharCode(i + sc);
                if (it.length) {
                    if (c.match(/[ABCDE]/)) {
                        ret[0].push(it);
                        index[0].push(c);
                    } else if (c.match(/[FGHJ]/)) {
                        ret[1].push(it);
                        index[1].push(c);
                    } else if (c.match(/[KLMNP]/)) {
                        ret[2].push(it);
                        index[2].push(c);
                    } else if (c.match(/[QRST]/)) {
                        ret[3].push(it);
                        index[3].push(c);
                    } else if (c.match(/[WXYZ]/)) {
                        ret[4].push(it);
                        index[4].push(c);
                    }
                }
            });
            var n = 0;
            while (n < index.length) {
                if (!index[n].length) {
                    index.splice(n, 1);
                    ret.splice(n, 1);
                    tabTitle.splice(n, 1);
                    continue;
                } else {
                    n++;
                }
            }
            return {
                index: index,
                data: ret,
                tabTitle: tabTitle
            };
        }
        return null;
    };
});
