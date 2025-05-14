

WebViewer.WebComponent({
  path: "WebViewer/lib",
  // initialDoc: "WebViewer/samples/full-apis/TestFiles/newsletter.pdf",
  showLocalFilePicker: true,
  fullAPI: true,
  licenseKey: 'Insert commercial license key here after purchase',
}, document.getElementById('viewer'))
  .then(instance => {
    // WebViewer instance is ready
  });