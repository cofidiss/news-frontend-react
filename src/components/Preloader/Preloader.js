import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
function Preloader(props){

var isActive = props.isActive === true ? props.isActive :false;
return (  <Dimmer active={isActive} inverted page>
    <Loader>Loading</Loader>
  </Dimmer>);


}

export default Preloader;