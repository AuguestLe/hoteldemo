/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/auditepage/auditepage.tpl',
    'jquery',
    'toomode'
], function (
    env,
    auditepage,$,consol) {
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
            container.html(auditepage);
            model.generatepage();
        }

    };
    model = {
       generatepage:function(){
       		var getuurl=consol.geturlparms();
       		//model.setCookie("idToken",getuurl.idToken);
       		//model.setCookie("from",getuurl.from);
       		//model.setCookie("hotelId",getuurl.hotelId);
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'hotelId':consol.getCookie('adhotelId')
			}
			$.ajax({
                    url: env.server+'/hotelself/contract/detail',
                    data: testchaog,
                    type : 'POST',  //提交方式  
                    dataType: 'jsonp'
                }).success(function (result) {
                   	console.log(result);
                    if(result.errno===0){
	                    //container.html(auditepage);
	                    //获取需要填写标签
	                    $('#auditepage').find('.rewlbe').eq(0).html(result.data.hotelId);
	                   	$('#auditepage').find('.rewlbe').eq(1).html(result.data.hotelName);
	                    $('#auditepage').find('.rewlbe').eq(2).html(result.data.bid);
	                    $('#auditepage').find('.rewlbe').eq(3).html(result.data.contractId);
	                   	// 图片取值
	                   	// 合同上传图片
	                   	if(result.data.contractPics){
	                   		for(var i=0;i<result.data.contractPics.length;i++){
	                   			var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	//var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.find('img').attr('src',result.data.contractPics[i].picUrl);
		                    	exmimglist.appendTo($('#auditepage .upshowlis-img').eq(0));
		                    	//放大图片
		                    	model.scaleImgs(exmimglist.find('img'));
	                   		}
	                   	}
	                   	// 营业执照副本
	                    if(result.data.businessLicencePics){
	                   		for(var i=0;i<result.data.businessLicencePics.length;i++){
		                    	var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	exmimglist.find('img').attr('src',result.data.businessLicencePics[i].picUrl);
		                    	exmimglist.appendTo($('#auditepage .upshowlis-img').eq(1));
		                    	//放大图片
		                    	model.scaleImgs(exmimglist.find('img'));
	                   		}
	                   	}
	                    // 特种行业图片
	                    if(result.data.spIndustryLicensePics){
	                   		 for(var i=0;i<result.data.spIndustryLicensePics.length;i++){
		                    	var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	exmimglist.find('img').attr('src',result.data.spIndustryLicensePics[i].picUrl);
		                    	exmimglist.appendTo($('#auditepage .upshowlis-img').eq(2));
		                    	//放大图片
		                    	model.scaleImgs(exmimglist.find('img'));
	                   		 }
	                   	}
	                    //企业法人身份证
	                    if(result.data.businessEntityIdcardPics){
	                   		for(var i=0;i<result.data.businessEntityIdcardPics.length;i++){
		                    	var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	exmimglist.find('img').attr('src',result.data.businessEntityIdcardPics[i].picUrl);
		                    	exmimglist.appendTo($('#auditepage .upshowlis-img').eq(3));
		                    	//放大图片
		                    	model.scaleImgs(exmimglist.find('img'));
	                   		}
	                   	}
	                    //竞争价格截图
	                    if(result.data.competitorPricePics){
	                   		for(var i=0;i<result.data.competitorPricePics.length;i++){
		                    	var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	exmimglist.find('img').attr('src',result.data.competitorPricePics[i].picUrl);
		                    	exmimglist.appendTo($('#auditepage .upshowlis-img').eq(4));
		                    	//放大图片
		                    	model.scaleImgs(exmimglist.find('img'));
	                   		}
	                   	}
	                    var chekcirl='';
	                    if(result.data.checkoutCircle==='7'){
	                    	chekcirl='周结';
	                    }else if(result.data.checkoutCircle==='14'){
	                    	chekcirl='半月结';
	                    }else if(result.data.checkoutCircle==='30'){
	                    	chekcirl='月结';
	                    }
	                    var myacctype='';
	                    if(result.data.accountType==='1'){
	                    	myacctype='企业账户';
	                    }else if(result.data.accountType==='2'){
	                    	myacctype='私人账户';
	                    }
	                   	// 附加信息取值
	                   	$('#auditepage .upshowlis span').eq(0).html(result.data.hotelEmail);
	                    $('#auditepage .upshowlis span').eq(1).html(chekcirl);
	                    $('#auditepage .upshowlis span').eq(2).html(result.data.checkoutPersonName);
	                    $('#auditepage .upshowlis span').eq(3).html(result.data.checkoutPersonPhone);
	                    $('#auditepage .upshowlis span').eq(4).html(result.data.checkoutPersonEmail);
	                    $('#auditepage .upshowlis span').eq(5).html(result.data.checkoutAccount);
	                    $('#auditepage .upshowlis span').eq(6).html(result.data.checkoutAccountName);
	                    $('#auditepage .upshowlis span').eq(7).html(result.data.depositBank);
	                    $('#auditepage .upshowlis span').eq(8).html(result.data.subDepositBank);
	                    $('#auditepage .upshowlis span').eq(9).html(result.data.provinceOfBank);
	                    $('#auditepage .upshowlis span').eq(10).html(result.data.cityOfBank);
	                    $('#auditepage .upshowlis span').eq(11).html(myacctype);
	                    if(result.data.baiduAccount){
	                    	$('#auditepage .upshowlis span').eq(12).html(result.data.baiduAccount);
	                    }else{
	                    	$('#auditepage .upshowlis span').eq(12).html('');
	                    }
	                    if(result.data.auditFailedReason){
	                    	$('#auditepage .aduditretu').val(result.data.auditFailedReason);
	                    }else{
	                    	$('#auditepage .aduditretu').val('');
	                    }
	                	var getuurl=model.geturlparms();
	                	$('#auditepas').click(function(){
                         	var tolistab={
                              	'idToken':getuurl.idToken,
                              	'from':getuurl.from,
                              	'hotelId':$("#auditepage").find('.rewlbe').eq(0).text(),
                              	'auditState':'1'
                            }
                            model.setaudits(tolistab);
	                	});
	                	$('#auditeern').click(function(){
                         	if(!$(".aduditretu").val()){
								alert("请填写打回备注信息");
								return;
							}else{
								var reason = $(".aduditretu").val();
	                         	var tolistab={
	                              'idToken':getuurl.idToken,
	                              'from':getuurl.from,
	                              'hotelId':$("#auditepage").find('.rewlbe').eq(0).text(),
	                              'auditState':'2',
	                              'auditFailedReason':reason
	                            }
	                            model.setaudits(tolistab);
							}
                        });
	                }
                }).error(function (e) {
                   alert(信息有误);
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
    	},
    	setCookie:function (name,value){
		    var Days = 30;
		    var exp = new Date();
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
//		    var strsec = this.getsec(time);
//		    var exp = new Date();
//		    exp.setTime(exp.getTime() + strsec*1);
//		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		},
		//读取cookies
		getCookie:function (name){
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg))
		        return (arr[2]);
		    else
		        return null;
		},
		//删除cookies
		delCookie:function (name){
		    var exp = new Date();
		    exp.setTime(exp.getTime() - 1);
		    var cval=getCookie(name);
		    if(cval!=null)
		        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		},
		getsec:function (str){
		   console.log(str);
		   var str1=str.substring(1,str.length)*1;
		   var str2=str.substring(0,1);
		   if (str2=="s")
		   {
		        return str1*1000;
		   }else if (str2=="h"){
		       return str1*60*60*1000;
		   }else if (str2=="d"){
		       return str1*24*60*60*1000;
		   }
		},
		setaudits:function(setdata){
       		$.ajax({
               url: env.server+'/hotelself/contract/setauditstate',
               data: setdata,
               type : 'POST',  //提交方式
               dataType: 'jsonp'
            }).success(function(result){
	           	console.log(result);
	           	if(result.errno===0){
	           		// model.generatepage();
	           		alert('操作成功,请返回列表查看');
	           		location.href='#/adsumpage';
	           	}else{
	           		alert(result.msg);
	           	}
            });
       	},
       	scaleImgs: function (ele) {
            ele.click(function () {
                var scaleImg = $(this).attr('src')
                var newEle = $('<div class="layImg"><span class="remove"></span><img class="scaleImg" src=' + scaleImg + '></div>');
                newEle.appendTo($("body"));
                var imgWidth = $(".scaleImg").width();
                var posRight = ($(".layImg").width() - imgWidth) / 2 - 20;
                $(".remove").css("right", posRight)
                $(".remove").on("click", function () {
                    $('.layImg').remove();
                })
            })
        }
    };
    return view;
});
