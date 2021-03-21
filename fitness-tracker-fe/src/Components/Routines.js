
import React, { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Routines = () => {
  const [routines, setRoutines] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [ modalDisplay, setModalDisplay ] = useState(false); 

  const getRoutines = async () => {
    await fetch(`${BASE_URL}/routines`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setRoutines(data);
    })
    .catch(console.error);
  }
  useEffect(() => {
    getRoutines();
  }, []);
  const createRoutine = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/routines`, {
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
  const userRoutines = async () => {
    await fetch(`${BASE_URL}/users/${localStorage.getItem('user')}/routines`, {
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

  return routines ? (
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
        value={name}
        onChange={(event) => {setName(event.target.value)}} 
      />
      <TextField
        autoFocus
        id="routineGoal"
        label="Goal"
        type="text"
        fullWidth
        value={goal}
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
      <div className="searchContainer">
        <div className="search">
          <form className="searchBox">
          { <input 
            type="text" 
            placeholder="Search for routines here" 
            onChange={(event)=> {setSearchTerm(event.target.value)}}/>
          }
          </form>
        </div>
      </div>
      <div className="routinesContent">
        {routines ? routines.filter((routine) => {
          if (searchTerm === '') {
            return routine;
          } else if (routine.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return routine }
        }).map((routine, index) => {
          return (
            <div className="card" key={index} >
              <p className="cardTitle">{routine.name}</p>
              <hr />
              <h3 className="cardSubtitle">Goal: {routine.goal}</h3>
              <hr />
              <p className="cardContent">Creator: {routine.creatorName}</p>
              <div className="cardContent" value={routine.id}>
                {routine.activities.length ? routine.activities.map((activity, index) => {
                  return (
                    <div className="subContent" key={index}>
                      <h2>Activity: </h2>
                      <header>
                        <h3 className="cardSubtitle">-{activity.name}</h3>
                        <h3 className="cardSubtitle">-{activity.description}</h3>
                        {activity.goal ? <h3 className="cardTitle">Goal: {activity.goal}</h3> : null}
                        <h3 className="cardSutitle">Count: {activity.count} reps</h3>
                        <h3 className="cardSubtitle">Duration: {activity.duration} minutes</h3>
                      </header>
                    </div>
                  )
                }) : null} 
              </div>
            </div>
          )
        }): null}  
      </div>
    </div>
  ) : null;
}

export default Routines;