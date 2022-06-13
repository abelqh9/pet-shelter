import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PetCard from '../components/PetCard';
import Header from '../components/Header';
import { socketContext } from '../contexs/SocketContext';

function See() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { socket } = useContext(socketContext);
    const [pet, setPet] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/pets/' + id)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(pet => setPet(pet[0]))
            .catch(err => console.log(err));
    }, [id])

    function adoptionHandler(e) {
        fetch('http://localhost:8000/pets/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                socket.emit("adoptPet", id);
                navigate("/pets");
            })
            .catch(err => console.error(err))
    }

    return(
        <>
            <Header linkTo={'/pets'} linkText={'back to home'} />
            {pet
                ? <main className='align-self-center'>
                    <div className='d-flex justify-content-between mb-3'>
                        <p className='fs-5 fw-bold m-0'>Details about: {pet.name}</p>
                        <button className='btn btn-danger' onClick={adoptionHandler}>Adopt {pet.name}</button>
                    </div>
                    <PetCard pet={pet}/>
                </main>
                : <div className = 'd-flex justify-content-center align-items-center flex-grow-1'>
                    <div className = 'spinner-border text-warning' style={{width: '3rem', height: '3rem'}} role="status">
                        <span className = 'visually-hidden'>Loading...</span>
                    </div>
                </div>}
        </>
    )

}

export default See