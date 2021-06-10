import logo from './logo.jpeg';
import './App.css';
import { useEffect, useState } from 'react';

const liff = window.liff

function App() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1656089035-ebN72zWG' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  // useEffect(() => {
  //   initLine();
  // }, []);

  return (
    <div>
      <header>
        <div style={{ textAlign: "center" }}>
          <h1>LINE Login</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

          <button onClick={() => logout()} style={{ width: "50%", height: 30 }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;