/**
 * Popup main
 */

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
	PixelRatio,
	Platform,
} from 'react-native';

class PopContent extends Component{

	static propTypes = {
		title: PropTypes.string,
		content: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.array, ]),
		btns: PropTypes.array,
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let {title, content, btns} = this.props;
		let btnNumber = btns.length;
		return (
			<View style={styles.tipBox}>
				{ title && <View style={styles.tipTitleBox}><Text style={styles.tipTitle}>{title}</Text></View>}
				<View style={styles.tipContentBox}>
					{(() => {
						let tipContent = [];
						if(content instanceof Array){
							content.forEach((item, index, arr) => {
								if(index > 9){ 
									return;
								}
								item && ( tipContent[index] = (<Text style={styles.tipContent} key={'tipContent' + index}>{item}</Text>) );
							});
						}else{
							content && ( tipContent[0] = (<Text style={styles.tipContent} key={'tipContent'}>{content}</Text>) );
						}
						return tipContent;
					})()}
				</View>
				<View style={styles.line}></View>
				<View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
					{(() => {
						let btnContent = [];
						btns.forEach((btn, index,) => {
							btnContent.push(
								<TouchableOpacity style={styles.btnTextBox} onPress={btn.callback} key={'btnTextBox' + index}>
									<Text style={[styles.btnText, btn.style]}>{btn.text}</Text>
								</TouchableOpacity>
							);
							index != btnNumber - 1 && btnContent.push( <View style={styles.btnLine} key={'btnLine' + index} /> );
						});
						return btnContent;
					})()}
				</View>
			</View>
		);
	}

};

class DisplayPopup extends Component{

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
		btns: [{
			text: 'ok',
			callback: () => {},
		}],
	};

	constructor(props, context) {

		super(props, context);

		this.state = {
			isVisible: true,
		};

	}

	close() {
		this.setState({
			isVisible: false,
		});
	}

	_renderOverlay() {
		if(this.props.isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={() => {
					if(this.props.isOverlayClickClose) {
						this.close();
					}
				}}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	}

	render() {
		let { isVisible, isOverlay, } = this.state;
		let { title, content, btns, } = this.props;
		btns = btns.map((item) => {
			return {
				text: item.text,
				callback: () => {
					typeof item.callback === 'function' && item.callback();
					this.close();
				},
			};
		});
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay()}
					<View style={styles.tipBoxView}>
						<PopContent title={title} content={content} btns={btns} />
					</View>
				</View>
			);
		}
		return <View style={styles.hidden}/>;
	}

};

export default class Popup extends Component{

	static DisplayPopup = DisplayPopup;

	static defaultProps = {
		isOverlay: true,
		isOverlayClickClose: true,
	};

	constructor(props, context) {

		super(props, context);

		this.state = {
			isVisible: false,
			isOverlay: this.props.isOverlay,
			isOverlayClickClose: this.props.isOverlayClickClose,
			content: null,
		};

	}

	_pop(args) {
		this.setState({
			content: ( <PopContent {...args}/> ),
			isVisible: true,
		});
	}

	alert(...text) {
		text = text.map(text => text);
		this._pop({
			content: text || '',
			btns: [{
				text: 'OK',
				callback: () => {
					this.close();
				},
			}],
		});
	}

	tip(args) {
		let {title, content, btn,} = args;
		this._pop({
			title: title || 'Tip',
			content: content,
			btns: [{
				text: btn && btn.text || 'OK',
				style: btn && btn.style,
				callback: () => {
					this.close();
					btn && typeof btn.callback === 'function' && btn.callback();
				},
			}],
		});
	}

	confirm(args) {
		let {title, content, ok, cancel,} = args;
		this._pop({
			title: args.title,
			content: args.content,
			btns: [
				{
					text: cancel && cancel.text || 'Cancel',
					style: cancel && cancel.style,
					callback: () => {
						this.close();
						cancel && typeof cancel.callback === 'function' && cancel.callback();
					},
				},
				{
					text: ok && ok.text || 'OK',
					style: ok && ok.style,
					callback: () => {
						this.close();
						ok && typeof ok.callback === 'function' && ok.callback();
					},
				},
			],
		});
	}

	pop(args) {
		this._pop(args);
	}

	close() {
		this.setState({
			isVisible: false,
		});
	}

	_renderOverlay() {
		if(this.state.isOverlay) {
			return (
				<TouchableWithoutFeedback onPress={() => {
					if(this.state.isOverlayClickClose) {
						this.close();
					}
				}}>
					<View style={styles.overlay}></View>
				</TouchableWithoutFeedback>
			);
		}
	}

	_renderContent() {
		return (
			<View style={styles.tipBoxView}>
				{this.state.content}
			</View>
		);
	}

	render() {
		let { isVisible, isOverlay, } = this.state;
		if(isVisible) {
			return (
				<View style={styles.popupContainer}>
					{this._renderOverlay()}
					{this._renderContent()}
				</View>
			);
		}
		return <View style={styles.hidden}/>;
	}

};

let screen = {
	pixel: 1 / PixelRatio.get(),
	...Dimensions.get('window')
};
let styles = StyleSheet.create({
	popupContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: screen.width,
		height: screen.height,
		overflow: 'hidden',
		backgroundColor: 'rgba(00, 00, 00, 0)',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: screen.width,
		height: screen.height,
		backgroundColor: '#000',
		opacity: .5,
	},
	tipBoxView: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		width: screen.width - 50,
		borderRadius: 12,
		overflow: 'hidden',
	},
	tipBox: {
		paddingTop: 15,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipTitleBox: {
		height: 30,
		width: screen.width - 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipTitle: {
		fontSize: 19,
		fontWeight: '500',
		textAlign: 'center',
	},
	tipContentBox: {
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
		height: screen.pixel,
		width: screen.width - 50,
		backgroundColor: '#ddd',
	},
	btnBox: {
		width: screen.width - 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
	},
	btnTextBox: {
		flexGrow: 1,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnLine: {
		height: 50,
		width: screen.pixel,
		backgroundColor: '#ddd',
	},
	btnText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#149be0',
	},
	hidden: {
		position: 'absolute',
		height: 0,
		width: 0,
		top: 0,
		left: 0,
	},
});

if(Platform.OS === 'ios'){
	styles = {
		...styles,
		tipTitle: {
			fontSize: 20,
			fontWeight: '500',
			textAlign: 'center',
		},
		tipContent: {
			fontSize: 16,
			marginTop: 3,
			marginBottom: 7,
			textAlign: 'center',
		},
	}
}
