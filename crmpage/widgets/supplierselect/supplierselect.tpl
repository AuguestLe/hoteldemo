<select class="form-control" name="supplierid">
    <option value="">选择供应商</option>
    <% _.each(data,function(it){ %>
    <option value="<%= it.supplierid %>"><%= it.name %></option>
    <% }); %>
</select>