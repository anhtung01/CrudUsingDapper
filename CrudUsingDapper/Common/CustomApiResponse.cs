using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CrudUsingDapper.Common
{
    public class CustomApiResponse
    {
        #region declare property
        public bool IsError { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public object Result { get; set; } = new object();

        public Pagination Pagination { get; set; }
        public int last_page { get; set; }
        public int current_page { get; set; }
        #endregion

        #region constructor
        public CustomApiResponse()
        {
        }

        public CustomApiResponse(object data)
        {
            this.StatusCode = (int)HttpStatusCode.OK;
            this.Result = data;
        }

        public CustomApiResponse(string message = "", bool isError = false)
        {
            IsError = isError;
            StatusCode = isError ? (int)HttpStatusCode.Conflict : (int)HttpStatusCode.OK;
            Message = message;
        }

        public CustomApiResponse(object result = null, Pagination pagination = null)
        {
            this.IsError = false;
            this.StatusCode = (int)HttpStatusCode.OK;
            this.Message = "Success";
            this.Result = result;
            this.Pagination = pagination;
        }

        public CustomApiResponse(object result = null, bool isError = false, string message = "")
        {
            Result = result;
            Message = message;
            StatusCode = isError ? (int)HttpStatusCode.Conflict : (int)HttpStatusCode.OK;
        }

        public CustomApiResponse(object result = null, Pagination pagination = null, int last_page = 1)
        {
            this.IsError = false;
            this.StatusCode = (int)HttpStatusCode.OK;
            this.Message = "Success";
            this.Result = result;
            this.Pagination = pagination;
            this.last_page = pagination.TotalPages;
        }

        public CustomApiResponse(object result = null, string message = "", bool isError = false, int statusCode = (int)HttpStatusCode.OK, Pagination pagination = null)
        {
            this.IsError = isError;
            this.StatusCode = statusCode;
            this.Message = message == string.Empty ? "Success" : message;
            this.Result = result;
            this.Pagination = pagination;
        }

        public CustomApiResponse(object result = null, Pagination pagination = null, int last_page = 1, int current_page = 1)
        {
            this.IsError = false;
            this.StatusCode = (int)HttpStatusCode.OK;
            this.Message = "Success";
            this.Result = result;
            this.Pagination = pagination;
            this.last_page = pagination.TotalPages;
            this.current_page = pagination.CurrentPage;
        }
        #endregion

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }

    }

    public class Pagination
    {
        //private int _totalPages = 0;
        public long TotalItemsCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages
        {
            get
            {
                return (int)Math.Ceiling((double)TotalItemsCount / PageSize);
            }
        }
    }

    public class Error
    {
        public string Message { get; set; }

        public string Code { get; set; }
        public InnerError InnerError { get; set; }

        public Error(string message, string code, InnerError inner)
        {
            this.Message = message;
            this.Code = code;
            this.InnerError = inner;
        }
    }

    public class InnerError
    {
        public string RequestId { get; set; }
        public string Date { get; set; }

        public InnerError(string reqId, string reqDate)
        {
            this.RequestId = reqId;
            this.Date = reqDate;
        }
    }
}
