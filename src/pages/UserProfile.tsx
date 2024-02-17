import React, { Dispatch, useEffect, useState } from 'react'
import { User } from '../models/user'
import Layout from '../components/Layout';
import UpdateUserModal from '../components/User/UpdateUserModal';
import UpdateUserPassModal from '../components/User/UpdateUserPassModal';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';


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
        <div>
            <Layout>

            <h2>登録ユーザー情報</h2>

        <h3>First Name: {user?.first_name}</h3>

        <h3>Last Name: {user?.last_name}</h3>
      
        <h3>Email: {user?.email}</h3>
      
        <ul>
          <button type="submit" onClick={() => openUpdateModal(user)}>プロフィールを変更する</button>
          <UpdateUserModal
            showUpdateModal={showUpdateModal}
            closeUpdateModal={closeUpdateModal}
            user={user}
          />
          <button type="submit" onClick={() => openUpdatePassModal(user)}>パスワードをを変更する</button>
          <UpdateUserPassModal
            showUpdateModal={showUpdatePassModal}
            closeUpdateModal={closeUpdatePassModal}
            user={user}
          />
        </ul>
            </Layout>

        </div>
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
