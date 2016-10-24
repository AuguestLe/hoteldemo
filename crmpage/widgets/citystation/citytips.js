/**
 * @file 城市输入框tip
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'widgets/sortword/sortword',
        'text!widgets/citystation/citytips.tpl',
        'underscore',
        'common'
    ],
    function (
        $,
        env,
        sortword,
        tpl,
        _) {
        var createCitiesTip = function (data) {
            var html = _.template(tpl)(sortword({
                data: data
            }));
            var $tip = $(html);
            return $tip;
        };

        var loadData = function (url, callback) {
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
        };

        function cityTips(cfg) {
            this.wrap = $('<div class="city-tip-wrap"></div>');
            this.cfg = cfg;
            this.container = cfg.container && $(cfg.container);
            if (!cfg.lazy) {
                this.loadData();
            }
            this.$el = $(cfg.target);
        }
        _.extend(cityTips.prototype, {
            loadData: function (options) {
                var wrap = this.wrap;
                wrap.html('');
                var url = options && options.url || this.cfg.url;
                var changehandler = this.cfg.change;
                var el = this.$el;
                var self = this;
                loadData(url, function (data) {
                    var store = [];
                    // 兼容接口
                    var cities = data.data.cities || data.data;
                    $.each(cities, function (i, it) {
                        store.push({
                            label: it.cnname,
                            value: it.cnname,
                            name: it.name,
                            code: it.regionid
                        });
                    });
                    self.store = store;
                    store.sort(function (a, b) {
                        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                    });
                    var $tip = createCitiesTip(store);
                    wrap.append($tip);
                    self.container && self.container.append($tip);
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
                        $tip.find('.city-item').removeClass('active');
                        $(this).addClass('active');
                        var value = {
                            code: $(this).attr('data-cityCode'),
                            label: $(this).attr('title')
                        };
                        var prev = self._value;
                        self._value = value;
                        if (!prev || prev.code !== value.code) {
                            changehandler && changehandler.call(self, value, prev);
                        }
                    });
                });
            },
            getValue: function () {
                return this._value;
            },
            setValue: function (value) {
                this._value = value;
            },
            reset: function () {
                this._value = null;
                this.wrap.find('.active').removeClass('active');
            },
            clear: function () {
                this._value = null;
                this.wrap.html('');
            }

        });
        return cityTips;
    });
