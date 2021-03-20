
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let routineId = undefined;
let name = '';
let goal = '';
let updateName = '';
let updateGoal = '';
let isPublic = true;

const Profile = () => {
  const [activities, setActivities] = useState();
  const [routines, setRoutines] = useState();
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
  console.log(routines);
  return (
    <>
      {localStorage.getItem('user') ?
        <div className="Home_content">
          <div className="create-text">Create an routine below</div>
          <div className="Create-routine">
            <form className="create_routine">
              <label>
                Name:
              <input 
                type="text" 
                name="Routine_Name" 
                onChange={(event) => {name = event.target.value}} 
              />
              </label>
              <label>
                Goal
              <input 
                type="text" 
                name="Routine_Goal"
                onChange={(event) => {goal = event.target.value}}          
              />
              </label>
              <button className="actionButton" type="submit" onClick={createRoutine}>Create Routine</button>
            </form>
            {routines ? routines.map((routine, index) => {
              return (
                <div className="Card" key={index} id={routine.id} onClick={() => { getID(routine.id) }}>
                  <header>
                    <h3 className="card_title">{routine.name}</h3>
                    <h3 className="card_subtitle">Goal: {routine.goal}</h3>
                    <p className="card_content">Creator: {routine.creatorName}</p>
                  </header>
                  <button>Edit Routine</button>
                </div>
              )
            }): null}  
          </div>
      
          <h1>Here's the current list of Activities</h1>
          <div className="Activities-Content">
            {activities ? activities.map((activity, index) => {
            return (
              <div className="Card" key={index} id={activity.id} onClick={() => { getID(activity.id) }}>
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