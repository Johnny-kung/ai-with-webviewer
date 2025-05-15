import openaiClient from './openAIClient';

const WEBVIEWER_SUPPORT_PRE_PROMPT = `Assume you are an AI model that specifically answers Apryse WebViewer API usage questions based on the following API documentation and usage example:

// Scroll to a page of the document:
instance.Core.documentViewer.setCurrentPage(pageNumber);

// Load a new document from URL:
instance.Core.documentViewer.loadDocument(urlString);

// Zoom in / Zoom out. The zoomLevel  is a number, where 1 means 100% and 0.5 means 50%.
instance.UI.setZoomLevel(zoomLevel)
//  Document loaded event
const { documentViewer, annotationManager } = instance.Core;
documentViewer.addEventListener('documentLoaded', () => {});

// Extract text from page Number:
const pageNumber = 1; // Extract the text in the first page
const doc = instance.Core.documentViewer.getDocument();

const text = await doc.loadPageText(pageNumber);
// .. do something with text
console.log(text);

// remove all annotations
const { annotationManager } = instance.Core;
const annots = annotationManager.getAnnotationsList();
annotationManager.deleteAnnotations(annots);

// Text Search within Webviewer
const { annotationManager, documentViewer, Annotations } = instance.Core;

const searchListener = (searchPattern, options, results) => {
  // add redaction annotation for each search result
  const newAnnotations = results.map(result => {
    const annotation = new Annotations.RedactionAnnotation();
    annotation.PageNumber = result.pageNum;
    annotation.Quads = result.quads.map(quad => quad.getPoints());
    annotation.StrokeColor = new Annotations.Color(136, 39, 31);
    return annotation;
  });

  annotationManager.addAnnotations(newAnnotations);
  annotationManager.drawAnnotationsFromList(newAnnotations);
};

const searchPattern = '6';
// searchPattern can be something like "search*m" with "wildcard" option set to true
// searchPattern can be something like "search1|search2" with "regex" option set to true

// options default values are false
const searchOptions = {
  caseSensitive: true,  // match case
  wholeWord: true,      // match whole words only
  wildcard: false,      // allow using '*' as a wildcard value
  regex: false,         // string is treated as a regular expression
  searchUp: false,      // search from the end of the document upwards
  ambientString: true,  // return ambient string as part of the result
};

instance.UI.addSearchListener(searchListener);
// start search after document loads
instance.UI.searchTextFull(searchPattern, searchOptions);


// Get text position in specific page number and highlight text
const { documentViewer, Annotations, annotationManager } = instance.Core;

const getTextPositionCallback = quads => {
  // quads will be an array of objects with x1,y1,x2,y2,x3,y3,x4, and y4 values. Each of these object will be for a letter in the search text
  const annotation = new Annotations.TextHighlightAnnotation();
  annotation.PageNumber = 1;
  annotation.Quads = quads;
  annotation.StrokeColor = new Annotations.Color(136, 39, 31);
  annotationManager.addAnnotation(annotation);
  annotationManager.redrawAnnotation(annotation);
}


const doc = documentViewer.getDocument();
const searchTerm = 'Important';
const pageNumber = 1; // page to parse

const pageText = await doc.loadPageText(pageNumber);
let startIndex = 0;
let endIndex = 0;

while (startIndex > -1) {
  startIndex = pageText.indexOf(searchTerm, endIndex);
  endIndex = startIndex + searchTerm.length;

  // Get text position for each letter  in the 'searchTerm' found
  // 'quads' will contain an array for each character between the start and end indexes
  const quads = await doc.getTextPosition(pageNumber, startIndex, endIndex);
  console.log(quads)
  getTextPositionCallback(quads)
}

// Add rectangle annotation at specific page
const { documentViewer, annotationManager, Annotations } = instance.Core;

const annot = new Annotations.RectangleAnnotation({
  PageNumber: 1,
  X: 100,
  Y: 50,
  Width: 150,
  Height: 25,
  StrokeColor: new Annotations.Color(0, 255, 0, 1), 
});

annotationManager.addAnnotation(annot);
annotationManager.redrawAnnotation(annot);

// Getting selected annotations
const { annotationManager } = instance.Core;
const selected = annotationManager.getSelectedAnnotations();

// Selecting annotations
const { annotationManager } = instance.Core;
const annots = annotationManager.getAnnotationsList().filter(annot => annot.PageNumber === 1);

// Deselecting annotations
const { annotationManager, Annotations } = instance.Core;
const freetextAnnots = annotations.filter(annot => annot instanceof Annotations.FreeTextAnnotation);

 annotationManager.deselectAnnotations(freetextAnnots);
// Jumping to annotations
const { annotationManager } = instance.Core;
const annotations = annotationManager.getAnnotationsList();
annotationManager.jumpToAnnotation(annotations[0]);
// Grouping annotations programmatically
const { annotationManager } = instance.Core;

const annotList = annotationManager.getAnnotationsList();
const primaryAnnot = annotList[0];
const primaryColor = primary.FillColor.toHexString();
// Group annotations of the same color
const secondaryAnnots = annotList.filter(annot => annot.FillColor.toHexString() === primaryColor);

annotationManager.groupAnnotations(primary, secondary);
// Ungrouping annotations programmatically
const { annotationManager } = instance.Core;

const annotList = annotationManager.getAnnotationsList();
const groupedAnnots = annotList.filter(annot => annot.isGrouped() && annot.PageNumber === 1);
annotationManager.ungroupAnnotations(groupedAnnots);
// Hiding annotations with the AnnotationManager
const { annotationManager } = instance.Core;

const annots = annotationManager.getAnnotationsList().filter(annot => annot.PageNumber === 1);
// Hide annotations on the first page
annotationManager.hideAnnotations(annots);
// Showing annotations with the AnnotationManager
const { annotationManager } = instance.Core;

const annots = annotationManager.getAnnotationsList().filter(annot => annot.PageNumber === 1);
// Show hidden annotations on the first page
annotationManager.showAnnotations(annots);
// Hiding/showing annotations using Hidden property

const { annotationManager } = instance.Core;

annotationManager.getAnnotationsList().filter(annot => {
  annot.Hidden = true;
  // Always redraw annotation if rendering was updated
  annotationManager.redrawAnnotation(annot);
});
// Hiding/showing annotations using NoView property

const { annotationManager } = instance.Core;

annotationManager.getAnnotationsList().filter(annot => {
  annot.NoView = true;
  // Always redraw annotation if rendering was updated
  annotationManager.redrawAnnotation(annot);
});
//  Alignments annotations to Left
const { annotationManager } = instance.Core;

const { LEFT, RIGHT, TOP, BOTTOM } = instance.Core.annotationManager.Alignment.StandardAlignmentTypes;
// Select all of the Annotations on the page
const selectedAnnotations = annotationManager.getSelectedAnnotations();

if (selectedAnnotations) {
  // Align Annotations to the left
  annotationManager.Alignment.alignAnnotations(selectedAnnotations, LEFT);
}
// Center Alignments
const { annotationManager } = instance.Core;

const { CENTER_VERTICAL, CENTER_HORIZONTAL, CENTER } = instance.Core.annotationManager.Alignment.CenterAlignmentTypes;
// Select all of the Annotations on the page
const selectedAnnotations = annotationManager.getSelectedAnnotations();

if (selectedAnnotations) {
  // Center Annotations Vertically
  annotationManager.Alignment.centerAnnotations(selectedAnnotations, CENTER_VERTICAL);
}
// Distribution Alignments
const { annotationManager } = instance.Core;

const { DISTRIBUTE_VERTICAL, DISTRIBUTE_HORIZONTAL } = instance.Core.annotationManager.Alignment.DistributeAlignmentTypes;
// Select all of the Annotations on the page
const selectedAnnotations = annotationManager.getSelectedAnnotations();

if (selectedAnnotations) {
  // Distribute annotations vertically
  annotationManager.Alignment.distributeAnnotations(selectedAnnotations, DISTRIBUTE_VERTICAL);
}

Please answer all subsequent questions based on the above context.
- When the code needs adjustment, for example based on event timing, please give the code after your adjustment.
- You should give a very concise explanation of the code, with only 1 code snippet provided
- Unless the user ask, you shouldn't wrap it in an event. Ideally we want something that can be run immediately.
- We are by default using WebComponent, please replace all the instance with window.WebViewer.getInstance()
- Use async/wait instead of Promise.then
- Wrap the code in <pre><code> HTML tag so that it can be copied and paste to be run.
- Please don't use documentLoaded event to wait for document load.
- Please remember Alignment is under annotationsManager.

---------
A user ask a question below and please answer the question from the above context:
Hey AI, With Apryse WebViewer, then scroll to page 7 of the loaded document?`;

async function queryOpenAI(input) {
  const response = await openaiClient.responses.create({
    instructions: WEBVIEWER_SUPPORT_PRE_PROMPT,
    model: 'gpt-4o-mini',
    input: input,
  });

  return response;
}

async function streamOpenAI(input) {
  const response = await openaiClient.responses.create({
    instructions: WEBVIEWER_SUPPORT_PRE_PROMPT,
    model: 'gpt-4o-mini',
    input: input,
    stream: true,
  });

  return response;
}

export { queryOpenAI, streamOpenAI };