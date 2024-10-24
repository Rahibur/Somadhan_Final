import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import axios from 'axios';

const Edit = () => {
    const navigate = useNavigate("");
    const [inpval, setINP] = useState({
        name: "", email: "", age: "", mobile: "", work: "", address: "", desc: "", linkedin: "", other: "", skills: "", experience: "", edu: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    }

    const { id } = useParams();
    console.log(id);

    const getdata = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`/getuser/${id}`, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            setINP(res.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();
        const { name, email, work, address, mobile, age, desc, linkedin, other, skills, experience, edu } = inpval;
        const token = localStorage.getItem('token');
        try {
            const res = await axios.patch(`/updateuser/${id}`, {
                name, email, work, address, mobile, age, desc, linkedin, other, skills, experience, edu
            }, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            if (res.status === 200) {
                window.alert("Data updated successfully");
                navigate("/");
            }
        } catch (error) {
            window.alert("Error updating data");
            console.error("Error updating user data:", error);
        }
    }

    return (
        <div className="container">
            <div className="bb">
                <NavLink to="/"><p><FastRewindIcon /> Back to home</p></NavLink>
            </div>
            <form>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">LinkedIn Profile</label>
                        <input type="text" value={inpval.linkedin} onChange={setdata} name="linkedin" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Other Profiles</label>
                        <input type="text" value={inpval.other} onChange={setdata} name="other" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="text" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Skills</label>
                        <input type="text" value={inpval.skills} onChange={setdata} name="skills" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Experience</label>
                        <input type="text" value={inpval.experience} onChange={setdata} name="experience" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Education</label>
                        <input type="text" value={inpval.edu} onChange={setdata} name="edu" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" value={inpval.address} onChange={setdata} name="address" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea value={inpval.desc} onChange={setdata} name="desc" className="form-control" id="exampleInputPassword1" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={updateuser} className="btn btn-success" style={{ width: '100px', margin: 'auto' }}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
