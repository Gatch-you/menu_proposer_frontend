import React, {useState, useEffect, Dispatch} from 'react'
import Header from './Header'
import { Navigate } from 'react-router-dom';
import {User} from '../models/user';
import axios from 'axios';
import {connect} from 'react-redux'
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {

    const [redirect, setRedirect] = useState(false);


    useEffect( () => {
        (
            async () => {
                try {
                const response = await axios.get('api/user/profile');
                const jsonData = await response.data
                props.setUser(jsonData);
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
            <Header />

            <div className="container-fluid">
                <div className="row">
                    {/* <Menu/> */}
                    <main className='container'>
                        <div className="table-responsive small">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
  )
}

// 他のイベントを他のコンポーネントから取得して扱う
const mapStateToProps = (state: {user: User}) => ({
    user: state.user
})

// 他のコンポーネントにこのコンポーネント内のアクションを送る
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
