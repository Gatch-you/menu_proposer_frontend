import React, {useState, useEffect} from 'react'
import Header from './Header'
import { Navigate } from 'react-router-dom';
import {User} from '../models/user'
import Menu from '../components/Menu'
import axios from 'axios'

const Layout = (props: any) => {

    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState<User | null>(null);


    useEffect( () => {
        (
            async () => {
                try {
                const {data} = await axios.get('api/user/profile');

                setUser(data)

                console.log(data)
                } catch (e) {
                    setRedirect(true)
                }
            }
        )()
    }, []);

    if (redirect) {
        return <Navigate to='/login'/>
    }
    
    return (
        <div>
            <Header user={user}/>

            <div className="container-fluid">
                <div className="row">
                    {/* <Menu/> */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="table-responsive small">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
  )
}

export default Layout
