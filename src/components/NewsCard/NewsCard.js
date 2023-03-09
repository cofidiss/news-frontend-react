import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import bootstrap from "../../css/bootstrap.module.css";
import icons from "../../css/icons.module.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Card, Icon } from "semantic-ui-react";
import CommentList from "../Comment/CommentList/CommentList";



function NewsCard(props) {
  const baseUrl = props.baseUrl;
  const newsId = props.newsId;
  const [newsState, setNews] = useState({
    header: null,
    text: null,
    attachments: null,
    images: [],
    videos: [],
  });
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

  useEffect(() => { 
    setIsPreloaderOpen(true);
    debugger;
    fetch(`${baseUrl}/api/News/GetNewsAndMetaData?id=${newsId}`, {
      method: "GET", // or 'PUT',
      headers: {},
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
          setNews({
            header: x.header,
            text: x.text,
            attachments: x.attachments,
            images: x.images,
            videos: x.videos,
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
      .finally(() => setIsPreloaderOpen(false));},[])


  return (
    <div>
      <Card style={{ width: "40%" }}>
        <Card.Content header={newsState.header} />
        {newsState.images.length === 0 ? null : (
          <Card.Content
            description={
              <ImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                items={newsState.images.map((x) => {
                  return {
                    original: x.url,
                    thumbnail: x.url,
                  };
                })}
              />
            }
          />
        )}
        <Card.Content description={newsState.text} />
        {newsState.videos.length === 0 ? null : (
          <Card.Content
            description={
              newsState.videos === null || newsState.videos === undefined
                ? null
                : newsState.videos.map((x) => {
                    return (
                      <video style={{ width: "100%" }} controls>
                        <source src={x.url} type="video/mp4" />
                      </video>
                    );
                  })
            }
          />
        )}  <Card.Content description={<CommentList newsId={newsId}  baseUrl={baseUrl}/> } />    
      </Card>

    </div>
  );
}
export default NewsCard;
