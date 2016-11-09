
var webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideoBox',
  remoteVideosEl: 'remoteVideoBox',
  // immediately ask for camera access
  autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  webrtc.joinRoom('room');
});

function trumpClicked() {
  console.log("Trump clicked")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", "api/trump", true);
  xhttp.send();
}

function hillaryClicked() {
  console.log("Hillary clicked")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", "api/not", true);
  xhttp.send();
}
