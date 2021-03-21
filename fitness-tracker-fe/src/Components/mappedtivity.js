{/* <button 
className="actionButton"
onClick={()=>setModalDisplay(true)}
>Edit Routine
</button>
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
  id="editRoutineCount"
  label="count"
  type="text"
  fullWidth
  value={count}
  onChange={(event) => {setCount(event.target.value)}} 
/>
<TextField
  autoFocus
  id="editRoutineDuration"
  label="duration"
  type="text"
  fullWidth
  value={duration}
  onChange={(event) => {setDuration(event.target.value)}} 
/>
<button 
  className="actionButton" 
  type="submit" 
  value="Submit"
  onClick={updateRoutine} //check this
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
</Dialog> : null} */}