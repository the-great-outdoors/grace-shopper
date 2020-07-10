// import React, {Component, useState, useEffect} from "react";

// import { Menu, Segment, Input, Icon, Button, Container, Item } from 'semantic-ui-react'


// const NavBar = (props)=>{
//     const [state, setState] = useState({activeItem:'home'});
//     const [login, setLogin] = useState(false)


//    const handleItemClick = (e, { name }) => setState({ activeItem: name })

// console.log('Entered navbar.js component');

//     return(
      
//         <Segment inverted>
//         <Menu inverted pointing secondary>
//           <Menu.Item
//             name='home'
//             active={state.activeItem==='home'}
//             onClick={handleItemClick}

//           />
//           <Menu.Item
//             name='messages'
//             active={state.activeItem==='messages'}
//             onClick={handleItemClick}

//           />
//           <Menu.Item
//             name='friends'
//             active={state.activeItem==='friends'}
//             onClick={handleItemClick}

//           />

//         </Menu>
//         <Container style={{ flexDirection:'row-reverse', alignItems:'flex-end'}}>
//           <Input icon placeholder='Search...' style={{marginRight:'50px'}}>
//           <input/>
//           </Input>
//           {!login?
//           <Button animated>
//             <Button.Content hidden>Login</Button.Content>
//             <Button.Content visible><Icon name='user circle'/></Button.Content>
//           </Button>:
//           <Button icon>
//             log Out
//           </Button>
//           } 
          
//           <Button animated='vertical'>
//           <Button.Content hidden>Profile</Button.Content>
//           <Button.Content visible><Icon name='hand spock outline'/></Button.Content>
//           </Button>
//           <Button animated='vertical'>
//             <Button.Content hidden>Wishlist</Button.Content>
//             <Button.Content visible><Icon name='gift'/></Button.Content>
//           </Button>
//           <Button animated='vertical'>
//       <Button.Content hidden>Shop</Button.Content>
//       <Button.Content visible>
//         <Icon name='shop' />
//       </Button.Content>
//     </Button>
//         </Container>


//       </Segment>
//     )

// }

// export {NavBar}