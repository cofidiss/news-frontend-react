import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { Form } from "semantic-ui-react";
import Select from 'react-select';
function AddNews(props) {
  console.log("addnews rendered")
  debugger;
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
  const [selectedFileNameState, setSelectedFileNameState] = useState({
    imageFiles: [],
    attachmentsFiles: [],
    videosFiles: [],
  });
  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  const [categoryLovState, setCategoryLovState] = useState([]);
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
    debugger;
    var currentElement = e.target;
 if (currentElement instanceof HTMLElement){


 
    if (currentElement.id === "header") {
      setFormState((prevState) => {
        return { ...prevState, header: currentElement.value };
      });
    }
    if (currentElement.id === "body") {
      setFormState((prevState) => {
        return { ...prevState, body: currentElement.value };
      });
    }}
    else {

    
    setFormState((prevState) => {
      return { ...prevState, categoryId: e.value };
    });}
  };
const getCategoryLov = ()=> {
  setIsPreloaderOpen(true)
  fetch(`${baseUrl}/api/category/GetCategoryLov`, {
    method: "GET", // or 'PUT',
    headers: {
      "Content-Type": "application/json",
    }

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
        var categoryOptionList = [];
        debugger;
        const getCategoryOption = (category ,categoryLevel) =>  {
          var categoryPadding = "";
          for (var level=1; level< categoryLevel;level++ ){
            categoryPadding += "--";
          }
          var option = {value:category.id,label:categoryPadding+ category.name};
          categoryOptionList.push(option);
          if (category.children == null){
return;
          }
         for (var category of category.children){
          debugger;
          getCategoryOption(category,categoryLevel+1);
                    }

        }
        debugger; 

        for (var category of x){
          getCategoryOption(category,1)

        }
        debugger;
        setCategoryLovState(categoryOptionList);
     
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
React.useEffect(getCategoryLov,[])
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
    console.log("file change");
    var element = e.target;
    var fileNamesArr = [];
    var   fileElementId="";
    for (let i = 0; i < element.files.length; i++) {      
      var fileNameElement = (
        <div style={{ display: "flex" }}>
          {" "}
          <p style={{  wordBreak: "break-all" }}>
            {element.files[i].name}{" "}
          </p>{" "}
          <i
            onClick={onRemoveFileClick}
            fileindex={i}
            fileelementid={element.id}
            className="remove icon"
          ></i>{" "}
        </div>
      );
      fileNamesArr.push(fileNameElement);
    }
    
    
    setSelectedFileNameState((prevState) => {
      switch (element.id) {
        case 'images-file':
          return { ...prevState, imageFiles: fileNamesArr };
          break;
        case 'attachments-file':
          return { ...prevState, attachmentsFiles: fileNamesArr };
        case 'videos-file':
          return { ...prevState, videosFiles: fileNamesArr };
          break;
        default:
throw  Error("element with id is not recognized. id: " + element.id);
      }

      
    });
 

  };
  const onRemoveFileClick = (e) => {
    var fileElement = document.querySelector(
      "#addNewsForm " + "#" + e.target.getAttribute("fileElementId")
    );
    var fileIndex = parseInt(e.target.getAttribute("fileIndex"));
    var fileBuffer = new DataTransfer();
    for (let i = 0; i < fileElement.files.length; i++) {
      if (fileIndex !== i) fileBuffer.items.add(fileElement.files[i]);
    }
    fileElement.files = fileBuffer.files;
    fileElement.dispatchEvent(new Event("change", { bubbles: true }));
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
      <Select            

           name="color"
           options={categoryLovState}
           onChange={onFormChange}
           value={formState.categoryId}
      />
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

        <div style={{ display: "flex" }}>
          <div style={{ width: "33%" }}>
            <Form.Button onClick={onUploadButtonsClick} id="imageUploadButton">
              Images
            </Form.Button>
            <input
              type="file"
              className="hidden"
              onChange={onFileElementsChange}
              id="images-file"
              multiple
              style={{ display: "none" }}
            />
            {selectedFileNameState.imageFiles}
          </div>
          <div style={{ width: "33%" }}>
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
              style={{ display: "none" }}
              multiple
            />

            {selectedFileNameState.attachmentsFiles}
          </div>{" "}
          <div style={{ width: "33%" }}>
            <Form.Button onClick={onUploadButtonsClick} id="videoUploadButton">
              Videos
            </Form.Button>
            <input
              type="file"
              className="hidden"
              onChange={onFileElementsChange}
              id="videos-file"
              style={{ display: "none" }}
              multiple
            />

            {selectedFileNameState.videosFiles}
          </div>
        </div>

        <Form.Button onClick={onSaveClick}>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default AddNews;
