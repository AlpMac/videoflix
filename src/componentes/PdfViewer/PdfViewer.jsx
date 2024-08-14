import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfViewer(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfViewer;