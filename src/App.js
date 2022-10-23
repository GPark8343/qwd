import Auth from './components/Auth'
import Logout from './components/Logout'
import MessagingContainer from './components/MessagingContainer'
import Member from './components/Member'
import { useCookies } from 'react-cookie'
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  ChannelList,
} from 'stream-chat-react'
import { customStyles } from "./styles/customStyles"
import 'stream-chat-react/dist/css/index.css';
import { CustomPreview } from './components/CustomPreview'
import './App.css'


// const App= ()=> {
//   const [cookies, setCookie, removeCookie] = useCookies(['user'])
//   const [channel, setChannel] = useState(null)
//   const [users, setUsers] = useState(null)

//   const client = StreamChat.getInstance('tjrf7ngdzv5g')
//   const authToken = cookies.AuthToken

//   useEffect( ()=>{

//     const loadData = async () => {

//         const { users} = await client.queryUsers({ role: 'user'})
//         setUsers(users)
//         await client.connectUser(
//           {
//               id: cookies.UserId
//           },
//           authToken
//       )
//       const channel = await client.channel('messaging', 'react-talk', {
//           name: 'popo',
//       })
//       setChannel(channel)

// }
// if (authToken) {loadData()}
// if(users) return () => client.disconnectUser()
// }, [])




const App = () => {
 
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [channel, setChannel] = useState(null)
  const [chatClient, setChatClient] = useState(null)
  const [users, setUsers] = useState(null)

  const client = StreamChat.getInstance('tjrf7ngdzv5g')
  let authToken = cookies.AuthToken
  const ID = cookies.UserId

  useEffect(() => {
    const userSet = async () => {
      if (authToken) {


      //   const { users } = await client.queryUsers({ 
      //     role: 'member'
      //  })
      //   setUsers(users)
      //   console.log(users); // 친구들 리스트 보여줄 거임 나중에 사용
      }
    }
    userSet()

  }, [])

  useEffect(() => {
    const setupClient = async () => {
      try {

        await client.connectUser(
          {
            id: cookies.UserId,
            name: cookies.Username,
            email: cookies.Email,

          },
          authToken
        )
        setChatClient(client)
   
      } catch (err) {
        console.log(err)
      }
    }

    if (authToken) setupClient()
  }, [])



  useEffect(() => {
    const setupClient = async () => {
      try {
        const channel = await client.channel('messaging', 'apple', {
          name: 'popo',

        })

        await channel.watch()

        channel.addMembers([ID])

       
        
        setChannel(channel)
        
        const Users  = await channel.queryMembers({})
        setUsers(Users.members)

      

      } catch (err) {
        console.log(err)
      }
    }

    if (authToken) setupClient()
  }, [channel])




  const filters = { type: 'messaging', members: { $in: [ID] } }
  const sort = { last_message_at: -1 }


  return (
    <>
      {!authToken && <Auth />}
      <div className='str-chat'>{authToken && <Chat client={client} customStyles={customStyles}>
        <ChannelList showChannelSearch filters={filters}
          sort={sort} Preview={CustomPreview} />
        <Channel >
          <div className='window'><Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
            <Member ID={ID} />
            <Logout />
            <Thread />
          </Window></div>
          <MessagingContainer key={ID} users={users} />
        </Channel>
      </Chat>}</div>
    </>
  )
}
export default App
