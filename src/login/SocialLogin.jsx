// import { useContext } from "react";
import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";
// import AuthContext from "../../context/AuthContext";


const SocialLogin = () => {
    const {singInWithGoogle} = useContext(AuthContext);

    const handleGoogleSiginIn = () => {
        singInWithGoogle()
        .then(result =>{
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.massage)
        })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSiginIn} className='btn'>Login With Google</button>
        </div>
    );
};

export default SocialLogin;