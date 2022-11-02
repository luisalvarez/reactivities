import React, {useEffect, useState} from 'react';
import './style.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { v4 as uuid} from 'uuid';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then( response => {
      const activities : Activity[] = response.map<Activity>((activity) =>{
        activity.date = activity.date.split('T')[0];
        return activity;
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        handleCancelEditMode();
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity ]);
        handleCancelEditMode();
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() =>{
      setActivities([...activities.filter(a => a.id !== id)]);
      setSelectedActivity(undefined);
      setEditMode(false);
      setSubmitting(false);
    });
  }

  if(loading) return <LoadingComponent content={'Loading App'}/>

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
