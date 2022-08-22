import React, { useState } from 'react'
// import { BsPlusLg } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux/es/exports';
import { ADDNOTE } from '../action/action';
import './style.css'


const Addnote = () => {

    const dispatch = useDispatch()

    const randomColor = '#' +  Math.floor(Math.random() * 16777215).toString(16)
    
    const initialstate = {
        id: "",
        title: "",
        discription: "",
        color: randomColor,
    }

    const [alldata, setAlldata] = useState(initialstate)

    const handelsubmit = (e) => {
        e.preventDefault()
        dispatch(ADDNOTE({...alldata, id: uuidv4(), color: randomColor}))
    }

  return (
    <>
      <div className="container">
        <div className="row">
            <div className="col-12">
                <button className='button' onClick={(e) => handelsubmit(e)}>Add New Note</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Addnote
