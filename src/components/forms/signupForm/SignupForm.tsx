import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    });

    const navigate = useNavigate(); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
                navigate('/login'); 
            } else {
                alert(`Signup failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup.');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;