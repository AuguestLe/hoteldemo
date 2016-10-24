<div class="city-tip" style="display: none;">
<div class="city-tip-wrap font-yh">
    <div class="city-tip-header text-muted">请选择城市</div>
    <div class="py-idx-ls clearfix">
        <ul>
            <% _.each(tabTitle,function(it,i){%>
            <li class="py-idx"><a data-index="<%= 'group' + i %>"<%= i==0?' class="active"':'' %> href="javascript:void(0);"><%= it %></a></li>
            <%});%>
        </ul>
    </div>
    <div class="city-ls clearfix">
    <% _.each(data,function(it,i){ %>
        <div data-index="<%= 'group' + i %>" class="group">
            <% _.each(it,function(jt,j){ %>
            <div class="group-it">
               <div class="py-code"><%= index[i][j] %></div>
               <div class="group-it-it clearfix">
                   <ul>
                       <% _.each(jt,function(kt,k){ %>
                       <li class="it-content"><a href="javascript:void(0);" class="city-item" title="<%= kt.label %>" data-citycode="<%= kt.code %>"><%= kt.label %></a></li>
                       <% }); %>
                   </ul>
               </div>
            </div>
            <% }); %>
        </div>
    <% }); %>
    </div>
</div>
</div>