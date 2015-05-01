# xcroller
Very basic one-line set-up Javascript/jQuery plugin for simple parallax effects

xCroller helps developers and designers to create interesting parallax effects with just one or a few lines of code.

You have to download and include the xCroller Javascript file in your project. 
Important: jQuery must also be in your project for xCroller to work properly.

Using it is very simple: you have to register the elements you want to apply the effect to and initialize the plugin.

To register the elements you can just add the class xCroller to the DOM elements you wish, or assign a jQuery 
selector to the property xCroller.selector.

To initialize the plugin, simply add data-xcroller attribute to the BODY tag. 
You can set it to true, TRUE or 1, or assign a jQuery selector to it. 

You can also initialize it by Javascript running new xCroller([selector],[params]) or xcroller([selector],[params]). You can change the other of these two parameters.

