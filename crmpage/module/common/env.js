/**
 * @file mis后台管理环境文件
 * @author zhajiashun(zhajiashun@baidu.com)
 */
define(function () {
    var server = null;
    var server2 = null;
 	// server2='http://10.95.42.35:8106';
   	server = 'http://ebooking.baidu.com';
   	server2='http://ebooking.baidu.com';
   	// server = 'http://cq01-rdqa-dev041.cq01.baidu.com:8993';
    var hostname = location.hostname;
    var host = location.host;
    return {
        server: server,
        server2: server2
    };
});
