import React from 'react';
import Lottie from 'lottie-react';
// import loginLottieJSON from '';
import loginLottieJSON from '../assets/lottie/login.json';
// import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firbase/firbase.init';
// import SocialLogin from './SocialLogin';
import { toast } from 'react-hot-toast';
import { auth } from '../firebase/firbase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import SocialLogin from './SocialLogin';
// import auth from '../../firbase/firbase.init';

const Login = () => {
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* Lottie Animation */}
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={loginLottieJSON}></Lottie>
                    </div>

                    {/* Login Form */}
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl text-center pt-3 font-bold">Login now!</h1>
                        <form onSubmit={handleSignIn} className="card-body">
                          
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                           
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {/* <SocialLogin></SocialLogin> */}

                     

                       
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don’t have an account?{' '}
                            <a href="/register" className="text-blue-500 hover:underline">
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
