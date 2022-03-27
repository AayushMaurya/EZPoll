import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createVote, addCandidate, addVoters } from "../../apis/voteApi"

const CreateVote = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [voteInfo, setVoteInfo] = useState({
        name: "",
        description: ""
    });
    const [name, setName] = useState('');
    const [partyName, setPartyName] = useState('');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState(null);
    const [voteId, setVoteId] = useState();
    const [voterList, setVoterList] = useState(null);

    // handle avatar
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setProfile(img);
        }
    }

    // handle voter list
    const voterListHandler = (e) => {
        if(e.target.files && e.target.files[0]) {
            let xml = e.target.files[0];
            setVoterList(xml);
        }
    }

    // handle vote info
    const changeHandler1 = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setVoteInfo({
            ...voteInfo,
            [name]: value
        });
    }

    // submit vote details
    const formHandler1 = async (e) =>{
        e.preventDefault();
        setIsLoading(true);

        
        var data = await createVote(voteInfo);
        if(data.success){
            console.log("voteId:", data.response._id);
            setVoteId(data.response._id);
            
            alert("vote successfully created");
            setStep(2);
            setIsLoading(false);
        }
        else 
        {
            setIsLoading(false)
            alert(data.message);
        }
    }

    // submit candidate details 
    const formHandler2 = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('partyName', partyName);
        formData.append('profile', profile);

        const data = await addCandidate(formData);
        if(data.success)
        {
            console.log("success:", data);
            setIsLoading(false);
        }
        else{
            alert(data.message);
            setIsLoading(false);
        }
    }

    // submit voter list
    const formHandler3 = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('excel', voterList);

        const data = await addVoters(formData);
        if(data.success)
        {
            setIsLoading(false);
            navigate('/');
        }
        else
        {
            alert(data.message);
            setIsLoading(false);
        }
    }

    const next = () =>{
        setStep(3);
    }
    const back = () =>{
        setStep(2);
    }

    return(
        <>
            {step===1 && <div>
                <h2>Insert details of position vote for</h2>
                <form onSubmit={formHandler1}>
                    <lable>Position Name: </lable>
                    <input type="text" name="name" required value={voteInfo.name} onChange={changeHandler1} />
                    <br />
                    <lable>Description of position</lable>
                    <input type="text" name="description" required value={voteInfo.description} onChange={changeHandler1} />
                    <br />
                    {!isLoading && <button type="submit">Create</button>}
                </form>
            </div>}
            {step===2 && <div>
                <h2>insert details of candidates</h2>
                <form onSubmit={formHandler2}>
                    <lable>Name: </lable>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <br />
                    <lable>Party Name:  </lable>
                    <input type="text" name="partyName" value={partyName} onChange={(e) => setPartyName(e.target.value)} required />
                    <br />
                    <lable>Phone:  </lable>
                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <br />
                    <lable>Email:  </lable>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <lable>Avatar:  </lable>
                    <input required type="file" accept=".jpg,.png,.jpeg" onChange={imagehandler} />
                    <br />
                    {!isLoading && <button type="submit">Add</button>}
                </form>
                <button onClick={next}>Next</button>
               
            </div>}
            {step===3 && <div>
                <h2>insert voters list</h2>
                <form onSubmit={formHandler3}>
                    <input type="file" required name="voterList" onChange={voterListHandler} />
                    <button type="submit">submit</button>
                </form>
                <button onClick={back}>back</button>
            </div>}
            <lable>step: {step}</lable>
        </>
    );
}

export default CreateVote;