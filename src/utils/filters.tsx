import Person from "../interfaces/Person";

export const filterPersonsByFullName = (filter: string, array: Person[]) => {
    return array.filter(person  => {
        const name = (person.first_name + ' ' + person.last_name).trim();
        return name.toLowerCase().includes(filter.toLowerCase().trim());
    });
};

export const getIndexOfPersonById = (id: number, personsArray: Person[]) => {
    return personsArray.findIndex((person)=>person.id === id);
};