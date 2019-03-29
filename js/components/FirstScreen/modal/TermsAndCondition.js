import React, { PureComponent } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Grid, Col, Row } from 'native-base';
import { connect } from 'react-redux';
import { COLORS } from '../../../constants';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

class TermsAndCondition extends React.PureComponent {
  render() {
    return (
      <Grid>
        <Row style={{ alignSelf: 'center' }}>
          <Text style={styles.tncTitle}>
            END USER LICENSE AGREEMENT AND TERMS OF SERVICE
          </Text>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <Text style={styles.tncDatestamp}>
              Effective Date: August 10, 2018{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              This End User License Agreement and Terms of Service (this &quot;EULA&quot;) is a binding contract between you, an individual user (&quot;you&quot;) and Eightyeight Solutions Pte Ltd (&quot;Eightyeight Solutions&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) governing your use of the mobile software applications that Eightyeight Solutions makes available for download (individually and collectively, the &quot;App&quot;, &quot;Vediohead&quot;), the related website located at www.vediohead.com and any other online properties owned or controlled by or on behalf of Eightyeight Solutions (collectively with the App, the &quot;Service&quot;, &quot;Vediohead&quot;). BY INSTALLING OR OTHERWISE ACCESSING OR USING THE SERVICE, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS EULA. IF YOU DO NOT AGREE TO THE TERMS OF THIS EULA, THEN YOU SHOULD NOT USE THE SERVICE.{'\n'}{'\n'}
              Material Terms: As provided in greater detail in this EULA (and without limiting the express language of this EULA), you acknowledge the following:{'\n'}{'\n'}
              ● the Service is licensed, not sold, to you, and you may use the Service only as set forth in this EULA;{'\n'}{'\n'}
              ● you use the Service at your sole risk;{'\n'}{'\n'}
              ● the use of the Service may be subject to separate third-party terms of service and fees, including, without limitation, your mobile network operator&apos;s (the &quot;Carrier&quot;) terms of service and fees, including fees charged for data usage and overage, which are your sole responsibility;{'\n'}{'\n'}
              ● you consent to the collection, use, and disclosure of your personally identifiable information in accordance with Eightyeight Solutions&apos; privacy policy available at www.vediohead.com/privacy (&quot;Privacy Policy&quot;);{'\n'}{'\n'}
              ● we provide the App to you on an &quot;as is&quot; basis without warranties of any kind and Eightyeight Solutions&apos; liability to you is limited;{'\n'}{'\n'}
              ● disputes arising between you and Eightyeight Solutions will be resolved by binding arbitration. By accepting this EULA, as provided in greater detail in Section 11 below, you and Eightyeight Solutions are each waiving the right to a trial by jury or to participate in a class action;{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              1. General Terms and Conditions.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Changes to this EULA. You understand and agree that we may change this EULA at any time without prior notice. The revised EULA will become effective at the time of posting unless specified otherwise. Any use of the Service after the effective date will constitute your acceptance of such revised EULA. If you find any change to this EULA or the Service unacceptable, then your sole remedy is to stop accessing, browsing, and otherwise using the Service.{'\n'}{'\n'}
              b. Privacy Policy. Your access to and use of the Service is also subject to Eightyeight Solutions&apos; Privacy Policy, the terms and conditions of which are incorporated herein by reference.{'\n'}{'\n'}
              c. Jurisdictional Issues. The Service is controlled and operated by Eightyeight Solutions from its headquarters in Singapore. Eightyeight Solutions makes no representation that materials on the Service are appropriate, lawful, or available for use in any locations other than Singapore. Those who choose to access or use the Service from locations outside the Singapore do so on their own initiative and are responsible for compliance with local laws, if and to the extent local laws are applicable. Access to the Service from jurisdictions where the contents or practices of the Service are illegal, unauthorized, or penalized is strictly prohibited.{'\n'}{'\n'}
              d. Eligibility. The service is not for persons under the age of 13 or for any users previously suspended or removed from the service by Eightyeight Solutions. IF YOU ARE UNDER 13 YEARS OF AGE, YOU MUST NOT USE OR ACCESS THE SERVICE AT ANY TIME OR IN ANY MANNER. By accessing or using the Service, you affirm that either you are at least 18 years of age or you have been authorized to use the Service by your parent or legal guardian who is at least 18 years of age.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              2. The Service.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Description. The Service provides you with the opportunity to upload, view, moderate and comment on user-generated video clips, and the opportunity to interact with other users through Vediohead&apos;s messaging features, for your personal use.{'\n'}{'\n'}
              b. Mobile Services. The Service will be accessible via a mobile phone, tablet, or other wireless device (collectively, &quot;Mobile Services&quot;). Your Carrier&apos;s normal messaging, data, and other rates and fees will apply to your use of the Mobile Services. In addition, downloading, installing, or using certain Mobile Services may be prohibited or restricted by your Carrier, and not all Mobile Services may work with all Carriers or devices. Therefore, you are solely responsible for checking with your Carrier to determine if the Mobile Services are available for your mobile device(s), what restrictions, if any, may be applicable to your use of the Mobile Services, and how much they will cost you.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              3. Registration.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Log-In Credentials. While you may always browse the public-facing portions of the Service without registering with us, in order to enjoy the full benefits of the Service, you must download the App and register an account with us (an &quot;Account&quot;).{'\n'}{'\n'}
              b. Account Security. You are responsible for the security of your Account, and are fully responsible for all activities that occur through the use of your credentials. You may not share the credentials for your Account with any third party. You agree to notify Eightyeight Solutions immediately at hello@vediohead.com if you suspect or know of any unauthorized use of your log-in credentials or any other breach of security with respect to your Account. Eightyeight Solutions will not be liable for any loss or damage arising from unauthorized use of your credentials prior to you notifying Eightyeight Solutions of such unauthorized use or loss of your credentials.{'\n'}{'\n'}
              c. Accuracy of Information. When creating an Account, you will provide true, accurate, current, and complete information to Eightyeight Solutions. You will update the information about yourself promptly, and as necessary, to keep it current and accurate. We reserve the right to disallow, cancel, remove, or reassign certain usernames and permalinks in appropriate circumstances, as determined by us in our sole discretion, and may, with or without prior notice, suspend or terminate your Account if activities occur on your Account which, in our sole discretion, would or might constitute a violation of this EULA, cause damage to or impair the Service, infringe or violate any third party rights, damage or bring into disrepute the reputation of Eightyeight Solutions, or violate any applicable laws or regulations. If messages sent to the email address you provide are returned as undeliverable, then Eightyeight Solutions may terminate your Account immediately without notice and without any liability.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              4. Intellectual Property Rights.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. License. Subject to your complete and ongoing compliance with this Agreement, Eightyeight Solutions hereby grants you a personal, limited, revocable, non-transferable license to access and use the Service solely for your personal, non-commercial use. Eightyeight Solutions reserves all rights not expressly granted to you.{'\n'}{'\n'}
              b. Content. Except for User Content, the content that Eightyeight Solutions provides to end users on or through the Service, including without limitation, any text, graphics, photos, software, video recordings, sound recordings (and the musical works embodied therein), and interactive features, may be protected by copyright or other intellectual property rights and owned by Eightyeight Solutions or its third party licensors (collectively, the &quot;Vediohead Content&quot;). You may not copy, reproduce, upload, republish, broadcast, transmit, retransmit, post, modify, create derivative works of, publicly perform, publicly display, use for commercial purpose or distribute any materials from the Service without prior express written permission of the owner of such material or as permitted by the Service&apos;s intended functionalities. Your use of Vediohead Content must be in compliance with applicable law. Eightyeight Solutions reserves all rights on the part of its licensors; users are not permitted to infringe the rights of the copyright owners of the sound recordings included on the Service or any musical works embodied therein (collectively, &quot;Music&quot;). The unauthorized reproduction or distribution of the Music is expressly prohibited any may violated applicable law and subject you to liability for copyright infringement.{'\n'}{'\n'}
              c. Marks. Vediohead trademarks, service marks, and logos (the &quot;Eightyeight Solutions Trademarks&quot;) used and displayed on the Service are Eightyeight Solutions&apos; registered and unregistered trademarks or service marks. You may not use any Trademarks as part of a link to or from the Service without Eightyeight Solutions&apos; prior express written consent. You may not remove any Trademarks identifying the ownership or origin of any Eightyeight Solutions Content. All goodwill generated from the use of any Vediohead Trademark will inure solely to Eightyeight Solutions&apos; benefit.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              5. User Content.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Definition. &quot;User Content&quot; means any content that users upload, post or transmit (collectively, &quot;Post&quot;) to or through the Service including, without limitation, any text, comments and other works subject to protection under the laws of the Singapore or any other jurisdiction, including, but not limited to, patent, trademark, trade secret, and copyright laws, and excludes any and all Eightyeight Solutions&apos; Content.{'\n'}{'\n'}
              b. Screening User Content. Eightyeight Solutions offers end users the ability to submit User Content to or transmit User Content through the Service. Eightyeight Solutions does not pre-screen any User Content, but reserves the right to remove, disallow, block, or delete any User Content in its sole discretion. Eightyeight Solutions does not guarantee the accuracy, integrity, appropriateness, availability, or quality of any User Content, and under no circumstances will Eightyeight Solutions be liable in any way for any User Content.{'\n'}{'\n'}
              c. Licenses to User Content. While you retain ownership of any rights you may have in your User Content, you hereby grant Eightyeight Solutions an unrestricted, assignable, sublicensable, revocable, royalty-free license throughout the universe to reproduce, distribute, publicly display, communicate to the public, publicly perform (including by means of digital audio transmissions and on a through-to-the-audience basis), make available, create derivative works from, retransmit from External Sites, and otherwise exploit and use (collectively, &quot;Use&quot;) all or any part of all User Content you Post to or through the Service by any means and through any media and formats now known or hereafter developed, for the purposes of (i) advertising, marketing, and promoting Eightyeight Solutions and the Service; (ii) displaying and sharing your User Content to other users of the Service; and (iii) providing the Service as authorized by this EULA. You further grant Eightyeight Solutions a royalty-free license to use your user name, image, voice, and likeness to identify you as the source of any of your User Content. Any User Content posted by you to or through the Service or transmitted to Vediohead will be considered non-confidential and non-proprietary, and treated as such by Eightyeight Solutions, and may be used by Eightyeight Solutions in accordance with this EULA without notice to you and without any liability to Eightyeight Solutions.{'\n'}{'\n'}
              d. You Must Have Rights to the Content You Post. You represent and warrant that: (i) you own the User Content Posted by you on or through the Service or otherwise have the right to grant the license set forth in this EULA; (ii) the Posting and Use of your User Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, intellectual property rights, or any other rights of any person, including, but not limited to, the rights of any person visible in any of your User Content; (iii) the Posting of your User Content on the Service will not require us to obtain any further licenses from or pay any royalties, fees, compensation, or other amounts or provide any attribution to any third parties; and (iv) the Posting of your User Content on the Service does not result in a breach of contract between you and a third party. You agree to pay all monies owing to any person as a result of your Posting your User Content on the Service.{'\n'}{'\n'}
              e. Waiver of Rights to User Content. By Posting User Content to or through the Service, you waive any rights to prior inspection or approval of any marketing or promotional materials related to such User Content. You also waive any and all rights of privacy, publicity, or any other rights of a similar nature in connection with your User Content, or any portion thereof. To the extent any moral rights are not transferable or assignable, you hereby waive and agree never to assert any and all moral rights, or to support, maintain, or permit any action based on any moral rights that you may have in or with respect to any User Content you Post to or through the Service.{'\n'}{'\n'}
              f. Objectionable Content. You agree not to Post any User Content to the Service that is or could be interpreted to be (i) abusive, bullying, defamatory, harassing, harmful, hateful, inaccurate, infringing, libellous, objectionable, obscene, offensive, pornographic, shocking, threatening, unlawful, violent, vulgar, or in violation of any applicable laws (including laws related to speech); or (ii) promoting any product, good, or service, or bigotry, discrimination, hatred, intolerance, racism, or inciting violence (including suicide) (collectively, &quot;Objectionable Content&quot;). The Posting of any Objectionable Content may subject you to third party claims and none of the rights granted to you in this EULA may be raised as a defence against such third party claims. If you encounter any Objectionable Content on the Service, then please immediately email hello@vediohead.com. Eightyeight Solutions in its sole discretion may take any actions it deems necessary and/or appropriate against any User who Posts Objectionable Content on the Service.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              6. Restrictions on Use of the Service.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              In addition to any other restrictions set forth in this EULA, and without limiting those restrictions, when using the Service, you agree not to: make unauthorized copies or derivative works of any content made available on or through the Service; use any device, software, or routine to interfere or attempt to interfere with the proper working of the Service; attempt to decipher, decompile, disassemble, or reverse engineer any of the software or source code comprising or making up the Service; delete or alter any material Eightyeight Solutions or any other person or entity Posts on the Service; frame or link to any of the materials or information available on the Service; alter, deface, mutilate, or otherwise bypass any approved software through which the Service is made available; use any trademarks, service marks, design marks, logos, photographs, or other content belonging to Eightyeight Solutions or obtained from the Service; provide any false personal information to Eightyeight Solutions; create a new Account with Vediohead, without Eightyeight Solutions&apos; express written consent, if Eightyeight Solutions has previously disabled an Account of yours; solicit or collect personal information from other Users; disclose personal information about a third person on the Service or obtained from the Service without the consent of that person; use the Service to send emails or other communications to persons who have requested that you not send them communications; use the Service, without Eightyeight Solutions&apos; express written consent, for any commercial or unauthorized purpose, including communicating or facilitating any commercial advertisement or solicitation or spamming; or violate any applicable federal, state, or local laws or regulations or the terms of this EULA.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              7. External Sites.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              The Service may contain links to, or the ability to share information with, third party websites (&quot;External Sites&quot;). Eightyeight Solutions does not endorse any External Sites or the content made available on such External Sites. Eightyeight Solutions is not responsible for the content of any External Sites and does not make any representations regarding the content or accuracy of any materials on such External Sites. You agree that Eightyeight Solutions will have no liability to you arising from your use, engagement, exposure to, or interaction with any External Sites.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              8. Feedback. {'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              While we are continually working to develop and evaluate our own product ideas and features, we know we don&apos;t have all the answers. We therefore welcome your feedback, comments, and suggestions. If you choose to contribute by sending Eightyeight Solutions any ideas (&quot;Feedback&quot;), then regardless of what your accompanying communication may say, the following terms will apply. Accordingly, by sending Feedback to Eightyeight Solutions, you agree that: a. Eightyeight Solutions has no obligation to review, consider, or implement your Feedback, or to return to you all or part of any Feedback for any reason; b. Feedback is provided on a non-confidential basis, and Eightyeight Solutions is not under any obligation to keep any Feedback you send confidential or to refrain from using or disclosing it in any way; and c. You irrevocably grant Eightyeight Solutions perpetual and unlimited permission to Use the Feedback and derivatives thereof for any purpose and without restriction, free of charge and without attribution of any kind, including by making, using, selling, offering for sale, importing, and promoting commercial products and services that incorporate or embody Feedback, whether in whole or in part, and whether as provided or as modified.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              9. Notice and Procedure for Making Claims of Copyright or Other Intellectual Property Infringements.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Respect of Third Party Rights. Eightyeight Solutions respects the intellectual property of others and takes the protection of intellectual property very seriously, and we ask our users to do the same.{'\n'}{'\n'}
              b. Repeat Infringer Policy. Eightyeight Solutions&apos; intellectual property policy is to (i) remove or disable access to material that Eightyeight Solutions believes in good faith, upon notice from an intellectual property owner or his or her agent, is infringing the intellectual property of a third party by being made available through the Service; and (ii) remove any User Content uploaded to the Service by &quot;repeat infringers&quot;. Eightyeight Solutions considers a &quot;repeat infringer&quot; to be any user that has uploaded User Content or Feedback to or through the Service and for whom Eightyeight Solutions has received more than two takedown notices compliant with respect to such User Content or Feedback. Eightyeight Solutions has discretion, however, to terminate the Account of any user after receipt of a single notification of claimed infringement or upon Eightyeight Solutions&apos; own determination.{'\n'}{'\n'}
              c. Procedure for Reporting Claimed Infringement. If you believe that any content made available on or through the Service has been used or exploited in a manner that infringes an intellectual property right you own or control, then please promptly send a &quot;Notification of Claimed Infringement&quot; containing the following information to the Designated Agent identified below. Your Notification of Claimed Infringement may be shared by Eightyeight Solutions with the user alleged to have infringed a right you own or control, and you hereby consent to Eightyeight Solutions making such disclosure. Your communication must include substantially the following: i. A physical or electronic signature of a person authorized to act on behalf of the owner of the work(s) that has/have been allegedly infringed; ii. Identification of works or materials being infringed, or, if multiple works are covered by a single notification, then a representative list of such works; iii. Identification of the specific material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit Eightyeight Solutions to locate the material; iv. Information reasonably sufficient to permit Eightyeight Solutions to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted; v. A statement that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and vi. A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.{'\n'}{'\n'}
              d. Designated Agent Contact Information. Eightyeight Solutions&apos; designated agent for receipt of Notifications of Claimed Infringement (the &quot;Designated Agent&quot;) can be contacted at:{'\n'}{'\n'}
              Via Email: copyright@vediohead.com{'\n'}{'\n'}
              Via Mail: Eightyeight Solutions PL - Block 137 Bedok North Avenue 3 #03-182 Singapore 460137{'\n'}{'\n'}
              e. Counter Notification. If you receive a notification from Eightyeight Solutions that material made available by you on or through the Service has been the subject of a Notification of Claimed Infringement, then you will have the right to provide Eightyeight Solutions with what is called a &quot;Counter Notification.&quot; To be effective, a Counter Notification must be in writing, provided to Eightyeight Solutions&apos; Designated Agent through one of the methods identified in Section 9.d and include substantially the following information: i. A physical or electronic signature of the subscriber; ii. Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled; iii. A statement under penalty of perjury that the subscriber has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled; and iv. The subscriber&apos;s name, address, and telephone number, and a statement that the subscriber consents to the jurisdiction of Supreme Court of the Republic of Singapore for the judicial district in which the address is located, or if the subscriber&apos;s address is outside of Singapore, then for any judicial district in which Vediohead may be found, and that the subscriber will accept service of process from the person who provided notification under Section 9.d above or an agent of such person.{'\n'}{'\n'}
              f. Reposting of Content Subject to a Counter Notification. If you submit a Counter Notification to Eightyeight Solutions in response to a Notification of Claimed Infringement, then Eightyeight Solutions will promptly provide the person who provided the Notification of Claimed Infringement with a copy of your Counter Notification and inform that person that Eightyeight Solutions will replace the removed User Content or Feedback or cease disabling access to it in 10 business days, and Eightyeight Solutions will replace the removed User Content or Feedback and cease disabling access to it not less than 10, nor more than 14, business days following receipt of the Counter Notification, unless Eightyeight Solutions&apos; Designated Agent receives notice from the party that submitted the Notification of Claimed Infringement that such person has filed an action seeking a court order to restrain the user from engaging in infringing activity relating to the material on Eightyeight Solutions&apos; system or network.{'\n'}{'\n'}
              g. False Notifications of Claimed Infringement or Counter Notifications. The Copyright Act provides that: Any person who knowingly materially misrepresents under Section 26(1)(b) of the Copyright Act that material or activity is infringing, or (2) that material or activity was removed or disabled by mistake or misidentification, will be liable for any damages, including costs and attorneys&apos; fees, incurred by the alleged infringer, by any copyright owner or copyright owner&apos;s authorized licensee, or by a service provider, who is injured by such misrepresentation, as the result of Eightyeight Solutions relying upon such misrepresentation in removing or disabling access to the material or activity claimed to be infringing, or in replacing the removed material or ceasing to disable access to it.{'\n'}{'\n'}
              Eightyeight Solutions reserves the right to seek damages from any party that submits a Notification of Claimed Infringement or Counter Notification in violation of the law.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              10. Dispute Resolution.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. General. You and Eightyeight Solutions agree that any dispute arising out of or in any way related to this EULA or your use of the App, whether based in contract, tort, statute, fraud, misrepresentation, or any other legal theory, and regardless of whether a claim arises during or after the termination of this EULA, will be resolved by binding arbitration. YOU UNDERSTAND AND AGREE THAT, BY ENTERING INTO THIS EULA, YOU AND EIGHTYEIGHT SOLUTIONS ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.{'\n'}{'\n'}
              b. Exceptions. Notwithstanding Section 10.a above, nothing in this EULA will be deemed to waive, preclude, or otherwise limit the right of either party to: (i) bring an individual action in small claims court; (ii) pursue an enforcement action through the applicable federal, state, or local agency if that action is available; (iii) seek injunctive relief in aid of arbitration from a court of competent jurisdiction; or (iv) to file suit in a court of law to address an intellectual property infringement claim.{'\n'}{'\n'}
              c. Arbitrator. Any arbitration between you and Eightyeight Solutions will be governed by the International Arbitration Act (&quot;IAA&quot;) of Singapore International Arbitration Centre (&quot;SIAC&quot;), as modified by this EULA, and will be administered by the SIAC. The SIAC Rules and filing forms are available online at www.siac.org.sg. The arbitrator has exclusive authority to resolve any dispute relating to the interpretation, applicability, or enforceability of this binding arbitration agreement.{'\n'}{'\n'}
              d. Notice; Process. A party who intends to seek arbitration must first send a written notice of the dispute to the other party by Mail (&quot;Notice&quot;). Eightyeight Solutions&apos; address for Notice is: Eightyeight Solutions Pte Ltd – Block 137 Bedok North Avenue 3 #03-182 Singapore 460137, Attn: General Counsel. The Notice must: (i) describe the nature and basis of the claim or dispute; and (ii) set forth the specific relief sought (&quot;Demand&quot;). The parties will make good faith efforts to resolve the claim directly, but if the parties do not reach an agreement to do so within 30 days after the Notice is received, you or Eightyeight Solutions may commence an arbitration proceeding.{'\n'}{'\n'}
              e. No Class Actions. YOU AND EIGHTYEIGHT SOLUTIONS AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR USER OR REPRESENTATIVE PROCEEDING. Further, unless both you and Eightyeight Solutions agree otherwise, the arbitrator may not consolidate more than one person&aposs claims, and may not otherwise preside over any form of a user group representative proceeding.{'\n'}{'\n'}
              f. Modifications to this Arbitration Provision. Except as otherwise provided in this EULA, if Eightyeight Solutions makes any future change to this arbitration provision, other than a change to Eightyeight Solutions&apos; address for Notice, then you may reject the change by sending us written notice within 30 days of the change to Eightyeight Solutions&apos; address for Notice, in which case this arbitration provision, as in effect immediately prior to the changes you rejected, will continue to govern any disputes between you and Eightyeight Solutions.{'\n'}{'\n'}
              g. Enforceability. If Section 10.f above is found to be unenforceable or if the entirety of this Section 10 is found to be unenforceable, then the entirety of this Section 10 will be null and void.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              11. Limitation of Liability and Disclaimer of Warranties.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. EIGHTYEIGHT SOLUTIONS PTE LTD, ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS AND LICENSORS (COLLECTIVELY, THE &quot;EIGHTYEIGHT PARTIES&quot;) MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE SERVICE AND ANY CONTENT AVAILABLE ON THE SERVICE. THE EIGHTYEIGHT PARTIES WILL NOT BE SUBJECT TO LIABILITY FOR THE TRUTH, ACCURACY, OR COMPLETENESS OF ANY INFORMATION CONVEYED TO ANY USER, OR FOR ANY DELAYS OR INTERRUPTIONS OF THE DATA OR INFORMATION STREAM FROM WHATEVER CAUSE. AS A USER, YOU AGREE THAT YOU USE THE SERVICE AND ANY CONTENT THEREON AT YOUR OWN RISK. YOU ARE SOLELY RESPONSIBLE FOR ALL CONTENT YOU UPLOAD TO THE SERVICE.{'\n'}{'\n'}
              b. THE EIGHTYEIGHT PARTIES DO NOT WARRANT THAT THE SERVICE WILL OPERATE ERROR FREE, OR THAT THE SERVICE AND ANY CONTENT THEREON ARE FREE OF COMPUTER VIRUSES OR SIMILAR DESTRUCTIVE FEATURES. IF YOUR USE OF THE SERVICE OR ANY CONTENT THEREON RESULTS IN THE NEED FOR SERVICING OR REPLACING EQUIPMENT OR DATA, THEN NO EIGHTYEIGHT PARTY WILL BE RESPONSIBLE FOR THOSE COSTS.{'\n'}{'\n'}
              c. THE SERVICE AND ALL CONTENT THEREON ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND. ACCORDINGLY, THE EIGHTYEIGHT PARTIES DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTY RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.{'\n'}{'\n'}
              d. IN NO EVENT WILL ANY EIGHTYEIGHT PARTY BE LIABLE FOR ANY SPECIAL, INDIRECT, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION RESULTING FROM, OR IN CONNECTION WITH, THE USE OR INABILITY TO USE THE SERVICE AND ANY CONTENT THEREON, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF SUCH EIGHTYEIGHT PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. EIGHTYEIGHT SOLUTIONS&apos; LIABILITY, AND THE LIABILITY OF ANY OTHER EIGHTYEIGHT PARTIES, TO YOU OR ANY THIRD PARTIES IN ANY CIRCUMSTANCE IS LIMITED TO THE VALUE OF SINGAPORE DOLLARS $100.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              12. Third Party Disputes.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. To the fullest extent permitted by law, any dispute you have with any third party arising out of your use of the service, including, by way of example and not limitation, any Carrier, copyright owner, or other user, is directly between you and such third party, and you irrevocably release the Eightyeight Parties from any and all claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.{'\n'}{'\n'}
              b. The owners of any content licensed to Eightyeight Solutions for use on the Service are intended beneficiaries of this EULA and shall have the right to enforce this EULA against you for any unauthorized use of their content in any court of competent jurisdiction. The provisions of Section 10 do not apply to any dispute between you and a third party licensor of content to Eightyeight Solutions.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              13. Indemnification.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              To the fullest extent permitted by law, you agree to defend, indemnify, and hold harmless the Eightyeight Parties from and against any claims, actions or demands, including, without limitation, reasonable legal and accounting fees, arising or resulting from (a) your breach of this EULA; (b) your access to, use, or misuse of Vediohead Content or the Service; or (c) your User Content. Eightyeight Solutions will provide notice to you of any such claim, suit, or proceeding. Eightyeight Solutions reserves the right to assume the exclusive defence and control of any matter which is subject to indemnification under this Section. In such case, you agree to cooperate with any reasonable requests assisting Eightyeight Solutions&apos; defence of such matter at your expense.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              14. Term and Termination of the EULA.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              a. Term. As between you and Eightyeight Solutions, the Term of this EULA commences as of your first use of the Service and continues until the termination of this EULA by either you or Eightyeight Solutions.{'\n'}{'\n'}
              b. Termination. You may terminate this EULA by sending written notification to Eightyeight Solutions at hello@vediohead.com, deleting the App from your mobile device, and terminating all other uses of the Service. Eightyeight Solutions reserves the right, in its sole discretion, to restrict, suspend, or terminate this EULA and your access to all or any part of the Service at any time without prior notice or liability if you breach any provision of this EULA. Eightyeight Solutions may further terminate this EULA for any other reason upon ten (10) days&apos; notice to you using the email address associated with your Account credentials. Eightyeight Solutions reserves the right to change, suspend, or discontinue all or any part of the Service at any time without prior notice or liability.{'\n'}{'\n'}
              c. Sections 1, 3.b, 5.b, 5.c, 6.d, 6.e, 6.f, 7, 9 – 11, 12, 13.c, and 15 – 18 and all defined terms used therein will survive the termination of this EULA indefinitely.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              15. Consent to Electronic Communications.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              By using the Service, you consent to receiving certain electronic communications from us as further described in the Privacy Policy. Please read the Privacy Policy to learn more about your choices regarding our electronic communication practices.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              16. Miscellaneous.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              This EULA is governed by the substantive laws of Singapore without respect to its conflict of law provisions. You expressly agree to submit to the exclusive personal jurisdiction of the courts sitting in Singapore. You agree that no joint venture, partnership, employment, or agency relationship exists between you and Eightyeight Solutions as a result of this EULA or use of the Service. You further acknowledge that by submitting User Content, no confidential, fiduciary, contractually implied, or other relationship is created between you and Eightyeight Solutions other than pursuant to this EULA. If any provision of this EULA is found to be invalid by any court having competent jurisdiction, the invalidity of such provision will not affect the validity of the remaining provisions of this EULA, which will remain in full force and effect. Failure of Eightyeight Solutions to act on or enforce any provision of this EULA will not be construed as a waiver of that provision or any other provision in this EULA. No waiver will be effective against Eightyeight Solutions unless made in writing, and no such waiver will be construed as a waiver in any other or subsequent instance. Except as expressly agreed by Eightyeight Solutions and you, this EULA constitutes the entire agreement between you and Eightyeight Solutions with respect to the subject matter hereof, and supersedes all previous or contemporaneous agreements, whether written or oral, between the parties with respect to the subject matter herein. The Section headings are provided merely for convenience and will not be given any legal import. This EULA will inure to the benefit of our successors and assigns. You may not assign this EULA or any of the rights or licenses granted hereunder, directly or indirectly, without the prior express written consent of Eightyeight Solutions. This means that in the event you dispose of any device on which you have installed the App, such as by sale or gift, you are responsible for deleting the App and any Vediohead Content from your device prior to such disposition. Eightyeight Solutions may assign this EULA, including all its rights hereunder, without restriction.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              17. Contact Us.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              You may contact us in connection with your use of the Service by mail at Eightyeight Solutions - Block 137 Bedok North Avenue 3 #03-182 Singapore 460137, and by email at hello@vediohead.com.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              18. Open Source Software.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              The App contains certain open source software. Each item of open source software is subject to its own applicable license terms.{'\n'}{'\n'}
            </Text>
            <Text style={styles.tncHeading}>
              NOTICE REGARDING APPLE.{'\n'}
            </Text>
            <Text style={styles.tncParagraph}>
              You acknowledge that this EULA is between you and Eightyeight Solutions only, not with Apple, and Apple is not responsible for the App or the content thereof. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App. Apple is not responsible for addressing any claims by you or any third party relating to the App or your possession and/or use of the App, including, but not limited to: (i) product liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection or similar legislation. Apple is not responsible for the investigation, defence, settlement, and discharge of any third party claim that the App or your possession and use of the App infringes that third party&apos;s intellectual property rights. You agree to comply with any applicable third party terms, when using the App. Apple, and Apple&apos;s subsidiaries, are third party beneficiaries of this EULA, and upon your acceptance of this EULA, Apple will have the right (and will be deemed to have accepted the right) to enforce this EULA against you as a third party beneficiary of this EULA. You hereby represent and warrant that (i) you are not located in a country that is subject to a Singapore Government embargo, or that has been designated by the Singapore Government as a &quot;terrorist supporting&quot; country; and (ii) you are not listed on any Singapore Government list of prohibited or restricted parties. If Eightyeight Solutions provides a translation of the English language version of this EULA, the translation is provided solely for convenience, and the English version will prevail.{'\n'}{'\n'}{'\n'}
            </Text>
            <Button
              style={styles.tncConfirmationButton}
              onPress={this.props.onAgree}
            >
              <Text style={styles.tncConfirmation}>
                I agree to the Terms & Conditions
              </Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  tncTitle: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    textAlign: 'center'
  },
  tncDatestamp: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 20,
    marginHorizontal: 20
  },
  tncHeading: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    fontWeight: '700',
    marginHorizontal: 20
  },
  tncParagraph: {
    color: COLORS.WHITE,
    fontFamily: 'avenir',
    fontSize: 12,
    marginHorizontal: 20,
    justifyContent: 'space-around',
    textAlign: 'justify'
  },
  tncConfirmationButton: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    justifyContent: 'center',
    width: deviceWidth / 2,
    marginBottom: 100,
    alignSelf: 'center'
  },
  tncConfirmation: {
    fontFamily: 'avenir',
    color: COLORS.WHITE,
    fontSize: 15 * deviceHeight / 736,
    textAlign: 'center'
  }
};

export default TermsAndCondition;
