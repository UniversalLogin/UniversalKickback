import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import Participant from './Participant'
import { H3 } from '../Typography/Basic'

const EventParticipantsContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-bottom: 40px;
`

const NoParticipants = styled('div')``

class EventParticipants extends Component {
  render() {
    const {
      search,
      party,
      party: { participants },
      amAdmin
    } = this.props

    const searchTerm = search.toLowerCase()

    participants.sort((a, b) => {
      return a.index < b.index ? -1 : 1
    })

    return (
      <Fragment>
        <H3>Participants</H3>
        <EventParticipantsContainer>
          {participants.length > 0 ? (
            participants
              .sort((a, b) => (a.index < b.index ? -1 : 1))
              .filter(participant =>
                participant.user.address.toLowerCase().includes(searchTerm)
              )
              .map(participant => (
                <Participant
                  amAdmin={amAdmin}
                  participant={participant}
                  party={party}
                  key={`${participant.address}${participant.index}`}
                />
              ))
          ) : (
            <NoParticipants>No one is attending.</NoParticipants>
          )}
        </EventParticipantsContainer>
      </Fragment>
    )
  }
}

export default EventParticipants
