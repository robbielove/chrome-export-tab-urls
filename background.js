chrome.action.onClicked.addListener(async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const urls = tabs.map(tab => tab.url).join('\n');

    const blob = new Blob([urls], { type: "text/plain" });
    const reader = new FileReader();

    reader.onload = function () {
        const blobURL = reader.result;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `tab-urls-${timestamp}.txt`;

        chrome.downloads.download({
            url: blobURL,
            filename
        });
    };

    reader.readAsDataURL(blob);
});
