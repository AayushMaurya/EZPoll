import React from "react";
import { useNavigate } from "react-router-dom";
import ClientLogin from "./ClientLogin";
import { useSelector, useDispatch } from "react-redux";
import { clientLogout } from "../../redux/actions/clientAction";

const ClientHome = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(clientLogout());
    navigate("/");
  };
  return (
    <>
      {store.client.isAuthenticated ? (
        <div className="container loginForm">
          <div className="row formBody">
            <div className="row">
              <h3 className="clientLoginTitle">Client Info</h3>
            </div>

            <div className="row">
              <table className="table">
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
                    <td>UserName</td>
                    <td>{store.client.client.registrationNumber}</td>
                  </tr>
                  <tr>
                    <td>Joining Year</td>
                    <td>{store.client.client.joiningYear}</td>
                  </tr>
                  <tr>
                    <td>Contact Number</td>
                    <td>
                      {store.client.client.contactNumber
                        ? store.client.client.contactNumber
                        : "NA"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button onClick={logoutHandler} type="button" className="loginBtn">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <ClientLogin />
      )}
    </>
  );
};

export default ClientHome;
