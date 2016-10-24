/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/ordermang/ordermang.tpl',
    'jquery',
    'datapak',
    'toomode',
    'jqpage'
], function (
    env,
    ordermangtpl,
    $,Pikaday,consol,pagination) {
    var view;
    var model;
    view = {
        init: function (data, container) {
            if (this.inited) {
                return;
            }
            this.inited = 1;
            this.container = container;
            // container.html(_.template(orderquerytpl)(data || {}));
            container.html(ordermangtpl);
            var getuurl=model.geturlparms();
       		var odtestchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				// 'hotelId':getuurl.hotelID,
			}
       		model.pageShow(odtestchaog);
   			//model.geitoarlist(odtestchaog,getuurl);
   			var orderstart=$('#ordertimein');
   			var orderend=$('#ordertimout');
   			var odpicker = new Pikaday({
		        field: document.getElementById('ordertimein'),
		        firstDay: 1,
		        maxDate: new Date(2040, 12, 31),
		        yearRange: [2016,2040],
		        onSelect: function(date) {
			        orderstart.value = odpicker.toString();
			    }
		    });
		    var odpickerend = new Pikaday({
		        field: document.getElementById('ordertimout'),
		        firstDay: 1,
		        maxDate: new Date(2040, 12, 31),
		        yearRange: [2016,2040],
		        onSelect: function(date) {
			        orderend.value = odpickerend.toString();
			    }
		    });
		    model.sethotsear(odtestchaog,getuurl);
		    var orderHeight=$(window).height()-$('#ordermang .header').outerHeight(true)-100;
			$('#ordermang .conent').css('height',orderHeight+'px');
			$(window).resize(function(){
				var orderHeight=$(window).height()-$('#ordermang .header').outerHeight(true)-100;
				$('#ordermang .conent').css('height',orderHeight+'px');
			})
        }

    };
    model = {
    	pageShow:function(testchaog){
    		var pageIndex=consol.getCookie('ordrsuNum')||1; // 页索引
       		var pageSize=50; // 每页显示的条数
       		var pageNum=0; // 总页数
       		var _this=this;
       		testchaog.pageIdx=pageIndex;
	        testchaog.pageSize=pageSize;
	        model.geitoarlist(testchaog);
			$.ajax({
                url: env.server+'/hotelself/order/list',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
           }).success(function(result){
           		// pageNum=result.data.pageNum;
           		// sumgNum=result.data.dataNum;
           		sumgNum=Math.ceil(result.data.pageSize)*pageSize;
           		showlist(sumgNum);
           	});       		
       		function showlist(sumgNum){
       			console.log(sumgNum);
       			$("#ordmgpagnate").pagination({  
					// 回调
					callback:PageCallback,
					totalData:sumgNum,
					showData:50,
		            //pageCount:sumgNum,
		            count:1,
		            current:pageIndex,
				    coping:true,
				    jump:true,
				    homePage:'首页',
				    endPage:'末页',
				    prevContent:'上页',
				    nextContent:'下页'
		        });
       		};
       		function PageCallback(api){
	        	testchaog.pageIdx=api.getCurrent();
	        	consol.setCookie('ordrsuNum',api.getCurrent());
	        	model.geitoarlist(testchaog);
	        };
    	},
       	geitoarlist:function(odtestchaog,getuurl){
       		// $('.hotelname').val(decodeURI(getuurl.hotelName));
       		$('#ordermanlist tbody').html('');
       		$.ajax({
                url: env.server+'/hotelself/order/list',
                //url:'test/order_detail.json',
                data: odtestchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function (result) {
            	console.log(result);
                $.each(result.data.list, function(index,content){    
                	var orderstu='';
                	if(content.isSettledUp){
                		orderstu='已结算';
                	}else{
                		orderstu='未结算';
                	};
	                var settablist=$(
		       			'<tr>'+
						'	<td>'+consol.UnixToDate(content.createTime,true,8)+'</td>'+
						'	<td><a class="ordercok" data-module="ordermandetal" href="#/ordermandetal">'+content.srcOrderId+'</a><input class="ordermysrc" type="hidden"></td>'+
						'	<td>'+content.orderDiscribe+'</td>'+
						'	<td>'+parseFloat(content.stayNights)*parseFloat(content.roomNum)+'</td>'+
						'	<td>'+content.roomType+'</td>'+
						'	<td>'+consol.UnixToDate(content.checkinTime,true,8)+'</td>'+
						'	<td>'+consol.UnixToDate(content.checkoutTime,true,8)+'</td>'+
						'	<td>'+content.contactName+'</td>'+
						'	<td>'+content.contactPhone+'</td>'+
						'	<td>'+content.hotelName+'</td>'+
						'	<td>'+content.managerName+'</td>'+
						'	<td>'+consol.moneyrefun(content.amountPrice)+'</td>'+
						'	<td>'+parseFloat(content.commisionRatio)*100+'%'+'</td>'+
						'	<td>'+consol.moneyrefun(content.settlementPrice)+'</td>'+
						// '	<td>'+content.payDiscribe+'</td>'+
						'	<td>'+orderstu+'</td>'+
						'	<td>'+consol.moneyrefun(content.totalAmount)+'</td>'+
						'</tr>'
		       		);
		       		settablist.find('.ordermysrc').val(content.baiduOrderId);
		       		settablist.find('.ordercok').on('click',function(){
		       			consol.setCookie('baiduOrderId',$(this).next('input').val());
		       		})
	                settablist.appendTo($('#ordermang #ordermanlist tbody'));
                });
            })    
       	},
       	sethotsear:function(odtestchaog,getuurl){
			var _this=this;   
       		$('#ordermangbtn').on('click',function(){
       			var odstarTime=$('#ordertimein').val();
       			var odendTime=$('#ordertimout').val();
       			if(!odstarTime){
       				delete odtestchaog.createTimeStart;
       			}else{
       				odtestchaog.createTimeStart=consol.getUnixTime(odstarTime);
       			};
       			
       			if(!odendTime){
       				delete odtestchaog.createTimeEnd;
       			}else{
       				odtestchaog.createTimeEnd=consol.getUnixTime(odendTime+'  23:59:59');
       			};
//     			odtestchaog.orderTimeStart=startData;
//     			odtestchaog.orderTimeEnd=endData;
				consol.setCookie('ordrsuNum',1);
       			odtestchaog.orderStatus=$('#ordermang').find('.head-lischeck').val();
       			odtestchaog.hotelName=$('#ordermang').find('.hotelname').val();
//     			if(odtestchaog.pageIdx){
//     				delete odtestchaog.pageIdx;
//     			}
       			_this.pageShow(odtestchaog);
       			//_this.geitoarlist(odtestchaog,getuurl);
       		})
       		//this.geitoarlist(odtestchaog)
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
