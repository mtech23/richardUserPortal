import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"


const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        user_role: 2
    });



    console.log(formData.password);

    useEffect(() => {
        document.title = 'Medical Customer Portal | Register';
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.querySelector('.loaderBox').classList.remove("d-none");

        const formDataMethod = new FormData();
        formDataMethod.append('name', formData.name);
        formDataMethod.append('email', formData.email);
        formDataMethod.append('password', formData.password);
        formDataMethod.append('user_role', formData.user_role);
        console.log(formData)
        const base_url = process.env.REACT_APP_API_URL;
        const apiUrl = `${base_url}/api/user-register`;


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });

            if (response.ok) {

                const responseData = await response.json();
                if (responseData) {
                    // localStorage.removeItem('UserLogin');
                    // localStorage.setItem('login', responseData.data.token);
                    // console.log('Login Response:', responseData);
                    document.querySelector('.loaderBox').classList.add("d-none");
                    navigate('/login')
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
            <AuthLayout authTitle='Intel on command' authPara='Register your Account'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        label='User Name'
                        required
                        id='name'
                        type='text'
                        placeholder='Enter User Name'
                        labelClass='mainLabel text-light'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, name: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
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
                    {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold text-light'>Remember Me</label>
                        </div>
                        <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link>
                    </div> */}
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Sign Up' type='submit' />
                        <div className='accountRegister mt-3'>
                            <p className='text-light'> If you have already account? <Link to={'/login'} className='text-light text-decoration-underline'>Sign In </Link></p>
                        </div>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default Register
