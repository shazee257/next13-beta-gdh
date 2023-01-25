import {
    Button, Grid, Paper, TextField,
    MenuItem, Modal
} from "@mui/material";
import { useEffect, useState } from 'react';
import { fetchApi } from '../../fetchApi';
import { toast } from 'react-toastify';
import { specialities, salutations, genders, countries, organizations, roles } from '../../utils/constant';
import { formatDate } from "../../utils";

export default function NewUserModal({
    show, close, setOpen, setUserList, role,
    readOnly, setReadOnly, userData
}) {
    const newUser = {
        speciality: '',
        organization: '',
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        personalDetails: {
            gender: '',
            address1: '',
            address2: '',
            city: '',
            country: '',
            mobile: '',
            landLine: '',
        },
        qualifications: [],
        specialities: [],
        expertise: [],
        presentEmployments: [],
        previousEmployments: [],
        role: role
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        if (readOnly) {
            setUser(userData);
        } else {
            setUser(newUser);
        }
    }, [readOnly, userData])

    const clearForm = () => setUser(newUser);

    const handleClose = () => {
        setOpen(false);
        setReadOnly(false);
        setUser(newUser);
    };

    const getUpdatedUserList = async () => {
        const { data } = await fetchApi({
            method: 'GET',
            endPoint: 'Clients',
            params: {
                filter: {
                    where: {
                        role: role
                    }
                }
            }
        });

        let userList = data?.map((user) => {
            user.name = `${user.firstName} ${user.lastName}`;
            user.city = user.personalDetails.city ? user.personalDetails.city : 'N/A';
            user.phone = user.personalDetails.mobile ? user.personalDetails.mobile : 'N/A';
            user.createdAt = formatDate(user.createdAt);

            return user;
        })
        setUserList(userList);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchApi({
                method: 'POST',
                endPoint: 'Clients',
                data: user,
            });

            if (response.status === 200) {
                toast.success('Record added successfully');
                getUpdatedUserList();
                handleClose();
            } else {
                console.log("response", response);
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log("error", error);
            toast.error('Server error');
        }
    }

    return (
        <Modal open={show} onClose={close} >
            <div className="overflow-auto flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-2/4 h-auto rounded-lg shadow-lg">
                <Paper elevation={10} className="p-10 w-full">
                    <Grid align='left' className='mb-8'>
                        {readOnly ? <h2>PATIENT DETAILS</h2> :
                            <h2>
                                {role === roles.MEDICAL_SPECIALIST ? 'ADD DOCTOR' :
                                    role === roles.ROLE_ASSISTANT ? 'ADD ASSISTANT' : 'ADD PATIENT'}
                            </h2>
                        }
                    </Grid>

                    <form autoComplete="off" className='space-y-8'>
                        {/* Speciality & Organization */}
                        {!readOnly &&
                            <div className="flex justify-between">
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Select Speciality" placeholder='Select Speciality'
                                    select
                                    disabled={readOnly}
                                    value={user.speciality}
                                    onChange={(e) => setUser({ ...user, speciality: e.target.value })}>
                                    {specialities.map((speciality) => (
                                        <MenuItem key={speciality} value={speciality}>
                                            {speciality}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Select Organization" placeholder='Select Organization'
                                    select
                                    disabled={readOnly}
                                    value={user.organization}
                                    onChange={(e) => setUser({ ...user, organization: e.target.value })}>
                                    {organizations.map((organization) => (
                                        <MenuItem key={organization} value={organization}>
                                            {organization}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        }

                        {/* Salutation, First Name, Last Name */}
                        <div className="flex justify-between">
                            <TextField className='w-3/6'
                                fullWidth size="small"
                                label="Select Salutation" placeholder='Select Salutation'
                                select
                                disabled={readOnly}
                                value={user.salutation}
                                onChange={(e) => setUser({ ...user, salutation: e.target.value })}>
                                {salutations.map((salutation) => (
                                    <MenuItem key={salutation} value={salutation}>
                                        {salutation}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                size="small" fullWidth
                                label='First Name' placeholder='Enter First Name'
                                disabled={readOnly}
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                            <TextField
                                size="small" fullWidth
                                label='Last Name' placeholder='Enter Last Name'
                                disabled={readOnly}
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                        </div>

                        {/* Email & Gender */}
                        <div className="flex justify-between">
                            <TextField size="small" fullWidth
                                label='Email' placeholder='Enter Email'
                                disabled={readOnly}
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            <TextField size="small" fullWidth
                                className='w-4/6'
                                label='Gender' placeholder='Enter Gender'
                                select
                                disabled={readOnly}
                                value={user.personalDetails?.gender}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, gender: e.target.value } })}
                            >
                                {genders.map((genderItem) => (
                                    <MenuItem key={genderItem} value={genderItem}>{genderItem}</MenuItem>
                                ))}
                            </TextField>
                        </div>

                        {/* Password & Confirm Password */}
                        {!readOnly &&
                            <div className="flex justify-between">
                                <TextField size="small" fullWidth
                                    type='password'
                                    label='Password' placeholder='Enter Password'
                                    disabled={readOnly}
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                <TextField size="small" fullWidth
                                    type='password'
                                    label='Confirm Password' placeholder='Enter Confirm Password'
                                    disabled={readOnly}
                                    value={user.confirmPassword}
                                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                            </div>
                        }

                        {/* Address 1 & Address 2*/}
                        <div>
                            <TextField size="small" fullWidth
                                label='Address' placeholder='Enter Address'
                                disabled={readOnly}
                                value={user.personalDetails?.address1}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, address1: e.target.value } })} />
                            <TextField size="small"
                                fullWidth
                                disabled={readOnly}
                                value={user.personalDetails?.address2}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, address2: e.target.value } })} />
                        </div>

                        {/* Country & City */}
                        <div className="flex justify-between">
                            <TextField size="small" fullWidth
                                label='Counrty' placeholder='Enter Country'
                                select
                                disabled={readOnly}
                                value={user.personalDetails?.country}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, country: e.target.value } })}>
                                {countries.map((country) => (
                                    <MenuItem key={country} value={country}>{country}</MenuItem>
                                ))}
                            </TextField>
                            <TextField size="small" fullWidth
                                label='City' placeholder='Enter City'
                                disabled={readOnly}
                                value={user.personalDetails?.city}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, city: e.target.value } })} />
                        </div>

                        {/* Phone & Landline */}
                        <div className="flex justify-between">
                            <TextField size="small" fullWidth
                                label='Mobile No' placeholder='Enter Mobile No'
                                disabled={readOnly}
                                value={user.personalDetails?.mobile}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, mobile: e.target.value } })} />
                            <TextField size="small" fullWidth
                                label='LandLine No' placeholder='Enter LandLine No'
                                disabled={readOnly}
                                value={user.personalDetails?.landLine}
                                onChange={(e) => setUser({ ...user, personalDetails: { ...user.personalDetails, landLine: e.target.value } })} />
                        </div>

                        {/* Buttons Row */}
                        {readOnly ?
                            <div className="w-full flex justify-center">
                                <Button
                                    className="w-6/12"
                                    size="small"
                                    onClick={handleClose}
                                    type='button'
                                    color='primary'
                                    variant="outlined"
                                    fullWidth>
                                    Close Form
                                </Button>
                            </div>
                            :
                            <div>
                                <Button
                                    className='mt-8'
                                    onClick={handleSubmit}
                                    type='submit'
                                    color='success'
                                    variant="outlined"
                                    fullWidth>
                                    {role === roles.MEDICAL_SPECIALIST ?
                                        'Add Doctor' : role === roles.ROLE_ASSISTANT ? 'Add Assistant' : 'Add Patient'
                                    }
                                </Button>

                                <br /><br />
                                <div className="flex justify-between">
                                    <Button
                                        className="w-6/12"
                                        onClick={clearForm}
                                        type='button'
                                        color='primary'
                                        variant="outlined"
                                        fullWidth>
                                        Reset Form
                                    </Button>
                                    <Button
                                        className="w-6/12"
                                        size="small"
                                        onClick={handleClose}
                                        type='button'
                                        color='secondary'
                                        variant="outlined"
                                        fullWidth>
                                        Close Form
                                    </Button>
                                </div>
                            </div>
                        }
                    </form>
                </Paper>
            </div>
        </Modal>
    )
}