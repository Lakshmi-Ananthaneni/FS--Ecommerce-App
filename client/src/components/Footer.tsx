/*import React from 'react'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__left'>
        <h3>FASHION<span className="span">CUBE</span></h3>
        <p></p>
      </div>
    </div>
  )
}
export default Footer*/
/*<div className ="footer">COPYRIGHT © 2020 FASHION<span className="span">CUBE</span></div> */

import React from 'react'
import { Facebook,Instagram, MailOutline,
  Phone,Pinterest,Room,Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  background-color:#f7f8fa ;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Copy = styled.p`
font-size:12px`;
const Center = styled.div`
  flex: 1;
  padding: 20px;

`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px; `;
  
const Right = styled.div`
  flex: 1;
  padding: 20px; `;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <h3>FASHION<span className="span">CUBE</span></h3>
        <Desc>
        Fashion design is the art of applying design, aesthetics, clothing construction and natural beauty to clothing and its accessories. 
        It is influenced by culture and different trends, and has varied over time and place.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
        <Copy>COPYRIGHT © 2022 FASHION<span className="span">CUBE</span></Copy>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to = "/" style={{textDecoration:"none", color:"inherit"}}>Home</Link></ListItem>
          <ListItem><Link to ="/about" style={{textDecoration:"none", color:"inherit"}}>AboutUs</Link></ListItem>
          <ListItem><Link to = "/products"style={{textDecoration:"none", color:"inherit"}}>Shop</Link></ListItem>
          <ListItem><Link to ="/cart" style={{textDecoration:"none", color:"inherit"}}>Cart</Link></ListItem>
          <ListItem><Link to ="/shipping" style={{textDecoration:"none", color:"inherit"}}>Shipping</Link></ListItem>
          <ListItem>FAQ</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Return Policy</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> media@fashioncube.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;