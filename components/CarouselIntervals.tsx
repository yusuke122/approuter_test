import React from "react"
import styles from '../components/styles/myCustom.module.css'
import Carousel from 'react-bootstrap/Carousel';
import { Col,Row,Button, Container} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

export function CarouselIntervals()
{
    return(
      <Container>
        <div className={styles.carouselClass}
        data-aos="fade-in"
        data-aos-delay="50" 
        data-aos-duration="3000"  
        data-aos-easing="ease-in-out"
        >
        <Row xs={1} md={1} lg={2}>
          <Col xs={{order:1}} md={{order:1}} lg={{order:2}} >
            <Carousel  fade={true} prevLabel="null" nextLabel="null" pause={false} controls={false} indicators={false} touch={true}>
              <Carousel.Item interval={3000} className={styles.carouselBlurClass}>
              <img src="20230306103903.png"
                alt=""
              />
              </Carousel.Item>
              <Carousel.Item interval={3000} className={styles.carouselBlurClass}>
              <img src="20230306105821.png"
                alt=""
              />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col className={styles.NyukaiAnnai} xs={{order:2}} md={{order:2}} lg={{order:1}}>
            <Row xs={2} md={2} lg={1} >
              <Col>
                <div>
                    <span style={{color:"#0000ff"}}>清水達也選手</span>を一緒に応援していただける方を募集しています!
                </div>
              </Col>
              <Col className={styles.NyukaiAnnaiText} >
                <a href="./register_public" style={{textDecoration:"none"}}>
                <Button size="lg" variant="primary" type="submit" className={styles.afterModalButton} style={{paddingLeft:"25px",textDecoration:"none"}}>
                  入会案内
                </Button>
                </a>
              </Col>
          </Row>
          </Col>
      </Row>
      </div>
    </Container>
    )
}

<noscript>
<Carousel.Item interval={3000} className={styles.carouselBlurClass}>
<img src="DSC_1451.png"
  alt=""
/>
</Carousel.Item>
<Carousel.Item interval={3000} className={styles.carouselBlurClass}>
<img src="DSC_6766.jpg"
  alt=""
/>
</Carousel.Item>
</noscript>