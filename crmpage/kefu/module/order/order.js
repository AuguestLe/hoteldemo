/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!kefu/module/order/editSmsPanel.tpl',
    'text!kefu/module/order/orderquery.tpl',
    'datepicker',
    'paginator',
    'underscore'
], function (
    env,
    smstpl,
    orderquerytpl,
    $, $1, _) {
    var ORDERS_STATUS = ['未支付', '已支付(待出票)', '出票成功', '出票失败（退款中）', '退款成功', '订单已取消'];
    var view;
    var model;
    view = {
        init: function () {
            if (this.inited) {
                return;
            }
            this.inited = 1;
            $('#orderquery').html(orderquerytpl);
            $('#editSmsPanel').html(smstpl);

            $('#orderquery .input-daterange').datepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                orientation: 'top auto'
            });
            // bind events
            $('#query').bind('click', function () {
                model.reset();
                var params = {};
                var data = $('#orderquery .form-horizontal').serializeArray();
                _.each(data, function (it) {
                    if (it.value) {
                        if (params.hasOwnProperty(it.name)) {
                            params[it.name] = [it.value].concat(params[it.name]);
                        } else {
                            params[it.name] = it.value;
                        }
                    }
                });
                _.each(params, function (v, k, l) {
                    if (_.isArray(v)) {
                        l[k] = v.sort().join(',');
                    }
                });
                switch (params.accounttype) {
                    case '1':
                    case '2':
                    case '3':
                        break;
                    case '4':
                        params.orderid = params.accountnumber;
                        params.accountnumber = params.accounttype = null;
                        break;
                    case '5':
                        params.outerorderid = params.accountnumber;
                        params.accountnumber = params.accounttype = null;
                        break;
                    case '6':
                        params.passengerphone = params.accountnumber;
                        params.accountnumber = params.accounttype = null;
                        break;
                    case '7':
                        params.fetchuserphone = params.accountnumber;
                        params.accountnumber = params.accounttype = null;
                        break;
                }
                model.params = params;

                model.loadData();
            });
            $('#export').bind('click', function () {});

            // send sms
            $('#sendsms').unbind('.sms').bind('click.sms', function () {
                var order = $('#sendsms').data('order');
                var smsModal = view.getSmsModal();
                var msg = view.getSmsModal().find('.msg');
                var params = {
                    phone: $('#smsphone').val(),
                    userid: order.userid,
                    orderid: order.orderid,
                    scheduleid: order.scheduleid,
                    smstype: order && order.fetchuser.type,
                    content: $('#smsmsg').val()
                };
                $._ajax({
                    url: env.server + '/sms/sendordermsg',
                    jsonp: 'callback',
                    data: params,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (!data || data.errno + '' !== '0') {
                            msg[0].className = 'text-warning bg-warning msg';
                            msg.text(data.msg || '发送失败').fadeIn();
                            setTimeout(function () {
                                msg.fadeOut();
                            }, 3000);
                        } else {
                            msg[0].className = 'bg-success text-success msg';
                            msg.text('发送成功').fadeIn(function () {
                                setTimeout(function () {
                                    view.getSmsModal().modal('hide');
                                    msg.hide();
                                }, 500);
                            });
                        }

                    },
                    error: function () {
                        msg[0].className = 'text-warning bg-warning msg';
                        msg.text('发送失败').fadeIn();
                    }
                });
            });
        },
        render: function (data) {
            var html = [
                '<table class="table table-hover">',
                '<thead>',
                '<tr>',
                '<th>订单编号</th>',
                '<th>车次信息</th>',
                '<th>取票人</th>',
                '<th>取票手机</th>',
                '<th>取票证件</th>',
                '<th>优惠金额</th>',
                '<th>总价</th>',
                '<th>保险价格</th>',
                '<th>服务费</th>',
                '<th>张数</th>',
                '<th>渠道</th>',
                '<th>端类型</th>',
                '<th>第三方订单</th>',
                '<th>下单时间</th>',
                '<th>发车时间</th>',
                '<th>订单状态</th>',
                '<th>合作商</th>',
                '<th>操作</th>',
                '</tr>',
                '</thead>',
                '<tbody>', (function () {
                    var h = [];
                    var ls = data.data.orders;
                    _.each(ls, function (obj) {
                        h.push([
                            '<tr>',
                            '<td class="j_orderid" data-orderid="' + obj.orderid + '">' + obj.orderid + '</td>', // 订单编号
                            '<td>' + (function () {
                                var h = [];
                                h.push('<p>' + obj.departureregionname + '-' + obj.arrivalregionname + '</p>');
                                if (obj.departurestationname && obj.arrivalstationname) {
                                    h.push('<p>' + obj.departurestationname + '-' + obj.arrivalstationname + '</p>');
                                }
                                h.push('<p>' + _.dateFormat(obj.departuretime) + '</p>');
                                return h.join('');
                            })() + '</td>', // 车次信息
                            '<td>' + (obj.fetchuser && obj.fetchuser.name || '') + '</td>', // 取票人
                            '<td>' + (obj.fetchuser && obj.fetchuser.phone || '') + '</td>', // 取票手机
                            '<td>' + (obj.fetchuser && obj.fetchuser.ids
                                && obj.fetchuser.ids.replace(/(\d{6})\d{6}(.*)/, '$1******$2') || '')
                            + '</td>', // 取票证件
                            '<td>' + (parseInt(obj.couponprice, 10) ? '优惠券:' + _.priceText(obj.couponprice) : '')
                                + (parseInt(obj.scoreprice, 10) ? '积分:'
                                + _.priceText(obj.scoreprice) : '') + '</td>', // 优惠金额
                            '<td>' + _.priceText(obj.totalprice) + '</td>', // 总价
                            '<td>' + _.priceText(obj.insuranceprice) + '</td>', // 总价
                            '<td>' + _.priceText(obj.servicefee) + '</td>', // 总价
                            '<td>' + obj.count + '</td>', // 张数
                            '<td>' + (obj.us || '--') + '</td>', // 渠道
                            '<td>' + (obj.ct || '--') + '</td>', // 端类型
                            '<td>' + (obj.outerorderid || '--') + '</td>', // 第三方订单
                            '<td>' + _.dateFormat(obj.createtime) + '</td>', // 下单时间
                            '<td>' + _.dateFormat(obj.departuretime) + '</td>', // 日期
                            '<td>' + ORDERS_STATUS[parseInt(obj.state, 10)] + '</td>', // 订单状态
                            '<td>' + (obj.suppliername || '--') + '</td>', // 合作商
                            '<td>'
                            + (obj.state + '' === '2' ? '<button class="sms btn btn-primary">发短信</button>' : '--')
                            + '</td>', // 发短信
                            '</tr>'
                        ].join(''));
                    });
                    return h.join('');
                })(),
                '</tbody>',
                '</table>'
            ];
            html.push('<div class="pull-right paginate-wrap"></div>');
            $('#orderList').html(html.join(''));
            // bind button events
            $('#orderList').find('button.sms').click(function () {
                var td = this;
                var smsModal = view.getSmsModal();
                smsModal
                    .off('show.bs.modal')
                    .on('show.bs.modal', function (e) {
                        var order = model.getOrderData($(td).closest('tr').find('.j_orderid').attr('data-orderid'));
                        if (order) {
                            smsModal.find('input[name="phone"]').val(order.fetchuser && order.fetchuser.phone || '');
                            // set order data on sendsms button
                            $._ajax({
                                url: env.server + '/sms/getordermsg',
                                data: {
                                    type: order.fetchuser.type,
                                    orderid: order.orderid,
                                    scheduleid: order.scheduleid,
                                    userid: order.userid
                                },
                                dataType: 'jsonp',
                                jsonp: 'callback'
                            }).success(function (data) {
                                var content = data && data.data && data.data.content;
                                if (content) {
                                    $('#smsmsg').text(content);
                                }
                            });
                            $('#sendsms').data('order', order);
                        }
                    })
                    .off('hide.bs.modal')
                    .on('hide.bs.modal', function (e) {
                        $('#smsmsg').text('');
                    })
                    .modal({
                        show: true
                    });
            });
            if (data.client && data.client.pagenum && data.data.totalPage) {
                $('#orderList').find('.paginate-wrap').twbsPagination({
                    totalPages: parseInt(data.data.totalPage, 10),
                    startPage: parseInt(data.client.pagenum, 10) || 1,
                    visiblePages: 5,
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '末页',
                    onPageClick: function (event, page) {
                        model.loadData({
                            pagenum: page
                        });
                    }
                });
            }

            // active
            $('#orderList').find('button').click(function () {
                if (!this.className.match(/disabled/) || !this.disabled) {
                    $('#orderList tr').removeClass('info');
                    $(this).closest('tr').addClass('info');
                }
            });
        },
        getSmsModal: function () {
            return $('#editSmsPanel');
        }

    };
    model = {
        setParam: function (name, value) {
            this.params[name] = value || '';
        },
        reset: function () {
            this.params = {};
        },
        loadData: function (params) {
            params = params || {};
            params.pagesize = 10;
            params.pagenum = params.pagenum || 1;
            params = $.extend({}, this.params, params);
            _.each(['startTime', 'endTime'], function (it) {
                if (params[it]) {
                    params[it] = params[it].split('-');
                    params[it] = new Date(
                        parseInt(params[it][0], 10),
                        parseInt(params[it][1], 10) - 1,
                        parseInt(params[it][2], 10));
                    params[it] = Math.floor(params[it].getTime() / 1000);
                }
            });
            var url = env.server3 + '/order/search';
            // var url = env.server + '/user/detail';
            $._ajax({
                    url: url,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    data: params
                })
                .success(function (data, status, xhr) {
                    if (!data || data.errno !== 0 || !data.data || !data.data.orders || !data.data.orders.length) {
                        $('#orderList').html(
                            '<p class="bg-warning text-warning msg">'
                            + (data.errno !== 0 && data.msg || '没有订单数据')
                            + '</p>'
                        );
                    } else {
                        _.each(data.data.orders, function (it) {
                            if ((it.fetchuser + '').match(/\{.*\}/)) {
                                it.fetchuser = JSON.parse(it.fetchuser);
                            }
                        });
                        model._data = data;
                        view.render(data);
                    }

                })
                .error(function (xhr, status, error) {
                    // console.log(error)
                });
        },
        getOrderData: function (id) {
            var orders = model._data.data.orders;
            var order = $.grep(orders, function (it, i) {
                return id === it.orderid + '';
            });
            return order[0];
        }
    };
    return view;
});
