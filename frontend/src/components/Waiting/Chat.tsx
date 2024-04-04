/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { Session, SignalOptions } from 'openvidu-browser';
import { SignalEvent } from 'openvidu-browser';

interface ChatProps {
  session: Session | null;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<string[]>([]); 
  const chatLogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userName = localStorage.getItem("user_name") || "Unknown";

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = () => {
    sendMessage();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (session && message.trim() !== "") {
      const signalOptions: SignalOptions = {
        data: userName + ": " + message.trim(), 
        type: 'chat'
      };
      session.signal(signalOptions)
        .then(() => {
          console.log('Message successfully sent');
          setMessage(""); // 메시지 전송 후 입력값 초기화
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  useEffect(() => {  
    if (session) { 
      const handleReceivedMessage = (event: SignalEvent) => { 
        if (event.type == 'signal:chat') {
          console.log("chat 감지 완료!!")
          setChatLog(prevChatLog => [...prevChatLog, event.data || '']);
          scrollToBottom();
        } 
      }; 
      session.on('signal', handleReceivedMessage);

      return () => {
        session.off('signal', handleReceivedMessage);
      };
    }
  }, [session]);

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  return (
    <div css={chatContainer}>
      <div ref={chatLogRef} css={chatLogContainer}>
        {chatLog.map((chatMessage, index) => (
          <div key={index} css={chatMessageStyle}>
            {chatMessage}
          </div>
        ))}
      </div>
      <div css={inputContainer}>
        <input ref={inputRef} type="text" value={message} onChange={handleMessageChange} onKeyPress={handleKeyPress} />
        <div css={sendBtn} onClick={handleMessageSend}>전송</div>
      </div>
    </div>
  );
};

export default Chat;

const chatContainer = css`
  display: flex;
  flex-direction: column;
  
`;


const chatLogContainer = css`
  height: 250px;
  overflow-y: auto;
  border: 10px solid #FFE08F;
  padding: 10px; 
  border-radius: 10px; 
  background-color: white;
  margin-top: 0.8vw;
`;

const chatMessageStyle = css`
  margin-bottom: 5px;
  font-weight: bold;
`;

const sendBtn = css`
  background-color: #47737B;
  color: white;
  border-radius: 10px;
  width:7%;
  height: 90%;
  display: flex;
  align-items: center;
  font-weight: bold;
  border : solid 2px white;
  justify-content: center;
`;

const inputContainer = css`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #0056b3;
    }
  }
`;

