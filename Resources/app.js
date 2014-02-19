// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    //title:'Tab 1',
    backgroundColor:'#000'
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

//win1.add(label1);

//TABLEVIEW
var tbl = Ti.UI.createTableView({top:10,separatorColor :'transparent',bottom : 50});

function createRow(items)
{
	var tablerow = Ti.UI.createTableViewRow({
			height: 45,
			selectedBackgroundColor : 'transparent',
			id : items.id,
	});
	var h_height = 40;
	var viewOne = Ti.UI.createView({
    			height:h_height,
    			layout : 'horizontal',
 
   	});
	var lbl1 = Ti.UI.createLabel({
  				text : items.name1,
    			        color : '#000',
    			        font: {fontSize : 16, fontWeight : 'bold'},
				left : '1%',
				textAlign : 'center',
				width : '32%',
				height : h_height,
	});
 
	var lbl2 = Ti.UI.createLabel({
  				text : items.name2,
    			        color : '#000',
    			        font: {fontSize : 16, fontWeight : 'bold'},
				left : '1%',
				textAlign : 'center',
				width : '32%',
				height : h_height,
	});
 
	var lbl3 = Ti.UI.createLabel({
  				text : items.name1,
    			        color : '#000',
    			        font: {fontSize : 16, fontWeight : 'bold'},
				left : '1%',
				textAlign : 'center',
				width : '32%',
				height : h_height,
	});
 
	if(items.type == "header")
	{
		lbl1.backgroundImage = '/images/headerBK.png';
		lbl2.backgroundImage = '/images/headerBK.png';
		lbl3.backgroundImage = '/images/headerBK.png';
	}
 
	viewOne.add(lbl1);
	viewOne.add(lbl2);
	viewOne.add(lbl3);
 
	tablerow.add(viewOne);
 
	return tablerow;
 
 
}

var l_data = [];
 
	var data = [
		{id : -1, name1 : 'Column1' ,name2 : 'Column2',name3 : 'Column3' , type : 'header'},
		{id : 1, name1 : 'Row1' ,name2 : 'Row1',name3 : 'Row1' , type : 'row'},
		{id : 2, name1 : 'Row2' ,name2 : 'Row2',name3 : 'Row2', type : 'row'},
		{id : 3, name1 : 'Row3' ,name2 : 'Row3',name3 : 'Row3', type : 'row'},
		{id : 4, name1 : 'Row4' ,name2 : 'Row4',name3 : 'Row4', type : 'row'},
	];
 
	for(var i=0;i<data.length;i++)
	{
		l_data.push(createRow(data[i]));
	}
 
	tbl.setData(l_data);
	
	tbl.addEventListener('click', function(e) {
		if(e.row.id > 0)
		{
			alert("Row id : " + e.row.id);
		}
 
	});
	var self = Ti.UI.createView();

self.add(tbl);
	
	var win2 = Titanium.UI.createWindow({  
    //title:'Tab 1',
    backgroundColor:'#fff'
	});
 win2.add(self);

//END TABLEVIEW

var btn1 = Ti.UI.createButton({
    top : 10,
    left : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'auto_white.png',
});
var btn2 = Ti.UI.createButton({
    top : 10,
    right : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'moto_white.png',
});
var btn3 = Ti.UI.createButton({
    top : 300,
    left : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'scooter_white.png',
});
var btn4 = Ti.UI.createButton({
    top : 300,
    right : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'naked_white.png',
});
var btn5 = Ti.UI.createButton({
    top : 600,
    left : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'qrcode_white.png',
});
var btn6 = Ti.UI.createButton({
    top : 600,
    right : 80,
    height : 250,
    width : 250,
    title : '',
    backgroundImage : 'qrcode_white.png',
});



 




btn1.addEventListener('click', function() {
    btn1.backgroundSelectedImage = 'auto_red.png';
    win2.open();
});
btn2.addEventListener('click', function() {
    btn2.backgroundSelectedImage = 'moto_red.png';
});
btn3.addEventListener('click', function() {
    btn3.backgroundSelectedImage = 'scooter_red.png';
});
btn4.addEventListener('click', function() {
    btn4.backgroundSelectedImage = 'naked_red.png';
});
btn5.addEventListener('click', function() {
    btn5.backgroundSelectedImage = 'qrcode_red.png';
	openScanner();
});
btn6.addEventListener('click', function() {
    btn6.backgroundSelectedImage = 'qrcode_red.png';
});

var scanditsdk = require("com.mirasense.scanditsdk");
// disable the status bar for the camera view on the iphone and ipad
if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
        Titanium.UI.iPhone.statusBarHidden = true;
    }
var picker;
// Create a window to add the picker to and display it. 
var scanWindow = Titanium.UI.createWindow({  
        title:'Scandit SDK',
        navBarHidden:true
});
// Sets up the scanner and starts it in a new window.
var openScanner = function() {
    // Instantiate the Scandit SDK Barcode Picker view
    picker = scanditsdk.createView({
        width:"100%",
        height:"100%"
    });
    // Initialize the barcode picker, remember to paste your own app key here.
    picker.init("bmSNgplYEeOEDkqJdxfZpOGx8YlmJ063prVXEUz+gQo", 0);
    //picker.showSearchBar(true);
    // add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
    //picker.showToolBar(true);
    // Set callback functions for when scanning succeedes and for when the 
    // scanning is canceled.
    picker.setSuccessCallback(function(e) {
        alert("success (" + e.symbology + "): " + e.barcode);
    });
    picker.setCancelCallback(function(e) {
        closeScanner();
    });
    scanWindow.add(picker);
    scanWindow.addEventListener('open', function(e) {
        // Adjust to the current orientation.
        // since window.orientation returns 'undefined' on ios devices 
        // we are using Ti.UI.orientation (which is deprecated and no longer 
        // working on Android devices.)
        if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
            picker.setOrientation(Ti.UI.orientation);
        }   
        else {
            picker.setOrientation(scanWindow.orientation);
        }
        
        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
                       Ti.Platform.displayCaps.platformHeight);
        picker.startScanning();     // startScanning() has to be called after the window is opened. 
    });
    scanWindow.open();
}
// Stops the scanner, removes it from the window and closes the latter.
var closeScanner = function() {
    if (picker != null) {
        picker.stopScanning();
        scanWindow.remove(picker);
    }
    scanWindow.close();
};
// Changes the picker dimensions and the video feed orientation when the
// orientation of the device changes.
Ti.Gesture.addEventListener('orientationchange', function(e) {
    scanWindow.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
                   Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
    if (picker != null) {
        picker.setOrientation(e.orientation);
        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
                Ti.Platform.displayCaps.platformHeight);
        // You can also adjust the interface here if landscape should look
        // different than portrait.
    }
});



 


win1.add(btn1);
win1.add(btn2);
win1.add(btn3);
win1.add(btn4);
win1.add(btn5);
win1.add(btn6);


// open tab group
win1.open();