using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CrudUsingDapper.Models
{
    public class Department : ResponseModel
    {
        internal string Message;

        /// <summary>
        /// Id bộ phận
        /// </summary>
        public Guid Id { get; set; }
        /// <summary>
        /// Tên bộ phận
        /// </summary>
        /// 
        //[StringLength(512)]
        public string? DepartmentName { get; set; }
        /// <summary>
        /// Mô tả
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Trạng thái sử dụng
        /// </summary>
        public int? UsedState { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime? CreateDate { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        public Guid? CreateBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public Guid? ModifiedBy { get; set; }
    }
}
