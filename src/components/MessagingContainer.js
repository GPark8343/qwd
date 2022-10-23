import {ChannelHeader, MessageInput, MessageList, Thread, Window} from "stream-chat-react"
import {useState} from "react"
import {useCookies} from "react-cookie"
import UserList from './UserList'
import { FaUsers, FaArrowAltCircleLeft} from 'react-icons/fa'

const MessagingContainer = ({users}) => {
    const [userListVisible, setUserListVisible] = useState(false)

   
    return (
        <div className='messaging-container'>
            {!userListVisible && (
                <Window>
                    <FaUsers className="icon" onClick={() => setUserListVisible(true)}/>
                </Window>
            )}
            {userListVisible && (
                <Window>
                    <div className="chat-container">
                    <FaArrowAltCircleLeft   className="icon" onClick={() => setUserListVisible(false)}/>
                    <UserList users={users}/>
                    </div>
                </Window>

            )}
           
        </div>
    )
}

export default MessagingContainer