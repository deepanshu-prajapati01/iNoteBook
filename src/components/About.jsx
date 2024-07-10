import React, { useEffect, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            This is about {a.state.name} and he is in class {a.state.class}
        </>
    )
}

export default About
