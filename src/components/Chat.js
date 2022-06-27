import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import moment from 'moment';
import {
  IconButton,
  SearchIcon,
  MoreVertIcon,
  AccountCircleIcon,
  TagFacesIcon,
  AttachFileIcon,
  KeyboardVoiceIcon,
  CloseIcon,
} from '../imports';
import { useGlobalContext } from '../StateProvider';
import zIndex from '@mui/material/styles/zIndex';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const { groupId } = useParams();
  const { user, messages, setMessages } = useGlobalContext();
  const messagesCol = collection(db, 'groups', groupId, 'messages');
  const messagesColQuery = query(messagesCol, orderBy('timestamp', 'asc'));
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject.emoji);
  };

  // add brackets
  const createMessage = (e) => {
    e.preventDefault();
    addDoc(messagesCol, {
      message: input,
      name: user.displayName,
      // timestamp: moment().format('LT'),
      timestamp: moment().format('lll'),
    });
    setInput('');
    setShowEmoji(false);
  };

  const ChatCreate = () => {
    return (
      <div className='chat-create'>
        <span
          onClick={() => {
            setShowEmoji(!showEmoji);
          }}
        >
          <IconButton>
            {!showEmoji ? (
              <TagFacesIcon />
            ) : (
              <CloseIcon className='close-emoji' />
            )}
          </IconButton>
        </span>
        <span>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </span>
        <form onSubmit={createMessage}>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
          />
        </form>
        <span>
          <IconButton>
            <KeyboardVoiceIcon />
          </IconButton>
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (groupId) {
      //

      onSnapshot(doc(db, 'groups', groupId), (doc) =>
        setGroupName(doc.data().name)
      );

      onSnapshot(messagesColQuery, (snapshot) => {
        const messagesInDoc = [];
        snapshot.forEach((doc) => {
          messagesInDoc.push(doc.data());
        });
        setMessages(messagesInDoc);
      });
    }
  }, [groupId]);

  return (
    <div className='chat'>
      <div className='chat-nav sidebar-nav'>
        <div className='chat-nav-info'>
          <span className='avatar'>
            <AccountCircleIcon />
          </span>
          <div>
            <p className='chat-name'>{groupName}</p>
          </div>
        </div>
        <div>
          <span>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </span>
          <span>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </span>
        </div>
      </div>
      <div className='chat-messages'>
        {messages?.map((message, index) => {
          // const trial = messages[5].timestampII;
          // console.log(
          //   'DATE MOMENT',
          //   moment().format('l'),
          //   moment().format('LT')
          // );
          // console.log(trial);
          // console.log(moment(trial.nanoseconds).format('l'));
          return (
            <div
              key={index}
              className={`message ${
                message.name === user.displayName
                  ? 'receiver-msg'
                  : 'sender-msg'
              }`}
            >
              <small className='sender-name'> ~ {message.name}</small>
              {message.message}
              <small className='time'>{message.timestamp}</small>
            </div>
          );
        })}
      </div>
    
      <div className={` emoji-container ${!showEmoji && 'hidden'}`}>
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>
      <ChatCreate />
    </div>
  );
};

export default Chat;

// Todo
//  Change Emoji icon on showEmoji
// Change Voice icon on type
