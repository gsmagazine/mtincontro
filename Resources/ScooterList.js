Titanium.include('suds.js');
var window = Ti.UI.currentWindow;
var label = Ti.UI.createLabel({
    top: 10,
    left: 10,
    width: 'auto',
    height: 'auto',
    text: 'Contacting motoincontro web service...'
});

 

//define search bar to attach to tableview
var searchBar = Ti.UI.createSearchBar({
    showCancel: true,
    hidden:false,
    height: 80,
    top: 10,
    //backgroundColor:'#FFF',
    //softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS,
});
 
//print out searchbar value whenever it changes
searchBar.addEventListener('change', function(e){
    //search the tableview as user types
    Ti.API.info('user searching for: ' + e.value);
});
 
//when the return key is hit, remove focus from searchbar
searchBar.addEventListener('return', function(e){
    searchBar.blur();
});
 
//when cancel button is tapped, remove focus from searchbar
searchBar.addEventListener('cancel', function(e){
    searchBar.blur();
});


//create the table view
var tblData = Ti.UI.createTableView({
    height: Ti.UI.SIZE,
        //layout: 'vertical',
    width: Ti.UI.FILL,
    top: 20,
    left: 0,
    rowHeight: 70,
    backgroundColor: '#000',
    search: searchBar,
    filterAttribute: 'filter' //search filter which appears in TableRowView
});
window.add(tblData);


//tblData.addEventListener('postlayout',  function(e){
//    searchBar.blur();
//});






//create an array to hold the remote xml data
var data = []; //empty data array





var url = "http://www.motoincontroroma.it/motoincontro/MotoWS";

var suds = new SudsClient({
    endpoint: url,
    targetNamespace: 'http://ws.motoincontro.com/'
});

// check for network
if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     var alertDialog = Titanium.UI.createAlertDialog({
              title: 'WARNING!',
              message: 'Your device is not online.',
              buttonNames: ['OK']
            });
            alertDialog.show();
}


try {
    suds.invoke('', '<ws:fullSearch>         <search></search>         <brandId></brandId>         <categoryIds>            <!--Zero or more repetitions:-->            <item>223</item>         </categoryIds>         <year></year>         <maxprice></maxprice>         <page></page>         <orderBy></orderBy>         <orderType></orderType>         <numRows></numRows>      </ws:fullSearch>', function(xmlDoc) {
//get the item nodelist from response xml object
	var doc = xmlDoc.documentElement;
    var items = doc.getElementsByTagName("results");
    
     		Ti.API.info('marca '+elements);
     		
 
    //loop each item in the xml
    for (var i = 0; i < items.length; i++){
 		var motoID = items.item(i).getElementsByTagName("adId").item(0).textContent;
 		 var price = items.item(i).getElementsByTagName("publicPrice").item(0).textContent;
 		 var elements = items.item(i).getElementsByTagName("brand");
 		 var brands = elements.item(0).childNodes;
 		 var brand = brands.item(2).firstChild.textContent;
		Ti.API.info('brand '+brand);
        //create a table row
        var row = Ti.UI.createTableViewRow({
            hasChild: true,
            focusable:true,
         //height: Ti.UI.SIZE,
        //layout: 'vertical',
        width: Ti.UI.FILL,
            //className: 'employee-row',
            height:250,
            filter: brand  + items.item(i).getElementsByTagName("title").item(0).textContent, 
        });
 		row.pageTitle = motoID;
 		var itemView = Ti.UI.createView({
 		left:0,	
 		 width: '50%',
            height: '100%',
 		});
 		
        //title label
        var titleLabel = Ti.UI.createLabel({
            text: brand +'\n'+ items.item(i).getElementsByTagName("model").item(0).textContent,
            font: {fontSize: 40, fontWeight: 'bold'},
            color:'#FFF',
            left: 0,
            top: 0,
            
            //height: 60,
            //width: 500
        });
        //row.add(titleLabel);
        itemView.add(titleLabel);

        //position label
        var positionLabel = Ti.UI.createLabel({
            text: 'Anno: ' +items.item(i).getElementsByTagName("year").item(0).textContent,
            font: {fontSize: 22, fontWeight: 'normal'},
            color:'#FFF',
            left: 0,
            bottom: 15,
            //height: 200,
            //width: 600
        });
                //position label
        var positionLabel2 = Ti.UI.createLabel({
            text: 'Prezzo: ' + price.slice(0,-2) + '€',
            color:'#FFF',
            font: {fontSize: 22, fontWeight: 'normal'},
            left: 200,
            bottom: 15,
            //height: 200,
            //width: 600
        });
        //row.add(positionLabel);
        itemView.add(positionLabel);
        itemView.add(positionLabel2);
 		row.add(itemView);
        //add icon to the left of the row

        
        var iconImage = Ti.UI.createImageView({
            image: 'http://cdn.motoincontroroma.it/gallery/' + motoID +'/anteprima-01.jpg',
           	//width: 120,
            //height: 80,
            right: 0,
            //top: 10
        });
        row.add(iconImage);
 	
 	var actInd = Titanium.UI.createActivityIndicator({
		top:12, 
		height:16,
		width:16,
		left:300,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
		actInd.hide();
		row.add(actInd);
 
 
        //add the table row to our data[] object

        data.push(row);
            tblData.data = data;
                    	Ti.API.info('row: ' + data.length);
 }
    } );
    

 
    //set the data property of the tableView to the data[] object
    //tblData.data = data;
 
} catch(e) {
    Ti.API.error('Error: ' + e);
}


tblData.addEventListener('click', function(e) { 
	 var index = e.row.name; 
	 Titanium.API.info("row index = "+ index +'-'+e.index + '-' + e.row.pageTitle); 
        var newWindow = Titanium.UI.createWindow({ 
            url:'detail.js',
            title:e.rowData.title 
        }); 
        newWindow.open({
            animated:true
        });
    });

window.open();
//searchBar.hide();













