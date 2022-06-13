// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import PetForm from '../components/PetForm'

function Update() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/pets/' + id)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(pet => setPet(pet[0]))
            .catch(err => console.log(err));
    }, [id])

    function petformHandler(e) {
        e.preventDefault();
        
        const { name, type, description, skill_1, skill_2, skill_3 } = e.target;

        fetch('http://localhost:8000/pets/' + id, {
            method: 'PUT',
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
            .then(data => navigate("/pets"))
            .catch(err => setError(err.statusText));
    }

    return (
        <>
            <Header linkTo={'/pets'} linkText={'back to home'} />
            
            {pet
                ? <main className='align-self-center'>
                    <p className='fs-5 fw-bold m-0'>Updating {pet.name}</p>
                    {error && <p className='text-danger fs-6'>{error}</p>}
                    <PetForm nameInitValue={pet.name} typeInitValue={pet.type}
                    descriptionInitValue={pet.description} skill_1InitValue={pet.skills[0].name}
                    skill_2InitValue={pet.skills[1].name} skill_3InitValue={pet.skills[2].name}
                    submitHandler={petformHandler} isForEdit={true}/>
                </main>
                : <div className = 'd-flex justify-content-center align-items-center flex-grow-1'>
                    <div className = 'spinner-border text-warning' style={{width: '3rem', height: '3rem'}} role="status">
                        <span className = 'visually-hidden'>Loading...</span>
                    </div>
                </div>}
        </>
    )
}

export default Update