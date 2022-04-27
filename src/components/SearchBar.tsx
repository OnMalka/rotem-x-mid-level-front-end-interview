import { Form } from "react-bootstrap";

const SearchBar = ({ title, placeholder, value, setValue }: {title: string, placeholder: string, value: string, setValue: (value: string)=>void}) => {
    
    return (
        <div>
            <h2>{`${title}: `}</h2>
            <div>
                <Form.Control
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default SearchBar;