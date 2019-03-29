'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
import { Container, Content, Grid, Row, Col } from 'native-base';
import styles from './styles';
import { COLORS, ICONS } from '../../constants';

const { height: deviceHeight } = Dimensions.get('window');

const ModalCondition = ({ closeModal, modalVisible }) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <Container style={styles.tncContainer}>
        <Content>
          <Grid>
            <Row style={{ height: 50, alignSelf: 'center' }}>
              <Text style={[styles.tncTitle, { marginTop: 30 }]}>
                Terms & Conditions - vediohead Tokens
              </Text>
            </Row>
            <Row style={{ height: 50, alignSelf: 'center' }}>
              <Text style={[styles.tncTitle, { marginTop: 3 }]}>
                and Rewards Programmes
              </Text>
            </Row>
            <Row style={{ marginVertical: 30 }}>
              <Col>
                <Text style={[styles.tncHeading, { marginTop: 10 }]}>
                  1. Definitions{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. &quot;Active User Account&quot; means an account on the
                  vediohead account which has not been suspended or terminated.{'\n'}
                  2. &quot;User&quot; means a natural person who has signed up
                  for a User Account on the vediohead mobile platform.{'\n'}
                  3. &quot;Document ID&quot; means the identification
                  documentation and number issued by the Government of Singapore
                  being the NRIC in the case of Singaporeans and Permanent
                  Residents and work (or other relevant) passes in the case of
                  non-Singaporeans.{'\n'}
                  4. &quot;Participating Merchant&quot; means a merchant
                  recognized by Eightyeight Solutions Pte Ltd as one who is
                  participating in the vediohead Rewards programme.{'\n'}
                  5. &quot;Tokens&quot; means the in-application currency
                  issued by Eightyeight Solutions Pte Ltd under the vediohead
                  Rewards Programme subject to these terms and conditions.{'\n'}
                  6. &quot;Working Day&quot; means any day in a week other than
                  Saturday, Sunday and gazetted public holidays in Singapore.{'\n'}
                  7. &quot;vediohead&quot; is the mobile platform application
                  owned and operated by Eightyeight Solutions Pte Ltd.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>2. Eligibility{'\n'}</Text>
                <Text style={styles.tncParagraph}>
                  1. All vediohead Users with an Active User Account are
                  eligible to participate in the vediohead Rewards Programme.{'\n'}
                  2. The following are not eligible to participate in the
                  vediohead Rewards Programme:{'\n'}
                  {'        '}1. Users who are not registered as natural persons{'\n'}
                  {'        '}in their vediohead accounts; and{'\n'}
                  {'        '}2. employees of Eightyeight Solutions Pte Ltd.{'\n'}
                  3. For each eligible vediohead user, a vediohead account needs
                  to be created and registered for the generation of vediohead
                  Tokens and the redemption of the Rewards.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>
                  3. Issuance of vediohead Tokens{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. vediohead Tokens are calculated based on internal
                  algorithms that factor in action points and time spent on the
                  platform.{'\n'}
                  2. Eightyeight Solutions Pte Ltd shall have the sole
                  discretion to change the weightage of various factors and the
                  calculation of vediohead Tokens.{'\n'}
                  3. Eightyeight Solutions Pte Ltd shall have the sole
                  discretion to change, add or remove the criteria for the
                  issuance of vediohead Tokens at any time.{'\n'}
                  4. vediohead Tokens are not refundable or exchangeable for
                  cash or token.{'\n'}
                  5. vediohead Tokens are personal to a User and are not
                  transferable, except as gifts or otherwise provided under
                  these Terms and Conditions.{'\n'}
                  6. The vediohead Tokens will be consolidated based on the
                  User’s vediohead Account.{'\n'}
                  7. Eightyeight Solutions Pte Ltd reserves the right not to
                  issue any vediohead Tokens if it deems that the User is not
                  eligible, or if it deems that the relevant conditions for
                  issue of Rewards are not met.{'\n'}
                  8. Eightyeight Solutions Pte Ltd shall be the sole determinant
                  as to the number of vediohead Tokens to be issued, and the
                  eligibility criteria of any User. In the event that vediohead
                  Tokens have been issued in excess of User’s entitlement for
                  any reason, Eightyeight Solutions Pte Ltd reserves the right
                  to cancel, withdraw or put on credit the excess vediohead
                  Tokens.{'\n'}
                  9. vediohead Tokens have been designed for exclusive use
                  within the vediohead mobile application for bidding on the
                  vediohead Rewards Programme.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>
                  4. Participation in the vediohead Rewards Programme{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. vediohead Tokens may be used to bid for such products and
                  services as set out in the vediohead Rewards catalogue,
                  subject always to availability of such products and services.{'\n'}
                  2. Eightyeight Solutions Pte Ltd reserves the right to
                  determine at its sole discretion the products and services
                  available for bidding at any point in time, and shall not be
                  obliged to replenish or replace any product or service. {'\n'}
                  3. Eightyeight Solutions Pte Ltd reserves the right to
                  determine the number of vediohead Tokens required for the
                  redemption of each redemption product and service. {'\n'}
                  4. The vediohead Rewards Programme renews on a weekly
                  schedule, beginning every Monday at 0001 hours and concluding
                  every corresponding Sunday at 2359 hours.{'\n'}
                  5. Eightyeight Solutions Pte Ltd reserves the right to adjust
                  and modify the frequency of the vediohead Rewards programme.{'\n'
                  }
                  6. Eightyeight Solutions Pte Ltd reserves the right to adjust
                  and modify the number and total value of reward items in the
                  vediohead Rewards programme.{'\n'}
                  7. All Users on the vediohead platform are eligible to bid for
                  the reward items on the vediohead Rewards programme with their
                  earned vediohead Tokens.{'\n'}
                  8. Users with the highest bids at the conclusion of the weekly
                  Rewards Programme are deemed to be the winners of the
                  corresponding Reward item.{'\n'}
                  9. Users with unsuccessful bids will have their spent
                  vediohead Tokens refunded.{'\n'}
                  10. User who is the highest bidder for a vediohead Reward item
                  must have an Active User Account at the point of redemption.{' '}
                  {'\n'}
                  11. Once a Reward bid is submitted, it cannot be cancelled,
                  modified or withdrawn.{'\n'}
                  12. Each successful Reward bid will take at least ten (10)
                  Working Days to process.{'\n'}
                  13. The redemption of vediohead Rewards may take place by way
                  of redemption vouchers issued by Eightyeight Solutions Pte
                  Ltd, and/or its business partners under the Rewards Programme.
                  Eightyeight Solutions Pte Ltd may issue redemption vouchers by
                  way of printed vouchers, emails, unique codes or such other
                  forms from time to time.{'\n'}
                  14. Winners of successful Reward bids will be contacted
                  through official vediohead accounts on the platform. User is
                  responsible for ensuring that the correct and updated contact
                  details are provided to Eightyeight Solutions Pte Ltd for the
                  receipt of redemption vouchers at the time of contact by staff
                  and representatives of Eightyeight Solutions Pte Ltd.
                  Eightyeight Solutions Pte Ltd shall not be liable to re-issue
                  any redemption vouchers which have been sent to an address
                  that is not correct or updated, or which have been lost, or
                  deleted (including deletion for spam email).{'\n'}
                  15. The redemption vouchers will be valid only for the period
                  stipulated thereon and the validity period will not be
                  extended or renewed. Any unutilised redemption or part thereof
                  will be forfeited at the stipulated expiry date.{'\n'}
                  16. All redemption vouchers are subject to the terms and
                  conditions set out thereon and such other terms and conditions
                  as may be imposed by the Participating Merchant.{'\n'}
                  17. Any redemption voucher that has been damaged, defaced or
                  expired will not be accepted.{'\n'}
                  18. If the total bill for the purchase of products or services
                  at the Participating Merchant exceeds the value of the
                  redemption voucher, User shall settle any and all outstanding
                  amounts directly with the Participating Merchant and
                  Eightyeight Solutions Pte Ltd shall have no liability for the
                  outstanding amount.{'\n'}
                  19. Redemption vouchers will be valid only for products and
                  services stated thereon are not applicable for other products,
                  services discounts and promotions, unless otherwise stated.{'\n'}
                  20. All redeemed products, whether utilized or not, may not be
                  refunded or exchanged for other Reward items in the vediohead
                  Rewards catalogue, vediohead Tokens, cash or in kind.{'\n'}
                  21. Eightyeight Solutions Pte Ltd is not responsible or liable
                  for the quality of the redemption products or services.
                  Redemption of any product or service constitutes a purchase of
                  the product or service by the User from the participating
                  merchant. Eightyeight Solutions Pte Ltd is not responsible for
                  any specification, non-performance or defects of the redeemed
                  product or service. Eightyeight Solutions Pte Ltd is not an
                  agent of the participating merchant. Any dispute regarding the
                  redemption product or service shall be resolved directly with
                  the participating merchant.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>
                  5. Redemption of vediohead Tokens for other Reward Programmes{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. vediohead Tokens may be used for redemption in other
                  participating reward programmes as specified by Eightyeight
                  Solutions Pte Ltd from time to time.{'\n'}
                  2. Eightyeight Solutions Pte Ltd shall determine in its sole
                  discretion the number of vediohead Tokens required for
                  redemption in such other stipulated programme(s).{'\n'}
                  3. Upon conversion, all terms and conditions of the stipulated
                  reward programmes will apply.{'\n'}
                  4. User accepts and acknowledges that in order for User to
                  redeem goods and/or services in other participating reward
                  programmes, the disclosure of User’s personal information
                  (including User’s name, Document ID number, and any other
                  information personal to the User which is necessary for User’s
                  participation in such other participating reward programmes)
                  will be required. User consents to such disclosure and hereby
                  authorizes Eightyeight Solutions Pte Ltd to make such
                  disclosures to the organizers of the participating reward
                  programmes.{'\n'}
                  5. Eightyeight Solutions Pte Ltd is not an agent for or an
                  organizer of such other reward programmes and shall not be
                  responsible for or liable to User thereunder. Any dispute
                  relating to the reward programmes shall be resolved between
                  the User and such organizer. However, in the event of a
                  dispute regarding the number of vediohead Tokens to which
                  User is entitled, Eightyeight Solution Pte Ltd’s records as to
                  the number of vediohead Tokens utilised shall prevail.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>
                  6. Termination, treatment and expiry of vediohead Tokens{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. vediohead Tokens do not have expiry dates.{'\n'}
                  2. Eightyeight Solutions Pte Ltd reserves the right to apply
                  time-decay mechanisms or other such algorithms to the
                  accumulation of vediohead Tokens.{'\n'}
                  3. In the event that a vediohead User Account is deleted by
                  the User, or terminated by Eightyeight Solutions Pte Ltd, all
                  vediohead Tokens will be automatically forfeited, without
                  refund or compensation.{'\n'}
                  4. In the event that the vediohead Rewards Programme is
                  terminated by Eightyeight Solutions Pte Ltd, all unutilised
                  vediohead Tokens will be forfeited automatically.{'\n'}
                </Text>
                <Text style={styles.tncHeading}>
                  7. General Provisions{'\n'}
                </Text>
                <Text style={styles.tncParagraph}>
                  1. In the event of any dispute with regards to any matter
                  pertaining to the vediohead Rewards Programme, all decisions
                  made by Eightyeight Solutions Pte Ltd shall be final and
                  conclusive.{'\n'}
                  2. By participating in the vediohead Rewards Programme, each
                  User agrees to the collection, use and disclosure of their
                  personal data, including but not limited to their name, NRIC
                  number and contact information, for the following purposes:{'\n'}
                  {'        '}1. Collection and use for administration of{'\n'}
                  {'        '}rewards program, including contacting the User{'\n'}
                  {'        '}for administrative matters via email, mail or{'\n'}
                  {'        '}phone, verification of identity, sending the User{'\n'}
                  {'        '}vouchers via email or mail, and dealing with{'\n'}
                  {'        '}redemption and collection of vouchers; and{'\n'}
                  {'        '}2. Disclosure to Rewards partners and merchants{'\n'}
                  {'        '}for verification of identity, and for administrative{'\n'}
                  {'        '}matters pertaining to redemption and collection {'\n'}
                  {'        '}of vouchers.{'\n'}
                  3. Eightyeight Solutions Pte Ltd reserves the right to amend these Terms and Conditions at any time.{'\n'}
                  4. Eightyeight Solutions Pte Ltd may terminate the vediohead
                  Rewards Programme or vary it in such manner as it deems fit at
                  any time.{'\n'}
                  5. In the event of ambiguity on the interpretation or
                  application of these terms and conditions, Eightyeight
                  Solutions Pte Ltd shall be the sole determinant on the meaning
                  and application of these terms and conditions.{'\n'}
                  6. Eightyeight Solutions Pte Ltd&apos;s General Consumers
                  Terms & Conditions within the vediohead platform, shall apply
                  and this Rewards Programme shall be deemed as a Service
                  provided by Eightyeight Solutions Pte Ltd thereunder.{'\n'}
                  7. These Terms &amp; Conditions shall be governed by and
                  construed in accordance with the laws of the Republic of
                  Singapore.{'\n'}
                </Text>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
      <View
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          top: 15,
          right: 2,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.WHITE,
          borderRadius: 15,
          borderWidth: 3,
          borderColor: COLORS.WHITE
        }}
      >
        <TouchableOpacity onPress={closeModal}>
          <Image
            style={{ alignSelf: 'flex-end', width: 25, height: 25 }}
            source={ICONS.REMOVE_ICON}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default ModalCondition;
