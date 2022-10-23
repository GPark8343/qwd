import { FaHorseHead, FaSmile } from 'react-icons/fa'
import './UserList.css';
const UserList = ({users}) => {
console.log(users);
    return (<>
    <p>channel member list</p>
        <div className="userlist-container">
            {users?.map(user => (
                <li key={user.user.id}>
                    {user.user.role === 'member' ? <FaHorseHead/> : <FaSmile/>}
                <p>{user.user.name}</p>
            </li>))}
        </div>
        </>
    )
}

export default UserList