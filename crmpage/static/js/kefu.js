/**
 * @file mis后台管理页面脚本 - 客服
 * @author zhajiashun(zhajiashun@baidu.com)
 */
require(['jquery'], function () {
    $(function () {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var active = e.target;
            loadModule($(active).attr('data-module'));
        });

        function loadModule(mod) {
            if (mod) {
                require(['kefu/module/' + mod + '/' + mod], function (m) {
                    m.init();
                });
            }
        }
        // init the active
        loadModule($('.menus .active a').attr('data-module'));
    });
});
