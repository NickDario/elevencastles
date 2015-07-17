<?php ?>
<!DOCTYPE HTML>
<html>
    <head>
        @include('includes.head')
    </head>
    <body>
        <div id="blank-main-container" >
            <div id="blank-content">
                    @yield('content')
            </div>

            <footer id="blank-footer">
{{--                    @include('includes._blank_footer')--}}
            </footer>
        </div>
        @include('includes._scripts')
    </body>
</html>
