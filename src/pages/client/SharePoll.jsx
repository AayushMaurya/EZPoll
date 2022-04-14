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
                <div className="row">
                    <h5>Share</h5>
                </div>
                <div className="row">
                    <div className="col">
                        <h5>Link : {url}</h5>
                    </div>
                    

                </div>
                <FacebookShareButton className="shrIcon" url={url} quote={quot}>
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton className="shrIcon" url={url} quote={quot}>
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <LinkedinShareButton className="shrIcon" url={url} quote={quot}>
                    <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>
                {/* <span>this is to share link: {url}</span> */}
                <span className="close-icon" onClick={props.handleClose}>x</span>
            </div>
        </div>
    );
}

export default SharePoll;