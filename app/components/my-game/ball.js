import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  randCol:service('ball-control'),
  socketService: service('game-server'),
  value:'',
  X:null,
  Y:null,
  id: 0,

  didInsertElement() {
    this.get('socketService').socketRef.on('set_ball_position', (position) => {
      this.setProperties(position);
      this.settings();
    });
  },

  settings(){
    this.$('span').css({
      'background': '#' + this.get('randCol').colorCode,
      'transform': 'translate(' + this.X +'px,' + this.Y +'px)',
    })
  },

  actions:{
    kickBall(){
      this.settings();
      // this.set('id', this.get('socketService.userNo'));
      this.get('socketService').addPoint();
    }
  }

});
