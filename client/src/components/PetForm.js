import React, { useState } from 'react'
import PetFormInput from './PetFormInput';

function PetForm(props) {

    const { nameInitValue, typeInitValue, descriptionInitValue,
        skill_1InitValue, skill_2InitValue, skill_3InitValue,
        submitHandler, isForEdit } = props;

    const [name, setName] = useState(nameInitValue);
    const [type, setType] = useState(typeInitValue);
    const [description, setDescription] = useState(descriptionInitValue);
    const [skill_1, setSkill_1] = useState(skill_1InitValue)
    const [skill_2, setSkill_2] = useState(skill_2InitValue)
    const [skill_3, setSkill_3] = useState(skill_3InitValue)

    const [nameError, setNameError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    function onChangeHandler(e, setFunction, setErrFunction){
        const newValue = e.target.value;
        setFunction(newValue);
        if (newValue.length === 0 || newValue.length >= 3) return setErrFunction("");
        if (newValue.length < 3) return setErrFunction(`Must be at least 3 characters`);
    }

    return (
        <form className="p-4 border border-light border-5 d-flex justify-content-between gap-5" onSubmit={e=>{submitHandler(e)}}>

            <div className='d-flex flex-column gap-3'>
                <PetFormInput labelText={'Pet Name:'} inputType={'text'} inputName={'name'}
                inputPlaceholder={'Name'} inputValue={name} inputHandler={e => onChangeHandler(e, setName, setNameError)}
                isRequired={true} error={nameError}/>

                <PetFormInput labelText={'Pet Type:'} inputType={'text'} inputName={'type'}
                inputPlaceholder={'Type'} inputValue={type} inputHandler={e => onChangeHandler(e, setType, setTypeError)}
                isRequired={true} error={typeError}/>

                <PetFormInput labelText={'Pet Description:'} isATextArea={true} inputName={'description'}
                inputPlaceholder={'Description'} inputValue={description}
                inputHandler={e => onChangeHandler(e, setDescription, setDescriptionError)}
                isRequired={true} error={descriptionError}/>

                <button className={'btn btn-warning'} disabled={(nameError||typeError||descriptionError)} type="submit">
                    {isForEdit ? "Edit" : "Add"} Pet
                </button>
            </div>

            <div className='d-flex flex-column gap-3'>
                <PetFormInput labelText={'Skill 1:'} inputType={'text'} inputName={'skill_1'}
                inputPlaceholder={'Opcional Skill'} inputValue={skill_1} inputHandler={e => setSkill_1(e.target.value)}
                isRequired={false}/>

                <PetFormInput labelText={'Skill 2:'} inputType={'text'} inputName={'skill_2'}
                inputPlaceholder={'Opcional Skill'} inputValue={skill_2} inputHandler={e => setSkill_2(e.target.value)}
                isRequired={false}/>

                <PetFormInput labelText={'Skill 3:'} inputType={'text'} inputName={'skill_3'}
                inputPlaceholder={'Opcional Skill'} inputValue={skill_3} inputHandler={e => setSkill_3(e.target.value)}
                isRequired={false}/>
            </div>
        </form>
    )
}

export default PetForm