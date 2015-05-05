# xcroller
Very basic one-line set-up Javascript/jQuery plugin for simple parallax effects

xCroller helps developers and designers to create interesting parallax effects with just one or a few lines of code.

You have to download and include the xCroller Javascript file in your project. 
Important: jQuery must also be in your project for xCroller to work properly.

Using it is very simple: you have to register the elements you want to apply the effect to and initialize the plugin.

To register the elements you can just add the class xcroller to the DOM elements you wish, call the method xcroller([selector[,params]]), or even instantiate an xCroller object like this new xCroller([selector[,params]]).

To initialize the plugin, if you didn't do it by Javascript, simply add data-xcroller attribute to the BODY tag. 
You can set it to true, TRUE or 1.
