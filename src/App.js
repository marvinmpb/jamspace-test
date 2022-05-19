import { useEffect, useState } from 'react'
import data from './data.json'
import DropdownMenu from './components/DropdownMenu/DropdownMenu';
import Select from './components/Select/Select';
import './style.scss';

function App() {
  const [userList, setUserList] = useState([])
  const [departmentChoice, setDepartmentChoice] = useState(null)

  useEffect(() => {
    // filter the display of the users according to the coice of the department
    const filterUsers = data.filter(user => user.departments.includes(departmentChoice))
    setUserList(filterUsers)
  }, [departmentChoice])

  return (
    <div className="App">
      <header>
        {!userList.length ?
          <h1>Liste de l'ensemble des utilisateurs:</h1>
          :
          <h2>Il y a {userList.length} {userList.length > 1 ? 'utilisateurs qui peuvent' : 'utilisateur qui peut'} se déplacer dans le département suivant: {departmentChoice} </h2>

        }
      </header>
      <Select userList={userList} departmentChoice={departmentChoice} data={data} />
      <DropdownMenu setDepartmentChoice={setDepartmentChoice} data={data} />
    </div>
  );
}

export default App;
