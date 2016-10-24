<form class="form-horizontal clearfix" onsubmit="return false;">
    <div class="col-md-6 form-group">
        <label for="accountnumber" class="control-label col-md-4">查询内容</label>
        <div class="col-md-8">
            <input type="text" class="form-control" name="accountnumber" placeholder="查询内容">
        </div>
    </div>
    <div class="col-md-6 form-group">
        <label for="accounttype" class="control-label col-md-4">查询类型</label>
        <div class="col-md-8">
            <select name="accounttype" class="form-control">
                <option value="1">手机号</option>
                <option value="2">邮箱</option>
                <option value="3">用户名</option>
                <option value="4">订单号</option>
                <option value="5">合作方订单号</option>
                <option value="6">乘车人手机号</option>
                <option value="7">取票人手机号</option>
            </select>
        </div>
    </div>
    <!--
    <div class="col-md-6 form-group">
        <label for="orderid" class="control-label col-md-4">订单号</label>
        <div class="col-md-8">
            <input type="text" class="form-control" name="orderid" placeholder="内部订单号">
        </div>
    </div>
    <div class="col-md-6 form-group">
        <label for="outerorderid" class="control-label col-md-4">合作方订单号</label>
        <div class="col-md-8">
            <input type="text" class="form-control" name="outerorderid" placeholder="合作方订单号">
        </div>
    </div>
    <div class="col-md-6 form-group">
        <label for="passengerphone" class="control-label col-md-4">乘车人手机号</label>
        <div class="col-md-8">
            <input type="text" class="form-control" name="passengerphone" placeholder="乘车人手机号">
        </div>
    </div>
    <div class="col-md-6 form-group">
        <label for="fetchuserphone" class="control-label col-md-4">取票人手机号</label>
        <div class="col-md-8">
            <input type="text" class="form-control" name="fetchuserphone" placeholder="取票人手机号">
        </div>
    </div>
    -->
    <div class="col-md-12 form-group text-center">
        <button id="query" type="button" class="btn btn-primary">查询</button>
    </div>
</form>
<div id="orderList" class="order-list" style=""></div>
