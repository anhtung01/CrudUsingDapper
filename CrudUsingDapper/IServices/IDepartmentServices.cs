using CrudUsingDapper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudUsingDapper.IServices
{
    public interface IDepartmentServices
    {
        Task<Department> DepartmentCreate(Department department);
        Task<Department> DepartmentUpdate(Department department);
        List<Department> Gets();
        Department GetById(Guid DepartmentId);
        string DeleteDepartment(Guid DepartmentId);
        List<Department> DepartmentSearch(int pageIndex, int pageSize, out long total, string DepartmentName);
    }
}
