# react-native-popup

This is a custom component for React Native, a simple popup, compatible with ios and android.

###Props
- <b>isOverlay</b> *`(bool)`* - default `true`
- <b>isOverlayClickClose</b> *`(bool)`* - default `true`

###~~*`static`*~~ Methods
- <b>alert</b>(`<b>message</b>`: *string*|*number*, [...])
- <b>tip</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> <b>*`isRequired`*</b>, <b>`ok`</b>: {<b>`title`</b>: *string* <b>*`default 'OK'`*</b>, <b>`callback`</b>: *function*}, })
- <b>confirm</b>({ <b>`title`</b>: *string*, <b>`content`</b>: *string*|*number*|*array*<*string*|*number*> <b>*`isRequired`*</b>, <b>`ok`</b>: {<b>`title`</b>: *string* <b>*`default 'OK'`*</b>, <b>`callback`</b>: *function*}, <b>`cancel`</b>: {<b>`title`</b>: *string* <b>*`default 'Cancel'`*</b>, <b>`callback`</b>: *function*}, })

###Usage
####Step 1 - install

```
	npm install react-native-popup --save
```

####Step 2 - import and use in project

```javascript
var Popup = require('react-native-popup');

var App = React.createClass({

	onPressHandle() {
		// alert
		this.popup.alert(1);
	},

	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.btn} onPress={this.onPressHandle}>click me !</Text>

				{/** Popup component */}
				<Popup ref={(popup) => { this.popup = popup }}>

			</View>
		);
	},
	
});
```