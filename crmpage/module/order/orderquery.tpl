<div class="header">
	<div class="head-list">
		<label>酒店ID</label>
		<input type="text" value="" class="orderhotid">
	</div>
	<div class="head-list">
		<label>酒店名称</label>
		<input type="text" value="" class="ordername">
	</div>
	<div class="head-list">
		<label>审核状态</label>
		<select class="head-lischeck">
			<option value="">全部</option>
			<option value="0">未上传合同</option>
			<option value="1">通过</option>
			<option value="2">不通过</option>
			<option value="3">待审</option>
			<option value="4">已冻结</option>
		</select>
	</div>
	<div class="head-list">
		<label>归档状态</label>
		<select class="head-lischeck">
			<option value="">全部</option>
			<option value="0">未归档</option>
			<option value="1">归档失败</option>
			<option value="2">已归档</option>
		</select>
	</div>
	<div class="head-list">
		<a class="hsearchbtn" id="ordershear" href="javascript:;">查询</a>
	</div>
</div>
<div class="conent">
	<table class="audsumry" id="audsumry">
		<thead>
			<tr>
				<th>酒店ID</th>
				<th>酒店名称</th>
				<th>城市经理</th>
				<th>审核状态</th>
				<th>归档状态</th>
				<th>操作</th>
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
</div>	

