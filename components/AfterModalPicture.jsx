import React from 'react'
import styles from '../components/styles/myCustom.module.css'
import { Button,Carousel,Image} from 'react-bootstrap';
import {useState,useEffect,useRef } from "react";
import {AfterModal} from "../components/AfterModal";

let isShow=true;
let cnt = 0;

const pictureURL="E7B23D3F-D397-4275-8806-FE4DFF4CAB8720230502.png"

export function AfterModalPicture({thisForm})
{
    if(thisForm=="publicMemberDB")
    {
        return(
            <Carousel fade={false} prevLabel="null" nextLabel="null" pause={false} controls={false} indicators={false} touch={true}>
            <Carousel.Item interval={3000} className={styles.carouselBlurClass}>
            <Image src={pictureURL} style={{height:"35vh"}}
            />
            </Carousel.Item>
        </Carousel>
        )
    }
    else if(thisForm=="inquiryDB")
    {
        return(
          <Carousel fade={false} prevLabel="null" nextLabel="null" pause={false} controls={false} indicators={false} touch={true}>
          <Carousel.Item interval={3000} className={styles.carouselBlurClass} >
          <Image src={pictureURL} style={{height:"35vh"}}
            alt=""
          />
          </Carousel.Item>
      </Carousel>
        )
    }
    else if(thisForm=="corporationMemberDB")
    {
        return(
          <Carousel fade={false} prevLabel="null" nextLabel="null" pause={false} controls={false} indicators={false} touch={true}>
          <Carousel.Item interval={3000}>
          <Image src={pictureURL} style={{height:"35vh"}}
            alt=""
          />
          </Carousel.Item>
      </Carousel>
        )
    }
    else{
        return(
          <Carousel fade={false} style={{maxHeight:"30vw"}} prevLabel="null" nextLabel="null" pause={false} controls={false} indicators={false} touch={true}>
          <Carousel.Item interval={3000} className={styles.carouselBlurClass}>
          <Image src={pictureURL} style={{height:"35vh"}}
            alt=""
          />
          </Carousel.Item>
      </Carousel>
        )
    }
            
}