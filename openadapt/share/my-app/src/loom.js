import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

const PUBLIC_APP_ID = "bd104cc4-812d-4ca3-8848-b613b2c0bb62";
const BUTTON_ID = "loom-record-sdk-button";

export default function Loom() {
  const [videoHTML, setVideoHTML] = useState("");

  useEffect(() => {
    async function setupLoom() {
      const { supported, error } = await isSupported();

      if (!supported) {
        console.warn(`Error setting up Loom: ${error}`);
        return;
      }

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
        setVideoHTML(html);
      });
    }

    setupLoom();
  }, []);

  return (
    <>
      <button id={BUTTON_ID}>Record</button>
      <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
    </>
  );
}