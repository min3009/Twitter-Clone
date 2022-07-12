import { authService } from 'fbase';
import React, {  useState } from 'react';
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
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange} type="text" placeholder='Display Name' value={newDisplayName} autoFocus className='formInput' />
            <input
             type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
             marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
          </span>
        </div>

        )
}

export default Profile;