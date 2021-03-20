import { useState } from 'react';

//  <!-- Trigger/Open The Modal -->



const Modal = (inputName, inputDescription, inputCount) => {
    const { modalDisplay, setModalDisplay } = useState(false); 
    const toggleModal = (modalDisplay) => {
        setModalDisplay(!modalDisplay)
    } 

    return(
        <div className={ modalDisplay ? "modal" : "hide"}>
                {/* The modal itsself */}
            <div id="contentModal" >
                <div class="modal-content">
                <form>
                    <label>
                        Create {inputName}
                        <input type="text" name={inputName} />
                    </label>
                    <label>
                        Create {inputDescription}
                        <input type="text" name={inputDescription} />
                    </label>
                    <label>
                        Create {inputCount}
                        <input type="text" name={inputCount} />
                    </label>
                        <div className="radio">
                        <label>
                            <input type="radio" value="count" checked={true} />
                            Count
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="duration" />
                            Duration
                        </label>
                        </div>
                    <input type="submit" value="Submit" />
                    </form>
                    <p>Some text in the Modal..</p>
                    <button className="actionButton" id="modalClose" onClick={toggleModal}>Close Modal</button>
                </div>
            </div>
        </div> 

    )
}

export default Modal;



    



