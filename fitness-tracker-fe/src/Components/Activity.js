
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let activityId = undefined;

const Activity = () => {
  const [activities, setActivities] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createActivity = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        description: description
      })
    }).then(response => response.json())
      .then(result => {

        if (result.name === "error") {
          alert('This activity already exists');
          return;
        }

        alert('Activity successfully created!');
        window.location.reload(true);
      })
      .catch(console.error);
  };

  const updateActivity = async () => {
    await fetch(`{BASE_URL}/activities/${activityId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        description: description
      })
    }).then(response => response.json())
      .then(result => {

        setActivities(result);
      })
      .catch(console.error);
  }

  const getID = (id) => {
    activityId = id;
  }

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

  useEffect(() => {
    getActivities();
  }, [setActivities, setModalDisplay, setName]);
  
  return activities ? (
    <div className="contentContainer">
      {localStorage.getItem('user') ? <div className="createActivity">
        <div
          className="actionButton"
          onClick={() => setModalDisplay(true)}
        >Create Activity
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
                id="Name"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                autoFocus
                id="Description"
                label="Description"
                type="text"
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <button
                className="actionButton"
                type="submit"
                value="Submit"
                onClick={(event) => { setModalDisplay(false); createActivity(event) }}//check this
              >Submit
              </button>
            </DialogContent>
            <DialogActions
              className="modalContent"
            >
              <div
                className="actionButton"
                onClick={() => { setModalDisplay(false) }}
              >Cancel
                    </div>
            </DialogActions>
          </Dialog> : null}
      </div> : null}
     <div className="searchContainer">
        <div className="search">
          <form className="searchBox">
          { <input 
              type="text" 
              placeholder="Search for activities here" 
              onChange={(event)=> {setSearchTerm(event.target.value)}}/>
          }
          </form>
        </div>
      </div>
      {activities ? activities.filter((activity) => {
          if (searchTerm === '') {
            return activity;
          } else if (activity.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return activity }
        }).map((activity, index) => {
        return (
          <div className="card" key={index} >
              <p className="cardTitle">{activity['name'].toUpperCase()}</p>
              <hr />
              <h3 className="cardSubtitle">Description: {activity.description}</h3>
          </div>
        )
      }): null}
    </div> 
  ) : null;
}

export default Activity;