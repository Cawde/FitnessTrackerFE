
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"


const Profile = () => {
  const [routines, setRoutines] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [ modalDisplay, setModalDisplay ] = useState(false); 
  let routineId = undefined;
  let updateName = '';
  let updateGoal = '';
  const [activities, setActivities] = useState();


  const getActivities = () => {
    fetch(`${BASE_URL}/activities`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setActivities(data); 
    })
    .catch(console.error);
  }

  useEffect(() => {
    getActivities();
    userRoutines();
  }, []);

  const getID = (id) => {
    routineId = id;
    console.log(routineId)
  }

  const updateRoutine = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: 'Long Cardio Day',
        goal: 'To get your heart pumping!'
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  }
  const createRoutine = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
    userRoutines();
  }

  const userRoutines = () => {
    fetch(`${BASE_URL}/users/${localStorage.getItem('user')}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        setRoutines(result);
      })
      .catch(console.error);
  }
  return (
    <>
      {localStorage.getItem('user') ? 
        <div className="contentContainer">
        <div 
        className="actionButton" 
        onClick={()=>setModalDisplay(true)}
    >Create Routine
    </div>
    {modalDisplay ? 
    <Dialog
        open={modalDisplay}
        className='actionModal'
        onClose={() => setModalDisplay(false)}
    >
        <DialogContent
            className="modalContent"
        >
                <TextField
                    autoFocus
                    id="routineName"
                    label="Name"
                    type="text"
                    fullWidth
                    value="Name"
                    onChange={(event) => {setName(event.target.value)}} 
                />
                <TextField
                    autoFocus
                    id="routineGoal"
                    label="Goal"
                    type="text"
                    fullWidth
                    value="Goal"
                    onChange={(event) => setGoal(event.target.value)}
                />
                
                <button 
                    className="actionButton" 
                    type="submit" 
                    value="Submit"
                    onClick={createRoutine} //check this
                >Submit
                </button>
        </DialogContent>
        <DialogActions
            className="modalContent"
        >
            <div 
                className="actionButton"
                onClick={()=>{setModalDisplay(false)}}
            >Cancel
            </div>
        </DialogActions>
    </Dialog> : null} 
            {routines ? routines.map((routine, index) => {
              return (
                <div className="card" key={index} id={routine.id} onClick={() => { getID(routine.id) }}>
                  <header>
                    <h3 className="card_title">{routine.name}</h3>
                    <h3 className="card_subtitle">Goal: {routine.goal}</h3>
                    <p className="card_content">Creator: {routine.creatorName}</p>
                  </header>
                  <button>Edit Routine</button>
                </div>
              )
            }): null}  
          <h1>Here's the current list of Activities</h1>
          <div className="activitiesContent">
            {activities ? activities.map((activity, index) => {
            return (
              <div className="card" key={index} id={activity.id} onClick={() => { getID(activity.id) }}>
                <header>
                  <h3 className="card_title">{activity.name.toUpperCase()}</h3>
                  <hr />
                  <h3 className="card_subtitle">Description: {activity.description}</h3>
                </header>
            </div>
            )
          }): null}
          </div>
        </div>: <h3 className="Home_content">Please log in to create a routine and/or activities.</h3>}
    </>   
  )
}
export default Profile;