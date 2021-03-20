// import { Content } from './index';
import { useState, useEffect } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Activity = () => {
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
  useEffect(() => {
    getActivities();
  }, []);
  
  return activities ? (
    <div className="Activities-Content">
      {activities ? activities.map((activity, index) => {
        return (
          <div className="Card" key={index} >
            <header>
              <h3 className="card_title">{activity['name'].toUpperCase()}</h3>
              <h3 className="card_subtitle">Description: {activity.description}</h3>
            </header>
          </div>
        )
      }): null}
    </div>
  ) : null;
}

export default Activity;