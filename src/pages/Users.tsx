import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
// import { User } from '../models/user';
// import axios from 'axios';
// import FoodStorage from '../components/FoodStorage/FoodStorage';
import HomePage from '../components/Home/HomePage';

const Users = () => {
    // const [users, setUsers] = useState<User[]>([]);

    // useEffect( () => {
    //     (
    //         async () => {
    //             const {data} = await axios.get('api/user/user');
    //             setUsers(data);
    //         }
    //     )();
    // }, []);

    return (
        <div>
            {/* <FoodStorage/> */}
            <Layout>
                <table className="table table-striped table-sm">
                    <thead>
                        {/* <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr> */}
                    </thead>
                    <HomePage/>
                        {/* <tbody>
                            {users.map(user => {
                                return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>-</td>
                                </tr>
                                )
                            })}
                            
                        </tbody> */}
                </table>
            </Layout> 
        </div>
    );
};

export default Users
