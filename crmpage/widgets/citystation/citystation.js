/**
 * @file  城市-车站 选择panel
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'widgets/tab/tab',
        'widgets/citystation/citytips',
        'widgets/citystation/station',
        'underscore',
        'common'
    ],
    function ($, env, Tab, Citytips, Station, _) {
        function citystation(cfg) {
            var el = this.el = $(cfg.el);
            this.cfg = cfg;
            this.names = cfg.names;
            var wrap = $('<div class="citystation-tip font-yh" style="display: none;"></div>');
            wrap.insertAfter(el);
            var self = this;
            var panel;
            var citycmp;
            var stationcmp;
            el.data('cmp', this);
            // console.log(cfg.url);
            citycmp = this.citycmp = new Citytips({
                lazy: cfg.lazy,
                target: el,
                url: cfg.url || (env.cserver + '/cserver/city/getstartcitys'),
                change: function (value, prev) {
                    panel.setActive(1);
                    self.setCity();
                    stationcmp.loadData({
                        url: env.server3 + '/station/getstationbyregionId?regionid=' + value.code + '&flag=' + cfg.flag
                    });
                    cfg.change && cfg.change.call(self, citycmp.getValue(), stationcmp.getValue());
                    cfg.citychange && cfg.citychange.call(self, citycmp.getValue(), stationcmp.getValue());
                }
            });
            stationcmp = this.stationcmp = new Station({
                change: function (value, prev) {
                    self.setStation();
                    cfg.change && cfg.change.call(self, citycmp.getValue(), stationcmp.getValue());
                    cfg.stationchange && cfg.stationchange.call(self, citycmp.getValue(), stationcmp.getValue());
                }
            });
            panel = this.tabpanel = new Tab({
                container: wrap,
                data: [{
                    title: '城市',
                    body: citycmp.wrap
                }, {
                    title: '车站',
                    body: stationcmp.wrap
                }]
            });

            var timeout = 0;
            el.focus(function () {
                    $('.citystation-tip').hide();
                    wrap.show();
                })
                .click(function () {
                    return false;
                })
                .keydown(function () {
                    $('.citystation-tip').hide();
                });
            $(window).click(function () {
                $('.citystation-tip').hide();
            });
            el.change(function () {
                if (!$(this).val()) {
                    self.reset();
                }
            });
        }
        _.extend(citystation.prototype, {
            reloadCity: function (url) {
                this.clear();
                this.citycmp.loadData({
                    url: url
                });
            },
            clear: function () {
                this.reset();
                this.citycmp.clear();
                this.stationcmp.clear();
                this.tabpanel.setActive(0);
            },
            setCity: function () {
                var el = this.el;
                var cv = this.citycmp.getValue();
                el.val(cv.label ? (cv.label + '/') : '');
                var names = this.names;
                el.parent().find('input[name="' + names.cityname + '"]').val(cv.label);
                el.parent().find('input[name="' + names.cityvalue + '"]').val(cv.code);
                el.parent().find('input[name="' + names.stationname + '"]').val('');
                el.parent().find('input[name="' + names.stationvalue + '"]').val('');
                this.stationcmp.clear();
            },
            setStation: function () {
                var el = this.el;
                var cv = this.citycmp.getValue();
                var sv = this.stationcmp.getValue();
                el.val((cv.label ? (cv.label + '/') : '') + (sv.label || ''));
                var names = this.names;
                el.parent().find('input[name="' + names.stationname + '"]').val(sv.label);
                el.parent().find('input[name="' + names.stationvalue + '"]').val(sv.code);
            },
            getValue: function () {
                return {
                    city: this.citycmp.getValue(),
                    station: this.stationcmp.getValue()
                };
            },
            // code label
            setValue: function (city, station) {
                this.citycmp.setValue(city);
                this.stationcmp.setValue(station);
                this.setStation();
            },
            // 清空操作
            reset: function () {
                var el = this.el;
                el.val('');
                var names = this.names;
                el.parent().find('input[name="' + names.cityname + '"]').val('');
                el.parent().find('input[name="' + names.cityvalue + '"]').val('');
                el.parent().find('input[name="' + names.stationname + '"]').val('');
                el.parent().find('input[name="' + names.stationvalue + '"]').val('');
                this.citycmp.reset();
                this.stationcmp.reset();
            }
        });
        return citystation;
    });
