
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let activityId = undefined;
let name = '';
let goal = '';
let isPublic = true;
let routineId = undefined;

const Profile = () => {
  const [routines, setRoutines] = useState();
  const [deletedRoutine, setDeletedRoutine] = useState();
  const [activities, setActivities] = useState();

  const getActivities = async () => {
    await fetch(`${BASE_URL}/activities`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setActivities(data); 
    })
    .catch(console.error);
  }
  const getID = (id) => {
    routineId = id;
    return routineId;
    console.log(routineId)
  }

  const updateRoutine = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        goal: goal
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  }

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

  const deleteRoutine = async (id) => {
    await fetch(`${BASE_URL}/routines/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        setDeletedRoutine(result);
      })
      .catch(console.error);
    userRoutines();
  }


  useEffect(() => {
    getActivities();
    userRoutines();
  }, [setActivities, setRoutines, setDeletedRoutine]);

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
                <div className="Card" key={index} >
                  <header>
                    <h3 className="cardTitle">{routine.name}</h3>
                    <h3 className="cardSubtitle">Goal: {routine.goal}</h3>
                    <p className="cardContent">Creator: {routine.creatorName}</p>
                  </header>
                </div>
              )
            }): null}  
          <h1>Here's the current list of Activities</h1>
          <div className="activitiesContent">
            {activities ? activities.map((activity, index) => {
            return (
              <div className="card" key={index} id={activity.id} onClick={() => { getID(activity.id) }}>
                <header>
                  <h3 className="cardTitle">{activity.name.toUpperCase()}</h3>
                  <hr />
                  <h3 className="cardSubtitle">Description: {activity.description}</h3>
                </header>
            </div>
            )
          }): null}
          </div>
        </div>
      </div>: <h3>Please log in to create a routine and/or activities.</h3>}
    </>   
  )
}
export default Profile;