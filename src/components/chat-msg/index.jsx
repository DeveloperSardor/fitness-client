import React from 'react'
import './style.scss'
import ChatUserImg from '../../assets/images/chat-user.png';

const ChatMessage = ({data, reload}) => {
  return (
    <div className='chat-msg p-3 flex gap-3' onClick={()=>reload(data.conversationId, data.user)}>
      <img src={data.user.img} className='user_ava'/>
      <div className='txts flex flex-column gap-1'>
        <p className='name'> Admin</p>
        <p className='msg_'>{data.user.gmail}</p>
      </div>
    </div>
  )
}

export default ChatMessage
