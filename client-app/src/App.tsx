import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then( response => {
      setActivities(response.data);
    });
  },[]);

  return (
    <div className="">
      <Header as="h2" icon="users" content="Reactivities"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <List>
          {activities.map((item: any) => (<List.Item key={item.id}>{item.title}</List.Item>))}
        </List>
    </div>
  );
}

export default App;
