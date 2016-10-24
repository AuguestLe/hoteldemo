/**
 * @file mis后台管理 model数据
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(['jquery', 'env'], function ($, env) {
    //var cache = {};
    // for coorder validate
    //var $deferred = $.Deferred;
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
//		    var strsec = getsec(time);
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
		    var cval=this.getCookie(name);
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
		getUnixTime:function (dateStr){
		    var newstr = dateStr.replace(/-/g,'/'); 
		    var date =  new Date(newstr); 
		    var time_str = date.getTime().toString();
		    return time_str.substr(0, 10);
		},
		UnixToDate: function(unixTime, isFull, timeZone) {
			if(parseInt(unixTime)===0){
				return unixTime;
			}else{
				if (typeof (timeZone) == 'number'){
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth()+1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true){
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
			}
                
        },
       	scaleImgs: function (ele) {
            ele.click(function () {
                var scaleImg = $(this).attr('src')
                var newEle = $('<div class="layImg"><span class="remove"></span><img class="scaleImg" src=' + scaleImg + '></div>');
                newEle.appendTo($("body"));
                $(".layImg").height($('body').height());
                var imgWidth = $(".scaleImg").width();
                var posRight = ($(".layImg").width() - imgWidth) / 2 - 20;
                $(".remove").css("right", posRight)
                $(".remove").on("click", function () {
                    $('.layImg').remove();
                })
            })
    	},
    	moneyrefun: function (money) {
    		if(money){
    			if(parseInt(money)===0){
	    			return 0;
	    		}else{
	    			var str=parseInt(money).toString();
		    		var strr='';
		    		if(str.length===1){
		    			return strr+='0.'+money+'0';
		    		}else if(str.length>2){
		    			strr+=str.substring(0,str.length-2);
			    		strr+='.'
			    		strr+=str.substr(str.length-2,2);
			    		return strr;
		    		}else{
		    			return strr+='0.'+money;
	    			};
    			}
    		}
    	},
		loading:function(suces){
			var newMsk=$('<div class="loadmask"></div>');
			if(suces===false){
				newMsk.appendTo($("body"));
			}else{
				$("body").find('.loadmask').remove();
			}
		}
    };

});
