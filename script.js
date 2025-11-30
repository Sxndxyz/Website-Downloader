const urlInput = document.getElementById("urlInput");
const proxyToggle = document.getElementById("proxyToggle");
const proxyUrl = document.getElementById("proxyUrl");

proxyToggle.addEventListener("change", () => {
    proxyUrl.style.display = proxyToggle.checked ? "block" : "none";
});

async function downloadFile() {
    let url = urlInput.value.trim();
    if (!url) return alert("Bro type a URL first 💀");

    let fetchUrl = url;

    if (proxyToggle.checked) {
        if (!proxyUrl.value.trim()) return alert("Proxy URL missing fam.");
        fetchUrl = proxyUrl.value + encodeURIComponent(url);
    }

    try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error("Fetch error: " + response.status);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const fileName = url.split("/").pop() || "download.bin";

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        a.click();

        URL.revokeObjectURL(blobUrl);

    } catch (err) {
        console.error(err);
        alert("Download failed 😭 Check console.");
    }
}
