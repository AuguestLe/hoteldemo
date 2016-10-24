/**
 * @file 城市输入框下拉提示
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'jquery',
    'env',
    'widgets/sortword/sortword',
    'text!widgets/citytips/citytips.tpl',
    'underscore',
    'common'],
    function (
        $,
        env,
        sortword,
        tpl,
        _) {
    var createCitiesTip = function (el, data, options) {
        if (el.next().hasClass('city-tip')) {
            el.next().remove();
        }
        var html = _.template(tpl)(sortword({
            data: data
        }));
        var $tip = $(html).insertAfter(el);
        return $tip;
    };


    var cityTips = {
        loadData: function (url, callback) {
            $._ajax({
                    url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback'
                })
                .success(function (data) {
                    if (data && data.errno === 0) {
                        callback(data);
                    }
                });
        },
        init: function (el, options) {
            el = $(el);
            options = options || {};
            cityTips.loadData(options.url, function (data) {
                var store = [];
                $.each(data.data.cities, function (i, it) {
                    store.push({
                        label: it.cnname,
                        value: it.cnname,
                        name: it.name,
                        code: it.regionid
                    });
                });
                options.store = store;
                store.sort(function (a, b) {
                    return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                });
                var $tip = createCitiesTip(el, store, options);
                $(window).click(function () {
                    $('.city-tip').hide();
                });
                $tip.click(function () {
                    return false;
                });
                $tip.find('.py-idx a').click(function () {
                    $tip.find('.py-idx a').removeClass('active');
                    $(this).addClass('active');
                    $tip.find('.group').hide();
                    $tip.find('.group[data-index="' + $(this).attr('data-index') + '"]').show();
                });
                $tip.find('.city-item').click(function () {
                    var prev = el.attr('data-cityCode');
                    el.val($(this).attr('title'));
                    var newcode = $(this).attr('data-cityCode');
                    el.attr('data-cityCode', newcode);
                    if (prev !== newcode) {
                        if (options.hiddenValue) {
                            $(options.hiddenValue).val(newcode);
                        }
                        el.trigger('change', [newcode, $(this).attr('title')]);
                    }
                    $tip.hide();
                });
                var timeout = 0;
                el.focus(function () {
                        $('.city-tip').hide();
                        $tip.show();
                    })
                    .click(function () {
                        return false;
                    })
                    .keydown(function () {
                        $('.city-tip').hide();
                    });
            });

        }
    };
    return cityTips;
});
