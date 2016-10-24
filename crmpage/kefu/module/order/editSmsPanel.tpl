<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="modalTitle">发送短信</h4>
        </div>
        <div class="modal-body">
            <p style="display:none;" class="bg-warning msg"></p>
            <form>
                <div class="form-group">
                    <label for="phone" class="control-label">手机号:</label>
                    <input type="text" class="form-control" id="smsphone" name="phone">
                </div>
                <div class="form-group">
                    <label for="smsmsg" class="control-label">短信内容:</label>
                    <textarea rows="4" class="form-control" id="smsmsg" name="smsmsg"></textarea>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" id="sendsms" class="btn btn-primary">发送</button>
        </div>
    </div>
</div>
