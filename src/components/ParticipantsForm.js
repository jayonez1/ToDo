import React from 'react';
import uuid from 'uuid/v4'
import { Input, Button } from 'antd';

class ParticipantsForm extends React.PureComponent {
  deleteParticipants = (id) => {
    const { participants, updateParticipants } = this.props;
    const editParticipants = participants.filter(participant => participant.id !== id);
    updateParticipants(editParticipants);
  }
  addParticipants = () => {
    const { participants, updateParticipants } = this.props;
    const editParticipants = (participants) ? [...participants] : [];
    if (this.input.state.value) {
      editParticipants.push({
        id: uuid(),
        name: this.input.state.value
      })
    }
    updateParticipants(editParticipants);
    this.input.state.value = null
  }
  render() {
    const { participants } = this.props;
    return (
      <div className="participants">
        <div className="participants__list">
          <h4>Участники: { (participants && participants.length < 1) ? "Нет" : null } </h4>
          {
            (participants)
            ? participants.map(participant =>
                <div className="list__participantItem" key={participant.id}>
                  <p>{participant.name}</p>
                  <Button type="danger" onClick={() => this.deleteParticipants(participant.id)}>Удалить</Button>
                </div>
              )
            : null
          }
        </div>
        <div className="participants__addNewParticipants">
          <div className="addNewParticipants__input">
            <Input maxLength={20} placeholder="Имя" ref={ref => {this.input = ref}} />
          </div>
          <div className="addNewParticipants__btn">
            <Button onClick={() => this.addParticipants()} > Добавить уч. </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default ParticipantsForm
