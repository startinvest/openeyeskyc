import React from "react"
import { Button, Container, Row, Col, Card } from "react-bootstrap"

const Step1 = ({ onNext }) => {
  return (
    <Container className='mt-5'>
      <Card>
        <Card.Body>
          <Card.Title>To continue, we need to verify your identity</Card.Title>
          <Card.Text>
            Fast and secure. Verification usually takes less than a few minutes and is encrypted.
            <br />
            How we verify you.
            <br />
            To learn how our service provider uses data you provide and device data, see their Privacy Statement.
            <br />
            By selecting "Continue", you agree to the Republic Privacy Policy.
          </Card.Text>
          <Button variant='primary' onClick={onNext}>
            Continue
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Step1
