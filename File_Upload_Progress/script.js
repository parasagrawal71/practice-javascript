document.querySelector("#upload").addEventListener("click", uploadFile);

async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Please select a file");

  // TODO: Getting error - net::ERR_H2_OR_QUIC_REQUIRED - when using fetch()
  // const totalSize = file.size;
  // let uploaded = 0;

  // const stream = file.stream();
  // const reader = stream.getReader();

  // const uploadStream = new ReadableStream({
  //   async pull(controller) {
  //     const { done, value } = await reader.read();
  //     if (done) {
  //       controller.close();
  //       return;
  //     }
  //     uploaded += value.length;
  //     const percent = Math.round((uploaded / totalSize) * 100);
  //     document.getElementById("progressBar").value = percent;
  //     document.getElementById("progressText").innerText = percent + "%";
  //     controller.enqueue(value);
  //   },
  // });

  // const response = await fetch("http://localhost:5100/upload", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/octet-stream",
  //     "X-Filename": encodeURIComponent(file.name),
  //   },
  //   body: uploadStream,
  //   duplex: "half", // 🔥 REQUIRED when using a stream as request body
  // });

  // const text = await response.text();
  // alert("Upload complete: " + text);

  // // Working with XHR!!!
  // const xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:5100/upload");
  // xhr.setRequestHeader("X-Filename", encodeURIComponent(file.name));
  // xhr.upload.onprogress = (event) => {
  //   const percent = Math.round((event.loaded / event.total) * 100);
  //   document.getElementById("progressBar").value = percent;
  //   document.getElementById("progressText").innerText = percent + "%";
  // };
  // xhr.onload = () => {
  //   alert("Upload complete: " + xhr.responseText);
  // };
  // xhr.send(file);

  // Working with Axios!!!
  try {
    const response = await axios.post("http://localhost:5100/upload", file, {
      headers: {
        "Content-Type": "application/octet-stream",
        "X-Filename": encodeURIComponent(file.name),
      },
      onUploadProgress: function (event) {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          document.getElementById("progressBar").value = percent;
          document.getElementById("progressText").innerText = percent + "%";
        }
      },
    });

    alert("Upload complete: " + response.data);
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed. Check the console for details.");
  }
}
