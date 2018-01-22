<?php
/**
 * Created by PhpStorm.
 * User: ari
 * Date: 1/19/2018
 * Time: 2:43 PM
 */

set_include_path(dirname(__DIR__, 1));
spl_autoload_register();

\FFSite\PGP\PGPWrapper::_test();
\FFSite\Table\UserRow::_test();
