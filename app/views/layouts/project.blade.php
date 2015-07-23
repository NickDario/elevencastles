<?php

?>
<!DOCTYPE HTML>
<html>
    <head>
        @include('includes.head')
    </head>
    <body>
        <div id="project-controls">

        </div>
        <div id="project-container" >
            @yield('content')
            <footer id="default-footer">
                @include('includes._default_footer')
            </footer>
        </div>
        @include('includes._scripts')
    </body>
</html>
