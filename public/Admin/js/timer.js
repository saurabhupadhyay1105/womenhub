

/*
// to check contectivity  
function isOnline() { 

    if (navigator.onLine) { 
        document.getElementById( 
          "demo").innerHTML = "Online"; 
    } else { 
        document.getElementById( 
          "demo").innerHTML = "Offline"; 
    } 
} */
// to check contectivity  
var run = function(){
  if (Offline.state === 'up')
  Offline.check();
  }
  setInterval(run, 5000);
