import './App.css'
import SearchablePersonsList from './components/SearchablePersonsList';
import { getAllPersonsFromDB } from './pseudoDB/pseudoDB';
import { useEffect, useState } from 'react';
import Person from './interfaces/Person';
import AddPerson from './components/AddPerson';

function App() {
    const [employeesData, setEmployeesData] = useState<Person[]>([]);
    const [managersData, setManagersData] = useState<Person[]>([]);

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
            <AddPerson triggerUpdatePersons={triggerUpdatePersons} />
        </div>
    )
}

export default App
