import React from "react";
import { useNavigate } from 'react-router-dom'
import ClientLogin from "./ClientLogin";
import { useSelector, useDispatch } from "react-redux";
import { clientLogout } from "../../redux/actions/clientAction";

const ClientHome = () => {
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(clientLogout());
        navigate('/');
    }

    return (
        <>
        {store.client.isAuthenticated ? <div>
            <h1>Hello! this is client home page</h1>
            <br />
            <div>
                <img className="card-img-top" src={store.client.client.avatar} alt="Card image cap" />
                    <table className="table border">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{store.client.client.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{store.client.client.email}</td>
                            </tr>
                            <tr>
                                <td>Registration Number</td>
                                <td>{store.client.client.registrationNumber}</td>
                            </tr>
                            <tr>
                                <td>Joining Year</td>
                                <td>{store.client.client.joiningYear}</td>
                            </tr>
                            <tr>
                                <td>Contact Number</td>
                                <td>{store.client.client.contactNumber ?
                                    store.client.client.contactNumber : "NA"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <button onClick={logoutHandler} type="button">Logout</button>
        </div> : <ClientLogin />}
    </>
    );
}

export default ClientHome;