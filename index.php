<script src='https://code.jquery.com/jquery-1.11.3.js'></script>
<script src='xcroller.js'></script>

<style media="screen">
    #img1{
        height: 400px;
        width: 100%;
        background-size: cover;
    }
</style>
<img style="background-image: url('examples/bg1.jpg')" alt="" id='img1'/>
<script type="text/javascript">
        $(function(){
            setTimeout(function(){
                console.log(BIS.get($('#img1')))
            },700)

        })
</script>
