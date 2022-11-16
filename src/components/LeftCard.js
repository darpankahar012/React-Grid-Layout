import React, { Fragment } from 'react';

import {
    Button, UncontrolledAlert, Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardText
} from 'reactstrap';

const BANNER = 'https://i.imgur.com/CaKdFMq.jpg';

const LeftCard = () => (
    <Fragment>

        <UncontrolledAlert color="danger" className="d-none d-lg-block">
            <strong>Account not activated.</strong>
        </UncontrolledAlert>

        <Card>
            <CardImg top width="100%" src={BANNER} alt="banner" />
            <CardBody>
                <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">Lorem Ipsum</CardTitle>
                <CardSubtitle className="text-secondary mb-3 font-weight-light text-uppercase" style={{ fontSize: '0.8rem' }}>Lorem Ipsum, Lagos</CardSubtitle>
                <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book</CardText>
                <Button color="success" className="font-weight-bold">Lorem Ipsum</Button>
            </CardBody>
        </Card>

    </Fragment>
);

export default LeftCard;