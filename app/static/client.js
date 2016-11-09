
var room = null

var webrtc = new SimpleWebRTC({
  localVideoEl: 'localVideoBox',
  remoteVideosEl: 'remoteVideosBox',
  // immediately ask for camera access
  autoRequestMedia: true,
  url:"http://localhost"
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
  // you can name it anything
  roomChecker();
  window.setInterval(roomChecker, 6000)
});

function roomChecker() {
  if (!room) return;
  if (webrtc.roomName === room) return;
  // We've requested a new room.
  webrtc.joinRoom(room);
}

function trumpClicked() {
  console.log("Trump clicked")
  var values = new Uint32Array(3)
  window.crypto.getRandomValues(values)
  room = "trump_" + values.join("")
  console.log(room)
}

function hillaryClicked() {
  console.log("Hillary clicked")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
     if (this.responseText == "NO_ROOMS") {
       alert("No trump supporters are currently available.")
     } else {
       room = this.responseText
       roomChecker();
     }
    }
  };
  xhttp.open("GET", "api/not", true);
  xhttp.send();
}
