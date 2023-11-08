import React from "react"
import { MDBFooter} from 'mdb-react-ui-kit';
import {BsFillEnvelopeFill,BsFillPinMapFill} from "react-icons/bs";
import styles from '../components/styles/myCustom.module.css'

export function Footer() {
  return (
    <MDBFooter color='white' className={styles.footerCustom} text-center text-lg-left>
    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <p>
      <span> 清水達也選手後援会事務局</span><br/>
      <noscript><BsFillPinMapFill/></noscript>
      <BsFillPinMapFill/>
      <span>〒366-0824 埼玉県深谷市西島町1-3-6 ハタヤスポーツ深谷店内</span>
      </p>
      <p>
      <noscript><BsFillEnvelopeFill/></noscript>
      <noscript> kouenkaishimizu@gmail.com</noscript>
      </p>     
    </div>
  </MDBFooter>
     );
}
