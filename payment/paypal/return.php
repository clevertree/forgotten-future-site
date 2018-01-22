<?php namespace Payment\Paypal;

require('PaypalIPN.php');

set_include_path(dirname(__DIR__, 2));
spl_autoload_register();

header("Location: /index.html");