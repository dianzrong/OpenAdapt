import { isSupported, setup } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";

const PUBLIC_APP_ID = "bd104cc4-812d-4ca3-8848-b613b2c0bb62";
const BUTTON_ID = "loom-record-sdk-button";

export default async function initialize_loom() {
  const { supported, error } = await isSupported();

  if (!supported) {
    console.warn(`Error setting up Loom: ${error}`);
    return;
  }

  const root = document.getElementById("app");

  if (!root) {
    return;
  }

  root.innerHTML = `<button id="${BUTTON_ID}">Record</button>`;

  const button = document.getElementById(BUTTON_ID);

  if (!button) {
    return;
  }

  const { configureButton } = await setup({
    publicAppId: PUBLIC_APP_ID,
  });

  const sdkButton = configureButton({ element: button });

  sdkButton.on("insert-click", async (video) => {
    const { html } = await oembed(video.sharedUrl, { width: 400 });
    const target = document.getElementById("target");

    if (target) {
    target.innerHTML = html;
  }
  });
}
