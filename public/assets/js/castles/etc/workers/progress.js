/**
 * Created by ndario on 7/27/15.
 */

self.addEventListener("message", function(event){
  var max;
  var counter;

  max = event.data && event.data.max || 100000;
  for (counter = 0; counter < max; ++counter) {
    if (counter % 1000 === 0) {
      self.postMessage({counter: counter});
    }
  }
  self.postMessage({counter: counter});
});
