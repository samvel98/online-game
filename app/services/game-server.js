import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  websockets: service('socket-io'),
  socketRef: null,
  online:0,
  name: '',
  name1: 'Player1',
  name2: 'Player2',
  points: [],
  point1: 0,
  point2: 0,
  users: [],

  connect() {
    const socket = this.websockets.socketFor('ws://192.168.0.115:3000/');

    socket.on('connect', this.openConnection, this);
    socket.on('users_info', this.usersInfo,this);
    socket.on('disconnect', this.disconnect,this);
    socket.on('click_ball', this.clickBall,this);
    socket.on('online_now', this.onlineClinetsCount, this);

    this.set('socketRef', socket);
  },
  openConnection() {
    console.log('connected');
    this.socketRef.emit('set_name',this.name);
    this.socketRef.emit('online');
  },
  onlineClinetsCount(online){
    this.set('online', online);
    console.log(online);
  },
  usersInfo(users) {
    console.log(users);
    if(users[0]){
      this.set('name1',users[0].name);
    }
    if(users[1]){
      this.set('name2',users[1].name);
    }
    if(users.length === 2){
      this.readyToStart();
    }
    this.set('users', users);
  },

  readyToStart(){
    this.socketRef.emit('user_ready', true);
  },

  clickBall(ball,id){

    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].socketId == id){
        this.users[i].point = ball;
      }
      if(this.users[i].point == 10){
        alert("winner: " + this.users[i].name)
        this.endGame();
      }
      this.set('point1', this.users[0].point)
      this.set('point2', this.users[1].point)
    }


    // console.log(this.users);
  },
  endGame(){
    this.socketRef.emit('end_game');
  },
  addPoint(){
    if(this.users.length === 2 && this.users[0].point != 10 && this.users[1].point != 10){
      this.socketRef.emit('add_point');
    }
  },

  disconnect(){
    this.socketRef.emit('online_now',this.online);
    this.socketRef.emit('disconnect');
  },

});
