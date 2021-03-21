
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let routineId = undefined;
let name = '';
let goal = '';
let updateName = '';
let updateGoal = '';
let isPublic = true;

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
        console.log("user routines is", result);
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

  console.log(routines);
  useEffect(() => {
    getActivities();
    userRoutines();
  }, [setActivities, setRoutines, setDeletedRoutine]);

  return (
    <>
      {localStorage.getItem('user') ?
        <div className="homeContent">
          <div className="createText">Create an routine below</div>
          <div className="createRoutine">
            <form className="createRoutine">
              <label>
                Name:
              <input 
                type="text" 
                name="routineName" 
                onChange={(event) => {name = event.target.value}} 
              />
              </label>
              <label>
                Goal
              <input 
                type="text" 
                name="routineGoal"
                onChange={(event) => {goal = event.target.value}}          
              />
              </label>
              <button className="actionButton" type="submit" onClick={createRoutine}>Create Routine</button>
            </form>
            {routines ? routines.map((routine, index) => {
              
              return (
                <div className="card" key={index} id={routine.id} onClick={() => { getID(routine.id) }}>
                  <header>
                    <h3 className="cardTitle">{routine.name}</h3>
                    <h3 className="cardSubtitle">Goal: {routine.goal}</h3>
                    <p className="cardContent">Creator: {routine.creatorName}</p>
                  </header>
                  <button className="actionButton" >Edit Routine</button>
                  <button className="actionButton" onClick={() => deleteRoutine(routine.id)}>Delete Routine</button>
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