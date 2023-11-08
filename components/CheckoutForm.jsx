
import {React,useState,useEffect,ChangeEvent} from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Col, Container, Row, Form, Button,Table} from 'react-bootstrap';
import styles from '../components/styles/myCustom.module.css';

export default function CheckoutForm({data}) {
  const stripe = useStripe();
  const elements = useElements();
  const [payment,SetPayment] = useState("未払い");
  const {kindOfPayment } = payment;
  const [isPayCredit, SetIsPayCredit] = useState(false);
  const [isPayBank, SetIsPayBank] = useState(false);
  const [isPayConvenient, SetIsPayKonbini] = useState(false);
  const [isPayStore, SetIsPayStore] = useState(false);
  const [isConfirm, SetIsConfirm] = useState(false);
  const [isSendAfterModal,SetIsSendAfterModal]=useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  const paymentChange = e => {
    e.persist();
    console.log(e.target.value);
    if(e.target.value==="銀行振込")
    {
      SetIsPayBank(true)
      SetIsPayCredit(false)
      SetIsPayKonbini(false)
      SetIsPayStore(false)
    }
    else if(e.target.value==="クレジットカード払い")
    {
      SetIsPayBank(false)
      SetIsPayCredit(true)
      SetIsPayKonbini(false)
      SetIsPayStore(false)
    }
    else if(e.target.value==="コンビニ払い")
    {
      SetIsPayBank(false)
      SetIsPayCredit(false)
      SetIsPayKonbini(true)
      SetIsPayStore(false)
    }
    else if(e.target.value==="店頭払い")
    {
      SetIsPayBank(false)
      SetIsPayCredit(false)
      SetIsPayKonbini(false)
      SetIsPayStore(true)
    }
    else{}
    data.paymenttype=e.target.value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("checkout hanglesubmit !stripe || !elements")
      return;
    }

    //setIsLoading(true);
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/Configuration`,
      },
      //redirect:"if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    /*
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }*/

    //setIsLoading(false);
    setIsProcessing(false);
  };
  /*
  const paymentElementOptions = {
    layout: "tabs",
  };*/

  return (
    <form id="payment-form" className={styles.formClass} onSubmit={handleSubmit}>
      {/*支払画面のモーダル*/}
      <Row>
        <Col className={styles.formTitle}>
          <h3 mb-5 >
            {/*<dt style={{fontWeight:"normal"}}>お支払い</dt>*/}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className={styles.formItem} mb-3 controlId="paymentField">
              <Form.Label><span className={styles.asterisk}>*</span>支払方法</Form.Label>
              <Form.Check 
                id="default-radio-type-1"
                type="radio"
                label="銀行振込"
                value={"銀行振込"}
                onChange={paymentChange}
                checked={kindOfPayment === "銀行振込"}
              />
              <Form.Check  
                id="default-radio-type-2"
                type="radio"
                label="クレジットカード払い"
                value={"クレジットカード払い"}
                onChange={paymentChange}
                checked={kindOfPayment === "クレジットカード払い"}
              />
              <div style={{display:isPayCredit?"inline":"none"}}>
                <PaymentElement id="payment-element" /*options={paymentElementOptions}*/ />
              </div>
                <Form.Check  
                id="default-radio-type-2"
                type="radio"
                label="コンビニ払い"
                value={"コンビニ払い"}
                onChange={paymentChange}
                checked={kindOfPayment === "コンビニ払い"}
              />
                <Form.Check  
                id="default-radio-type-2"
                type="radio"
                label="店頭払い"
                value={"店頭払い"}
                onChange={paymentChange}
                checked={kindOfPayment === "店頭払い"}
              />
          </Form.Group>
        </Col>
      </Row>
      <div className={styles.modalButton} style={{justifyContent:"between"}}>
        <Button className={styles.formButton} 
                style={{ marginLeft:"5px",marginRight:"5px" }}
                onClick={() => {
                      SetIsConfirm(true);
                    }}
                >内容確認</Button>
        {/*
        <Button className={styles.formButton} 
                style={{ marginLeft:"5px",marginRight:"5px" }}
                onClick={""}>
                戻る</Button>
        */}
      </div>
      
      
      {/*最後の内容確認モーダル*/}
      <div style={{visibility:isConfirm?"visible":"hidden"}}>
            <div className={styles.overlay}>
                <div className={styles.modal_content}>
                <div className={styles.modalTitle}>この内容で送信しますか？<br/><br/></div>
                  <div className={styles.modalText} data-simplebar data-simplebar-auto-hide="false">
                      <Table style={{transform:"scale(0.95)"}}>
                      <tbody>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>名前: {data.name}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>フリガナ: {data.nameruby}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>郵便番号: {data.placenumber}</td>
                        </tr>
                        <tr>
                          <td /*style={{whiteSpace:"nowrap"}}*/>住所: <br/> {data.place}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>メール: {data.email}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>電話番号: {data.tellphone}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>会員種別: {data.membertype}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>口数: {data.sendkuchisu}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>お支払い方法: {data.paymenttype}</td>
                        </tr>
                        <tr>
                          <td style={{whiteSpace:"nowrap"}}>お支払い金額: {data.firstpay}円</td>
                        </tr>
                        <tr>
                          <td /*style={{whiteSpace:"nowrap"}}*/>ご意見: <br/>{data.message}</td>
                          {/*<td style={{whiteSpace:"normal",overflowWrap:"break-word",wordWrap:"break-word"}}>{data.message}</td>*/}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className={styles.modalButton} style={{justifyContent:"between"}}>
                  <button disabled={isProcessing || !stripe || !elements} id="submit"
                          style={{
                            color:"white",
                            backgroundColor:"#0066FF",
                            minWidth:"8rem",
                            textDecoration: "none",
                            textAlign: "center",
                            padding:"auto",
                            boxShadow: "0px 4px 7px  rgba(0, 0, 0,0.5)",
                            transition: "all .3s",
                            margin:"auto"
                          }}>
                        <span id="button-text">
                          {isProcessing ? "送信中 ... " : "支払完了"}
                        </span>
                  </button>
                  {/* Show any error or success messages */}
                  {message && <div id="payment-message">{message}</div>}
                  <Button className={styles.formButton} 
                          style={{ marginLeft:"5px",marginRight:"5px" }}
                          onClick={() => SetIsConfirm(false)}>
                          戻る
                  </Button>
      </div></div></div></div>
      {/* Show any error or success messages */}

    </form>
  );
}