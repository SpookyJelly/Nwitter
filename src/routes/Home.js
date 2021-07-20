import { dbservice } from "fbInstance";
import React, { useEffect, useState } from "react";

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  //onSnapshot의 첫번째 인자인 snapshot은 매개변수임 옵저버 역할을 한다.
  // 데이터 베이스에서 뭔갈 하면 그걸 알려줌
  //useEffect는 업데이트 될 때마다 매번 실행
  // 공식 문서 왈 : class에 익숙하다면 왜 한번이 아니라 모든 랜더링시 실행되는지 궁금
  // class 컴포에서 Didupdate cycle를 깜박해서 메모리 누수가 많이 일어났기에 hook을 만들 때는 앗사리 하나로 합쳐버렸다
  useEffect(() => {
    dbservice
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
};

export default Home;
