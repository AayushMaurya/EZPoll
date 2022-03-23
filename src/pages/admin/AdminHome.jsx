import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import AdminLogin from "./AdminLogin";
import { adminLogout } from "../../redux/actions/adminAction";

const AdminHome = () => {
    const navigate = useNavigate();
    const store = useSelector((store) => store);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(adminLogout());
        navigate('/');
    }

    return (
        <>
            {store.admin.isAuthenticated ? <div>
                <h1>Hello! this is admin home page</h1>
                <br />
                <div>
                <img className="card-img-top" src={store.admin.admin.avatar} alt="Card image cap" />
                    <table className="table border">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{store.admin.admin.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{store.admin.admin.email}</td>
                            </tr>
                            <tr>
                                <td>Registration Number</td>
                                <td>{store.admin.admin.registrationNumber}</td>
                            </tr>
                            <tr>
                                <td>Joining Year</td>
                                <td>{store.admin.admin.joiningYear}</td>
                            </tr>
                            <tr>
                                <td>Contact Number</td>
                                <td>{store.admin.admin.contactNumber ?
                                    store.admin.admin.contactNumber : "NA"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={logoutHandler} type="button">Logout</button>
            </div> : <AdminLogin />}
        </>
    )
}

export default AdminHome;