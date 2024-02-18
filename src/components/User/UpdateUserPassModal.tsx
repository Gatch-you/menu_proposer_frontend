import React, { useEffect, useState } from 'react'
import { User } from '../../models/user'
import axios from 'axios';
import Modal from 'react-modal';
import { customStyles } from '../../modalDesign';

type ModalProps = {
    showUpdateModal: boolean;
    closeUpdateModal: () => void;
    user: User | undefined;
  };


const UpdateUserModal: React.FC<ModalProps> = ({
    showUpdateModal,
    closeUpdateModal,
    user,
}) => {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')
    

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)

        if (!e.target.value) {
            setPasswordError('パスワードを入力してください')
        } else {
            setPasswordError('')
        }
    }
    const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setpasswordConfirm(value)

        if (!e.target.value) {
            setPasswordConfirmError('再度パスワードを入力してください')
        } else {
            setPasswordConfirmError('')
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const currentFood  = {
            password: password,
            password_confirm: passwordConfirm
        }

        if (!password || !passwordConfirm　|| passwordError) {
            alert("変更後のプロフィールを入力してください")
            return;
        }

        if (password !== passwordConfirm) {
            setPasswordError('パスワードが一致しません')
        }
    
        try {
          const response = await axios.put('api/user/profile/password', currentFood);
          console.log('Update food success:', response.data);
          alert("パスワードの変更に成功しました")
        } catch (error) {
          console.log('Update food failed:', error)
        }
        window.location.reload()
      };

    return (
        <Modal
            contentLabel="Example Modal"
            isOpen={showUpdateModal}
            style={customStyles}
            onRequestClose={closeUpdateModal}
        >
        <div>
            <h2>ユーザー情報の変更</h2>
            <form onSubmit={handleSubmit}>
                <h3>First Name: {user?.first_name}</h3>
                <h3>Last Name: {user?.last_name}</h3>
              
                <h3>Email: {user?.email}</h3>

                <h4>変更後のパスワード</h4>
                <input type="name"  onChange={handlePassword}/>
                {passwordError && <p>{passwordError}</p>}
                <h4>パスワードの確認</h4>
                <input type="name"  onChange={handlePasswordConfirm}/>
                {passwordConfirmError && <p>{passwordConfirmError}</p>}               

                <ul>
                <button type="submit">プロフィールを変更する</button>
                </ul>
            </form>
        </div>
        </Modal>
    )
}

export default UpdateUserModal
