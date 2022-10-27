import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity,
    handleCancelSelectActivity: () => void,
    handleEditMode: (id: string) => void
}
export default function ActivityDetails({activity, handleCancelSelectActivity, handleEditMode}: Props){
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic content='Edit' color='blue' onClick={() => handleEditMode(activity.id)}/>
                    <Button basic content='Cancel' color='grey' onClick={handleCancelSelectActivity}/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}