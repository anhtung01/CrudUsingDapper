using CrudUsingDapper.Common;
using CrudUsingDapper.IServices;
using CrudUsingDapper.Models;
using Dapper;
using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace CrudUsingDapper.Service
{
    public class DepartmentService : IDepartmentServices
    {
        Department _oDepartment = new Department();
        List<Department> _oDepartments = new List<Department>();
        public string DeleteDepartment(Guid DepartmentId)
        {
            string message = "";
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@Id", DepartmentId);
                    if (con.State == ConnectionState.Closed) con.Open();

                    var oDepartments = con.Query<Department>
                        (nameof(DeleteDepartment),
                        param: parameters,
                        commandType: CommandType.StoredProcedure);
                    if (oDepartments != null && oDepartments.Count() > 0)
                    {
                        _oDepartment = oDepartments.FirstOrDefault();
                    }
                }
            }
            catch (Exception ex)
            {

                message = ex.Message;
            }
            return message;
        }
        public List<Department> DepartmentSearch(int pageIndex, int pageSize, out long total, string DepartmentName)
        {

            total = 0;
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@pageSize", pageSize);
                    parameters.Add("@pageIndex", pageIndex);
                    parameters.Add("@departmentName", DepartmentName);
                    if (con.State == ConnectionState.Closed) con.Open();

                    var oDepartments = con.Query<Department>(
                        "DepartmentSearch",
                        param: parameters,
                        commandType: CommandType.StoredProcedure);

                    return oDepartments.ToList();
                    
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Department GetById(Guid DepartmentId)
        {
            using (IDbConnection con = new SqlConnection(Global.ConnectionString))
            {
                if (con.State == ConnectionState.Closed) con.Open();

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@id", DepartmentId, DbType.Guid);
                //parameters.Add("@pageSize", 123, DbType.Int32);
                var oDepartments = con.Query<Department>(nameof(GetById), param: parameters, commandType: CommandType.StoredProcedure);

                if (oDepartments != null && oDepartments.Count() > 0)
                {
                    _oDepartment = oDepartments.SingleOrDefault();
                }
                return _oDepartment;
            } 
        }

        public List<Department> Gets()
        {
            _oDepartments = new List<Department>();
            using (IDbConnection con = new SqlConnection(Global.ConnectionString))
            {
                if (con.State == ConnectionState.Closed) con.Open();

                var oDepartments = con.Query<Department>("get_all").ToList();
                if (oDepartments != null && oDepartments.Count() > 0)
                {
                    _oDepartments = oDepartments;
                }
            }
            return _oDepartments;
        }

        public async Task<Department> DepartmentCreate(Department department)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters = new DynamicParameters();
                    
                    parameters.Add("@DepartmentName", department.DepartmentName);
                    parameters.Add("@Description", department.Description);
                    parameters.Add("@UsedState", department.UsedState);
                    parameters.Add("@CreateDate", department.CreateDate == DateTime.Now);
                    parameters.Add("@CreateBy", department.CreateBy);

                    var _oDepartment = await con.QueryAsync<Department>(nameof(DepartmentCreate),
                        param : parameters,
                        commandType: CommandType.StoredProcedure);

                    return _oDepartment.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                _oDepartment.Message = ex.Message;
            }
            return _oDepartment;
        }

        public async Task<Department> DepartmentUpdate(Department department)
        {
            try
            {
                using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                {
                    if (con.State == ConnectionState.Closed) con.Open();

                    DynamicParameters parameters1 = new DynamicParameters();
                    parameters1.Add("@Id", department.Id, DbType.Guid);
                    parameters1.Add("@DepartmentName", department.DepartmentName);
                    parameters1.Add("@Description", department.Description);
                    parameters1.Add("@UsedState", department.UsedState);
                    parameters1.Add("@ModifiedDate", department.ModifiedDate == DateTime.Now);
                    parameters1.Add("@ModifiedBy", department.ModifiedBy);

                    var data = await con.QueryAsync<Department>(nameof(DepartmentUpdate),
                            param : parameters1,
                            commandType: CommandType.StoredProcedure);

                        return data.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                _oDepartment.Message = ex.Message;
            }
            return _oDepartment;
        }

        private DynamicParameters SetParameters(Department department)
        {
            DynamicParameters parameters = new DynamicParameters();
            //parameters.Add("@Id", department.Id);
            parameters.Add("@DepartmentName", department.DepartmentName);
            parameters.Add("@Description", department.Description);
            parameters.Add("@UsedState", department.UsedState);
            parameters.Add("@CreateDate", department.CreateDate == DateTime.Now);
            parameters.Add("@CreateBy", department.CreateBy);
            parameters.Add("@ModifiedDate", department.ModifiedDate == null);
            parameters.Add("@ModifiedBy", department.ModifiedBy);
            return parameters;
        }
    }
}
