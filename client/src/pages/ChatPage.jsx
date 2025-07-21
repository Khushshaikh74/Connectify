import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import ChatLoader from '../components/ChatLoader'
import CallButton from '../components/CallButton'

import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import toast from 'react-hot-toast'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {

  const { id: targetUserId } = useParams()
  // console.log("param id: ", id);

  const { authUser } = useAuthUser()

  const [loading, setLoading] = useState(true)
  const [channel, setChannel] = useState(null)
  const [chatClient, setChatClient] = useState(null)

  //Token chat data
  const { data : chatToken } = useQuery({
    queryKey: ["chatToken"],
    queryFn: getStreamToken,
    enabled: !!authUser //Runs only when authuser is available
  })

  useEffect(() => {
    const initChat = async () => {
      if (!chatToken?.token || !authUser) return;

      try {
        console.log("Initiallizing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, chatToken.token)

        //sorting channel id
        const channelId = [authUser._id, targetUserId].sort().join('-')
        //console.log("channelId: ", channelId);

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]
        })

        await currChannel.watch();
        //state
        setChatClient(client)
        setChannel(currChannel)
        
      } catch (error) {
        console.error("Error initializing the chat: ", error)
        toast.error("Could not connect to chat. Please try again...")

      }finally{
        setLoading(false)
      }
    }

    initChat()
  }, [chatToken, authUser, targetUserId])

  const handleVideoCall = ()=>{
    if(channel){
      const callURL = `${window.location.origin}/call/${channel.id}`
      
      channel.sendMessage({
        text : `I have started a video call. Join me here: ${callURL}`
      });

      toast.success("Video call link send successfully...")
    }
  }

  //Chat loader
  if(loading || !chatClient || !channel) return <ChatLoader/>



  return (
    <> 
      <div className='h-[90vh]'>
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className='w-full relative'>
              <CallButton handleVideoCall={handleVideoCall}/>
              <Window>
                <ChannelHeader/>
                <MessageList/>
                <MessageInput focus/>
              </Window>
            </div>
            <Thread/>
          </Channel>
        </Chat>
      </div>
    </>
  )
}

export default ChatPage