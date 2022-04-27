import { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal, OverlayTrigger, ToggleButton, Tooltip } from "react-bootstrap";
import { useForm } from "../customHooks/customHooks";
import { addNewPersonToDB } from "../pseudoDB/pseudoDB";
import ButtonWithPopoverVerification from "./ButtonWithPopoverVerification";
import EditPersonDetailsList from "./EditPersonDetailsList";
import validator from 'validator'
import allowedGendersInLowerCase from "../data/allowedGendersInLowerCase";
import Person from "../interfaces/Person";

const formInitialValues = {
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    ip_address: ''
};

type Props = {
    show: boolean, 
    onHide: ()=>void,
    triggerUpdatePersons: (arrayName: string)=>void
};

const AddPersonModal = ({show, onHide, triggerUpdatePersons}: Props) => {
    const {values, handleChange, clearForm} = useForm(formInitialValues);
    const [personType, setPersonType] = useState('employee');
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const validatePersonValues = () => {
        const currentErrorMessages = [];

        for(let key in values){
            if(!values[key].trim()){
                currentErrorMessages.push('All fields are mandatory!');
                break;
            };
        };

        if(!validator.isEmail(values.email.trim()))
            currentErrorMessages.push('Invalid Email!');
            
        if(!allowedGendersInLowerCase.includes(values.gender.trim().toLowerCase()))
            currentErrorMessages.push('Invalid gender, must be Male, Female, Genderfluid, Agender, Genderqueer, Bigender, Polygender or Non-binary!');

        if(!validator.isIP(values.ip_address.trim()))
            currentErrorMessages.push('Invalid IP address!');
            
        setErrorMessages(currentErrorMessages);
    };
    
    useEffect(() => {
        validatePersonValues();
    }, [values]);
    

    const addNewPerson = () => {
        const newPerson: Person = {
            id: -1,
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            email: values.email.trim(),
            gender: values.gender.trim()[0].toUpperCase()+values.gender.trim().toLowerCase().slice(1),
            ip_address: values.ip_address.trim()
        };        

        addNewPersonToDB(
            personType,
            newPerson
        );
        
        triggerUpdatePersons(personType);
        clearForm();
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <ButtonGroup>                    
                    <ToggleButton
                        key='employee'
                        id='employee'
                        type="radio"
                        variant={personType === 'employee' ? 'primary' : 'secondary'}
                        name="radio"
                        value='employee'
                        checked={personType === 'employee'}
                        onChange={(e) => setPersonType(e.currentTarget.value)}
                    >
                        Add Employee
                    </ToggleButton>  
                    <ToggleButton
                        key='manager'
                        id='manager'
                        type="radio"
                        variant={personType === 'manager' ? 'primary' : 'secondary'}
                        name="radio"
                        value='manager'
                        checked={personType === 'manager'}
                        onChange={(e) => setPersonType(e.currentTarget.value)}
                    >
                        Add Manager
                    </ToggleButton>                  
                </ButtonGroup>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditPersonDetailsList values={values} handleChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                {
                    errorMessages.length === 0
                    ? <ButtonWithPopoverVerification mainVariant="success" mainText="Add Person" yesVariant="success" noVariant="danger" PerformAction={addNewPerson}/>
                    : <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip id="button-tooltip">
                                {errorMessages.map(error=><p key={error}>{error}</p>)}
                            </Tooltip>
                        }
                    >
                        <Button variant="success">Add Person</Button>
                    </OverlayTrigger>
                }
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPersonModal;