import React, { useEffect, useState } from 'react'
import { User } from '../models/user'
import axios from 'axios';



const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User>();
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('api/user/profile');
                const jsonData = await response.data;
                setUser(jsonData)
                console.log(response.data)
            } catch (error) {
                console.log(error);
            };
        };
                
        fetchUser();
    }, [])

    return (
        <div>
            <p>{user?.first_name} {user?.last_name}</p>
            <p>{user?.email}</p>
        </div>
    )
}

export default UserProfile
