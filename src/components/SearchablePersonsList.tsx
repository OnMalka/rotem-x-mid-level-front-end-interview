import { useEffect, useState } from "react";
import Person from "../interfaces/Person";
import { addNewPersonToDB, deletePersonFromDB, updatePersonInDB } from "../pseudoDB/pseudoDB";
import { filterPersonsByFullName } from "../utils/filters";
import PersonDetailsModal from "./PersonDetailsModal";
import PersonsList from "./PersonsList";
import SearchBar from "./SearchBar";
import validator from 'validator';
import emptyPersonObject from "../data/emptyPersonObject";
import allowedGendersInLowerCase from "../data/allowedGendersInLowerCase";

type Props = {
    personsArray: Person[]; 
    className: string; 
    title: string; 
    placeholder: string, 
    triggerUpdatePersons: ()=>void,
    triggerUpdateAll: ()=>void
};

const SearchablePersonsList = ({personsArray, className, title, placeholder, triggerUpdatePersons, triggerUpdateAll}: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredPersons, setFilteredPersons] = useState(personsArray);
    const [personDetailsModalShow, setPersonDetailsModalShow] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState({...emptyPersonObject});

    const personType = className === 'employees' ? 'employee' : 'manager';

    useEffect(() => {
        setFilteredPersons(filterPersonsByFullName(inputValue, personsArray));
    }, [personsArray]);

    const changePersonTypeAndUpdate = (newPersonData: {[index: string]: string}) => {
        deletePersonFromDB(personType, selectedPerson.id);
        addNewPersonToDB(personType === "employee" ? 'manager': 'employee', getValidPerson(newPersonData));
        triggerUpdateAll();
    };
    
    const deletePerson = () => {
        deletePersonFromDB(personType, selectedPerson.id);
        triggerUpdatePersons();
    };

    const getValidPerson = (personData: {[index: string]: string}): Person => {
         return {
            id: selectedPerson.id,
            first_name: personData.first_name || selectedPerson.first_name,
            last_name: personData.last_name || selectedPerson.last_name,
            email: validator.isEmail(personData.email) ? personData.email : selectedPerson.email,
            gender: allowedGendersInLowerCase.includes(
                personData.gender.trim().toLowerCase()) 
                    ? (personData.gender.trim()[0].toUpperCase()+personData.gender.trim().toLowerCase().slice(1))
                    : selectedPerson.gender ,
            ip_address: validator.isIP(personData.ip_address) ? personData.ip_address : selectedPerson.ip_address
        };
    };

    const updatePerson = (newPersonData: {[index: string]: string}) => {
        updatePersonInDB(personType, selectedPerson.id, getValidPerson(newPersonData));
        triggerUpdatePersons();
    };

    return (
        <div className={className}>
            <SearchBar
                title={title}
                placeholder={placeholder}
                value={inputValue}
                setValue={(value) => {
                    setInputValue(value); 
                    setFilteredPersons(filterPersonsByFullName(value, personsArray));
                }}
            />
            <PersonsList 
                personsArray={filteredPersons}      
                setModalShow={setPersonDetailsModalShow}          
                setSelectedPerson={setSelectedPerson}
            />            
            <PersonDetailsModal
                show={personDetailsModalShow}
                onHide={() => setPersonDetailsModalShow(false)}
                person={selectedPerson}
                deletePerson={deletePerson}
                updatePerson={updatePerson}
                personType={personType}
                changePersonTypeAndUpdate={changePersonTypeAndUpdate}
            />
        </div>
    );
};

export default SearchablePersonsList;