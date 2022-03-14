import React from "react";
import { useParams } from "react-router";

const PollResult = () => {
    const { id } = useParams()
    return (
        <>
            <h1>This page will show the poll result of: {id}</h1>
        </>
    );
}

export default PollResult;