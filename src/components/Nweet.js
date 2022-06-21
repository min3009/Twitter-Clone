import { dbService } from 'fbase';
import React,{useState} from 'react';
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);

    const onDeleteClick = async() => {
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if(ok){
            await deleteDoc(NweetTextRef );
        }
    }



    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async(e) => {

        await updateDoc(NweetTextRef, {
            text: newNweet
        })
        setEditing(false);
    }

    const onChange = (e) => {
        setNewNweet(e.target.value);
    }
    
    return(
        <div>
        {editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input value={newNweet}
                placeholder="Edit your nweet"
                onChange={onChange} 
                required 
                />
                <input type="submit" value="update Nweet" />
            </form>
            <button onClick={toggleEditing} />
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete Button</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
                </>
            )}
            </>
            )
        }
        </div>
    )
    
}

export default Nweet;