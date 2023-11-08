import React from "react"
import {useState,useMemo} from "react"
import {UserDataContext} from "../context/UserDataContext"

"use client"
export function HPPages() {

  const[uservalue,SetUserValue]=useState({
    timestamp:"",
    companyname:"",
    firstname:"",
    familyname:"",
    name:"",
    firstnameruby:"",
    familynameruby:"",
    nameruby:"",
    email:"",
    tellphone:"",
    placenumber:"",
    place:"",
    placelevel1:"",
    placelevel2:"",
    placelevel3:"",
    membertype:"",
    kuchisu:"",
    message:"",
    paymenttype:"",
    paymentstatus:"",
    firstpay:"",
  })

  const value=useMemo(
    ()=>({uservalue,SetUserValue}),
    [uservalue]
  )


  return (
    <>
      <UserDataContext.Provider value={value}>
          {useMemo(() => (
              <>
                {/*<MainPage/>*/}
              </>
          ), [uservalue])}
      </UserDataContext.Provider>
    </>
  )
}

