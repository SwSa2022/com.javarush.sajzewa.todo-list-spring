function delete_task(task_id) {
    let url = getBaseUrl() + task_id;
    // let url = '/' + task_id;
    console.log("URL for DELETE:", url);
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function () {
            window.location.reload();
            console.log("reload");
        },
        error: function (xhr, status, error) {
            console.error('Error deleting task:', xhr.responseText);
            alert('Error deleting task: ' + xhr.status + ' - ' + xhr.responseText);
        }
    });
}

function edit_task(task_id) {
    // lock delete button
    let identifier_delete = "#delete_" + task_id;
    $(identifier_delete).remove();

    // replace "edit" button with "save"
    let identifier_edit = "#edit_" + task_id;
    let save_tag = "<button id='save_" + task_id + "'>Save</button>";
    $(identifier_edit).html(save_tag);
    $(identifier_edit).attr("onclick", "update_task(" + task_id + ")");

    // let property_save_tag = "update_task(" + task_id + ")";
    // $(identifier_edit).attr("name", "onclick", property_save_tag);

    let current_tr_element = $(identifier_edit).parent().parent();
    let children = current_tr_element.children();

    let td_description = children[1];
    td_description.innerHTML = "<input id='input_description_" + task_id + "' type='text' value='" + td_description.innerHTML + "'>";
    // let td_description = children[1];
    // td_description.innerHTML = "<input id='input_description_" + task_id + "' type='text' value='" + td_description.innerHTML + "'>";

    let td_status = children[2];
    let status_id = "#select_status_" + task_id;
    let status_current_value = td_status.innerHTML;
    td_status.innerHTML = getDropdownStatusHtml(task_id);
    $(status_id).val(status_current_value).change();
}

function getDropdownStatusHtml(task_id){
    let status_id = "select_status_" + task_id;
    return "<label for='status'></label>"
    + "<select id= " + status_id + " name='status'>"
    + "<option value='IN_PROGRESS'>IN PROGRESS</option>"
    + "<option value='DONE'>DONE</option>"
    + "<option value='PAUSED'>PAUSED</option>"
    + "</select>";
}

function update_task(task_id) {
    let url = getBaseUrl() + task_id;
    // let url = "/" + task_id;

    let value_description = $("#input_description_" +task_id).val();
    let value_status = $("#select_status_" + task_id).val();

    $.ajax({
        url: getBaseUrl(),
        // url: "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async: false,
        data: JSON.stringify({"description" : value_description, "status": value_status}),
        success: function (response) {
            let td_description = $("#input_description_" +task_id).parent();
            td_description.html(value_description);

            let  td_status = $("#select_status_" + task_id).parent();
            td_status.html(value_status);

            let identifier_edit = "#edit_" + task_id;
            $(identifier_edit).html("Edit");
            $(identifier_edit).attr("onclick", "edit_task(" +task_id +")");
        },
        error: function (xhr, status, error) {
            console.error('Error updating task:', xhr.responseText);
        }
    });

    setTimeout(() => {
        document.location.reload();
    }, 300);
}

function add_task() {
    let value_description = $("#description_new").val();
    let value_status = $("#status_new").val();

    $.ajax({
        url: getBaseUrl(),
        // url: "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async: false,
        data: JSON.stringify({"description" : value_description, "status": value_status})
    });

    setTimeout(() => {
        document.location.reload();
    }, 300);
}

function getBaseUrl() {
    let current_path = window.location.href;
    let end_position = current_path.indexOf('?');
    return current_path.substring(0,end_position);
}




