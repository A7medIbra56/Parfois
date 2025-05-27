import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  
  const handleSignup = async (values: FormValues) => {
    
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      if(data.message === "success")
      {
     
        navigate('/'); 
      }
    
      
    
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSignup,
  });

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

    


      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};
export default LoginForm;
