/**
 * @file mis后台管理-归档页面
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/archivepage/archivepage.tpl',
    'jquery',
    'toomode',
    'jqpage'
], function (
    env,
    archivepagetpl,
    $,consol,pagination) {
    var view;
    var model;
    view = {
        init: function (data, container) {
            // console.log(data)
            if (this.inited) {
                return;
            }
            this.inited = 0;
            this.container = container;
            //container.html(_.template(archivepagetpl)(data || {}));
            container.html(archivepagetpl);
   			var getuurl=consol.geturlparms();
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				//'fileState':'',
				//'auditState':''
			}
       		model.pageShow(testchaog);
       		model.achivepsearch(testchaog,getuurl);
   			// model.geitoarlist(testchaog,getuurl);
        }
    };
    model = {
    	pageShow:function(testchaog){
    		var pageIndex=consol.getCookie('archsuNum')||1; // 页索引
       		var pageSize=50; // 每页显示的条数
       		var pageNum=0; // 总页数
       		var _this=this;
       		testchaog.pageIdx=pageIndex;
	        testchaog.pageSize=pageSize;
	        model.geitoarlist(testchaog);
			$.ajax({
                url: env.server+'/hotelself/contract/tofilelist',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
                beforeSend:function(){
                	consol.loading(false)
                }
           	}).success(function(result){
           		pageNum=result.data.pageNum;
           		sumgNum=result.data.dataNum;
           		showlist(pageNum,sumgNum);
           	});       		
       		function showlist(pageNum,sumgNum){
       			$("#archpagnate").pagination({  
					// 回调
					callback:PageCallback,
					totalData:sumgNum,
					showData:50,
		            //pageCount:pageNum,
		            count:2,
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
	        	consol.setCookie('archsuNum',api.getCurrent());
	        	model.geitoarlist(testchaog);
	        };
    	},
       	geitoarlist:function(testchaog,getuurl){
   			$.ajax({
                url: env.server+'/hotelself/contract/tofilelist',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
                beforeSend:function(){
                	consol.loading(false);
                }
            }).success(function (result) {
               	// console.log(result);
                if(result.errno===0){
	                if(result.data.list!=null){
	                	consol.loading(true);
	                	$('#achivepg tbody').html('');
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
			                	auditst='已冻结';
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
			                	filestate='归档成功';
			                	break;
			                }
			                var settablist=$(
				       			'<tr>'+
								'	<td>'+content.hotelId+'</td>'+
								'	<td>'+content.contractId+'</td>'+
								'	<td><a class="archhre" data-module="archivedetipage" href="#/archivedetipage">'+content.hotelName+'</a></td>'+
								'	<td>'+content.managerName+'</td>'+
								'	<td>'+auditst+'</td>'+
								'	<td>'+filestate+'</td>'+
								'	<td>'+
								'		<span class="arcpagb">归档成功</span>'+
								'		<span class="archpagno">归档失败</span>'+
								'	</td>'+
								'</tr>'
				       		)
			                settablist.find('.archhre').on('click',function(){
			                	var myhotelId=$(this).parent().prev().prev().html();
			                	consol.setCookie('archhotelId',myhotelId);
			                })
			                settablist.find('.arcpagb').on('click',function(){
			                	var myhotel=$(this).parent().parent().find('td').eq(0).html();
			                	var tolistab={
			                		'idToken':getuurl.idToken,
			                		'from':getuurl.from,
			                		'hotelId':myhotel,
			                		'fileState':'2',
			                		//'fileFailedReason':result.fileFailedReason,
			                	}
			                	var myrush={
					       			'idToken':getuurl.idToken,
									'from':getuurl.from,
					       		}
	
				       			model.setarchive(tolistab,getuurl);
				       		})
			                settablist.find('.archpagno').on('click',function(){
			                	var myhotel=$(this).parent().parent().find('td').eq(0).html();
				       			var tolistab={
			                		'idToken':getuurl.idToken,
			                		'from':getuurl.from,
			                		'hotelId':myhotel,
			                		'fileState':'1',
			                		//'fileFailedReason':result.fileFailedReason,
			                	}
				       			var $cbreson=$(
			                		'<div class="adcbreson">'+
			                			'<h1>请填写归档失败的理由</h1>'+
			                			'<textarea></textarea>'+
			                			'<a>确定</a>'+
			                			'<em></em>'+
			                		'</div>'
			                	);
			                	$cbreson.find('em').on('click',function(){
			                		$(this).parent().remove();
			                	})
			                	$cbreson.find('a').on('click',function(){
			                		if($(this).prev().val()){
			                			tolistab.fileFailedReason=$(this).prev().val();
				       					model.setarchive(tolistab,getuurl);
			                		}else{
			                			alert('请填写归档失败理由')
			                		}
			                	})
			                	if($('.adcbreson').length){
			                		return;
			                	}else{
				       				$cbreson.appendTo($('#archivepage'));
			                	}
				       		});
			                settablist.appendTo($('#achivepg tbody'));
		                });
		            }else{
		            	consol.loading(true);
		            	alert('没有信息');
		            };
	            }else{
	            	consol.loading(true);
	            	alert(result.msg);
	            }
            })
       		
       		
       		    
       	},
       	setarchive:function(setdata,getuurl){
       		var myrush={
       			'idToken':getuurl.idToken,
				'from':getuurl.from,
       		}
    		$.ajax({
                url: env.server+'/hotelself/contract/setfilestate',
                data: setdata,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function(result){
            	console.log(result);
            	//alert(result.msg);
            	if(result.errno===0){
            		model.geitoarlist(myrush,getuurl)
            		alert('操作成功！');
            		$('#archivepage .adcbreson').remove();
            	}else{
            		alert(result.msg);
            	}
            	
            });
    	},
       	achivepsearch:function(testchaog,getuurl){
       		var _this=this;
       		$('#archivserch').on('click',function(){
       			var archotelid=$('#archivepage .archivehotelid').val();
       			var archotelnaeme=$('#archivepage .archivehotelname').val();
       			var archotelcontractId=$('#archivepage .archivehotelcontid').val();
       			var auditState= $('#archivepage').find('select').eq(0).val();
       			var fileState= $('#archivepage').find('select').eq(1).val();
       			testchaog.hotelId=archotelid;
       			testchaog.hotelName=archotelnaeme;
       			testchaog.auditState=auditState;
       			testchaog.fileState=fileState;
       			testchaog.contractId=archotelcontractId;
       			if(testchaog.pageIdx){
       				delete testchaog.pageIdx;
       			}
       			_this.geitoarlist(testchaog,getuurl);
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
    	}
    };
    return view;
});
