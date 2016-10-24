/**
 * @file mis后台管理-订单管理
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define([
    'env',
    'text!module/archivedetipage/archivedetipage.tpl',
    'jquery',
    'toomode'
], function (
    env,
    archivedetipagetpl,$,consol) {
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
            container.html(archivedetipagetpl);
            model.generatepage();
          			
        }

    };
    model = {
       generatepage:function(){
       		var getuurl=this.geturlparms();
       		var testchaog={
				'idToken':getuurl.idToken,
				'from':getuurl.from,
				'hotelId':consol.getCookie('archhotelId')
				//'getCache':'1'
			}
			$.ajax({
                    url: env.server+'/hotelself/contract/detail',
                    data: testchaog,
                    type : 'POST',  //提交方式  
                    dataType: 'jsonp'
                }).success(function (result) {
                    if(result.errno===0){
	                    //container.html(archivedetipagetpl);
	                    $('.archedtihotelid').html(result.data.hotelId);
       					$('.archedtihotelname').html(decodeURI(result.data.hotelName));
       					$('.archedtibid').html(result.data.bid);
	                   	//图片取值
	                   	$('.archedtioid').html(result.data.contractId);
	                   	if(result.data.contractPics){
	                   		for(var i=0;i<result.data.contractPics.length;i++){
		                    	var exmimglist = $(
						            '<div class="file-item thumbnail">' +
						                '<img>' +
						            '</div>'
						           );
		                    	exmimglist.find('img').attr('src',result.data.contractPics[i].picUrl);
		                    	consol.scaleImgs(exmimglist.find('img'));
		                    	exmimglist.appendTo($('#archivedetipage .upshowlis-img').eq(0));
		                    }
	                   	} 
	                   	//  放大图片
	                    imgchil = $('.upshowlis-img').eq(0).children("img");
	                    model.scaleImgs(imgchil);
						//归档
	                    var getuurl = model.geturlparms();
	                    $("#archsuces").click(function () {
	                        var tolistab = {
	                            'idToken': getuurl.idToken,
	                            'from': getuurl.from,
	                            'hotelId': $(".archedtihotelid").text(),
	                            'fileState': '2'
	                        }
	                        console.log(tolistab);
	                        model.setarchive(tolistab);
	                    })
	                    $("#archerron").click(function () {
	                    	if(!$(".archivrturn").val()){
								alert("请填写打回备注信息");
								return;
							}
							var reason = $(".archivrturn").val();
	                        var tolistab = {
	                            'idToken': getuurl.idToken,
	                            'from': getuurl.from,
	                            'hotelId': $(".archedtihotelid").text(),
	                            'fileState': '1',
	                            'fileFailedReason':reason
	                        }
	                        console.log(tolistab);
	                        model.setarchive(tolistab);
	                    });
//	                    $('#returns').on('click',function(){
//	                    	location.reload();
//	                    })
	                }else{
	                	alert(result.msg);
	                }
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
		setarchive: function (setdata) {
            $.ajax({
                url: env.server + '/hotelself/contract/setfilestate',
                data: setdata,
                type: 'POST',  //提交方式
                dataType: 'jsonp'
            }).success(function (result) {
                console.log(result);
                if(result.errno===0){
                	alert('操作成功，请返回列表！')
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
