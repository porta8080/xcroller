<!DOCTYPE html>
<html>
    <head>
        <title></title>

        <script src='https://code.jquery.com/jquery-1.11.3.js'></script>
        <style media="screen">

            section{
                width: 100%;
            }

            body{
                margin: 0px;
                padding: 0px;
            }

            #s1,#s3,#s5,#s7{
                height: 400px;
                background-color: white;
            }

            #s2,#s4,#s6,#s8{
                height: 640px;
                padding: 40px 0px;
                box-sizing: border-box;
                background: #2c3e50;
            }

            #s1{
                background-size: cover;
                text-align: center;
                background-position: center center;
                background-image: url('bg1.jpg');
            }

            #s3{
                background-size: cover;
                background-image: url('bg2.jpg');
            }

            #s5{
                background-image: url('bg4.jpg');
            }

            #s7{
                background-image: url('bg6.png');
            }

            #s1 button{
                border: 0;
                background: #e74c3c;
                padding: 10px 15px;
                color: white;
                font-size: 1.2em;
                border-bottom: 5px solid #c0392b;
                cursor: pointer;
                display: inline-block;
                text-transform: uppercase;
                margin-top: 150px;
                box-shadow: 0px 0px 5px rgba(0,0,0,.5);
            }

            article{
                width: 60%;
                color: white;
            }

        </style>

        <script src='xcroller.min.js'></script>
        <script>
            new xCroller('.xcroller',{mode: 'infinite'});
        </script>
    </head>
    <body>
        <section id='s1' class='xcroller'><div><button>Overlapping</button></div></section>
        <section id='s2' class=''>
            <article>
                <h2>Free to style</h2><p>You can add CSS style as you wish, but the plugin will make a few assumptions and changes to the target elements. Use inner elements to wrap your content and add style more comfortably.</p><p>We actually recommend you to add custom styles to the elements where the effects will be applied. This will make you page look much greater!</p>
                <h2>Sticky effect</h2><p>The element above has the sticky effect that is ideal for sections where you won't use any background image. It simulates a different scroll speed for those elements. The next elements will overlap this one when the page is scrolled.</p>
            </article>
        </section>
        <section id='s3' class='xcroller'></section>
        <section id='s4' class=''>
            <article>
                <h2>3 different efects</h2><p>Currently the plugin has 3 different effects: Sticky, used for element with no background image, Fixed, that makes the element behave like a mask to its background image that covers the whole page, and the default Movable</p>
                <h2>Movable effect</h2><p>You can set a speed to both horizontal and vertical axis (it can be negative, that will reverse the movement of the scrolling) and the background image will move as you scroll the page. If no speed is set, it will ignore the horizontal movement and apply a default speed to the vertical axis, that starts low and increases on later elements.</p>
            </article>
        </section>
        <section id='s5' class='xcroller'></section>
        <section id='s6' class=''>
            <article>
                <h2>Choose the right effect and image</h2><p>
                    Some effects are better for some situations and worse for others. Choose them very carefully. You also have to pay attention to the size of the images you use. If it is a photograh you should choose a big one, specially if it covers the page's background.
                </p>
                <h2>Fixed effect</h2><p>The background image covers the whole page's background and the element will be its frame as you scroll down and up, revealing different parts of the image.</p>
            </article>
        </section>
        <section id='s7' class='xcroller'></section>
        <section id="s8">
            <h2>Infinite scroll</h2>
            <p>
                For a better convenience the background stops scrolling when its limits touch the element's borders. If you need it to keep scrolling, if you have a background pattern, for example, you can set the propety infinite, that will allow an infinite scroll. Infinite scroll with phographs usually don't look good because it starts again when the limit is reached.
            </p>
        </section>
    </body>
</html>
