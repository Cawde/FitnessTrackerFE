// import { Content } from './index';
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let name = '';
let description = '';


const Home = () => {
  const [postSuccess, setPostSuccess] = useState(false);
  const [activities, setActivities] = useState();
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
          setPostSuccess(false);
          alert('This activity already exists');
          return;
        }
        console.log(name, description)
        setPostSuccess(true);
        alert('Activity successfully created!');
        return;
      })
      .catch(console.error);
  };

  useEffect(() => {
    getActivities();
  }, []);
  
  return (
    <>
    {localStorage.getItem('token') ? 
      <div className="Home_content">
        <h1>Create an activity below</h1>
        <div className="Create-Activity">
        <form className="create_activity" onSubmit={createActivity}>
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
          <button className="Submit_Button" type="submit">Create Activity</button>
        </form>
        </div>
        <div className="Hero-text">
          <p>Gestures indicate movement. Get moving today with GEST.R</p>
        </div>
      </div>
        : null}
      <h1>Here's the current list of Activities</h1>
      <div className="Activities-Content">
        {activities ? activities.map((activity, index) => {
          return (
            <div className="Card" key={index} >
              <header>
                <h3 className="card_title">{activity.name}</h3>
                <h3 className="card_subtitle">Description: {activity.description}</h3>
              </header>
            </div>
          )
        }): null}
      </div>
    </>
  )
}

export default Home;