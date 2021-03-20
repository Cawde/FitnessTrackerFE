import { useState } from 'react'
import {  Dialog, DialogActions, DialogContent } from '@material-ui/core';

const Modal = (modalTitle) => {
  const [ modalDisplay, setModalDisplay ] = useState(false); 
  return (
    <>
      <div 
        className="actionButton" 
        onClick={()=>setModalDisplay(true)}
      >Open Modal
      </div>
      {modalDisplay ? 
      <Dialog
        open={modalDisplay}
        className='actionModal'
        onClose={() => setModalDisplay(false)}
      >
        <DialogContent
          >test this thing
        </DialogContent>
        <DialogActions>
          <div 
            className="actionButton" 
            onClick={()=>{setModalDisplay(false)}}
          >Close Modal
          </div>
        </DialogActions>
       
      </Dialog> : null} 
    </>)
}
export default Modal;



    



