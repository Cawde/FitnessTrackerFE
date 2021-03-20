
import React, { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

let routineName = '';
let goal = '';
let isPublic = true;

const Routines = () => {
  const [routines, setRoutines] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const getRoutines = () => {
    fetch(`${BASE_URL}/routines`)
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
  const createRoutine = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: routineName,
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
  console.log('These are the routines in the state', routines);
  return routines ? (
    <div className="Routine-Content">
      <div className="searchContainer">
        <div className="search">
          <form className="search-box">
          { <input 
              type="text" 
              placeholder="Search for routines here" 
              onChange={(event)=> {setSearchTerm(event.target.value)}}/>
          }
          </form>
        </div>
      </div>
      <h1>{routines.length} Routines</h1>
      <div className="Routines_Content">
        {routines ? routines.filter((routine) => {
          if (searchTerm === '') {
            return routine;
          } else if (routine.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return routine }
        }).map((routine, index) => {
          return (
            <div className="Card" key={index} >
              <header>
                <h3 className="card_title">{routine.name}</h3>
                <hr />
                <h3 className="card_subtitle">Goal: {routine.goal}</h3>
                <hr />
                <p className="card_content">Creator: {routine.creatorName}</p>
              </header>
              <div className="card_details" value={routine.id}>
                {routine.activities.length ? routine.activities.map((activity, index) => {
                  return (
                    <div className="sub_card" key={index}>
                      <h2>Activity: </h2>
                      <header>
                        <h3 className="card_title">Activity name: {activity.name}</h3>
                        <h3 className="card_title">Activity description: {activity.description}</h3>
                        {activity.goal ? <h3 className="card_title">Goal: {activity.goal}</h3> : null}
                        <h3 className="card_title">Count: {activity.count} reps</h3>
                        <h3 className="card_title">Duration: {activity.duration} minutes</h3>
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