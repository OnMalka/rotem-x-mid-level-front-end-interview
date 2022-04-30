import { useState } from "react";
import { Button } from "react-bootstrap";
import AddPersonModal from "./AddPersonModal";

type Props = {triggerUpdatePersons: (arrayName: string)=>void};

const AddPerson = ({triggerUpdatePersons}: Props) => {
    const [addPersonModalShow, setAddPersonModalShow] = useState(false);

    return (
        <>
            <AddPersonModal show={addPersonModalShow} onHide={()=>setAddPersonModalShow(false)} triggerUpdatePersons={triggerUpdatePersons} />
            <Button onClick={()=>setAddPersonModalShow(true)} variant='primary' id='add-person-button'>Add Person</Button>
        </>
    );
};

export default AddPerson;