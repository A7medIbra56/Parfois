import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
 

   

  return (
    <form className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="mb-3">
        <label htmlFor="floating_email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="floating_email" name="floating_email" required />
      </div>

      <div className="mb-3">
        <label htmlFor="floating_password" className="form-label">Password</label>
        <input type="password" className="form-control" id="floating_password" name="floating_password" required />
      </div>

      <div className="mb-3">
        <label htmlFor="floating_repeat_password" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="floating_repeat_password" name="repeat_password" required />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="floating_first_name" className="form-label">First Name</label>
          <input type="text" className="form-control" id="floating_first_name" name="floating_first_name" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="floating_last_name" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="floating_last_name" name="floating_last_name" required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="floating_phone" className="form-label">Phone Number (123-456-7890)</label>
          <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" id="floating_phone" name="floating_phone" required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="floating_company" className="form-label">Company (Ex. Google)</label>
          <input type="text" className="form-control" id="floating_company" name="floating_company" required />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default LoginForm;
