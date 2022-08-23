import React, { useState, useEffect } from 'react'
// import { BsPlusLg } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux/es/exports';
import { ADDNOTE } from '../action/action';
import './style.css'
import axios from 'axios';


const Addnote = (props) => {
  const dispatch = useDispatch()
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

  const initialstate = {
    id: uuidv4(),
    title: "",
    discription: "",
    color: randomColor,
  }

  const [alldata, setAlldata] = useState(initialstate)
  // console.log({alldata});  
  // const [s]
  // const [notes, setNotes] = useState(props.data())
  // console.log(notes, '--->notes');

  const handelsubmit = async (e) => {
    e.preventDefault()
    setAlldata({ ...alldata, color: randomColor })
    await axios.post(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json`, alldata)
    await props.data()
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
