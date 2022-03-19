import React from "react";
import { getAllPolls } from "../../apis/clientApi";

const ClientDashboard = () =>{
    const data = getAllPolls();
    return (
        <>
            this will show all polls created by client
        </>
    );
}

export default ClientDashboard;