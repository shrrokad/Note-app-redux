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


const Notes = () => {

    const dispatch = useDispatch()
    const [notes, setNotes] = useState()
    // console.log(allnotes, '---->allnotes');
    // console.log(notes, '---->notes');
    const [search, setSearch] = useState('')
    // console.log(search);


    const getdata = useSelector((state) => state.NoteReducer.Note)
    // console.log(getdata, '--->getdata');

    const NotesData = getdata
    console.log(NotesData, '----->NotesData');





    const handelchange = async (e, id, colore) => {
        setNotes("")
        // const index = NotesData.findIndex((data) => data.id == id)
        // console.log(index, '--->index');
        setNotes({ ...notes, id: id, color: colore, [e.target.name]: e.target.value })
        dispatch(UPDATEDATA(notes))

        await axios.post(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json`, NotesData)
    }
    const handelchangedescription = async (e, id, colore) => {
        setNotes("")
        setNotes({ ...notes, id: id, color: colore, [e.target.name]: e.target.value })
        dispatch(UPDATEDES(notes))
        await axios.post(`https://note-app-bfc54-default-rtdb.firebaseio.com/notedata.json`, NotesData)
    }

    const handelDelete = (e, id) => {
        e.preventDefault()
        dispatch(DELETEDATA(id))
    }

    const searchdata = () => {
        const allsearchdata = NotesData.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()) || data.discription.toLowerCase().includes(search.toLocaleLowerCase()))
        // console.log(allsearchdata, '--->allsearchdata');
        return allsearchdata;
    }

    const clearsearch = (e) => {
        e.preventDefault()
        setSearch("")
    }


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
                            searchdata().map((data) =>
                            (
                                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={data.id}>
                                    <div className='note-card' style={{ backgroundColor: data.color }}>
                                        <form>
                                            <div>
                                                <input type="text"
                                                    placeholder='Title'
                                                    className='input input-text'
                                                    name='title'
                                                    defaultValue={data?.title}
                                                    onBlur={(e) => handelchange(e, data.id, data.color)} />
                                            </div>
                                            <div>
                                                <textarea type="text"
                                                    placeholder='Tack a note...'
                                                    className='mt-3 input'
                                                    name='discription'
                                                    rows="3"
                                                    defaultValue={data?.discription}
                                                    onBlur={(e) => handelchangedescription(e, data.id, data.color)} />
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
                        <Addnote />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
