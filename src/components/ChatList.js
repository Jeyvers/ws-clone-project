import React, { useEffect, useState } from 'react';
import { AccountCircleIcon } from '../imports';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useGlobalContext } from '../StateProvider';
import SingleChat from './SingleChat';

const ChatList = () => {
  const { roomsCol } = useGlobalContext();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomsCol, (colSnapShot) => {
      const groups = [];
      colSnapShot.forEach((doc) => {
        groups.push({ id: doc.id, data: doc.data() });
        console.log(groups);
      });
      setGroups(groups);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='chat-list'>
      {groups.map((group) => {
        return <SingleChat {...group} key={group.id} />;
      })}
    </div>
  );
};

export default ChatList;
