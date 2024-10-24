import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import '../App.css'; // Import custom CSS
import logo from './Layout/logo.png'; // Import your logo image
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post('/reguser', values);
            message.success('Registration Successful');
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            message.error("Invalid username or password");
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='register-page'>
            {loading && <Spinner />}
            <div className='register-card'>
                <div className='header-text'>
                    <img src={logo} alt="Logo" className='logo' />
                    <p>Solve your needs instantly</p>
                </div>
                <h1>Register</h1>
                <Form layout='vertical' onFinish={submitHandler}>
                    <Form.Item label='Name' name='name'>
                        <Input placeholder='Enter your name' />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' placeholder='Enter your email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' placeholder='Enter your password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to="/login" className='login-link'>Already registered? Click here to login</Link>
                        <button className='btn btn-primary'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
