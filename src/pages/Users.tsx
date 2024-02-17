import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
// import FoodStorage from '../components/FoodStorage/FoodStorage';
import HomePage from '../components/Home/HomePage';

const Users = () => {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('api/user/profile');
                const jsonData = await response.data
                console.log(jsonData)
            } catch (error) {
                alert('メールアドレス、もしくはパスワードが間違っています。'+error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Layout>
                <table className="table table-striped table-sm">
                    <HomePage/>
                </table>
            </Layout> 
        </div>
    );
};

export default Users
