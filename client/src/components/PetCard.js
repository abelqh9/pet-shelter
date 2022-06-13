import React, { useState } from 'react'

function PetCard(props) {

    const { pet } = props;

    const [likeIsDisabled, setLikeIsDisabled] = useState(false);
    const [likes, setLikes] = useState(pet.likes);

    function likeHandler(e) {
        fetch(`http://localhost:8000/pets/${pet._id}/incrementLikes`, {
            method: 'PUT'
        }).then(res => {
            setLikeIsDisabled(true);
            setLikes(likes => likes+1)
        })
        .catch(err => console.log(err));
    }

    return (
        <section className='border border-light border-5 d-flex p-3 gap-5'>
            <ul className='list-group'>
                <li className='list-group-item border-0 bg-dark text-warning'><b>Pet type: </b> {pet.type} </li>
                <li className='list-group-item border-0 bg-dark text-warning'><b>Description: </b> {pet.description} </li>
                <li className='list-group-item border-0 bg-dark text-warning'>
                    <b>Skills: </b>
                    <ul className='list-group'>
                        {pet.skills.map(skill => <li key={skill._id} className='list-group-item border-0 bg-dark text-warning'>- {skill.name}</li>)}
                    </ul>
                </li>
            </ul>
            <div>
                <p>{likes} likes(s)</p>
                <button className='btn btn-warning' onClick={likeHandler} disabled={likeIsDisabled}>Like {pet.name}</button>
            </div>
        </section>
    )
}

export default PetCard