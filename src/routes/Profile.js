import { authService, dbservice } from "fbInstance";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myNweets, setMyNweets] = useState([]);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const getMyNweets = useCallback(async () => {
    const nweets = await dbservice
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    const datas = nweets.docs.map((doc) => doc.data());
    const texts = datas.map((i, index) => {
      return { text: i.text, index: index };
    });
    setMyNweets(texts);
  }, [userObj.uid]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  useEffect(() => {
    getMyNweets();
    // Dismount 될 때 다시 myNweets를 비워줌으로서 다시 로드될 때 받아올수 있게 하였다
    return () => {
      setMyNweets([]);
    };
  }, [getMyNweets]);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          autoFocus
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <h3>작성한 트윗들</h3>
      {myNweets ? (
        myNweets.map((Nweet) => {
          return <ol key={Nweet.index}>{Nweet.text}</ol>;
        })
      ) : (
        <p>아직 아무런 트윗도 하지 않았어요</p>
      )}
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
