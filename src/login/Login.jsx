
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
// import loginLottieJSON from '../assets/lottie/login.json'

const Login = () => {
    const navigate = useNavigate();
    const {singIn} = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        console.log(email, password,name);

        singIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: "User Login Successful.",
                icon: "success",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });
              navigate('/');
        })
    }
    return (
        <div className='flex-1  flex gap-20 ml-56'>
            <div className="card bg-base-100 md:w-1/2 max-w-sm mt-24  mb-6  ">
            <h1 className="text-5xl text-center pt-3 font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                          
                            <div className="form-control mt-6">
                                <input  type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <p className='px-5 py-7'><small>New Hear? <Link to="/register" className='text-green-400'>Create an accoutn</Link> </small></p>
                        
                    </div>
                    {/* <div className="text-center lg:text-left w-96">
                     <Lottie animationData={loginLottieJSON}></Lottie>
                    </div> */}
        </div>
    );
};

export default Login;