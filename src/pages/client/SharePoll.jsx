import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon
} from "react-share";

const SharePoll = (props) => {
    // const url = `http://localhost:3000/poll/${props.share_id}`;
    const url = "https://ezpoll-india.herokuapp.com"
    const quot = "Give your vote to this poll";

    return (
        <div className="popup-box">
            <div className="box">
                
                <FacebookShareButton url={url} quote={quot}>
                    <FacebookIcon size={50} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={url} quote={quot}>
                    <WhatsappIcon size={50} round={true} />
                </WhatsappShareButton>
                <LinkedinShareButton url={url} quote={quot}>
                    <LinkedinIcon size={50} round={true} />
                </LinkedinShareButton>
                <span>this is to share link: {url}</span>
                <span className="close-icon" onClick={props.handleClose}>x</span>
            </div>
        </div>
    );
}

export default SharePoll;