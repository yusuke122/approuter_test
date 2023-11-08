import React ,{useState} from "react"
import styles from '../components/styles/myCustom.module.css'
import Carousel from 'react-bootstrap/Carousel';
import { Col,Row,Image} from 'react-bootstrap';


export function CarouselSponsors()
{
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

    return(
      <div className={styles.CarouselSponsorClass}>
        <a /*href="http://hataya-sp.co.jp/"*/>
        <Image className={styles.sponsor_image} src="./logo.png" alt="" style={{width:"240px"}}/>
        </a>
        <noscript>
        <Col className={styles.CarouselSponsorClass} indicators={false} pause={false} controls={false}>
        <Carousel activeIndex={index} onSelect={handleSelect} >
          <Carousel.Item interval={2000}>
              <img className={styles.sponsor_image} src="./hataya.png"/>                  
          </Carousel.Item>
          <Carousel.Item interval={2000}>
              <img className={styles.sponsor_image} src="./mizuno.png"/>                  
          </Carousel.Item>
          <Carousel.Item interval={2000}>
              <img className={styles.sponsor_image} src="./murasaki.png"/>                  
          </Carousel.Item>
          </Carousel>  
          </Col>
        </noscript>
      </div>
    )
}