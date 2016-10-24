/**
 * @file mis后台管理 model数据
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(['jquery', 'env', 'underscore'], function ($, env, _) {
    var cache = {};
    // for coorder validate
    var $deferred = $.Deferred;
    return{
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
    	getSuppliers:function(){
    		var iflogin={
    			'idToken':'123456',
    			'from':'yunzhanggui'
    		}
    		$.ajax({  
                url : env.server+'/hotelself/util/logincheck',//路径  
                type : 'POST',  //提交方式  
                data :iflogin,//数据，这里使用的是Json格式进行传输  
                success : function(result) {//返回数据根据结果进行相应的处理  
                   //console.log(result) 
                   return result;
                }
            }); 
    	},
    	parseParam:function(param, key){
    		var paramStr="";
    		var _this=this;
		    if(param instanceof String||param instanceof Number||param instanceof Boolean){
		        paramStr+="&"+key+"="+encodeURIComponent(param);
		    }else{
		        $.each(param,function(i){
		            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
		            paramStr+='&'+_this.parseParam(this, k);
		        });
		    }
		    return paramStr.substr(1);
		},
		setCookie:function (name,value){
		    var Days = 30;
		    var exp = new Date();
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		    var strsec = getsec(time);
		    var exp = new Date();
		    exp.setTime(exp.getTime() + strsec*1);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
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
		    var cval=this.getCookie(name);
		    if(cval!=null)
		        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
		
    	
    }

});
