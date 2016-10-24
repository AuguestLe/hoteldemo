/**
 * @file  出发城市和到达城市联动选择
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'widgets/citystation/citystation',
        'common'
    ],
    function ($, env, Citystation) {
        var defaults = {
            names: {
                departure: {
                    cityname: 'departureregion',
                    cityvalue: 'departureregionid',
                    stationname: 'departurestation',
                    stationvalue: 'departurestationid'
                },
                arrival: {
                    cityname: 'arrivalregion',
                    cityvalue: 'arrivalregionid',
                    stationname: 'arrivalstation',
                    stationvalue: 'arrivalstationid'
                }
            }
        };
        return function (cfg) {
            cfg = $.extend({}, defaults, cfg, true);
            var start = cfg.departure;
            var end = cfg.arrival;
            var arroptions = {
                flag: '2,3',
                el: end,
                names: cfg.names.arrival,
                lazy: true
            };
            if (cfg.all) {
                arroptions.url = env.server3 + '/station/getarrivalregions';
                arroptions.lazy = false;
            }
            var startcityid = $(start).parent().find('input[name="' + cfg.names.departure.cityvalue + '"]').val();
            if (startcityid && !cfg.all) {
                arroptions.url = env.cserver + '/cserver/city/getarrivalcitys?startcityid=' + startcityid;
            }
            var arrivalCmp = this.arrivalCmp = new Citystation(arroptions);
            var soptions = {
                lazy: false,
                el: start,
                names: cfg.names.departure,
                flag: '1,2',
                citychange: function (city, station) {
                    !cfg.all
                    && arrivalCmp.reloadCity(env.cserver + '/cserver/city/getarrivalcitys?startcityid=' + city.code);
                }
            };
            cfg.all && (soptions.url = env.server3 + '/station/getstartregions');
            var startCmp = this.startCmp = new Citystation(soptions);
        };
    });
