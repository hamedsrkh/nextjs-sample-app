import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface PropsType {
    open:boolean
    handleClose: ()=>void
    agree: ()=>void
}
const RemoveUserDialog = (props: PropsType) => {
    const {open, handleClose, agree} = props
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color={'red'} id="alert-dialog-title">
                Delete User
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this user ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={agree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveUserDialog;
