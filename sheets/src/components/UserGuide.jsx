import React from "react";

function UserGuide() {
  return (
    <div className="guide">
        <h2 className="guide_title">
            How to Use:
        </h2>
        <ol className="guide_instructions">
            <li className="guide_instruction">Find a coloring sheet <b>image</b> you want to print (if you only have single-page pdfs, you can either screenshot them to use them here or find a PDF combiner tool) </li>
            <li className="guide_instruction">Save the image to your computer, or if you prefer you can copy the image (right click on the image and find the "Copy Image" option)</li>
            <li className="guide_instruction">Click <b>"Add New Images +"</b> button</li>
            <li className="guide_instruction">Based on how you grabbed the image in step 2, upload the image here
              <ul>
                <li>Did you save the image to your computer? Click the <b>"Browse"</b> button to find it in your file system</li>
                <li>Did you copy the image? Click the "paste image here" box, and then paste your image, either by pressing <b>"CTRL+V"</b> or by right clicking and selecting <b>"paste</b>" </li>
              </ul>
            </li>
            <li className="guide_instruction">Repeat steps 1-4 as many times as you like, with as many coloring sheets as you like!</li>
            <li className="guide_instruction">Click <b>"Generate PDF ⟳"</b></li>
            <li className="guide_instruction">Scroll down and save or print your new coloring book!</li>
            <li className="guide_instruction">To reset everything, click <b>"RESET"</b> </li>

        </ol>
    </div>
  );
}

export default UserGuide;
