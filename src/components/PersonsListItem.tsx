import { Badge, ListGroupItem } from "react-bootstrap";
import Person from "../interfaces/Person";
import memoizedFibonacci from "../utils/memoizedFibonacci";

const PersonsListItem = ({person, onClickOpenPersonDetails}: {person: Person, onClickOpenPersonDetails: (person: Person)=>void}) => {

    return (
        <ListGroupItem onClick={()=>onClickOpenPersonDetails(person)}>
            <span>{person.first_name} {person.last_name}</span>
            <Badge bg="primary">{memoizedFibonacci()}</Badge>
        </ListGroupItem>
    );
};

export default PersonsListItem;