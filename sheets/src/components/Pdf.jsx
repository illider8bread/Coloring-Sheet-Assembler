import React, { useState, useEffect } from "react";
import { PageSizes, PDFDocument } from "pdf-lib"; // Make sure to import PDFLib correctly

function Pdf() {
  const [createdDocument, setCreatedDocument] = useState("");
  const generateDocument = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.Letter);
    page.drawText("created by ColoringBookMaker", { size:10, x: 460, y: 10 });
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    setCreatedDocument(pdfDataUri);
  };
  useEffect(() => {
    generateDocument();
  }, []);
  return (
    <div>
        <button onClick={()=>generateDocument()}> refresh display </button>
      <iframe
        id="pdf-frame"
        style={{ width: "100%", height: "90vh" }}
        src={createdDocument}
        title="PDF Document"
      ></iframe>
    </div>
  );
}

export default Pdf;
