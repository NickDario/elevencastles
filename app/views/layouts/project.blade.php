<?php
/**
 * @var array() $projects
 */
?>
<!DOCTYPE HTML>
<html>
    <head>
        @include('includes.head')
    </head>
    <body>
        <div id="project-navigation">
            <span id="nav-toggle" class="btn-ctrl btn-menu">Menu</span>
            <div id="nav-menu">
                <?php foreach ($projects as $project): ?>
                    <a href="{{url('/', array('pid' => $project['id']))}}" id="<?php echo $project['id'];?>" class="btn-ctrl btn-menu"><?php echo $project['name'];?></a>
                <?php endforeach; ?>
            </div>
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
