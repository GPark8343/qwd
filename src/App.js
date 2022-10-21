import Auth from './components/Auth'
import Logout from './components/Logout'
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
import {customStyles} from "./styles/customStyles"

import 'stream-chat-react/dist/css/index.css';

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

    const client = StreamChat.getInstance('tjrf7ngdzv5g')
    let authToken = cookies.AuthToken
    let ID = cookies.UserId


    
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
         
        
            let channel = await client.channel('messaging','samsung',{
                name: 'meetronome',
          
            })
 
          await channel.create()
          channel.addMembers([ID])

            setChannel(channel)

           
          
        } catch (err) {
            console.log(err)
        }
    }

    if (authToken) setupClient()
    
 



  return (
    <>
   {!authToken && <Auth />}
        {authToken && <Chat client={client} customStyles={customStyles}> 
     <ChannelList showChannelSearch/>
        <Channel channel={channel}>

          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          <Logout />
          </Window>
          <Thread />
        </Channel>
      </Chat> }
    </>
  )
}
export default App
