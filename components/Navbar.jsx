import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styles from '../components/styles/myCustom.module.css'
//import { setDefaultResultOrder } from 'dns';


export function NavBar(){

  const [show, setShow] = React.useState(false);

  const showHomeDropdown = (e)=>{
    setShow(!show);
  }
  const hideHomeDropdown = e => {
    setShow(false);
  }
  const showNyukaiDropdown = (e)=>{
    setShow(!show);
  }
  const hideNyukaiDropdown = e => {
    setShow(false);
  }

  return (
    <>
    <Navbar className={styles.navbarCustom}  expand="lg" variant="dark" fixed="top">
      <Container >
        <Navbar.Brand href="../">
        <img src="shimizu_logo_20230212_1.ico" alt="" style={{width:"50px" }}/>&nbsp;&nbsp;清水達也後援会
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link  href="../"><span className={styles.navItemCustom}>Home</span></Nav.Link>
            <Nav.Link  href="../profile"><span className={styles.navItemCustom}>清水達也について</span></Nav.Link>
            <Nav.Link  href="../kouenkaikaisoku"><span className={styles.navItemCustom}>後援会会則</span></Nav.Link>
            {/*Responsive Menu*/}
            <NavDropdown  /*title="入会案内"*/  id="collasible-nav-dropdown" 
              title={<span className={styles.navItemCustom}>入会案内</span>}
              show={show}
              onMouseEnter={showNyukaiDropdown} 
              onMouseLeave={hideNyukaiDropdown}
              onClick={()=>showNyukaiDropdown(!show,show)}
              >
              <div className={styles.dropdownCustom}>
              <NavDropdown.Item  className={styles.dropdownItemCustom} href="./register_public">
              <span className={styles.navItemCustom}>一般の方</span>
              </NavDropdown.Item>
              <NavDropdown.Divider className={styles.dropdownDividerCustom} />
              <NavDropdown.Item  className={styles.dropdownItemCustom} href="./register_corporation">
              <span className={styles.navItemCustom}>法人の方</span>
              </NavDropdown.Item>
              </div>
            </NavDropdown>
            <Nav.Link  href="../support_messages"><span className={styles.navItemCustom}>応援メッセージ</span></Nav.Link>
            <Nav.Link  href="../tokuteishotorihiki"><span className={styles.navItemCustom}>特定商取引法に基づく表記</span></Nav.Link>
            <Nav.Link  href="../inquiry"><span className={styles.navItemCustom}>お問い合わせ</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
    )
}