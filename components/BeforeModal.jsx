import React from 'react'
import styles from '../components/styles/myCustom.module.css'
import { Button} from 'react-bootstrap';
import {useState,useEffect,useRef } from "react";
import {AfterModal} from "../components/AfterModal";

let isShow=true;
let cnt = 0;

export function BeforeModal({props})
{
    const [aftermodal, setAfterModal] = useState(false)
                return (
                    <div className={styles.overlay}>
                        <div className={styles.modal_content}>
                            <p>この内容で送信しますか？</p>
                            <Button onClick={() => setAfterModal(true)}>送信</Button>
                            <Button onClick={() => setShow(false)}>中止</Button>
                            <AfterModal aftermodal={aftermodal}/>
                        </div>
                    </div>
                )
            
}

            
