
import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {

    return (
        <>

            <AddNote showAlert={props.showAlert} />
            <div className='container'>
                <Notes showAlert={props.showAlert} />
            </div>
        </>
    )
}

export default Home