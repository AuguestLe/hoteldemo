/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/citymanagerdetail2/citymanagerdetail2.tpl',
    'webuploader',
    'jquery',
    'toomode'
], function (
    env,
    citymanagerdetail2tpl,
    WebUploader,$,consol) {
    var view;
    var model;
    var inndaejson={};
	var arr=[];
	var arr1=[];
	var arr2=[];
	var arr3=[];
	var arr4=[];
	view = {
        init: function (data, container) {
            if (this.inited) {
                return;
            }
            this.inited = 0;
            this.container = container;
            // container.html(_.template(orderquerytpl)(data || {}));
            container.html(citymanagerdetail2tpl);
            model.generatepage();
            model.webupload();
            model.subumit();
            model.seavesubmit();
        }

    };
    model = {
        webupload:function(){
			var imgBox='';
			var _this=this;
			//console.log(_this.geturlparms());
			$('.chekbtn').each(function(){
				$(this).click(function(){
					imgBox=$(this).prev().attr('id');
				})
			});
			$.ajax({  
                url : env.server+'/hotelself/util/getbanklist',//路径  
                type : 'POST',  //提交方式  
                data :'11',//数据，这里使用的是Json格式进行传输  
                success : function(result) {//返回数据根据结果进行相应的处理  
                    //console.log(result)
                    for(var i=0;i<result.data.length;i++){
                    	var upopts=$('<option value=""></option>');
                    	upopts.text(result.data[i]);
                    	upopts.appendTo($('#htbanklist'));
                    }
                    $('<option value="其他">其他</option>').appendTo($('#htbanklist'));
                    $('.bakvalue').val($('#htbanklist option:selected').text());
					$('#htbanklist').change(function(){
						$('.bakvalue').val($('#htbanklist option:selected').text());
						var mybankchek=$('.bakvalue').val();
						if(mybankchek==='其他'){
							//$(this).hide();
							$(this).siblings('.bankchekin').show().focus();
							$('.bankchekin').on('input',function(){
								$('.bakvalue').val($(this).val());
							})
						}else{
							$(this).siblings('.bankchekin').hide();
						}
					})
					
                }  
            });  
			
			// 初始化Web Uploader
			var uploader = WebUploader.create({
			
			    // 选完文件后，是否自动上传。
			    auto: true,
			    // swf文件路径
			    swf:'/img/Uploader.swf',
			    // 文件接收服务端。
			    server: env.server+'/hotelself/util/uploadpic',
			    // 选择文件的按钮。可选。
			    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
			    pick: "#filePicker",
				fileVal:"imgfile",   //指明参数名称，后台也用这个参数接收文件
			    // 只允许选择图片文件。
			    accept: {
			        title: 'Images',
			        extensions: 'gif,jpg,jpeg,bmp,png',
			        mimeTypes: 'image/*'
			    }
			});
			uploader.addButton({
			    id: '#htcontractbtn'
			});
			uploader.addButton({
			    id: '#htbusinlicbtn'
			});
			uploader.addButton({
			    id: '#htspecialbtn'
			});
			uploader.addButton({
			    id: '#htpeocardbtn'
			});
			uploader.addButton({
			    id: '#htcomprescrbtn'
			});
			// 当有文件添加进来的时候
			uploader.on( 'fileQueued', function( file ) {
				var $list=$('#'+imgBox)
			    var $li = $(
			            '<div id="' + file.id + '" class="file-item thumbnail">' +
			                '<img>' +
			                '<p class="info">' + file.name + '</p>' +
			                '<em class="close"></em>' +
			            '</div>'
			           );
			    //$img = $li.find('img');
			    
				$delet=$li.find('.close');
				$delet.on('click',function(){
					var myparentname=$(this).parent().parent().prev('label').html();
					var myPos=$(this).parent().index();
					switch (myparentname){
				    	case '合同上传':
					    	arr.splice(myPos,1);
					    	inndaejson.contractPicIds=arr;
				    		break;
				    	case '营业执照副本':
					    	arr1.splice(myPos,1);
					    	inndaejson.businessLicencePicIds=arr1;
					    	break;
				    	case '特种行业许可证':
					    	arr2.splice(myPos,1);
					    	inndaejson.spIndustryLicensePicIds=arr2;
					    	break;
				    	case '企业法人身份证':
					    	arr3.splice(myPos,1);
					    	inndaejson.businessEntityIdcardPicIds=arr3;
					    	break;
				    	case '竞争价格截图':
					    	arr4.splice(myPos,1);
					    	inndaejson.competitorPricePicIds=arr4;
					    	break;
				    }
					uploader.removeFile( file );
					$(this).parent().remove();
				})
			    // 创建缩略图
			    // 如果为非图片文件，可以不用调用此方法。
			    // thumbnailWidth x thumbnailHeight 为 100 x 100
			    uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			        $img = $li.find('img');
			        consol.scaleImgs($img);
			        $img.attr( 'src', src );
			    }, 100, 100 );
			    // $list为容器jQuery实例
			    $list.append( $li );
			});
			
			// 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
			    var $li = $( '#'+file.id ),
			        $percent = $li.find('.progress span');
			
			    // 避免重复创建
			    if ( !$percent.length ) {
			        $percent = $('<p class="progress"><span></span></p>')
			                .appendTo( $li )
			                .find('span');
			    }
			
			    $percent.css( 'width', percentage * 100 + '%' );
			});
			
			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			uploader.on( 'uploadSuccess', function( file,response ) {
			    $( '#'+file.id ).addClass('upload-state-done'); 
			    switch ($( '#'+file.id ).parent().prev().html()){
			    	case '合同上传':
			    		arr.push(response.data.picid);
			    		inndaejson.contractPicIds=arr;
			    		break;
			    	case '营业执照副本':
			    		arr1.push(response.data.picid);
			    		inndaejson.businessLicencePicIds=arr1;
			    		break;
			    	case '特种行业许可证':
			    		arr2.push(response.data.picid);
			    		inndaejson.spIndustryLicensePicIds=arr2;
			    		break;
			    	case '企业法人身份证':
			    		arr3.push(response.data.picid);
			    		inndaejson.businessEntityIdcardPicIds=arr3;
			    		break;
			    	case '竞争价格截图':
			    		arr4.push(response.data.picid);
			    		inndaejson.competitorPricePicIds=arr4;
			    		break;
			    }
			});
			
			// 文件上传失败，显示上传出错。
			uploader.on( 'uploadError', function( file ) {
			    var $li = $( '#'+file.id ),
			        $error = $li.find('div.error');
			    // 避免重复创建
			    if ( !$error.length ) {
			        $error = $('<div class="error"></div>').appendTo( $li );
			    }
			
			    $error.text('上传失败');
			});
			
			// 完成上传完了，成功或者失败，先删除进度条。
			uploader.on( 'uploadComplete', function( file ) {
			    $( '#'+file.id ).find('.progress').remove();
			});
			uploader.on( 'uploadAccept', function( file, response ) {
			  if ( response.errno ) {
			      // 通过return false来告诉组件，此文件上传有错。
			      alert(response.msg) ;
			      return false
			  }
			});
      	},
      	subumit:function(){
      		$('#htuploadcomit').on( 'click', function() { 
				var geturl=consol.geturlparms();
				var settperiod=$('#htsettperiod').children('input:checked').val();
				var accoutype=$('#htaccoutype').children('input:checked').val();
				var upcomitdata={};
			 	upcomitdata={
					'idToken':geturl.idToken,
					'from':geturl.from,
					'hotelId':$('#citymanagerdetail2 .prevtop').eq(0).val(),
					'hotelName':$('#citymanagerdetail2 .prevtop').eq(1).val(),
					'bid':$('#citymanagerdetail2 .prevtop').eq(2).val(),
					'managerId':$('#citymanagerdetail2 .prevtop').eq(3).val(),
					'managerName':decodeURI(geturl.managerName),
					'contractId':$('#conanum').val(),
					// 'contractPicIds':JSON.stringify(inndaejson.contractPicIds),
					// 'businessLicencePicIds':JSON.stringify(inndaejson.businessLicencePicIds),
					// 'spIndustryLicensePicIds':JSON.stringify(inndaejson.spIndustryLicensePicIds),
					// 'businessEntityIdcardPicIds':JSON.stringify(inndaejson.businessEntityIdcardPicIds),
					// 'competitorPricePicIds':JSON.stringify(inndaejson.competitorPricePicIds),
					'checkoutAccount':$('#htsettconbank').val(),
					'checkoutCircle':settperiod,
					'checkoutAccountName':$('#htnamehodel').val(),
					'checkoutPersonName':$('#htsettcontact').val(),
					'checkoutPersonPhone':$('#htsettconphone').val(),
					'checkoutPersonEmail':$('#htsettconemail').val(),
					'depositBank':$('#citymanagerdetail2').find('.bakvalue').val(),
					'subDepositBank':$('#htbanklisf').val(),
					'provinceOfBank':$('#htopenaccot').val(),
					'cityOfBank':$('#htopenacity').val(),
					'accountType':accoutype,
					// 'baiduAccount':$('#htbaidumoid').val(),
					'hotelEmail':$('#hthoteemail').val(),
				}
			 	// 合同图片
			 	if(inndaejson.contractPicIds.length){
					upcomitdata.contractPicIds=JSON.stringify(inndaejson.contractPicIds);
				}else{
					upcomitdata.contractPicIds='';
				}
				// 营业执照图片
			 	if(inndaejson.businessLicencePicIds.length){
					upcomitdata.businessLicencePicIds=JSON.stringify(inndaejson.businessLicencePicIds);
				}else{
					upcomitdata.businessLicencePicIds='';
				}
				//企业法人图片
			 	if(inndaejson.businessEntityIdcardPicIds.length){
					upcomitdata.businessEntityIdcardPicIds=JSON.stringify(inndaejson.businessEntityIdcardPicIds);
				}else{
					upcomitdata.businessEntityIdcardPicIds='';
				}
				for (key in upcomitdata){
					if(!upcomitdata[key]){
						alert('你有未填项！');
						return false;
					}
				}
				//竞争价格图片
			 	if(inndaejson.competitorPricePicIds.length){
					upcomitdata.competitorPricePicIds=JSON.stringify(inndaejson.competitorPricePicIds);
				}else{
					upcomitdata.competitorPricePicIds='';
				}
				//特种行业图片
			 	if(inndaejson.spIndustryLicensePicIds){
			 		upcomitdata.spIndustryLicensePicIds=JSON.stringify(inndaejson.spIndustryLicensePicIds);
				}
				upcomitdata.baiduAccount=$('#htbaidumoid').val();
				var _this=$(this);
				$.ajax({  
	                url : env.server+'/hotelself/contract/update',//路径  
	                type : 'POST',  //提交方式  
	                data :upcomitdata,
	                dataType:'jsonp',//数据，这里使用的是Json格式进行传输
	                beforeSend: function () {
				        // 禁用按钮防止重复提交
				        _this.attr({ disabled: "disabled" });
				        _this.css({'background':'#ccc','color':'#d1d1d1'})
				    }
	            }).success(function(result) {//返回数据根据结果进行相应的处理
	            		console.log(result);
	                    if(result.errno === 0){
	                    	alert('提交成功');
	                    	_this.removeAttr('disable');
	                    	_this.removeAttr("disabled");
	            			_this.css({'background':'deepskyblue','color':'#ffffff'})
	                    	// location.href='#/order';
	                    }else{
	                    	alert(result.msg);
	                    }
	            });
			});
      	},
      	seavesubmit:function(){
      		$('#httesturplist').on('click',function(){
				var geturl=consol.geturlparms();
				var settperiod=$('#htsettperiod').children('input:checked').val();
				var accoutype=$('#htaccoutype').children('input:checked').val();
				var upcomitdata={
					'idToken':geturl.idToken,
					'from':geturl.from,
					'hotelId':$('#citymanagerdetail2 .prevtop').eq(0).val(),
					'hotelName':$('#citymanagerdetail2 .prevtop').eq(1).val(),
					'bid':$('#citymanagerdetail2 .prevtop').eq(2).val(),
					'managerId':$('#citymanagerdetail2 .prevtop').eq(3).val(),
					'managerName':decodeURI(geturl.managerName),
					'contractId':$('#conanum').val(),
					'contractPicIds':JSON.stringify(inndaejson.contractPicIds),
					'businessLicencePicIds':JSON.stringify(inndaejson.businessLicencePicIds),
					'spIndustryLicensePicIds':JSON.stringify(inndaejson.spIndustryLicensePicIds),
					'businessEntityIdcardPicIds':JSON.stringify(inndaejson.businessEntityIdcardPicIds),
					'competitorPricePicIds':JSON.stringify(inndaejson.competitorPricePicIds),
					'checkoutAccount':$('#htsettconbank').val(),
					'checkoutCircle':settperiod,
					'checkoutAccountName':$('#htnamehodel').val(),
					'checkoutPersonName':$('#htsettcontact').val(),
					'checkoutPersonPhone':$('#htsettconphone').val(),
					'checkoutPersonEmail':$('#htsettconemail').val(),
					'depositBank':$('#citymanagerdetail2').find('.bakvalue').val(),
					'subDepositBank':$('#htbanklisf').val(),
					'provinceOfBank':$('#htopenaccot').val(),
					'cityOfBank':$('#htopenacity').val(),
					'accountType':accoutype,
					'baiduAccount':$('#citymanagerdetail2 #htbaidumoid').val(),
					'hotelEmail':$('#hthoteemail').val()
				}
				var _this=$(this);
				$.ajax({  
	                url : env.server+'/hotelself/contract/tempsave',//路径  
	                type : 'POST',  //提交方式  
	                data :upcomitdata,//数据，这里使用的是Json格式进行传输  
	                beforeSend: function () {
				        // 禁用按钮防止重复提交
				        _this.attr({ disabled: "disabled" });
				        _this.css({'background':'#ccc','color':'#d1d1d1'})
				    },
	                success : function(result) {//返回数据根据结果进行相应的处理  
	                    if(result.errno===0){
	                    	alert('保存成功');
	                    	_this.removeAttr('disable');
	                    	_this.removeAttr("disabled");
	            			_this.css({'background':'deepskyblue','color':'#ffffff'})
	                    	location.href='#/order';
	                    }else{
	                    	alert(result.msg);
	                    }
	                }
	            }); 
			})
      	},
    	generatepage:function(){
    		inndaejson={};
			arr=[];
			arr1=[];
			arr2=[];
			arr3=[];
			arr4=[];
       		var getuurl=consol.geturlparms();
       		var urlId=getuurl.hotelID;
       		var ordId=consol.getCookie('oerdehotId');
       		var hoelid=null;
       		if(ordId){
       			hoelid=ordId;
       		}else{
       			hoelid=urlId;
       		}
       		var _this=$(this);
       		var getcitydate={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'hotelId':hoelid,
				'getCache':'1'
			}
			$.ajax({
                    url: env.server+'/hotelself/contract/detail',
                    data: getcitydate,
                    type : 'POST',  //提交方式  
                    dataType: 'jsonp'
                }).success(function (result) {
                	var tyepname='';
                	var piros='';
                	// console.log(result);
                    if(result.errno===0){
	                    //获取需要填写标签
	                    $('#citymanagerdetail2 .prevtop').eq(0).val(result.data.hotelId);
	                    $('#citymanagerdetail2 .prevtop').eq(1).val(result.data.hotelName);
	                    $('#citymanagerdetail2 .prevtop').eq(2).val(result.data.bid);
	                    $('#citymanagerdetail2 .prevtop').eq(3).val(result.data.contractId);
	                   //图片取值
	                    function citydelt(){
				        	var myparentname=$(this).parent().parent().prev('label').html();
							var myPos=$(this).parent().index();
							switch (myparentname){
						    	case '合同上传':
							    	arr.splice(myPos,1);
							    	inndaejson.contractPicIds=arr;
						    		break;
						    	case '营业执照副本':
							    	arr1.splice(myPos,1);
							    	inndaejson.businessLicencePicIds=arr1;
							    	break;
						    	case '特种行业许可证':
							    	arr2.splice(myPos,1);
							    	inndaejson.spIndustryLicensePicIds=arr2;
							    	break;
						    	case '企业法人身份证':
							    	arr3.splice(myPos,1);
							    	inndaejson.businessEntityIdcardPicIds=arr3;
							    	break;
						    	case '竞争价格截图':
							    	arr4.splice(myPos,1);
							    	inndaejson.competitorPricePicIds=arr4;
							    	break;
						    }
							$(this).parent().remove();
				        }
	                    // 合同上传图片
	                   	if(result.data.contractPics){
	                   		for(var i=0;i<result.data.contractPics.length;i++){
	                   			var $li = $(
					            '<div class="file-item thumbnail">' +
					                '<img>' +
					                '<em class="close"></em>' +
					            '</div>'
					           );
	                   			arr.push(result.data.contractPics[i].picId);
		                    	$li.find('img').attr('src',result.data.contractPics[i].picUrl);
		                    	$li.find('em').on('click',citydelt);
		                    	consol.scaleImgs($li.find('img'));
		                    	$li.appendTo($('#citymanagerdetail2 #htcontract'));
		                    }
	                   		inndaejson.contractPicIds=arr;
	                   	}
	                   	// 营业执照照片
	                    if(result.data.businessLicencePics){
	                    	
	                   		for(var i=0;i<result.data.businessLicencePics.length;i++){
	                   			var $li = $(
					            '<div class="file-item thumbnail">' +
					                '<img>' +
					                '<em class="close"></em>' +
					            '</div>'
					           );
	                   			arr1.push(result.data.businessLicencePics[i].picId);
		                    	$li.find('img').attr('src',result.data.businessLicencePics[i].picUrl);
		                    	$li.find('em').on('click',citydelt);
		                    	consol.scaleImgs($li.find('img'));
		                    	$li.appendTo($('#citymanagerdetail2 #htbusinlic'));
		                    }
	                   		inndaejson.businessLicencePicIds=arr1;
	                   	}
	                    // 特种行业许可证
	                    if(result.data.spIndustryLicensePics){
	                    	
	                   		 for(var i=0;i<result.data.spIndustryLicensePics.length;i++){
	                   		 	var $li = $(
					            '<div class="file-item thumbnail">' +
					                '<img>' +
					                '<em class="close"></em>' +
					            '</div>'
					           );
		                    	arr2.push(result.data.spIndustryLicensePics[i].picId);
		                    	$li.find('img').attr('src',result.data.spIndustryLicensePics[i].picUrl);
		                    	$li.find('em').on('click',citydelt);
		                    	consol.scaleImgs($li.find('img'));
		                    	$li.appendTo($('#citymanagerdetail2 #htspecial'));
		                    }
	                   		inndaejson.spIndustryLicensePicIds=arr2;
	                   	}
	                    //企业法人身份证图片
	                    if(result.data.businessEntityIdcardPics){
	                    	
	                   		for(var i=0;i<result.data.businessEntityIdcardPics.length;i++){
	                   			var $li = $(
					            '<div class="file-item thumbnail">' +
					                '<img>' +
					                '<em class="close"></em>' +
					            '</div>'
					           	);
		                    	arr3.push(result.data.businessEntityIdcardPics[i].picId);
		                    	$li.find('img').attr('src',result.data.businessEntityIdcardPics[i].picUrl);
		                    	$li.find('em').on('click',citydelt);
		                    	consol.scaleImgs($li.find('img'));
		                    	$li.appendTo($('#citymanagerdetail2 #htpeocard'));
		                    }
	                   		inndaejson.businessEntityIdcardPicIds=arr3;
	                   	}
	                    // 竞争价格截图
	                    if(result.data.competitorPricePics){
	                    	
	                   		for(var i=0;i<result.data.competitorPricePics.length;i++){
	                   			var $li = $(
					            '<div class="file-item thumbnail">' +
					                '<img>' +
					                '<em class="close"></em>' +
					            '</div>'
					           );
		                    	arr4.push(result.data.competitorPricePics[i].picId);
		                    	$li.find('img').attr('src',result.data.competitorPricePics[i].picUrl);
		                    	$li.find('em').on('click',citydelt);
		                    	consol.scaleImgs($li.find('img'));
		                    	$li.appendTo($('#citymanagerdetail2 #htcomprescr'));
		                    }
	                   		inndaejson.competitorPricePicIds=arr4;
	                   	}
	                    $('#htsettperiod input').each(function(){
	                    	if($(this).val()===result.data.checkoutCircle){
	                    		$(this).attr('checked','checked');
	                    	}
	                    })
	                    $('#htbanklist option').each(function(){
	                    	if($(this).text()===result.data.depositBank){
	                    		$(this).attr('selected','true');
	                    		$('#citymanagerdetail2 .bankchekin').hide();
	                    		$('#citymanagerdetail2 .bankchekin').val('');
	                    		return false;
	                    	}else{
	                    		$('#htbanklist option:last').attr('selected','true');
	                    		$('#citymanagerdetail2 .bankchekin').show();
	                    		$('#citymanagerdetail2 .bankchekin').val(result.data.depositBank);
	                    		$('#citymanagerdetail2 .bakvalue').val(result.data.depositBank);
	                    	}
	                    	
	                    })
	                    if(result.data.fileFailedReason){
	                    	$('#callbakreson').show();
	                    	$('#callbakreson span').html(result.data.fileFailedReason);
	                    }
	                    if(result.data.auditFailedReason){
	                    	$('#calladreson').show();
	                    	$('#calladreson span').html(result.data.auditFailedReason);
	                    }
	                   //附加信息取值
	                   	$('#hthoteemail').val(result.data.hotelEmail);
	                    //$('.upshowlis span').eq(1).html(result.data.checkoutPeriod);
	                    $('#htsettcontact').val(result.data.checkoutPersonName);
	                    $('#htsettconphone').val(result.data.checkoutPersonPhone);
	                    $('#htsettconemail').val(result.data.checkoutPersonEmail);
	                    $('#htsettconbank').val(result.data.checkoutAccount);
	                    $('#htnamehodel').val(result.data.checkoutAccountName);
	                    
	                    
	                    $('#citymanagerdetail2 #htbanklisf').val(result.data.subDepositBank);
	                    $('#citymanagerdetail2 #htopenaccot').val(result.data.provinceOfBank);
	                    $('#citymanagerdetail2 #htopenacity').val(result.data.cityOfBank);
	                    $('#htaccoutype input').each(function(){
	                    	if($(this).val()===result.data.accountType){
	                    		$(this).attr('checked','checked');
	                    	}
	                    })
	                    $('#citymanagerdetail2 #htbaidumoid').val(result.data.baiduAccount);
                    }else{
	                	alert(result.msg);
	                }
                }).error(function (e) {
                   alert(信息有误);
                });
				$('#citymanagerdetail2 #htuprelist').on('click',function(){
					consol.delCookie('oerdehotId');
				})
       	}
    };
    return view;
});
