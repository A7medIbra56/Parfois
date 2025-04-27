import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

interface FormValues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  
  const handleSignup = async (values: FormValues) => {
    
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if(data.message === "success")
      {
      
        navigate('/'); 
      }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: handleSignup,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container" style={{ maxWidth:"700px" ,  marginBottom : '200px' , marginTop: '200px'}}>
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

      <div className="mb-3">
        <label htmlFor="rePassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          id="rePassword"
          name="rePassword"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default SignupForm;
