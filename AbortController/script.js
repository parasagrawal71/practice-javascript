// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
let controller;

// IMPORTANT: Disable cache from Network tab if needed
const url = "https://example.org/get"; // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4;

document.querySelector("#request").addEventListener("click", handleRequest);
document.querySelector("#abort").addEventListener("click", handleAbort);

async function handleRequest() {
  /**
   * An AbortController or its signal can not be reused nor reseted. If you need to "reset"
   * it, you have to create a new AbortController instance and use that instead.
   */
  controller = new AbortController();
  const signal = controller.signal;

  return fetch(url, {
    signal,
  })
    .then((response) => {
      // alert(`Response: ${response.statusText}`);
      console.log("Response: ", response);
    })
    .catch((err) => {
      // alert(`Error: ${err.message}`);
      console.error(`Error: `, err);
    });
}

function handleAbort() {
  const signal = controller.signal;
  if (controller) {
    controller.abort("User clicked the abort button"); // controller.abort("<abort reason>")
    // alert(`Aborted: ${signal.reason}`);
    console.log(`Aborted: ${signal.reason}`);
  }
}
