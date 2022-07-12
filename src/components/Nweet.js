import { dbService, storageService } from 'fbase';
import React,{useState} from 'react';
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
        {editing ? (
            <>
            {isOwner && (
            <>
            <form onSubmit={onSubmit} className="container nweetEdit">
                <input value={newNweet}
                placeholder="Edit your nweet"
                onChange={onChange} 
                required 
                autoFocus
                className='formInput'
                />
               <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
            </>
            )}
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            {isOwner && (
            <div className="nweet__actions">
               <span onClick={onDeleteClick}>
                   <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                     <FontAwesomeIcon icon={faPencilAlt} />
                </span>
             </div>
            )}
            </>
            )
        }
        </div>
    )
    
}

export default Nweet;