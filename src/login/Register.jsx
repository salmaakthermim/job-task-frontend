import React from 'react';
// import Lottie from 'lottie-react';
import Lottie from 'lottie-react'
// import RegisterLottieData from ''; 
import RegisterLottieData from '../assets/lottie/register.json'; 
import { toast } from 'react-hot-toast';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import auth from '../../firbase/firbase.init';
import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firbase/firbase.init';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firbase.config';


const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error('Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            });

            toast.success('Registration successful!');
            navigate('/login'); 
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* Lottie Animation */}
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={RegisterLottieData}></Lottie>
                    </div>

                
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl text-center pt-3 font-bold">Register now!</h1>
                        <form onSubmit={handleRegister} className="card-body">
                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                           
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
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Photo URL (optional)"
                                    className="input input-bordered"
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
                            </div>

                          
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>

                       
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
