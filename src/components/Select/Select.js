import './style.scss'

function Select({ userList, departmentChoice, data }) {
  return (
    <div>
      {
        departmentChoice === null ?
          <ul>
            {data.map((user) =>
              <li key={user.id}>
                {user.name}
              </li>
            )}
          </ul>
          :
          <ul>
            {userList.map((user) =>
              <li key={user.id}>
                {user.name}
              </li>
            )}
          </ul>
      }
    </div>
  )
}

export default Select
