async function uploadImage() {
    const file = document.getElementById("fileInput").files[0];
    const status = document.getElementById("status");
    const resultUrl = document.getElementById("resultUrl");

    if (!file) {
        alert("Pilih gambar dulu!");
        return;
    }

    status.innerText = "Uploading...";

    const formData = new FormData();
    formData.append("reqtype", "fileupload");
    formData.append("userhash", "");
    formData.append("fileToUpload", file);

    try {
        const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
});

        const text = await response.text();

        if (text.startsWith("http")) {
            resultUrl.value = text;
            status.innerText = "Berhasil upload!";
        } else {
            status.innerText = "Error: " + text;
        }
    } catch (error) {
        status.innerText = "CORS Error / Gagal Upload";
    }
}