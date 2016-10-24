/**
 * @file  城市区域选择
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(
    [
        'jquery',
        'env',
        'bloodhound',
        'typeahead.js',
        'underscore',
        'common'
    ],
    function ($, env, Bloodhound, $2, _) {
        function RegionTypeahead(cfg) {
            var el = this.el = $(cfg.el);
            var idName = this.idName = cfg.idName || 'regionid';
            this.cfg = cfg;
            var hiddenName = this.hiddenName = cfg.hiddenName;
            this.container = cfg.container || $(document.body);
            var self = this;
            var regions = this.store = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('cnname'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                identify: function (obj) {
                    return obj[idName];
                },
                remote: {
                    url: cfg.url || env.server2 + '/station/fuzzyquery?word=%QUERY',
                    // url: 'test/data.json?q=%QUERY',
                    wildcard: '%QUERY',
                    transform: function (res) {
                        return res.data.data;
                    },
                    prepare: function (query, settings) {
                        settings.dataType = 'jsonp';
                        settings.jsonp = 'callback';
                        var url = settings.url;
                        var data = settings.data = settings.data || {};
                        settings.url = url.replace(/\%QUERY/, query);
                        return settings;
                    }
                }
            });
            this.el.typeahead({
                    highlight: true,
                    hint: false
                }, {
                    name: 'regions',
                    source: regions,
                    display: 'cnname',
                    limit: 100,
                    templates: {
                        suggestion: cfg.suggestion || function (r) {
                            return '<p>' + r.cnname + '</p>';
                        }
                    }
                })
                .on('typeahead:selected', function (e, datum) {
                    var regionid = datum[idName];
                    self._value = datum;
                    self.$('input[name="' + hiddenName + '"]').val(regionid);
                    // 联动影响
                    if (cfg.linkTo !== false) {
                        var childrenregionid = self.$('select[name="childrenregionid"]').val();
                        $._ajax({
                            url: env.server2 + '/station/fuzzyquery?regionid=' + regionid,
                            dataType: 'jsonp',
                            jsonp: 'callback'
                        }).success(function (data) {
                            if (data.errno === 0) {
                                var tpl = _.template(
                                    '<option value="<%= regionid %>" <%= selected?"selected":"" %>>'
                                    + '<%= cnname %>'
                                    + '</option>'
                                    );
                                var html = ['<option value="">选择区、县</option>'];
                                _.each(data.data.data, function (it, i) {
                                    it.selected = parseInt(childrenregionid, 10) === parseInt(it[idName], 10) ? 1 : 0;
                                    html.push(tpl(it));
                                });
                                self.$('select[name="childrenregionid"]').html(html.join(''));
                            }
                        });
                    }
                })
                .on('typeahead:change', function (e, data) {
                    if (self._value && data) {
                        self.el.val(self._value.cnname);
                    }
                    if (!data) {
                        self.clean();
                    }
                });
            // 联动select change事件
            if (cfg.linkTo !== false) {
                var sel = self.$('select[name="childrenregionid"]');
                var selname = self.$('input[name="childrenregionname"]');
                sel.on('change', function () {
                    var selv = sel.val();
                    if (selv) {
                        selname.val(sel.find('option[value="' + selv + '"]').text());
                    } else {
                        selname.val('');
                    }
                });
            }
            // update
            this.update();
        }
        _.extend(RegionTypeahead.prototype, {
            update: function () {
                var data = {};
                var idName = this.idName;
                if (this.hiddenName) {
                    data[idName] = this.$('input[name="' + this.hiddenName + '"]').val();
                }
                if (!data[idName] || !$.trim(this.el.val())) {
                    return this.clean();
                } else if (this._value && this._value[idName] + '' === data[idName] + '') {
                    data.cnname = this._value.cnname;
                    this.el.val(data.cnname);
                } else {
                    data.cnname = this.el.val();
                }
                if (this.cfg.linkTo !== false) {
                    this.el.trigger('typeahead:selected', [data]);
                }
                this._value = data;
            },
            clean: function () {
                this._value = {};
                this.el.val('');
                this.$('input[name="' + this.hiddenName + '"]').val('');
                if (this.cfg.linkTo !== false) {
                    this.$('select[name="childrenregionid"]').html('<option value="">选择区、县</option>');
                    this.$('input[name="childrenregionname"]').val('');
                }
            },
            $: function (selector) {
                return this.container.find(selector);
            }
        });
        return RegionTypeahead;
    });
