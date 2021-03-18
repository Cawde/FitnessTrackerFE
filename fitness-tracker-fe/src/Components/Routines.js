import { Content } from './index';
import React, { useState, useEffect, Fragment } from 'react';
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Routines = () => {
  const [routines, setRoutines] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const postMatches = (post, text) => {
    return post.author.username.toLowerCase().includes(text.toLowerCase()) || post.description.toLowerCase().includes(text.toLowerCase()) || post.price.toLowerCase().includes(text.toLowerCase());
  }
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
      <div className="Content">
        <div>
          <h1 className="search_text">Search</h1>
          <div className="input">
              <form className="search-box">
              <input 
                  type="text" 
                  placeholder="Search for routines here" 
                  onChange={(event)=> {setSearchTerm(event.target.value)}}/>
              </form>
          </div>
        </div>
        <h1>{routines.length} Routines</h1>
        <Fragment>
            {routines ? routines.map((post, index) => {
              return (
                <div className="Card" key={index} >
                  <header>
                      <h3 className="card_title">{routines.name}</h3>
                      <h3 className="card_subtitle">Goal:</h3>
                      <p className="card_content">{routines.goal}</p>
                  </header>
                    <div className="card_details" value={post._id}>
                    <span className="title">{routines.creatorName }</span>
                    </div>
                </div>
              )
            }): null}  
          </Fragment>
      </div>
  ) : null;
}

export default Routines;