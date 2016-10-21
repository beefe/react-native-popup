# react-native-popup  
[![npm version](https://img.shields.io/npm/v/react-native-popup.svg?style=flat-square)](https://www.npmjs.com/package/react-native-popup)  

This is a custom component for React Native, a simple popup, compatible with ios and android.

###Demo
![ui](./doc/ui.gif)

###Props
- <b>isOverlay</b> *bool* - *`default true`*
- <b>isOverlayClickClose</b> *bool* - *`default true`*

###~~*`static`*~~ Methods
- <b>alert</b>(<b>`message`</b>: *string*|*number*, [...]) 
```javascript
	e.g.

		this.popup.alert(1);

		this.popup.alert(1, 'two', '10 messages at most');
```
- <b>tip</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> *`isRequired`*, <b>`btn`</b>: {<b>`title`</b>: *string* <b>*`default 'OK'`*</b>, <b>`callback`</b>: *function*}, }) 
```javascript
	e.g.

		this.popup.tip({
			content: 'come on!',
		});

		this.popup.tip({
			title: 'TipTip',
			content: 'come on!',
		});

		this.popup.tip({
			content: ['come on!', 'go!'],
			btn: {
				text: 'OKOK',
				style: {
					color: 'red'
				},
				callback: () => {
					this.popup.alert('over!');
				},
			},
		});
```
- <b>confirm</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> *`isRequired`*, <b>`ok`</b>: {<b>`title`</b>: *string* *`default 'OK'`*, <b>`callback`</b>: *function*}, <b>`cancel`</b>: {<b>`title`</b>: *string* *`default 'Cancel'`*, <b>`callback`</b>: *function*}, }) 
```javascript
	e.g.

		this.popup.confirm({
			content: 'Are you ready?',
		});

		this.popup.confirm({
			content: 'Are you ready?',
			ok: {
				callback: () => {
					this.popup.alert('Very good!');
				},
			},
		});

		this.popup.confirm({
			title: 'title',
			content: ['come on!', 'go!'],
			ok: {
				text: 'Y',
				style: {
					color: 'red'
				},
				callback: () => {
					this.popup.alert('Good!');
				},
			},
			cancel: {
				text: 'N',
				style: {
					color: 'blue'
				},
				callback: () => {
					this.popup.alert('Hurry up！');
				},
			},
		});
```

###Usage
####Step 1 - install

```
	npm install react-native-popup --save
```

####Step 2 - import and use in project

```javascript
import Popup from 'react-native-popup';

class App extends React.Component{

	onPressHandle() {
		// alert
		this.popup.alert(1);
	},

	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.btn} onPress={this.onPressHandle.bind(this)}>click me !</Text>

				{/** Popup component */}
				<Popup ref={popup => this.popup = popup }/>
				{/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}

			</View>
		);
	},
	
};
```
