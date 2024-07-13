
import AddNote from './AddNote';
import Notes from './Notes';

const Home = () => {

    return (
        <>

            <AddNote />
            <div className='container'>
                <Notes />
            </div>
        </>
    )
}

export default Home