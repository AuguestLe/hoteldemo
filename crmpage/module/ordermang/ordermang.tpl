<div class="header">
	<div class="head-list">
		<label>酒店名称</label>
		<input class="hotelname" type="text"value="" >
	</div>
	<div class="head-list">
		<label>下单时间</label>
		<input id="ordertimein" type="text" value="" />
		<label>至</label>
		<input id="ordertimout" type="text" value="" />
	</div>
	<div class="head-list">
		<label>订单状态</label>
		<select class="head-lischeck">
			<option value="">全部</option>
			<option value="1">下单成功,等待支付</option>
			<option value="2">下单失败</option>
			<option value="3">支付成功，等待确认</option>
			<option value="4">支付成功，确认成功</option>
			<option value="5">支付成功，确认失败</option>
			<option value="6">订单取消</option>
			<option value="7">已入住</option>
			<option value="8">已离店</option>
		</select>
	</div>
	<div class="head-list">
		<a class="hsearchbtn" id="ordermangbtn" href="javascript:;">查询</a>
	</div>
</div>
<div class="conent" style="overflow: auto;">
	<table class="audsumry" id="ordermanlist" style="width: 150%;">
		<thead>
			<tr>
				<th>下单时间</th>
				<th>订单号</th>
				<th>订单状态</th>
				<th>间夜</th>
				<th>预订类型</th>
				<th>到店时间</th>
				<th>离店时间</th>
				<th>入住人</th>
				<th>手机号</th>
				<th>酒店名称</th>
				<th>城市经理</th>
				<th>卖价</th>
				<th>佣金率</th>
				<th>结算价</th>
				<th>结算状态</th>
				<th>支付金额</th>
			</tr>
		</thead>
		<tbody>
			<!--<tr>
				<td>10034</td>
				<td><a href="javascript:;">上地绿地喜来登酒店</a></td>
				<td>张三</td>
				<td>待审</td>
				<td>已归档</td>
				<td>
					<span>查看</span>
					<span>删除</span>
				</td>
			</tr>-->
			
		</tbody>
	</table>
	<div class="M-box" id="ordmgpagnate"></div>
</div>	

