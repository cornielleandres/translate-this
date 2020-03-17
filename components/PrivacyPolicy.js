import React, { Component }	from 'react';
import {
	Animated,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

import SubHeader			from './SubHeader.js';

export default class PrivacyPolicy extends Component {
	state = { springAnim: new Animated.Value(50) };
	render() {
		const { togglePrivacyPolicy } = this.props;
		const { springAnim } = this.state;
		return(
			<View style = {[ styles.mainView, { paddingTop: Constants.statusBarHeight } ]}>
				<Animated.View
					style = {[ styles.policyView, { transform: [{ translateX: springAnim }] } ]}
				>
					<SubHeader
						headerText = { 'Privacy Policy' }
						headerCloseFunc = { togglePrivacyPolicy }
						textColor = { 'black' }
					/>

					<ScrollView
						style = { styles.policy }
						contentContainerStyle = { styles.policyContent }
					>
						<Text style = { styles.paragraph }>
							Carlos Vargas built the Translate This! app as an Open Source app. This SERVICE is provided by Carlos Vargas at no cost and is intended for use as is.
						</Text>

						<Text style = { styles.paragraph }>
							This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.
						</Text>

						<Text style = { styles.paragraph }>
							If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.
						</Text>

						<Text style = { styles.paragraph }>
							The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Translate This! unless otherwise defined in this Privacy Policy.
						</Text>

						<Text style = { styles.header }>Information Collection and Use</Text>

						<Text style = { styles.paragraph }>
							For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.
						</Text>

						<Text style = { styles.paragraph }>
							The app does use third party services that may collect information used to identify you.
						</Text>

						<Text style = { styles.paragraph }>
							Link to privacy policy of third party service providers used by the app:
						</Text>

						<View style = {[ styles.linkList, styles.paragraph ]}>
							<TouchableOpacity
								style = { styles.link }
								onPress = { () => this._goTo('https://policies.google.com/privacy') }
							>
								<Text style = { styles.linkText }>Google Play Services</Text>
							</TouchableOpacity>
						</View>

						<Text style = { styles.header }>Log Data</Text>

						<Text style = { styles.paragraph }>
							I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.
						</Text>

						<Text style = { styles.header }>Cookies</Text>

						<Text style = { styles.paragraph }>
							Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
						</Text>

						<Text style = { styles.paragraph }>
							This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
						</Text>

						<Text style = { styles.header }>Service Providers</Text>

						<Text style = { styles.paragraph }>
							I may employ third-party companies and individuals due to the following reasons:
						</Text>

						<View style = {[ styles.bulletList, styles.paragraph ]}>
							<View style = { styles.row }>
								<View style = { styles.bulletView }>
									<Text style = { styles.bullet }>{ '\u2022' }</Text>
								</View>

								<View style = { styles.bulletTextView }>
									<Text style = { styles.bulletText }>
										To facilitate our Service;
									</Text>
								</View>
							</View>

							<View style = { styles.row }>
								<View style = { styles.bulletView }>
									<Text style = { styles.bullet }>{ '\u2022' }</Text>
								</View>

								<View style = { styles.bulletTextView }>
									<Text style = { styles.bulletText }>
										To provide the Service on our behalf;
									</Text>
								</View>
							</View>

							<View style = { styles.row }>
								<View style = { styles.bulletView }>
									<Text style = { styles.bullet }>{ '\u2022' }</Text>
								</View>

								<View style = { styles.bulletTextView }>
									<Text style = { styles.bulletText }>
										To perform Service-related services; or
									</Text>
								</View>
							</View>

							<View style = { styles.row }>
								<View style = { styles.bulletView }>
									<Text style = { styles.bullet }>{ '\u2022' }</Text>
								</View>

								<View style = { styles.bulletTextView }>
									<Text style = { styles.bulletText }>
										To assist us in analyzing how our Service is used.
									</Text>
								</View>
							</View>
						</View>

						<Text style = { styles.paragraph }>
							I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
						</Text>

						<Text style = { styles.header }>Security</Text>

						<Text style = { styles.paragraph }>
							I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.
						</Text>

						<Text style = { styles.header }>Links to Other Sites</Text>

						<Text style = { styles.paragraph }>
							This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
						</Text>

						<Text style = { styles.header }>Children’s Privacy</Text>

						<Text style = { styles.paragraph }>
							These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.
						</Text>

						<Text style = { styles.header }>Changes to This Privacy Policy</Text>

						<Text style = { styles.paragraph }>
							I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
						</Text>

						<Text style = { styles.header }>Contact Us</Text>

						<Text style = { styles.paragraph }>
							If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at cornielleandres@gmail.com.
						</Text>

						<Text>This privacy policy page was created at</Text>

						<View style = {[ styles.linkList, styles.paragraph ]}>
							<TouchableOpacity
								style = { styles.link }
								onPress = { () => this._goTo('https://www.privacypolicytemplate.net/') }
							>
								<Text style = { styles.linkText }>privacypolicytemplate.net</Text>
							</TouchableOpacity>
						</View>

						<Text>and modified/generated by</Text>

						<View style = {[ styles.linkList, styles.paragraph ]}>
							<TouchableOpacity
								style = { styles.link }
								onPress = { () => this._goTo('https://app-privacy-policy-generator.firebaseapp.com/') }
							>
								<Text style = { styles.linkText }>App Privacy Policy Generator</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Animated.View>
			</View>
		);
	};

	componentDidMount() {
		Animated.spring(
			this.state.springAnim, // The value to drive
			{
				friction: 2, // Controls "bounciness"/overshoot. Default 7.
				toValue: 0, // Animate to final value of 1
			}
		).start(); // Start the animation
	};

	_goTo = url => WebBrowser.openBrowserAsync(url);
}

const styles = StyleSheet.create({
	bulletList: {
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	bulletView: { width: 10 },
	bulletTextView: { flex: 1 },
	header: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	link: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 10,
		width: '100%',
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	linkList: {
		width: '100%',
		paddingLeft: '10%',
		paddingRight: '10%',
	},
	linkText: {
		color: 'white',
		textAlign: 'center',
	},
	mainView: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	paragraph: { paddingBottom: 10 },
	policy: {
		flex: 1,
		width: '100%',
		flexGrow: 10,
	},
	policyContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	policyView: {
		backgroundColor: 'white',
		maxHeight: '75%',
		width: '90%',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		borderWidth: 1,
		padding: 10,
	},
	row: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
	},
});
