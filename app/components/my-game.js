import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  socketService: service('game-server'),
  start: false,
  buttonText: "start",
  player1: '',
  player2: '',
  name: '',

  // id: 0,
  didInsertElement() {
  },

  actions:{
    startGame(){
      // this.set('player1', this.socketService.name);
      this.get('socketService').connect();
      this.get('socketService').socketRef.emit('online',this.get('socketService').onlie);
      this.set('buttonText', 'connecting...');
      this.set('start', true)
    },
    playerName(){
      this.send('startGame');
      // this.get('socketService').usersName();
      // this.get('socketService').rooms();
      // this.get('socketService').readyToStart();
    }
  }
});
