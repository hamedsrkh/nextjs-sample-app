import Head from 'next/head'
import UserTable from '../../components/UserTable'

import {User} from "../../types";
import axios from "axios";
import Api from "../../api";

const fetchUsers = async () => {

    const {data} = await Api.get('/users')
    return data as User[]
}

interface PropsType {
    users: User[]
}


const Index = ({users} : PropsType) => {
    return (
        <>
            <Head>
                <title>Users page</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <UserTable users={users}/>
        </>
    )
}

export async function getServerSideProps() {
    const users = await fetchUsers()
    return {
        props: {
            users
        },
    }
}

export default Index
