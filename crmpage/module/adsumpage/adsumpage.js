/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/adsumpage/adsumpage.tpl',
    'jquery',
    'toomode',
    'jqpage'
], function (
    env,
    adsumpagetpl,
    $,consol,pagination) {
    var view;
    var model;
    view = {
        init: function (data, container) {
            if (this.inited) {
                return;
            }
            this.inited = 0;
            this.container = container;
            // container.html(_.template(orderquerytpl)(data || {}));
            container.html(adsumpagetpl);
   			var getuurl=model.geturlparms();
   			var checkall=null;
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'sortKey':'updatetime',
				//'sortType':'asc'
				'sortType':'desc'
			}
       		var sumchekList=[];
   			$('#adsumcheckall').on('click',function(event){
   				sumchekList=[];
    			if($(this).is(':checked')){
    				$('#adsumrigbox').removeAttr('disabled');
    				$('input[name="idoption"]').each(function(){
    					$(this).prop('checked',true);
    					sumchekList.push($(this).parent().next().html());
    				})
    			}else{
    				$('#adsumrigbox').attr('disabled','true');
    				$('input[name="idoption"]').each(function(){
    					$(this).prop('checked',false);
    				})
            		sumchekList=[];
    			}
    			model.piliangserv(testchaog,sumchekList);
    			model.optionclick(testchaog,sumchekList);
    			event.stopPropagation();
            })
   			model.pageShow(testchaog,sumchekList);
   			model.achivepsearch(testchaog,getuurl,sumchekList);
   			model.sortlistconf(testchaog,getuurl);
   			model.piliangserv(testchaog,sumchekList);
        }
    };
    model = {
    	pageShow:function(testchaog,sumchekList){
    		var pageIndex=consol.getCookie('adsuNum')||1; // 页索引
       		var pageSize= parseInt(consol.getCookie('pageSize'))||50; // 每页显示的条数
       		var pageNum=0; // 总页数
       		var _this=this;
       		testchaog.pageIdx=pageIndex;
	        testchaog.pageSize=pageSize;
	        if(model.geitoarlist(testchaog,sumchekList)){
	        	model.geitoarlist(testchaog,sumchekList)
	        };
	        function PageCallback(api){
       			sumchekList=[];
	        	testchaog.pageIdx=api.getCurrent();
	        	consol.setCookie('adsuNum',api.getCurrent());
	        	model.geitoarlist(testchaog,sumchekList);
	        };
			$.ajax({
                url: env.server+'/hotelself/contract/toauditlist',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
                beforeSend:function(){
                	consol.loading(false)
                }
           	}).success(function(result){
           		// console.log(result);
           		pageNum=result.data.pageNum;
           		sumgNum=result.data.dataNum;
           		// showlist(pageNum,sumgNum);
           		$("#adpagnate").pagination({  
					// 回调
					totalData:sumgNum,
					showData:pageSize,
		            count:2,
		            current:pageIndex,
				    coping:true,
				    jump:true,
				    homePage:'首页',
				    endPage:'末页',
				    prevContent:'上页',
				    nextContent:'下页',
				    // 回调
				    callback:PageCallback
		        });
           	});       		
       		
    	},
       	geitoarlist:function(testchaog,sumchekList){
       		var getuurl=model.geturlparms();
       		var oldpagesize=testchaog.pageSize;
	        // 请求数据
        	var adithoteId=unescape(consol.getCookie('adithoteId',adithoteId));
			var adithoteName=unescape(consol.getCookie('adithoteName',adithoteName));
			var auditState=consol.getCookie('auditState',auditState);
			var fileState=consol.getCookie('fileState',fileState);
			var managerName=unescape(consol.getCookie('managerName',managerName));
			testchaog.hotelIds=adithoteId; //多字段查询
			//testchaog.hotelId=adithoteId;
			testchaog.hotelName=adithoteName;
			testchaog.auditState=auditState;
			testchaog.fileState=fileState;
			testchaog.managerName=managerName;
			if(adithoteId){
				$('#adsumpage .adsumhotelid').val(adithoteId);
			};
			if(adithoteName){
				$('#adsumpage .adsumhotelname').val(adithoteName);
			};
			if(auditState){
				$('#adsumpage #adsumshh').val(auditState);
			};
			if(managerName){
				$('#adsumpage .managerName').val(managerName);
			};
			if(fileState){
				$('#adsumpage #adsumabcot option').each(function(){
					if($(this).val()===fileState){
						$(this).attr('selected','selected');
					}
				})
			};
        	Array.prototype.indexOf = function(val) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == val) return i;
				}
				return -1;
			};
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
        	$.ajax({
                url: env.server+'/hotelself/contract/toauditlist',
                data: testchaog,
                type : 'POST',  //提交方式  
                dataType: 'jsonp',
                beforeSend:function(){
                	consol.loading(false)
                }
            }).success(function (result) {
                if(result.data.list!=null){
                	consol.loading(true);
                	$('#adsumpage tbody').html('');
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
		                	filestate='已归档';
		                	break;
		                }
		                var settablist=$(
			       			'<tr>'+
							'	<td><input type="checkbox" name="idoption"></td>'+
							'	<td>'+content.hotelId+'</td>'+
							'	<td><a class="archhre" data-module="auditepage" href="#/auditepage">'+content.hotelName+'</a></td>'+
							'	<td>'+content.managerName+'</td>'+
							'	<td>'+auditst+'</td>'+
							'	<td>'+filestate+'</td>'+
							'	<td>'+consol.UnixToDate(content.updatetime,true,8)+'</td>'+
							'	<td>'+
							'		<span class="adsumadopt">通过</span>'+
							'		<span class="adsurepulse">打回</span>'+
							'		<span class="adsudelet">删除</span>'+
							'	</td>'+
							'</tr>'
			       		)
		                settablist.find('.archhre').on('click',function(){
		                	var myhotelId=$(this).parent().prev().html();
		                	consol.setCookie('adhotelId',myhotelId);
		                })
		                settablist.find('.adsumadopt').on('click',function(){
		                	var myhotel=$(this).parent().parent().find('td').eq(1).html();
		                	var tolistab={
		                		'idToken':getuurl.idToken,
		                		'from':getuurl.from,
		                		'hotelId':myhotel,
		                		'auditState':'1',
		                	}
		                	model.setaudits(tolistab);
		                	
			       		})
		                settablist.find('.adsurepulse').on('click',function(){
			       			var myhotel=$(this).parent().parent().find('td').eq(1).html();
		                	var tolistab={
		                		'idToken':getuurl.idToken,
		                		'from':getuurl.from,
		                		'hotelId':myhotel,
		                		'auditState':'2',
		                	}
		                	var $adreson=$(
		                		'<div class="adcbreson">'+
		                			'<h1>请输入打回理由</h1>'+
		                			'<textarea></textarea>'+
		                			'<a>确定</a>'+
		                			'<em></em>'+
		                		'</div>'
		                	);
		                	$adreson.find('em').on('click',function(){
		                		$(this).parent().remove();
		                	});
		                	$adreson.find('a').on('click',function(){
		                		if($(this).prev().val()){
		                			tolistab.auditFailedReason=$(this).prev().val();
		                			model.setaudits(tolistab);
		                		}else{
		                			alert('请填写打回信息')
		                		}
		                	});
		                	if($('.adcbreson').length){
		                		return false;
		                	}else{
		                		$adreson.appendTo($('#adsumpage'));
		                	}
			       		});
			       		settablist.find('.adsudelet').on('click',function(){
			       			var myhotel=$(this).parent().parent().find('td').eq(1).html();
		                	var tolistab={
		                		'idToken':getuurl.idToken,
		                		'from':getuurl.from,
		                		'hotelId':myhotel
		                	}
		                	var mybox=$(this).parent().parent();
		                	model.deleteaudits(tolistab,mybox,getuurl)
			       		});
		                settablist.appendTo($('#adsumpage .audsumry tbody'));
	                });
	                model.optionclick(testchaog,sumchekList);
	            }else{
	            	// alert('没有信息');
	            	$('#adsumpage tbody').html('');
	            	consol.loading(true);
	            }
            }); 
       	},
       	optionclick:function(testchaog,sumchekList){
       		$('input[name="idoption"]').each(function(event){
       			$(this).off('click'); 
       			$(this).on('click',function(event){
					if($(this).is(':checked')){
						var newarr=[];
	    				newarr.push($(this).parent().next().html());
	    				sumchekList=sumchekList.concat(newarr);
	    				$('#adsumrigbox').removeAttr('disabled');
	    			}else{
						sumchekList.remove($(this).parent().next().html());
						$('#adsumcheckall').prop('checked',false);
	    			};
	    			if(sumchekList.length === $('input[name="idoption"]').length){
	    				$('#adsumcheckall').prop('checked',true);
	    				$('#adsumrigbox').removeAttr('disabled');
	    			};
	    			if(sumchekList.length < 1){
	    				$('#adsumrigbox').attr('disabled','true');
	    			};
	    			model.piliangserv(testchaog,sumchekList);
	    			event.stopPropagation();
				})
       			if(sumchekList.length === $('input[name="idoption"]').length){
    				$('#adsumcheckall').prop('checked',true);
    				$('#adsumrigbox').removeAttr('disabled');
    			};
    			if(sumchekList.length < 1){
    				$('#adsumrigbox').attr('disabled','true');
    				$('#adsumcheckall').prop('checked',false);
    			};
       		});
       	},
       	piliangserv:function(testchaog,sumchekList){
       		$('#adsumadpot').off('click'); 
       		$('#adsurepulse').off('click'); 
       		$('#adsumadpot').on('click',function(event){
       			console.log(sumchekList);
            	if(sumchekList && sumchekList !== null && sumchekList.length > 0){
            		var str='';
            		str=sumchekList.join(',');
	            	var dataSet={
	            		'from':testchaog.from,
	            		'idToken':testchaog.idToken,
	            		'hotelIds':str,
	            		'auditState':'1'
	            	}
            		model.batchState(dataSet,sumchekList);
            	}
            	event.stopPropagation();
            });
            $('#adsurepulse').on('click',function(event){
            	if(sumchekList && sumchekList !== null && sumchekList.length > 0){
            		console.log(sumchekList);
            		var str='';
            		str=sumchekList.join(',');
	            	var dataSet={
	            		'from':testchaog.from,
	            		'idToken':testchaog.idToken,
	            		'hotelIds':str,
	            		'auditState':'2'
	            	}
	            	var $adreson=$(
                		'<div class="adcbreson">'+
                			'<h1>请输入批量打回理由</h1>'+
                			'<textarea></textarea>'+
                			'<a>确定</a>'+
                			'<em></em>'+
                		'</div>'
                	);
                	$adreson.find('em').on('click',function(){
                		$(this).parent().remove();
                	});
                	$adreson.find('a').on('click',function(){
                		if($(this).prev().val()){
                			dataSet.auditFailedReason=$(this).prev().val();
                			model.batchState(dataSet,sumchekList);
                		}else{
                			alert('请填写打回信息')
                		}
                	});
                	if($('.adcbreson').length){
                		return false;
                	}else{
                		$adreson.appendTo($('#adsumpage'));
                	}
            	}
            	event.stopPropagation();
            });
       	},
       	deleteaudits:function(setdata,mybox,getuurl){
       		var adsumrush={
					'idToken':getuurl.idToken,
					'from':getuurl.from,
				}
    		$.ajax({
                url: env.server+'/hotelself/contract/delete',
                data: setdata,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function(result){
            	if(result.errno===0){
            		console.log(result);
            		mybox.remove();
            		model.geitoarlist(adsumrush,getuurl);
            	}else{
            		alert(result.msg);
            	}
            	
            });
    	},
    	batchState:function(status,sumchekList){
    		var getuurl=model.geturlparms();
    		var adsumrush={
					'idToken':getuurl.idToken,
					'from':getuurl.from,
					'sortKey':'updatetime',
					'sortType':'desc'
				}
    		$.ajax({
                url: env.server+'/hotelself/contract/batchsetauditstate',
                data: status,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function(result){
            	if(result.errno===0){
            		var warstr='全部操作成功';
            		$.each(result.data, function(n,v) {
            			if(v != 1){
            				warstr=n+'有数据没有操作成功';
            				// console.log(warstr);
            			}
            		});
            		$('#adsumpage .adcbreson').remove();
            		model.adRefresh(adsumrush,sumchekList);
            	}else{
            		alert(result.msg);
            	}
            	
            });
    	},
       	setaudits:function(setdata){
       		var getuurl=model.geturlparms();
       		var myrefun={
	       			'idToken':getuurl.idToken,
					'from':getuurl.from
	       		}
    		$.ajax({
                url: env.server+'/hotelself/contract/setauditstate',
                data: setdata,
                type : 'POST',  //提交方式  
                dataType: 'jsonp'
            }).success(function(result){
            	if(result.errno===0){
            		alert('操作成功！');
            		$('#adsumpage .adcbreson').remove();
            		model.geitoarlist(myrefun,getuurl);
            	}else{
            		alert(result.msg);
            	}
            });
    	},
       	achivepsearch:function(testchaog,getuurl,sumchekList){
       		var _this=this;
       		$('#adsumbtn').off('click');
       		$('#adsumbtn').on('click',function(){
       			var adithoteId=$('#adsumpage .adsumhotelid').val();
       			var adithoteName=$('#adsumpage .adsumhotelname').val();
       			var managerName=$('#adsumpage .managerName').val();
       			var auditState=$('#adsumpage').find('select').eq(0).val();
       			var fileState= $('#adsumpage').find('select').eq(1).val();
       			var hoteIdleng=adithoteId.split(',').length;
       			var pagenum=null;
       			sumchekList=[];
				if(hoteIdleng > 1){
					pagenum=1000;
				} else {
					pagenum=50;
				}
   				testchaog.hotelIds=adithoteId;
   				testchaog.hotelName=adithoteName;
   				testchaog.auditState=auditState;
   				testchaog.fileState=fileState;
   				testchaog.managerName=managerName;
   				consol.setCookie('adithoteId',adithoteId);
   				consol.setCookie('adithoteName',adithoteName);
   				consol.setCookie('auditState',auditState);
   				consol.setCookie('fileState',fileState);
   				consol.setCookie('pageSize',pagenum);
   				consol.setCookie('managerName',managerName);
   				consol.setCookie('adsuNum',1);
   				if(testchaog.pageIdx){
       				delete testchaog.pageIdx;
       			}
   				$('#adsumcheckall').removeAttr('checked');
   				$('#adsumrigbox').attr('disabled','true');
       			_this.pageShow(testchaog,sumchekList);
       		})
       	},
       	adRefresh:function(testchaog,sumchekList){
       		var adithoteId=$('#adsumpage .adsumhotelid').val();
   			var adithoteName=$('#adsumpage .adsumhotelname').val();
   			var auditState=3;
   			var fileState= $('#adsumpage').find('select').eq(1).val();
   			var managerName=$('#adsumpage .managerName').val();
   			var hoteIdleng=adithoteId.split(',').length;
   			var pagenum=null;
   			sumchekList=[];
			if(hoteIdleng > 1){
				pagenum=1000;
			} else {
				pagenum=50;
			}
			testchaog.hotelIds=adithoteId;
			testchaog.hotelName=adithoteName;
			testchaog.auditState=auditState;
			testchaog.fileState=fileState;
			testchaog.managerName=managerName;
			consol.setCookie('adithoteId',adithoteId);
			consol.setCookie('adithoteName',adithoteName);
			consol.setCookie('auditState',auditState);
			consol.setCookie('fileState',fileState);
			consol.setCookie('pageSize',pagenum);
			consol.setCookie('managerName',managerName);
			consol.setCookie('adsuNum',1);
			if(testchaog.pageIdx){
   				delete testchaog.pageIdx;
   			}
			model.pageShow(testchaog,sumchekList);
       	},
       	sortlistconf:function(testchaog,getuurl){
       		var orderBox=$('#adsumpage .sortbox');
       		var orderBtn=$('#adsumpage .sortbox').find('a');
       		var _this=this;
       		var sortType='desc';
       		orderBtn.each(function(){
       			$(this).off('click');
       			$(this).on('click',function(){
       				var sumchekList=[];
       				if(!$(this).hasClass('active')){
       					$(this).addClass('active');
       					$(this).siblings().removeClass('active');
       					if($(this).index()){
       						sortType='asc';
       					}else{
       						sortType='desc';
       					}
       				}
       				testchaog.sortType=sortType;
       				// console.log(testchaog);
       				_this.geitoarlist(testchaog,sumchekList);
       			})
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
    };
    return view;
});
