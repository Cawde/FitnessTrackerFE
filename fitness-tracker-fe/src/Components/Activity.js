// import { Content } from './index';
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let name = '';
let description = '';
let activityId = undefined;


const Activity = () => {
  const [activities, setActivities] = useState();
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="Activities-Content">
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
    </div>
     <div className="searchContainer">
        <div className="search">
          <form className="search-box">
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
          <div className="Card" key={index} >
            <header>
              <h3 className="card_title">{activity['name'].toUpperCase()}</h3>
              <hr />
              <h3 className="card_subtitle">Description: {activity.description}</h3>
            </header>
          </div>
        )
      }): null}
    </div> 
  ) : null;
}

export default Activity;