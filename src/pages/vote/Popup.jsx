import React, { useState } from "react";
import { setOTP } from "../../apis/voterApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { voterLogout } from "../../redux/actions/voterAction";
 
const Popup = props => {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formHandler = (e) =>{
        setOtp(e.target.value);
    }

    const submitOpt = async() => {
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
            navigate("/");
        }
        else{
            alert(data.message);
            props.handleClose();
        }
    }

  return (
    <div className="popup-box">
      <div className="box">
        <h2>Enter your opt</h2>
        <input type="text" value={otp} onChange={formHandler} />
        <br />  
        <button onClick={submitOpt} >submit</button>
        <span className="close-icon" onClick={props.handleClose}>x</span>
      </div>
    </div>
  );
};
 
export default Popup;