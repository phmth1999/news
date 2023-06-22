import React from 'react';

const UpdateUserModal = () => {
  return (
    <>
    <div className="modal" id="updateUser">
        <div className="modal-dialog">
            <div className="modal-content">
                <form action='' method=''>
                    <div className="modal-header">
                        <h4 className="modal-title">Update User</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group">
							<label htmlFor="">Fullname</label> 
							<input type="text" className="form-control" required="required" />
						</div>
                        <div className="form-group">
							<label htmlFor="">Role</label> 
							<select className="form-control form-select"  required="required">
								<option hidden="" value="0"></option>
								<option value="1">ROLE_ADMIN</option>
								<option value="2">ROLE_USER</option>
							</select>
						</div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateUserModal