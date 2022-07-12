import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useHistory } from 'react-router-dom';

function Profile ({userObj, refreshUser}) {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push('/');
    }
    
    const onChange = (e) => {
        const {
            target : {value}
        } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
        }
        refreshUser();
    }

    return (
        <span>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder='Display Name' value={newDisplayName} />
            <input type="submit" value="update profile" />
        </form>
         <button onClick={onLogoutClick}>Log out</button>
        </span>
        )
}

export default Profile;