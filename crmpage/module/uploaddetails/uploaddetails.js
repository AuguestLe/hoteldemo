/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/uploaddetails/uploaddetails.tpl',
    'webuploader',
    'jquery',
    'toomode'
], function (
    env,
    uploaddetailstpl,
    WebUploader,$,consol) {
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
            container.html(uploaddetailstpl);
            model.webupload();
        }

    };
    model = {
        webupload:function(){
			var imgBox='';
			var upinndaejson={};
			var uparr=[];
			var uparr1=[];
			var uparr2=[];
			var uparr3=[];
			var uparr4=[];
			var _this=this;
			//console.log(_this.geturlparms());
			$('.chekbtn').each(function(){
				$(this).click(function(){
					imgBox=$(this).prev().attr('id');
				})
			});
			var geturl=consol.geturlparms();
			$('#uploadhed').find('span').eq(0).html(decodeURI(geturl.hotelID));
            $('#uploadhed').find('span').eq(1).html(decodeURI(geturl.hotelName));
            $('#uploadhed').find('span').eq(2).html(decodeURI(geturl.bid));
			$.ajax({  
                url : env.server+'/hotelself/util/getbanklist',//路径  
                type : 'POST',  //提交方式  
                data :'11',//数据，这里使用的是Json格式进行传输  
                success : function(result) {//返回数据根据结果进行相应的处理  
                    for(var i=0;i<result.data.length;i++){
                    	var upopts=$('<option value=""></option>');
                    	upopts.text(result.data[i]);
                    	upopts.appendTo($('#banklist'));
                    }
                    $('<option value="其他">其他</option>').appendTo($('#banklist'));
                    $('.bakvalue').val($('#banklist option:selected').text());
					$('.bankchek select').change(function(){
						$('.bakvalue').val($('#banklist option:selected').text());
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
			    swf:'/Uploader.swf',
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
			    id: '#contractbtn'
			});
			uploader.addButton({
			    id: '#businlicbtn'
			});
			uploader.addButton({
			    id: '#specialbtn'
			});
			uploader.addButton({
			    id: '#peocardbtn'
			});
			uploader.addButton({
			    id: '#comprescrbtn'
			});
			// 当有文件添加进来的时候
			uploader.on( 'fileQueued', function( file ) {
				var $list=$('#'+imgBox);
			    var $li = $(
			            '<div id="' + file.id + '" class="file-item thumbnail">' +
			                // '<img>' +
			                '<p class="info">' + file.name + '</p>' +
			                '<em class="close"></em>' +
			            '</div>'
			           );
			    // $imge = $li.find('img');
				$delet=$li.find('.close');
				$delet.on('click',function(){
					var myparentname=$(this).parent().parent().prev('label').html();
					var myPos=$(this).parent().index();
					switch (myparentname){
				    	case '合同上传':
					    	uparr.splice(myPos,1);
					    	upinndaejson.contractPicIds=uparr;
				    		break;
				    	case '营业执照副本':
					    	uparr1.splice(myPos,1);
					    	upinndaejson.businessLicencePicIds=uparr1;
					    	break;
				    	case '特种行业许可证':
					    	uparr2.splice(myPos,1);
					    	upinndaejson.spIndustryLicensePicIds=uparr2;
					    	break;
				    	case '企业法人身份证':
					    	uparr3.splice(myPos,1);
					    	upinndaejson.businessEntityIdcardPicIds=uparr3;
					    	break;
				    	case '竞争价格截图':
					    	uparr4.splice(myPos,1);
					    	upinndaejson.competitorPricePicIds=uparr4;
					    	break;
				    }
					uploader.removeFile( file );
					$(this).parent().remove();
				})
			    // 创建缩略图
			    // 如果为非图片文件，可以不用调用此方法。
			    // thumbnailWidth x thumbnailHeight 为 100 x 100
			    // $list为容器jQuery实例
			    uploader.makeThumb( file, function( error, src ) {
			    	$img=$('<img>');
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        };
			        $img.attr( 'src', src );
			        $li.append($img);
			    }, 100, 100 );
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
			    $('#'+file.id).addClass('upload-state-done'); 
			    switch ($( '#'+file.id ).parent().prev().html()){
			    	case '合同上传':
			    	uparr.push(response.data.picid);
			    	upinndaejson.contractPicIds=uparr;
			    	break;
			    	case '营业执照副本':
			    	uparr1.push(response.data.picid);
			    	upinndaejson.businessLicencePicIds=uparr1;
			    	break;
			    	case '特种行业许可证':
			    	uparr2.push(response.data.picid);
			    	upinndaejson.spIndustryLicensePicIds=uparr2;
			    	break;
			    	case '企业法人身份证':
			    	uparr3.push(response.data.picid);
			    	upinndaejson.businessEntityIdcardPicIds=uparr3;
			    	break;
			    	case '竞争价格截图':
			    	uparr4.push(response.data.picid);
			    	upinndaejson.competitorPricePicIds=uparr4;
			    	break;
			    }
			});
			
			// 文件上传失败，显示上传出错。
			uploader.on( 'uploadError', function( file ) {
			    var $li = $( '#'+file.id ),
			        $error = $li.find('div.error');
			    // 避免重复创建
			    if ( !$error.length ) {
			        $error = $('<p class="error"></p>').appendTo( $li );
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
			$('#uploadcomit').on( 'click', function() { 
				//console.log(upinndaejson);
				var settperiod=$('#uploaddetails').find('#settperiod').children('input:checked').val();
				var accoutype=$('#uploaddetails').find('#accoutype').children('input:checked').val();
				var comitdata={
					'idToken':geturl.idToken,
					'from':geturl.from,
					'hotelId':geturl.hotelID,
					'hotelName':decodeURI(geturl.hotelName),
					'bid':geturl.bid,
					'managerId':geturl.managerID,
					'managerName':decodeURI(geturl.managerName),
					'contractId':$('#upconanum').val(),
					
					'checkoutAccount':$('#settconbank').val(),
					'checkoutCircle':settperiod,
					'checkoutAccountName':$('#namehodel').val(),
					'checkoutPersonName':$('#settcontact').val(),
					'checkoutPersonPhone':$('#settconphone').val(),
					'checkoutPersonEmail':$('#settconemail').val(),
					'depositBank':$('.bakvalue').val(),
					'subDepositBank':$('#banklisf').val(),
					'provinceOfBank':$('#openaccot').val(),
					'cityOfBank':$('#openacity').val(),
					'accountType':accoutype,
					//'baiduAccount':$('#baidumoid').val(),
					'hotelEmail':$('#hoteemail').val(),
				}
				// 合同图片
			 	if(upinndaejson.contractPicIds){
			 		if(upinndaejson.contractPicIds.length){
			 			comitdata.contractPicIds=JSON.stringify(upinndaejson.contractPicIds);
			 		}else{
						comitdata.contractPicIds='';
					}
				}else{
					comitdata.contractPicIds='';
				}
				// 营业执照图片
			 	if(upinndaejson.businessLicencePicIds){
			 		if(upinndaejson.businessLicencePicIds.length){
			 			comitdata.businessLicencePicIds=JSON.stringify(upinndaejson.businessLicencePicIds);
			 		}else{
						comitdata.businessLicencePicIds='';
					}
				}else{
					comitdata.businessLicencePicIds='';
				}
				
				//企业法人图片
			 	if(upinndaejson.businessEntityIdcardPicIds){
			 		if(upinndaejson.businessEntityIdcardPicIds.length){
			 			comitdata.businessEntityIdcardPicIds=JSON.stringify(upinndaejson.businessEntityIdcardPicIds);
			 		}else{
						comitdata.businessEntityIdcardPicIds='';
					}
				}else{
					comitdata.businessEntityIdcardPicIds='';
				}
				
				for (key in comitdata){
					if(!comitdata[key]){
						alert('你有未填项！');
						return false;
					}
				}
				//竞争价格图片
			 	if(upinndaejson.competitorPricePicIds){
			 		if(upinndaejson.competitorPricePicIds.length){
			 			comitdata.competitorPricePicIds=JSON.stringify(upinndaejson.competitorPricePicIds);
			 		}else{
						comitdata.competitorPricePicIds='';
					}
				}else{
					comitdata.competitorPricePicIds='';
				}
				//特种行业图片
			 	if(upinndaejson.spIndustryLicensePicIds){
			 		comitdata.spIndustryLicensePicIds=JSON.stringify(upinndaejson.spIndustryLicensePicIds);
				}
				if($('#baidumoid').val()){
					comitdata.baiduAccount=$('#baidumoid').val();
				}
				
				var _this=$(this);
				$.ajax({  
	                url : env.server+'/hotelself/contract/update',//路径  
	                type : 'POST',  //提交方式  
	                data :comitdata,//数据，这里使用的是Json格式进行传输  
	                beforeSend: function () {
				        // 禁用按钮防止重复提交
				        _this.attr({ disabled: "disabled" });
				        _this.css({'background':'#ccc','color':'#d1d1d1'})
				    },
	                success : function(result) {//返回数据根据结果进行相应的处理  
	                    if(result.errno===0){
	                    	alert('提交成功');
	                    	_this.removeAttr('disable');
	                    	_this.removeAttr("disabled");
	            			_this.css({'background':'deepskyblue','color':'#ffffff'})
	                    	location.href='#/order';
	                    }else{
	                    	alert(result.msg);
	                    }
	                }
	            });    
			});
			
			$('#testurplist').on('click',function(){
				alert('请点击提交按钮！');
				var settperiod=$('#settperiod').children('input:checked').val();
				var accoutype=$('#accoutype').children('input:checked').val();
				var tscomitdata={
					'idToken':geturl.idToken,
					'from':geturl.from,
					'hotelId':geturl.hotelID,
					'hotelName':decodeURI(geturl.hotelName),
					'bid':geturl.bid,
					'managerId':geturl.managerID,
					'managerName':decodeURI(geturl.managerName),
					'contractId':$('#upconanum').val(),
					'contractPicIds':JSON.stringify(upinndaejson.contractPic),
					'businessLicencePicIds':JSON.stringify(upinndaejson.businessLicencePic),
					'businessEntityIdcardPicIds':JSON.stringify(upinndaejson.businessEntityIdcardPicIds),
					//'businessEntityIdcardPicIds':JSON.stringify(['121900334','121900334','121900334']),
					'spIndustryLicensePicIds':JSON.stringify(upinndaejson.spIndustryLicensePic),
					'competitorPricePicIds':JSON.stringify(upinndaejson.competitorPricePic),
					'checkoutAccount':$('#settconbank').val(),
					'checkoutCircle':settperiod,
					'checkoutAccountName':$('#namehodel').val(),
					'checkoutPersonName':$('#settcontact').val(),
					'checkoutPersonPhone':$('#settconphone').val(),
					'checkoutPersonEmail':$('#settconemail').val(),
					'depositBank':$('#uploaddetails .bakvalue').val(),
					'subDepositBank':$('#banklisf').val(),
					'provinceOfBank':$('#openaccot').val(),
					'cityOfBank':$('#openacity').val(),
					'accountType':accoutype,
					'baiduAccount':$('#baidumoid').val(),
					'hotelEmail':$('#hoteemail').val(),
				};
				// var _myself=$(this);
				
				// $.ajax({  
	                // url : env.server+'/hotelself/contract/tempsave',//路径  
	                // type : 'POST',  //提交方式  
	                // data :tscomitdata,//数据，这里使用的是Json格式进行传输  
	                // beforeSend: function () {
				        // 禁用按钮防止重复提交
				        // _myself.attr({ disabled: "disabled" });
				        // _myself.css({'background':'#ccc','color':'#d1d1d1'})
				    // },
	                // success : function(result) {//返回数据根据结果进行相应的处理  
	                    // if(result.errno===0){
	                    	// alert('保存成功');
	                    	// _myself.removeAttr('disable');
	                    	// _myself.removeAttr("disabled");
	            			// _myself.css({'background':'deepskyblue','color':'#ffffff'})
	                    	// location.href='#/order';
	                    // }else{
	                    	// alert(result.msg);
	                    // }
	                // }
	            // }); 
			})
			 
      	}
    };
    return view;
});
