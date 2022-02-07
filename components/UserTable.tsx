import * as React from 'react';
import {DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import {User} from "../types";
import {Button} from "@mui/material";
import Link from 'next/link'
import RemoveUserDialog from "./RemoveUserDialog";
import {useEffect, useMemo, useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../app/hooks";
import Api from "../api";

interface PropsType {
    users: User[]
}


export default function DataGridDemo(props: PropsType) {
    const [dialogID, setDialogID] = useState<string | undefined>();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useAppSelector(state=>state.user)
    const refreshData = () => {
        router.replace(router.asPath);
    }

    let columns = useMemo(() => {
        const columns: GridColDef[] = [
            {
                field: 'name',
                headerName: 'name',
                flex: 1,
            },
            {
                field: 'description',
                headerName: 'description',
                flex: 1,
            },
            {
                field: 'employed',
                headerName: 'employed',
                flex: 1,
            },
            {
                field: "action",
                headerName: "Action",
                flex: 1,
                sortable: false,
                renderCell: (params) => {

                    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.stopPropagation();
                        setDialogID(params.id as string)
                    };

                    return <Button startIcon={<DeleteIcon/>} onClick={onClick} variant="outlined"
                                   color="error">Delete</Button>
                }
            },
        ];
        return columns
    }, []);

    const rows = props.users.map(user => ({
        id: user.id,
        name: user.name,
        description: user.description.substring(0,20) + ' ...',
        employed: user.employed ? 'Yes' : 'No'
    }))

    const deleteUser = async ()=>{
        if(dialogID){
            const {data} = await Api.delete(`/users/${dialogID}`)
            setDialogID(undefined)
            refreshData()
        }
    }
    const showUserDetails = (data :  GridRowParams<{[p: string]: any}>) => {
        router.push(`users/${data.id}`)
    }
    return (
        <>
            <div style={{padding: '20px 0'}}>
                <Link href="/users/create" passHref>
                    <Button variant="outlined" color="primary">Create New User</Button>
                </Link>
            </div>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    onRowClick={showUserDetails}
                />
            </div>
            <RemoveUserDialog open={!!dialogID} handleClose={() => {
                setDialogID(undefined)
            }} agree={deleteUser}/>
        </>
    );
}