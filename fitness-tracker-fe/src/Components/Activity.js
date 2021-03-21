
import { useState, useEffect } from 'react';
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"



let activityId = undefined;


const Activity = () => {
  const [activities, setActivities] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [ modalDisplay, setModalDisplay ] = useState(false); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
        description: description
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
        setActivities(result);
      })
      .catch(console.error);
  }


  const getID = (id) => {
    activityId = id;
    console.log(id)
  }

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
  }, []);
  
  return activities ? (
    <div className="contentContainer">
        <div className="createActivity">
        <div 
                className="actionButton" 
                onClick={()=>setModalDisplay(true)}
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
                            value="Name" //check this may need to be {name same on routines}
                            onChange={(event) => setName(event.target.value)} 
                        />
                        <TextField
                            autoFocus
                            id="Description"
                            label="Description"
                            type="text"
                            fullWidth
                            value="Description"
                            onChange={(event) => setDescription(event.target.value)}
                        />

                        <button 
                            className="actionButton" 
                            type="submit" 
                            value="Submit"
                            onClick={createActivity}//check this
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
        </div>
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