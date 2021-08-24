using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudUsingDapper.Models
{
    //public class Pagination
    //{
    //    public int TotalItems { get; set; }
    //    public int Page { get; set; }
    //    public int PageSize { get; set; }
    //    public int TotalPages { get; set; }

    //}
    public class ResponseModel
    {
        public int TotalItems { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public dynamic Data { get; set; }

        public int TotalPages { get; set; }

        //public Pagination pagination = new Pagination();

    }
}
