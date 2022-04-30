import React from "react";
import { ListGroup } from "react-bootstrap";
import Person from '../interfaces/Person';
import PersonsListItem from "./PersonsListItem";

type Props = {
    personsArray: Person[], 
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>, 
    setSelectedPerson: React.Dispatch<any>
};

const PersonsList = React.memo(({personsArray, setModalShow, setSelectedPerson}: Props) => {
    

    const onClickOpenPersonDetails = (selectedPerson: Person) => {
        setModalShow(true);
        setSelectedPerson(selectedPerson);
    };

    return (
        <ListGroup>
            {
                personsArray.map(person => <PersonsListItem 
                    key={person.first_name + person.last_name} 
                    person={person}
                    onClickOpenPersonDetails={onClickOpenPersonDetails} 
                />)
            }
        </ListGroup>
    );
});

export default PersonsList;