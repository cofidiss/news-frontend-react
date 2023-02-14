import { Button, Modal } from 'semantic-ui-react'


function Modal(props){

  var modalHeader = props.header;
  var modalContent = props.Content;

var isOpen = props.isOpen;
var negativeOnClick = props.negativeOnClick;
var positiveOnClick = props.positiveOnClick;
<Modal
        dimmer="blurring"
        open={isOpen}
  
      >
        <Modal.Header>{modalHeader}</Modal.Header>
        <Modal.Content>
       {modalContent}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={positiveOnClick}>
            Disagree
          </Button>
          <Button positive onClick={negativeOnClick}>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
}