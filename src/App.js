import React, { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [channelList, setChannelList] = useState([]);
  const channelCollectionRef = collection(db, 'ytchannels');
  const [ytChannelName, setYtChannelName] = useState('');
  const [ytSubs, setYtSubs] = useState('');
  const [docId, setDocId] = useState(null);

  const updateChannel = async () => {
    if (!ytChannelName || isNaN(ytSubs)) {
      // Handle invalid input, show an alert or some feedback to the user
      return;
    }

    const channelDoc = doc(db, 'ytchannels', docId);

    try {
      await updateDoc(channelDoc, {
        channelName: ytChannelName,
        subs: ytSubs,
      });

      getChannelList();
      setYtChannelName('');
      setYtSubs('');
      setDocId(null);
    } catch (error) {
      console.error('Error editing data: ', error);
    }
  };

  const editChannel = async (id) => {
    const channelDoc = doc(db, 'ytchannels', id);
    const channel = await getDoc(channelDoc);
    setYtChannelName(channel.data().channelName);
    setYtSubs(channel.data().subs);
    setDocId(channel.id);
  };

  const getChannelList = async () => {
    try {
      const data = await getDocs(channelCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChannelList(filteredData);
    } catch (error) {
      console.error('Error getting channel list: ', error);
    }
  };

  useEffect(() => {
    getChannelList();
  }, []);

  const postData = async () => {
    if (!ytChannelName || isNaN(ytSubs)) {
      // Handle invalid input, show an alert or some feedback to the user
      return;
    }

    try {
      await addDoc(channelCollectionRef, {
        channelName: ytChannelName,
        subs: ytSubs,
      });

      getChannelList();
      setYtChannelName('');
      setYtSubs('');
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const deleteChannel = async (id) => {
    const channelDoc = doc(db, 'ytchannels', id);
    await deleteDoc(channelDoc);
    getChannelList();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the channel name"
        value={ytChannelName}
        onChange={(e) => setYtChannelName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter the subs count"
        value={ytSubs}
        onChange={(e) => setYtSubs(e.target.value)}
      />
      <button onClick={postData}>Submit</button>
      <button onClick={updateChannel}>Update</button>
      {channelList.map((channel) => (
        <div key={channel.id}>
          <h1>{channel.channelName}</h1>
          <p>{channel.subs}</p>
          <button onClick={() => deleteChannel(channel.id)}>Delete</button>
          <button onClick={() => editChannel(channel.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
