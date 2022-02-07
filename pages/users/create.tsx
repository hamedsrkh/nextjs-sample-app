import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";
import Api from "../../api";

const defaultValues = {
    name: "",
    employed: 'no',
    description: '',
};
type newUser = {
    name: string,
    employed: boolean,
    description: string,
}

const createUser = async (user : newUser)=>{
    try {
        const {status, data} = await Api.post('/users', {...user})
        return data;
    }catch (e){
        console.log(e)
    }

}

const UserCreate = () => {
    const router = useRouter()
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const formSubmit = async (e : any) => {
        e.preventDefault()
        const data = {...formValues, employed: 'yes' === formValues.employed}
        const res = await createUser(data)
        if (res){
            setFormValues(defaultValues)
            await router.push('/users')
        }
    }



    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
        >
            <Typography variant="h6">Create a new user</Typography>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel id="employed">Employed</FormLabel>
                        <RadioGroup
                            aria-labelledby="employed"
                            defaultValue="no"
                            name="employed"
                            row
                            value={formValues.employed}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                            <FormControlLabel value="no" control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            label="description"
                            multiline
                            rows={4}
                            fullWidth
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Box sx={{my: 1}}>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>


        </Box>
    );
};

export default UserCreate;
