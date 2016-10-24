/**
 * @file tab
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(['jquery', 'text!widgets/tab/tab.tpl', 'underscore'], function ($, tpl, _) {
    // data:[{title,body,id}]
    // className
    // onshow
    function tab(cfg) {
        var $container = cfg.container && $(cfg.container);
        _.each(cfg.data, function (it, i) {
            if (!it.id) {
                it.id = _.uniqueId('tab_');
            }

        });
        var $tab = $(_.template(tpl)({
            className: cfg.className,
            data: cfg.data
        }));
        var $content = $tab.find('.bd-tab-content');
        var bodytpl = '<div class="bd-tab-panel<%= i===0?" active":"" %>" id="<%= it.id %>"></div>';
        _.each(cfg.data, function (it, i) {
            var p = $(_.template(bodytpl)({
                it: it,
                i: i
            })).appendTo($content);
            if (it.body) {
                p.append($(it.body));
            }
        });
        // bind events
        var tabs = $tab.find('.bd-tab-nav li a');
        tabs.click(function () {
            tabs.removeClass('active');
            $(this).addClass('active');
            $tab.find('.bd-tab-panel').removeClass('active');
            var body = $($(this).attr('href'));
            body.addClass('active');
            cfg.onshow && cfg.onshow.call($tab, $(this).text(), body);
            return false;
        });
        if ($container) {
            $container.append($tab);
        }
        this.wrap = $tab;
    }
    _.extend(tab.prototype, {
        renderTab: function (index, body) {
            this.wrap.find('.bd-tab-panel').eq(index).html('').append($(body));
        },
        getTab: function (index) {
            return this.wrap.find('.bd-tab-panel').eq(index);
        },
        setActive: function (index) {
            this.wrap.find('.bd-tab-nav li a').eq(index).click();
        }
    });
    return tab;
});
