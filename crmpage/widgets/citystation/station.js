/**
 * @file 车站tip
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'text!widgets/citystation/station.tpl',
        'underscore',
        'common'
    ],
    function (
        $,
        env,
        tpl,
        _) {
        var loadData = function (url, callback) {
            $._ajax({
                    url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback'
                })
                .success(function (data) {
                    if (data && data.errno === 0) {
                        // 按供应商分组
                        var stations = {};
                        data = _.each(data.data, function (it) {
                            it.label = it.cnname;
                            it.code = it.stationid;
                            if (!stations[it.supplierName]) {
                                stations[it.supplierName] = [];
                            }
                            stations[it.supplierName].push(it);
                        });
                        callback({
                            data: data,
                            stations: stations
                        });
                    }
                });
        };

        function station(cfg) {
            this.wrap = $('<div class="station-tip-wrap"></div>');
            this.cfg = cfg;
        }
        _.extend(station.prototype, {
            loadData: function (options) {
                var wrap = this.wrap;
                wrap.html('');
                var url = options && options.url || this.cfg.url;
                var changehandler = this.cfg.change;
                var self = this;
                loadData(options.url, function (data) {
                    wrap.append($(_.template(tpl)(data)));
                    wrap.find('.station-ls li span').click(function () {
                        wrap.find('li span').removeClass('active');
                        $(this).addClass('active');
                        var value = {
                            code: $(this).attr('data-stationCode'),
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
            clear: function () {
                this._value = null;
                this.wrap.html('');
            },
            reset: function () {
                this._value = null;
                this.wrap.find('.active').removeClass('active');
            }
        });
        return station;
    });
