//Hithesh Krishnamurthy - 1001096009

function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var i=0;
   var table = ' <BR><BR><table style="float:left; width:30%" border=\"1\", cellspacing=\"1\", cellpadding=\"10\"> '+
   "<tr>" +"<th>Movie title(s)</th>" + "<th align=center> Year of release </th></tr>";
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          //var str = JSON.stringify(json,undefined,2);
          var str = JSON.stringify(json,undefined,2); 
          var check = json.results[3].title;
          while (i<json.results.length)
                {table += '<tr><td><a href ="#" onclick ="return loadMovie('+json.results[i].id+');">' 
                 + json.results[i].title + "</a></td>" + "<td>" + json.results[i].release_date.substring(0,4) + "</td>";
                 table += "</tr>";
                 i++;
                }
          document.getElementById("output").innerHTML=table;     
          }
   };
   xhr.send(null);
}

//Function call to get the poster & Movie information 

function loadMovie (id) {
   var xhr = new XMLHttpRequest(); 
   var actors = action(id);
   var j=0;
   var table = ' <BR><BR><table style="float:right; width:50% "border=\"1\", cellspacing=\"1\", cellpadding=\"10\"> '+
   "<tr>" +"<th>Poster</th><th>Movie Details</th></tr>";
   xhr.open("GET", "proxy.php?method=/3/movie/" + id);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
              var json = JSON.parse(this.responseText);
              var str = JSON.stringify(json,undefined,2);
              table += '<p><tr><td height ="500" width = "300"><img src="http://image.tmdb.org/t/p/w500/'
              +json.poster_path+ '" alt=""      border="0" height="500" width="300"></img></td><td height="10">' + "<h4>Movie Title : </h4>" 
              +json.original_title + "</p>";
              table += '<p><h4> Genre : </h4>' + json.genres[0].name;
              while (j<json.genres.length)
                   {
                   table +=  ", " + json.genres[j].name ;
                   j++;
                   }
              table += '</p><p><h4> Overview : </h4>' + json.overview + '</p></td>';  
              table += "</tr>";
              document.getElementById("detail").innerHTML=table;
           }
   };
   xhr.send(null);
}

//Function call to get the cast information

function action (id) {
   var xhr = new XMLHttpRequest(); 
   var table = ' <BR><BR><table style="float:right; width:50% "border=\"1\", cellspacing=\"1\", cellpadding=\"10\"> '+
 "<tr>" +
 "<th>Lead cast</th>"
 "</tr>";
   xhr.open("GET", "proxy.php?method=/3/movie/" + id + "/credits");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
              table += '<p><tr><td><h4>Actors : </h4>' + json.cast[0].name + ", " + json.cast[1].name + ", " 
              + json.cast[2].name + ", " + json.cast[3].name + ", " + json.cast[4].name +  "</p></tr></td>";
              document.getElementById("credits").innerHTML=table;
              return credits;
           }
   };
   xhr.send(null);
}





