import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void
}
export default function NavBar({openForm}: Props){
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header name="reactivities" >
                    <img alt="logo" src={`/assets/logo.png`} style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities">
                    Activities
                </Menu.Item>
                <Menu.Item name="new">
                    <Button content="Create Activity" positive onClick={openForm}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}