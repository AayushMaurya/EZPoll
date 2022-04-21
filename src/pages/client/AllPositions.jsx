import React, { useEffect, useState } from "react";
import { getAllPosition } from "../../apis/clientApi";
import { useNavigate } from "react-router";
import { FaPoll } from "react-icons/fa";

const AllPositions = () => {
    const [allPosition, setAllposition] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(async () => {
        const data = await getAllPosition();
        console.log("data: ", data);

        if (data.success) {
            setAllposition(data.result);
            setIsLoading(false);
            console.log("all positions: ", allPosition);
        }
        else {
            alert(data.message);
            navigate("/");
            setIsLoading(true);
        }

    }, []);

    const seeResult = (position_id) => {
        const url = "/voteResult/" + position_id;
        navigate(url);
    }

    return (
        <>
            {isLoading ? (
                <div>Loading Dashboard ...</div>
            ) : (
                <div className="container dash">

                    <div className="row my-2">
                        <h3>Your Recently Created Polls</h3>
                    </div>
                    {allPosition.map((position, index) => (
                        <div key={index}>
                            <div className="row my-2 dashPoll">
                                <div className="col">
                                    Name: {position.name}
                                </div>
                                <div className="col">
                                    Description: {position.description}
                                </div>
                                <div className="col">
                          <button type="button" className="noneBtn" onClick={() => {seeResult(position.position_id)}}>
                            <FaPoll size="25" />
                          </button>
                      </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default AllPositions;