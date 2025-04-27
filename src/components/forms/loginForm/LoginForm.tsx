import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

interface FormValues {

  email: string;
  password: string;

}

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
    <form onSubmit={formik.handleSubmit} className="container mt-5" style={{ maxWidth:"700px" ,  marginBottom : '200px' , marginTop: '200px'}}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
        />
      </div>

    


      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default LoginForm;