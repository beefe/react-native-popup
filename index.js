'use strict';
 
var React = require('react-native');
var { 
	StyleSheet, 
	PropTypes, 
	View, 
	Text, 
	TouchableOpacity, 
	Dimensions,
	TouchableWithoutFeedback,
} = React;

var PopContent = React.createClass({

	propTypes: {
		title: PropTypes.string,
		content: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.array, ]),
		btns: PropTypes.array,
	},

	render() {
		var {title, content, btns} = this.props;
		var btnNumber = btns.length;
		return (
			<View style={styles.tipBox}>
				{ title && <Text style={styles.tipTitle}>{title}</Text>}
				<View style={styles.tipContentBox}>
					{() => {
						var tipContent = [];
						if(content instanceof Array){
							content.forEach((item, index, arr) => {
								if(index > 9){ 
									return;
								}
								item && ( tipContent[index] = (<Text style={styles.tipContent}>{item}</Text>) );
							});
						}else{
							content && ( tipContent[0] = (<Text style={styles.tipContent}>{content}</Text>) );
						}
						return tipContent;
					}()}
				</View>
				<View style={styles.line}></View>
				<View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
					{() => {
						var btnContent = [];
						btns.forEach((btn, index,) => {
							btnContent.push(
								<TouchableOpacity style={styles.btnTextBox} onPress={btn.callback}>
									<Text style={styles.btnText}>{btn.text}</Text>
								</TouchableOpacity>
							);
							index != btnNumber - 1 && btnContent.push( <View style={styles.btnLine} /> );
						});
						return btnContent;
					}()}
				</View>
			</View>
		);
	},

});

var Popup = React.createClass({

	displayName: 'Popup',

	statics: {
		title: '<Popup />',
		description: 'react-native-popup',
	},

	getDefaultProps() {
		return {
			isOverlay: true,
			isOverlayClickCancel: true,
		};
	},

	getInitialState() {
		return {
			isVisible: false,
			isOverlay: this.props.isOverlay,
			isOverlayClickCancel: this.props.isOverlayClickCancel,
			content: null,
		};
	},

	_pop(args) {
		this.setState({
			content: ( <PopContent {...args}/> ),
			isVisible: true,
		});
	},

	alert(...text) {
		var text = text.map((text) => text);
		this._pop({
			content: text || '',
			btns: [{
				text: 'OK',
				callback: () => {
					this.close();
				},
			}],
		});
	},
	
	tip(args) {
		var {title, content, btn,} = args;
		this._pop({
			title: title || 'Tip',
			content: content,
			btns: [{
				text: btn && btn.text || 'OK',
				callback: () => {
					this.close();
					typeof btn.callback === 'function' && btn.callback();
				},
			}],
		});
	},

	confirm(args) {
		var {title, content, ok, cancel,} = args;
		this._pop({
			title: args.title,
			content: args.content,
			btns: [
				{
					text: cancel && cancel.text || 'Cancel',
					callback: () => {
						this.close();
						typeof cancel.callback === 'function' && cancel.callback();
					},
				},
				{
					text: ok && ok.text || 'OK',
					callback: () => {
						this.close();
						typeof ok.callback === 'function' && ok.callback();
					},
				},
			],
		});
	},

	pop(args) {
		this._pop(args);
	},

	close() {
		this.setState({
			isVisible: false,
		});
	},

	_renderOverlay() {
		if(this.state.isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={() => {
					if(this.state.isOverlayClickCancel) {
						this.close();
					}
				}}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	},

	_renderContent() {
		return (
			<View style={styles.tipBoxView}>
				{this.state.content}
			</View>
		);
	},

	render() {
		var { isVisible, isOverlay, } = this.state;
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay()}
					{this._renderContent()}
				</View>
			);
		}
		return null;
	},

});

var styles = StyleSheet.create({
	popupContainer: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: Dimensions.get('window').width, 
		height: Dimensions.get('window').height, 
	},
	overlay: { 
		flex: 1, 
		position: 'absolute', 
		top: 0, 
		left: 0, 
		width: Dimensions.get('window').width, 
		height: Dimensions.get('window').height, 
		backgroundColor: '#000', 
		opacity: .5, 
	},
	tipBox: { 
		flex: 1, 
		paddingTop: 15, 
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	tipBoxView: { 
		backgroundColor: '#fff', 
		justifyContent: 'center', 
		alignItems: 'center', 
		width: Dimensions.get('window').width - 50, 
		height: 0,
		borderRadius: 12, 
	},
	tipTitle: { 
		height: 30, 
		width: Dimensions.get('window').width - 50, 
		fontSize: 19, 
		fontWeight: '500', 
		textAlign: 'center', 
	},
	tipContentBox: {
		flex: 1, 
		flexDirection: 'column', 
		marginBottom: 15, 
		marginTop: 10,
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	tipContent: { 
		fontSize: 16, 
		marginBottom: 5, 
		textAlign: 'center', 
	},
	line: { 
		height: 1, 
		width: Dimensions.get('window').width - 50, 
		backgroundColor: '#ddd', 
	},
	btnBox: {
		width: Dimensions.get('window').width - 50,
		height: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnTextBox: {
		flex: 1,
		marginTop: 10,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnLine: {
		height: 50,
		width: 1,
		backgroundColor: '#ddd',
	},
	btnText: { 
		height: 40, 
		textAlign: 'center', 
		fontSize: 16, 
		color: '#149be0', 
	},
});


module.exports = LoanOrder;
