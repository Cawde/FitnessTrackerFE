
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let name = '';
let description = '';
let activityId = undefined;
let routineName = '';
let goal = '';
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

  const createActivity = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/activities`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
      body: JSON.stringify({
        name: name,
        description: description,
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.name === "error") {
          alert('This activity already exists');
          return;
        }
        console.log(name, description)
        alert('Activity successfully created!');
        return;
      })
      .catch(console.error);
  };

  const updateActivity = () => {
    fetch(`{BASE_URL}/activities/${activityId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        description: description
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        setRoutines(result);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getActivities();
  }, []);

  const getID = (id) => {
    activityId = id;
    console.log(id)
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
  
  return (
    <>
      {/* <button id="modalOpen" className="actionButton" onClick={toggleModal}>uiText</button> */}
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
                onChange={(event) => {routineName = event.target.value}} 
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
                <div className="Card" key={index} >
                  <header>
                    <h3 className="card_title">{routine.name}</h3>
                    <h3 className="card_subtitle">Goal: {routine.goal}</h3>
                    <p className="card_content">Creator: {routine.creatorName}</p>
                  </header>
                </div>
              )
            }): null}  
          </div>
        <div className="Home_content">
          <div className="create-text">Create an activity below</div>
          <div className="Create-Activity">
            <form className="create_activity">
              <label>
                Name:
              <input 
                type="text" 
                name="Activity_Name" 
                onChange={(event) => {name = event.target.value}} 
              />
              </label>
              <label>
                Description
              <input 
                type="text" 
                name="Activity_Description"
                onChange={(event) => {description = event.target.value}}          
              />
              </label>
              <button className="actionButton" type="submit" onClick={createActivity}>Create Activity</button>
            </form>
          </div>

          <h1>Here's the current list of Activities</h1>
          <div className="Activities-Content">
            {activities ? activities.map((activity, index) => {
            return (
              <div className="Card" key={index} id={activity.id} onClick={() => { getID(activity.id) }}>
                <header>
                  <h3 className="card_title">{activity.name}</h3>
                  <h3 className="card_subtitle">Description: {activity.description}</h3>
                </header>
            </div>
            )
          }): null}
          </div>
        </div>
        </div>: <h3 className="Home_content">Please log in to create a routine and/or activities.</h3>}
    </>
      
  )
}
export default Profile;