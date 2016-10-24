<from id="uploadbox">
	<div class="header" id="uploadhed">
		<div class="head-list">
			<label>酒店ID</label>
			<span></span>
		</div>
		<div class="head-list">
			<label>酒店名称</label>
			<span></span>
		</div>
		<div class="head-list">
			<label>BID</label>
			<span></span>
		</div>
		<div class="head-list">
			<label>合同编号</label>
			<input id="upconanum" type="text" />
		</div>
	</div>
	<div class="conent">
		<div class="upshowlis">
			<label>合同上传</label>
			<!--用来存放item-->
		    <div id="contract" class="upshowlis-img"></div>
		    <div id="contractbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>营业执照副本</label>
			<!--用来存放item-->
		    <div id="businlic" class="upshowlis-img"></div>
		    <div id="businlicbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>特种行业许可证</label>
			<!--用来存放item-->
		    <div id="special" class="upshowlis-img"></div>
		    <div id="specialbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>企业法人身份证</label>
			<!--用来存放item-->
		    <div id="peocard" class="upshowlis-img"></div>
		    <div id="peocardbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>竞争价格截图</label>
			<!--用来存放item-->
		    <div id="comprescr" class="upshowlis-img"></div>
		    <div id="comprescrbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>酒店邮箱</label>
			<input id="hoteemail" type="text">
		</div>
		<div class="upshowlis">
			<label>结算周期</label>
			<div class="upradio" id="settperiod">
				<input type="radio" name="upwekend" id="wekend" value="7" />
				<label for="wekend">周结</label>
				<input type="radio" name="upwekend" id="harlfmot" value="14" />
				<label for="harlfmot">半月结</label>
				<input type="radio" name="upwekend" id="mothend" value="30" />
				<label for="mothend">月结</label>
			</div>
		</div>
		<div class="upshowlis">
			<label>结算联系人</label>
			<input id="settcontact" type="text">
		</div>
		<div class="upshowlis">
			<label>结算联系电话</label>
			<input id="settconphone" type="telephone" maxlength="11">
		</div>
		<div class="upshowlis">
			<label>结算联系邮箱</label>
			<input id="settconemail" type="text" >
		</div>
		<div class="upshowlis">
			<label>结算银行账号</label>
			<input id="settconbank" type="text">
		</div>
		<div class="upshowlis">
			<label>结算银行账号人名称</label>
			<input id="namehodel" type="text">
		</div>
		<div class="bankchek">
			<label>开户行</label>
			<select id="banklist" class="head-lischeck">
				<!--<option value="">通过</option>-->
			</select>
			<input class="bankchekin" style="display: none;" type="text">
			<input class="bakvalue" type="hidden" value="" />
		</div>
		<div class="upshowlis">
			<label>开户支行</label>
			<input id="banklisf" type="text">
		</div>
		<div class="upshowlis">
			<label>开户省</label>
			<input id="openaccot" type="text">
		</div>
		<div class="upshowlis">
			<label>开户市</label>
			<input id="openacity" type="text">
		</div>
		<div class="upshowlis">
			<label>账户类型</label>
			<div class="upradio" id="accoutype">
				<input type="radio" name="uppassword" id="userfope" value="1" />
				<label for="userfope">企业账户</label>
				<input type="radio" name="uppassword" id="useropen" value="2" />
				<label for="useropen">私人账户</label>
			</div>
		</div>
		<div class="upshowlis">
			<label>百度钱包账号</label>
			<input id="baidumoid" type="text">
		</div>
		<div class="upshowbtn">
			<button class="upshowbtn-save" id="testurplist" data-module="order" >保存</button>
			<button class="upshowbtn-save" id="uploadcomit" data-module="order">提交</button>
		</div>
	</div>
</from>