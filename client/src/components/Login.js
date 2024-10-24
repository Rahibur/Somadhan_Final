import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import '../App.css'; // Import custom CSS
import logo from './Layout/logo.png'; // Import your logo image

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/login', values);
            setLoading(false);
            message.success('Login Successful');
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
            localStorage.setItem('token', data.token);
    
            // Check if user is admin
            if (values.email === 'admin@admin.com' && values.password === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='login-page'>
            {loading && <Spinner />}
            <div className='login-card'>
                <div className='header-text'>
                    <img src={logo} alt="Logo" className='logo' />
                    <p>Solve your needs instantly</p>
                </div>
                <h1>Login</h1>
                <Form layout='vertical' onFinish={submitHandler}>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' placeholder='Enter your email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='Enter your password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between mt-1'>
                        <Link to="/reguser" className='register-link'>Don't have an Account! Click Register</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
                <div className='d-flex justify-content-between mt-5'>
                        <Link to="/about" className='register-link'>Want to know our services! click to Visit here</Link>    
                </div>
            </div>
        </div>
    );
}
export default Login;
