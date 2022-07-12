import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService, dbService } from "fbase";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async(event) => {
    event.preventDefault();
    let attachmentUrl = ""

    if(attachment !== "") {
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
    }
        const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
        }

   await dbService.collection('nweets').add(nweetObj);
    setNweet("");
    setAttachment('');
    
    
}

const onChange =(event) => {
    const {target: {value} , } = event;
    setNweet(value);
}

const onFileChange = (e) => {
    const {target: {files},} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: {result},
        } = finishedEvent;
        setAttachment(result)
    }
    reader.readAsDataURL(theFile);
}

const onClearAttachment = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
    <input type="text" placeholder="what's on your mind?" value={nweet} onChange={onChange} maxLength={120} />
    <input type="file" accept="image/*" onChange={onFileChange} />
    <input type="submit" value="Nweet" />
    {attachment &&
    <div>
        <img src={attachment} width="50px" height="50px" alt="" />
        <button onClick={onClearAttachment}>Clear</button>
    </div> }
</form>
  );
};
export default NweetFactory;