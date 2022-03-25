import React, {useState} from "react";
import { createVote } from "../../apis/voteApi"

const CreateVote = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [voteInfo, setVoteInfo] = useState({
        name: "",
        description: ""
    });
    const [candidate, setCandidate] = useState({
        name: "",
        partyName: "",
        phone: null,
        avatar: null,
        email: ""
    });
    const [voteId, setVoteId] = useState();
    const [voterList, setVoterList] = useState(null);

    const changeHandler1 = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setVoteInfo({
            ...voteInfo,
            [name]: value
        });
    }

    const changeHandler2 =(e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setCandidate({
            ...candidate,
            [name]: value
        });
    }

    const changeHandler3 = (e) => {
        setVoterList(e.target.value);
    }

    const formHandler1 = async (e) =>{
        e.preventDefault();
        setIsLoading(true);

        
        var data = await createVote(voteInfo);
        if(data.success){
            console.log("data:", data.response._id);
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

    const formHandler2 = (e) => {
        e.preventDefault();
        console.log(candidate);
        setStep(3);
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
                    <input type="file" name="avatar" value={candidate.avatar} onChange={changeHandler2} required />
                    <br />
                    {!isLoading && <button type="submit">Add</button>}
                </form>
            </div>}
            {step===3 && <div>
                <h2>insert voters list</h2>
                <form>
                    <input type="file" required name="voterList" value={voterList} onChange={changeHandler3} />
                </form>
            </div>}
            <lable>step: {step}</lable>
        </>
    );
}

export default CreateVote;