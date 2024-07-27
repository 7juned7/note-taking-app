import React, { useEffect, useState } from 'react'

const NoteForm = ({ addNote, editNote, noteToEdit }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content)
        }
    }, [noteToEdit])



    const handleSubmit = (e) => {

        e.preventDefault();
        const timestamp = Date.now();
        if (noteToEdit) {
            editNote({
                ...noteToEdit,
                title,
                content,
                timestamp
            })

        }
        else {
            addNote({
                id: Date.now(),
                title,
                content,
                timestamp

            }
            )
        }


        setContent("");
        setTitle("");

    }
    return (<>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                required
            />
            <textarea type="text"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            ></textarea>

            <button type='submit' >{noteToEdit ? 'Update' : 'Add'} Note</button>
        </form>
    </>


    )
}

export default NoteForm