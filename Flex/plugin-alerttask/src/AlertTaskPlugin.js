import { FlexPlugin } from 'flex-plugin';

export default class AlertTask extends FlexPlugin {
  name = 'AlertTaskPlugin';

  init(flex, manager) {
    const audio = new Audio('https://api.twilio.com/cowbell.mp3#asdfsd');

    manager.workerClient.on('reservationCreated', reservation => {
      const isVoiceQueue = reservation.task.taskChannelUniqueName === 'voice';
      const isInboundTask = reservation.task.attributes.direction === 'inbound';
      if (isVoiceQueue && isInboundTask) {
        playAudio(reservation);
      }
    });

    const playAudio = reservation => {
      audio.play();

      ['accepted', 'canceled', 'rejected', 'rescinded', 'timeout'].forEach(e => {
        reservation.on(e, reservation => audio.pause());
      });
    };
  }
}
