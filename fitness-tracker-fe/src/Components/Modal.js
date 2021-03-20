import { useState } from 'react'
import {  Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

const Modal = (modalTitle) => {
    const [ modalDisplay, setModalDisplay ] = useState(false); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [count, setCount] = useState('');
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
                    className="modalContent"
                >
                        <TextField
                            autoFocus
                            id="Title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(event) => setTitle(event.target.value)} 
                        />
                        <TextField
                            autoFocus
                            id="Description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            id="Count"
                            label="Count"
                            type="text"
                            fullWidth
                            value={count}
                            onChange={(event) => setCount(event.target.value)}  
                        />
                        <button 
                            className="actionButton" 
                            type="submit" 
                            value="Submit"
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
            </Dialog> : null} 
        </>)
}
export default Modal;



    



