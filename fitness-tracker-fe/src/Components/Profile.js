
import { useState, useEffect } from 'react';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let routineId = undefined;
let count = undefined;
let duration = undefined;
let isPublic = true;
let activityId = undefined;
let goal = '';
let name = '';

const Profile = () => {
  const [routines, setRoutines] = useState();
  const [deletedRoutine, setDeletedRoutine] = useState();
  const [activities, setActivities] = useState();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [addRoutineActivity, setAddRoutineActivity] = useState(false);
  
  const getActivities = async () => {
    await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(result => {
 
        setActivities(result);
      })
      .catch(console.error);
  }
  const updateRoutine = async (event, routineId) => {
    event.preventDefault();
 
    await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal
      })
    }).then(response => response.json())
      .then(result => {

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

        setDeletedRoutine(result);
      })
      .catch(console.error);
    userRoutines();
  }
  const addActivityToRoutine = async (activityId, routineId) => {
    await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        count: count, 
        duration: duration
      })
    }).then(response => response.json())
      .then(result => {

      })
      .catch(console.error);
    setAddRoutineActivity(false);
  }
  
  const getRoutineId = (id) => {
    routineId = id;

    return routineId;
  }
  const getActivityId = (id) => {
    activityId = id;
    return activityId;
  }
  
  useEffect(() => {
    getActivities();
    userRoutines();
  }, [setActivities, setDeletedRoutine, setRoutines]);
  const renderActivities = (routineId) => {
    return (<div>
      {activities ? activities.map((activity, index) => {

      return (
        <div className="card" key={index} id={activity.id}>
          <header>
            <h3 className="cardTitle">{activity.name.toUpperCase()}</h3>
            <hr />
            <h3 className="cardSubtitle">Description: {activity.description}</h3>
          </header>
          <div className="numberContainer">
          <input
            className="cardNumbers"
            type="number"
            placeholder="count"
            onChange={(event) => { count = event.target.value }}
          />
          <input
            className="cardNumbers"
            type="number"
            placeholder="duration"
            onChange={(event) => { duration = event.target.value }}
          />
          </div>
          <button 
            className="actionButton"
            onClick={() => { getActivityId(activity.id); addActivityToRoutine(activity.id, routineId) }}>Add this activity</button>
      </div>
      )
    }) : null}
      </div>)
  }
  return (
    <>
      {localStorage.getItem('user') ?
        <div className="contentContainer">
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
                <div className="card" key={index} id={routine.id} onClick={()=> getRoutineId(routine.id)}>
                  
                    <h3 className="cardTitle">{routine.name.toUpperCase()}</h3>
                    <hr/>
                    <h3 className="cardSubtitle">Goal:</h3>
                    <p className="cardContent"> {routine.goal}</p>
                    <h3 className="cardSubtitle">Creator: </h3>
                    <p className="cardContent">{routine.creatorName}</p>
                    <div className="activitiesBox">
                      <h3 className="cardTitle">Activities</h3>
                      <hr />
                      {routine.activities.length ? routine.activities.map((activity, index) => {
                          return (
                            <div className="subContent" key={index}>
                              <div className="activitySub">
                                <h3 className="cardSubtitle"></h3>
                                  <p className="cardSubtitle">-{activity.name}</p>
                                  <p className="cardContent">-{activity.description}</p>
                                  {activity.goal ? <h3 className="cardTitle">Goal: {activity.goal}</h3> : null}
                                  <p className="cardNumbers"> {activity.count} reps</p>
                                  <p className="cardNumbers">{activity.duration} minutes</p>
                              </div>  
                            </div>
                          )
                        }) : null} 
                    </div>
                  <div className="buttonContainer">
                    <button 
                      className="actionButton"
                      onClick={() => { setAddRoutineActivity(true)}}>Add Activity</button>
                    {addRoutineActivity && renderActivities(routine.id)}
                  
                  <button className="actionButton" onClick={() => setModalDisplay(true)}>Edit Routine</button>
                  <button className="actionButton" onClick={() => deleteRoutine(routine.id)}>Delete Routine</button>
                  </div>
                  </div>
              )
            }): null}  
        </div>
      </div>: <h3>Please log in to create a routine and/or activities.</h3>}
    </>   
  )
}
export default Profile;