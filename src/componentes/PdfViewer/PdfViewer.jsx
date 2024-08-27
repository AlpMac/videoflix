import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={props.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`}>
            <Page 
              pageNumber={index + 1} 
              renderTextLayer={false} 
              renderAnnotationLayer={false} 
            />
            {/* Adiciona uma linha horizontal após cada página, exceto a última */}
            {index + 1 < numPages && <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />}
          </div>
        ))}
      </Document>
      <p>
        {numPages ? `Documento de ${numPages} páginas` : ''}
      </p>
    </div>
  );
}

export default PdfViewer;
