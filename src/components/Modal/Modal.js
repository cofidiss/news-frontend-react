import { Button, Modal } from 'semantic-ui-react'


function Modal(props){

var isModalOpen = props.isModalOpen;
var negativeOnClick = props.negativeOnClick;
var positiceOnClick = props.positiceOnClick;
<Modal
        dimmer="blurring"
        open={isModalOpen}
  
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={}>
            Disagree
          </Button>
          <Button positive >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
}