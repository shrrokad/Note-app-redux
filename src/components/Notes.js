import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './style.css'
import Addnote from './Addnote';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { MdDelete } from "react-icons/md";
import { DELETEDATA } from '../action/action';
import { UPDATEDATA } from '../action/action';
import { UPDATEDES } from '../action/action';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const Notes = () => {

    const dispatch = useDispatch()
    const [notes, setNotes] = useState()
    console.log(notes, '---->notes');
    const [updatenotes, setUpdatenotes] = useState()
    console.log(updatenotes, '--->updatenotes');
    const [search, setSearch] = useState('')

    // const getdata = useSelector((state) => state.NoteReducer.Note)

    // const NotesData = getdata


    const apidata = async () => {
        const result = await axios.get(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json`)
        const a = Object.keys(result.data).map((element) => { return { ...result.data[element], _id: element } })
        setNotes(a)
    }


    const handelchange = async (e, id, colore, _id) => {
        setUpdatenotes("")
        await axios.patch(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json/${_id}`, updatenotes)
        setUpdatenotes({ ...updatenotes, id: id, color: colore, [e.target.name]: e.target.value })
    }
    const handelchangedescription = async (e, id, colore, _id) => {
        setUpdatenotes("")
        await axios.patch(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json/${_id}`, updatenotes)
        setUpdatenotes({ ...updatenotes, id: id, color: colore, [e.target.name]: e.target.value })
    }

    const handelDelete = (e, id) => {
        e.preventDefault()
        dispatch(DELETEDATA(id))
    }

    // const searchdata = () => {
    //     // if (notes === undefined) {
    //     // } else {
    //     //     const allsearchdata = notes.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()) || data.discription.toLowerCase().includes(search.toLocaleLowerCase()))
    //     //     return allsearchdata;
    //     // }
    // }

    const clearsearch = (e) => {
        e.preventDefault()
        setSearch("")
    }


    // // add button 


    // const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)

    // const initialstate = {
    //     id: "",
    //     title: "",
    //     discription: "",
    //     color: randomColor,
    // }

    // const [alldata, setAlldata] = useState(initialstate)

    // const handelsubmit = async (e) => {
    //     // e.preventDefault()
    //     setAlldata({ ...alldata, id: uuidv4(), color: randomColor })
    //     await axios.post(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json`, alldata)
    // }

    useEffect(() => {
        apidata()
    }, [])


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h2>Notes</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        <Form className="d-flex col-12 searchBar">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 w-100"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type='submit' variant="outline-success" className='button-s ms-auto' onClick={clearsearch}>Clear</button>
                        </Form>
                    </div>
                </div>


                <div className="card-border">
                    <div className="row">
                        {
                            notes === undefined ? "" :
                                notes.map((data, index) =>
                                (
                                    <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                                        <div className='note-card' style={{ backgroundColor: data.color }}>
                                            <form>
                                                <div>
                                                    <input type="text"
                                                        placeholder='Title'
                                                        className='input input-text'
                                                        name='title'
                                                        defaultValue={data?.title}
                                                        onBlur={(e) => handelchange(e, data.id, data.color, data._id)} />
                                                </div>
                                                <div>
                                                    <textarea type="text"
                                                        placeholder='Tack a note...'
                                                        className='mt-3 input'
                                                        name='discription'
                                                        rows="3"
                                                        defaultValue={data?.discription}
                                                        onBlur={(e) => handelchangedescription(e, data.id, data.color, data._id)} />
                                                </div>
                                                <div>
                                                    <button onClick={(e) => handelDelete(e, data.id)} className='delete-btn margin'><MdDelete /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className='position'>
                        {/* <div className="container"> */}
                        {/* <div className="row"> */}
                        {/* <div className="col-12">
                            <button className='button' onClick={(e) => handelsubmit(e)}>Add New Note</button>
                        </div> */}
                        {/* </div> */}
                        {/* </div> */}
                        <Addnote />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
