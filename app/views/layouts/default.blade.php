<?php

?>
<!DOCTYPE HTML>
<html>
    <head>
        @include('includes.head')
    </head>
    <body>
        <div id="default-main-container" >
            <div id="default-sidebar" class="col-sm-2 col-md-1 col-lg-0">
                @include('includes._default_sidebar')
            </div>
            <div id="default-presentation-container" class="container col-md-offset-1 col-sm-offset-2 col-md-11 col-sm-10 col-xs-12">

                <div id="default-content" class="col-sm-12">
                        @yield('content')
                </div>

                <footer id="default-footer">
                        @include('includes._default_footer')
                </footer>
            </div>
        </div>
        @include('includes._scripts')
    </body>
</html>
