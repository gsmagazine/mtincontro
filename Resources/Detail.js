Titanium.include('suds.js');
var window = Ti.UI.currentWindow;
var label = Ti.UI.createLabel({
    top: 10,
    left: 10,
    width: 'auto',
    height: 'auto',
    text: 'Contacting motoincontro web service...'
});

 		Ti.API.info('TITLE '+ window.title);







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
    suds.invoke('','<ws:getBike>         <id>' + window.title +  '</id>      </ws:getBike>', function(xmlDoc) {
//get the item nodelist from response xml object
	var doc = xmlDoc.documentElement;
    var items = doc.getElementsByTagName("return");
    
     		Ti.API.info('marca '+elements);
     var imgarray = [];		
 
    //loop each item in the xml
    for (var i = 0; i < items.length; i++){
 		var motoID = items.item(i).getElementsByTagName("adId").item(0).textContent;
 		 var price = items.item(i).getElementsByTagName("publicPrice").item(0).textContent;
 		 var elements = items.item(i).getElementsByTagName("brand");
 		 var brands = elements.item(0).childNodes;
 		 var brand = brands.item(2).firstChild.textContent;
 		 
 		 var images = items.item(i).getElementsByTagName("gallery");
 		 
 		 	 		 	
 		 var images2 = images.item(0).getElementsByTagName("images");
 		  for (var j = 0; j < images2.length; j++){
 		  	Ti.API.info('lenght '+images2.length);
 		 	var img = images2.item(j).childNodes;
 		 	//var img2 = img.item(0).childNodes;
 		 	Ti.API.info('index '+j);
 		 	var image = img.item(1).firstChild.textContent;
			Ti.API.info('brand '+image);
			imgarray[j]=image;
			}
 		

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

                //position label
        var positionLabel3 = Ti.UI.createLabel({
            text: 'Descrizione: ' + items.item(i).getElementsByTagName("description").item(0).textContent,
            color:'#FFF',
            font: {fontSize: 22, fontWeight: 'normal'},
            left: 50,
            bottom: 5,
            //height: 200,
            //width: 600
        });

        
         
var iconImage = Titanium.UI.createImageView({
        url:imgarray[0], 
        images:imgarray,
        width:'100%',
        height: '60%',
        touchEnabled: true,
        duration: 2000,
        repeatCount: 0,
        top:100
    });
 
    // listen for load event (when all images are loaded)
    iconImage.addEventListener('click', function()
    {
    // start animation
    iconImage.start();
 
    });
    iconImage.addEventListener('dblclick', function()
    {
    // start animation
    iconImage.stop();
    });
 
 
    // listen for start event (when animation is started)
    iconImage.addEventListener('start', function()
    {
    Titanium.API.info('ImageView animation started');
    });
 
    // listen for stop event (when animation is stopped)
    iconImage.addEventListener('stop', function()
    {
    Titanium.API.info('ImageView animation stopped');
    });
 
    // listen for change event (when animation is changed)
    iconImage.addEventListener('change', function(e)
    {
    Titanium.API.info('ImageView animation frame has changed, index ' + e.index);
    });
        
    iconImage.addEventListener('pinch', function(e) { 
    	var t = Ti.UI.create2DMatrix().scale(e.scale); 
    	iconImage.transform = t; 
    	});    
        
        
        
window.add(titleLabel);
window.add(positionLabel2);
window.add(positionLabel3);
window.add(iconImage);
    iconImage.start();
 }
    } );
    

 
    //set the data property of the tableView to the data[] object
    //tblEmployees.data = data;
 
} catch(e) {
    Ti.API.error('Error: ' + e);
}


window.open();
//searchBar.hide();













