/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/accontmang/accontmang.tpl',
    'jquery',
    'datapak',
    'toomode',
    'jqpage'
], function (
    env,
    accontmangtpl,$,Pikaday,consol,pagination){
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
            container.html(accontmangtpl);
            var starttime=$('#accoutstar');
            var endTime=$('#accoutend');
   			var picker = new Pikaday({
		        field: document.getElementById('accoutstar'),
		        firstDay: 1,
		        maxDate: new Date(2040, 12, 31),
		        yearRange: [2016,2040],
		        onSelect: function(date) {
			        starttime.value = picker.toString();
			    }
		    });
		    var pickerend = new Pikaday({
		        field: document.getElementById('accoutend'),
		        firstDay: 1,
		        maxDate: new Date(2040, 12, 31),
		        yearRange: [2016,2040],
		        onSelect: function(date) {
			        endTime.value = pickerend.toString();
			    }
		    });
		    var getuurl=model.geturlparms();
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				//'hotelName':getuurl.hotelName
			}
       		model.pageShow(1,testchaog)
        	// model.geitoarlist(testchaog,getuurl);
        	model.sethotsear(testchaog,getuurl,picker,pickerend);
        	
        	var orderHeight=$(window).height()-$('#accontmang .header').outerHeight(true)-60;
			$('#accontmang .conent').css('height',orderHeight+'px');
			$(window).resize(function(){
				var orderHeight=$(window).height()-$('#accontmang .header').outerHeight(true)-60;
				$('#accontmang .conent').css('height',orderHeight+'px');
			})
        }

    };
    model = {
    	pageShow:function(index,testchaog){
    		var pageIndex=index || consol.getCookie('accotsuNum')||1; // 页索引
       		var pageSize=50; // 每页显示的条数
       		var pageNum=0; // 总页数
       		var _this=this;
       		testchaog.pageIdx=pageIndex;
	        testchaog.pageSize=pageSize;
	        model.geitoarlist(testchaog);
			$.ajax({
                url: env.server2+'/hotelself/batch/list',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
           }).success(function(result){
           		// sumgNum=Math.ceil(result.data.pageSize)*pageSize;
           		sumgNum=parseInt(result.data.pageNum);
           		showlist(sumgNum);
           	});       		
       		function showlist(sumgNum){
       			$("#accotpagnate").pagination({  
					// 回调
					callback:PageCallback,
					//totalData:sumgNum,
					//showData:50,
		            pageCount:sumgNum,
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
	        	consol.setCookie('accotsuNum',api.getCurrent());
	        	model.geitoarlist(testchaog);
	        };
    	},
       	geitoarlist:function(testchaog,getuurl){
       		$('#accontmang').find('.audsumry tbody').html('');
       		$.ajax({
                url: env.server2+'/hotelself/batch/list',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function (result) {
            	// console.log(result);
            	if(result.errno===0){
	                $.each(result.data.batchList, function(index,content){ 
	                	var myamout='';
	                	if(content.checkoutCircle==='7'){
	                		myamout='周结';
	                	}else if(content.checkoutCircle==='14'){
	                		myamout='半月结';
	                	}else if(content.checkoutCircle==='30'){
	                		myamout='月结';
	                	}
	                	var acctimeconf='';
	                	if(content.payTime){
	                		if(content.payTime.length>1){
	                			acctimeconf=content.payTime;
	                		}else{
	                			acctimeconf='';
	                		}
	                	}else{
	                		acctimeconf='';
	                	};
	                	var acccstus='';
	                	if(content.state){
	                		switch(content.state){
	                			case '0':
	                				acccstus='待确认';
	                				break;
	                			case '1':
	                				acccstus='待打款';
	                				break;
	                			case '2':
	                				acccstus='打款中';
	                				break;
	                			case '3':
	                				acccstus='打款成功';
	                				break;	
	                		}
	                	}else{
	                		acctimeconf='';
	                	};
		                var settablist=$(
			       			'<tr>'+
							'	<td>'+content.orderNo+'</td>'+
							'	<td><a class="settablist" data-module="accountperiod" href="#/accountperiod">'+content.startTime+'-'+content.endTime+'</a></td>'+
							'	<td>'+ acctimeconf +'</td>'+
							'	<td>'+ acccstus +'</td>'+
							'	<td>'+ content.remark +'</td>'+
							'	<td>'+ content.checkoutAccount +'</td>'+
							'	<td>'+ content.checkoutAccountName +'</td>'+
							'	<td>'+ content.merchantId +'</td>'+
							'	<td>'+ content.hotelName +'</td>'+
							'	<td>'+ content.managerName +'</td>'+
							'	<td>'+ myamout +'</td>'+
							'	<td>'+ consol.moneyrefun(content.amount) +'</td>'+
							'	<td>'+ content.operatorName +'</td>'+
							'</tr>'
			       		);
			       		settablist.find('.settablist').on('click',function(){
			       			consol.setCookie('orderNo',$(this).parent().prev().html());
			       			consol.setCookie('accctime',$(this).html());
			       		})
		                settablist.appendTo($('#accontmang').find('.audsumry tbody'));
	                });
	            }else{
	            	alert('信息查询错误');
	            }
            })    
       	},
       	sethotsear:function(testchaog,getuurl,picker,pickerend){
			var _this=this;       		
       		$('#accoutsearbtn').on('click',function(){
       			var startData=$('#accoutstar').val();
       			var endData=$('#accoutend').val();
       			var aplaystu=$('#accontstus').val();
				if (startData) {
					testchaog.startTime=startData;
				}else{
					delete testchaog.startTime;
				}
       			if (endData) {
					testchaog.endTime=endData;
				}else{
					delete testchaog.endTime;
				}
       			if ($('#accontmang').find('.accontmhtelid').val()) {
					testchaog.merchantId=$('#accontmang').find('.accontmhtelid').val();
				}else{
					delete testchaog.merchantId;
				}
       			if ($('#accontmang').find('.accontmhtelname').val()) {
					testchaog.hotelName=$('#accontmang').find('.accontmhtelname').val();
				}else{
					delete testchaog.hotelName;
				}
				testchaog.state=aplaystu;
       			model.pageShow(1,testchaog);
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
