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
    // const [user, setUser] = useState<User>();
    const [firstName, setFirstName] = useState<User["first_name"] | undefined>(user?.first_name)
    const [lastName, setLastName] = useState<User["last_name"] | undefined>(user?.last_name)
    const [email, setEmail] = useState<User["email"] | undefined>(user?.email)
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('api/user/profile');
                const jsonData = await response.data;
                setFirstName(jsonData.first_name)
                setLastName(jsonData.last_name)
                setEmail(jsonData.email)
                console.log(response.data)
            } catch (error) {
                console.log(error);
            };
        };
                
        fetchUser();
    }, [])

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFirstName(value) 
    }
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLastName(value) 
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value) 
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const currentFood  = {
          first_name: firstName,
          last_name: lastName,
          email: email,
        }

        if (!firstName || !lastName || !email) {
            alert("変更後のプロフィールを入力してください")
            return;
        }
    
        try {
          const response = await axios.put('api/user/profile', currentFood);
          console.log('Update food success:', response.data);
          alert("プロフィールの変更に成功しました")
        } catch (error) {
          console.log('Update food failed:', error)
        }
        window.location.reload()
      };

      useEffect(() => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setEmail(user?.email)
      }, [user])

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
                <input type="name"  onChange={handleFirstName} value={firstName} placeholder={user?.first_name}/>
                <h3>Last Name: {user?.last_name}</h3>
                <input type="name"  onChange={handleLastName} value={lastName} placeholder={user?.last_name}/>
                <h3>Email: {user?.email}</h3>
                <input type="name"  onChange={handleEmail} value={email} placeholder={user?.email}/>
                <ul>
                <button type="submit">プロフィールを変更する</button>
                </ul>
            </form>
        </div>
        </Modal>
    )
}

export default UpdateUserModal
