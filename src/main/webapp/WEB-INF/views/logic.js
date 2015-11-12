$(document).ready(function () {


	
	
	
	$("#gains").click(
			
	function(){
		Input();
		location.reload();
	}
	
	
	);

	
	
	
	
	
	
	
	
	
	
	
	
	
	
    $("#reset").click(
    	    
    	    function () {
    	    	Reset();
    	    	location.reload();
    	    });
    	    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$("#submit").click(

    function () {
        Order();
        

    });

    $("#getrange").click(

    function () {
        GetRange();
        
        
        
        
        
        
       

    });

    




});

function Order() {
    var symbol = document.getElementById("symbol").value;
    var pricestring = document.getElementById("price").value;
    var price= parseInt(pricestring);
    var monthpurchasedstring = document.getElementById("monthpurchased").value;
    var monthpurchased = parseInt(monthpurchasedstring);
  
    

    var portfoliodata;
    
    
    

    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    $.ajax({
        type: "POST",
       
        
        url: "http://54.172.193.233:8080/stocks/Controller1/stock",
        
        data: JSON.stringify({ "Symbol" : symbol, Price : price, Monthpurchased : monthpurchased }), // Note it is important
        contentType: 'application/json',
        success: function (data) {
        

    }
    });




setTimeout(function () {

    $.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        //dataType: 'json',
        url: "http://54.172.193.233:8080/stocks/Controller1/portfolio",
        data: portfoliodata,

        success: function (getjsonportfolio) {
        
        console.log(getjsonportfolio);
        var jsonString=JSON.stringify(getjsonportfolio)
        console.log("The string is"+jsonString);
        //var pie = new d3pie("pieChart", a);
       // alert(a);
        
        //jsonStringx= "'"+jsonString+"'";
        var obj  = JSON.parse(jsonString);
        console.log(obj[0]);
        console.log(obj[0].symbol);
       
        //window.alert(array[0].Symbol);
        var arr1= new Array();
        
        for(var x in obj){
        	  arr1.push(obj[x].symbol);
        	}
        for (var i = 0; i < arr1.length; i++){
        	  console.log(arr1[i]);
        	}
        
        
        var Arr2 = new Array();
        for(var x in obj){
      	  Arr2.push(obj[x].count);
      	}
      for (var i = 0; i < Arr2.length; i++){
      	  console.log(Arr2[i]);
      	}
      
      myHeader = ["symbol", "count"];
      
      var zip = function (arr1, arr2) {
    	    var len = Math.max(arr1.length, arr2.length);
    	    var arr = new Array(len);
    	    for (var i = 0; i < len; i += 1) {
    	        arr[i] = [arr1[i], arr2[i]];
    	    }
    	    return arr; 
    	};
    	data = [myHeader].concat(zip(arr1, Arr2));
        
        
        
        var Arr2 = [];
        while(arr1.length) Arr2.push(arr1.splice(0,1));

        
       
        
        
        var data = new google.visualization.arrayToDataTable(data);
        
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        
        var options = {
                title: 'Wealth Distribution (Before Capital Gains/Losses)',
                width: 400,
                height: 240,
                backgroundColor: {
                	fill: "#ADD8E6"
                },
        		is3D: true
              };
        
        chart.draw(data, options);
    }
    });




}, 2000);



setTimeout(function () {

    $.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        //dataType: 'json',
        url: "http://54.172.193.233:8080/stocks/Controller1/getpostgains",
        data: portfoliodata,

        success: function (getjsonportfolio) {
        
        console.log(getjsonportfolio);
        var jsonString=JSON.stringify(getjsonportfolio)
        console.log("The string is"+jsonString);
        //var pie = new d3pie("pieChart", a);
       // alert(a);
        
        //jsonStringx= "'"+jsonString+"'";
        var obj  = JSON.parse(jsonString);
        console.log(obj[0]);
        console.log(obj[0].symbol);
       
        //window.alert(array[0].Symbol);
        var arr1= new Array();
        
        for(var x in obj){
        	  arr1.push(obj[x].symbol);
        	}
        for (var i = 0; i < arr1.length; i++){
        	  console.log(arr1[i]);
        	}
        
        
        var Arr2 = new Array();
        for(var x in obj){
      	  Arr2.push(obj[x].count);
      	}
      for (var i = 0; i < Arr2.length; i++){
      	  console.log(Arr2[i]);
      	}
      
      myHeader = ["symbol", "count"];
      
      var zip = function (arr1, arr2) {
    	    var len = Math.max(arr1.length, arr2.length);
    	    var arr = new Array(len);
    	    for (var i = 0; i < len; i += 1) {
    	        arr[i] = [arr1[i], arr2[i]];
    	    }
    	    return arr; 
    	};
    	data = [myHeader].concat(zip(arr1, Arr2));
        
        
        
        var Arr2 = [];
        while(arr1.length) Arr2.push(arr1.splice(0,1));

        
       
        
        
        var data = new google.visualization.arrayToDataTable(data);
        
        var chart = new google.visualization.PieChart(document.getElementById('chart3_div'));
        
        var options = {
                title: 'Wealth Distribution (After Capital Gains/Losses)',
                width: 400,
                height: 240,
                backgroundColor: {
                	fill: "#ADD8E6"
                },
        		is3D: true
              };
        
        chart.draw(data, options);
    }
    });




}, 2000);

















};




function GetRange() {
    var symbolrange = document.getElementById("symbolrange").value;
    var startmonth = document.getElementById("startmonth").value;
    var endmonth = document.getElementById("endmonth").value;
    
    
var stockovertime;

    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8', 
        //dataType: 'json',
        url: "http://54.172.193.233:8080/stocks/Controller1/stockovertime",
        data: JSON.stringify({ symbol: symbolrange, startmonth: startmonth, endmonth: endmonth }), // Note it is important

        success: function (postjsonstocktimeparameters) {
           

        }
    });

    setTimeout(function () {


        $.ajax({
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: "http://54.172.193.233:8080/stocks/Controller1/stockovertimeget",
            data: stockovertime, // Note it is important

            success: function (getjsonstockovertime) {
            
            var jsonString=JSON.stringify(getjsonstockovertime)
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            console.log("The string is"+jsonString);
            //var pie = new d3pie("pieChart", a);
           // alert(a);
            
            //jsonStringx= "'"+jsonString+"'";
            var obj  = JSON.parse(jsonString);
            console.log(obj[0]);
            console.log(obj[0].symbol);
           
            //window.alert(array[0].Symbol);
            var arr1= new Array();
            
            for(var x in obj){
            	  arr1.push(obj[x].monthpurchased);
            	}
            for (var i = 0; i < arr1.length; i++){
            	  console.log(arr1[i]);
            	}
            
            
            var Arr2 = new Array();
            for(var x in obj){
          	  Arr2.push(obj[x].price);
          	}
          for (var i = 0; i < Arr2.length; i++){
          	  console.log(Arr2[i]);
          	}
          
          myHeader = ["monthpurchased", "price"];
          
          var zip = function (arr1, arr2) {
        	    var len = Math.max(arr1.length, arr2.length);
        	    var arr = new Array(len);
        	    for (var i = 0; i < len; i += 1) {
        	        arr[i] = [arr1[i], arr2[i]];
        	    }
        	    return arr; 
        	};
        	data = [myHeader].concat(zip(arr1, Arr2));
            
            
            
            var Arr2 = [];
            while(arr1.length) Arr2.push(arr1.splice(0,1));

            
           
            
            
            var data = new google.visualization.arrayToDataTable(data);
            var options = {
            		title: 'Price Paid For Given Month',
            		 width: 400,
                     height: 240,	
                     hAxis:{format: 'short'},
                     hAxis: {gridlines: {color: '#000000'}},
                     vAxis: {gridlines: {color: '#000000'}},
                     backgroundColor: {
                     	fill: "#ADD8E6"
                     },
                     is3D: true
            };
            var chart = new google.visualization.LineChart(document.getElementById('chart2_div'));
            chart.draw(data, options);
        }
        });




    }, 2000);
}



function Reset(){
	
    $.ajax({
        type: "POST",
       
        
        url: "http://54.172.193.233:8080/stocks/Controller1/reset",
        
        data: JSON.stringify({ "Symbol" : symbol, Price : price, Monthpurchased : monthpurchased }), // Note it is important
        contentType: 'application/json',
        success: function (data) {
        

    }
    });
}
    
function Input(){
	var gains = document.getElementById("gainsinputbox").value;
	$.ajax({
        type: "POST",
       
        
        url: "http://54.172.193.233:8080/stocks/Controller1/postgains",
        
        data: JSON.stringify({ Month : gains }), // Note it is important
        contentType: 'application/json',
        success: function (data) {
        

    }
    

	
});
} 	




	










