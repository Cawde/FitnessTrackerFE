// import React, { Fragment, useState } from 'react';
// import { Redirect } from 'react-router-dom';

const Home = () => {
  // let description = '';
  // let price = 0;
  // let title = '';
  // const [postSuccess, setPostSuccess] = useState(false);
  // const createRoutine = (event) => {
  //     event.preventDefault();
  //     fetch('https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts', {
  //         method: "POST",
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         },
  //         body: JSON.stringify({
  //             post: {
  //                 title: title,
  //                 description: description,
  //                 price: `$${price}`
  //             }
  //         })
  //     })
  //     .then(response => response.json())
  //     .then(result => {
  //         console.log(result);
  //         setPostSuccess(true);
  //         alert('Post made successfully');
  //     }).catch(console.error);
      
  // }
  
  // if (postSuccess) {
  //     return <Redirect to="/listings"/>;
  // }

  // return (
  //     <Fragment>
  //         {localStorage.getItem('token') ? 
  //             <form className="input-box" onSubmit={createPost}>
  //                 <div className="container">
  //                     <h1>Make a post</h1>
  //                     <label><b>Name of Item</b></label>
  //                     <input 
  //                         type="text" 
                          
  //                         placeholder="Enter the name of your item."
  //                         onChange={(event)=> {title = event.target.value}}
  //                         />
  //                     <label><b>Description</b></label>
  //                     <input 
  //                         type="text" 
                          
  //                         placeholder="Enter the description of your item."
  //                         onChange={(event)=> {description = event.target.value}}
  //                         />
  //                         <label><b>Price</b></label>
  //                     <input 
  //                         type="number" 
                          
  //                         placeholder="Enter the price of your item."
  //                         onChange={(event)=> {price = event.target.value}}
  //                         />
  //                         <button
  //                             type="submit" 
  //                             className="registerbtn" 
  //                             >Submit Post
  //                         </button>
  //                 </div>
  //             </form>
  //         : <h1>Log in to make a post</h1>}
  //     </Fragment>
  // )
}

export default Home;