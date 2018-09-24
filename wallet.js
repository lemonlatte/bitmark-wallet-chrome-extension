console.log("[BMK] Import bitmark wallet helper function")

const onMessage = (message) => {
  console.log('receive message', message)
  switch (message.action) {
    case 'withdraw':
      alert('withdraw');
      break;
    case 'deposit':
      alert('deposit');
      break;
    default:
      break;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
