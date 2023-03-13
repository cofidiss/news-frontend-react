import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { Form } from "semantic-ui-react";
function AddNews(props) {
  const baseUrl = props.baseUrl;
  const [modalState, setModalState] = useState({
    isOpen: false,
    header: null,
    content: null,
    type: null,
    okOnClick: null,
    negativeOnClick: null,
    positiveOnClick: null,
  });

  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  function getBase64AndFileName(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const myPromise = new Promise((resolve, reject) => {
      reader.onloadend = (e) => {
        resolve({
          base64: reader.result.toString().replace(/^data:(.*,)?/, ""),
          name: file.name,
        });
      };
      reader.onerror = (error) => reject(error);
    });

    return myPromise;
  }

  const categoryId = props.categoryId;

  const [formState, setFormState] = useState({
    categoryId: categoryId,
    header: null,
    body: null,
  });
  const onFormChange = (e) => {
    var currentElement = e.currentTarget;
    if (currentElement.id === "header") {
      setFormState((prevState) => {
        return { ...prevState, header: currentElement.value };
      });
    }
    if (currentElement.id === "body") {
      setFormState((prevState) => {
        return { ...prevState, body: currentElement.value };
      });
    }
  };

  const onSaveClick = async (e) => {
    setIsPreloaderOpen(true);

    var images = [];
    var attachments = [];
    var videos = [];
    var addNewsForm = document.querySelector("#addNewsForm");
    var imageFiles = addNewsForm.querySelector("#images-file").files;
    var attachmentsFiles = addNewsForm.querySelector("#attachments-file").files;
    var videosFiles = addNewsForm.querySelector("#videos-file").files;
    var fileProcessPromises = [];
    for (let element of imageFiles) {
      fileProcessPromises.push(
        getBase64AndFileName(element).then((x) =>
          images.push({ byteArray: x.base64, name: x.name })
        )
      );
    }
    for (let element of attachmentsFiles) {
      fileProcessPromises.push(
        getBase64AndFileName(element).then((x) =>
          attachments.push({ byteArray: x.base64, name: x.name })
        )
      );
    }
    for (let element of videosFiles) {
      fileProcessPromises.push(
        getBase64AndFileName(element).then((x) =>
          videos.push({ byteArray: x.base64, name: x.name })
        )
      );
    }

    await Promise.all(fileProcessPromises);
    debugger;
    fetchFunction();
    function fetchFunction() {
      debugger;
      fetch(`${baseUrl}/api/News/AddNews`, {
        method: "POST", // or 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          images: images,
          attachments: attachments,
          videos: videos,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            debugger;
            return Promise.reject("Unknown Error Occured");
          }
          return response.json();
        })
        .then(
          (x) => {
            if (x.hasError) {
              return Promise.reject(x.message);
            }
            setModalState({
              isOpen: true,
              content: x.message,
              type: "success",
              okOnClick: () => setModalState({ isOpen: false }),
            });
          },
          (x) => Promise.reject("Unknown Error Occured")
        )
        .catch((x) => {
          debugger;
          setModalState({
            isOpen: true,
            content: x,
            type: "fail",
            okOnClick: () => setModalState({ isOpen: false }),
          });
        })
        .finally(() => setIsPreloaderOpen(false));
    }
  };

  const onUploadButtonsClick = (e) => {
    var element = e.target;
    if (element.id === "imageUploadButton") {
      document.querySelector("#addNewsForm #images-file").click();
    }
    if (element.id === "attachmentUploadButton") {
      document.querySelector("#addNewsForm #attachments-file").click();
    }
    if (element.id === "videoUploadButton") {
      document.querySelector("#addNewsForm #videos-file").click();
    }
  };

  const onFileElementsChange = (e) => {
    debugger;
    var element = e.target;
    var fileNamesArr = [];
    for (var file of element.files) {
      fileNamesArr.push(file.name);
    }
    if (element.id === "images-file") {
      document.querySelector("#addNewsForm #image-names").innerHTML =
        fileNamesArr.join(", ");
    }
    if (element.id === "attachments-file") {
      document.querySelector("#addNewsForm #attachment-names").innerHTML =
        fileNamesArr.join(", ");
    }
    if (element.id === "videos-file") {
      document.querySelector("#addNewsForm #video-names").innerHTML =
        fileNamesArr.join(", ");
    }
  };

  return (
    <div id="addNewsForm">
      <Modal
        isOpen={modalState.isOpen}
        content={modalState.content}
        header={modalState.header}
        type={modalState.type}
        okOnClick={modalState.okOnClick}
        negativeOnClick={modalState.negativeOnClick}
        positiveOnClick={modalState.positiveOnClick}
      />
      <Preloader isOpen={isPreloaderOpenState} />



      <Form>
        <Form.Field>
          {" "}
          <Form.Input
            fluid
            label="Header"
            placeholder="News Header"
            id="header"
            onChange={onFormChange}
            value={formState.header}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            fluid
            label="Body"
            placeholder="News Body"
            id="body"
            onChange={onFormChange}
            value={formState.body}
          />
        </Form.Field>

        <Form.Group inline>
          <Form.Button onClick={onUploadButtonsClick} id="imageUploadButton">
            Images
          </Form.Button>
          <input
            type="file"
            className="hidden"
            onChange={onFileElementsChange}
            id="images-file"
            multiple
          />
          <p id="image-names"></p>
          <Form.Button
            onClick={onUploadButtonsClick}
            id="attachmentUploadButton"
          >
            Attachments
          </Form.Button>
          <input
            type="file"
            className="hidden"
            onChange={onFileElementsChange}
            id="attachments-file"
            multiple
          />

          <p id="attachment-names"></p>
          <Form.Button onClick={onUploadButtonsClick} id="videoUploadButton">
            Videos
          </Form.Button>
          <input
            type="file"
            className="hidden"
            onChange={onFileElementsChange}
            id="videos-file"
            multiple
          />
          <p id="video-names"></p>
        </Form.Group>

        <Form.Button onClick={onSaveClick}>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default AddNews;
