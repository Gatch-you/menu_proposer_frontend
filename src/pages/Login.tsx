import React, {SyntheticEvent, useState} from 'react'
import '../Login.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const navigateSignUp = () => {
        navigate('/register')
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', {
                email,
                password
            })
            console.log(response);
            if (response.data.message ==='success')
                setRedirect(true);
            else
                alert('パスワード、もしくはメールアドレスが間違っています。')
            } catch(error) {
                console.log("メールアドレス、パスワードが間違っています。\n"+ error)
        }
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }
        
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h2 mb-4 fw-normal">Welcome! <br></br>My Cook Cook</h1>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-75 py-2" type="submit">Sign in</button>
                <p></p>
                <p >or</p>
                <button className="btn btn-primary w-75 py-2" onClick={navigateSignUp} >Sign up</button>
                <p className="mt-5 mb-3 text-body-secondary">released in 2024</p>
            </form>

            <p className="mt-5 mb-3 text-body-secondary">
                \\ 採用担当者の方々へ //<br></br>
                こちらのアプリケーションの使用に際して、
                もしよろしければ以下の登録情報をご活用ください。<br></br>
                email: test@testmail.com<br></br>

                password: nf9vqyaP+hih83
            </p>
        </main>
    )
}

export default Login
