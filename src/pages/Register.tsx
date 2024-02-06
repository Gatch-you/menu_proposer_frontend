import React, {Component, SyntheticEvent} from 'react'
import { Navigate } from 'react-router-dom';
import '../Login.css';
import axios from 'axios';

class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    passwordConfirm = '';
    state = {
        redirect: false
    }

    // const navigate = useNavigate();

    // const navigateSignIn = () => {
    //     this.navigate('/register')
    // }


    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('/api/user/register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.passwordConfirm
        });

        this.setState({
            redirect: true
        });
    }

    render() {
        if(this.state.redirect) {
            return <Navigate to={'/login'}/>
        }
        return (
            <main className="form-signin w-100 m-auto">
                <form onSubmit={this.submit}>
                    <h1 className="h2 mb-4 fw-normal">Welcome! <br></br>My Cook Cook</h1>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input className="form-control" placeholder="First name"
                            onChange={e => this.firstName = e.target.value}
                        />
                        <label>First Name</label>
                    </div>

                    <div className="form-floating">
                        <input className="form-control" placeholder="Last name"
                            onChange={e => this.lastName = e.target.value}
                        />
                        <label>Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="name@ezample.com"
                            onChange={e => this.email = e.target.value}
                        />
                        <label>Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password"
                            onChange={e => this.password = e.target.value}
                        />
                        <label>Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password Confirm"
                            onChange={e => this.passwordConfirm = e.target.value}
                        />
                        <label>Password Confirm</label>
                    </div>

                    <button className="btn btn-primary w-75 py-2" type="submit">Sign up</button>
                    <p></p>
                <p >or</p>
                <button className="btn btn-primary w-75 py-2">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">released in 2024</p>
                </form>
            </main>
        );
    }
 
}

export default Register