import React, { Dispatch, useEffect, useState } from 'react'
import { User } from '../models/user'
import Layout from '../components/Layout';
import UpdateUserModal from '../components/User/UpdateUserModal';
import UpdateUserPassModal from '../components/User/UpdateUserPassModal';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';
import '../components/Design/UserProfile.css'


const UserProfile = (props: any) => {
    const [user, setUser] = useState<User>();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showUpdatePassModal, setShowUpdatePassModal] = useState(false);

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    function openUpdateModal(user: User | undefined) {
        setUser(user);
        setShowUpdateModal(true);
    }
    function closeUpdateModal() {
        setShowUpdateModal(false);
    }
    function openUpdatePassModal(user: User | undefined) {
        setUser(user);
        setShowUpdatePassModal(true);
    }
    function closeUpdatePassModal() {
        setShowUpdatePassModal(false);
    }


    return (
        <Layout>
            <div className="layout">
                <h2>登録ユーザー情報</h2>
                <h3>First Name: {user?.first_name}</h3>
                <h3>Last Name: {user?.last_name}</h3>
                <h3>Email: {user?.email}</h3>
                <div>
                    <button type="submit" onClick={() => openUpdateModal(user)}>プロフィールを変更する</button>
                    <UpdateUserModal
                    showUpdateModal={showUpdateModal}
                    closeUpdateModal={closeUpdateModal}
                    user={user}
                    />
                    <button type="submit" onClick={() => openUpdatePassModal(user)}>パスワードを変更する</button>
                    <UpdateUserPassModal
                    showUpdateModal={showUpdatePassModal}
                    closeUpdateModal={closeUpdatePassModal}
                    user={user}
                    />
                </div>

            </div>
        </Layout>

    )
}

export default connect(
        (state: {user: User}) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(UserProfile);
