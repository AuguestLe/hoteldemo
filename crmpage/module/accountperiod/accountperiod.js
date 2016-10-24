/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/accountperiod/accountperiod.tpl',
    'jquery',
    'datapak',
    'toomode'
], function (
    env,
    accountperiodtpl,
    $,Pikaday,consol) {
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
            container.html(accountperiodtpl);
            var getuurl=model.geturlparms();
       		var testchaog={
				'orderNo':consol.getCookie('orderNo'),
				//'hotelId':getuurl.hotelID,
				'idToken':getuurl.idToken,
				'from':getuurl.from,
			}
   			model.geitoarlist(testchaog,getuurl);
        }

    };
    model = {
       	geitoarlist:function(testchaog,getuurl){
       		$('#accountperiod tbody').html('');
       		$('#accouthead h2 span').html(consol.getCookie('accctime'));
       		$.ajax({
                //url: env.server2+'/misserver/hotel/batchbill',
                url: env.server2+'/hotelself/batch/bill',
                //url:'test/order_detail.json',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function (result) {
            	console.log(result);
                $.each(result.data.orderList, function(index,content){    
	                var settablist=$(
		       			'<tr>'+
						'	<td>'+'应付房费'+'</td>'+
						'	<td>'+content.srcOrderId+'</td>'+
						'	<td>'+content.contactName+'</td>'+
						'	<td>'+consol.UnixToDate(content.checkinTime,true,8)+'</td>'+
						'	<td>'+consol.UnixToDate(content.checkoutTime,true,8)+'</td>'+
						'	<td>'+parseFloat(content.stayNights)*parseFloat(content.roomNum)+'</td>'+
						'	<td>'+content.currency+'</td>'+
						'	<td>'+consol.moneyrefun(content.settlementPrice)+'</td>'+
						'</tr>'
		       		);
	                settablist.appendTo($('#accoutlist tbody'));
                });
                var setheadlist=$(
		       			'<tr>'+
						'	<td>'+result.data.batchInfo.hotelName+'</td>'+
						'	<td>'+consol.moneyrefun((parseInt(result.data.batchInfo.amount)+parseInt(result.data.batchInfo.withholding)))+'</td>'+
						'	<td>'+consol.moneyrefun(result.data.batchInfo.withholding)+'</td>'+
						'	<td>'+'CNY'+'</td>'+
						'	<td>'+consol.moneyrefun(result.data.batchInfo.amount)+'</td>'+
						'</tr>'
		       		);
		       	setheadlist.appendTo($('#arcounhead tbody'));	
            })    
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
    	},
    	formats:function(timefou){
    		var time = new Date(timefou);
			var y = time.getFullYear();
			var m = time.getMonth()+1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y+'-'+this.addtime(m)+'-'+this.addtime(d)+' '+this.addtime(h)+':'+this.addtime(mm)+':'+this.addtime(s);
    	},
    	addtime:function (m){
    		return m<10?'0'+m:m 
    	}
    };
    return view;
});
