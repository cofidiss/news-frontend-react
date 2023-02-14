import { Button, Modal as ModalFromSemanticUI} from 'semantic-ui-react'


function Modal(props){

  var modalHeader = props.header;
  var modalContent = props.content;

var isOpen = props.isOpen;
var negativeOnClick = props.negativeOnClick;
var positiveOnClick = props.positiveOnClick;
return (<ModalFromSemanticUI
  dimmer="blurring"
  open={isOpen}
  size={"small"}

>
  <ModalFromSemanticUI.Header>{modalHeader}</ModalFromSemanticUI.Header>
  <ModalFromSemanticUI.Content>
 {modalContent}
  </ModalFromSemanticUI.Content>
  <ModalFromSemanticUI.Actions>
    <Button negative onClick={positiveOnClick}>
      Disagree
    </Button>
    <Button positive onClick={negativeOnClick}>
      Agree
    </Button>
  </ModalFromSemanticUI.Actions>
</ModalFromSemanticUI>);

}

export default Modal;