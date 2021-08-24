$(document).ready(function () {
    function getall() {
        $.ajax({
            type: "GET",
            url: "https://localhost:44368/api/Department/get-all",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (obj) {
                var obj = JSON.stringify(data);
            }
        })
    },
    table();
});


function table() {
    new Tabulator("#example-table", {
        ajaxURL: "https://localhost:44368/api/Department/get-all",
        data: data,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 7,         //allow 7 rows per page of data
        movableColumns: true,      //allow column order to be changed
        resizableRows: true,       //allow row order to be changed
        initialSort: [             //set the initial sort order of the data
            { column: "name", dir: "asc" },
        ],
        columns: [
            { title: "Tên bộ phận", field: "departmentName" },
            { title: "Mô tả", field: "description" },
            { title: "Trạng thái", field: "usedState" },
            {
                title: "Actions", align: "center", formatter: function (cell) {
                    var id = cell.getData().id;
                    var departmentName = cell.getData().departmentName;
                    var description = cell.getData().description;
                    var usedState1 = cell.getData().usedState == 0 ? "Đang hoạt động" : "Đóng";
                    //Create the button element
                    var newtblDep = "<div class='btn-group' role='group' aria-label='Perform Actions'>" +
                        "<button type='button' " +
                        " data-departmentName='" + departmentName + "' " +
                        " data-description='" + description + "' " +
                        " data-usedState='" + usedState1 + "' " +
                        ">" +
                        "<span>" +
                        "<i class='fa fa-clone' aria-hidden='true'>" +
                        "</i>" +
                        "</span>" +
                        "</button>" +
                        "<button type='button' onclick=\"getbyid('" + id + "')\" " +
                        ">" +
                        "<span>" +
                        "<i class='fa fa-pencil-square-o' aria-hidden='true'>" +
                        "</i>" +
                        "</span>" +
                        "</button>" +
                        "<button type='button' onclick=\"getbyid('" + id + "')\" " +
                        ">" +
                        "<span>" +
                        "<i class='fa fa-eye' aria-hidden='true'>" +
                        "</i>" +
                        "</span>" +
                        "</button>" +
                        "<button type='button' onclick=\"deletebp('" + id + "')\" " +
                        ">" +
                        "<span>" +
                        "<i class='fa fa-trash' aria-hidden='true'>" +
                        "</i>" +
                        "</span>" +
                        "</button>" +
                        "</div>";

                    return newtblDep; // return the button element
                }
            }
        ]
    })
};
$('#btnedit').off('click', function () {
    $('#edit').modal('show');
    edit();
    resetform();
});

function addnew() {
    var objectDepartment = {};
    objectDepartment.departmentName = $("#edepartmentName").val();
    objectDepartment.description = $("#edescription").val();
    objectDepartment.usedState = parseInt($("#eusedState").val());
    objectDepartment.createBy = $("#ecreateBy").val();
    $("#add").modal("show");
}
function add() {
    var objectDepartment = {};
    objectDepartment.departmentName = $("#edepartmentName").val();
    objectDepartment.description = $("#edescription").val();
    objectDepartment.usedState = parseInt($("#eusedState").val());
    objectDepartment.createBy = $("#ecreateBy").val();
    var data = JSON.stringify(objectDepartment);
    $.ajax({
        type: "POST",
        url: "https://localhost:44368/api/Department/create-department",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data1) {
            $("#add").modal("hide");
            alert("Create successful");
            table();
            resetform();

        },
        error: function (xx) {
            alert("Create failed!!!")
        },
    }
    );
}
function resetform() {
    $('#edepartmentName').val('');
    $('#edescription').val('');
}
var id = "";
function getbyid(DepartmentId) {
    $.ajax({
        url: ("https://localhost:44368/api/Department/get-by-id/" + DepartmentId),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            id = data.id;
            $("#edepartmentName1").val(data.departmentName);
            $("#edescription1").val(data.description);
            $("#eusedState1").val(data.usedState);
            $("#edit").modal("show");
        }
    });
}
function edit() {
    var objectDepartment = {};
    objectDepartment.id = id;
    objectDepartment.departmentName = $("#edepartmentName1").val();
    objectDepartment.description = $("#edescription1").val();
    objectDepartment.usedState = parseInt($("#eusedState1").val());
    var data = JSON.stringify(objectDepartment);
    $.ajax({
        type: "PUT",
        url: ("https://localhost:44368/api/Department/update-department"),
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data1) {
            $("#edit").modal("hide");
            alert("Update successful");
            table();
            resetform();
        },
        error: function (xx) {
            alert("Update failed!!!")
        },
    });
}
function deletebp(DepartmentId) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        $.ajax({
            url: ("https://localhost:44368/api/Department/delete-department/" + DepartmentId),
            type: 'DELETE',
            success: function (result) {
                alert("Xóa thành công");
                table();
            }
        });
    }
}