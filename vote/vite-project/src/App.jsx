import React , {useEffect , useState} from 'react'
import './App.css'
const App = () => {

  const [votes , setVotes]= useState([]);
  const [newVote , setNewVote]= useState(false);
  const [question , setQuestion] = useState("");

  const API = "http://localhost:2000/api";

  const fetchVotes = async()=>{
    try {
      const response = await fetch(`${API}/getvote`);
      const data = await response.json();
      setVotes(data);
    } catch (error) {
      console.error("error fetching votes", error)
    }
  }

  useEffect(()=>{
    fetchVotes();
  }, []);


  const handleVote= async(id , answer)=>{
    try {
      await fetch(`${API}/vote/${id}`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({answer})
      })
      fetchVotes();

    } catch (error) {
      console.error("error  voteing ", error)
    }
  }

  const handleAddVote = async()=>{
    if(!question.trim()) return;

    try {
      await fetch(`${API}/new-voter`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({question})
      })

      setQuestion("");
      setNewVote(false);
      fetchVotes();

    } catch (error) {
      console.error("error adding  votes", error)
    }
  }

  const handleDelete = async(id)=>{
    try {
      await fetch(`${API}/delete/${id}`,{
        method:"DELETE"
      })
      fetchVotes();

    } catch (error) {
      console.error("error deleting ", error)   
    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Vote Polling App</h1>
        <button onClick={()=>setNewVote(!newVote)}>New Vote</button>
      </div>
      {newVote && (
        <div className='new-vote'>
          <input type='text' placeholder='"Enter Question' value={question} onChange={(e)=>setQuestion(e.target.value)} />
          <button onClick={handleAddVote}>Add Vote</button>
        </div>
      )}
      <div className='vote-list'>
        {votes.map((vote)=>{
          const totalVote = vote.yes+vote.no;
          const yesPercent = totalVote ? (vote.yes*100)/totalVote:0;
          const noPercent = totalVote ? (vote.no*100)/totalVote:0;
          return(
            <div className='vote-card'  key={vote._id}>
              <div className='vote-header'>
                <h3>Q:{vote.question}</h3>
                <button className='delete-btn' onClick={()=> handleDelete(vote._id)}> Delete </button>
              </div>
              <div className='vote-option' onClick={()=> handleVote(vote._id , 1)}>
                <div className='progress yes' style={{width:`${yesPercent}%`}}> </div>
                <span>Yes</span>
                <span>{vote.yes}</span>
              </div>
              <div className='vote-option' onClick={()=> handleVote(vote._id , 0)}>
                <div className='progress no' style={{width:`${noPercent}%`}}> </div>
                <span>NO</span>
                <span>{vote.no}</span>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
