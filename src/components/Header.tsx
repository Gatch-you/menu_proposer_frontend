import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
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
            </ul>
        </nav>
    </header>
  )
}

export default Header