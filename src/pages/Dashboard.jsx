import React, { useEffect } from 'react';
import DashboardComponent from '../components/Dashboard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useGetUserById from '../hooks/userHooks/useGetUserById';
import useGetPostOfUser from '../hooks/postHooks/useGetPostOfUser';

const Dashboard = () => {
    const { userId } = useParams();
    
    const { getUserById, data: userData, error: userError } = useGetUserById();
    const { getPostOfUser, data: postsData, error: postsError } = useGetPostOfUser();

    useEffect(() => {
        if (userId) {
            getUserById(userId); // Fetch user data by ID
            getPostOfUser(userId); // Fetch posts of the user
        }
    }, [userId]);
    

    if (userId) {
        // console.log(postsData)
        // console.log(userData)
        return (
            <div>
                <DashboardComponent posts={postsData} user={userData} />
            </div>
        );
    }

};

export default Dashboard;
