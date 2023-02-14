import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
function Preloader(props){

var isOpen = props.isOpen === true ? props.isOpen :false;
return (  <Dimmer active={isOpen} inverted page>
    <Loader>Loading</Loader>
  </Dimmer>);


}

export default Preloader;