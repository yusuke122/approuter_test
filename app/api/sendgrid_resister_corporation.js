import {Table} from 'react-bootstrap';

const address="shimizutatsuya.kouenkai@gmail.com"

export default function handler(req, res) {  
    if(req.method === 'POST') {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY); //SendGridのAPIキー
      
      const msgForCustomer = {
        to: req.body.email,
        from: address,
        subject: '【'+req.body.name+' 様】 会員登録ありがとうございます。',
        html: '<div style="overflow:visible;">'
        +'<div style="max-width:420px">'
        +'<p style="border-bottom:dashed 1px black;">以下の内容で会員登録を受け付けました。<br/><br/></p>' 
        +'<p>【登録内容】</p>'
        +'<div style="overflow:visible;">'
        +'<Table style="border-collapse:collapse" cellpadding="1" ><tbody>'
        +'<tr>'
          +'<td style="white-space:nowrap">企業名:</td>'
          +'<td>'+req.body.companyname+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">郵便番号:</td>'
          +'<td>'+req.body.placenumber+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">住所:</td>'
          +'<td>'+req.body.place+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">メール:</td>'
          +'<td>'+req.body.email+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">名前:</td>'
          +'<td>'+req.body.name+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">フリガナ:</td>'
          +'<td>'+req.body.nameruby+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">電話番号:</td>'
          +'<td>'+req.body.tellphone+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">口数:</td>'
          +'<td>'+req.body.kuchisu+'</td>'
        +'</tr>'
        +'<tr>'
        +'<td style="white-space:nowrap">支払方法:</td>'
        +'<td>'+req.body.paymenttype+'</td>'
      +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">ご意見:</td>'
          +'<td>'+req.body.message+'</td>'
        +'</tr>'
        +"</tbody></Table></div>"
        +"<br/>"
        +'<p style="border-top:dashed 1px black;"><br/>以下の口座にお振込みください。</p><br/>'
        +'<p>【口座情報】</p>'
        +'<p style="border:thick 1px black">清水銀行 清水支店(111)</p>'
        +'<p>普通 1111111</p>'
        +'<p>口座名義 シミズタツヤコウエンカイ</p><br/>'
        +'<p>お振込みが確認でき次第ノベルティをご送付させていただきます。</p>'       
        +'<p>ご対応に３～５日程お時間を頂いております。</p>'
        +'<p style="border-bottom:dashed 1px black;">お待たせして申し訳ございませんが、今しばらくお待ち下さいませ。<br/><br/></p></div></div></div>'
      };

      const msgForOwner={
        to: address,
        from: req.body.email,
        subject: '【'+req.body.name+' 様】 が法人会員の登録をしました。',
        html: '<div >'
        +'<p>【登録内容】</p>'
        +'<div style="overflow:visible;">'
        +'<div style="max-width:420px">'
        +'<Table /*border="1"*/ style="border-collapse:collapse" cellpadding="1" ><tbody>'
        +'<tr>'
          +'<td style="white-space:nowrap">企業名</td>'
          +'<td>'+req.body.companyname+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">郵便番号</td>'
          +'<td>'+req.body.placenumber+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">住所</td>'
          +'<td>'+req.body.place+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">メール</td>'
          +'<td>'+req.body.email+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">名前</td>'
          +'<td>'+req.body.name+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">フリガナ</td>'
          +'<td>'+req.body.nameruby+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">電話番号</td>'
          +'<td>'+req.body.tellphone+'</td>'
        +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">口数</td>'
          +'<td>'+req.body.kuchisu+'</td>'
        +'</tr>'
        +'<tr>'
        +'<td style="white-space:nowrap">支払方法:</td>'
        +'<td>'+req.body.paymenttype+'</td>'
      +'</tr>'
        +'<tr>'
          +'<td style="white-space:nowrap">ご意見</td>'
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