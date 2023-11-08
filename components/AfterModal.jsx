import React from 'react'
import styles from '../components/styles/myCustom.module.css'
import { Button,Row,Spinner,Image} from 'react-bootstrap';
import {useState,useEffect} from "react";
import db from "../firebase/firebaseConfig" //firebase db との接続
import { doc,collection,addDoc,getDoc,getDocs,setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";//DBに追加、読み取り,データセット

// 必要なIDをそれぞれ環境変数から取得
const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const autoclosetime=10000;
const clickclosetime=10;
let autosend=0;

const imageSrc="E7B23D3F-D397-4275-8806-FE4DFF4CAB8720230502.png"

export function AfterModal({isAfterModal,afterMessage,thisForm,data})
{
    const[isSpinner,setSpinner]=useState(false)
    //const[afterMessage,SetAfterMessage]=useState("仮登録が完了しました！");
    const[smallAfterMessage,SetSmallAfterMessage]=useState("メールをご確認下さい");
    const waitingAfterModal=()=>{
        console.log("isAfterModal=="+isAfterModal);
        //waitingSpinner()
        autoSend()
        //autoClose()
    }
    /*
    const waitingSpinner=()=>{
        setSpinner(true)
        setTimeout(() => {
            setSpinner(false)
          }, 1000);
    }
    */
    const clickClose=()=>{
        setTimeout(() => {
            window.location.href = "../";
          }, clickclosetime);
    }
    const autoClose=()=>{
        setTimeout(() => {
            window.location.href = "../";
          }, autoclosetime);
    }
    const autoSend=()=>{
       if(autosend==0){
        sendData()
        autosend=autosend+1;
       }
       else{
       }
    }
  
    const sendData=async()=>{
        let formRef=""
        if(thisForm!="")
        {
            formRef= collection(db, thisForm);
        }
        if(thisForm=="inquiryDB" && isAfterModal==true){
            
            await addDoc(formRef,{
                timestamp: serverTimestamp(),
                name:data.name,
                firstname:data.firstname,
                familyname:data.familyname,
                firstnameruby:data.firstnameruby,
                familynameruby:data.familynameruby,
                nameruby:data.nameruby,
                email:data.email,
                message:data.message
            })
            const res = await fetch('/api/sendgrid_inq', {
                body: JSON.stringify({
                    timestamp: serverTimestamp(),
                    name:data.name,
                    firstname:data.firstname,
                    familyname:data.familyname,
                    firstnameruby:data.firstnameruby,
                    familynameruby:data.familynameruby,
                    nameruby:data.nameruby,
                    email:data.email,
                    message:data.message
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              })
           
              const result = await res.json()

        }
        else if(thisForm=="publicMemberDB" && isAfterModal==true){
            await addDoc(formRef,{
            timestamp: serverTimestamp(),
            firstname:data.firstname,
            familyname:data.familyname,
            name:data.name,
            firstnameruby:data.firstnameruby,
            familynameruby:data.familynameruby,
            nameruby:data.nameruby,
            email:data.email,
            tellphone:data.tellphone,
            placenumber:data.placenumber,
            place:data.place,
            placelevel1:data.placelevel1,
            placelevel2:data.placelevel2,
            placelevel3:data.placelevel3,
            membertype:data.membertype,
            kuchisu:data.sendkuchisu,
            message:data.message,
            paymenttype:data.paymenttype,
            paymentstatus:data.paymentstatus,
            firstpay:data.firstpay,
            })
            const res = await fetch('/api/sendgrid_resister_public', {
                body: JSON.stringify({
                    timestamp: serverTimestamp(),
                    firstname:data.firstname,
                    familyname:data.familyname,
                    name:data.name,
                    firstnameruby:data.firstnameruby,
                    familynameruby:data.familynameruby,
                    nameruby:data.nameruby,
                    email:data.email,
                    tellphone:data.tellphone,
                    placenumber:data.placenumber,
                    place:data.place,
                    placelevel1:data.placelevel1,
                    placelevel2:data.placelevel2,
                    placelevel3:data.placelevel3,
                    membertype:data.membertype,
                    kuchisu:data.sendkuchisu,
                    message:data.message,
                    paymenttype:data.paymenttype,
                    paymentstatus:data.paymentstatus,
                    firstpay:data.firstpay,
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              })
           
              const result = await res.json()
        }
        else if(thisForm=="corporationMemberDB" && isAfterModal==true){
            await addDoc(formRef,{
            timestamp: serverTimestamp(),
            companyname:data.companyname,
            firstname:data.firstname,
            familyname:data.familyname,
            name:data.name,
            firstnameruby:data.firstnameruby,
            familynameruby:data.familynameruby,
            nameruby:data.nameruby,
            email:data.email,
            tellphone:data.tellphone,
            placenumber:data.placenumber,
            place:data.place,
            placelevel1:data.placelevel1,
            placelevel2:data.placelevel2,
            placelevel3:data.placelevel3,
            kuchisu:data.sendkuchisu,
            message:data.message,
            paymenttype:data.paymenttype,
            paymentstatus:data.paymentstatus,
            firstpay:data.firstpay,
            })
            const res = await fetch('/api/sendgrid_resister_corporation', {
                body: JSON.stringify({
                    timestamp: serverTimestamp(),
                    companyname:data.companyname,
                    firstname:data.firstname,
                    familyname:data.familyname,
                    name:data.name,
                    firstnameruby:data.firstnameruby,
                    familynameruby:data.familynameruby,
                    nameruby:data.nameruby,
                    email:data.email,
                    tellphone:data.tellphone,
                    placenumber:data.placenumber,
                    place:data.place,
                    placelevel1:data.placelevel1,
                    placelevel2:data.placelevel2,
                    placelevel3:data.placelevel3,
                    kuchisu:data.sendkuchisu,
                    message:data.message,
                    paymenttype:data.paymenttype,
                    paymentstatus:data.paymentstatus,
                    firstpay:data.firstpay,
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              })
           
              const result = await res.json()
        }
        else if(thisForm=="supportMessageDB" && isAfterModal==true){
            await addDoc(formRef,{
            timestamp: serverTimestamp(),
            name:data.name,
            message:data.message
        })
        }
        else{}
    }


    if (isAfterModal) {
        waitingAfterModal()
        return (
            <div className={styles.afterModal} style={{}}>
            <div className={styles.carouselClass}>
            <div className={styles.overlay}>
                <div className={styles.modal_content} style={{marginTop:"10vh", visibility: isSpinner ? "hidden" :"visible",transform:"scale(0.9)"}} >
                            <div className={styles.carouselBlurClass} style={{margin:"auto",display: "flex",alignItems: "center",justifyContent: "center"}}>
                            <Image style={{maxHeight:"55vh"}}src={imageSrc} />
                            </div>
                            <div className={styles.modalTitle}>
                                <div style={{paddingTop:"2vh",paddingLeft:"5vw",paddingRight:"5vw",margin:"auto"}}>
                                    <h4>{afterMessage}</h4>
                                    {/*<p>送信を完了しました!（10秒後に自動でトップページへ戻ります）</p>*/}
                                    <p>{smallAfterMessage}</p>
                                </div>
                            </div>
                            <div className={styles.modalButton}>
                                 <Button size="md" className={styles.afterModalButton} onClick={clickClose}><span style={{textDecoration:"none"}}>Topへ戻る</span></Button>
                            </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
    else{
        return(
            null
        );
    }
}