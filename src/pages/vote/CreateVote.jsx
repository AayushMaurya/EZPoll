import React, {useState} from "react";
import { createVote, addCandidate } from "../../apis/voteApi"

const CreateVote = () => {
    const [step, setStep] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [voteInfo, setVoteInfo] = useState({
        name: "",
        description: ""
    });
    const [candidate, setCandidate] = useState({
        name: "",
        partyName: "",
        phone: null,
        email: "",
        position: null
    });
    const [voteId, setVoteId] = useState();
    const [voterList, setVoterList] = useState(null);
    const [profile, setProfile] = useState(null);

    // handle vote info
    const changeHandler1 = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setVoteInfo({
            ...voteInfo,
            [name]: value
        });
    }

    // handle candidate info
    const changeHandler2 =(e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setCandidate({
            ...candidate,
            [name]: value
        });
    }

    // handle voters list
    const changeHandler3 = (e) => {
        setVoterList(e.target.value);
    }


    // this will create a vote position in database
    const formHandler1 = async (e) =>{
        e.preventDefault();
        setIsLoading(true);

        
        var data = await createVote(voteInfo);
        if(data.success){
            console.log("voteId:", data.response._id);
            setVoteId(data.response._id);
            setCandidate({
                ...candidate,
                position: voteId
            });
            
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

    // this will add candidate info 
    const formHandler2 = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(candidate);

        let formData = new FormData();
        formData.append('candidate', candidate);
        formData.append('profile', profile);
        console.log("formata: ", formData);

        var data = await addCandidate(formData);

        if(data.success)
        {
            setIsLoading(false);
            alert(data.message);
        }
        else{
            alert(data.message);
            setIsLoading(false);
        }
    }

    const handleProfile = (e) => {
        console.log(e.target.files[0]);

        let file = e.target.files[0];

        setProfile(file);
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
                    <input type="text" name="name" value={candidate.name} onChange={changeHandler2} required />
                    <br />
                    <lable>Party Name:  </lable>
                    <input type="text" name="partyName" value={candidate.partyName} onChange={changeHandler2} required />
                    <br />
                    <lable>Phone:  </lable>
                    <input type="tel" name="phone" value={candidate.phone} onChange={changeHandler2} required />
                    <br />
                    <lable>Email:  </lable>
                    <input type="email" name="email" value={candidate.email} onChange={changeHandler2} required />
                    <br />
                    <lable>Avatar:  </lable>
                    <input type="file" name="profile" onChange={handleProfile} required />
                    <br />
                    {!isLoading && <button type="submit">Add</button>}
                </form>
                <button onClick={next}>Next</button>
               
            </div>}
            {step===3 && <div>
                <h2>insert voters list</h2>
                <form>
                    <input type="file" required name="voterList" value={voterList} onChange={changeHandler3} />
                </form>
                <button onClick={back}>back</button>
            </div>}
            <lable>step: {step}</lable>
        </>
    );
}

export default CreateVote;