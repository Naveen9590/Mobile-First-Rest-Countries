import React from 'react'
import {Modal} from 'react-bootstrap'
import './Error.css'

const ErrorModal=(props)=>{
    return(
        <div>
            <Modal show={props.show} onHide={props.hide} className='error-modal'>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body style={{textAlign:'center'}}>
                    <div className='alert alert-danger'>
                    {props.error}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ErrorModal