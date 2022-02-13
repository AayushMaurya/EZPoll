import React from "react";
import { useParams } from "react-router";

const Poll = () => {
    const {id} = useParams();
    console.log(id);
    return(
        <h1> this is polling page: </h1>
    )
}

export default Poll;