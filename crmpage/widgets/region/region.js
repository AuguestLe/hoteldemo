/**
 * @file  城市区域选择
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'widgets/tab/tab',
        'widgets/sortword/sortword',
        'text!widgets/citystation/citytips.tpl',
        'underscore',
        'common'
    ],
    function ($, env, Tab, sortword, tpl, _) {
        function Region(cfg) {
            var el = this.el = $(cfg.el);
            this.cfg = cfg;
            this.names = cfg.names;
            var wrap = $('<div class="region-tip font-yh" style="display: none;"></div>');
            wrap.insertAfter(el);
            var self = this;
            var panel;
            panel = this.tabpanel = new Tab({
                container: wrap,
                data: [{
                    title: '省',
                    body: ''
                }, {
                    title: '市',
                    body: ''
                }, {
                    title: '区/县',
                    body: ''
                }]
            });

            // setvalue
            panel.wrap.on('click', '.it-content a', function () {
                var hiddenvalue = $(cfg.hiddenValue);
                if (!hiddenvalue.length) {
                    hiddenvalue = el.parent().find('input[type="hidden"]');
                    if (!hiddenvalue.length || hiddenvalue[0].type !== 'hidden') {
                        hiddenvalue = null;
                    } else {
                        cfg.hiddenValue = hiddenvalue;
                    }
                    // console.log(hiddenvalue[0].name)
                }
                el.val($(this).attr('title'));
                hiddenvalue && hiddenvalue.val($(this).attr('data-citycode'));
            });
            panel.wrap.on('click', '.py-idx a', function () {
                var $tip = $(this).closest('.city-tip-wrap');
                $tip.find('.py-idx a').removeClass('active');
                $(this).addClass('active');
                $tip.find('.group').hide();
                $tip.find('.group[data-index="' + $(this).attr('data-index') + '"]').show();
            });
            // province
            var loadRegions = function (parentid, index) {
                var url = env.server3 + '/region/getchildregion';
                // console.log(parentid)
                if (parentid) {
                    url += '?parentid=' + parentid;
                }
                $._ajax({
                        url: url,
                        dataType: 'jsonp',
                        jsonp: 'callback'
                    })
                    .success(function (data) {
                        if (data && data.errno === 0) {
                            _.each(data.data, function (it) {
                                it.label = it.cnname;
                                it.code = it.regionid;
                            });
                            var html = _.template(tpl)(sortword({
                                data: data.data
                            }));
                            var wrap = $('<div class="city-tip-wrap"></div>').append($(html));
                            panel.renderTab(index, wrap);
                            if (index < 2) {
                                wrap.find('.it-content a').click(function () {
                                    panel.setActive(index + 1);
                                    loadRegions($(this).attr('data-citycode'), index + 1);
                                });
                            }
                        }
                    });
            };
            // init
            loadRegions(null, 0);
            $('.region-tip').click(function () {
                return false;
            });
            var timeout = 0;
            el.focus(function () {
                    $('.region-tip').hide();
                    wrap.show();
                })
                .click(function () {
                    return false;
                })
                .keydown(function () {
                    $('.region-tip').hide();
                });
            $(window).click(function () {
                $('.region-tip').hide();
            });
            el.change(function () {
                if (!$(this).val()) {
                    $(cfg.hiddenValue).val('');
                }
            });
        }
        _.extend(Region.prototype, {
            setValue: function () {

            }
        });
        return Region;
    });
