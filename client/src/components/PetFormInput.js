import React from 'react'

function PetFormInput(props) {

    const { labelText, inputType, inputName, inputPlaceholder,
    inputValue,inputHandler, isRequired, isATextArea, error } = props;

    return (
        <div>
            <label className='form-label' htmlFor={inputName}>{labelText} {isRequired && <span className='text-danger'>*</span>}</label>
            {error && <p className='text-danger fs-6'>{error}</p>}
            {!isATextArea
                ? <input className='form-control' type={inputType} name={inputName}
                id={inputName} placeholder={inputPlaceholder} required={isRequired}
                value={inputValue} onChange={inputHandler}/>
                : <textarea className='form-control' name={inputName}
                id={inputName} placeholder={inputPlaceholder} required={isRequired}
                value={inputValue} onChange={inputHandler}></textarea>} 
        </div>
    )
}

export default PetFormInput