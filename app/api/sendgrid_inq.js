import {Table} from 'react-bootstrap';

const address="shimizutatsuya.kouenkai@gmail.com"

export default function handler(req, res) {  
    if(req.method === 'POST') {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY); //SendGridのAPIキー
      
      const msgForCustomer = {
        to: req.body.email,
        from: address,
        subject: '【'+req.body.name+' 様】 お問い合わせをいただきありがとうございます。',
        html: '<div style="overflow:visible">'
        +'<div style="max-width:420px">'
        +'<p style="border-bottom:dashed 1px black;">以下の内容でお問い合わせを受け付けました。<br/><br/></p>' 
        +'<p>【お問い合わせ内容】</p>'
        +'<div style="overflow:visible">'
        +'<Table style="border-collapse:collapse" cellpadding="1" ><tbody>'
        +"<tr>"
            +'<td style="white-space:nowrap">お名前:</td>'
            +'<td>'+req.body.name+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">フリガナ:</td>'
            +'<td>'+req.body.nameruby+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">メール:</td>'
            +'<td>'+req.body.email+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">内容:</td>'
            +'<td>'+req.body.message+'</td>'
        +'</tr>'
        +"</tbody></Table></div>"
        +"<br/>"
        +'<div>'
        +'<p style="border-top:dashed 1px black;"><br/>ご対応に３～５日程お時間を頂いております。</p>'
        +'<p style="border-bottom:dashed 1px black;">お待たせして申し訳ございませんが、今しばらくお待ち下さいませ。<br/><br/></p></div></div></div>'
      };

      const msgForOwner={
        to: address,
        from: req.body.email,
        subject: '【'+req.body.name+' 様】 からお問合せが届いています。',
        html: '<div><p>'+req.body.name+'様'+'('+req.body.email+')'+'からお問合せが届いています。</p>'
        +'<p>【お問い合わせ内容】</p>'
        +'<div style="overflow:visible">' 
        +'<div style="max-width:420px">'
        +'<Table /*border="1"*/ style="border-collapse:collapse" cellpadding="1"><tbody>'
        +"<tr>"
            +'<td style="white-space:nowrap">お名前</td>'
            +'<td>'+req.body.name+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">フリガナ:</td>'
            +'<td>'+req.body.nameruby+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">メール</td>'
            +'<td>'+req.body.email+'</td>'
        +'</tr>'
        +"<tr>"
            +'<td style="white-space:nowrap">内容</td>'
            +'<td>'+req.body.message+'</td>'
        +'</tr>'
        +"</tbody></Table></div></div></div>"
      };
   
      (async () => {
        try {
          await sgMail.send(msgForCustomer);
          await sgMail.send(msgForOwner);
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
    }
   
    res.status(200)
  }