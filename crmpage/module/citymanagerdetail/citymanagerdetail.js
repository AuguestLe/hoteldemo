/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/citymanagerdetail/citymanagerdetail.tpl',
    'jquery',
    'toomode'
], function (
    env,
    citymanagerdetailtpl,$,consol) {
    var view;
    var model;
    model = {
       generatepage:function(container){
       		var getuurl=consol.geturlparms();
       		var urlId=getuurl.hotelId;
       		var ordId=consol.getCookie('oerdehotId');
       		var hoelid=null;
       		console.log(urlId,ordId);
       		if(ordId){
       			hoelid=ordId;
       		}else{
       			hoelid.urlId;
       		}
       		var _this=this;
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'hotelId':hoelid,
				'getCache':'1'
			}
			$._ajax({
                    url: env.server+'/hotelself/contract/detail',
                    data: testchaog,
                    type : 'POST',  //提交方式  
                    dataType: 'jsonp'
                }).success(function (result) {
                	var tyepname='';
                	console.log(result);
                    if(result.errno===0){
	                    container.html(citymanagerdetailtpl);
	                    //获取需要填写标签
	                    $('#citymanagerdetail .rewlbe').eq(0).html(result.data.hotelId);
	                    $('#citymanagerdetail .rewlbe').eq(1).html(result.data.hotelName);
	                    $('#citymanagerdetail .rewlbe').eq(2).html(result.data.bid);
	                    $('#citymanagerdetail .rewlbe').eq(3).html(result.data.contractId);
	                   //图片取值
	                   	if(result.data.contractPics){
	                   		for(var i=0;i<result.data.contractPics.length;i++){
		                    	var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.attr('src',result.data.contractPics[i].picUrl);
		                    	exmimglist.appendTo($('#citymanagerdetail .upshowlis-img').eq(0));
		                    }
	                   	}
	                    if(result.data.businessLicencePics){
	                   		for(var i=0;i<result.data.businessLicencePics.length;i++){
		                    	var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.attr('src',result.data.businessLicencePics[i].picUrl);
		                    	exmimglist.appendTo($('#citymanagerdetail .upshowlis-img').eq(1));
		                    }
	                   	}
	                    if(result.data.businessEntityIdcardPics){
	                   		for(var i=0;i<result.data.businessEntityIdcardPics.length;i++){
		                    	var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.attr('src',result.data.businessEntityIdcardPics[i].picUrl);
		                    	exmimglist.appendTo($('#citymanagerdetail .upshowlis-img').eq(2));
		                    }
	                   	}
	                    if(result.data.spIndustryLicensePics){
	                   		 for(var i=0;i<result.data.spIndustryLicensePics.length;i++){
		                    	var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.attr('src',result.data.spIndustryLicensePics[i].picUrl);
		                    	exmimglist.appendTo($('#citymanagerdetail .upshowlis-img').eq(3));
		                    }
	                   	}
	                    if(result.data.competitorPricePics){
	                   		for(var i=0;i<result.data.competitorPricePics.length;i++){
		                    	var exmimglist=$('<img src="" alt="">');
		                    	exmimglist.attr('src',result.data.competitorPricePics[i].picUrl);
		                    	exmimglist.appendTo($('#citymanagerdetail .upshowlis-img').eq(4));
		                    }
	                   	}
	                    
	                    if(result.data.accountType==='1'){
	                    	tyepname='企业账户'; 
	                    }else{
	                    	tyepname='私人账户'; 
	                    }
	                   //附加信息取值
	                   	$('#citymanagerdetail .upshowlis span').eq(0).html(result.data.hotelEmail);
	                    $('#citymanagerdetail .upshowlis span').eq(1).html(result.data.checkoutPeriod);
	                    $('#citymanagerdetail .upshowlis span').eq(2).html(result.data.checkoutPersonName);
	                    $('#citymanagerdetail .upshowlis span').eq(3).html(result.data.checkoutPersonPhone);
	                    $('#citymanagerdetail .upshowlis span').eq(4).html(result.data.checkoutPersonEmail);
	                    $('#citymanagerdetail .upshowlis span').eq(5).html(result.data.checkoutAccount);
	                    $('#citymanagerdetail .upshowlis span').eq(6).html(result.data.checkoutAccountName);
	                    $('#citymanagerdetail .upshowlis span').eq(7).html(result.data.depositBank);
	                    $('#citymanagerdetail .upshowlis span').eq(8).html(result.data.subDepositBank);
	                    $('#citymanagerdetail .upshowlis span').eq(9).html(result.data.provinceOfBank);
	                    $('#citymanagerdetail .upshowlis span').eq(10).html(result.data.cityOfBank);
	                    $('#citymanagerdetail .upshowlis span').eq(11).html(tyepname);
	                    $('#citymanagerdetail .upshowlis span').eq(12).html(result.data.baiduAccount);
	                	
	                }
                }).error(function (e) {
                   alert(信息有误);
                });
				$('.upshowbtn-save').on('click',function(){
					consol.delCookie('oerdehotId');
				})
			
       	},
    };
    view = {
        init: function (data, container) {
            if (this.inited) {
                return;
            }
            this.inited = 0;
            this.container = container;
            // container.html(_.template(orderquerytpl)(data || {}));
            model.generatepage(container)
            container.html(citymanagerdetailtpl);
        }

    };
    
    return view;
});
