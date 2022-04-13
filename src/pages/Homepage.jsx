import React from 'react';

import './index.css';
import bg from '../images/bg.png';  
import { Link } from 'react-router-dom';

const Homepage = () => {

    // const homeStyle = {
    //     backgroundImage: "url("+bg+")",
    //     // backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: '90% 0%'
    // }

    return <div className='homeBg'>

        <div className="container">
            <div className="row flex-column homeContent">
                <h2 className='homeHeading'>Create your Own <span className='spanName'>EZPoll</span> within Seconds </h2>
                <h3 className='homeSubHeading'>Simple<span className="dot">.</span> Fast<span className="dot">.</span> Secure<span className="dot">.</span> </h3>
            </div>
            <div className="row btnRow">
                <div className="btnCell">
                    <Link to="/createpoll" className='col-2 hmBtn'><button className="btn btn1 mx-3 crtBtn">Create a Poll</button></Link>
                    <Link to="/polls" className='col-2 hmBtn'><button className="btn btn2 mx-3">Ongoing Polls</button></Link>
                </div>
            </div>
            {/* <div className="row btnRow">
                <h7 className = 'hide'>.</h7>
            </div> */}

        </div>

     </div>;
}

export default Homepage;