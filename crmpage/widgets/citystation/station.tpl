<% _.each(stations,function(v,k,i){%>
<div class="station-ls">
    <h4><%= k %></h4>
    <div>
        <ul>
        <% _.each(v,function(jt,j){%>
        <li><span data-stationCode="<%= jt.code %>" title="<%= jt.label %>"><%= jt.label %></span></li>
        <%});%>
        </ul>
    </div>
</div>
<%});%>
