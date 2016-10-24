/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/ordermandetal/ordermandetal.tpl',
    'jquery',
    'toomode'
], function (
    env,
    ordermandetaltpl,
    $,consol) {
    var view;
    var model;
    view = {
        init: function (data, container) {
            console.log(data)
            if (this.inited) {
                return;
            }
            this.inited = 0;
            this.container = container;
            // container.html(_.template(orderquerytpl)(data || {}));
            container.html(ordermandetaltpl);
            var getuurl=consol.geturlparms();
            var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'orderId':consol.getCookie('baiduOrderId')
			}
            console.log(testchaog);
   			model.geitoarlist(testchaog,getuurl);
        }

    };
    model = {
       	geitoarlist:function(testchaog,getuurl){
       		$.ajax({
                url: env.server+'/hotelself/order/detail',
                data: testchaog,
                type : 'GET',  //提交方式  
                dataType: 'json'
            }).success(function (result) {
            	console.log(result);
            	if(result.errno===0){
	            	$('#ordermandetal').find('td').eq(0).html(result.data.srcOrderId);
	            	$('#ordermandetal').find('td').eq(1).html(result.data.hotelName);
	            	$('#ordermandetal').find('td').eq(2).html(result.data.roomType);
	            	$('#ordermandetal').find('td').eq(3).html(parseFloat(result.data.stayNights)*parseFloat(result.data.roomNum));
	            	$('#ordermandetal').find('td').eq(4).html(consol.moneyrefun(result.data.amountPrice));
	            	$('#ordermandetal').find('td').eq(5).html(parseFloat(result.data.commisionRatio)*100+'%');
	            	$('#ordermandetal').find('td').eq(6).html(consol.moneyrefun(result.data.settlementPrice));
	            	$('#ordermandetal').find('td').eq(7).html(consol.UnixToDate(result.data.createTime,true,8));
	            	$('#ordermandetal').find('td').eq(8).html(consol.UnixToDate(result.data.checkinTime,true,8));
	            	$('#ordermandetal').find('td').eq(9).html(consol.UnixToDate(result.data.checkoutTime,true,8));
	            	//$('#ordermandetal').find('td').eq(10).html(orderstu);
            	}else{
            		alert(result.msg);
            	}
            	
            })  
            $('#orderdetbtn').click(function(){
            	consol.delCookie('baiduOrderId');
            });
       	},
       	geturlparms:function(url){
	        var vars = {},
	            hash, hashes, i;
	
	        url = url || window.location.href;
	        // 没有参数的情况
	        if (url.indexOf('?') == -1) {
	            return vars;
	        }
	        hashes = url.slice(url.indexOf('?') + 1).split('&');
	        
	        for (i = 0; i < hashes.length; i++) {
	            if (!hashes[i] || hashes[i].indexOf('=') == -1) {
	                continue;
	            }
	            hash = hashes[i].split('=');
	            vars[hash[0]] = (hash[1].indexOf("#") != -1) ? hash[1].slice(0, hash[1].indexOf("#")): hash[1];
	        }
	        return vars;
    	}
    };
    return view;
});
