import React from 'react'
import { Grid, Row, Col, ListGroup, ListGroupItem, Badge, Label } from 'react-bootstrap'
import config from 'config';

const Status = () => (
  <div className="status">
    <Grid>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <ListGroup>
            <ListGroupItem>git sha <GithubLink sha={config.gitSha}><Badge>{ config.gitSha }</Badge></GithubLink></ListGroupItem>
            <ListGroupItem>api url <Label bsStyle={ /blue/.test(config.apiUrl) ? 'primary' : 'success' }>{ config.apiUrl }</Label></ListGroupItem>
            <ListGroupItem>app stage <Badge>{ config.appStage }</Badge></ListGroupItem>
            <ListGroupItem>node env <Badge>{ config.appStage }</Badge></ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Grid>
  </div>
)

const GithubLink = ({sha, children}) => {
  if (/\w{40}/.test(sha)) {
    return <a href={`https://github.com/sportnumerics/explorer/commit/${config.gitSha}`}>{children}</a>
  } else {
    return <span>{children}</span>
  }
}

export default Status;
