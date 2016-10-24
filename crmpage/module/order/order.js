/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/order/orderquery.tpl',
    'jquery',
    'toomode'
], function (
    env,
    orderquerytpl,
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
            container.html(orderquerytpl);
            var getuurl=model.geturlparms();
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
			}
   			model.geitoarlist(testchaog,getuurl);
   			model.achivepsearch(testchaog,getuurl);
        }

    };
    model = {
       geitoarlist:function(testchaog,getuurl){
       		var resumyself={
        		'idToken':getuurl.idToken,
				'from':getuurl.from
        	}
       		$('#order #audsumry tbody').html('');
       		$.ajax({
                url: env.server+'/hotelself/contract/list',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function (result) {
            	console.log(result);
                $.each(result.data.list, function(index,content){      
			  		var auditst=''
	                var filestate=''
	                switch(content.auditState){
	                	case '0':
	                	auditst='未上传合同';
	                	break;
	                	case '1':
	                	auditst='通过';
	                	break;
	                	case '2':
	                	auditst='不通过';
	                	break;
	                	case '3':
	                	auditst='待审核';
	                	break;
	                	case '4':
	                	auditst='冻结';
	                	break;
	                }
	                switch(content.fileState){
	                	case '0':
	                	filestate='未归档';
	                	break;
	                	case '1':
	                	filestate='归档失败';
	                	break;
	                	case '2':
	                	filestate='已归档';
	                	break;
	                }
	                var settablist=$(
		       			'<tr>'+
						'	<td>'+content.hotelId+'</td>'+
						'	<td><a class="orderlink" data-module="citymanagerdetail2" href="#/citymanagerdetail2">'+content.hotelName+'</a></td>'+
						'	<td>'+content.managerName+'</td>'+
						'	<td>'+auditst+'</td>'+
						'	<td>'+filestate+'</td>'+
						'	<td>'+
						'		<span class="freeze">冻结</span>'+
						'		<span class="delete">删除</span>'+
						'	</td>'+
						'</tr>'
		       		);
		       		settablist.find('.freeze').on('click',function(){
		       			var myhotelId=$(this).parent().parent().children('td').eq(0).html();
		       			testchaog.hotelId=myhotelId;
		       			console.log(testchaog);
		       			$.ajax({
			                url : env.server+'/hotelself/contract/freeze',
			                data:testchaog,
			                type : 'POST',  //提交方式  
			                dataType: 'jsonp'
			            }).success(function(result){
			            	console.log(result);
			            	if(result.errno===0){
			            		model.geitoarlist(resumyself,getuurl);
			            	}else{
			            		alert(result.msg);
			            	}
			            })
		       		})
		       		settablist.find('.orderlink').on('click',function(){
		       			var myhotelId=$(this).parent().prev().html();
		       			consol.setCookie('oerdehotId',myhotelId);
		       		})
		       		settablist.find('.delete').on('click',function(){
		       			var myhotelId=$(this).parent().parent().children('td').eq(0).html();
		       			testchaog.hotelId=myhotelId;
		       			$.ajax({
			                url : env.server+'/hotelself/contract/delete',
			                data:testchaog,
			                type : 'POST',  //提交方式  
			                dataType: 'jsonp'
			            }).success(function(result){
			            	if(result.errno===0){
			            		alert('删除成功');
			            		model.geitoarlist(resumyself,getuurl);
			            	}else{
			            		alert(result.msg);
			            	}
			            	
			            })
		       		})
	                settablist.appendTo($('#order #audsumry tbody'));
                });
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
    	achivepsearch:function(testchaog,getuurl){
       		var _this=this;
       		$('#ordershear').on('click',function(){
       			var auditState= $('#order').find('select').eq(0).val();
       			var fileState= $('#order').find('select').eq(1).val();
       			testchaog.hotelId=$('#order').find('.orderhotid').val();
       			testchaog.hotelName=$('#order').find('.ordername').val();
       			testchaog.auditState=auditState;
       			testchaog.fileState=fileState;
       			_this.geitoarlist(testchaog,getuurl);
       		})
       		
       	}
    };
    return view;
});
