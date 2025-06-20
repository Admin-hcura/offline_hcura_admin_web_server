"use strict";
const moment = require("moment-timezone");
const constants = require("./constants");

class MailTemplates {
  async welcomeMail(emailId, username, phoneNumber, firstName, lastName) {
    return (
      "<!doctype html>" +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
      "    <head>" +
      "        <!-- NAME: SELL PRODUCTS -->" +
      "        <!--[if gte mso 15]>" +
      "        <xml>" +
      "            <o:OfficeDocumentSettings>" +
      "            <o:AllowPNG/>" +
      "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
      "            </o:OfficeDocumentSettings>" +
      "        </xml>" +
      "        <![endif]-->" +
      '        <meta charset="UTF-8">' +
      '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
      '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
      "        <title>*|MC:SUBJECT|*</title>" +
      "        " +
      '    <style type="text/css">' +
      "		p{" +
      "			margin:10px 0;" +
      "			padding:0;" +
      "		}" +
      "		table{" +
      "			border-collapse:collapse;" +
      "		}" +
      "		h1,h2,h3,h4,h5,h6{" +
      "			display:block;" +
      "			margin:0;" +
      "			padding:0;" +
      "		}" +
      "		img,a img{" +
      "			border:0;" +
      "			height:auto;" +
      "			outline:none;" +
      "			text-decoration:none;" +
      "		}" +
      "		body,#bodyTable,#bodyCell{" +
      "			height:100%;" +
      "			margin:0;" +
      "			padding:0;" +
      "			width:100%;" +
      "		}" +
      "		.mcnPreviewText{" +
      "			display:none !important;" +
      "		}" +
      "		#outlook a{" +
          "			padding:0;" +
          "		}" +
          "		img{" +
          "			-ms-interpolation-mode:bicubic;" +
          "		}" +
          "		table{" +
          "			mso-table-lspace:0pt;" +
          "			mso-table-rspace:0pt;" +
          "		}" +
          "		.ReadMsgBody{" +
          "			width:100%;" +
          "		}" +
          "		.ExternalClass{" +
          "			width:100%;" +
          "		}" +
          "		p,a,li,td,blockquote{" +
          "			mso-line-height-rule:exactly;" +
          "		}" +
          "		a[href^=tel],a[href^=sms]{" +
          "			color:inherit;" +
          "			cursor:default;" +
          "			text-decoration:none;" +
          "		}" +
          "		p,a,li,td,body,table,blockquote{" +
          "			-ms-text-size-adjust:100%;" +
          "			-webkit-text-size-adjust:100%;" +
          "		}" +
          "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
          "			line-height:100%;" +
          "		}" +
          "		a[x-apple-data-detectors]{" +
          "			color:inherit !important;" +
          "			text-decoration:none !important;" +
          "			font-size:inherit !important;" +
          "			font-family:inherit !important;" +
          "			font-weight:inherit !important;" +
          "			line-height:inherit !important;" +
          "		}" +
          "		.templateContainer{" +
          "			max-width:600px !important;" +
          "		}" +
          "		a.mcnButton{" +
          "			display:block;" +
          "		}" +
          "		.mcnImage,.mcnRetinaImage{" +
          "			vertical-align:bottom;" +
          "		}" +
          "		.mcnTextContent{" +
          "			word-break:break-word;" +
          "		}" +
          "		.mcnTextContent img{" +
          "			height:auto !important;" +
          "		}" +
          "		.mcnDividerBlock{" +
          "			table-layout:fixed !important;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 1" +
          "	@style heading 1" +
          "	*/" +
          "		h1{" +
          "			/*@editable*/color:#222222;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:40px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:center;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 2" +
          "	@style heading 2" +
          "	*/" +
          "		h2{" +
          "			/*@editable*/color:#222222;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:34px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 3" +
          "	@style heading 3" +
          "	*/" +
          "		h3{" +
          "			/*@editable*/color:#444444;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:22px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 4" +
          "	@style heading 4" +
          "	*/" +
          "		h4{" +
          "			/*@editable*/color:#949494;" +
          "			/*@editable*/font-family:Georgia;" +
          "			/*@editable*/font-size:20px;" +
          "			/*@editable*/font-style:italic;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/line-height:125%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Container Style" +
          "	*/" +
          "		#templateHeader{" +
          "			/*@editable*/background-color:#F7F7F7;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:45px;" +
          "			/*@editable*/padding-bottom:45px;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Interior Style" +
          "	*/" +
          "		.headerContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Text" +
          "	*/" +
          "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
          "			/*@editable*/color:#757575;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:16px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Link" +
          "	*/" +
          "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#007C89;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Container Style" +
          "	*/" +
          "		#templateBody{" +
          "			/*@editable*/background-color:#FFFFFF;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:36px;" +
          "			/*@editable*/padding-bottom:45px;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Interior Style" +
          "	*/" +
          "		.bodyContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Text" +
          "	*/" +
          "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
          "			/*@editable*/color:#757575;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:16px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Link" +
          "	*/" +
          "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#007C89;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Style" +
          "	*/" +
          "		#templateFooter{" +
          "			/*@editable*/background-color:#0b422d;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:45px;" +
          "			/*@editable*/padding-bottom:63px;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Interior Style" +
          "	*/" +
          "		.footerContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Text" +
          "	*/" +
          "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
          "			/*@editable*/color:#FFFFFF;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:12px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:center;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Link" +
          "	*/" +
          "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#FFFFFF;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	@media only screen and (min-width:768px){" +
          "		.templateContainer{" +
          "			width:600px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		body,table,td,p,a,li,blockquote{" +
          "			-webkit-text-size-adjust:none !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		body{" +
          "			width:100% !important;" +
          "			min-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnRetinaImage{" +
          "			max-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImage{" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
          "			max-width:100% !important;" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnBoxedTextContentContainer{" +
          "			min-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupContent{" +
          "			padding:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
          "			padding-top:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
          "			padding-top:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardBottomImageContent{" +
          "			padding-bottom:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupBlockInner{" +
          "			padding-top:0 !important;" +
          "			padding-bottom:0 !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupBlockOuter{" +
          "			padding-top:9px !important;" +
          "			padding-bottom:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
          "			padding-right:18px !important;" +
          "			padding-left:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
          "			padding-right:18px !important;" +
          "			padding-bottom:0 !important;" +
          "			padding-left:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcpreview-image-uploader{" +
          "			display:none !important;" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 1" +
          "	@tip Make the first-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h1{" +
          "			/*@editable*/font-size:30px !important;" +
          "			/*@editable*/line-height:125% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 2" +
          "	@tip Make the second-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h2{" +
          "			/*@editable*/font-size:26px !important;" +
          "			/*@editable*/line-height:125% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 3" +
          "	@tip Make the third-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h3{" +
          "			/*@editable*/font-size:20px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 4" +
          "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h4{" +
          "			/*@editable*/font-size:18px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Boxed Text" +
          "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
          "	*/" +
          "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:14px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Header Text" +
          "	@tip Make the header text larger in size for better readability on small screens." +
          "	*/" +
          "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:16px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Body Text" +
          "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
          "	*/" +
          "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:16px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Footer Text" +
          "	@tip Make the footer content text larger in size for better readability on small screens." +
          "	*/" +
          "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:14px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}</style></head>" +
          "    <body>" +
          "        <center>" +
          '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
          "                <tr>" +
          '                    <td align="center" valign="top" id="bodyCell">' +
          "                        <!-- BEGIN TEMPLATE // -->" +
          '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
          '    <tbody class="mcnImageBlockOuter">' +
          "            <tr>" +
          '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
          '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
          "                        <tbody><tr>" +
          '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
          "                                " +
          "                                    " +
          '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
          "                                    " +
          "                                " +
          "                            </td>" +
          "                        </tr>" +
          "                    </tbody></table>" +
          "                </td>" +
          "            </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
          '    <tbody class="mcnTextBlockOuter">' +
          "        <tr>" +
          '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
          "              	<!--[if mso]>" +
          '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
          "				<tr>" +
          "				<![endif]-->" +
          "			    " +
          "				<!--[if mso]>" +
          '				<td valign="top" width="600" style="width:600px;">' +
          "				<![endif]-->" +
          '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
          "                    <tbody><tr>" +
          "                        " +
          '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
          "                        " +
          '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
          "" +
          '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "	<tbody>" +
          "		<tr>" +
          '			<td valign="top">' +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">' +
          '						<div style="text-align: justify;">' +
          '						<h3 style="text-align: left;"><strong>Registration Successful!</strong></h3>' +
          "" +
          "						<div>&nbsp;</div>" +
          "" +
          '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "							<tbody>" +
          "								<tr>" +
          '									<td valign="top">' +
          "									<div>" +
          "									<table>" +
          "										<tbody>" +
          "											<tr>" +
          "												<td>&nbsp;</td>" +
          "											</tr>" +
          "											<tr>" +
          "												<td>" +
          "												<table>" +
          "													<tbody>" +
          "														<tr>" +
          "															<td>" +
          '															<p style="color: #000000;">Dear Mr./Mrs&nbsp; ' +
          firstName +
          " " +
          lastName +
          "<br>" +
          "															<br>" +
          "															Welcome To H-CURA Family!!! 🤝</p>" +
          "" +
          '															<p style="color: #000000;">Thanks for registering with H-CURA and your registration details have been submitted successfully with us.</p>' +
          "" +
        //   '															<p style="color: #000000;">Your H-CURA ID is ' +
        //   hcuraId +
          "<br>" +
          "															<br>" +
        //   "															Now you can register your family members details under the Depends option.<br>" +
        //   "															Your Email id or Mobile no will be the users name for your profile and you will get the OTP through Email id or Mobile no at the time of login.</p>" +
          "															</td>" +
          "														</tr>" +
          "														<tr>" +
          "															<td>" +
          '															<p style="color: #000000;">Your User Name:</p>' +
          username +
          '															<p style="color: #000000;">Email Id: ' +
          emailId +
          "<br>" +
          "															Mobile No: " +
          phoneNumber +
          "</p>" +
          "" +
          '															<p style="color: #000000;">Please keep your credentials confidential, dont share to anyone.</p>' +
          "" +
          '															<p style="color: #000000;">For any queries, please email us <span style="color:#008080"><u>techsupport@h-cura.com</u></span> or <span style="color:#008080"><u>admin@h-cura.com</u></span> or WhatsApp us <span style="color:#008080">7411845658</span> or <span style="color:#008080">8870001377</span>.</p>' +
          "															</td>" +
          "														</tr>" +
          "													</tbody>" +
          "												</table>" +
          "" +
          '												<p style="color: #000000;">Thanks &amp; Regards</p>' +
          "" +
          '												<p style="color: #000000;">Admin Team<br>' +
          "												<strong>H-CURA PVT LTD.</strong></p>" +
          "												</td>" +
          "											</tr>" +
          "										</tbody>" +
          "									</table>" +
          "									</div>" +
          "									</td>" +
          "								</tr>" +
          "							</tbody>" +
          "						</table>" +
          "						</div>" +
          "						</td>" +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "			</td>" +
          "		</tr>" +
          "	</tbody>" +
          "</table>" +
          "" +
          "                        </td>" +
          "                    </tr>" +
          "                </tbody></table>" +
          "				<!--[if mso]>" +
          "				</td>" +
          "				<![endif]-->" +
          "                " +
          "				<!--[if mso]>" +
          "				</tr>" +
          "				</table>" +
          "				<![endif]-->" +
          "            </td>" +
          "        </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
          '    <tbody class="mcnTextBlockOuter">' +
          "        <tr>" +
          '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
          "              	<!--[if mso]>" +
          '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
          "				<tr>" +
          "				<![endif]-->" +
          "			    " +
          "				<!--[if mso]>" +
          '				<td valign="top" width="600" style="width:600px;">' +
          "				<![endif]-->" +
          '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
          "                    <tbody><tr>" +
          "                        " +
          '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
          "                        " +
          '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "	<tbody>" +
          "		<tr>" +
          '			<td valign="top">' +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">Follow Us.</td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">&nbsp;</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
          "				</tr>" +
          "				</tbody>" +
          "			</table>" +
          "			</td>" +
          "		</tr>" +
          "	</tbody>" +
          "</table>" +
          "&nbsp;" +
          "" +
          '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "	<tbody>" +
          "		<tr>" +
          '			<td valign="top">' +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">Contact us.</td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">&nbsp;</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">' +
          '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
          "						</td>" +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "			</td>" +
          "		</tr>" +
          "	</tbody>" +
          "</table>" +
          "" +
          "                        </td>" +
          "                    </tr>" +
          "                </tbody></table>" +
          "				<!--[if mso]>" +
          "				</td>" +
          "				<![endif]-->" +
          "                " +
          "				<!--[if mso]>" +
          "				</tr>" +
          "				</table>" +
          "				<![endif]-->" +
          "            </td>" +
          "        </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                        </table>" +
          "                        <!-- // END TEMPLATE -->" +
          "                    </td>" +
          "                </tr>" +
          "            </table>" +
          "        </center>" +
          '    <script type="text/javascript"  src="/4WLkHRBolL/Mp6aun/8D6e/EatuL4GhO1/QGtpNgFaBQ/VFR/xaTV9UHwB"></script></body>' +
          "</html>"
        );
  };

  async forgetPasswordOtp(otp) {
    return (
          "<!doctype html>" +
          '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
          "    <head>" +
          "        <!-- NAME: SELL PRODUCTS -->" +
          "        <!--[if gte mso 15]>" +
          "        <xml>" +
          "            <o:OfficeDocumentSettings>" +
          "            <o:AllowPNG/>" +
          "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
          "            </o:OfficeDocumentSettings>" +
          "        </xml>" +
          "        <![endif]-->" +
          '        <meta charset="UTF-8">' +
          '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
          '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
          "        <title>*|MC:SUBJECT|*</title>" +
          "        " +
          '    <style type="text/css">' +
          "		p{" +
          "			margin:10px 0;" +
          "			padding:0;" +
          "		}" +
          "		table{" +
          "			border-collapse:collapse;" +
          "		}" +
          "		h1,h2,h3,h4,h5,h6{" +
          "			display:block;" +
          "			margin:0;" +
          "			padding:0;" +
          "		}" +
          "		img,a img{" +
          "			border:0;" +
          "			height:auto;" +
          "			outline:none;" +
          "			text-decoration:none;" +
          "		}" +
          "		body,#bodyTable,#bodyCell{" +
          "			height:100%;" +
          "			margin:0;" +
          "			padding:0;" +
          "			width:100%;" +
          "		}" +
          "		.mcnPreviewText{" +
          "			display:none !important;" +
          "		}" +
          "		#outlook a{" +
          "			padding:0;" +
          "		}" +
          "		img{" +
          "			-ms-interpolation-mode:bicubic;" +
          "		}" +
          "		table{" +
          "			mso-table-lspace:0pt;" +
          "			mso-table-rspace:0pt;" +
          "		}" +
          "		.ReadMsgBody{" +
          "			width:100%;" +
          "		}" +
          "		.ExternalClass{" +
          "			width:100%;" +
          "		}" +
          "		p,a,li,td,blockquote{" +
          "			mso-line-height-rule:exactly;" +
          "		}" +
          "		a[href^=tel],a[href^=sms]{" +
          "			color:inherit;" +
          "			cursor:default;" +
          "			text-decoration:none;" +
          "		}" +
          "		p,a,li,td,body,table,blockquote{" +
          "			-ms-text-size-adjust:100%;" +
          "			-webkit-text-size-adjust:100%;" +
          "		}" +
          "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
          "			line-height:100%;" +
          "		}" +
          "		a[x-apple-data-detectors]{" +
          "			color:inherit !important;" +
          "			text-decoration:none !important;" +
          "			font-size:inherit !important;" +
          "			font-family:inherit !important;" +
          "			font-weight:inherit !important;" +
          "			line-height:inherit !important;" +
          "		}" +
          "		.templateContainer{" +
          "			max-width:600px !important;" +
          "		}" +
          "		a.mcnButton{" +
          "			display:block;" +
          "		}" +
          "		.mcnImage,.mcnRetinaImage{" +
          "			vertical-align:bottom;" +
          "		}" +
          "		.mcnTextContent{" +
          "			word-break:break-word;" +
          "		}" +
          "		.mcnTextContent img{" +
          "			height:auto !important;" +
          "		}" +
          "		.mcnDividerBlock{" +
          "			table-layout:fixed !important;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 1" +
          "	@style heading 1" +
          "	*/" +
          "		h1{" +
          "			/*@editable*/color:#222222;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:40px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:center;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 2" +
          "	@style heading 2" +
          "	*/" +
          "		h2{" +
          "			/*@editable*/color:#222222;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:34px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 3" +
          "	@style heading 3" +
          "	*/" +
          "		h3{" +
          "			/*@editable*/color:#444444;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:22px;" +
          "			/*@editable*/font-style:normal;" +
          "			/*@editable*/font-weight:bold;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Page" +
          "	@section Heading 4" +
          "	@style heading 4" +
          "	*/" +
          "		h4{" +
          "			/*@editable*/color:#949494;" +
          "			/*@editable*/font-family:Georgia;" +
          "			/*@editable*/font-size:20px;" +
          "			/*@editable*/font-style:italic;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/line-height:125%;" +
          "			/*@editable*/letter-spacing:normal;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Container Style" +
          "	*/" +
          "		#templateHeader{" +
          "			/*@editable*/background-color:#e8e8e8;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:40px;" +
          "			/*@editable*/padding-bottom:40px;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Interior Style" +
          "	*/" +
          "		.headerContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Text" +
          "	*/" +
          "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
          "			/*@editable*/color:#757575;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:16px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Header" +
          "	@section Header Link" +
          "	*/" +
          "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#007C89;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Container Style" +
          "	*/" +
          "		#templateBody{" +
          "			/*@editable*/background-color:#FFFFFF;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:57px;" +
          "			/*@editable*/padding-bottom:57px;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Interior Style" +
          "	*/" +
          "		.bodyContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Text" +
          "	*/" +
          "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
          "			/*@editable*/color:#757575;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:16px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:left;" +
          "		}" +
          "	/*" +
          "	@tab Body" +
          "	@section Body Link" +
          "	*/" +
          "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#007C89;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Style" +
          "	*/" +
          "		#templateFooter{" +
          "			/*@editable*/background-color:#0B422D;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:45px;" +
          "			/*@editable*/padding-bottom:63px;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Interior Style" +
          "	*/" +
          "		.footerContainer{" +
          "			/*@editable*/background-color:transparent;" +
          "			/*@editable*/background-image:none;" +
          "			/*@editable*/background-repeat:no-repeat;" +
          "			/*@editable*/background-position:center;" +
          "			/*@editable*/background-size:cover;" +
          "			/*@editable*/border-top:0;" +
          "			/*@editable*/border-bottom:0;" +
          "			/*@editable*/padding-top:0;" +
          "			/*@editable*/padding-bottom:0;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Text" +
          "	*/" +
          "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
          "			/*@editable*/color:#FFFFFF;" +
          "			/*@editable*/font-family:Helvetica;" +
          "			/*@editable*/font-size:12px;" +
          "			/*@editable*/line-height:150%;" +
          "			/*@editable*/text-align:center;" +
          "		}" +
          "	/*" +
          "	@tab Footer" +
          "	@section Footer Link" +
          "	*/" +
          "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
          "			/*@editable*/color:#FFFFFF;" +
          "			/*@editable*/font-weight:normal;" +
          "			/*@editable*/text-decoration:underline;" +
          "		}" +
          "	@media only screen and (min-width:768px){" +
          "		.templateContainer{" +
          "			width:600px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		body,table,td,p,a,li,blockquote{" +
          "			-webkit-text-size-adjust:none !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		body{" +
          "			width:100% !important;" +
          "			min-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnRetinaImage{" +
          "			max-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImage{" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
          "			max-width:100% !important;" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnBoxedTextContentContainer{" +
          "			min-width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupContent{" +
          "			padding:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
          "			padding-top:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
          "			padding-top:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardBottomImageContent{" +
          "			padding-bottom:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupBlockInner{" +
          "			padding-top:0 !important;" +
          "			padding-bottom:0 !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageGroupBlockOuter{" +
          "			padding-top:9px !important;" +
          "			padding-bottom:9px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
          "			padding-right:18px !important;" +
          "			padding-left:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
          "			padding-right:18px !important;" +
          "			padding-bottom:0 !important;" +
          "			padding-left:18px !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "		.mcpreview-image-uploader{" +
          "			display:none !important;" +
          "			width:100% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 1" +
          "	@tip Make the first-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h1{" +
          "			/*@editable*/font-size:30px !important;" +
          "			/*@editable*/line-height:125% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 2" +
          "	@tip Make the second-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h2{" +
          "			/*@editable*/font-size:26px !important;" +
          "			/*@editable*/line-height:125% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 3" +
          "	@tip Make the third-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h3{" +
          "			/*@editable*/font-size:20px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Heading 4" +
          "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
          "	*/" +
          "		h4{" +
          "			/*@editable*/font-size:18px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Boxed Text" +
          "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
          "	*/" +
          "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:14px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Header Text" +
          "	@tip Make the header text larger in size for better readability on small screens." +
          "	*/" +
          "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:16px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Body Text" +
          "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
          "	*/" +
          "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:16px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}	@media only screen and (max-width: 480px){" +
          "	/*" +
          "	@tab Mobile Styles" +
          "	@section Footer Text" +
          "	@tip Make the footer content text larger in size for better readability on small screens." +
          "	*/" +
          "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
          "			/*@editable*/font-size:14px !important;" +
          "			/*@editable*/line-height:150% !important;" +
          "		}" +
          "" +
          "}</style></head>" +
          "    <body>" +
          "        <center>" +
          '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
          "                <tr>" +
          '                    <td align="center" valign="top" id="bodyCell">' +
          "                        <!-- BEGIN TEMPLATE // -->" +
          '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
          '    <tbody class="mcnImageBlockOuter">' +
          "            <tr>" +
          '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
          '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
          "                        <tbody><tr>" +
          '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
          "                                " +
          "                                    " +
          '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="153.9" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
          "                                    " +
          "                                " +
          "                            </td>" +
          "                        </tr>" +
          "                    </tbody></table>" +
          "                </td>" +
          "            </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
          '    <tbody class="mcnTextBlockOuter">' +
          "        <tr>" +
          '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
          "              	<!--[if mso]>" +
          '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
          "				<tr>" +
          "				<![endif]-->" +
          "			    " +
          "				<!--[if mso]>" +
          '				<td valign="top" width="600" style="width:600px;">' +
          "				<![endif]-->" +
          '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
          "                    <tbody><tr>" +
          "                        " +
          '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
          "                        " +
          '                            <span style="font-size:19px"><strong>Your H-Cura Forget Password OTP</strong></span><br>' +
          "<br>" +
          "Please enter the below 6 digit OTP code to complete verification:<br>" +
          "<br>" +
          '<strong><span style="font-size:20px">' +
          otp +
          "</span></strong><br>" +
          "<br>" +
          "This code is valid for the next 15 mins<br>" +
          "Please keep your OTP confidential, dont share to anyone.<br>" +
          "<br>" +
          "If you did not raise this request, please write to<br>" +
          '<a href="mailto:techsupport@h-cura.com" target="_blank">techsupport@h-cura.com</a>' +
          "                        </td>" +
          "                    </tr>" +
          "                </tbody></table>" +
          "				<!--[if mso]>" +
          "				</td>" +
          "				<![endif]-->" +
          "                " +
          "				<!--[if mso]>" +
          "				</tr>" +
          "				</table>" +
          "				<![endif]-->" +
          "            </td>" +
          "        </tr>" +
          "    </tbody>" +
          '</table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">' +
          '    <tbody class="mcnDividerBlockOuter">' +
          "        <tr>" +
          '            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">' +
          '                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">' +
          "                    <tbody><tr>" +
          "                        <td>" +
          "                            <span></span>" +
          "                        </td>" +
          "                    </tr>" +
          "                </tbody></table>" +
          "<!--            " +
          '                <td class="mcnDividerBlockInner" style="padding: 18px;">' +
          '                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />' +
          "-->" +
          "            </td>" +
          "        </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                            <tr>" +
          '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
          "                                    <tr>" +
          '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
          "                                    <![endif]-->" +
          '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
          "                                        <tr>" +
          '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
          '    <tbody class="mcnTextBlockOuter">' +
          "        <tr>" +
          '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
          "              	<!--[if mso]>" +
          '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
          "				<tr>" +
          "				<![endif]-->" +
          "			    " +
          "				<!--[if mso]>" +
          '				<td valign="top" width="600" style="width:600px;">' +
          "				<![endif]-->" +
          '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
          "                    <tbody><tr>" +
          "                        " +
          '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
          "                        " +
          '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "	<tbody>" +
          "		<tr>" +
          '			<td valign="top">' +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">Follow Us.</td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">&nbsp;</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
          "				</tr>" +
          "				</tbody>" +
          "			</table>" +
          "			</td>" +
          "		</tr>" +
          "	</tbody>" +
          "</table>" +
          "&nbsp;" +
          "" +
          '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "	<tbody>" +
          "		<tr>" +
          '			<td valign="top">' +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">Contact us.</td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top">&nbsp;</td>' +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "" +
          '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
          "				<tbody>" +
          "					<tr>" +
          '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
          "					</tr>" +
          "					<tr>" +
          '						<td valign="top">' +
          '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
          "						</td>" +
          "					</tr>" +
          "				</tbody>" +
          "			</table>" +
          "			</td>" +
          "		</tr>" +
          "	</tbody>" +
          "</table>" +
          "" +
          "                        </td>" +
          "                    </tr>" +
          "                </tbody></table>" +
          "				<!--[if mso]>" +
          "				</td>" +
          "				<![endif]-->" +
          "                " +
          "				<!--[if mso]>" +
          "				</tr>" +
          "				</table>" +
          "				<![endif]-->" +
          "            </td>" +
          "        </tr>" +
          "    </tbody>" +
          "</table></td>" +
          "                                        </tr>" +
          "                                    </table>" +
          "                                    <!--[if (gte mso 9)|(IE)]>" +
          "                                    </td>" +
          "                                    </tr>" +
          "                                    </table>" +
          "                                    <![endif]-->" +
          "                                </td>" +
          "                            </tr>" +
          "                        </table>" +
          "                        <!-- // END TEMPLATE -->" +
          "                    </td>" +
          "                </tr>" +
          "            </table>" +
          "        </center>" +
          "    </body>" +
          "</html>"
    );
  };

  async patientWelcomeEmail(firstName, lastName, hcuraId, emailId, phoneNumber) {
    return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<h3 style="text-align: left;"><strong>Registration Successful!</strong></h3>' +
        "" +
        "						<div>&nbsp;</div>" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        "									<div>" +
        "									<table>" +
        "										<tbody>" +
        "											<tr>" +
        "												<td>&nbsp;</td>" +
        "											</tr>" +
        "											<tr>" +
        "												<td>" +
        "												<table>" +
        "													<tbody>" +
        "														<tr>" +
        "															<td>" +
        '															<p style="color: #000000;">Dear Mr./Mrs&nbsp; ' +
        firstName +
        " " +
        lastName +
        "<br>" +
        "															<br>" +
        "															Welcome To H-CURA Family!!!</p>" +
        "" +
        '															<p style="color: #000000;">Thanks for registering with H-CURA and your registration details have been submitted successfully with us.</p>' +
        "" +
        '															<p style="color: #000000;">Your H-CURA ID is ' +
        hcuraId +
        "<br>" +
        "															<br>" +
        // "															Now you can register your family members details under the Depends option.<br>" +
        // "															Your Email id or Mobile no will be the users name for your profile and you will get the OTP through Email id or Mobile no at the time of login.</p>" +
        "															</td>" +
        "														</tr>" +
        "														<tr>" +
        "															<td>" +
        // '															<p style="color: #000000;">Your User Name:</p>' +
        "" +
        '															<p style="color: #000000;">Email Id: ' +
        emailId +
        "<br>" +
        "															Mobile No: " +
        phoneNumber +
        "</p>" +
        "" +
        // '															<p style="color: #000000;">Please ensure to update your profile as soon as you login to the app using Edit Profile option to help us to serve you better.</p>' +
        "" +
        '															<p style="color: #000000;">For any queries, please email us <span style="color:#008080"><u>admin@h-cura.com</u></span> or WhatsApp us <span style="color:#008080">8870001377</span>.</p>' +
        "															</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "" +
        '												<p style="color: #000000;">Thanks &amp; Regards</p>' +
        "" +
        '												<p style="color: #000000;">Admin Team<br>' +
        "												<strong>H-CURA PVT LTD.</strong></p>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</div>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/4WLkHRBolL/Mp6aun/8D6e/EatuL4GhO1/QGtpNgFaBQ/VFR/xaTV9UHwB"></script></body>' +
        "</html>"
    );
  };

  async sendPaymentSuccess(
    userName,
    emailId,
    amount,
    translationId,
    paymentMethod
  ) {
    let date = moment().format("DD MMMM YYYY");
    return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>Payment Successful</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        userName +
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">You payment with H-Cura is successful.<br>' +
        "						&nbsp;</td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Transaction Number:</strong>&nbsp;' +
        translationId +
        "&nbsp;<br>" +
        "						<strong>Payment Date:</strong>" +
        date +
        "<br>" +
        "						<strong>Amount: </strong>" +
        amount +
        "<br>" +
        "						<strong>Payment Method: </strong>" +
        paymentMethod +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
    );
  };

  async appointmentBookedMail(
    userFirstName,
    userLastName,
    doctorFirstName,
    doctorLastName,
    appointmentDate,
    startTime,
    endTime
  ) {
    return (
      "<!doctype html>" +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
      "    <head>" +
      "        <!-- NAME: SELL PRODUCTS -->" +
      "        <!--[if gte mso 15]>" +
      "        <xml>" +
      "            <o:OfficeDocumentSettings>" +
      "            <o:AllowPNG/>" +
      "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
      "            </o:OfficeDocumentSettings>" +
      "        </xml>" +
      "        <![endif]-->" +
      '        <meta charset="UTF-8">' +
      '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
      '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
      "        <title>*|MC:SUBJECT|*</title>" +
      "        " +
      '    <style type="text/css">' +
      "		p{" +
      "			margin:10px 0;" +
      "			padding:0;" +
      "		}" +
      "		table{" +
      "			border-collapse:collapse;" +
      "		}" +
      "		h1,h2,h3,h4,h5,h6{" +
      "			display:block;" +
      "			margin:0;" +
      "			padding:0;" +
      "		}" +
      "		img,a img{" +
      "			border:0;" +
      "			height:auto;" +
      "			outline:none;" +
      "			text-decoration:none;" +
      "		}" +
      "		body,#bodyTable,#bodyCell{" +
      "			height:100%;" +
      "			margin:0;" +
      "			padding:0;" +
      "			width:100%;" +
      "		}" +
      "		.mcnPreviewText{" +
      "			display:none !important;" +
      "		}" +
      "		#outlook a{" +
      "			padding:0;" +
      "		}" +
      "		img{" +
      "			-ms-interpolation-mode:bicubic;" +
      "		}" +
      "		table{" +
      "			mso-table-lspace:0pt;" +
      "			mso-table-rspace:0pt;" +
      "		}" +
      "		.ReadMsgBody{" +
      "			width:100%;" +
      "		}" +
      "		.ExternalClass{" +
      "			width:100%;" +
      "		}" +
      "		p,a,li,td,blockquote{" +
      "			mso-line-height-rule:exactly;" +
      "		}" +
      "		a[href^=tel],a[href^=sms]{" +
      "			color:inherit;" +
      "			cursor:default;" +
      "			text-decoration:none;" +
      "		}" +
      "		p,a,li,td,body,table,blockquote{" +
      "			-ms-text-size-adjust:100%;" +
      "			-webkit-text-size-adjust:100%;" +
      "		}" +
      "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
      "			line-height:100%;" +
      "		}" +
      "		a[x-apple-data-detectors]{" +
      "			color:inherit !important;" +
      "			text-decoration:none !important;" +
      "			font-size:inherit !important;" +
      "			font-family:inherit !important;" +
      "			font-weight:inherit !important;" +
      "			line-height:inherit !important;" +
      "		}" +
      "		.templateContainer{" +
      "			max-width:600px !important;" +
      "		}" +
      "		a.mcnButton{" +
      "			display:block;" +
      "		}" +
      "		.mcnImage,.mcnRetinaImage{" +
      "			vertical-align:bottom;" +
      "		}" +
      "		.mcnTextContent{" +
      "			word-break:break-word;" +
      "		}" +
      "		.mcnTextContent img{" +
      "			height:auto !important;" +
      "		}" +
      "		.mcnDividerBlock{" +
      "			table-layout:fixed !important;" +
      "		}" +
      "	/*" +
      "	@tab Page" +
      "	@section Heading 1" +
      "	@style heading 1" +
      "	*/" +
      "		h1{" +
      "			/*@editable*/color:#222222;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:40px;" +
      "			/*@editable*/font-style:normal;" +
      "			/*@editable*/font-weight:bold;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/letter-spacing:normal;" +
      "			/*@editable*/text-align:center;" +
      "		}" +
      "	/*" +
      "	@tab Page" +
      "	@section Heading 2" +
      "	@style heading 2" +
      "	*/" +
      "		h2{" +
      "			/*@editable*/color:#222222;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:34px;" +
      "			/*@editable*/font-style:normal;" +
      "			/*@editable*/font-weight:bold;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/letter-spacing:normal;" +
      "			/*@editable*/text-align:left;" +
      "		}" +
      "	/*" +
      "	@tab Page" +
      "	@section Heading 3" +
      "	@style heading 3" +
      "	*/" +
      "		h3{" +
      "			/*@editable*/color:#444444;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:22px;" +
      "			/*@editable*/font-style:normal;" +
      "			/*@editable*/font-weight:bold;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/letter-spacing:normal;" +
      "			/*@editable*/text-align:left;" +
      "		}" +
      "	/*" +
      "	@tab Page" +
      "	@section Heading 4" +
      "	@style heading 4" +
      "	*/" +
      "		h4{" +
      "			/*@editable*/color:#949494;" +
      "			/*@editable*/font-family:Georgia;" +
      "			/*@editable*/font-size:20px;" +
      "			/*@editable*/font-style:italic;" +
      "			/*@editable*/font-weight:normal;" +
      "			/*@editable*/line-height:125%;" +
      "			/*@editable*/letter-spacing:normal;" +
      "			/*@editable*/text-align:left;" +
      "		}" +
      "	/*" +
      "	@tab Header" +
      "	@section Header Container Style" +
      "	*/" +
      "		#templateHeader{" +
      "			/*@editable*/background-color:#F7F7F7;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:45px;" +
      "			/*@editable*/padding-bottom:45px;" +
      "		}" +
      "	/*" +
      "	@tab Header" +
      "	@section Header Interior Style" +
      "	*/" +
      "		.headerContainer{" +
      "			/*@editable*/background-color:transparent;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:0;" +
      "			/*@editable*/padding-bottom:0;" +
      "		}" +
      "	/*" +
      "	@tab Header" +
      "	@section Header Text" +
      "	*/" +
      "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
      "			/*@editable*/color:#757575;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:16px;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/text-align:left;" +
      "		}" +
      "	/*" +
      "	@tab Header" +
      "	@section Header Link" +
      "	*/" +
      "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
      "			/*@editable*/color:#007C89;" +
      "			/*@editable*/font-weight:normal;" +
      "			/*@editable*/text-decoration:underline;" +
      "		}" +
      "	/*" +
      "	@tab Body" +
      "	@section Body Container Style" +
      "	*/" +
      "		#templateBody{" +
      "			/*@editable*/background-color:#FFFFFF;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:36px;" +
      "			/*@editable*/padding-bottom:45px;" +
      "		}" +
      "	/*" +
      "	@tab Body" +
      "	@section Body Interior Style" +
      "	*/" +
      "		.bodyContainer{" +
      "			/*@editable*/background-color:transparent;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:0;" +
      "			/*@editable*/padding-bottom:0;" +
      "		}" +
      "	/*" +
      "	@tab Body" +
      "	@section Body Text" +
      "	*/" +
      "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
      "			/*@editable*/color:#757575;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:16px;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/text-align:left;" +
      "		}" +
      "	/*" +
      "	@tab Body" +
      "	@section Body Link" +
      "	*/" +
      "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
      "			/*@editable*/color:#007C89;" +
      "			/*@editable*/font-weight:normal;" +
      "			/*@editable*/text-decoration:underline;" +
      "		}" +
      "	/*" +
      "	@tab Footer" +
      "	@section Footer Style" +
      "	*/" +
      "		#templateFooter{" +
      "			/*@editable*/background-color:#0b422d;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:45px;" +
      "			/*@editable*/padding-bottom:63px;" +
      "		}" +
      "	/*" +
      "	@tab Footer" +
      "	@section Footer Interior Style" +
      "	*/" +
      "		.footerContainer{" +
      "			/*@editable*/background-color:transparent;" +
      "			/*@editable*/background-image:none;" +
      "			/*@editable*/background-repeat:no-repeat;" +
      "			/*@editable*/background-position:center;" +
      "			/*@editable*/background-size:cover;" +
      "			/*@editable*/border-top:0;" +
      "			/*@editable*/border-bottom:0;" +
      "			/*@editable*/padding-top:0;" +
      "			/*@editable*/padding-bottom:0;" +
      "		}" +
      "	/*" +
      "	@tab Footer" +
      "	@section Footer Text" +
      "	*/" +
      "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
      "			/*@editable*/color:#FFFFFF;" +
      "			/*@editable*/font-family:Helvetica;" +
      "			/*@editable*/font-size:12px;" +
      "			/*@editable*/line-height:150%;" +
      "			/*@editable*/text-align:center;" +
      "		}" +
      "	/*" +
      "	@tab Footer" +
      "	@section Footer Link" +
      "	*/" +
      "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
      "			/*@editable*/color:#FFFFFF;" +
      "			/*@editable*/font-weight:normal;" +
      "			/*@editable*/text-decoration:underline;" +
      "		}" +
      "	@media only screen and (min-width:768px){" +
      "		.templateContainer{" +
      "			width:600px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		body,table,td,p,a,li,blockquote{" +
      "			-webkit-text-size-adjust:none !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		body{" +
      "			width:100% !important;" +
      "			min-width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnRetinaImage{" +
      "			max-width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImage{" +
      "			width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
      "			max-width:100% !important;" +
      "			width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnBoxedTextContentContainer{" +
      "			min-width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageGroupContent{" +
      "			padding:9px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
      "			padding-top:9px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
      "			padding-top:18px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageCardBottomImageContent{" +
      "			padding-bottom:9px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageGroupBlockInner{" +
      "			padding-top:0 !important;" +
      "			padding-bottom:0 !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageGroupBlockOuter{" +
      "			padding-top:9px !important;" +
      "			padding-bottom:9px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
      "			padding-right:18px !important;" +
      "			padding-left:18px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
      "			padding-right:18px !important;" +
      "			padding-bottom:0 !important;" +
      "			padding-left:18px !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "		.mcpreview-image-uploader{" +
      "			display:none !important;" +
      "			width:100% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Heading 1" +
      "	@tip Make the first-level headings larger in size for better readability on small screens." +
      "	*/" +
      "		h1{" +
      "			/*@editable*/font-size:30px !important;" +
      "			/*@editable*/line-height:125% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Heading 2" +
      "	@tip Make the second-level headings larger in size for better readability on small screens." +
      "	*/" +
      "		h2{" +
      "			/*@editable*/font-size:26px !important;" +
      "			/*@editable*/line-height:125% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Heading 3" +
      "	@tip Make the third-level headings larger in size for better readability on small screens." +
      "	*/" +
      "		h3{" +
      "			/*@editable*/font-size:20px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Heading 4" +
      "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
      "	*/" +
      "		h4{" +
      "			/*@editable*/font-size:18px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Boxed Text" +
      "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
      "	*/" +
      "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
      "			/*@editable*/font-size:14px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Header Text" +
      "	@tip Make the header text larger in size for better readability on small screens." +
      "	*/" +
      "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
      "			/*@editable*/font-size:16px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Body Text" +
      "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
      "	*/" +
      "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
      "			/*@editable*/font-size:16px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}	@media only screen and (max-width: 480px){" +
      "	/*" +
      "	@tab Mobile Styles" +
      "	@section Footer Text" +
      "	@tip Make the footer content text larger in size for better readability on small screens." +
      "	*/" +
      "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
      "			/*@editable*/font-size:14px !important;" +
      "			/*@editable*/line-height:150% !important;" +
      "		}" +
      "" +
      "}</style></head>" +
      "    <body>" +
      "        <center>" +
      '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
      "                <tr>" +
      '                    <td align="center" valign="top" id="bodyCell">' +
      "                        <!-- BEGIN TEMPLATE // -->" +
      '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "                            <tr>" +
      '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
      "                                    <tr>" +
      '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
      "                                    <![endif]-->" +
      '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
      "                                        <tr>" +
      '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
      '    <tbody class="mcnImageBlockOuter">' +
      "            <tr>" +
      '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
      '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
      "                        <tbody><tr>" +
      '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
      "                                " +
      "                                    " +
      '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
      "                                    " +
      "                                " +
      "                            </td>" +
      "                        </tr>" +
      "                    </tbody></table>" +
      "                </td>" +
      "            </tr>" +
      "    </tbody>" +
      "</table></td>" +
      "                                        </tr>" +
      "                                    </table>" +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      "                                    </td>" +
      "                                    </tr>" +
      "                                    </table>" +
      "                                    <![endif]-->" +
      "                                </td>" +
      "                            </tr>" +
      "                            <tr>" +
      '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
      "                                    <tr>" +
      '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
      "                                    <![endif]-->" +
      '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
      "                                        <tr>" +
      '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
      '    <tbody class="mcnTextBlockOuter">' +
      "        <tr>" +
      '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
      "              	<!--[if mso]>" +
      '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
      "				<tr>" +
      "				<![endif]-->" +
      "			    " +
      "				<!--[if mso]>" +
      '				<td valign="top" width="600" style="width:600px;">' +
      "				<![endif]-->" +
      '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
      "                    <tbody><tr>" +
      "                        " +
      '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
      "                        " +
      '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
      "" +
      '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "	<tbody>" +
      "		<tr>" +
      '			<td valign="top">' +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top">' +
      '						<div style="text-align: justify;">' +
      "						<h3><strong>Appointment booked.</strong></h3>" +
      "" +
      "						<div>&nbsp;</div>" +
      "" +
      '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "							<tbody>" +
      "								<tr>" +
      '									<td valign="top">' +
      '									<div><span style="font-size:14px"><a href="https://www.imastudent.com/order/history">Dear ' +
      userFirstName +
      " " +
      userLastName +
      ",</a></span></div>" +
      "" +
      '									<div style="text-align: justify;"><span style="font-size:14px">You&nbsp;have an appointment&nbsp;with Dr.' +
      doctorFirstName +
      " " +
      doctorLastName +
      "&nbsp;<br>" +
      '	<div style="text-align: justify;"><strong>Appointment Date:</strong>&nbsp;' +
      appointmentDate +
      "&nbsp;<br>" +
      "						<strong>Start Time:</strong>" +
      startTime +
      "<br>" +
      "						<strong>End Time: </strong>" +
      endTime +
      "" +
      '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "										<tbody>" +
      "											<tr>" +
      '												<td style="text-align: justify;" valign="top">&nbsp;</td>' +
      "											</tr>" +
      "											<tr>" +
      '												<td valign="top">' +
      '												<div style="text-align: justify;"><span style="font-size:14px">Thank you.</span><br>' +
      "												H-Cura</div>" +
      "												</td>" +
      "											</tr>" +
      "										</tbody>" +
      "									</table>" +
      "									</td>" +
      "								</tr>" +
      "							</tbody>" +
      "						</table>" +
      "						</div>" +
      "						</td>" +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "			</td>" +
      "		</tr>" +
      "	</tbody>" +
      "</table>" +
      "" +
      "                        </td>" +
      "                    </tr>" +
      "                </tbody></table>" +
      "				<!--[if mso]>" +
      "				</td>" +
      "				<![endif]-->" +
      "                " +
      "				<!--[if mso]>" +
      "				</tr>" +
      "				</table>" +
      "				<![endif]-->" +
      "            </td>" +
      "        </tr>" +
      "    </tbody>" +
      "</table></td>" +
      "                                        </tr>" +
      "                                    </table>" +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      "                                    </td>" +
      "                                    </tr>" +
      "                                    </table>" +
      "                                    <![endif]-->" +
      "                                </td>" +
      "                            </tr>" +
      "                            <tr>" +
      '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
      "                                    <tr>" +
      '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
      "                                    <![endif]-->" +
      '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
      "                                        <tr>" +
      '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
      '    <tbody class="mcnTextBlockOuter">' +
      "        <tr>" +
      '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
      "              	<!--[if mso]>" +
      '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
      "				<tr>" +
      "				<![endif]-->" +
      "			    " +
      "				<!--[if mso]>" +
      '				<td valign="top" width="600" style="width:600px;">' +
      "				<![endif]-->" +
      '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
      "                    <tbody><tr>" +
      "                        " +
      '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
      "                        " +
      '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "	<tbody>" +
      "		<tr>" +
      '			<td valign="top">' +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top">Follow Us.</td>' +
      "					</tr>" +
      "					<tr>" +
      '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "" +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top">&nbsp;</td>' +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "" +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
      "				</tr>" +
      "				</tbody>" +
      "			</table>" +
      "			</td>" +
      "		</tr>" +
      "	</tbody>" +
      "</table>" +
      "&nbsp;" +
      "" +
      '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "	<tbody>" +
      "		<tr>" +
      '			<td valign="top">' +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top">Contact us.</td>' +
      "					</tr>" +
      "					<tr>" +
      '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
      "					</tr>" +
      "					<tr>" +
      '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "" +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top">&nbsp;</td>' +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "" +
      '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
      "				<tbody>" +
      "					<tr>" +
      '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
      "					</tr>" +
      "					<tr>" +
      '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
      "					</tr>" +
      "					<tr>" +
      '						<td valign="top">' +
      '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
      "						</td>" +
      "					</tr>" +
      "				</tbody>" +
      "			</table>" +
      "			</td>" +
      "		</tr>" +
      "	</tbody>" +
      "</table>" +
      "" +
      "                        </td>" +
      "                    </tr>" +
      "                </tbody></table>" +
      "				<!--[if mso]>" +
      "				</td>" +
      "				<![endif]-->" +
      "                " +
      "				<!--[if mso]>" +
      "				</tr>" +
      "				</table>" +
      "				<![endif]-->" +
      "            </td>" +
      "        </tr>" +
      "    </tbody>" +
      "</table></td>" +
      "                                        </tr>" +
      "                                    </table>" +
      "                                    <!--[if (gte mso 9)|(IE)]>" +
      "                                    </td>" +
      "                                    </tr>" +
      "                                    </table>" +
      "                                    <![endif]-->" +
      "                                </td>" +
      "                            </tr>" +
      "                        </table>" +
      "                        <!-- // END TEMPLATE -->" +
      "                    </td>" +
      "                </tr>" +
      "            </table>" +
      "        </center>" +
      '    <script type="text/javascript"  src="/SqU9An95f4gdXe0gUYIr/ODh9btwSEaL5/DFxcZFd6PAI/R2/ZxPB9GPwsB"></script></body>' +
      "</html>"
    );
  };

  async appointmentBookedEmailToDoctor(
    docFirstName,
    firstName,
    appointmentDate,
    startTime,
    endTime) {
    return (
      "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>New appointment has been scheduled !</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        docFirstName +
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">A new appointment has been scheduled, with ' +
        "</td>" +
        firstName +
        "&nbsp;<br>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Appointment Date:</strong>&nbsp;' +
        appointmentDate +
        "&nbsp;<br>" +
        "						<strong>Start Time:</strong>" +
        startTime +
        "<br>" +
        "						<strong>End Time: </strong>" +
        endTime +
        "<br>" +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
    );
  };

  async tempAppointmentBookedEmailToAdmin(bookedDetails, docDetails) {
      let appointmentDate = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("YYYY-MM-DD");
        let startTime = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("hh:mm A");
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>New Temporary appointment has been scheduled !</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        // docName +
        "Admin Team"+
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">A new Temporary appointment has been scheduled, with DR.' +
        docDetails.firstName +
        "</td>" +
        "&nbsp;<br>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Appointment Date:</strong>&nbsp;' +
        appointmentDate +
        "&nbsp;<br>" +
        "						<strong>Start Time:</strong>" +
        startTime +
        "<br>" +
        "						<strong>Patient Name: </strong>" +
        bookedDetails.firstName +
        "<br>" +
        "						<strong>Patient Mobile Number: </strong>" +
        bookedDetails.phoneNumber +
        "<br>" +
        "<br>" +
        "						<strong>Patient Complaint: </strong>" +
        bookedDetails.complaint +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
      );
  };

  async appointmentConformedEmailToPT(bookedDetails) {
      let appointmentDate = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("YYYY-MM-DD");
        let startTime = moment(bookedDetails.appointmentDate)
          .tz(constants.defaultTimezone)
          .format("hh:mm A");
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>Your appointment has been scheduled !</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        bookedDetails.firstName +
        bookedDetails.lastName +
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">Your appointment has been scheduled, with DR.' +
        bookedDetails.docFirstName +
        "</td>" +
        "&nbsp;<br>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Appointment Date:</strong>&nbsp;' +
        appointmentDate +
        "&nbsp;<br>" +
        "						<strong>Start Time:</strong>" +
        startTime +
        "<br>" +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
      );
  };

  async sendPackagePaymentSuccess(
      userName,
      emailId,
      amount,
      translationId,
      paymentMethod,
      packageName
    ) {
      let date = moment().format("DD MMMM YYYY");
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>Payment Successful</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        userName +
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">Your payment with H-Cura is successful.<br>' +
        "						&nbsp;</td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Transaction Number:</strong>&nbsp;' +
        translationId +
        "&nbsp;<br>" +
        "						<strong>Payment Date:</strong>" +
        date +
        "<br>" +
        "						<strong>Package Details:</strong>" +
        packageName +
        "<br>" +
        "						<strong>Amount: </strong>" +
        amount +
        "<br>" +
        "						<strong>Payment Method: </strong>" +
        paymentMethod +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
      );
  };

  async sendHomeoPaymentSuccess(
      userName,
      emailId,
      amount,
      translationId,
      paymentMethod,
      items
    ) {
      let date = moment().format("DD MMMM YYYY");
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0B422D;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;"><strong>Payment Successful</strong></h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td style="text-align: justify;" valign="top">&nbsp;</td>' +
        "		</tr>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top"><a href="https://www.imastudent.com/order/history">Dear ' +
        userName +
        ",</a></td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td style="text-align: justify;" valign="top">Your payment with H-Cura is successful.<br>' +
        "						&nbsp;</td>" +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;"><strong>Transaction Number:</strong>&nbsp;' +
        translationId +
        "&nbsp;<br>" +
        "						<strong>Payment Date:</strong>" +
        date +
        "<br>" +
        "						<strong>Items :</strong>" +
        items +
        "<br>" +
        "						<strong>Amount: </strong>" +
        amount +
        "<br>" +
        "						<strong>Payment Method: </strong>" +
        paymentMethod +
        "</div>" +
        "" +
        '						<div style="text-align: justify;">&nbsp;</div>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Follow Us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="https://www.facebook.com/H.CuraApp/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp; &nbsp;<a href=" https://www.linkedin.com/company/h-cura"><img alt="Linkedin" height="18" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp; &nbsp;<a href=" https://instagram.com/h.curaapp?utm_medium=copy_link"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a></td>' +
        "				</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "&nbsp;" +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">Contact us.</td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">H-CURA PRIVATE LIMITED </td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a>Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">&nbsp;</td>' +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "" +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top"><a href="tel:8870001377">Phone No: +91 8870001377</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top"><a href="mailto:admin@h-cura.com">admin@h-cura.com</a></td>' +
        "					</tr>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        "    </body>" +
        "</html>"
      );
  };

  async sendMailToPtFormFilled(name, formId) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        "															<br>" +
        "Hi Dear &nbsp;" +
        name +
        "<br>" +
        "<strong>Reference No:</strong>&nbsp;" +
        formId +
        "<br>" +
        "Thanks for submitting the details, with H-CURA Family! <br>" +
        "<br>" +
        "Our team will review your Health condition and get back to you soon through WhatsApp.&nbsp;" +
        "<br>" +
        "<strong>Thanks & Regrads</strong>&nbsp;" +
        "<br>" +
        "<strong>H-CURA TEAM</strong>&nbsp;" +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendApptFormPtDetailsRequest(
      name, age, phoneNo, whatsAppNo,
      emailId, gender, state, consultationType,
      message, branch, formId, concern ) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												<h3><strong>New Patient Details.</strong></h3>" +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        '															<td valign="top">Dear Admin<a href="https://www.imastudent.com/order/history">,</a><br>' +
        "Patient details recieved successfully, Please Reach out as soon as possible.<br>" +
        "															<br>" +
        "															<strong>Patient name:</strong>&nbsp;" +
        name +
        "<br>" +
        "															<strong>Patient Age:</strong>&nbsp;" +
        age +
        "<br>" +
        "															<strong>Patient Phone No:</strong>&nbsp;" +
        phoneNo +
        "<br>" +
        "															<strong>Patient WhatsApp No:</strong>&nbsp;" +
        whatsAppNo +
        "<br>" +
        "															<strong>Patient EmailId:</strong>&nbsp;" +
        emailId +
        "<br>" +
        "															<strong>Gender:</strong>&nbsp;" +
        gender +
        "<br>" +
        "															<strong>Patient State:</strong>&nbsp;" +
        state +
        "<br>" +
        "															<strong>Consultation Type:</strong>&nbsp;" +
        consultationType +
        "<br>" +
        "															<strong>Concern:</strong>&nbsp;" +
        concern +
        "<br>" +
        "															<strong>Branch:</strong>&nbsp;" +
        branch +
        "<br>" +
        "															<strong>Patient Health condition:</strong>&nbsp;" +
        message +
        "<br>" +
        "															<strong>Reference No:</strong>&nbsp;" +
        formId +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendContactUsInfoRequest(name, emailId, phoneNo, city, comment, contactId) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												<h3><strong>Contact Us Form Submited ⚠️ .</strong></h3>" +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        '															<td valign="top">Dear Admin<a href="https://www.imastudent.com/order/history">,</a><br>' +
        "Please Look into this Comment as soon as possible.<br>" +
        "															<br>" +
        "															<strong>Name:</strong>&nbsp;" +
        name +
        "<br>" +
        "															<strong>Phone No:</strong>&nbsp;" +
        phoneNo +
        "<br>" +
        "															<strong>EmailId:</strong>&nbsp;" +
        emailId +
        "<br>" +
        "															<strong>City:</strong>&nbsp;" +
        city +
        "<br>" +
        "															<strong>Comment:</strong>&nbsp;" +
        comment +
        "<br>" +
        "															<strong>Reference No:</strong>&nbsp;" +
        contactId +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendMailToContactUsFormFilled(name, contactId) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        "															<br>" +
        "Hi Dear &nbsp;" +
        name +
        "<br>" +
        "<strong>Reference No:</strong>&nbsp;" +
        contactId +
        "<br>" +
        "Thanks for submitting the Form, with H-CURA Family! <br>" +
        "<br>" +
        "Our team will review your Comment and will get back to you soon.&nbsp;" +
        "<br>" +
        "<strong>Thanks & Regrads</strong>&nbsp;" +
        "<br>" +
        "<strong>H-CURA TEAM</strong>&nbsp;" +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendCorporateInfoRequest(
      name, workEmail, phoneNo, companyName, companySize, 
      prefferedDate, street, city, state, zipcode, corporateId) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												<h3><strong>Corporate Form Submited 🏢.</strong></h3>" +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        '															<td valign="top">Dear Admin<a href="https://www.imastudent.com/order/history">,</a><br>' +
        "Please Look into this Corporate / Apartment Details as soon as possible.<br>" +
        "															<br>" +
        "															<strong>Name:</strong>&nbsp;" +
        name +
        "<br>" +
        "															<strong>Phone No:</strong>&nbsp;" +
        phoneNo +
        "<br>" +
        "															<strong>Work Email:</strong>&nbsp;" +
        workEmail +
        "<br>" +
        "															<strong>Company / Appartment Name:</strong>&nbsp;" +
        companyName +
        "<br>" +
        "															<strong>Company / Appartment Size:</strong>&nbsp;" +
        companySize +
        "<br>" +
        "															<strong>Preffered Date:</strong>&nbsp;" +
        prefferedDate +
        "<br>" +
        "															<strong>Street:</strong>&nbsp;" +
        street +
        "<br>" +
        "															<strong>City:</strong>&nbsp;" +
        city +
        "<br>" +
        "															<strong>State:</strong>&nbsp;" +
        state +
        "<br>" +
        "															<strong>Zipcode:</strong>&nbsp;" +
        zipcode +
        "<br>" +
        "															<strong>Reference No:</strong>&nbsp;" +
        corporateId +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendMailToCorporateFormFilled(name, companyName, corporateId) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        "															<br>" +
        "Hi Dear &nbsp;" +
        name +
        "<br>" +
        "<strong>Company / Appartment Name:</strong>&nbsp;" +
        companyName +
        "<br>" +
        "<strong>Reference Id:</strong>&nbsp;" +
        corporateId +
        "<br>" +
        "Thanks for submitting the Details, with H-CURA Family! <br>" +
        "<br>" +
        "Our team will get back to you as soon as Possible For Conducting Camp.&nbsp;" +
        "<br>" +
        "<strong>Thanks & Regrads</strong>&nbsp;" +
        "<br>" +
        "<strong>H-CURA TEAM</strong>&nbsp;" +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

  async sendOfferFormPtDetailsRequest(name, emailId, phoneNo, state, couponCode, offerId ) {
      return (
        "<!doctype html>" +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        "    <head>" +
        "        <!-- NAME: SELL PRODUCTS -->" +
        "        <!--[if gte mso 15]>" +
        "        <xml>" +
        "            <o:OfficeDocumentSettings>" +
        "            <o:AllowPNG/>" +
        "            <o:PixelsPerInch>96</o:PixelsPerInch>" +
        "            </o:OfficeDocumentSettings>" +
        "        </xml>" +
        "        <![endif]-->" +
        '        <meta charset="UTF-8">' +
        '        <meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '        <meta name="viewport" content="width=device-width, initial-scale=1">' +
        "        <title>*|MC:SUBJECT|*</title>" +
        "        " +
        '    <style type="text/css">' +
        "		p{" +
        "			margin:10px 0;" +
        "			padding:0;" +
        "		}" +
        "		table{" +
        "			border-collapse:collapse;" +
        "		}" +
        "		h1,h2,h3,h4,h5,h6{" +
        "			display:block;" +
        "			margin:0;" +
        "			padding:0;" +
        "		}" +
        "		img,a img{" +
        "			border:0;" +
        "			height:auto;" +
        "			outline:none;" +
        "			text-decoration:none;" +
        "		}" +
        "		body,#bodyTable,#bodyCell{" +
        "			height:100%;" +
        "			margin:0;" +
        "			padding:0;" +
        "			width:100%;" +
        "		}" +
        "		.mcnPreviewText{" +
        "			display:none !important;" +
        "		}" +
        "		#outlook a{" +
        "			padding:0;" +
        "		}" +
        "		img{" +
        "			-ms-interpolation-mode:bicubic;" +
        "		}" +
        "		table{" +
        "			mso-table-lspace:0pt;" +
        "			mso-table-rspace:0pt;" +
        "		}" +
        "		.ReadMsgBody{" +
        "			width:100%;" +
        "		}" +
        "		.ExternalClass{" +
        "			width:100%;" +
        "		}" +
        "		p,a,li,td,blockquote{" +
        "			mso-line-height-rule:exactly;" +
        "		}" +
        "		a[href^=tel],a[href^=sms]{" +
        "			color:inherit;" +
        "			cursor:default;" +
        "			text-decoration:none;" +
        "		}" +
        "		p,a,li,td,body,table,blockquote{" +
        "			-ms-text-size-adjust:100%;" +
        "			-webkit-text-size-adjust:100%;" +
        "		}" +
        "		.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{" +
        "			line-height:100%;" +
        "		}" +
        "		a[x-apple-data-detectors]{" +
        "			color:inherit !important;" +
        "			text-decoration:none !important;" +
        "			font-size:inherit !important;" +
        "			font-family:inherit !important;" +
        "			font-weight:inherit !important;" +
        "			line-height:inherit !important;" +
        "		}" +
        "		.templateContainer{" +
        "			max-width:600px !important;" +
        "		}" +
        "		a.mcnButton{" +
        "			display:block;" +
        "		}" +
        "		.mcnImage,.mcnRetinaImage{" +
        "			vertical-align:bottom;" +
        "		}" +
        "		.mcnTextContent{" +
        "			word-break:break-word;" +
        "		}" +
        "		.mcnTextContent img{" +
        "			height:auto !important;" +
        "		}" +
        "		.mcnDividerBlock{" +
        "			table-layout:fixed !important;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 1" +
        "	@style heading 1" +
        "	*/" +
        "		h1{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:40px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 2" +
        "	@style heading 2" +
        "	*/" +
        "		h2{" +
        "			/*@editable*/color:#222222;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:34px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 3" +
        "	@style heading 3" +
        "	*/" +
        "		h3{" +
        "			/*@editable*/color:#444444;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:22px;" +
        "			/*@editable*/font-style:normal;" +
        "			/*@editable*/font-weight:bold;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Page" +
        "	@section Heading 4" +
        "	@style heading 4" +
        "	*/" +
        "		h4{" +
        "			/*@editable*/color:#949494;" +
        "			/*@editable*/font-family:Georgia;" +
        "			/*@editable*/font-size:20px;" +
        "			/*@editable*/font-style:italic;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/line-height:125%;" +
        "			/*@editable*/letter-spacing:normal;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Container Style" +
        "	*/" +
        "		#templateHeader{" +
        "			/*@editable*/background-color:#F7F7F7;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Interior Style" +
        "	*/" +
        "		.headerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Text" +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Header" +
        "	@section Header Link" +
        "	*/" +
        "		.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Container Style" +
        "	*/" +
        "		#templateBody{" +
        "			/*@editable*/background-color:#FFFFFF;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:36px;" +
        "			/*@editable*/padding-bottom:45px;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Interior Style" +
        "	*/" +
        "		.bodyContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Text" +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/color:#757575;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:16px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:left;" +
        "		}" +
        "	/*" +
        "	@tab Body" +
        "	@section Body Link" +
        "	*/" +
        "		.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#007C89;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Style" +
        "	*/" +
        "		#templateFooter{" +
        "			/*@editable*/background-color:#0b422d;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:45px;" +
        "			/*@editable*/padding-bottom:63px;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Interior Style" +
        "	*/" +
        "		.footerContainer{" +
        "			/*@editable*/background-color:transparent;" +
        "			/*@editable*/background-image:none;" +
        "			/*@editable*/background-repeat:no-repeat;" +
        "			/*@editable*/background-position:center;" +
        "			/*@editable*/background-size:cover;" +
        "			/*@editable*/border-top:0;" +
        "			/*@editable*/border-bottom:0;" +
        "			/*@editable*/padding-top:0;" +
        "			/*@editable*/padding-bottom:0;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Text" +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-family:Helvetica;" +
        "			/*@editable*/font-size:12px;" +
        "			/*@editable*/line-height:150%;" +
        "			/*@editable*/text-align:center;" +
        "		}" +
        "	/*" +
        "	@tab Footer" +
        "	@section Footer Link" +
        "	*/" +
        "		.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{" +
        "			/*@editable*/color:#FFFFFF;" +
        "			/*@editable*/font-weight:normal;" +
        "			/*@editable*/text-decoration:underline;" +
        "		}" +
        "	@media only screen and (min-width:768px){" +
        "		.templateContainer{" +
        "			width:600px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body,table,td,p,a,li,blockquote{" +
        "			-webkit-text-size-adjust:none !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		body{" +
        "			width:100% !important;" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnRetinaImage{" +
        "			max-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImage{" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{" +
        "			max-width:100% !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnBoxedTextContentContainer{" +
        "			min-width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupContent{" +
        "			padding:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{" +
        "			padding-top:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{" +
        "			padding-top:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardBottomImageContent{" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockInner{" +
        "			padding-top:0 !important;" +
        "			padding-bottom:0 !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageGroupBlockOuter{" +
        "			padding-top:9px !important;" +
        "			padding-bottom:9px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnTextContent,.mcnBoxedTextContentColumn{" +
        "			padding-right:18px !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{" +
        "			padding-right:18px !important;" +
        "			padding-bottom:0 !important;" +
        "			padding-left:18px !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "		.mcpreview-image-uploader{" +
        "			display:none !important;" +
        "			width:100% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 1" +
        "	@tip Make the first-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h1{" +
        "			/*@editable*/font-size:30px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 2" +
        "	@tip Make the second-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h2{" +
        "			/*@editable*/font-size:26px !important;" +
        "			/*@editable*/line-height:125% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 3" +
        "	@tip Make the third-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h3{" +
        "			/*@editable*/font-size:20px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Heading 4" +
        "	@tip Make the fourth-level headings larger in size for better readability on small screens." +
        "	*/" +
        "		h4{" +
        "			/*@editable*/font-size:18px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Boxed Text" +
        "	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Header Text" +
        "	@tip Make the header text larger in size for better readability on small screens." +
        "	*/" +
        "		.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Body Text" +
        "	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px." +
        "	*/" +
        "		.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:16px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}	@media only screen and (max-width: 480px){" +
        "	/*" +
        "	@tab Mobile Styles" +
        "	@section Footer Text" +
        "	@tip Make the footer content text larger in size for better readability on small screens." +
        "	*/" +
        "		.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{" +
        "			/*@editable*/font-size:14px !important;" +
        "			/*@editable*/line-height:150% !important;" +
        "		}" +
        "" +
        "}</style></head>" +
        "    <body>" +
        "        <center>" +
        '            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">' +
        "                <tr>" +
        '                    <td align="center" valign="top" id="bodyCell">' +
        "                        <!-- BEGIN TEMPLATE // -->" +
        '                        <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateHeader" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">' +
        '    <tbody class="mcnImageBlockOuter">' +
        "            <tr>" +
        '                <td valign="top" style="padding:9px" class="mcnImageBlockInner">' +
        '                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">' +
        "                        <tbody><tr>" +
        '                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">' +
        "                                " +
        "                                    " +
        '                                        <img align="center" alt="" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/f3d2cb25-6848-6e01-5634-a9b6bc7a24be.png" width="177.84" style="max-width: 342px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px none; border-radius: 0%;" class="mcnImage">' +
        "                                    " +
        "                                " +
        "                            </td>" +
        "                        </tr>" +
        "                    </tbody></table>" +
        "                </td>" +
        "            </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateBody" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #000000;">' +
        "                        " +
        '                            <h3 style="text-align: justify;">&nbsp;</h3>' +
        "" +
        '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<div style="text-align: justify;">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">' +
        "												<h3><strong>New Patient Details.</strong></h3>" +
        "												&nbsp;" +
        "" +
        '												<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "													<tbody>" +
        "														<tr>" +
        '															<td valign="top">Dear Admin<a href="https://www.imastudent.com/order/history">,</a><br>' +
        "Patient details recieved successfully, @ From Offer Form @, Please Reach out as soon as possible.<br>" +
        "															<br>" +
        "															<strong>Patient name:</strong>&nbsp;" +
        name +
        "<br>" +
        "															<strong>Patient EmailId:</strong>&nbsp;" +
        emailId +
        "<br>" +
        "															<strong>Patient Phone No:</strong>&nbsp;" +
        phoneNo +
        "<br>" +
        "															<strong>Patient State:</strong>&nbsp;" +
        state +
        "<br>" +
        "															<strong>Copupon Code:</strong>&nbsp;" +
        couponCode +
        "<br>" +
        "															<strong>Reference No:</strong>&nbsp;" +
        offerId +
        "</td>" +
        "														</tr>" +
        "													</tbody>" +
        "												</table>" +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</div>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                            <tr>" +
        '                                <td align="center" valign="top" id="templateFooter" data-template-container>' +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        '                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">' +
        "                                    <tr>" +
        '                                    <td align="center" valign="top" width="600" style="width:600px;">' +
        "                                    <![endif]-->" +
        '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">' +
        "                                        <tr>" +
        '                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">' +
        '    <tbody class="mcnTextBlockOuter">' +
        "        <tr>" +
        '            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">' +
        "              	<!--[if mso]>" +
        '				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">' +
        "				<tr>" +
        "				<![endif]-->" +
        "			    " +
        "				<!--[if mso]>" +
        '				<td valign="top" width="600" style="width:600px;">' +
        "				<![endif]-->" +
        '                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">' +
        "                    <tbody><tr>" +
        "                        " +
        '                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">' +
        "                        " +
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "	<tbody>" +
        "		<tr>" +
        '			<td valign="top">' +
        '			<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "				<tbody>" +
        "					<tr>" +
        '						<td valign="top">' +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Follow Us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">Should you have any questions? Feel free to contact us.</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><a href="https://www.facebook.com/imastudent.comIN/"><img alt="Facebook" height="20" src="https://imast1.blob.core.windows.net/mail/fb.png" width="20"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/studentdealz/"><img alt="Instagram" height="20" src="https://imast1.blob.core.windows.net/mail/in.png" width="21"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com" target="_blank"><img alt="Instagram" data-file-id="5508466" height="20" src="https://mcusercontent.com/5c1e5ad3cae82ee958c97f6bc/images/ddc1dd7b-9bd0-63f8-18f3-80995f9ffe7f.png" width="21"></a>&nbsp;&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						&nbsp;" +
        "" +
        '						<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "							<tbody>" +
        "								<tr>" +
        '									<td valign="top">' +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">Contact us.</td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a>H-CURA PRIVATE LIMITED&nbsp;<br>' +
        "												Sai Towers Building No:779&780 , 2nd Floor, Corporation Colony , South End Main Road , 9th Block Jayanagar , Land Mark - Opposite to Metro Pillar No 92. , Bangalore , Karnataka - 560069.</a></td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top">&nbsp;</td>' +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "" +
        '									<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
        "										<tbody>" +
        "											<tr>" +
        '												<td valign="top"><u>Phone No:&nbsp;<a href="tel:18002583138">+</a><a href="tel:18002583138">91 8870001377</a></u></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top"><a href="mailto:care@hcura.com">admin@h-cura.com</a></td>' +
        "											</tr>" +
        "											<tr>" +
        '												<td valign="top">' +
        '												<p>To stop receiving these emails, you can&nbsp;<a href="http://www.imastudent.com/contact-us" rel="noopener" target="_blank">unsubscribe</a>&nbsp;at any time.</p>' +
        "												</td>" +
        "											</tr>" +
        "										</tbody>" +
        "									</table>" +
        "									</td>" +
        "								</tr>" +
        "							</tbody>" +
        "						</table>" +
        "						</td>" +
        "					</tr>" +
        "				</tbody>" +
        "			</table>" +
        "			</td>" +
        "		</tr>" +
        "	</tbody>" +
        "</table>" +
        "" +
        "                        </td>" +
        "                    </tr>" +
        "                </tbody></table>" +
        "				<!--[if mso]>" +
        "				</td>" +
        "				<![endif]-->" +
        "                " +
        "				<!--[if mso]>" +
        "				</tr>" +
        "				</table>" +
        "				<![endif]-->" +
        "            </td>" +
        "        </tr>" +
        "    </tbody>" +
        "</table></td>" +
        "                                        </tr>" +
        "                                    </table>" +
        "                                    <!--[if (gte mso 9)|(IE)]>" +
        "                                    </td>" +
        "                                    </tr>" +
        "                                    </table>" +
        "                                    <![endif]-->" +
        "                                </td>" +
        "                            </tr>" +
        "                        </table>" +
        "                        <!-- // END TEMPLATE -->" +
        "                    </td>" +
        "                </tr>" +
        "            </table>" +
        "        </center>" +
        '    <script type="text/javascript"  src="/Kz856dBzZj/cSYq4RSu/Mv/JaOVbm8zhY/bBJnKQVZfQ/aR/Y3cSpEZjM"></script></body>' +
        "</html>"
      );
  };

}

module.exports = new MailTemplates();