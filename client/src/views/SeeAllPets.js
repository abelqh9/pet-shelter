import React from 'react';
import Header from '../components/Header';
import PetTable from '../components/PetsTable';

function SeeAllPets() {

    return (
        <>
            <Header linkTo={'new'} linkText={'Add a pet to the shelter'} />
            <main className='px-5'>
                <p className='fs-5 fw-bold'>These pets are looking for a good home:</p>
                <PetTable />
            </main>
        </>
    )
}

export default SeeAllPets