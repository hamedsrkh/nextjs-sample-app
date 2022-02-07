import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {fetchAsync} from "../../features/user/userSlice";
import UserCard from "../../components/UserCard";
import {Card, LinearProgress} from "@mui/material";

const UserDetail = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {id} = router.query
    const user = useAppSelector(state => state.user)
    useEffect(() => {
        if (process.browser && id) {
            dispatch(fetchAsync(id as string))
        }
    }, [id])

    const view = () => {
        if(user.status === 'loading'){
            return (<Card sx={{ minHeight: "100px" }}><LinearProgress /></Card>)
        }else if(user.status === 'idle' && user.user){
            return (<UserCard user={user.user}/>)
        }else{
            return ('No Data Available')
        }
    }

    return (
        <div>
            {view()}
        </div>
    );
};

export default UserDetail;
