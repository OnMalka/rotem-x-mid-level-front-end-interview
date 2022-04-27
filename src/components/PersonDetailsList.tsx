import Person from "../interfaces/Person";

const PersonDetailsList = ({person}: {person: Person}) => {

    return (
        <div>
            <p>{`ID: ${person.id}`}</p>
            <p>{`Gender: ${person.gender}`}</p>
            <p>{`Email: ${person.email}`}</p>
            <p>{`Ip Address: ${person.ip_address}`}</p>
        </div>
    );
};

export default PersonDetailsList;