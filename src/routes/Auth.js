import React, { useState } from "react";
import { authService } from "fbase";

const Auth = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount) {
           data =  authService.createUserWithEmailAndPassword(
                email,
                password
            );
        } else{
           data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
    } catch(error){
        setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='Email' name="email" required value={email} onChange={onChange} />
                <input type="password" placeholder='Password' name="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error} 
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? <span>Sign In</span> : <span>create Account</span>}
            </span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;