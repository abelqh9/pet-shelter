import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm'
import Header from '../components/Header';
import { socketContext } from '../contexs/SocketContext';

function Create() {

    const navigate = useNavigate();

    const { socket } = useContext(socketContext);

    const [error, setError] = useState('');

    function petformHandler(e) {
        e.preventDefault();
        
        const { name, type, description, skill_1, skill_2, skill_3 } = e.target;

        fetch('http://localhost:8000/pets/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                type: type.value,
                description: description.value,
                skills: [
                    { name: skill_1.value }, 
                    { name: skill_2.value }, 
                    { name: skill_3.value }
                ]
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                socket.emit("addPet", data);
                navigate("/pets");
            })
            .catch(err => setError(err.statusText));
    }

    return (
        <>
            <Header linkTo={'/pets'} linkText={'back to home'} />
            <main className='align-self-center'>
                <p className='fs-5 fw-bold'>Know a pet needing a home?</p>
                {error && <p className='text-danger fs-6'>{error}</p>}
                <PetForm nameInitValue={""} typeInitValue={""}
                    descriptionInitValue={""} skill_1InitValue={""}
                    skill_2InitValue={""} skill_3InitValue={""}
                    submitHandler={petformHandler} isForEdit={false}/>
            </main>
        </>
    )
}

export default Create