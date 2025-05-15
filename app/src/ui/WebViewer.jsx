import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function WebViewerComponent() {

  const ref = useRef(null);
  const hasMounted = useRef(false)

  useEffect(() => {
    if(hasMounted.current) return;
    hasMounted.current = true;

    WebViewer({
      path: '/lib/webviewer',
      licenseKey: 'YOUR_LICENSE_KEY',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    }, ref.current)
      .then((instance) => {
        // Use WebViewer APIs here
      })
  }, [])

  return (
    <div ref={ref} style={{ height: '100%', width: '100%', maxHeight: '100vh' }}>
    </div>
  );
}