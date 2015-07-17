class Illuminate\Foundation\Application#2 (16) {
  protected $booted =>
  bool(false)
  protected $bootingCallbacks =>
  array(0) {
  }
  protected $bootedCallbacks =>
  array(2) {
    [0] =>
    class Closure#270 (2) {
      public $static =>
      array(2) {
        'app' =>
                  ...

        'me' =>
        class Illuminate\View\ViewServiceProvider#263 (2) {
          protected $app =>
                      ...

          protected $defer =>
          bool(false)
        }
      }
      public $this =>
      class Illuminate\View\ViewServiceProvider#263 (2) {
        protected $app =>
                  ...

        protected $defer =>
        bool(false)
      }
    }
    [1] =>
    class Closure#45 (1) {
      public $static =>
      array(2) {
        'app' =>
                  ...

        'env' =>
        string(10) "production"
      }
    }
  }
  protected $finishCallbacks =>
  array(0) {
  }
  protected $shutdownCallbacks =>
  array(0) {
  }
  protected $middlewares =>
  array(0) {
  }
  protected $serviceProviders =>
  array(41) {
    [0] =>
    class Illuminate\Events\EventServiceProvider#11 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [1] =>
    class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [2] =>
    class Illuminate\Routing\RoutingServiceProvider#26 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [3] =>
    class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [4] =>
    class Illuminate\Auth\AuthServiceProvider#57 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [5] =>
    class Illuminate\Cache\CacheServiceProvider#60 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [6] =>
    class Illuminate\Session\CommandsServiceProvider#72 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [7] =>
    class Illuminate\Foundation\Providers\CommandCreatorServiceProvider#77 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [8] =>
    class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [9] =>
    class Illuminate\Foundation\Providers\KeyGeneratorServiceProvider#87 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [10] =>
    class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [11] =>
    class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [12] =>
    class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [13] =>
    class Illuminate\Foundation\Providers\RouteListServiceProvider#121 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [14] =>
    class Illuminate\Foundation\Providers\ServerServiceProvider#125 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [15] =>
    class Illuminate\Foundation\Providers\TinkerServiceProvider#129 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [16] =>
    class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [17] =>
    class Illuminate\Foundation\Providers\ConsoleSupportServiceProvider#76 (4) {
      protected $providers =>
      array(10) {
        [0] =>
        string(61) "Illuminate\Foundation\Providers\CommandCreatorServiceProvider"
        [1] =>
        string(55) "Illuminate\Foundation\Providers\ComposerServiceProvider"
        [2] =>
        string(59) "Illuminate\Foundation\Providers\KeyGeneratorServiceProvider"
        [3] =>
        string(58) "Illuminate\Foundation\Providers\MaintenanceServiceProvider"
        [4] =>
        string(55) "Illuminate\Foundation\Providers\OptimizeServiceProvider"
        [5] =>
        string(56) "Illuminate\Foundation\Providers\PublisherServiceProvider"
        [6] =>
        string(56) "Illuminate\Foundation\Providers\RouteListServiceProvider"
        [7] =>
        string(53) "Illuminate\Foundation\Providers\ServerServiceProvider"
        [8] =>
        string(53) "Illuminate\Foundation\Providers\TinkerServiceProvider"
        [9] =>
        string(43) "Illuminate\Queue\FailConsoleServiceProvider"
      }
      protected $instances =>
      array(10) {
        [0] =>
        class Illuminate\Foundation\Providers\CommandCreatorServiceProvider#77 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [1] =>
        class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [2] =>
        class Illuminate\Foundation\Providers\KeyGeneratorServiceProvider#87 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [3] =>
        class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [4] =>
        class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [5] =>
        class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [6] =>
        class Illuminate\Foundation\Providers\RouteListServiceProvider#121 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [7] =>
        class Illuminate\Foundation\Providers\ServerServiceProvider#125 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [8] =>
        class Illuminate\Foundation\Providers\TinkerServiceProvider#129 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        [9] =>
        class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
      }
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [18] =>
    class Illuminate\Routing\ControllerServiceProvider#145 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [19] =>
    class Illuminate\Cookie\CookieServiceProvider#149 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [20] =>
    class Illuminate\Database\DatabaseServiceProvider#152 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [21] =>
    class Illuminate\Encryption\EncryptionServiceProvider#157 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [22] =>
    class Illuminate\Filesystem\FilesystemServiceProvider#160 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [23] =>
    class Illuminate\Hashing\HashServiceProvider#163 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [24] =>
    class Illuminate\Html\HtmlServiceProvider#166 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [25] =>
    class Illuminate\Log\LogServiceProvider#171 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [26] =>
    class Illuminate\Mail\MailServiceProvider#175 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [27] =>
    class Illuminate\Database\MigrationServiceProvider#178 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [28] =>
    class Illuminate\Pagination\PaginationServiceProvider#198 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [29] =>
    class Illuminate\Queue\QueueServiceProvider#201 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [30] =>
    class Illuminate\Redis\RedisServiceProvider#224 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [31] =>
    class Illuminate\Remote\RemoteServiceProvider#227 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [32] =>
    class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [33] =>
    class Illuminate\Database\SeedServiceProvider#242 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [34] =>
    class Illuminate\Session\SessionServiceProvider#248 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [35] =>
    class Illuminate\Translation\TranslationServiceProvider#253 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [36] =>
    class Illuminate\Validation\ValidationServiceProvider#258 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
    [37] =>
    class Illuminate\View\ViewServiceProvider#263 (2) {
      protected $app =>
              ...

      protected $defer =>
      bool(false)
    }
    [38] =>
    class Illuminate\Workbench\WorkbenchServiceProvider#271 (2) {
      protected $defer =>
      bool(false)
      protected $app =>
              ...

    }
    [39] =>
    class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
      protected $defer =>
      bool(false)
      protected $app =>
              ...

    }
    [40] =>
    class Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider#291 (2) {
      protected $defer =>
      bool(true)
      protected $app =>
              ...

    }
  }
  protected $loadedProviders =>
  array(41) {
    'Illuminate\Events\EventServiceProvider' =>
    bool(true)
    'Illuminate\Exception\ExceptionServiceProvider' =>
    bool(true)
    'Illuminate\Routing\RoutingServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\ArtisanServiceProvider' =>
    bool(true)
    'Illuminate\Auth\AuthServiceProvider' =>
    bool(true)
    'Illuminate\Cache\CacheServiceProvider' =>
    bool(true)
    'Illuminate\Session\CommandsServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\CommandCreatorServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\ComposerServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\KeyGeneratorServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\MaintenanceServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\OptimizeServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\PublisherServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\RouteListServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\ServerServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\TinkerServiceProvider' =>
    bool(true)
    'Illuminate\Queue\FailConsoleServiceProvider' =>
    bool(true)
    'Illuminate\Foundation\Providers\ConsoleSupportServiceProvider' =>
    bool(true)
    'Illuminate\Routing\ControllerServiceProvider' =>
    bool(true)
    'Illuminate\Cookie\CookieServiceProvider' =>
    bool(true)
    'Illuminate\Database\DatabaseServiceProvider' =>
    bool(true)
    'Illuminate\Encryption\EncryptionServiceProvider' =>
    bool(true)
    'Illuminate\Filesystem\FilesystemServiceProvider' =>
    bool(true)
    'Illuminate\Hashing\HashServiceProvider' =>
    bool(true)
    'Illuminate\Html\HtmlServiceProvider' =>
    bool(true)
    'Illuminate\Log\LogServiceProvider' =>
    bool(true)
    'Illuminate\Mail\MailServiceProvider' =>
    bool(true)
    'Illuminate\Database\MigrationServiceProvider' =>
    bool(true)
    'Illuminate\Pagination\PaginationServiceProvider' =>
    bool(true)
    'Illuminate\Queue\QueueServiceProvider' =>
    bool(true)
    'Illuminate\Redis\RedisServiceProvider' =>
    bool(true)
    'Illuminate\Remote\RemoteServiceProvider' =>
    bool(true)
    'Illuminate\Auth\Reminders\ReminderServiceProvider' =>
    bool(true)
    'Illuminate\Database\SeedServiceProvider' =>
    bool(true)
    'Illuminate\Session\SessionServiceProvider' =>
    bool(true)
    'Illuminate\Translation\TranslationServiceProvider' =>
    bool(true)
    'Illuminate\Validation\ValidationServiceProvider' =>
    bool(true)
    'Illuminate\View\ViewServiceProvider' =>
    bool(true)
    'Illuminate\Workbench\WorkbenchServiceProvider' =>
    bool(true)
    'Codesleeve\AssetPipeline\AssetPipelineServiceProvider' =>
    bool(true)
    'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider' =>
    bool(true)
  }
  protected $deferredServices =>
  array(74) {
    'artisan' =>
    string(54) "Illuminate\Foundation\Providers\ArtisanServiceProvider"
    'command.changes' =>
    string(54) "Illuminate\Foundation\Providers\ArtisanServiceProvider"
    'command.environment' =>
    string(54) "Illuminate\Foundation\Providers\ArtisanServiceProvider"
    'auth' =>
    string(35) "Illuminate\Auth\AuthServiceProvider"
    'cache' =>
    string(37) "Illuminate\Cache\CacheServiceProvider"
    'cache.store' =>
    string(37) "Illuminate\Cache\CacheServiceProvider"
    'memcached.connector' =>
    string(37) "Illuminate\Cache\CacheServiceProvider"
    'command.cache.clear' =>
    string(37) "Illuminate\Cache\CacheServiceProvider"
    'command.cache.table' =>
    string(37) "Illuminate\Cache\CacheServiceProvider"
    'command.session.database' =>
    string(42) "Illuminate\Session\CommandsServiceProvider"
    'command.command.make' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'composer' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.dump-autoload' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.key.generate' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.up' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.down' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.optimize' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.clear-compiled' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'asset.publisher' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.asset.publish' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'config.publisher' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.config.publish' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'view.publisher' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.view.publish' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'migration.publisher' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.migrate.publish' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.routes' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.serve' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.tinker' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.queue.failed' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.queue.retry' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.queue.forget' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.queue.flush' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.queue.failed-table' =>
    string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
    'command.controller.make' =>
    string(44) "Illuminate\Routing\ControllerServiceProvider"
    'hash' =>
    string(38) "Illuminate\Hashing\HashServiceProvider"
    'html' =>
    string(35) "Illuminate\Html\HtmlServiceProvider"
    'form' =>
    string(35) "Illuminate\Html\HtmlServiceProvider"
    'log' =>
    string(33) "Illuminate\Log\LogServiceProvider"
    'Psr\Log\LoggerInterface' =>
    string(33) "Illuminate\Log\LogServiceProvider"
    'mailer' =>
    string(35) "Illuminate\Mail\MailServiceProvider"
    'swift.mailer' =>
    string(35) "Illuminate\Mail\MailServiceProvider"
    'swift.transport' =>
    string(35) "Illuminate\Mail\MailServiceProvider"
    'migrator' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'migration.repository' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate.rollback' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate.reset' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate.refresh' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate.install' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'migration.creator' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'command.migrate.make' =>
    string(44) "Illuminate\Database\MigrationServiceProvider"
    'paginator' =>
    string(47) "Illuminate\Pagination\PaginationServiceProvider"
    'queue' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'queue.worker' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'queue.listener' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'queue.failer' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'command.queue.work' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'command.queue.listen' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'command.queue.restart' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'command.queue.subscribe' =>
    string(37) "Illuminate\Queue\QueueServiceProvider"
    'redis' =>
    string(37) "Illuminate\Redis\RedisServiceProvider"
    'remote' =>
    string(39) "Illuminate\Remote\RemoteServiceProvider"
    'auth.reminder' =>
    string(49) "Illuminate\Auth\Reminders\ReminderServiceProvider"
    'auth.reminder.repository' =>
    string(49) "Illuminate\Auth\Reminders\ReminderServiceProvider"
    'command.auth.reminders' =>
    string(49) "Illuminate\Auth\Reminders\ReminderServiceProvider"
    'seeder' =>
    string(39) "Illuminate\Database\SeedServiceProvider"
    'command.seed' =>
    string(39) "Illuminate\Database\SeedServiceProvider"
    'translator' =>
    string(49) "Illuminate\Translation\TranslationServiceProvider"
    'translation.loader' =>
    string(49) "Illuminate\Translation\TranslationServiceProvider"
    'validator' =>
    string(47) "Illuminate\Validation\ValidationServiceProvider"
    'validation.presence' =>
    string(47) "Illuminate\Validation\ValidationServiceProvider"
    'command.ide-helper.generate' =>
    string(50) "Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider"
    'command.ide-helper.models' =>
    string(50) "Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider"
  }
  protected $resolved =>
  array(8) {
    'events' =>
    bool(true)
    'whoops.handler' =>
    bool(true)
    'whoops' =>
    bool(true)
    'exception.debug' =>
    bool(true)
    'exception.plain' =>
    bool(true)
    'exception' =>
    bool(true)
    'env' =>
    bool(true)
    'files' =>
    bool(true)
  }
  protected $bindings =>
  array(101) {
    'events' =>
    array(2) {
      'concrete' =>
      class Closure#13 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#12 (2) {
            public $this =>
            class Illuminate\Events\EventServiceProvider#11 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          class Illuminate\Events\Dispatcher#14 (5) {
            protected $container =>
                          ...

            protected $listeners =>
            array(1) {
              'artisan.start' =>
              array(1) {
                [0] =>
                array(26) {
                  [0] =>
                  class Closure#56 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(3) {
                        [0] =>
                        string(12) "command.tail"
                        [1] =>
                        string(15) "command.changes"
                        [2] =>
                        string(19) "command.environment"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [1] =>
                  class Closure#71 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(2) {
                        [0] =>
                        string(19) "command.cache.clear"
                        [1] =>
                        string(19) "command.cache.table"
                      }
                    }
                    public $this =>
                    class Illuminate\Cache\CacheServiceProvider#60 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [2] =>
                  class Closure#75 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(24) "command.session.database"
                      }
                    }
                    public $this =>
                    class Illuminate\Session\CommandsServiceProvider#72 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [3] =>
                  class Closure#80 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(20) "command.command.make"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\CommandCreatorServiceProvider#77 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [4] =>
                  class Closure#86 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(21) "command.dump-autoload"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [5] =>
                  class Closure#90 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(20) "command.key.generate"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\KeyGeneratorServiceProvider#87 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [6] =>
                  class Closure#96 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(2) {
                        [0] =>
                        string(10) "command.up"
                        [1] =>
                        string(12) "command.down"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [7] =>
                  class Closure#102 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(2) {
                        [0] =>
                        string(16) "command.optimize"
                        [1] =>
                        string(22) "command.clear-compiled"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [8] =>
                  class Closure#120 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(4) {
                        [0] =>
                        string(21) "command.asset.publish"
                        [1] =>
                        string(22) "command.config.publish"
                        [2] =>
                        string(20) "command.view.publish"
                        [3] =>
                        string(23) "command.migrate.publish"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [9] =>
                  class Closure#124 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(14) "command.routes"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\RouteListServiceProvider#121 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [10] =>
                  class Closure#128 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(13) "command.serve"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\ServerServiceProvider#125 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [11] =>
                  class Closure#132 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(14) "command.tinker"
                      }
                    }
                    public $this =>
                    class Illuminate\Foundation\Providers\TinkerServiceProvider#129 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [12] =>
                  class Closure#144 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(5) {
                        [0] =>
                        string(20) "command.queue.failed"
                        [1] =>
                        string(19) "command.queue.retry"
                        [2] =>
                        string(20) "command.queue.forget"
                        [3] =>
                        string(19) "command.queue.flush"
                        [4] =>
                        string(26) "command.queue.failed-table"
                      }
                    }
                    public $this =>
                    class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [13] =>
                  class Closure#148 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(23) "command.controller.make"
                      }
                    }
                    public $this =>
                    class Illuminate\Routing\ControllerServiceProvider#145 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [14] =>
                  class Closure#197 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(6) {
                        [0] =>
                        string(15) "command.migrate"
                        [1] =>
                        string(20) "command.migrate.make"
                        [2] =>
                        string(23) "command.migrate.install"
                        [3] =>
                        string(24) "command.migrate.rollback"
                        [4] =>
                        string(21) "command.migrate.reset"
                        [5] =>
                        string(23) "command.migrate.refresh"
                      }
                    }
                    public $this =>
                    class Illuminate\Database\MigrationServiceProvider#178 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [15] =>
                  class Closure#206 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(18) "command.queue.work"
                      }
                    }
                    public $this =>
                    class Illuminate\Queue\QueueServiceProvider#201 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [16] =>
                  class Closure#209 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(21) "command.queue.restart"
                      }
                    }
                    public $this =>
                    class Illuminate\Queue\QueueServiceProvider#201 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [17] =>
                  class Closure#214 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(20) "command.queue.listen"
                      }
                    }
                    public $this =>
                    class Illuminate\Queue\QueueServiceProvider#201 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [18] =>
                  class Closure#219 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(23) "command.queue.subscribe"
                      }
                    }
                    public $this =>
                    class Illuminate\Queue\QueueServiceProvider#201 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [19] =>
                  class Closure#241 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(3) {
                        [0] =>
                        string(22) "command.auth.reminders"
                        [1] =>
                        string(28) "command.auth.reminders.clear"
                        [2] =>
                        string(33) "command.auth.reminders.controller"
                      }
                    }
                    public $this =>
                    class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [20] =>
                  class Closure#247 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(12) "command.seed"
                      }
                    }
                    public $this =>
                    class Illuminate\Database\SeedServiceProvider#242 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [21] =>
                  class Closure#276 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(17) "command.workbench"
                      }
                    }
                    public $this =>
                    class Illuminate\Workbench\WorkbenchServiceProvider#271 (2) {
                      protected $defer =>
                      bool(false)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [22] =>
                  class Closure#288 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(12) "assets.setup"
                      }
                    }
                    public $this =>
                    class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                      protected $defer =>
                      bool(false)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [23] =>
                  class Closure#289 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(12) "assets.clean"
                      }
                    }
                    public $this =>
                    class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                      protected $defer =>
                      bool(false)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [24] =>
                  class Closure#290 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(1) {
                        [0] =>
                        string(15) "assets.generate"
                      }
                    }
                    public $this =>
                    class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                      protected $defer =>
                      bool(false)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                  [25] =>
                  class Closure#296 (3) {
                    public $static =>
                    array(1) {
                      'commands' =>
                      array(2) {
                        [0] =>
                        string(27) "command.ide-helper.generate"
                        [1] =>
                        string(25) "command.ide-helper.models"
                      }
                    }
                    public $this =>
                    class Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider#291 (2) {
                      protected $defer =>
                      bool(true)
                      protected $app =>
                                              ...

                    }
                    public $parameter =>
                    array(1) {
                      '$artisan' =>
                      string(10) "<required>"
                    }
                  }
                }
              }
            }
            protected $wildcards =>
            array(0) {
            }
            protected $sorted =>
            array(41) {
              'Illuminate\Events\EventServiceProvider' =>
              array(0) {
              }
              'Illuminate\Exception\ExceptionServiceProvider' =>
              array(0) {
              }
              'Illuminate\Routing\RoutingServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\ArtisanServiceProvider' =>
              array(0) {
              }
              'Illuminate\Auth\AuthServiceProvider' =>
              array(0) {
              }
              'Illuminate\Cache\CacheServiceProvider' =>
              array(0) {
              }
              'Illuminate\Session\CommandsServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\CommandCreatorServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\ComposerServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\KeyGeneratorServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\MaintenanceServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\OptimizeServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\PublisherServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\RouteListServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\ServerServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\TinkerServiceProvider' =>
              array(0) {
              }
              'Illuminate\Queue\FailConsoleServiceProvider' =>
              array(0) {
              }
              'Illuminate\Foundation\Providers\ConsoleSupportServiceProvider' =>
              array(0) {
              }
              'Illuminate\Routing\ControllerServiceProvider' =>
              array(0) {
              }
              'Illuminate\Cookie\CookieServiceProvider' =>
              array(0) {
              }
              'Illuminate\Database\DatabaseServiceProvider' =>
              array(0) {
              }
              'Illuminate\Encryption\EncryptionServiceProvider' =>
              array(0) {
              }
              'Illuminate\Filesystem\FilesystemServiceProvider' =>
              array(0) {
              }
              'Illuminate\Hashing\HashServiceProvider' =>
              array(0) {
              }
              'Illuminate\Html\HtmlServiceProvider' =>
              array(0) {
              }
              'Illuminate\Log\LogServiceProvider' =>
              array(0) {
              }
              'Illuminate\Mail\MailServiceProvider' =>
              array(0) {
              }
              'Illuminate\Database\MigrationServiceProvider' =>
              array(0) {
              }
              'Illuminate\Pagination\PaginationServiceProvider' =>
              array(0) {
              }
              'Illuminate\Queue\QueueServiceProvider' =>
              array(0) {
              }
              'Illuminate\Redis\RedisServiceProvider' =>
              array(0) {
              }
              'Illuminate\Remote\RemoteServiceProvider' =>
              array(0) {
              }
              'Illuminate\Auth\Reminders\ReminderServiceProvider' =>
              array(0) {
              }
              'Illuminate\Database\SeedServiceProvider' =>
              array(0) {
              }
              'Illuminate\Session\SessionServiceProvider' =>
              array(0) {
              }
              'Illuminate\Translation\TranslationServiceProvider' =>
              array(0) {
              }
              'Illuminate\Validation\ValidationServiceProvider' =>
              array(0) {
              }
              'Illuminate\View\ViewServiceProvider' =>
              array(0) {
              }
              'Illuminate\Workbench\WorkbenchServiceProvider' =>
              array(0) {
              }
              'Codesleeve\AssetPipeline\AssetPipelineServiceProvider' =>
              array(0) {
              }
              'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider' =>
              array(0) {
              }
            }
            protected $firing =>
            array(0) {
            }
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'exception.plain' =>
    array(2) {
      'concrete' =>
      class Closure#17 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#16 (2) {
            public $this =>
            class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          class Illuminate\Exception\WhoopsDisplayer#41 (2) {
            protected $whoops =>
            class Whoops\Run#42 (7) {
              protected $isRegistered =>
              NULL
              protected $allowQuit =>
              bool(false)
              protected $sendOutput =>
              bool(false)
              protected $sendHttpCode =>
              int(500)
              protected $handlerStack =>
              array(1) {
                [0] =>
                class Whoops\Handler\JsonResponseHandler#43 (5) {
                  private $returnFrames =>
                  bool(false)
                  private $onlyForAjaxRequests =>
                  bool(false)
                  private $run =>
                  NULL
                  private $inspector =>
                  NULL
                  private $exception =>
                  NULL
                }
              }
              protected $silencedPatterns =>
              array(0) {
              }
              private $canThrowExceptions =>
              bool(true)
            }
            protected $runningInConsole =>
            bool(true)
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'whoops.handler' =>
    array(2) {
      'concrete' =>
      class Closure#19 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#18 (1) {
            public $this =>
            class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
          }
          'object' =>
          class Whoops\Handler\JsonResponseHandler#43 (5) {
            private $returnFrames =>
            bool(false)
            private $onlyForAjaxRequests =>
            bool(false)
            private $run =>
            NULL
            private $inspector =>
            NULL
            private $exception =>
            NULL
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'whoops' =>
    array(2) {
      'concrete' =>
      class Closure#21 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#20 (2) {
            public $this =>
            class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          class Whoops\Run#42 (7) {
            protected $isRegistered =>
            NULL
            protected $allowQuit =>
            bool(false)
            protected $sendOutput =>
            bool(false)
            protected $sendHttpCode =>
            int(500)
            protected $handlerStack =>
            array(1) {
              [0] =>
              class Whoops\Handler\JsonResponseHandler#43 (5) {
                private $returnFrames =>
                bool(false)
                private $onlyForAjaxRequests =>
                bool(false)
                private $run =>
                NULL
                private $inspector =>
                NULL
                private $exception =>
                NULL
              }
            }
            protected $silencedPatterns =>
            array(0) {
            }
            private $canThrowExceptions =>
            bool(true)
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'exception.debug' =>
    array(2) {
      'concrete' =>
      class Closure#23 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#22 (2) {
            public $this =>
            class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          class Illuminate\Exception\WhoopsDisplayer#41 (2) {
            protected $whoops =>
            class Whoops\Run#42 (7) {
              protected $isRegistered =>
              NULL
              protected $allowQuit =>
              bool(false)
              protected $sendOutput =>
              bool(false)
              protected $sendHttpCode =>
              int(500)
              protected $handlerStack =>
              array(1) {
                [0] =>
                class Whoops\Handler\JsonResponseHandler#43 (5) {
                  private $returnFrames =>
                  bool(false)
                  private $onlyForAjaxRequests =>
                  bool(false)
                  private $run =>
                  NULL
                  private $inspector =>
                  NULL
                  private $exception =>
                  NULL
                }
              }
              protected $silencedPatterns =>
              array(0) {
              }
              private $canThrowExceptions =>
              bool(true)
            }
            protected $runningInConsole =>
            bool(true)
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'exception' =>
    array(2) {
      'concrete' =>
      class Closure#25 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#24 (2) {
            public $this =>
            class Illuminate\Exception\ExceptionServiceProvider#15 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          class Illuminate\Exception\Handler#40 (6) {
            protected $responsePreparer =>
                          ...

            protected $plainDisplayer =>
            class Illuminate\Exception\WhoopsDisplayer#41 (2) {
              protected $whoops =>
              class Whoops\Run#42 (7) {
                protected $isRegistered =>
                NULL
                protected $allowQuit =>
                bool(false)
                protected $sendOutput =>
                bool(false)
                protected $sendHttpCode =>
                int(500)
                protected $handlerStack =>
                array(1) {
                  [0] =>
                  class Whoops\Handler\JsonResponseHandler#43 (5) {
                    private $returnFrames =>
                    bool(false)
                    private $onlyForAjaxRequests =>
                    bool(false)
                    private $run =>
                    NULL
                    private $inspector =>
                    NULL
                    private $exception =>
                    NULL
                  }
                }
                protected $silencedPatterns =>
                array(0) {
                }
                private $canThrowExceptions =>
                bool(true)
              }
              protected $runningInConsole =>
              bool(true)
            }
            protected $debugDisplayer =>
            class Illuminate\Exception\WhoopsDisplayer#41 (2) {
              protected $whoops =>
              class Whoops\Run#42 (7) {
                protected $isRegistered =>
                NULL
                protected $allowQuit =>
                bool(false)
                protected $sendOutput =>
                bool(false)
                protected $sendHttpCode =>
                int(500)
                protected $handlerStack =>
                array(1) {
                  [0] =>
                  class Whoops\Handler\JsonResponseHandler#43 (5) {
                    private $returnFrames =>
                    bool(false)
                    private $onlyForAjaxRequests =>
                    bool(false)
                    private $run =>
                    NULL
                    private $inspector =>
                    NULL
                    private $exception =>
                    NULL
                  }
                }
                protected $silencedPatterns =>
                array(0) {
                }
                private $canThrowExceptions =>
                bool(true)
              }
              protected $runningInConsole =>
              bool(true)
            }
            protected $debug =>
            bool(false)
            protected $handlers =>
            array(0) {
            }
            protected $handled =>
            array(0) {
            }
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'router' =>
    array(2) {
      'concrete' =>
      class Closure#28 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#27 (2) {
            public $this =>
            class Illuminate\Routing\RoutingServiceProvider#26 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'url' =>
    array(2) {
      'concrete' =>
      class Closure#30 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#29 (2) {
            public $this =>
            class Illuminate\Routing\RoutingServiceProvider#26 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'redirect' =>
    array(2) {
      'concrete' =>
      class Closure#32 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#31 (2) {
            public $this =>
            class Illuminate\Routing\RoutingServiceProvider#26 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'env' =>
    array(2) {
      'concrete' =>
      class Closure#33 (2) {
        public $static =>
        array(1) {
          'value' =>
          string(10) "production"
        }
        public $this =>
                  ...

      }
      'shared' =>
      bool(false)
    }
    'artisan' =>
    array(2) {
      'concrete' =>
      class Closure#49 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#48 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.tail' =>
    array(2) {
      'concrete' =>
      class Closure#51 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#50 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.changes' =>
    array(2) {
      'concrete' =>
      class Closure#53 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#52 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.environment' =>
    array(2) {
      'concrete' =>
      class Closure#55 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#54 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'auth' =>
    array(2) {
      'concrete' =>
      class Closure#59 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#58 (2) {
            public $this =>
            class Illuminate\Auth\AuthServiceProvider#57 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'cache' =>
    array(2) {
      'concrete' =>
      class Closure#62 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#61 (2) {
            public $this =>
            class Illuminate\Cache\CacheServiceProvider#60 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'cache.store' =>
    array(2) {
      'concrete' =>
      class Closure#64 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#63 (2) {
            public $this =>
            class Illuminate\Cache\CacheServiceProvider#60 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'memcached.connector' =>
    array(2) {
      'concrete' =>
      class Closure#66 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#65 (1) {
            public $this =>
            class Illuminate\Cache\CacheServiceProvider#60 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.cache.clear' =>
    array(2) {
      'concrete' =>
      class Closure#68 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#67 (2) {
            public $this =>
            class Illuminate\Cache\CacheServiceProvider#60 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.cache.table' =>
    array(2) {
      'concrete' =>
      class Closure#70 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#69 (2) {
            public $this =>
            class Illuminate\Cache\CacheServiceProvider#60 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.session.database' =>
    array(2) {
      'concrete' =>
      class Closure#74 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#73 (2) {
            public $this =>
            class Illuminate\Session\CommandsServiceProvider#72 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.command.make' =>
    array(2) {
      'concrete' =>
      class Closure#79 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#78 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\CommandCreatorServiceProvider#77 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'composer' =>
    array(2) {
      'concrete' =>
      class Closure#83 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#82 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.dump-autoload' =>
    array(2) {
      'concrete' =>
      class Closure#85 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#84 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.key.generate' =>
    array(2) {
      'concrete' =>
      class Closure#89 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#88 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\KeyGeneratorServiceProvider#87 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.up' =>
    array(2) {
      'concrete' =>
      class Closure#93 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#92 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.down' =>
    array(2) {
      'concrete' =>
      class Closure#95 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#94 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.optimize' =>
    array(2) {
      'concrete' =>
      class Closure#99 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#98 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.clear-compiled' =>
    array(2) {
      'concrete' =>
      class Closure#101 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#100 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.asset.publish' =>
    array(2) {
      'concrete' =>
      class Closure#105 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#104 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'asset.publisher' =>
    array(2) {
      'concrete' =>
      class Closure#107 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#106 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.config.publish' =>
    array(2) {
      'concrete' =>
      class Closure#109 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#108 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'config.publisher' =>
    array(2) {
      'concrete' =>
      class Closure#111 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#110 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.view.publish' =>
    array(2) {
      'concrete' =>
      class Closure#113 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#112 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'view.publisher' =>
    array(2) {
      'concrete' =>
      class Closure#115 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#114 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.publish' =>
    array(2) {
      'concrete' =>
      class Closure#117 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#116 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'migration.publisher' =>
    array(2) {
      'concrete' =>
      class Closure#119 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#118 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.routes' =>
    array(2) {
      'concrete' =>
      class Closure#123 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#122 (2) {
            public $this =>
            class Illuminate\Foundation\Providers\RouteListServiceProvider#121 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.serve' =>
    array(2) {
      'concrete' =>
      class Closure#127 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#126 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\ServerServiceProvider#125 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.tinker' =>
    array(2) {
      'concrete' =>
      class Closure#131 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#130 (1) {
            public $this =>
            class Illuminate\Foundation\Providers\TinkerServiceProvider#129 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.failed' =>
    array(2) {
      'concrete' =>
      class Closure#135 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#134 (1) {
            public $this =>
            class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.retry' =>
    array(2) {
      'concrete' =>
      class Closure#137 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#136 (1) {
            public $this =>
            class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.forget' =>
    array(2) {
      'concrete' =>
      class Closure#139 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#138 (1) {
            public $this =>
            class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.flush' =>
    array(2) {
      'concrete' =>
      class Closure#141 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#140 (1) {
            public $this =>
            class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.failed-table' =>
    array(2) {
      'concrete' =>
      class Closure#143 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#142 (2) {
            public $this =>
            class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.controller.make' =>
    array(2) {
      'concrete' =>
      class Closure#147 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#146 (2) {
            public $this =>
            class Illuminate\Routing\ControllerServiceProvider#145 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'cookie' =>
    array(2) {
      'concrete' =>
      class Closure#151 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#150 (2) {
            public $this =>
            class Illuminate\Cookie\CookieServiceProvider#149 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'db.factory' =>
    array(2) {
      'concrete' =>
      class Closure#154 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#153 (2) {
            public $this =>
            class Illuminate\Database\DatabaseServiceProvider#152 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'db' =>
    array(2) {
      'concrete' =>
      class Closure#156 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#155 (2) {
            public $this =>
            class Illuminate\Database\DatabaseServiceProvider#152 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'encrypter' =>
    array(2) {
      'concrete' =>
      class Closure#159 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#158 (2) {
            public $this =>
            class Illuminate\Encryption\EncryptionServiceProvider#157 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'files' =>
    array(2) {
      'concrete' =>
      class Closure#162 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#161 (1) {
            public $this =>
            class Illuminate\Filesystem\FilesystemServiceProvider#160 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
          }
          'object' =>
          class Illuminate\Filesystem\Filesystem#278 (0) {
          }
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'hash' =>
    array(2) {
      'concrete' =>
      class Closure#165 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#164 (1) {
            public $this =>
            class Illuminate\Hashing\HashServiceProvider#163 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'html' =>
    array(2) {
      'concrete' =>
      class Closure#168 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#167 (2) {
            public $this =>
            class Illuminate\Html\HtmlServiceProvider#166 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'form' =>
    array(2) {
      'concrete' =>
      class Closure#170 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#169 (2) {
            public $this =>
            class Illuminate\Html\HtmlServiceProvider#166 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'Psr\Log\LoggerInterface' =>
    array(2) {
      'concrete' =>
      class Closure#174 (2) {
        public $this =>
        class Illuminate\Log\LogServiceProvider#171 (2) {
          protected $defer =>
          bool(true)
          protected $app =>
                      ...

        }
        public $parameter =>
        array(1) {
          '$app' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'mailer' =>
    array(2) {
      'concrete' =>
      class Closure#177 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#176 (3) {
            public $static =>
            array(1) {
              'me' =>
              class Illuminate\Mail\MailServiceProvider#175 (2) {
                protected $defer =>
                bool(true)
                protected $app =>
                                  ...

              }
            }
            public $this =>
            class Illuminate\Mail\MailServiceProvider#175 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'migration.repository' =>
    array(2) {
      'concrete' =>
      class Closure#180 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#179 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'migrator' =>
    array(2) {
      'concrete' =>
      class Closure#182 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#181 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate' =>
    array(2) {
      'concrete' =>
      class Closure#184 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#183 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.rollback' =>
    array(2) {
      'concrete' =>
      class Closure#186 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#185 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.reset' =>
    array(2) {
      'concrete' =>
      class Closure#188 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#187 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.refresh' =>
    array(2) {
      'concrete' =>
      class Closure#190 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#189 (1) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.install' =>
    array(2) {
      'concrete' =>
      class Closure#192 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#191 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'migration.creator' =>
    array(2) {
      'concrete' =>
      class Closure#194 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#193 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.migrate.make' =>
    array(2) {
      'concrete' =>
      class Closure#196 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#195 (2) {
            public $this =>
            class Illuminate\Database\MigrationServiceProvider#178 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'paginator' =>
    array(2) {
      'concrete' =>
      class Closure#200 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#199 (2) {
            public $this =>
            class Illuminate\Pagination\PaginationServiceProvider#198 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'queue' =>
    array(2) {
      'concrete' =>
      class Closure#203 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#202 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.work' =>
    array(2) {
      'concrete' =>
      class Closure#205 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#204 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.restart' =>
    array(2) {
      'concrete' =>
      class Closure#208 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#207 (1) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'queue.worker' =>
    array(2) {
      'concrete' =>
      class Closure#211 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#210 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.listen' =>
    array(2) {
      'concrete' =>
      class Closure#213 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#212 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'queue.listener' =>
    array(2) {
      'concrete' =>
      class Closure#216 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#215 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.queue.subscribe' =>
    array(2) {
      'concrete' =>
      class Closure#218 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#217 (1) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'queue.failer' =>
    array(2) {
      'concrete' =>
      class Closure#221 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#220 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'IlluminateQueueClosure' =>
    array(2) {
      'concrete' =>
      class Closure#223 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#222 (2) {
            public $this =>
            class Illuminate\Queue\QueueServiceProvider#201 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'redis' =>
    array(2) {
      'concrete' =>
      class Closure#226 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#225 (2) {
            public $this =>
            class Illuminate\Redis\RedisServiceProvider#224 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'remote' =>
    array(2) {
      'concrete' =>
      class Closure#229 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#228 (2) {
            public $this =>
            class Illuminate\Remote\RemoteServiceProvider#227 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'auth.reminder' =>
    array(2) {
      'concrete' =>
      class Closure#232 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#231 (2) {
            public $this =>
            class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'auth.reminder.repository' =>
    array(2) {
      'concrete' =>
      class Closure#234 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#233 (2) {
            public $this =>
            class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.auth.reminders' =>
    array(2) {
      'concrete' =>
      class Closure#236 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#235 (2) {
            public $this =>
            class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.auth.reminders.clear' =>
    array(2) {
      'concrete' =>
      class Closure#238 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#237 (1) {
            public $this =>
            class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.auth.reminders.controller' =>
    array(2) {
      'concrete' =>
      class Closure#240 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#239 (2) {
            public $this =>
            class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.seed' =>
    array(2) {
      'concrete' =>
      class Closure#244 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#243 (2) {
            public $this =>
            class Illuminate\Database\SeedServiceProvider#242 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'seeder' =>
    array(2) {
      'concrete' =>
      class Closure#246 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#245 (1) {
            public $this =>
            class Illuminate\Database\SeedServiceProvider#242 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'session' =>
    array(2) {
      'concrete' =>
      class Closure#250 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#249 (2) {
            public $this =>
            class Illuminate\Session\SessionServiceProvider#248 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'session.store' =>
    array(2) {
      'concrete' =>
      class Closure#252 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#251 (2) {
            public $this =>
            class Illuminate\Session\SessionServiceProvider#248 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'translation.loader' =>
    array(2) {
      'concrete' =>
      class Closure#255 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#254 (2) {
            public $this =>
            class Illuminate\Translation\TranslationServiceProvider#253 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'translator' =>
    array(2) {
      'concrete' =>
      class Closure#257 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#256 (2) {
            public $this =>
            class Illuminate\Translation\TranslationServiceProvider#253 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'validation.presence' =>
    array(2) {
      'concrete' =>
      class Closure#260 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#259 (2) {
            public $this =>
            class Illuminate\Validation\ValidationServiceProvider#258 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'validator' =>
    array(2) {
      'concrete' =>
      class Closure#262 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#261 (2) {
            public $this =>
            class Illuminate\Validation\ValidationServiceProvider#258 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'view.engine.resolver' =>
    array(2) {
      'concrete' =>
      class Closure#265 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#264 (1) {
            public $this =>
            class Illuminate\View\ViewServiceProvider#263 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'view.finder' =>
    array(2) {
      'concrete' =>
      class Closure#267 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#266 (2) {
            public $this =>
            class Illuminate\View\ViewServiceProvider#263 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'view' =>
    array(2) {
      'concrete' =>
      class Closure#269 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#268 (2) {
            public $this =>
            class Illuminate\View\ViewServiceProvider#263 (2) {
              protected $app =>
                              ...

              protected $defer =>
              bool(false)
            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'package.creator' =>
    array(2) {
      'concrete' =>
      class Closure#273 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#272 (2) {
            public $this =>
            class Illuminate\Workbench\WorkbenchServiceProvider#271 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'command.workbench' =>
    array(2) {
      'concrete' =>
      class Closure#275 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#274 (2) {
            public $this =>
            class Illuminate\Workbench\WorkbenchServiceProvider#271 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(true)
    }
    'asset' =>
    array(2) {
      'concrete' =>
      class Closure#281 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#280 (2) {
            public $this =>
            class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'assets.setup' =>
    array(2) {
      'concrete' =>
      class Closure#283 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#282 (2) {
            public $this =>
            class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'assets.clean' =>
    array(2) {
      'concrete' =>
      class Closure#285 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#284 (2) {
            public $this =>
            class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'assets.generate' =>
    array(2) {
      'concrete' =>
      class Closure#287 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#286 (2) {
            public $this =>
            class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
              protected $defer =>
              bool(false)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'command.ide-helper.generate' =>
    array(2) {
      'concrete' =>
      class Closure#293 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#292 (2) {
            public $this =>
            class Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider#291 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
            public $parameter =>
            array(1) {
              '$app' =>
              string(10) "<required>"
            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
    'command.ide-helper.models' =>
    array(2) {
      'concrete' =>
      class Closure#295 (3) {
        public $static =>
        array(2) {
          'closure' =>
          class Closure#294 (1) {
            public $this =>
            class Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider#291 (2) {
              protected $defer =>
              bool(true)
              protected $app =>
                              ...

            }
          }
          'object' =>
          NULL
        }
        public $this =>
                  ...

        public $parameter =>
        array(1) {
          '$container' =>
          string(10) "<required>"
        }
      }
      'shared' =>
      bool(false)
    }
  }
  protected $instances =>
  array(10) {
    'request' =>
    class Illuminate\Http\Request#46 (23) {
      protected $json =>
      NULL
      protected $sessionStore =>
      NULL
      public $attributes =>
      class Symfony\Component\HttpFoundation\ParameterBag#299 (1) {
        protected $parameters =>
        array(0) {
        }
      }
      public $request =>
      class Symfony\Component\HttpFoundation\ParameterBag#297 (1) {
        protected $parameters =>
        array(0) {
        }
      }
      public $query =>
      class Symfony\Component\HttpFoundation\ParameterBag#298 (1) {
        protected $parameters =>
        array(0) {
        }
      }
      public $server =>
      class Symfony\Component\HttpFoundation\ServerBag#302 (1) {
        protected $parameters =>
        array(88) {
          'SERVER_NAME' =>
          string(9) "localhost"
          'SERVER_PORT' =>
          int(80)
          'HTTP_HOST' =>
          string(9) "localhost"
          'HTTP_USER_AGENT' =>
          string(11) "Symfony/2.X"
          'HTTP_ACCEPT' =>
          string(63) "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          'HTTP_ACCEPT_LANGUAGE' =>
          string(14) "en-us,en;q=0.5"
          'HTTP_ACCEPT_CHARSET' =>
          string(30) "ISO-8859-1,utf-8;q=0.7,*;q=0.7"
          'REMOTE_ADDR' =>
          string(9) "127.0.0.1"
          'SCRIPT_NAME' =>
          string(7) "artisan"
          'SCRIPT_FILENAME' =>
          string(7) "artisan"
          'SERVER_PROTOCOL' =>
          string(8) "HTTP/1.1"
          'REQUEST_TIME' =>
          int(1424112305)
          'XDG_VTNR' =>
          string(1) "7"
          'XDG_SESSION_ID' =>
          string(2) "c2"
          'CLUTTER_IM_MODULE' =>
          string(3) "xim"
          'SELINUX_INIT' =>
          string(3) "YES"
          'XDG_GREETER_DATA_DIR' =>
          string(28) "/var/lib/lightdm-data/ndario"
          'COMP_WORDBREAKS' =>
          string(12) " 	
"'><;|&(:"
          'SESSION' =>
          string(6) "ubuntu"
          'GPG_AGENT_INFO' =>
          string(37) "/run/user/1000/keyring-FkyxZZ/gpg:0:1"
          'SHELL' =>
          string(9) "/bin/bash"
          'XDG_MENU_PREFIX' =>
          string(6) "gnome-"
          'VTE_VERSION' =>
          string(4) "3409"
          'TERM' =>
          string(5) "xterm"
          'WINDOWID' =>
          string(8) "86024169"
          'UPSTART_SESSION' =>
          string(51) "unix:abstract=/com/ubuntu/upstart-session/1000/1836"
          'GNOME_KEYRING_CONTROL' =>
          string(29) "/run/user/1000/keyring-FkyxZZ"
          'GTK_MODULES' =>
          string(34) "overlay-scrollbar:unity-gtk-module"
          'USER' =>
          string(6) "ndario"
          'LS_COLORS' =>
          string(1302) "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:"
          'XDG_SESSION_PATH' =>
          string(40) "/org/freedesktop/DisplayManager/Session0"
          'XDG_SEAT_PATH' =>
          string(37) "/org/freedesktop/DisplayManager/Seat0"
          'SSH_AUTH_SOCK' =>
          string(33) "/run/user/1000/keyring-FkyxZZ/ssh"
          'SESSION_MANAGER' =>
          string(63) "local/Tsuga:@/tmp/.ICE-unix/1985,unix/Tsuga:/tmp/.ICE-unix/1985"
          'DEFAULTS_PATH' =>
          string(36) "/usr/share/gconf/ubuntu.default.path"
          'XDG_CONFIG_DIRS' =>
          string(51) "/etc/xdg/xdg-ubuntu:/usr/share/upstart/xdg:/etc/xdg"
          'PATH' =>
          string(170) "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/opt/opengl/glew/includes:/opt/opengl/glfw/include/GLFW:/opt/opengl/glew/includes"
          'DESKTOP_SESSION' =>
          string(6) "ubuntu"
          'QT_IM_MODULE' =>
          string(4) "ibus"
          'QT_QPA_PLATFORMTHEME' =>
          string(11) "appmenu-qt5"
          'JOB' =>
          string(13) "gnome-session"
          'PWD' =>
          string(38) "/home/ndario/Develop/web/elevencastles"
          'XMODIFIERS' =>
          string(8) "@im=ibus"
          'GNOME_KEYRING_PID' =>
          string(4) "1831"
          'LANG' =>
          string(11) "en_US.UTF-8"
          'GDM_LANG' =>
          string(5) "en_US"
          'MANDATORY_PATH' =>
          string(38) "/usr/share/gconf/ubuntu.mandatory.path"
          'UBUNTU_MENUPROXY' =>
          string(1) "1"
          'IM_CONFIG_PHASE' =>
          string(1) "1"
          'COMPIZ_CONFIG_PROFILE' =>
          string(6) "ubuntu"
          'GDMSESSION' =>
          string(6) "ubuntu"
          'SESSIONTYPE' =>
          string(13) "gnome-session"
          'SHLVL' =>
          string(1) "1"
          'XDG_SEAT' =>
          string(5) "seat0"
          'HOME' =>
          string(12) "/home/ndario"
          'LANGUAGE' =>
          string(5) "en_US"
          'GNOME_DESKTOP_SESSION_ID' =>
          string(18) "this-is-deprecated"
          'UPSTART_INSTANCE' =>
          string(0) ""
          'UPSTART_EVENTS' =>
          string(16) "started starting"
          'LOGNAME' =>
          string(6) "ndario"
          'COMPIZ_BIN_PATH' =>
          string(9) "/usr/bin/"
          'QT4_IM_MODULE' =>
          string(3) "xim"
          'XDG_DATA_DIRS' =>
          string(64) "/usr/share/ubuntu:/usr/share/gnome:/usr/local/share/:/usr/share/"
          'DBUS_SESSION_BUS_ADDRESS' =>
          string(34) "unix:abstract=/tmp/dbus-AgaWPxP8YB"
          'LESSOPEN' =>
          string(22) "| /usr/bin/lesspipe %s"
          'INSTANCE' =>
          string(5) "Unity"
          'UPSTART_JOB' =>
          string(21) "unity-settings-daemon"
          'TEXTDOMAIN' =>
          string(9) "im-config"
          'XDG_RUNTIME_DIR' =>
          string(14) "/run/user/1000"
          'DISPLAY' =>
          string(2) ":0"
          'XDG_CURRENT_DESKTOP' =>
          string(5) "Unity"
          'GTK_IM_MODULE' =>
          string(4) "ibus"
          'LESSCLOSE' =>
          string(23) "/usr/bin/lesspipe %s %s"
          'TEXTDOMAINDIR' =>
          string(18) "/usr/share/locale/"
          'COLORTERM' =>
          string(14) "gnome-terminal"
          'XAUTHORITY' =>
          string(24) "/home/ndario/.Xauthority"
          'OLDPWD' =>
          string(12) "/home/ndario"
          '_' =>
          string(12) "/usr/bin/php"
          'PHP_SELF' =>
          string(7) "artisan"
          'PATH_TRANSLATED' =>
          string(7) "artisan"
          'DOCUMENT_ROOT' =>
          string(0) ""
          'REQUEST_TIME_FLOAT' =>
          double(1424112305.5605)
          'argv' =>
          array(1) {
            [0] =>
            string(7) "artisan"
          }
          'argc' =>
          int(1)
          'PATH_INFO' =>
          string(0) ""
          'REQUEST_METHOD' =>
          string(3) "GET"
          'REQUEST_URI' =>
          string(1) "/"
          'QUERY_STRING' =>
          string(0) ""
        }
      }
      public $files =>
      class Symfony\Component\HttpFoundation\FileBag#301 (1) {
        protected $parameters =>
        array(0) {
        }
      }
      public $cookies =>
      class Symfony\Component\HttpFoundation\ParameterBag#300 (1) {
        protected $parameters =>
        array(0) {
        }
      }
      public $headers =>
      class Symfony\Component\HttpFoundation\HeaderBag#303 (2) {
        protected $headers =>
        array(5) {
          'host' =>
          array(1) {
            [0] =>
            string(9) "localhost"
          }
          'user-agent' =>
          array(1) {
            [0] =>
            string(11) "Symfony/2.X"
          }
          'accept' =>
          array(1) {
            [0] =>
            string(63) "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          }
          'accept-language' =>
          array(1) {
            [0] =>
            string(14) "en-us,en;q=0.5"
          }
          'accept-charset' =>
          array(1) {
            [0] =>
            string(30) "ISO-8859-1,utf-8;q=0.7,*;q=0.7"
          }
        }
        protected $cacheControl =>
        array(0) {
        }
      }
      protected $content =>
      NULL
      protected $languages =>
      NULL
      protected $charsets =>
      NULL
      protected $encodings =>
      NULL
      protected $acceptableContentTypes =>
      NULL
      protected $pathInfo =>
      NULL
      protected $requestUri =>
      NULL
      protected $baseUrl =>
      NULL
      protected $basePath =>
      NULL
      protected $method =>
      NULL
      protected $format =>
      NULL
      protected $session =>
      NULL
      protected $locale =>
      NULL
      protected $defaultLocale =>
      string(2) "en"
    }
    'Illuminate\Container\Container' =>
          ...

    'path' =>
    string(42) "/home/ndario/Develop/web/elevencastles/app"
    'path.public' =>
    string(45) "/home/ndario/Develop/web/elevencastles/public"
    'path.base' =>
    string(38) "/home/ndario/Develop/web/elevencastles"
    'path.storage' =>
    string(50) "/home/ndario/Develop/web/elevencastles/app/storage"
    'app' =>
          ...

    'config' =>
    class Illuminate\Config\Repository#37 (6) {
      protected $loader =>
      class Illuminate\Config\FileLoader#38 (4) {
        protected $files =>
        class Illuminate\Filesystem\Filesystem#39 (0) {
        }
        protected $defaultPath =>
        string(49) "/home/ndario/Develop/web/elevencastles/app/config"
        protected $hints =>
        array(1) {
          'asset-pipeline' =>
          string(82) "/home/ndario/Develop/web/elevencastles/vendor/codesleeve/asset-pipeline/src/config"
        }
        protected $exists =>
        array(0) {
        }
      }
      protected $environment =>
      string(10) "production"
      protected $items =>
      array(2) {
        '*::app' =>
        array(10) {
          'debug' =>
          bool(false)
          'url' =>
          string(16) "http://localhost"
          'timezone' =>
          string(3) "UTC"
          'locale' =>
          string(2) "en"
          'fallback_locale' =>
          string(2) "en"
          'key' =>
          string(16) "YourSecretKey!!!"
          'cipher' =>
          string(12) "rijndael-128"
          'providers' =>
          array(28) {
            [0] =>
            string(54) "Illuminate\Foundation\Providers\ArtisanServiceProvider"
            [1] =>
            string(35) "Illuminate\Auth\AuthServiceProvider"
            [2] =>
            string(37) "Illuminate\Cache\CacheServiceProvider"
            [3] =>
            string(42) "Illuminate\Session\CommandsServiceProvider"
            [4] =>
            string(61) "Illuminate\Foundation\Providers\ConsoleSupportServiceProvider"
            [5] =>
            string(44) "Illuminate\Routing\ControllerServiceProvider"
            [6] =>
            string(39) "Illuminate\Cookie\CookieServiceProvider"
            [7] =>
            string(43) "Illuminate\Database\DatabaseServiceProvider"
            [8] =>
            string(47) "Illuminate\Encryption\EncryptionServiceProvider"
            [9] =>
            string(47) "Illuminate\Filesystem\FilesystemServiceProvider"
            [10] =>
            string(38) "Illuminate\Hashing\HashServiceProvider"
            [11] =>
            string(35) "Illuminate\Html\HtmlServiceProvider"
            [12] =>
            string(33) "Illuminate\Log\LogServiceProvider"
            [13] =>
            string(35) "Illuminate\Mail\MailServiceProvider"
            [14] =>
            string(44) "Illuminate\Database\MigrationServiceProvider"
            [15] =>
            string(47) "Illuminate\Pagination\PaginationServiceProvider"
            [16] =>
            string(37) "Illuminate\Queue\QueueServiceProvider"
            [17] =>
            string(37) "Illuminate\Redis\RedisServiceProvider"
            [18] =>
            string(39) "Illuminate\Remote\RemoteServiceProvider"
            [19] =>
            string(49) "Illuminate\Auth\Reminders\ReminderServiceProvider"
            [20] =>
            string(39) "Illuminate\Database\SeedServiceProvider"
            [21] =>
            string(41) "Illuminate\Session\SessionServiceProvider"
            [22] =>
            string(49) "Illuminate\Translation\TranslationServiceProvider"
            [23] =>
            string(47) "Illuminate\Validation\ValidationServiceProvider"
            [24] =>
            string(35) "Illuminate\View\ViewServiceProvider"
            [25] =>
            string(45) "Illuminate\Workbench\WorkbenchServiceProvider"
            [26] =>
            string(53) "Codesleeve\AssetPipeline\AssetPipelineServiceProvider"
            [27] =>
            string(50) "Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider"
          }
          'manifest' =>
          string(55) "/home/ndario/Develop/web/elevencastles/app/storage/meta"
          'aliases' =>
          array(38) {
            'App' =>
            string(30) "Illuminate\Support\Facades\App"
            'Artisan' =>
            string(34) "Illuminate\Support\Facades\Artisan"
            'Auth' =>
            string(31) "Illuminate\Support\Facades\Auth"
            'Blade' =>
            string(32) "Illuminate\Support\Facades\Blade"
            'Cache' =>
            string(32) "Illuminate\Support\Facades\Cache"
            'ClassLoader' =>
            string(30) "Illuminate\Support\ClassLoader"
            'Config' =>
            string(33) "Illuminate\Support\Facades\Config"
            'Controller' =>
            string(29) "Illuminate\Routing\Controller"
            'Cookie' =>
            string(33) "Illuminate\Support\Facades\Cookie"
            'Crypt' =>
            string(32) "Illuminate\Support\Facades\Crypt"
            'DB' =>
            string(29) "Illuminate\Support\Facades\DB"
            'Eloquent' =>
            string(34) "Illuminate\Database\Eloquent\Model"
            'Event' =>
            string(32) "Illuminate\Support\Facades\Event"
            'File' =>
            string(31) "Illuminate\Support\Facades\File"
            'Form' =>
            string(31) "Illuminate\Support\Facades\Form"
            'Hash' =>
            string(31) "Illuminate\Support\Facades\Hash"
            'HTML' =>
            string(31) "Illuminate\Support\Facades\HTML"
            'Input' =>
            string(32) "Illuminate\Support\Facades\Input"
            'Lang' =>
            string(31) "Illuminate\Support\Facades\Lang"
            'Log' =>
            string(30) "Illuminate\Support\Facades\Log"
            'Mail' =>
            string(31) "Illuminate\Support\Facades\Mail"
            'Paginator' =>
            string(36) "Illuminate\Support\Facades\Paginator"
            'Password' =>
            string(35) "Illuminate\Support\Facades\Password"
            'Queue' =>
            string(32) "Illuminate\Support\Facades\Queue"
            'Redirect' =>
            string(35) "Illuminate\Support\Facades\Redirect"
            'Redis' =>
            string(32) "Illuminate\Support\Facades\Redis"
            'Request' =>
            string(34) "Illuminate\Support\Facades\Request"
            'Response' =>
            string(35) "Illuminate\Support\Facades\Response"
            'Route' =>
            string(32) "Illuminate\Support\Facades\Route"
            'Schema' =>
            string(33) "Illuminate\Support\Facades\Schema"
            'Seeder' =>
            string(26) "Illuminate\Database\Seeder"
            'Session' =>
            string(34) "Illuminate\Support\Facades\Session"
            'SoftDeletingTrait' =>
            string(46) "Illuminate\Database\Eloquent\SoftDeletingTrait"
            'SSH' =>
            string(30) "Illuminate\Support\Facades\SSH"
            'Str' =>
            string(22) "Illuminate\Support\Str"
            'URL' =>
            string(30) "Illuminate\Support\Facades\URL"
            'Validator' =>
            string(36) "Illuminate\Support\Facades\Validator"
            'View' =>
            string(31) "Illuminate\Support\Facades\View"
          }
        }
        '*::session' =>
        array(11) {
          'driver' =>
          string(5) "array"
          'lifetime' =>
          int(120)
          'expire_on_close' =>
          bool(false)
          'files' =>
          string(59) "/home/ndario/Develop/web/elevencastles/app/storage/sessions"
          'connection' =>
          NULL
          'table' =>
          string(8) "sessions"
          'lottery' =>
          array(2) {
            [0] =>
            int(2)
            [1] =>
            int(100)
          }
          'cookie' =>
          string(15) "laravel_session"
          'path' =>
          string(1) "/"
          'domain' =>
          NULL
          'secure' =>
          bool(false)
        }
      }
      protected $packages =>
      array(1) {
        [0] =>
        string(14) "asset-pipeline"
      }
      protected $afterLoad =>
      array(1) {
        'asset-pipeline' =>
        class Closure#279 (3) {
          public $static =>
          array(1) {
            'package' =>
            string(25) "codesleeve/asset-pipeline"
          }
          public $this =>
                      ...

          public $parameter =>
          array(3) {
            '$me' =>
            string(10) "<required>"
            '$group' =>
            string(10) "<required>"
            '$items' =>
            string(10) "<required>"
          }
        }
      }
      protected $parsed =>
      array(5) {
        'app.debug' =>
        array(3) {
          [0] =>
          NULL
          [1] =>
          string(3) "app"
          [2] =>
          string(5) "debug"
        }
        'app' =>
        array(3) {
          [0] =>
          NULL
          [1] =>
          string(3) "app"
          [2] =>
          NULL
        }
        'app.manifest' =>
        array(3) {
          [0] =>
          NULL
          [1] =>
          string(3) "app"
          [2] =>
          string(8) "manifest"
        }
        'session.driver' =>
        array(3) {
          [0] =>
          NULL
          [1] =>
          string(7) "session"
          [2] =>
          string(6) "driver"
        }
        'app.url' =>
        array(3) {
          [0] =>
          NULL
          [1] =>
          string(3) "app"
          [2] =>
          string(3) "url"
        }
      }
    }
    'log' =>
    class Illuminate\Log\Writer#172 (3) {
      protected $monolog =>
      class Monolog\Logger#173 (3) {
        protected $name =>
        string(10) "production"
        protected $handlers =>
        array(0) {
        }
        protected $processors =>
        array(0) {
        }
      }
      protected $levels =>
      array(8) {
        [0] =>
        string(5) "debug"
        [1] =>
        string(4) "info"
        [2] =>
        string(6) "notice"
        [3] =>
        string(7) "warning"
        [4] =>
        string(5) "error"
        [5] =>
        string(8) "critical"
        [6] =>
        string(5) "alert"
        [7] =>
        string(9) "emergency"
      }
      protected $dispatcher =>
      class Illuminate\Events\Dispatcher#14 (5) {
        protected $container =>
                  ...

        protected $listeners =>
        array(1) {
          'artisan.start' =>
          array(1) {
            [0] =>
            array(26) {
              [0] =>
              class Closure#56 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(3) {
                    [0] =>
                    string(12) "command.tail"
                    [1] =>
                    string(15) "command.changes"
                    [2] =>
                    string(19) "command.environment"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\ArtisanServiceProvider#47 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [1] =>
              class Closure#71 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(2) {
                    [0] =>
                    string(19) "command.cache.clear"
                    [1] =>
                    string(19) "command.cache.table"
                  }
                }
                public $this =>
                class Illuminate\Cache\CacheServiceProvider#60 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [2] =>
              class Closure#75 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(24) "command.session.database"
                  }
                }
                public $this =>
                class Illuminate\Session\CommandsServiceProvider#72 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [3] =>
              class Closure#80 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(20) "command.command.make"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\CommandCreatorServiceProvider#77 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [4] =>
              class Closure#86 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(21) "command.dump-autoload"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\ComposerServiceProvider#81 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [5] =>
              class Closure#90 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(20) "command.key.generate"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\KeyGeneratorServiceProvider#87 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [6] =>
              class Closure#96 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(2) {
                    [0] =>
                    string(10) "command.up"
                    [1] =>
                    string(12) "command.down"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\MaintenanceServiceProvider#91 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [7] =>
              class Closure#102 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(2) {
                    [0] =>
                    string(16) "command.optimize"
                    [1] =>
                    string(22) "command.clear-compiled"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\OptimizeServiceProvider#97 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [8] =>
              class Closure#120 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(4) {
                    [0] =>
                    string(21) "command.asset.publish"
                    [1] =>
                    string(22) "command.config.publish"
                    [2] =>
                    string(20) "command.view.publish"
                    [3] =>
                    string(23) "command.migrate.publish"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\PublisherServiceProvider#103 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [9] =>
              class Closure#124 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(14) "command.routes"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\RouteListServiceProvider#121 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [10] =>
              class Closure#128 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(13) "command.serve"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\ServerServiceProvider#125 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [11] =>
              class Closure#132 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(14) "command.tinker"
                  }
                }
                public $this =>
                class Illuminate\Foundation\Providers\TinkerServiceProvider#129 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [12] =>
              class Closure#144 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(5) {
                    [0] =>
                    string(20) "command.queue.failed"
                    [1] =>
                    string(19) "command.queue.retry"
                    [2] =>
                    string(20) "command.queue.forget"
                    [3] =>
                    string(19) "command.queue.flush"
                    [4] =>
                    string(26) "command.queue.failed-table"
                  }
                }
                public $this =>
                class Illuminate\Queue\FailConsoleServiceProvider#133 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [13] =>
              class Closure#148 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(23) "command.controller.make"
                  }
                }
                public $this =>
                class Illuminate\Routing\ControllerServiceProvider#145 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [14] =>
              class Closure#197 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(6) {
                    [0] =>
                    string(15) "command.migrate"
                    [1] =>
                    string(20) "command.migrate.make"
                    [2] =>
                    string(23) "command.migrate.install"
                    [3] =>
                    string(24) "command.migrate.rollback"
                    [4] =>
                    string(21) "command.migrate.reset"
                    [5] =>
                    string(23) "command.migrate.refresh"
                  }
                }
                public $this =>
                class Illuminate\Database\MigrationServiceProvider#178 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [15] =>
              class Closure#206 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(18) "command.queue.work"
                  }
                }
                public $this =>
                class Illuminate\Queue\QueueServiceProvider#201 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [16] =>
              class Closure#209 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(21) "command.queue.restart"
                  }
                }
                public $this =>
                class Illuminate\Queue\QueueServiceProvider#201 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [17] =>
              class Closure#214 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(20) "command.queue.listen"
                  }
                }
                public $this =>
                class Illuminate\Queue\QueueServiceProvider#201 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [18] =>
              class Closure#219 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(23) "command.queue.subscribe"
                  }
                }
                public $this =>
                class Illuminate\Queue\QueueServiceProvider#201 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [19] =>
              class Closure#241 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(3) {
                    [0] =>
                    string(22) "command.auth.reminders"
                    [1] =>
                    string(28) "command.auth.reminders.clear"
                    [2] =>
                    string(33) "command.auth.reminders.controller"
                  }
                }
                public $this =>
                class Illuminate\Auth\Reminders\ReminderServiceProvider#230 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [20] =>
              class Closure#247 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(12) "command.seed"
                  }
                }
                public $this =>
                class Illuminate\Database\SeedServiceProvider#242 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [21] =>
              class Closure#276 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(17) "command.workbench"
                  }
                }
                public $this =>
                class Illuminate\Workbench\WorkbenchServiceProvider#271 (2) {
                  protected $defer =>
                  bool(false)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [22] =>
              class Closure#288 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(12) "assets.setup"
                  }
                }
                public $this =>
                class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                  protected $defer =>
                  bool(false)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [23] =>
              class Closure#289 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(12) "assets.clean"
                  }
                }
                public $this =>
                class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                  protected $defer =>
                  bool(false)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [24] =>
              class Closure#290 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(1) {
                    [0] =>
                    string(15) "assets.generate"
                  }
                }
                public $this =>
                class Codesleeve\AssetPipeline\AssetPipelineServiceProvider#277 (2) {
                  protected $defer =>
                  bool(false)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
              [25] =>
              class Closure#296 (3) {
                public $static =>
                array(1) {
                  'commands' =>
                  array(2) {
                    [0] =>
                    string(27) "command.ide-helper.generate"
                    [1] =>
                    string(25) "command.ide-helper.models"
                  }
                }
                public $this =>
                class Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider#291 (2) {
                  protected $defer =>
                  bool(true)
                  protected $app =>
                                      ...

                }
                public $parameter =>
                array(1) {
                  '$artisan' =>
                  string(10) "<required>"
                }
              }
            }
          }
        }
        protected $wildcards =>
        array(0) {
        }
        protected $sorted =>
        array(41) {
          'Illuminate\Events\EventServiceProvider' =>
          array(0) {
          }
          'Illuminate\Exception\ExceptionServiceProvider' =>
          array(0) {
          }
          'Illuminate\Routing\RoutingServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\ArtisanServiceProvider' =>
          array(0) {
          }
          'Illuminate\Auth\AuthServiceProvider' =>
          array(0) {
          }
          'Illuminate\Cache\CacheServiceProvider' =>
          array(0) {
          }
          'Illuminate\Session\CommandsServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\CommandCreatorServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\ComposerServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\KeyGeneratorServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\MaintenanceServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\OptimizeServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\PublisherServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\RouteListServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\ServerServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\TinkerServiceProvider' =>
          array(0) {
          }
          'Illuminate\Queue\FailConsoleServiceProvider' =>
          array(0) {
          }
          'Illuminate\Foundation\Providers\ConsoleSupportServiceProvider' =>
          array(0) {
          }
          'Illuminate\Routing\ControllerServiceProvider' =>
          array(0) {
          }
          'Illuminate\Cookie\CookieServiceProvider' =>
          array(0) {
          }
          'Illuminate\Database\DatabaseServiceProvider' =>
          array(0) {
          }
          'Illuminate\Encryption\EncryptionServiceProvider' =>
          array(0) {
          }
          'Illuminate\Filesystem\FilesystemServiceProvider' =>
          array(0) {
          }
          'Illuminate\Hashing\HashServiceProvider' =>
          array(0) {
          }
          'Illuminate\Html\HtmlServiceProvider' =>
          array(0) {
          }
          'Illuminate\Log\LogServiceProvider' =>
          array(0) {
          }
          'Illuminate\Mail\MailServiceProvider' =>
          array(0) {
          }
          'Illuminate\Database\MigrationServiceProvider' =>
          array(0) {
          }
          'Illuminate\Pagination\PaginationServiceProvider' =>
          array(0) {
          }
          'Illuminate\Queue\QueueServiceProvider' =>
          array(0) {
          }
          'Illuminate\Redis\RedisServiceProvider' =>
          array(0) {
          }
          'Illuminate\Remote\RemoteServiceProvider' =>
          array(0) {
          }
          'Illuminate\Auth\Reminders\ReminderServiceProvider' =>
          array(0) {
          }
          'Illuminate\Database\SeedServiceProvider' =>
          array(0) {
          }
          'Illuminate\Session\SessionServiceProvider' =>
          array(0) {
          }
          'Illuminate\Translation\TranslationServiceProvider' =>
          array(0) {
          }
          'Illuminate\Validation\ValidationServiceProvider' =>
          array(0) {
          }
          'Illuminate\View\ViewServiceProvider' =>
          array(0) {
          }
          'Illuminate\Workbench\WorkbenchServiceProvider' =>
          array(0) {
          }
          'Codesleeve\AssetPipeline\AssetPipelineServiceProvider' =>
          array(0) {
          }
          'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider' =>
          array(0) {
          }
        }
        protected $firing =>
        array(0) {
        }
      }
    }
    'files' =>
    class Illuminate\Filesystem\Filesystem#278 (0) {
    }
  }
  protected $aliases =>
  array(32) {
    'Illuminate\Foundation\Application' =>
    string(3) "app"
    'Illuminate\Console\Application' =>
    string(7) "artisan"
    'Illuminate\Auth\AuthManager' =>
    string(4) "auth"
    'Illuminate\Auth\Reminders\ReminderRepositoryInterface' =>
    string(24) "auth.reminder.repository"
    'Illuminate\View\Compilers\BladeCompiler' =>
    string(14) "blade.compiler"
    'Illuminate\Cache\CacheManager' =>
    string(5) "cache"
    'Illuminate\Cache\Repository' =>
    string(11) "cache.store"
    'Illuminate\Config\Repository' =>
    string(6) "config"
    'Illuminate\Cookie\CookieJar' =>
    string(6) "cookie"
    'Illuminate\Encryption\Encrypter' =>
    string(9) "encrypter"
    'Illuminate\Database\DatabaseManager' =>
    string(2) "db"
    'Illuminate\Events\Dispatcher' =>
    string(6) "events"
    'Illuminate\Filesystem\Filesystem' =>
    string(5) "files"
    'Illuminate\Html\FormBuilder' =>
    string(4) "form"
    'Illuminate\Hashing\HasherInterface' =>
    string(4) "hash"
    'Illuminate\Html\HtmlBuilder' =>
    string(4) "html"
    'Illuminate\Translation\Translator' =>
    string(10) "translator"
    'Illuminate\Log\Writer' =>
    string(3) "log"
    'Illuminate\Mail\Mailer' =>
    string(6) "mailer"
    'Illuminate\Pagination\Factory' =>
    string(9) "paginator"
    'Illuminate\Auth\Reminders\PasswordBroker' =>
    string(13) "auth.reminder"
    'Illuminate\Queue\QueueManager' =>
    string(5) "queue"
    'Illuminate\Routing\Redirector' =>
    string(8) "redirect"
    'Illuminate\Redis\Database' =>
    string(5) "redis"
    'Illuminate\Http\Request' =>
    string(7) "request"
    'Illuminate\Routing\Router' =>
    string(6) "router"
    'Illuminate\Session\SessionManager' =>
    string(7) "session"
    'Illuminate\Session\Store' =>
    string(13) "session.store"
    'Illuminate\Remote\RemoteManager' =>
    string(6) "remote"
    'Illuminate\Routing\UrlGenerator' =>
    string(3) "url"
    'Illuminate\Validation\Factory' =>
    string(9) "validator"
    'Illuminate\View\Factory' =>
    string(4) "view"
  }
  protected $reboundCallbacks =>
  array(0) {
  }
  protected $resolvingCallbacks =>
  array(0) {
  }
  protected $globalResolvingCallbacks =>
  array(0) {
  }
}
[32mLaravel Framework[39m version [33m4.2.16[39m

[33mUsage:[39m
  [options] command [arguments]

[33mOptions:[39m
  [32m--help[39m           [32m-h[39m Display this help message
  [32m--quiet[39m          [32m-q[39m Do not output any message
  [32m--verbose[39m        [32m-v|vv|vvv[39m Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
  [32m--version[39m        [32m-V[39m Display this application version
  [32m--ansi[39m              Force ANSI output
  [32m--no-ansi[39m           Disable ANSI output
  [32m--no-interaction[39m [32m-n[39m Do not ask any interactive question
  [32m--env[39m               The environment the command should run under.

[33mAvailable commands:[39m
  [32mchanges                    [39m Display the framework change list
  [32mclear-compiled             [39m Remove the compiled class file
  [32mdown                       [39m Put the application into maintenance mode
  [32mdump-autoload              [39m Regenerate framework autoload files
  [32menv                        [39m Display the current framework environment
  [32mhelp                       [39m Displays help for a command
  [32mlist                       [39m Lists commands
  [32mmigrate                    [39m Run the database migrations
  [32moptimize                   [39m Optimize the framework for better performance
  [32mroutes                     [39m List all registered routes
  [32mserve                      [39m Serve the application on the PHP development server
  [32mtail                       [39m Tail a log file on a remote server
  [32mtinker                     [39m Interact with your application
  [32mup                         [39m Bring the application out of maintenance mode
  [32mworkbench                  [39m Create a new package workbench
[33masset[39m
  [32masset:publish              [39m Publish a package's assets to the public directory
[33massets[39m
  [32massets:clean               [39m Cleans out all your cached assets
  [32massets:generate            [39m Generate static assets in your public folder
  [32massets:setup               [39m Setup the default asset pipeline folders in your new Laravel project
[33mauth[39m
  [32mauth:clear-reminders       [39m Flush expired reminders.
  [32mauth:reminders-controller  [39m Create a stub password reminder controller
  [32mauth:reminders-table       [39m Create a migration for the password reminders table
[33mcache[39m
  [32mcache:clear                [39m Flush the application cache
  [32mcache:table                [39m Create a migration for the cache database table
[33mcommand[39m
  [32mcommand:make               [39m Create a new Artisan command
[33mconfig[39m
  [32mconfig:publish             [39m Publish a package's configuration to the application
[33mcontroller[39m
  [32mcontroller:make            [39m Create a new resourceful controller
[33mdb[39m
  [32mdb:seed                    [39m Seed the database with records
[33mide-helper[39m
  [32mide-helper:generate        [39m Generate a new IDE Helper file.
  [32mide-helper:models          [39m Generate autocompletion for models
[33mkey[39m
  [32mkey:generate               [39m Set the application key
[33mmigrate[39m
  [32mmigrate:install            [39m Create the migration repository
  [32mmigrate:make               [39m Create a new migration file
  [32mmigrate:publish            [39m Publish a package's migrations to the application
  [32mmigrate:refresh            [39m Reset and re-run all migrations
  [32mmigrate:reset              [39m Rollback all database migrations
  [32mmigrate:rollback           [39m Rollback the last database migration
[33mqueue[39m
  [32mqueue:failed               [39m List all of the failed queue jobs
  [32mqueue:failed-table         [39m Create a migration for the failed queue jobs database table
  [32mqueue:flush                [39m Flush all of the failed queue jobs
  [32mqueue:forget               [39m Delete a failed queue job
  [32mqueue:listen               [39m Listen to a given queue
  [32mqueue:restart              [39m Restart queue worker daemons after their current job.
  [32mqueue:retry                [39m Retry a failed queue job
  [32mqueue:subscribe            [39m Subscribe a URL to an Iron.io push queue
  [32mqueue:work                 [39m Process the next job on a queue
[33msession[39m
  [32msession:table              [39m Create a migration for the session database table
[33mview[39m
  [32mview:publish               [39m Publish a package's views to the application
