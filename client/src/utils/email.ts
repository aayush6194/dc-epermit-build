import { UserInfo } from "../api";
import { ENTERPRISE, ENTERPRISE_IMG_URL } from "../config";
import random from "./random";

export const getEmailTemplate = (reciever: UserInfo)=>`
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
    <style type="text/css">
		p{
			margin:10px 0;
			padding:0;
		}
		table{
			border-collapse:collapse;
		}
		h1,h2,h3,h4,h5,h6{
			display:block;
			margin:0;
			padding:0;
		}
		img,a img{
			border:0;
			height:auto;
			outline:none;
			text-decoration:none;
		}
		body,#bodyTable,#bodyCell{
			height:100%;
			margin:0;
			padding:0;
			width:100%;
		}
		.mcnPreviewText{
			display:none !important;
		}
		#outlook a{
			padding:0;
		}
		img{
			-ms-interpolation-mode:bicubic;
		}
		table{
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		p,a,li,td,blockquote{
			mso-line-height-rule:exactly;
		}
		a[href^=tel],a[href^=sms]{
			color:inherit;
			cursor:default;
			text-decoration:none;
		}
		p,a,li,td,body,table,blockquote{
			-ms-text-size-adjust:100%;
			-webkit-text-size-adjust:100%;
		}
		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
			line-height:100%;
		}
		a[x-apple-data-detectors]{
			color:inherit !important;
			text-decoration:none !important;
			font-size:inherit !important;
			font-family:inherit !important;
			font-weight:inherit !important;
			line-height:inherit !important;
		}
		#bodyCell{
			padding:10px;
			border-top:0;
		}
		.templateContainer{
			max-width:600px !important;
			border:0;
		}
		a.mcnButton{
			display:block;
		}
		.mcnImage,.mcnRetinaImage{
			vertical-align:bottom;
		}
		.mcnTextContent{
			word-break:break-word;
		}
		.mcnTextContent img{
			height:auto !important;
		}
		.mcnDividerBlock{
			table-layout:fixed !important;
		}
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
	/*
	@tab Page
	@section Background Style
	@tip Set the background color and top border for your email. You may want to choose colors that match your company's branding.
	*/
		#bodyCell{
			/*@editable*/border-top:0;
		}
	/*
	@tab Page
	@section Email Border
	@tip Set the border for your email.
	*/
		.templateContainer{
			/*@editable*/border:0;
		}
	/*
	@tab Page
	@section Heading 1
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
	@style heading 1
	*/
		h1{
			/*@editable*/color:#FFFFFF;
			/*@editable*/font-family:Georgia;
			/*@editable*/font-size:60px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:center;
		}
	/*
	@tab Page
	@section Heading 2
	@tip Set the styling for all second-level headings in your emails.
	@style heading 2
	*/
		h2{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Georgia;
			/*@editable*/font-size:22px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:center;
		}
	/*
	@tab Page
	@section Heading 3
	@tip Set the styling for all third-level headings in your emails.
	@style heading 3
	*/
		h3{
			/*@editable*/color:#606060;
			/*@editable*/font-family:Courier New;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:normal;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:center;
		}
	/*
	@tab Page
	@section Heading 4
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
	@style heading 4
	*/
		h4{
			/*@editable*/color:#202020;
			/*@editable*/font-family:Georgia;
			/*@editable*/font-size:18px;
			/*@editable*/font-style:normal;
			/*@editable*/font-weight:bold;
			/*@editable*/line-height:125%;
			/*@editable*/letter-spacing:normal;
			/*@editable*/text-align:center;
		}
	/*
	@tab Preheader
	@section Preheader Style
	@tip Set the background color and borders for your email's preheader area.
	*/
		#templatePreheader{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:0px;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Preheader
	@section Preheader Text
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/color:#606060;
			/*@editable*/font-family:Helvetica;
			/*@editable*/font-size:12px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Preheader
	@section Preheader Link
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
	*/
		#templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
			/*@editable*/color:#606060;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Header
	@section Header Style
	@tip Set the background color and borders for your email's header area.
	*/
		#templateHeader{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:1px none ;
			/*@editable*/border-bottom:1px none ;
			/*@editable*/padding-top:0px;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Header
	@section Header Text
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/color:#FFFFFF;
			/*@editable*/font-family:Courier New;
			/*@editable*/font-size:22px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Header
	@section Header Link
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
	*/
		#templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
			/*@editable*/color:#FFFFFF;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Body
	@section Body Style
	@tip Set the background color and borders for your email's body area.
	*/
		#templateBody{
			/*@editable*/background-color:#ffffff;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:auto;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:0px;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Body
	@section Body Text
	@tip Set the styling for your email's body text. Choose a size and color that is easy to read.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/color:#606060;
			/*@editable*/font-family:Georgia;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Body
	@section Body Link
	@tip Set the styling for your email's body links. Choose a color that helps them stand out from your text.
	*/
		#templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
			/*@editable*/color:#82A4A6;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Columns
	@section Column Style
	@tip Set the background color and borders for your email's columns.
	*/
		#templateColumns{
			/*@editable*/background-color:#062938;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:0;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Columns
	@section Column Text
	@tip Set the styling for your email's column text. Choose a size and color that is easy to read.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/color:#606060;
			/*@editable*/font-family:Georgia;
			/*@editable*/font-size:16px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:left;
		}
	/*
	@tab Columns
	@section Column Link
	@tip Set the styling for your email's column links. Choose a color that helps them stand out from your text.
	*/
		#templateColumns .columnContainer .mcnTextContent a,#templateColumns .columnContainer .mcnTextContent p a{
			/*@editable*/color:#222222;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	/*
	@tab Footer
	@section Footer Style
	@tip Set the background color and borders for your email's footer area.
	*/
		#templateFooter{
			/*@editable*/background-color:#00d69e;
			/*@editable*/background-image:none;
			/*@editable*/background-repeat:no-repeat;
			/*@editable*/background-position:center;
			/*@editable*/background-size:cover;
			/*@editable*/border-top:0;
			/*@editable*/border-bottom:0;
			/*@editable*/padding-top:10px;
			/*@editable*/padding-bottom:0px;
		}
	/*
	@tab Footer
	@section Footer Text
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/color:#FFFFFF;
			/*@editable*/font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;
			/*@editable*/font-size:9px;
			/*@editable*/line-height:100%;
			/*@editable*/text-align:center;
		}
	/*
	@tab Footer
	@section Footer Link
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
	*/
		#templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
			/*@editable*/color:#4caad8;
			/*@editable*/font-weight:normal;
			/*@editable*/text-decoration:underline;
		}
	@media only screen and (min-width:768px){
		.templateContainer{
			width:600px !important;
		}
}	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}
}	@media only screen and (max-width: 480px){
		body{
			width:100% !important;
			min-width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		#bodyCell{
			padding-top:10px !important;
		}
}	@media only screen and (max-width: 480px){
		.columnWrapper{
			max-width:100% !important;
			width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnRetinaImage{
			max-width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImage{
			width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
			max-width:100% !important;
			width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnBoxedTextContentContainer{
			min-width:100% !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageGroupContent{
			padding:9px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
			padding-top:9px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
			padding-top:18px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageCardBottomImageContent{
			padding-bottom:9px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockInner{
			padding-top:0 !important;
			padding-bottom:0 !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageGroupBlockOuter{
			padding-top:9px !important;
			padding-bottom:9px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnTextContent,.mcnBoxedTextContentColumn{
			padding-right:18px !important;
			padding-left:18px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
			padding-right:18px !important;
			padding-bottom:0 !important;
			padding-left:18px !important;
		}
}	@media only screen and (max-width: 480px){
		.mcpreview-image-uploader{
			display:none !important;
			width:100% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
		h1{
			/*@editable*/font-size:30px !important;
			/*@editable*/line-height:125% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
		h2{
			/*@editable*/font-size:20px !important;
			/*@editable*/line-height:125% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
		h3{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:125% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
		h4{
			/*@editable*/font-size:16px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Visibility
	@tip Set the visibility of the email's preheader on small screens. You can hide it to save space.
	*/
		#templatePreheader{
			/*@editable*/display:block !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Preheader Text
	@tip Make the preheader text larger in size for better readability on small screens.
	*/
		#templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
			/*@editable*/font-size:14px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
		#templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
			/*@editable*/font-size:24px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateBody .mcnTextContent,#templateBody .mcnTextContent p{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Column Text
	@tip Make the column text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
		#templateColumns .columnContainer .mcnTextContent,#templateColumns .columnContainer .mcnTextContent p{
			/*@editable*/font-size:18px !important;
			/*@editable*/line-height:150% !important;
		}
}	@media only screen and (max-width: 480px){
	/*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
		#templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
			/*@editable*/font-size:9px !important;
			/*@editable*/line-height:100% !important;
		}
}</style></head>
<body>
  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;">
    <tr>
      <td align="center" valign="top" width="600" style="width: 600px;">
        <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="width: 100%; max-width: 600px !important;">
          <tr>
            <td valign="top" id="templatePreheader">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;">
                <tbody class="mcnImageBlockOuter">
                  <tr>
                    <td valign="top" style="padding: 0px;" class="mcnImageBlockInner">
                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;">
                        <tbody>
                          <tr>
                            <td class="mcnImageContent" valign="top" style="padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align: center;">
                              <img
                                align="center"
                                alt="ParkStash Logo"
                                src="https://res.cloudinary.com/ssaran97/image/upload/v1575913437/email/logo.png"
                                width="48"
                                style="max-width: 96px; padding-bottom: 0; display: inline !important; vertical-align: bottom;"
                                class="mcnImage"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;">
                <tbody class="mcnDividerBlockOuter">
                  <tr>
                    <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 0px 18px 15px;">
                      <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; border-top: 2px solid #00d69e;">
                        <tbody>
                          <tr>
                            <td>
                              <span></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top" id="templateHeader">
              <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                  <tbody>
                    <tr>
                      <td valign="top" align="center" class="mcnTextContent" style="padding: 0px 18px 9px; font-family: &quot;Merriweather Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 36px; line-height: 200%;">
                          <span style="color:#00d69E"><span style="font-size:36px"><strong><span style="font-family:merriweather sans,helvetica neue,helvetica,arial,sans-serif">E-Permit request approved</span></strong></span></span>
                      </td>
                    </tr>
                </tbody>
              </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                 <tr>
                  <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                   <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                     <tbody>
                       <tr>
                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                          <img 
                            align="center" alt="background" 
                            src="${ENTERPRISE_IMG_URL}" 
                            width="350" 
                            style="max-width:400px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" 
                            class="mcnImage">
                        </td>
                       </tr>
                      </tbody>
                   </table>
                  </td>
                </tr>
              </tbody>
            </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;">
                <tbody class="mcnTextBlockOuter">
                  <tr>
                    <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%; min-width: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody>
                          <tr>
                            <td
                              valign="top"
                              class="mcnTextContent"
                              style="padding: 0px 18px 9px; font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-style: normal; font-weight: bold; line-height: 150%; text-align: center;"
                            ></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;">
                <tbody class="mcnTextBlockOuter">
                  <tr>
                    <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%; min-width: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody>
                          <tr>
                            <td
                              valign="top"
                              class="mcnTextContent"
                              style="padding: 0px 18px 9px; color: #222222; font-family: 'Merriweather Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-style: normal; font-weight: normal; line-height: 150%;" >
                              <div style="text-align: left;">
                                <span style="font-size: 20px;">
                                  <span style="font-family: merriweather sans, helvetica neue, helvetica, arial, sans-serif;">
								
                                   <b> Hi ${reciever.firstName || reciever.email || reciever.phone},                             <br /><br />
                                    Please see below your parking E-permit reservation details:</b> <br /><br />

									${reciever.firstName? `
									Name of the person: <b>${reciever.firstName} ${reciever.lastName}</b><br />
									Your License plate #: <b>${reciever.licensePlate} </b>                      <br />
									`: ""}
                            
                                    Issued By: <b>${ENTERPRISE} (${reciever.department || 'D.School'})</b>     <br />
                                    Valid From : <b>${reciever.starts}  </b>              <br />
                                    Valid Until : <b>${reciever.ends}  </b>              <br />
                                    Confirmation number : <b>${reciever.id}  </b>            <br />
                                    
									Link: <b>${reciever.link} </b>    <br/> <br/>
                                    If you have any questions, please contact ${ENTERPRISE}(${reciever.department || 'D.School'}) for more details. Please do not reply to this email    <br /><br />
                                    Happy Parking!
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;">
                <tbody class="mcnDividerBlockOuter">
                  <tr>
                    <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 20px 18px;">
                      <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; border-top: 2px solid #00d69e;">
                        <tbody>
                          <tr>
                            <td>
                              <span></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
                  <tbody class="mcnButtonBlockOuter">
                      <tr>
                          <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" width="135px" style="border-collapse: separate !important;border-radius: 9px;background-color: #00D69E;">
                                  <tbody>
                                      <tr>
                                          <td align="center" valign="middle" class="mcnButtonContent" style="font-family: &quot;Merriweather Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 18px; padding: 15px;">
                                              <a class="mcnButton " title="Navigate" href="https://www.google.com/maps/@32.7938295,-97.1898033/vmth+uc+davis/@34.1136636,-127.5637809,4z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8085291d3f0b8f1f:0x8a430e229f05f56e!2m2!1d-121.7628253!2d38.532044" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">Navigate</a>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;">
                <tbody class="mcnDividerBlockOuter">
                  <tr>
                    <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 4px 18px;">
                      <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; border-top: 2px solid #00d69e;">
                        <tbody>
                          <tr>
                            <td>
                              <span></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top" id="templateBody">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;">
                <tbody class="mcnTextBlockOuter">
                  <tr>
                    <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%; min-width: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody>
                          <tr>
                            <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px; color: #ffffff; font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 200%; text-align: center;">
                              <span style="color: #000000;"><span style="font-size: 24px;">Join the community</span></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width: 100%;">
                <tbody class="mcnFollowBlockOuter">
                  <tr>
                    <td align="center" valign="top" style="padding: 9px;" class="mcnFollowBlockInner">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width: 100%;">
                        <tbody>
                          <tr>
                            <td align="center" style="padding-left: 9px; padding-right: 9px;">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnFollowContent">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" style="padding-top: 9px; padding-right: 9px; padding-left: 9px;">
                                      <table align="center" border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" valign="top">
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display: inline;">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right: 10px; padding-bottom: 9px;">
                                                      <a href="https://www.facebook.com/ParkStash/" target="_blank">
                                                        <img
                                                          src="https://res.cloudinary.com/ssaran97/image/upload/v1593465697/email/facebook_color.png"
                                                          alt="Facebook"
                                                          class="mcnFollowBlockIcon"
                                                          width="48"
                                                          style="width: 48px; max-width: 48px; display: block;"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display: inline;">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right: 10px; padding-bottom: 9px;">
                                                      <a href="https://www.instagram.com/parkstash/" target="_blank">
                                                        <img
                                                          src="https://res.cloudinary.com/ssaran97/image/upload/v1593465820/email/instagram_color.png"
                                                          alt="Instagram"
                                                          class="mcnFollowBlockIcon"
                                                          width="48"
                                                          style="width: 48px; max-width: 48px; display: block;"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display: inline;">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right: 10px; padding-bottom: 9px;">
                                                      <a href="https://www.twitter.com/ParkStash/" target="_blank">
                                                        <img
                                                          src="https://res.cloudinary.com/ssaran97/image/upload/v1593465823/email/twitter_color.png"
                                                          alt="Twitter"
                                                          class="mcnFollowBlockIcon"
                                                          width="48"
                                                          style="width: 48px; max-width: 48px; display: block;"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnFollowStacked" style="display: inline;">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="mcnFollowIconContent" style="padding-right: 0; padding-bottom: 9px;">
                                                      <a href="https://medium.com/@ParkStash" target="_blank">
                                                        <img
                                                          src="https://res.cloudinary.com/ssaran97/image/upload/v1593465822/email/medium_color.png"
                                                          alt="Medium"
                                                          class="mcnFollowBlockIcon"
                                                          width="48"
                                                          style="width: 48px; max-width: 48px; display: block;"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;">
                <tbody class="mcnTextBlockOuter">
                  <tr>
                    <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%; min-width: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody>
                          <tr>
                            <td valign="top" class="mcnTextContent" style="padding-top: 0; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                              <div style="text-align: center;">
                                <span style="font-size: 20px;">
                                  <span style="color: #000000;">
                                    <span style="font-family: merriweather sans, helvetica neue, helvetica, arial, sans-serif;">
                                      Sent with&nbsp;
                                      <img data-file-id="966703" height="16" src="https://res.cloudinary.com/ssaran97/image/upload/v1575913437/email/heart.png" style="border: 0px; width: 16px; height: 16px; margin: 0px;" width="16" />
                                      &nbsp;from <strong>Park</strong>
                                    </span>
                                  </span>
                                  <strong>
                                    <span style="color: #00d69e;"><span style="font-family: merriweather sans, helvetica neue, helvetica, arial, sans-serif;">Stash</span></span>
                                  </strong>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;">
                <tbody class="mcnDividerBlockOuter">
                  <tr>
                    <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 18px;">
                      <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; border-top: 2px solid #00d69e;">
                        <tbody>
                          <tr>
                            <td>
                              <span></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top" id="templateColumns">
              <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                <tr>
                  <td valign="top" class="columnContainer"></td>
                </tr>
              </table>
              <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                <tr>
                  <td valign="top" class="columnContainer"></td>
                </tr>
              </table>
              <table align="left" border="0" cellpadding="0" cellspacing="0" width="200" class="columnWrapper">
                <tr>
                  <td valign="top" class="columnContainer"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td valign="top" id="templateFooter"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`