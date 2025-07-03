import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UserAuth/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { SignIn, googleLogin } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state?.from.pathname || '/';

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        SignIn(data.email, data.password).then(res => {
            if (res) {
                alert('Login SuccesFull');
                navigate(form);
            }
        }).catch(error => {
            alert(error);
        })
    };

    const handleClick = () => {
        googleLogin().then(res => {
            if (res) {
                alert('Login Succesfull');
                navigate(form);
            }
        }).catch(error => {
            alert(error);
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-5xl text-center'>Login Form</h1>

                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">


                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors?.password?.type === 'required' && <>
                            <h1 className='text-red-600'>Please password must be 6 charcter</h1>
                        </>
                    }

                    <button className="btn btn-neutral mt-4">Login</button>
                    <div className="divider">OR</div>
                    <button onClick={handleClick} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    <p>New to This Website please! <Link className='text-blue-600 underline' to={'/register'}>Sign Up</Link></p>

                </fieldset>
            </form>
        </div>
    );
};

export default Login;