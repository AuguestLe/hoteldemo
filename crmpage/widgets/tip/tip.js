/**
 * @file tip
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(['jquery'], function ($) {
    // 相对el元素
    var position = ['left bottom', 'left top', 'right top', 'right bottom'];
    return {
        wrap: function (cfg) {
            var $tip = $('<div class="bd-tip"></div>').appendTo(document.body);
            cfg.body && $(cfg.body).appendTo($tip);
            return $tip;
        }
    };
});
