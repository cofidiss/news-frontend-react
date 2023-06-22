import { Button, Modal as ModalFromSemanticUI} from 'semantic-ui-react'


function Modal(props){

  var modalHeader = props.header;
  var modalContent = props.content;
var modalActionDiv= null;
  var type = props.type;
  var modalContent = props.content;
var iconClass="";
var isOpen = props.isOpen;
var okOnClick = props.okOnClick;
var negativeOnClick = props.negativeOnClick;
var positiveOnClick = props.positiveOnClick;
var closeOnClick = props.closeOnClick;

switch(type) {
  case "success":
    iconClass= "massive check circle outline icon";
    modalActionDiv= (<div style={{display:"flex",justifyContent:"center"}}>
         <Button  onClick={okOnClick}>
      OK
    </Button>
    </div>);
    break;
  case "fail":
  iconClass= "massive window close outline icon";
  modalActionDiv= (<div style={{display:"flex",justifyContent:"center"}}>
    <Button  onClick={okOnClick}>
 OK
</Button>
</div>);
    break;
    case "question":
      iconClass= "massive question circle outline icon";
      modalActionDiv= (<div>
     <Button negative onClick={negativeOnClick}>
      No
    </Button>
    <Button positive onClick={positiveOnClick}>
      Yes
    </Button>
  </div>);
    break;
    case "popUp":
      iconClass= "";
      modalHeader= <div><button onClick={closeOnClick}>çarpı</button></div>;
    break;
  default:
    iconClass = "";
      }

if (!isOpen) {

  var modalHeader = null;
  var modalContent = null;
var modalActionDiv= null;
  var type = null;
  var modalContent = props.content;
var iconClass=null;;

var okOnClick = null;
var negativeOnClick = null;
var positiveOnClick = null;


}


return (<ModalFromSemanticUI
  dimmer="blurring"
  open={isOpen}
  size={"small"}

>
  <div style={{display:"flex",justifyContent:"center"}}>
    
    <i className={iconClass}></i> 
    
    </div>

  <ModalFromSemanticUI.Header>{modalHeader}</ModalFromSemanticUI.Header>
  <ModalFromSemanticUI.Content>
 {modalContent}
  </ModalFromSemanticUI.Content>
  {modalActionDiv === null ? null :   <ModalFromSemanticUI.Actions>
{modalActionDiv}
  </ModalFromSemanticUI.Actions>}

</ModalFromSemanticUI>);

}

export default Modal;