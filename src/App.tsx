import './App.css'
import SearchablePersonsList from './components/SearchablePersonsList';
import { getAllPersonsFromDB } from './pseudoDB/pseudoDB';
import { useEffect, useState } from 'react';
import Person from './interfaces/Person';
import { Button } from 'react-bootstrap';
import AddPersonModal from './components/AddPersonModal';

function App() {
    const [employeesData, setEmployeesData] = useState([] as Person[]);
    const [managersData, setManagersData] = useState([] as Person[]);
    const [addPersonModalShow, setAddPersonModalShow] = useState(false);

    useEffect(() => {
        setEmployeesData(getAllPersonsFromDB('employee'));
        setManagersData(getAllPersonsFromDB('manager'));  
    }, []);

    const triggerUpdatePersons = (arrayName: string) => {
        switch(arrayName){
            case 'employee':
                setEmployeesData(getAllPersonsFromDB('employee'));
                break;

            case 'manager':
                setManagersData(getAllPersonsFromDB('manager'));
                break;

            default: return;
        };        
    };

    return (
        <div className="App">
            {   employeesData.length > 0 ?
                <SearchablePersonsList 
                    personsArray={employeesData} 
                    className='employees' 
                    title='Employees' 
                    placeholder='Search employee name'
                    triggerUpdatePersons={()=>setEmployeesData(getAllPersonsFromDB('employee'))}
                /> : 
                'Loading Employees'
            }
            {    managersData.length > 0 ?
                <SearchablePersonsList 
                    personsArray={managersData} 
                    className='management' 
                    title='Management' 
                    placeholder='Search manager name'
                    triggerUpdatePersons={()=>setManagersData(getAllPersonsFromDB('manager'))}
                /> :
                'Loading Managers'
            }
            <AddPersonModal show={addPersonModalShow} onHide={()=>setAddPersonModalShow(false)} triggerUpdatePersons={triggerUpdatePersons} />
            <Button onClick={()=>setAddPersonModalShow(true)} variant='primary' id='add-person-button'>Add Person</Button>
        </div>
    )
}

export default App
