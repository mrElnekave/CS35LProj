import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"                             

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const userToken = localStorage.getItem('userobj');
        if (userToken){
            navigate('/home');
        }
    }, [navigate]);

    async function submit(e) {
        e.preventDefault(); 
		try {
            const response = await axios.post("/api/user_info/signup/", {email, password})
            if (response){
                localStorage.setItem('userobj', JSON.stringify({response}));   
                navigate('/home');
            }
        }
        catch(error){
            alert("Failed to Create User");
            console.log(error);
        }
    }

    return (
        <div className="Sign Up">
            <h1>UCLA GEOGUESSER</h1>
            <h2>Sign Up</h2>
            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
                <br/>
                <br/>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />
                <br/>
                <br/>
                <input type="submit" onClick={submit} />
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/Login">Login Here</Link> 
        </div>
    );
}
