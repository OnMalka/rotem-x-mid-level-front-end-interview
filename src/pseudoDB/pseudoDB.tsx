import employees from '../data/EMPLOYEES.json';
import managers from '../data/MANAGEMENT.json';
import Person from '../interfaces/Person';
import { getIndexOfPersonById } from '../utils/filters';

const data: {employees: Person[], managers: Person[]} = {
    employees: [...employees],
    managers: [...managers]
};

export const getAllPersonsFromDB = (type: string) => {
    switch(type){
        case 'employee':
            return [...data.employees];

        case 'manager':
            return [...data.managers];

        default:
            return [];
    };
};

export const getPersonFromDB = (type: string, id: number) => {
    switch(type){
        case 'employee':
            return data.employees[id];

        case 'manager':
            return data.managers[id];

        default:
            return;
    };
};

export const addNewPersonToDB = (type: string, person: Person) => {
    switch(type){
        case 'employee':
            person.id = data.employees.length;
            while(getIndexOfPersonById(person.id, data.employees) === -1) person.id++;
            data.employees.push(person);           
            break;

        case 'manager':
            person.id = data.managers.length;
            while(getIndexOfPersonById(person.id, data.managers) === -1) person.id++;
            data.managers.push(person);
            break;

        default:
            return;
    };
};

export const deletePersonFromDB = (type: string, id: number) => {    
    switch(type){
        case 'employee':
            data.employees.splice(getIndexOfPersonById(id, data.employees), 1);
            break;

        case 'manager':
            data.managers.splice(getIndexOfPersonById(id, data.managers), 1);
            break;

        default:
            return;
    };
};

export const updatePersonInDB = (type: string, id: number, person: Person) => {
    const newPerson: Person = {
        id: parseInt(`${person.id}`), 
        first_name: `${person.first_name}`,
        last_name: `${person.last_name}`,
        email: `${person.email}`,
        gender: `${person.gender}`,
        ip_address: `${person.ip_address}`
    };

    switch(type){
        case 'employee':
            return data.employees[getIndexOfPersonById(id, data.employees)] = newPerson;

        case 'manager':
            return data.managers[getIndexOfPersonById(id, data.managers)] = newPerson;

        default:
            return;
    };
};