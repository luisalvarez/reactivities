import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined,
    handleCancelEditMode: () => void,
    creatOrEdit: (activity: Activity) => void
}

export function ActivityForm({activity: selectedActivity, handleCancelEditMode, creatOrEdit}: Props){
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    };
    const [activity, setActivity] = useState<Activity>(initialState);
    const handleFormChange = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    const handleSubmit = () => {
        creatOrEdit(activity);
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleFormChange}/>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleFormChange}/>
                <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleFormChange}/>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleFormChange}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleFormChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleFormChange}/>
                <Button positive floated='right' type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={handleCancelEditMode}/>
            </Form>
        </Segment>
    );
}