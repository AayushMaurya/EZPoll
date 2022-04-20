import React, { useState } from "react";
import { setOTP } from "../../apis/voterApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { voterLogout } from "../../redux/actions/voterAction";
import ThanksForVote from "./ThanksForVoting";
 
const Popup = props => {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = (e) =>{
        setOtp(e.target.value);
    }

    const submitOtp = async() => {
        console.log("submitting otp");
        const formData = {
            choice_id: props.choice_id,
            position_id: props.position_id,
            otp: otp
        }

        const data = await setOTP(formData);
        
        if(data.success)
        {
            alert(data.message);
            dispatch(voterLogout());
            <ThanksForVote/>;
        }
        else{
            alert(data.message);
            props.handleClose();
        }
    }

  return (
    <div className="popup-box">
      <div className="box">
        <div className="row">
          <h2>Enter your otp</h2>
        </div>
        <div className="row">
          <div className="col">
            <input type="text" value={otp} onChange={formHandler} />
          </div>
            <button onClick={submitOtp} className = "btn3 otpBtn" >submit</button>
        </div>
        <span className="close-icon" onClick={props.handleClose}>x</span>
      </div>
    </div>
  );
};
 
export default Popup;