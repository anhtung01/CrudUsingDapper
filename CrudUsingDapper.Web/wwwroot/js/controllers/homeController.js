var homeController = {
    init: function () {
        homeController.loadData();
        homeController.registerEvent();
        
    },
    registerEvent: function () {
        $("#txtDepName").on("keypress", function (e) {
            if (e.which == "13") {
                var id = $(this).data('id');
                var value = $(this).val();

                homeController.updateDepartmentName(id, value);
            }
        });
    },
    //$(document).on("keypress", "#input-search", event => {
    //    if ((event.keyCode ? event.keyCode : event.which) != "13") return; // keycode

    //    $("#btn-search").click();
    //});
    updateDepartmentName: function (id, value) {
        var data = {
                id: id,
                departmentName: value
        }
        $.ajax({
            url: "https://localhost:44368/api/Department/update-department",
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (response) {
                if (response.status) {
                    alert("Update successed.");
                } else {
                    alert("Update Failed.");
                }
            }
        })
    },

    loadData: function () {
        
        $.ajax({
            url: "https://localhost:44368/api/Department/get-all",
            type: "GET",
            dataType: "json",
            success: function (data) {
                //var data = response.data;
                let template = $('#data-template').html();
                let html = Mustache.render(template, { dataObject: data })
                //$.each(data, function (i, item) {
                //    html = Mustache.to_html(template, {
                //        DespartmentName: item.despartmentName,
                //        Description: item.description,
                //        UsedState: item.usedState              
                //    });
                //});
                $('#tblData').html(html);
            }
        })
    }
}
homeController.init();

//let tmpl_dropdown = $(`#${templateId}`).html()
//let tmpl_dropdown_rendered = Mustache.render(tmpl_dropdown, { data: data })
//$(`#${idOnDom}`).html(tmpl_dropdown_rendered).val(idSelected?.toLowerCase());
//$(`#${idOnDom}`).select2();