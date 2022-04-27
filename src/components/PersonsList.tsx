import { ListGroup } from "react-bootstrap";
import Person from '../interfaces/Person';
import PersonsListItem from "./PersonsListItem";

type Props = {
    personsArray: Person[], 
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>, 
    setSelectedPerson: React.Dispatch<any>
};

const PersonsList = ({personsArray, setModalShow, setSelectedPerson}: Props) => {
    

    const onClickOpenPersonDetails = (person: Person) => {
        setModalShow(true);
        setSelectedPerson(person);
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
};

export default PersonsList;