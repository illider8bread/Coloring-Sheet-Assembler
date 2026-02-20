import React, { useState, useEffect } from "react";
import { PageSizes, PDFDocument } from "pdf-lib";

function Pdf({ photos }) {
  const [createdDocument, setCreatedDocument] = useState("");

  const generateDocument = async () => {
    const pdfDoc = await PDFDocument.create();

    if (photos.length === 0) {
      const page = pdfDoc.addPage(PageSizes.Letter);
      page.drawText("created by ColoringBookMaker", { size: 10, x: 460, y: 10 });
    } else {
      for (let i = 0; i < photos.length; i++) {
        const image = photos[i];
        let embeddedImage;

        if (
          image.startsWith("data:image/jpeg;") ||
          image.startsWith("data:image/jpg;")
        ) {
          embeddedImage = await pdfDoc.embedJpg(image);
        } else if (image.startsWith("data:image/png;")) {
          embeddedImage = await pdfDoc.embedPng(image);
        } else {
          console.error("Unsupported image format, skipping...");
          continue;
        }

        const page = pdfDoc.addPage(PageSizes.Letter);
        const { width, height } = page.getSize();
        const scaleFactor = Math.min(
          (width - 80) / embeddedImage.width,
          (height - 100) / embeddedImage.height
        );
        const scaledWidth = embeddedImage.width * scaleFactor;
        const scaledHeight = embeddedImage.height * scaleFactor;
        const xOffset = (width - scaledWidth) / 2;
        const yOffset = (height - scaledHeight) / 2;

        page.drawImage(embeddedImage, { x: xOffset, y: yOffset, width: scaledWidth, height: scaledHeight });
        page.drawText("created by ColoringBookMaker", { size: 10, x: 460, y: 10 });
      }
    }

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    setCreatedDocument(pdfDataUri);
  };

  useEffect(() => {
    generateDocument(); 
  }, [photos]);

  return (
    <div className="pdf_wrapper">
      <button className="pdf_button-reset" onClick={generateDocument}> refresh display </button>
      {createdDocument && (
        <iframe
          id="pdf-frame"
          style={{ width: "80%", height: "90vh", margin: "10px auto" }}
          src={createdDocument}
          title="PDF Document"
        ></iframe>
      )}
    </div>
  );
}

export default Pdf;
