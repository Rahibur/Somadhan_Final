import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '94%',
    height: '97%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {
    const [openModalId, setOpenModalId] = useState(null);
    const handleOpen = (id) => setOpenModalId(id);
    const handleClose = () => setOpenModalId(null);

    const [getuserdata, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const getdata = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get("/getdata", {
                headers: {
                    Authorization: token
                }
            });
            setUserData(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/deleteuser/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            getdata();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = getuserdata.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if user has purchased
    const hasPurchased = (id) => {
        return localStorage.getItem(`purchased_${id}`) === "true";
    };

    // Handle the button click to either go to checkout or directly to view_2
    const handlePurchaseClick = (id) => {
        if (hasPurchased(id)) {
            // If already purchased, redirect to the view_2 page
            navigate(`/view_2/${id}`);
        } else {
            // If not purchased, go to checkout first
            navigate(`/checkout/${id}`);
        }
    };

    return (
        <Layout>
            <div className="mt-5">
                <div className="container">
                    <div className="filter_part">
                        <div className="add_user">
                            <NavLink to="/register" className="btn btn-success">Build Resume</NavLink>
                        </div>

                        <input
                            type="text"
                            placeholder="Search by username"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control w-25 custom-search-input"
                        />
                    </div>
                    <div className="table_tab">
                        <table className="table">
                            <thead>
                                <tr className="table-dark">
                                    <th scope="col">id</th>
                                    <th scope="col">username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Number</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((element, id) => (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{element.name}</td>
                                        <td>{element.email}</td>
                                        <td>{element.work}</td>
                                        <td>{element.mobile}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => handleOpen(element._id)}><RemoveRedEyeIcon /></button>
                                            <Modal
                                                open={openModalId === element._id}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                            >
                                                <Box sx={style}>
                                                    <IconButton
                                                        aria-label="close"
                                                        onClick={handleClose}
                                                        sx={{
                                                            position: 'absolute',
                                                            right: 5,
                                                            top: 5,
                                                            color: 'primary.main',
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        Choose a format to view
                                                    </Typography><br />

                                                    <NavLink to={`view/${element._id}`}>
                                                        <div className="formatter">
                                                            <button className="btn btn-success mb-3"><DescriptionIcon /> Format_1</button>
                                                        </div>
                                                    </NavLink>

                                                    <NavLink to={`view_1/${element._id}`}>
                                                        <div className="formatter_1">
                                                            <button className="btn btn-warning mb-3" style={{ color: 'white' }}><DescriptionIcon /> Format_2</button>
                                                        </div>
                                                    </NavLink>

                                                    <div className="formatter_2">
                                                        <button
                                                            className="btn btn-info mb-3"
                                                            style={{ color: 'white' }}
                                                            onClick={() => handlePurchaseClick(element._id)}
                                                        >
                                                            <DescriptionIcon /> {hasPurchased(element._id) ? "Format_3" : "Premium Format_3 purchase $20"}
                                                        </button>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </td>
                                        <td className="d-flex justify-content-between">
                                            <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><EditIcon /></button> </NavLink>
                                            <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
