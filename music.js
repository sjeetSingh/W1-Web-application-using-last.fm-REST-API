// Put your Last.fm API key here
//last.fm API key= 7f7b44d01ed230025661d846dcb84e30

var api_key = "7f7b44d01ed230025661d846dcb84e30";

var request = new XMLHttpRequest();
var request_for_Album = new XMLHttpRequest();       // Request to fetch data about albums of the artist
var request_for_Event = new XMLHttpRequest();       // Request to fetch data about events of the artist

function displayResult () 
{
    if (request.readyState == 4) 
    {
       var json = JSON.parse(request.responseText);
       //var str = JSON.stringify(json,undefined,2); 

       document.getElementById("output").innerHTML = json.artist.name+"<br></br>"+"<img src="+json.artist.image[3]['#text']+"align=\"middle\"></img>";
       document.getElementById("bioArtist").innerHTML = json.artist.bio.summary;       
    }
    sendRequest2();
}

function sendRequest() 
{
    var method1 = "artist.getinfo";    
    request.onreadystatechange = displayResult;
    var artist = document.getElementById("form-input").value;
    if ( artist=="")
    {
        document.getElementById("output").innerHTML = "Please input something";
        sendRequest();
    }
    
    request.open("GET","proxy.php?method="+method1+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    request.withCredentials = "true";
    request.send(null);    
}

function displayAlbResult()
{
    if( request_for_Album.readyState == 4 )
    {
        var jsonA = JSON.parse(request_for_Album.responseText);
        //var strA = JSON.stringify(jsonA, undefined, 2);        
        //document.getElementById("albumHead").innerHTML =  Top Albums are: ;
        
        document.getElementById("outputA").innerHTML = null;        // Empty the innerHTML element (i.e. outputA, here)to display updated data
        document.getElementById("albumTitle").innerHTML = "<br></br>" +"Top 5 Albums of " + document.getElementById("form-input").value + " are: ";
        for( var i=0; i<10; i++)
        {
            document.getElementById("outputA").innerHTML += "<br></br>"+"<img src="+jsonA.topalbums.album[i].image[2]['#text']+"></img>"+"<br></br>"+jsonA.topalbums.album[i]['name'] + "<br></br>"+"Play Count: of "+jsonA.topalbums.album[i]['name']+" : "+jsonA.topalbums.album[i]['playcount'];
            //document.getElementById("outputA").innerHTML = "<pre>" + strA + "</pre>";   
        }        
    }
    sendRequest3();                
}

function sendRequest2() 
{
    var method2 = "artist.getTopAlbums";    
    request_for_Album.onreadystatechange = displayAlbResult;    
    var artist = document.getElementById("form-input").value;    

    request_for_Album.open("GET","proxy.php?method="+method2+"&artist="+artist+"&api_key="+api_key+"&format=json",true);    
    request_for_Album.withCredentials = "true";
    request_for_Album.send(null);    
}

function displayEvResult()
{
    if( request_for_Event.readyState==4 )
    {
        var jsonE = JSON.parse(request_for_Event.responseText);
        //var strE = JSON.stringify(jsonE, undefined, 2);

        document.getElementById("outputE").innerHTML = null;        // This variable will be "empited" for every new request
        document.getElementById("eventTitle").innerHTML = "<br></br>"+"Live performances of " + document.getElementById("form-input").value + " are: ";

        for( var i=0; i<10; i++)
        {
            document.getElementById("outputE").innerHTML +=  "<ul style=\"list-style-type:disc\"><li>"+jsonE.events.event[i].venue.name+". Address:- "+jsonE.events.event[i].venue.location['city'] + " street: " + jsonE.events.event[i].venue.location['street']+ ", postal code: "+ jsonE.events.event[i].venue.location['postalcode']+"</li></ul>";
            //document.getElementById("location").innerHTML = "City: "+ jsonE.events.event[i].venue.location.city;  
        }        
    }
}

function sendRequest3() 
{
    var method3 = "artist.getEvents";    
    request_for_Event.onreadystatechange = displayEvResult;
    
    var artist = document.getElementById("form-input").value;
    
    request_for_Event.open("GET","proxy.php?method="+method3+"&artist="+artist+"&api_key="+api_key+"&format=json",true);
    
    request_for_Event.withCredentials = "true";
    request_for_Event.send(null);    
}
