<from id="uploadbox">
	<div class="header" id="cityuploadhed">
		<div class="head-list">
			<label>酒店ID</label>
			<input type="text" value="" class="prevtop">
		</div>
		<div class="head-list">
			<label>酒店名称</label>
			<input type="text" value="" class="prevtop">
		</div>
		<div class="head-list">
			<label>BID</label>
			<input type="text" value="" class="prevtop">
		</div>
		<div class="head-list">
			<label>合同编号</label>
			<input class="prevtop" id="conanum" type="text" />
		</div>
	</div>
	<div class="conent">
		<div class="upshowlis">
			<label>合同上传</label>
			<!--用来存放item-->
		    <div id="htcontract" class="upshowlis-img"></div>
		    <div id="htcontractbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>营业执照副本</label>
			<!--用来存放item-->
		    <div id="htbusinlic" class="upshowlis-img"></div>
		    <div id="htbusinlicbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>特种行业许可证</label>
			<!--用来存放item-->
		    <div id="htspecial" class="upshowlis-img"></div>
		    <div id="htspecialbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>企业法人身份证</label>
			<!--用来存放item-->
		    <div id="htpeocard" class="upshowlis-img"></div>
		    <div id="htpeocardbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>竞争价格截图</label>
			<!--用来存放item-->
		    <div id="htcomprescr" class="upshowlis-img"></div>
		    <div id="htcomprescrbtn" class="chekbtn">选择图片</div>
		</div>
		<div class="upshowlis">
			<label>酒店邮箱</label>
			<input id="hthoteemail" type="text">
		</div>
		<div class="upshowlis">
			<label>结算周期</label>
			<div class="upradio" id="htsettperiod">
				<input type="radio" name="citywekend" id="citywekend" value="7" />
				<label for="citywekend">周结</label>
				<input type="radio" name="citywekend" id="cityharlfmot" value="14" />
				<label for="cityharlfmot">半月结</label>
				<input type="radio" name="citywekend" id="citymothend" value="30" />
				<label for="citymothend">月结</label>
			</div>
		</div>
		<div class="upshowlis">
			<label>结算联系人</label>
			<input id="htsettcontact" type="text">
		</div>
		<div class="upshowlis">
			<label>结算联系电话</label>
			<input id="htsettconphone" type="telephone" maxlength="11">
		</div>
		<div class="upshowlis">
			<label>结算联系邮箱</label>
			<input id="htsettconemail" type="text" >
		</div>
		<div class="upshowlis">
			<label>结算银行账号</label>
			<input id="htsettconbank" type="text">
		</div>
		<div class="upshowlis">
			<label>结算银行账号人名称</label>
			<input id="htnamehodel" type="text">
		</div>
		<div class="bankchek">
			<label>开户行</label>
			<select id="htbanklist" class="head-lischeck">
				<!--<option value="">通过</option>-->
			</select>
			<input class="bankchekin" style="display: none;" type="text">
			<input class="bakvalue" type="hidden" value="" />
		</div>
		<div class="upshowlis">
			<label>开户支行</label>
			<input id="htbanklisf" type="text">
		</div>
		<div class="upshowlis">
			<label>开户省</label>
			<input id="htopenaccot" type="text">
		</div>
		<div class="upshowlis">
			<label>开户市</label>
			<input id="htopenacity" type="text">
		</div>
		<div class="upshowlis">
			<label>账户类型</label>
			<div class="upradio" id="htaccoutype">
				<input type="radio" name="citypassword" id="cityuserfope" value="1" />
				<label for="cityuserfope">企业账户</label>
				<input type="radio" name="citypassword" id="cityuseropen" value="2" />
				<label for="cityuseropen">私人账户</label>
			</div>
		</div>
		<div class="upshowlis">
			<label>百度钱包账号</label>
			<input id="htbaidumoid" type="text">
		</div>
		<div class="upshowlis" id="callbakreson" style="display: none;">
			<label>归档无法通过原因</label>
			<span></span>
		</div>
		<div class="upshowlis" id="calladreson" style="display: none;">
			<label>审核无法通过原因</label>
			<span></span>
		</div>
		<div class="upshowbtn">
			<button type="button"  class="upshowbtn-save" id="httesturplist">保存</button>
			<button type="button" class="upshowbtn-save" data-module="order"  id="htuploadcomit">提交</button>
			<a type="button" class="upshowbtn-save" data-module="order" id="htuprelist" href="#/order">返回列表</a>
		</div>
	</div>
</from>