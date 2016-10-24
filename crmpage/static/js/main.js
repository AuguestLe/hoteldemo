/**
 * @file mis后台管理 main脚本
 * @author zhajiashun(zhajiashun@baidu.com)
 */
require(['jquery', 'env', 'model/model', 'router', 'common'], function ($, env, model, Router) {
    $(function () {
        // menu
        var menu = $('#menu').metisMenu();
        menu.find('a').click(function () {
            if ($(this).parent().hasClass('parent')) {
                return false;
            } else {
                menu.find('a').removeClass('active');
                $(this).addClass('active');
            }
        });
        var showtimeout = null;
        var router = null;
        function loadModule(modulePath, wrapId, req, method, urljson) {
            $(window).scrollTop(0);
            showtimeout = setTimeout(function () {
                $('.preloader').show();
            }, 100);
            var id = (wrapId || modulePath).replace(/\//g, '_');
            var wrap = $('#' + id);
            if (!wrap.length) {
                wrap = $('<div class="module-wrap" id="' + id + '"></div>').appendTo($('#module-content'));
            }
            $('.module-wrap').hide();
            wrap.show();
			if (modulePath) {
                require(['module/' + modulePath], function (m) {
                    clearTimeout(showtimeout);
                    $('.preloader').hide();
                    m.__router__ = router;
                    m[method ? method : 'init']({
                        req: req,
                       __router__: router
                    }, wrap);
                    //router.setLocation(modulePath+'?test=4')
                    //wrap.find('.breadcrumb .active a').attr('href',location.hash);
                });
            }
        }

        /*** router js ***/
        router = new Router();
        router.add('#/**', function (req, next) {
            // $('.main-menu a').removeClass('active');
            var link = req.href.replace(/(#\/.*?\/.*?)\/.*/, '$1');
            var menuitem = $('#menu').find('a[href="' + link+ '"]');
            var parent = menuitem.closest('.parent').not('.active').find('a');
            if (parent.length) {
                parent.click();
                menuitem.click();
            } else {
                menuitem.click();
            }
            var path = req.href.replace(/.*?#\/|\?.*/g, '').split(/\//);
            
            var wrapId = path.slice(0, 3);
            // order ==> order/order
            // order/orderrate ==> order/orderrate
            if (path.length === 1) {
                path.push(path[0]);
            }
            var method = path[2];
            path = path.slice(0, 2).join('/');
            wrapId = wrapId.join('_');
			
            //console.log(wrapId, req, method)
            
            loadModule(path, wrapId, req, method);
            
        }).errors(404, function (err, href) {
        	var urljson=model.geturlparms();
            $.ajax({
            	type:"post",
            	url:env.server+"/hotelself/util/logincheck",
            	data:{
            		"idToken":urljson.idToken,
            		"from":urljson.from,
            	},
            	dataType:"jsonp",
            }).success(function(result){
            	console.log(result);
            	var userkey={
	            		"idToken":urljson.idToken,
	            		"from":urljson.from,
	            		"hotelId":urljson.hotelID
		            };
            	if(result.errno===0){
            		console.log(userkey);
            		if(model.getCookie('oerdehotId')){
            			model.delCookie('oerdehotId');
            		}
	            	switch(result.data.roll){
	            		case '0':
		            		alert('请登录你的账号');
		            		break;
		            	case '1':
		            		alert('欢迎您管理员');
		            		break;
		            	case '2':
		            		alert('欢迎您城市经理');
		            		userkey.getCatch='1';
		            		break;
		            	case '3':
		            		alert('欢迎您内容管理员');
		            		break;
		            	case '4':
		            		alert('酒店经营者');
		            		break;		
	            	}
	            	$.ajax({
		            	type:"post",
		            	url:env.server+"/hotelself/contract/detail",
		            	data:userkey,
		            	dataType:"jsonp",
		            }).success(function(result){
		            	console.log(result);
		            	if(result.errno===0){
		            		router.redirect('#/order');
		            	}else{
		            		router.redirect('#/uploaddetails');
		            	}
		            	
		            });
	            }	
            });
        }).run();

       // logout
       //  var loginurl = env.auth + '/login?service=' + encodeURIComponent(location.href.replace(/\?.*/, ''));
        //$('#logout').click(function () {
           // location.href = env.auth + '/logout?service=' + encodeURIComponent(loginurl);
        //});
    });
});
