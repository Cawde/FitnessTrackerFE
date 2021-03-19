
import React, { useState, useEffect, Fragment } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Routines = () => {
  const [routines, setRoutines] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  // const postMatches = (post, text) => {
  //   return post.author.username.toLowerCase().includes(text.toLowerCase()) || post.description.toLowerCase().includes(text.toLowerCase()) || post.price.toLowerCase().includes(text.toLowerCase());
  // }

  const getRoutines = () => {
    fetch(`${BASE_URL}/routines`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setRoutines(data);
    })
    .catch(console.error);
  }
  useEffect(() => {
    getRoutines();
  }, []);
  console.log('These are the routines in the state', routines);
  return routines ? (
      <div className="Routine-Content">
        <div>
          <h1 className="search_text">Search</h1>
          <div className="search">
              <form className="search-box">
              { <input 
                  type="text" 
                  placeholder="Search for routines here" 
                  onChange={(event)=> {setSearchTerm(event.target.value)}}/>
              }
              </form>
          </div>
        </div>
        <h1>{routines.length} Routines</h1>

        <div className="Routines_Content">
            {routines ? routines.filter((routine) => {
              if (searchTerm === '') {
                return routine;
              } else if (routine.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return routine }
            }).map((routine, index) => {
              return (
                <div className="Card" key={index} >
                  <header>
                    <h3 className="card_title">{routine.name}</h3>
                    <h3 className="card_subtitle">Goal: {routine.goal}</h3>
                    <p className="card_content">Creator: {routine.creatorName}</p>
                  </header>
                  <div className="card_details" value={routine.id}>
                    {routine.activities.length ? routine.activities.map((activity, index) => {
                      return (
                        <div className="sub_card" key={index}>
                          <header>
                            <h3 className="card_title">{activity.name}</h3>
                            <h3 className="card_title">{activity.description}</h3>
                            <h3 className="card_title">Goal: {activity.goal}</h3>
                            <h3 className="card_title">Count: {activity.count}</h3>
                            <h3 className="card_title">Duration: {activity.duration}</h3>
                          </header>
                        </div>
                     )
                   }) : null} 
                  </div>
                </div>
              )
            }): null}  
          </div>
      </div>
  ) : null;
}

export default Routines;