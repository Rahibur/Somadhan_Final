import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import aboutpic from "../images/avatar.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import axios from 'axios'; // Import Axios

const Details = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [getuserdata, setUserData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [imgCrop, setimgCrop] = useState(false);
    const [storeImage, setstoreImage] = useState([]);
    const [fontColor, setFontColor] = useState('black'); // State variable for font color
    const [fontFamily, setFontFamily] = useState('#'); // State variable for font family

    const onCrop = (view) => {
        setimgCrop(view)
    }
    const onClose = () => {
        setimgCrop(null)
    }

    const saveImage = () => {
        setstoreImage([...storeImage, { imgCrop }])
        setVisible(false)
    }
    const profileImageShow = storeImage.map(item => item.imgCrop)
    console.log(getuserdata);
    const { id } = useParams("");
    console.log(id);

    const navigate = useNavigate("");

    // Function to fetch user data
    const getdata = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/getuser/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    // Function to delete user
    const deleteuser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/deleteuser/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data);
            navigate("/")
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const setBlackColor = () => {
        setFontColor('black');
    }

    return (
        <div className="container mt-3">
            <div className="animate-text"><h1 style={{ fontWeight: 400 }}>Here is Your Resume <span >{getuserdata.name}</span></h1> </div>
            <div className="add_btn mb-3">
                <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary  mx-2"><EditIcon /></button></NavLink>
                <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteIcon /></button>
                <button className="btn btn-success" onClick={handlePrint} style={{ marginLeft: 10 }} ><DownloadIcon /></button>
            </div>

            {/* Buttons to change font colors */}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={() => setFontColor('green')} style={{ backgroundColor: 'green' }}>Color 1</button>
                <button className="btn btn-warning" onClick={() => setFontColor('orange')} style={{ backgroundColor: 'orange', marginLeft:6  }}>Color 2</button>
                <button className="btn btn-#2FBFC6" onClick={() => setFontColor('#2FBFC6')} style={{ backgroundColor: '#2FBFC6', marginLeft:6  }}>Color 3</button>
                <button className="btn btn-dark" onClick={setBlackColor} style={{ backgroundColor: 'black', color: 'white', marginLeft:6  }}>Default</button>
            </div>
            <div className="dropdown-container">
                <select onChange={(e) => setFontFamily(e.target.value)} value={fontFamily}>
                    <option value="#">Select Fonts</option>
                    <option value="monospace">Monospace</option>
                    <option value="math">Math</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="roboto">Roboto</option>
                </select>
            </div>
            <Card sx={{ maxWidth: 900,marginBottom:6 }} ref={componentRef}>
                <CardContent>
                    <div className="Skills_1"><h4>Resume</h4></div>
                    <div className="row">
                        <div className="left_view col-lg-4 col-md-4 col-12">
                            <Dialog header={() => (
                                <p htmlFor="" className="text-2x1 font-semibold textcolor" style={{width:'190',textAlign:'center'}}>
                                   <FastRewindIcon/> Update profile
                                </p>
                            )}
                                visible={visible} onHide={() => setVisible(false)}>
                                <div className="confirmation_content ">
                                    <div className=" flex_1 ">
                                        <div className=" flex_2">
                                            <Avatar
                                                width={380}
                                                height={180}
                                                onCrop={onCrop}
                                                onClose={onClose}
                                            />
                                            <Button onClick={saveImage} label="Save" icon="pi pi-check"  />
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                            <img src={profileImageShow.length ? profileImageShow : aboutpic} style={{ width: 180 }} alt="profile" onClick={() => setVisible(true)} />
                            <h3 className="mt-3" style={{ color: fontColor,fontFamily }}>Name : <span >{getuserdata.name}</span></h3>
                            <p className="mt-3" style={{ color: fontColor,fontFamily }}>Age : <span>{getuserdata.age}</span></p>
                            <div className="Skills"><h5 style={{ color: fontColor,fontFamily }}>Social Status</h5></div>
                            <p className="mt-3" style={{ color: fontColor,fontFamily }}><EmailIcon />  Email : <span >{getuserdata.email}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><MobileScreenShareIcon /> Mobile : <span>{getuserdata.mobile}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><LinkedInIcon /> LinkedIn-Profile : <span>{getuserdata.linkedin}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><PersonPinIcon /> Other-Profile : <span>{getuserdata.other}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><LocationOnIcon /> Location : <span>{getuserdata.address}</span></p>
                        </div>
                        <div className="right_view col-lg-8 col-md-8 col-12">
                            <div className="Skills"><h4 style={{ color: fontColor,fontFamily }}>Skills And Work Experiences</h4></div>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><EngineeringIcon /> Skills : <span>{getuserdata.skills}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><WorkOutlineIcon /> Work-Experience : <span>{getuserdata.experience}</span></p>
                            <div className="Skills"><h4 style={{ color: fontColor,fontFamily }}>Education And  Occupation</h4></div>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><SchoolIcon /> Education : <span>{getuserdata.edu}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><WorkOutlineIcon /> Current-Occupation:<span>{getuserdata.work}</span></p>
                            <p className="mt-5" style={{ color: fontColor,fontFamily }}><DescriptionIcon /> Description:<span>{getuserdata.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
        </div>
    )
}

export default Details;
