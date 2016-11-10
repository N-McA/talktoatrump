console.log("test_2")
var room = null
var iAmConnected = false
var iAmHillary = false
var webrtc = null
document.getElementById("localVideoDiv").style.visibility = "hidden";
document.getElementById("messageBar").style.visibility = "hidden";
function startApp() {
  document.getElementById("localVideoDiv").style.visibility = "visible";
  document.getElementById("messageBar").style.visibility = "visible";
  webrtc = new SimpleWebRTC({
    localVideoEl: 'localVideoBox',
    remoteVideosEl: 'remoteVideosBox',
    // immediately ask for camera access
    autoRequestMedia: true,
    //url:"https://talktoatrumpsupporter.com"
    url:window.location.hostname
  });

  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    // you can name it anything
    roomChecker();
    window.setInterval(roomChecker, 6000)
    window.setInterval(retryer, 10000)
  });

  webrtc.on('videoAdded', function (video, peer) {
    // show the ice connection state
       if (peer && peer.pc) {
           peer.pc.on('iceConnectionStateChange', function (event) {
               switch (peer.pc.iceConnectionState) {
               case 'checking':
                   setWarning('Connecting to peer...');
                   break;
               case 'connected':
                   iAmConnected = true
               case 'completed': // on caller side
                   setWarning('Connection established.');
                   break;
               case 'disconnected':
                   setWarning('Disconnected.');
                   iAmConnected = false
                   break;
               case 'failed':
                   iAmConnected = false
                   break;
               case 'closed':
                   setWarning('Connection closed.');
                   iAmConnected = false
                   break;
               }
           });
       }
  });
}
function roomChecker() {
  if (!room) return;
  if (webrtc.roomName === room) return;
  // We've requested a new room.
  webrtc.joinRoom(room);
}

function retryer() {
  if (!iAmConnected & iAmHillary) hillaryClicked()
}

function trumpClicked() {
  if (!webrtc) startApp();
  console.log("Trump clicked")
  setWarning("Looking for someone to talk to...")
  var values = new Uint32Array(3)
  window.crypto.getRandomValues(values)
  room = "trump_" + values.join("")
  console.log(room)
}

function setWarning(txt) {
  document.getElementById("the_warning_bar").innerHTML=txt;
}

function hillaryClicked() {
  if (!webrtc) startApp();
  console.log("Hillary clicked")
  iAmHillary = true
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
     if (this.responseText === "NO_ROOMS" | room === this.responseText) {
       setWarning("Searching for a Trump supporter... This may take some time.")
     } else {
       setWarning("Found a Trump supporter, trying to make a connection...")
       room = this.responseText
       roomChecker();
     }
    }
  };
  xhttp.open("GET", "api/not", true);
  xhttp.send();
}
