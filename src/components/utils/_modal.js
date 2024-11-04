import React, {useState, useContext, useEffect, useRef} from 'react';
import { Context }  from '../../context/store';
import makeRequest from "./fetch-request";

export const GenericDeleteModal = (props) => {
  const [ state, dispatch ] =  useContext(Context);
  const [ model, setModel ] =  useState();
  const [ id, setId ] =  useState();
  const [ errorMessage, setErrorMessage ] =  useState(null);
  const [ message, setMessage ] =  useState(null);
  const modalDeleteButtonRef = useRef();

  const cancelDeleteRecord = () => {
      setErrorMessage(null);
      setMessage(null);
      dispatch({type:"DEL", key:"deleterecord"});
  }

  const deleteRecordFunction = () => {
      let url = "/" + model + "/delete/"+id;
      setErrorMessage(null);
      setMessage(null);
      makeRequest({url:url, method:"delete", data:null}).then(([status, result]) => {
           if(errors){
               if(status < 500) { 
                   setErrorMessage(result.message);
               } else {
                   setErrorMessage("Server error - Failed to delete record");
               }
           } else {
               setMessage("Record deleted successfully");
               dispatch({type:"SET", key:"page", payload:state?.page == 0 ? 1:0});
               dispatch({type:"DEL", key:"deleterecord"});

           } 
       });
  }

  useEffect(() => {
      if(state?.deleterecord){
         setModel(state?.deleterecord.model);
         setId(state?.deleterecord.id);

         modalDeleteButtonRef.current.click();
      }        

  }, [state?.deleterecord]);
  

  return (
        <>  
       <button type="button" className="btn d-none" data-toggle="modal" ref={modalDeleteButtonRef} data-target="#generic-delete-modal">.</button>
        <div id="generic-delete-modal" className="modal fade" aria-modal="true">
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title">Are you sure?</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                     
                    <div className="modal-body">
                        <div className="d-flex justify-content-center">
                            <i className="ni ni-fat-remove text-danger fa-5x"></i>
                        </div>						
                      { message == null && (<p>Do you really want to delete {model} record? This process cannot be undone.</p>)}
                      { message && (<p className="text-success">{message}</p>)}
                      { errorMessage && (<p className="text-danger">{errorMessage}</p>)}
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={()=>cancelDeleteRecord()} data-dismiss="modal">Cancel</button>
                        <button type="button" onClick={() => deleteRecordFunction()} className="btn btn-danger">Delete</button>
                    </div> 
                </div> 
            </div>
        </div>
       </>
     ) 
};

const CustomModalPane = (props) => {

    return (
        <div className={"modal fade"} id={props?.target} tabIndex="-1" role="dialog" aria-labelledby="default-modal-pane" aria-hidden="true">
          <div className={`modal-dialog modal-dialog-centered ${props.class_name || "" }`}  role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="default-modal-pane">{props?.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                 {props?.children}
              </div>
            </div>
          </div>
        </div>
    )

};
export default CustomModalPane;

