import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "../customHooks/customHooks";
import Person from "../interfaces/Person";
import ButtonWithPopoverVerification from "./ButtonWithPopoverVerification";
import EditPersonDetailsList from "./EditPersonDetailsList";
import PersonDetailsList from "./PersonDetailsList";

type Props = {
    show: boolean, 
    onHide: ()=>void, 
    person: Person, 
    deletePerson: ()=> void,
    updatePerson: (newPersonData: {[index: string]: string})=> void
};

function PersonDetailsModal({show, onHide, person, deletePerson, updatePerson}: Props){
    const [editModeActive, setEditModeActive] = useState(false);
    const {values, handleChange, clearForm} = useForm({
        first_name: person.first_name,
        last_name: person.last_name,
        gender: person.gender,
        email: person.email,
        ip_address: person.ip_address
    });

    const hideModal = () => {
        setEditModeActive(false);
        onHide();
    };

    const onClickDeletePerson = () => {
        deletePerson();
        hideModal();
    };

    const onClickUpdatePerson = () => {        
        updatePerson(values);        
        hideModal();
        clearAndCloseForm();
    };

    const clearAndCloseForm = () => {
        clearForm();
        setEditModeActive(false);
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
                {`${person.first_name} ${person.last_name}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    editModeActive ?
                    <EditPersonDetailsList values={values} handleChange={handleChange} person={person} /> :
                    <PersonDetailsList person={person} />
                }
            </Modal.Body>
            <Modal.Footer>
                {   editModeActive
                    ? <ButtonWithPopoverVerification mainVariant="success" mainText="Update" yesVariant="success" noVariant="danger" PerformAction={onClickUpdatePerson} onClickNo={clearAndCloseForm} />
                    : <Button variant="success" onClick={()=>setEditModeActive(true)} >Edit</Button>
                }
                <ButtonWithPopoverVerification mainVariant="danger" mainText="Delete" yesVariant="danger" noVariant="secondary" PerformAction={onClickDeletePerson} />
                <Button variant="primary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
};

export default PersonDetailsModal;