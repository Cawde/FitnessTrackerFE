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
    <main id="listings">
      <div className="object-listings">
        <div>
          <h1>Search for routines below</h1>
          <div className="input-div">
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
                <Fragment key={index} >
                  <header>
                      <h3>{routines.name}</h3>
                      <h4>{routines.goal}</h4>
                  </header>
                    <section className="details" value={post._id}>
                    <span className="title">{routines.creatorName }</span>
                    </section>
                </Fragment>
              )
            }): null}  
          </Fragment>

      </div>
    </main>
  ) : null;
}

export default Routines;