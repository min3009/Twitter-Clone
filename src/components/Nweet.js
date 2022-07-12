import { dbService, storageService } from 'fbase';
import React,{useState} from 'react';
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    const desertRef = ref(storageService, nweetObj.attachmentUrl);

    const onDeleteClick = async() => {
        const ok = window.confirm("are you sure you want to delete this nweet?");
        if(ok){
            try{
                await deleteDoc(NweetTextRef);
                if(nweetObj.attachmentUrl !== "") {
                    await deleteObject(desertRef);
                }
            }catch(error){
                window.alert('트윗을 삭제하는데 실패했습니다');
            }
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
            {isOwner && (
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
            )}
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
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