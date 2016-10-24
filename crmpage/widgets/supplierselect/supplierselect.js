/**
 * @file 城市输入框下拉提示
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'text!widgets/supplierselect/supplierselect.tpl',
        'underscore',
        'common'
    ],
    function (
        $,
        env,
        tpl,
        _) {
        return {
            getHtml: function (callback) {
                var url = env.server2 + '/supplier/supplierlist';
                $._ajax({
                        url: url,
                        dataType: 'jsonp',
                        jsonp: 'callback'
                    })
                    .success(function (data, status, xhr) {
                        if (!data || data.errno !== 0 || !data.data || !data.data || !data.data.length) {
                            callback(_.template(tpl)(data));
                        } else {
                            callback(0);
                        }
                    })
                    .error(function (xhr, status, error) {
                        callback(0);
                    });
            }
        };
    });
