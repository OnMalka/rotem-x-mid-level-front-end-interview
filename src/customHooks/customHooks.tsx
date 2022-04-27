import { useState, ChangeEvent } from "react";

export const useForm = (initialValues: {[index: string]: string}) => {
     const [values, setValues] = useState(initialValues);

     return {
         values,
         handleChange: (e: ChangeEvent<HTMLInputElement>) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
         },
         clearForm: () => {
            const clearValues: {[index: string]: string} = {};
            for(let key in values)
                clearValues[key] = '';

            setValues(clearValues);
        }
     };
};