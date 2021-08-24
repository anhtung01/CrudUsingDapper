$(document).ready(function () {
    table();
});

var RequestContentType = {
    json: "application/json; charset=utf-8",
    application_x_www_form_urlencoded:
        "application/x-www-form-urlencoded; charset=UTF-8",
    multipart_form_data: "multipart/form-data; charset=UTF-8",
    text_plain: "text/plain; charset=UTF-8"
};

var Authorization = {
    AuthorizationKey: `Bearer 22222`
};

var AjaxConfigDefault = {
    headers: {
        "content-type": RequestContentType.json,
        authorization: Authorization.AuthorizationKey
    }
    , method: "POST"
};

function table() {
    //new Tabulator("#example-table", {
    //    ajaxURL: "https://localhost:44368/api/Department/Search-Department",
    //    ajaxParams: {
    //        currentPage: 1,
    //        pageSize: 2,
    //        departmentName: ""
    //    },
    //    paginationDataReceived: {
    //        "data": "result",                                   //      change data parameter name to "result"
    //        "current_page": "currentPage",
    //    },
    //    ajaxConfig: "POST",
    //    ajaxContentType: "json",
    //    layout: "fitColumns",      //fit columns to width of table
    //    pagination: "remote",       //paginate the data
    //    paginationSize: 2,
    //    paginationSizeSelector: [2, 100, 200],                 //      enable page size select element and generate list options
    //    paginationButtonCount: 5,
    //    paginationDataSent: {                                   //      alternative parameter names 
    //        "page": "currentPage",                              //      the page number being requested
    //        "size": "pageSize",                                 //      the number of rows to a page (if paginationSize is set)
    //    },
    //    movableRows: true,
    //    groupBy: "usedState",
    //    groupValues: [["0", "1"]],
    //    initialSort: [             //set the initial sort order of the data
    //        { column: "departmentName", dir: "asc" }
    //    ],
    //    columns: [
    //        {
    //            formatter: "rowSelection", width: 20, titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
    //                cell.getRow().toggleSelect();
    //            }
    //        }, 
    //        { title: "Tên bộ phận", field: "departmentName" },
    //        { title: "Mô tả", field: "description" },
    //        { title: "Trạng thái", field: "usedState1"},

    //        {
    //            title: "Actions", align: "center", formatter: function (cell) {
    //                var id = cell.getData().id;
    //                var departmentName = cell.getData().departmentName;
    //                var description = cell.getData().description;
    //                var usedState1 = cell.getData().usedState == 0 ? "Đang hoạt động" : "Đóng";
    //                var totalItems = cell.getData().totalItems;

    //                //Create the button element
    //                var newtblDep = "<div class='btn-group' role='group' aria-label='Perform Actions'>" +
    //                    "<button type='button' " +
    //                    " data-departmentName='" + departmentName + "' " +
    //                    " data-description='" + description + "' " +
    //                    " data-usedState='" + usedState1 + "' " +
    //                    ">" +
    //                    "<span>" +
    //                    "<i class='fa fa-clone' aria-hidden='true'>" +
    //                    "</i>" +
    //                    "</span>" +
    //                    "</button>" +
    //                    "<button type='button' onclick=\"getbyid('" + id + "')\" " +
    //                    ">" +
    //                    "<span>" +
    //                    "<i class='fa fa-pencil-square-o' aria-hidden='true'>" +
    //                    "</i>" +
    //                    "</span>" +
    //                    "</button>" +
    //                    "<button type='button' onclick=\"getbyid('" + id + "')\" " +
    //                    ">" +
    //                    "<span>" +
    //                    "<i class='fa fa-eye' aria-hidden='true'>" +
    //                    "</i>" +
    //                    "</span>" +
    //                    "</button>" +
    //                    "<button type='button' onclick=\"deletebp('" + id + "')\" " +
    //                    ">" +
    //                    "<span>" +
    //                    "<i class='fa fa-trash' aria-hidden='true'>" +
    //                    "</i>" +
    //                    "</span>" +
    //                    "</button>" +
    //                    "</div>";
    //                return newtblDep; // return the button element
    //            }
    //        }
    //    ],
    //    footerElement: "<span id='row-count' class='float-left'></span>", //add element element to footer to contain count
    //    ajaxResponse: function (url, params, response) {
    //        //url - the URL of the request //params - the parameters passed with the request //response - the JSON object returned in the body of the response.
    //        $("#row-count").text(`Tổng số bản ghi: ${response.pagination.totalItemsCount}`);
    //        return response; //return the tableData property of a response json object
    //    }
    //})

    tableTabulator = new Tabulator(
        "#example-table",
        {
            ajaxURL: "https://localhost:44368/api/Department/Search-Department",

            ajaxParams: {
                currentPage: 1,
                pageSize: 2,
                departmentName: ""
            },
            ajaxConfig: "POST",
            ajaxContentType: "json",
            //pagination setup
            pagination: "remote",
            //      enable remote pagination
            locale: "vi",
            paginationDataReceived: {
                "data": "result",                                   //      change data parameter name to "result"
                "current_page": "currentPage",
            },
            paginationSize: 2,
            paginationSizeSelector: [50, 100, 200],                 //      enable page size select element and generate list options
            paginationButtonCount: 5,
            paginationDataSent: {                                   //      alternative parameter names 
                "page": "currentPage",                              //      the page number being requested
                "size": "pageSize",                                 //      the number of rows to a page (if paginationSize is set)
            },
            pageLoaded: pageno => {                                 //      pageno - the number of the loaded page
                const cbxAll = $("#select-all");                    //console.log(tableTabulator.getData());

                if (cbxAll === null || cbxAll == undefined) return;

                cbxAll.prop("checked", false);                      //      uuncheck the select-all cbx
            },

            virtualDom: true,
            virtualDomBuffer: 300,

            //    Layout setup for table
            tooltips: true,
            height: 600,
            maxHeight: "100%",
            layout: "fitColumns",
            columns:
                [
                    {
                        formatter: "rowSelection", width: 20, titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                            cell.getRow().toggleSelect();
                        }
                    },
                    { title: "Tên bộ phận", field: "departmentName" },
                    { title: "Mô tả", field: "description" },
                    { title: "Trạng thái", field: "usedState1" },

                    {
                        title: "Actions", align: "center", formatter: function (cell) {
                            var id = cell.getData().id;
                            var departmentName = cell.getData().departmentName;
                            var description = cell.getData().description;
                            var usedState1 = cell.getData().usedState == 0 ? "Đang hoạt động" : "Đóng";
                            var totalItems = cell.getData().totalItems;

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
            ,
            ajaxLoaderLoading: `<div class="spinner-border text-primary m-2" role="status"><span class="sr-only">Loading...</span ></div >`,
            langs: {
                vi: {
                    ajax: {
                        loading: "Đang tải", //ajax loader text
                        error: "Có lỗi xảy ra!", //ajax error text
                    },
                    pagination: {
                        first: "Đầu", //text for the first page button
                        first_title: "Đi đến trang đầu tiên", //tooltip text for the first page button
                        last: "Cuối",
                        last_title: "Đi đến trang cuối cùng",
                        prev: "Trước",
                        prev_title: "Đi đến trang trước đó",
                        next: "Sau",
                        next_title: "Đi đến trang sau đó",
                        page_size: "Hiển thị",
                    },
                },
            },

            //ajaxLoaderLoading: "<div class=\"spinner-grow text-primary\" role=\"status\"><span class=\"sr-only\">Loading...</span></div >"
            footerElement: "<span id='row-count' class='float-left'></span>", //add element element to footer to contain count
            ajaxResponse: function (url, params, response) {
                //url - the URL of the request //params - the parameters passed with the request //response - the JSON object returned in the body of the response.
                $("#row-count").text(`Tổng số bản ghi: ${response.pagination.totalItemsCount}`);
                return response; //return the tableData property of a response json object
            }
        });

};
$("#btnSearch").off('click').on('click', function () {
    table(true);
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