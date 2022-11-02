import React, {SyntheticEvent, useState} from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[],
    submitting : boolean,
    handleSelectActivity: (id: string) => void,
    deleteActivity: (id: string) => void,
}

export default function ActivityList({activities, submitting, handleSelectActivity, deleteActivity} : Props){
    const [target, setTarget] = useState('');
    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string ) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    };
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' color='blue' onClick={() => handleSelectActivity(activity.id)}>View</Button>
                                <Button name={activity.id} loading={submitting && target === activity.id} floated='right' color='red' onClick={(e) => handleActivityDelete(e, activity.id)}>Delete</Button>
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}