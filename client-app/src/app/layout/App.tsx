import React, {useEffect, useState} from 'react';
import './style.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { v4 as uuid} from 'uuid';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then( response => {
      setActivities(response.data);
    });
  },[]);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  }

  const handleCancelSelectActivity = () =>{
    setSelectedActivity(undefined);
  }

  const handleEditMode = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCancelEditMode = () => {
    setEditMode(false);
  }

  const handleSubmit = (activity: Activity) => {
    activity.id ? 
    setActivities([...activities.filter(a => a.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid() }]);
    handleCancelEditMode();
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
    setSelectedActivity(undefined);
    setEditMode(false);
  }

  return (
    <>
      <NavBar openForm={handleEditMode} />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashBoard 
          activities={activities} 
          handleSelectActivity={handleSelectActivity} 
          handleCancelSelectActivity={handleCancelSelectActivity} 
          selectedActivity={selectedActivity}
          handleEditMode={handleEditMode}
          handleCancelEditMode={handleCancelEditMode}
          deleteActivity={handleDeleteActivity}
          editMode={editMode}
          creatOrEdit={handleSubmit}
        />
      </Container>
    </>
  );
}

export default App;
