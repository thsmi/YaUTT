"use strict";
  
(function() {

  var suite  = net.tschmid.yautt.test;
    
  if (!suite)
    throw "Could not initialize test suite";

  suite.add( function() {  	
  	suite.log("Example unit tests...")
  });    


  suite.add( function() {
    suite.log("Test1 : Test succedded");
  
    // completes without exception, thus it test succeeds,
  });


  suite.add( function() {
    
    suite.log("Test2 : Test fails, exception thrown");

    throw "Some Exception";
  });


  suite.add( function() {
  	
    suite.log("Test3 : Test fails, Assert failed");
    
    // test fails because the assert failes.
    suite.assertEquals("test1","test2");
  });

}());

