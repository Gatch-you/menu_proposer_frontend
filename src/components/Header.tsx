import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { connect } from 'react-redux'
import { User } from '../models/user'

const Header = (props: {user: User | null}) => {

    const handleLogout = async () => {
        try {
            const response = await axios.post('api/user/logout')
            const data = response.data
            console.log(data)
            localStorage.removeItem("token")
        } catch (error) {
            alert("ログアウト処理に失敗しました。")
        }
    }

  return (
    <header>
        <div>
            <h3>MyCookBook</h3>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/foods_storage">食材ストレージ</Link>
                </li>
                <li>
                    <Link to="/recipes">レシピ</Link>
                </li>
                <Link 
                    to={'/profile'}
                    className="p-2 text-white text-decoration-none">
                    Hello. {props.user?.first_name} {props.user?.last_name}
                </Link>

                <Link to={'/login'} 
                    className="p-2 text-white text-decoration-none"
                    onClick={handleLogout}
                    >Sign out
                </Link>
            </ul>
        </nav>
    </header>
  )
}

export default connect(
        (state: {user: User}) => ({
        user: state.user
    })
)(Header)