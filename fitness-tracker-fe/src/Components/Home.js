import { Modal } from './Modal'
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let name = '';
let description = '';
let activityId = undefined;
let routineName = '';
let goal = '';
let isPublic = true;

export const Home = () => {
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
    <div>HomePage</div>
  )   
} 


