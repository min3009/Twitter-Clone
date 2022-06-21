import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import {addDoc, collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(
        collection(dbService, "nweets"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        console.log(nweetArr);
        setNweets(nweetArr);
        });
        }, []);
        
    const onSubmit = async(event) => {

       await dbService.collection('nweets').add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }

    const onChange =(event) => {
        const {target: {value} , } = event;
        setNweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" value={nweet} onChange={onChange} maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                 <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;