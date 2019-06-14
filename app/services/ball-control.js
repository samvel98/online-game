import Service from '@ember/service';

export default Service.extend({
  colorCode:'',
  init(){
    this._super(...arguments);
    setInterval(() => {
      this.set('colorCode', Math.floor(Math.random()*0xFFFFFF).toString(16));
    },200)
  }
});
