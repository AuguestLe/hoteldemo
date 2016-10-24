<div class="header">
	<div class="head-list">
		<label>酒店ID</label>
		<input type="text" class="accontmhtelid" >
	</div>
	<div class="head-list">
		<label>酒店名称</label>
		<input type="text" class="accontmhtelname">
	</div>
	<div class="head-list">
		<label>批次开始时间</label>
		<input id="accoutstar" type="text" />
	</div>
	<div class="head-list">
		<label>批次结束时间</label>
		<input id="accoutend" type="text" />
	</div>
	<div class="head-list">
		<label>付款状态</label>
		<select class="head-lischeck" id="accontstus">
			<option value="">全部</option>
			<option value="0">待确认</option>
			<option value="1">待打款</option>
			<option value="2">打款中</option>
			<option value="3">打款成功</option>
		</select>
	</div>
	<div class="head-list">
		<a class="hsearchbtn" id="accoutsearbtn" href="javascript:;">查询</a>
	</div>
</div>
<div class="conent" style="overflow: auto;">
	<table class="audsumry" style="width: 160%;" >
		<thead>
			<tr>
				<th>账单ID</th>
				<th>账期</th>
				<th>付款时间</th>
				<th>打款状态</th>
				<th>错误信息</th>
				<th>银行账号</th>
				<th>开户名</th>
				<th>酒店ID</th>
				<th>酒店名称</th>
				<th>城市经理</th>
				<th>结算周期</th>
				<th>应付金额</th>
				<th>操作人</th>
			</tr>
		</thead>
		<tbody>
			<!--<tr>
				<td><input type="checkbox" name="setscheck" id="" value="" /></td>
				<td>120389</td>
				<td><a href="javascript:;">20160901-20160908</a></td>
				<td>2016-9-11 10：44：09</td>
				<td>10034</td>
				<td>上海绿地喜来登酒店</td>
				<td>张三</td>
				<td>周结</td>
				<td>2309</td>
				<td>赵四</td>
			</tr>-->
		</tbody>
	</table>
	<div class="M-box" id="accotpagnate"></div>
</div>	

