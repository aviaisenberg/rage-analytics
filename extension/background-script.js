
console.log("HELLO FROM BACKGROUND SCRIPT");

let numberOfConcurrentStreamers;
let currentStreamer;
let currentSessionId;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse)
{
    // console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    if (msg.type == "initSession")
    {
      initSession(msg);
    }
    else
    if (msg.type == "updateStreamer")
    {
      updateStreamer(msg);
    }
    else
    {
        console.log("SOMETHING FUUUUUNKY");
        console.log(msg);
    }
    sendResponse("Gotcha! " + msg.type);
});

function initSession(msg)
{
  currentSessionId = msg.sessionId;
  numberOfConcurrentStreamers = msg.numberOfConcurrentStreamers;
  console.log("Set session Id");
}

function updateStreamer(msg)
{
  if (currentSessionId == msg.sessionId && numberOfConcurrentStreamers == msg.data.length)
  {
    currentStreamer = msg.data;
    console.log(currentStreamer);
  }
  else
  {
      console.log("OLD DATA");
  }
}
