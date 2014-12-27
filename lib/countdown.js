(function() {
  'use strict';

  var root = this;

  var Countdown = function(time, onTick, onComplete) {
    var secondsLeft, interval;

    if (!time){
      throw new Error('time missing. time can be specified as a datetime string, integer as seconds or date object');
    }

    if (typeof time == 'string'){
      var time = new Date(Date.parse(time));
      if (isNaN(time)) throw new Error('Invalid date time string');
      secondsLeft = (time - new Date)/1000;
    } else if (typeof time == 'number'){
      secondsLeft = time;
    } else {
      secondsLeft = (time - new Date)/1000;
    }

    if (secondsLeft <= 0) {throw new Error('time should be in future'); }

    secondsLeft = Math.round(secondsLeft);

    if (arguments.length < 2){
      return;
    } else if (arguments.length == 2){
      onComplete = onTick;
      onTick = null;
    }

    function tick(){
      if (secondsLeft > 0){
        if (onTick) onTick(secondsLeft);
        secondsLeft -= 1;
      } else {
        if (onComplete) onComplete();
        clearInterval(interval);
      }
    }

    interval = setInterval(tick, 1000);

    // First tick.
    tick();

    return {
      abort: function() {
        clearInterval(interval);
      }

      , getRemainingTime: function() {
        return secondsLeft;
      }
    };
  };

  if (typeof exports !== 'undefined') module.exports = exports = Countdown;
  else root.Countdown = Countdown;

}).call(this);
