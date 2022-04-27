import emptyPersonObject from "../data/emptyPersonObject";
import Person from "../interfaces/Person";

type Props = {
    person?: Person, 
    values: {[index: string]: string | number}, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const EditPersonDetailsList = ({person = {...emptyPersonObject} , values, handleChange}: Props) => {

    return (
        <div className="person-form">
            {
                Object.keys(person).map((key) => (
                    key !== 'id' &&
                    <div key={person.first_name+person.last_name+key}>
                        <label htmlFor={key}>{key}</label>
                        <input 
                            id={key}
                            name={key}
                            value={values[key]}
                            onChange={handleChange}
                            placeholder={`${person[key as keyof Person]}`}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default EditPersonDetailsList;