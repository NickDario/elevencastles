<?php

?>

@if(isset($assets) && isset($assets['js']))
    @foreach($assets['js'] as $asset)
{{--    <script src="{{ URL::asset('assets/js/'.$asset) }}"></script>--}}
    @endforeach
@endif
