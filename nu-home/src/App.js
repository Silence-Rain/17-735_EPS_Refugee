import React from 'react';
import { Layout, Divider, Button, Modal } from 'antd';
import { MainRouter } from './routes.js';

const { Footer } = Layout;

class App extends React.Component {
  state = {
    showPolicy: false,
    showContact: false
  }

  // Pop-up modal dialog for privacy policy
  policyModal = () => {
    return (
      <Modal
        title="Privacy Policy"
        visible={this.state.showPolicy}
        onOk={() => {this.setState({ showPolicy: false })}}
        onCancel={() => {this.setState({ showPolicy: false })}}
      >
        <p>nuHome (“we” or “us” or “our”) cares deeply about the safety and privacy of our users (“user” or “you”). We care so much about your privacy that all five co-founders are currently enrolled in Engineering Privacy in Software. In this privacy policy, we will describe the collection, use, and disclosure of your information when you visit our website. </p>

        <h3>What information we collect</h3>
        <p><b>User information</b> is information you provide upon registering and updating your profile on our site. This information includes a username and password, in addition to a government issued ID, if you have chosen to provide one for the verification process. User information also includes any information you choose to include on your personal profile, such as your bio. </p>
        <p><b>Location information</b> is information provided by the user during registration. The granularity of location information is a self-reported region, where region is a city or a province. Location information is not GPS information, meaning we are never collecting your precise location without your consent. </p>
        <p><b>Chat information</b> is textual information from one-on-one chat history. </p>
        <p><b>Post information</b> is considered the textual content of your post, the time it was submitted, and the status of the post as deemed by the NGO.  </p>

        <h3>How we use your information</h3>
        <p><b>User information</b> is the backbone of your account, like your username and password. If you so choose to provide a government issued ID, we will use it to verify your identity and confirm your refugee status. Such documents will be encrypted and only available to verified NGO workers for the purposes stated above, after which the ID will be deleted.</p>
        <p><b>Location information</b> is used to determine the channel in which you should be added to on nuHome, such that the location of you and fellow users is consistent with your new home.</p>
        <p><b>Chat information</b> will not be stored.</p>
        <p><b>Post information</b> will be stored for two weeks.</p>

        <h3>How we never share information</h3>
        <p>We take great pride in our ability to say that we do not share any of our user data with third parties. We do not use cookies or any other tracking technologies, like web beacons, device identifiers, or pixels.</p>

        <h3>How we store and secure information </h3>
        <p>Personally identifiable information included on the government issued ID will be encrypted and only visible to an NGO worker until the refugee user has been verified. Furthermore, we have an independent server and database, meaning we are upholding the highest security safeguards, so even if there is a security breach, the damage is mitigated. While the risk of security breach is never zero, we are committed to keeping our user information as safe and secure as possible.</p>
        
        <h3>How you can act on your information</h3>
        <p>If at any time you are interested to see what information we have from you, you may submit a Subject Access Request. </p>
        
        <h3>How you can contact us</h3>
        <p>Please do not hesitate to contact us at <a href="mailto:questions@nuhome.com">questions@nuhome.com</a> if you should have any questions about our privacy policy. </p>
      </Modal>
    )
  };

  // Pop-up modal dialog for contact info
  contactModal = () => {
    return (
      <Modal
        title="Contact Us"
        visible={this.state.showContact}
        onOk={() => {this.setState({ showContact: false })}}
        onCancel={() => {this.setState({ showContact: false })}}
      >
        <p><b>Email:</b> <a href="mailto:questions@nuhome.com">questions@nuhome.com</a></p>
        <p><b>Tel:</b> +1 (412) NU-HOME-1</p>
      </Modal>
    )
  };

  // Basic layout 
  render () {
    return (
      <div>
        <Layout>
          <MainRouter/>
          {this.policyModal()}
          {this.contactModal()}
          <Footer style={{ textAlign: 'center' }}>
            { "Copyright © EPS-Refugee 2020." }
            <Divider type="vertical" style={{ backgroundColor: "#000" }}/>
            <Button type="link" onClick={() => {this.setState({ showPolicy: true })}}>Privacy Policy</Button>
            <Divider type="vertical" style={{ backgroundColor: "#000" }}/>
            <Button type="link" onClick={() => {this.setState({ showContact: true })}}>Contact</Button>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
