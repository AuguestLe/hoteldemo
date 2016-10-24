<div class="bd-tab<%= className && (' ' + className) %>">
    <ul class="bd-tab-nav">
        <% _.each(data,function(it,i){%>
        <li><a <%= i===0? 'class="active"':'' %> href="#<%= it.id %>"><%= it.title %></a></li>
        <%});%>
    </ul>
    <div class="bd-tab-content">
    </div>
</div>