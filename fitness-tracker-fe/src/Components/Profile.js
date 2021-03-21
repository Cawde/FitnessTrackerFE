
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let routineId = undefined;

let updateName = '';
let updateGoal = '';
let isPublic = true;
let activityId = undefined;
let count = null;
let duration = null;

const Profile = () => {
  const [routines, setRoutines] = useState();
  const [deletedRoutine, setDeletedRoutine] = useState();
  const [activities, setActivities] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('')
  const [ modalDisplay, setModalDisplay ] = useState(false); 
  const [ name, setName ] = useState('')
  const [ goal, setGoal ] = useState('')
  const [ description, setDescription ] = useState('null')

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getActivities = async () => {
    await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        setActivities(result);
      })
      .catch(console.error);
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

  const addActivityToRoutine = async (activityId, routineId) => {
    await fetch( `${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      body: JSON.stringify({
        "activityId": activityId,
        count: 4, 
        duration: 5
      })
    }).then(response => response.json())
      .then(result => {
        console.log(activityId, routineId)
        console.log(result);
      })
      .catch(console.error);
  }
  
  const getRoutineId = (id) => {
    routineId = id;
    console.log(routineId)
    return routineId;
  }
  
  const getActivityId = (id) => {
    activityId = id;
    console.log(id);
    console.log(activityId)
    return activityId;
  }
  
  useEffect(() => {
    getActivities();
    userRoutines();
  }, [setActivities, setDeletedRoutine, setRoutines]);

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
                <div className="card" key={index} id={routine.id} onClick={()=> getRoutineId(routine.id)}>
                  <header>
                    <h3 className="cardTitle">{routine.name}</h3>
                    <h3 className="cardSubtitle">Goal: {routine.goal}</h3>
                    <p className="cardContent">Creator: {routine.creatorName}</p>
                  </header>
                  <button 
                      className="actionButton"
                      onClick={()=>setModalDisplay(true)}
                      >Edit Routine
                    </button>
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
                        id="editRoutineName"
                        label="Name"
                        type="text"
                        fullWidth
                        value={routine.name}
                        onChange={(event) => {setName(event.target.value)}} 
                      />
                      <TextField
                        autoFocus
                        id="editRoutineGoal"
                        label="goal"
                        type="text"
                        fullWidth
                        value={routine.goal}
                        onChange={(event) => {setGoal(event.target.value)}} 
                      />
                      <button 
                        className="actionButton" 
                        type="submit" 
                        value="Submit"
                        onClick={updateRoutine} //check this
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
                  <div className='addActivityMenu'>
                    <List component="nav" aria-label="activityList">
                      <ListItem
                        className="actionButton"
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="Add to Routine"
                        onClick={handleClickListItem}
                      >
                        <ListItemText primary="Add activity to routine"/>
                      </ListItem>
                    </List>
                    <Menu
                      id="lock-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {activities ? activities.map((activity, index) => {
                        return (
                          <div className="card" key={index} id={activity.id} onClick={() => { addActivityToRoutine(activity.id, routine.id) }}>
                            <header>
                              <h3 className="cardTitle">{activity.name.toUpperCase()}</h3>
                              <hr />
                              <h3 className="cardSubtitle">Description: {activity.description}</h3>
                            </header>
                        </div>
                        )
                      }): null}
                    </Menu>
                  </div>
                    

                    <button className="actionButton" onClick={() => deleteRoutine(routine.id)}>Delete Routine</button>
                  </div>
              )
            }): null}  
          <h1>Here's the current list of Activities</h1>
          <div className="activitiesContent">
            {activities ? activities.map((activity, index) => {
            return (
              <div className="card" key={index} id={activity.id} onClick={() => { getActivityId(activity.id) }}>
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