using CrudUsingDapper.Common;
using CrudUsingDapper.IServices;
using CrudUsingDapper.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CrudUsingDapper.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentServices _oDepartmentService;
        public DepartmentController(IDepartmentServices oDepartmentServices)
        {
            _oDepartmentService = oDepartmentServices;
        }

        //[Route("get-all")]
        //// GET: api/<DepartmentController>
        //[HttpGet]
        //public IEnumerable<Department> Get()
        //{
        //    return _oDepartmentService.Gets();
        //}
        //[Route("get-by-id/{DepartmentId}")]
        //// GET api/<DepartmentController>/5
        //[HttpGet("{DepartmentId}")]
        //public Department GetById(Guid DepartmentId)
        //{
        //    return _oDepartmentService.GetById(DepartmentId);
        //}
        //[Route("create-department")]
        //// POST api/<DepartmentController>
        //[HttpPost]
        //public async Task<Department> Post([FromBody] Department oDepartment)
        //{
        //    oDepartment.Id = Guid.Empty;

        //    if (ModelState.IsValid)
        //        return await _oDepartmentService.DepartmentCreate(oDepartment);

        //    return null;
        //}
        //[Route("update-department")]
        //// PUT api/<DepartmentController>/5
        //[HttpPut]
        //public async Task<Department> Put([FromBody] Department value)
        //{
        //    if (ModelState.IsValid)
        //        return await _oDepartmentService.DepartmentUpdate(value);

        //    return null;
        //}
        //[Route("delete-department/{DepartmentId}")]
        //// DELETE api/<DepartmentController>/5
        //[HttpDelete("{DepartmentId}")]
        //public string Deleted(Guid DepartmentId)
        //{
        //    return _oDepartmentService.DeleteDepartment(DepartmentId);
        //}

        [Route("Search-Department")]
        [HttpPost]
        public CustomApiResponse DepartmentSearch([FromBody] Dictionary<string, object> formData)
        {
            var response = new CustomApiResponse();
            try
            {
                var pageIndex = int.Parse(formData["currentPage"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string DepartmentName = formData["departmentName"].ToString();
                if (formData.Keys.Contains("departmentName") && !string.IsNullOrEmpty(Convert.ToString(formData["departmentName"]))) { DepartmentName = Convert.ToString(formData["departmentName"]); }
                long total = 0;
                var data = _oDepartmentService.DepartmentSearch(pageIndex, pageSize, out total, DepartmentName);
                response.Result = data;
                response.last_page = 4;
                response.current_page = 1;
                response.Message = "Success!";

                return new CustomApiResponse(data, new Pagination { CurrentPage = pageIndex, PageSize = pageSize, TotalItemsCount = 12});


                //response.TotalItems = data.First().TotalItems;
                //response.Page = pageIndex;
                //response.PageSize = pageSize;
                //response.TotalPages = 2;
            }
            catch (Exception ex)
            {
                //throw new Exception(ex.Message);
                response.Message = ex.Message;
                response.IsError = true;
            }
            return response;
        }
    }
}
