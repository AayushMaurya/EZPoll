import React from "react";

import "./index.css";

export default function How() {
  return (
    <div>
      <div className="container my-5 how">
        <div className="row ">
          <h3 className="howTitle"> HOW IT WORKS</h3>
        </div>
        <div className="row">
          <h2 className="howSubtitle">New to EZPoll? No problem.</h2>
        </div>
        <div className="row ">
          <h4 className="howExp">
            We have designed our poll maker to be as easy and intuitive to use
            as possible. At the same time, we are constantly optimizing the
            workflow of creating polls on <span className="spanEZ">EZPoll</span>.
          </h4>
        </div>
        <div className="row howSteps">
            <div className="col howStep">
                <h2 className="step">Step 1</h2>
                <h2 className="stepTitle">Create a poll</h2>
                <h3 className="stepDes">Choose a title, a set of answer options and some basic settings.</h3>
            </div>
            <div className="col howStep">
                <h2 className="step">Step 2</h2>
                <h2 className="stepTitle">Share your link</h2>
                <h3 className="stepDes">Invite participants by sharing your StrawPoll link.</h3>
            </div>
            <div className="col howStep">
                <h2 className="step">Step 3</h2>
                <h2 className="stepTitle">Get results</h2>
                <h3 className="stepDes">When a vote is cast, results will be updated in real-time</h3>
            </div>
        </div>
      </div>
    </div>
  );
}
