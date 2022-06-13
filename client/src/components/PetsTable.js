import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { socketContext } from '../contexs/SocketContext';

function PetTable() {

    const { socket } = useContext(socketContext);
    const [pets, setPets] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/pets')
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(pets => {
                const petsInOrder = pets.sort((a, b)=>{
                    if (a.type > b.type) return 1;
                    if (a.type < b.type) return -1;
                    return 0;
                });
                setPets(petsInOrder);
            })
            .catch(err => console.error(err.statusText || err));

        }, [])
        
    useEffect(() => {
        socket.on('addPetToDom', newPet => {
            setPets(oldPets => [...oldPets, newPet])
        })
        
        socket.on('deletePetFromDom', deletedPetId => {
            setPets(oldPets => oldPets.filter(pet => pet._id !== deletedPetId))
        })
    }, [])
    

    return (
        <>
            <table className='table text-warning text-center' style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets && (
                        pets.length
                            ? pets.map(pet => {
                                    return (
                                    <tr key={pet._id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td><Link to={pet._id}>Details</Link> | <Link to={pet._id+"/edit"}>Edit</Link></td>
                                    </tr>)
                                })
                            : <tr>
                                <td className='text-center fst-italic' colSpan={3}>No pets in the shelter</td>
                            </tr>)}
                </tbody>
            </table>
            {!pets && <div className='d-flex justify-content-center align-items-center flex-grow-1'>
                <div className='spinner-border text-warning mt-5' style={{width: '3rem', height: '3rem'}} role="status">
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>}
        </>
    )
}

export default PetTable