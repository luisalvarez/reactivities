import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    editMode: boolean,
    handleSelectActivity: (id: string) => void,
    handleCancelSelectActivity: () => void,
    handleEditMode: (id: string) => void,
    handleCancelEditMode: () => void,
    creatOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void
}
export default function ActivityDashBoard({activities, selectedActivity, editMode, handleSelectActivity, handleCancelSelectActivity, handleEditMode, handleCancelEditMode, creatOrEdit, deleteActivity} : Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} handleSelectActivity={handleSelectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        handleCancelSelectActivity={handleCancelSelectActivity}
                        handleEditMode={handleEditMode}
                    /> 
                }
                {editMode &&
                    <ActivityForm activity={selectedActivity} handleCancelEditMode={handleCancelEditMode} creatOrEdit={creatOrEdit}/>
                }
            </Grid.Column>
        </Grid>
    );
}