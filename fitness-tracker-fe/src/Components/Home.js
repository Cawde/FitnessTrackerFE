// import { Content } from './index';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"
let name = '';
let description = '';
const Home = () => {

  const createActivity = () => {
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
      })
      .catch(console.error);
  };
  
  return (
    <>
    {localStorage.getItem('token') ? 
      <div className="Home_content">
        <h1>This is the home section</h1>
        <div className="Create-Activity">
        <form className="create_activity" onSubmit={createActivity}>
          <label>
            Name:
          <input 
            type="text" 
            name="Activity_Name" 
            onChange={(e) => {name = e.target.value}} 
          />
          </label>
          <label>
            Description
          <input 
            type="text" 
            name="Activity_Description"
            onChange={(e) => {description = e.target.value}}          
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
    </>
  )
}

export default Home;