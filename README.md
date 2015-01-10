# YaUTT - Yet Another Unit Test Tool

Why yet another unit test tool? Because non of the existing tools allowes defining unit test configurations which 
can inherit other unit test configurations.

It's a very basic an simple implementation, so don't expect too much.

If you build a Firefox and Thunderbird Addon you'll notice their directory structures are
slightly different than it would be for a website. I suppose this is because of xul overlays and the subscript loader. Both makes it easy to include complex JavaScript structures into existing documents. Thus the tendency is in general to have more and smaller javascript files, like it is done in java every class a own file which leads to a large imports list, which tend to have a specific order.

If you create a new unit test you need to ensure these "imports" are loaded in exactly that specific order. Othewise you'll endup with more or less random script erros. Trying to ensure this in existing unit test is a time-consuming and frustrating task.

It's a very basic and simple implementation, which runs directly within a webbrowser. The overhead is low and it is targeted for tiny and small javascript projects.

### Getting started

There are two basic parts. One it the configuration, it defines which test needs which script files. The other one are the unit tests.

#### Configuration

In order to get started you need to edit configuration in ''./tests/test.json''.  

It's simple json file, which declares all tests and their requirements. Each test defined ist by a separate test object. Such a test objects are identified by a unique name, some kind of a test profile.

Each test profile may contain the following properties.

* require<br/>
    An array which points to all js scripts which are required to run this test profile. 

* extend<br/>
    The name of a base test profile which should be used to extend this test profile. 
    It will inherit all required scripts from the base profile. Properties other than
    "require" are not inherited.   
    
    It's perfectly fine to have multiple levels of inheritance. You may extend a test 
    profile which extends an other test profiless. But be carefull not to build inheritance loops.
    
* script<br/>
    The test script which should be run. It's equivalent to the a unit test. Suche test scripts are 
    very simple they consist of an anyonymous functions which contains all tests in a sequence. But
    you'll read about it in the next chapter.
    
Please not all links to scripts have to be relative to the test.json file. The test.json file can be located anywhere, you justt need to update the location in the index.html. But I suggest to put it into the test directory.

#### Unit Tests
  
Creating a unit test is straight forward. As first step you should nest you tests into an anonymous method.
This eliminates namespace poisoning.

```
"use strict";
  
(function() {

  var suite  = net.tschmid.yautt.test;
    
  if (!suite)
    throw "Could not initialize test suite";
    
    
}())
```

The first command within your anonymous function should grab a reference to the test suite.
The test suit offers a very basic set of methods to register and control tests.

To add a test you simply call the test suit's add method and pass a function which should be run.
A test will pass in case the function does not throw an exception.

That's all you created you first unit test.

Beside the add method, the test suit offers various log methods which support different log levels.
The loglevel is a string which is passed transparently to the test log.

In order to test for quality. Use the asserEquals method. It will compare the two parameters and
throw an exception in case they expected value is not equal to the actual value.

In case your want to abort the test with a failure or you want to skip with as succeeded. You may use
the success and failed methods. 

Sometimes you need to load addition javascipt files during a test. If so use the require method.
It will load javascript files. The path is relative to your test.json file.

In case you need a startup method. Just add a function doing your startup. functions may be reused 
and called at any time. Same applies to tear down.

In this example the startup should be called before and the tear down after earc unit test.
Which results in the following structure.

function startup () {
  // add you code 
};

function teardown () {
  // add you code 
};


suit.add(startup);
suit.add(function() {});
suit.add(teardown);

suit.add(startup);
suit.add(function() {});
suit.add(teardown);


If you want just one startup at the begin and one treardown at the end use the following pattern:

suit.add(function() { //startup code });

suit.add(function() { });
suit.add(function() { });

suit.add(function() { //teardown code });

You can see an example at github
 
### Runing tests

Just open the index.html in your browser and the starts should run. In case a test fails it will
skip processing.


## Bugs

Please report bugs via the [issue tracker](https://github.com/thsmi/YaUTT/issues) 
or send an email to schmid-thomas at gmx.net . 

Give me 1-2 weeks time for a reply. If you did not receive a reply at all, it 
might be a good idea to check your spam filter. 

## License

The extension is free and open source software, it is made available to you 
under the terms of the [GNU Affero General Public License (AGPLv3)](http://www.fsf.org/licensing/licenses/agpl-3.0.html).

Refer to [Licensing information](https://github.com/thsmi/YaUTT/blob/master/LICENSE.md) for details.
