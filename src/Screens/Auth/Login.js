import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"


const AdminLogin = () => {
    const navigate = useNavigate()
    const base_url = process.env.REACT_APP_API_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });



    console.log(formData.password);

    useEffect(() => {
        document.title = 'Medical Customer Portal | Login';
    }, [])
  
 
    const handleSubmit = async (event) => {
 

        event.preventDefault();
        document.querySelector('.loaderBox').classList.remove("d-none");

        const formDataMethod = new FormData();
        formDataMethod.append('email', formData.email);
        formDataMethod.append('password', formData.password);
        console.log(formData)

        const apiUrl = `${base_url}/api/login-user`;

 
        try {
            const response = await fetch(`${base_url}/api/login-user`, {
                method: 'POST',
                body: formDataMethod
            });

            if (response.ok) {

                const responseData = await response.json();
                if (responseData) {
                    localStorage.removeItem('UserLogin');
                    localStorage.setItem('login', responseData.data.token);
                    console.log('Login Response:', responseData);
                    document.querySelector('.loaderBox').classList.add("d-none");
                    navigate('/dashboard')
                }


            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Invalid Credentials')
                console.error('Login failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }


    };


    return (
        <>
            <AuthLayout authTitle='Intel on command' authPara='Login into your Account'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        label='Email Address'
                        required
                        id='userEmail'
                        type='email'
                        placeholder='Enter Your Email Address'
                        labelClass='mainLabel text-light'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel text-light'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold text-light'>Remember Me</label>
                        </div>
                        {/* <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link> */}
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Login' type='submit' />
                        <div className='accountRegister mt-3'>
                            <p className='text-light'> Create a new Account. <Link to={'/sign-up'} className='text-light text-decoration-underline'>Sign up </Link></p>
                        </div>

                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default AdminLogin
