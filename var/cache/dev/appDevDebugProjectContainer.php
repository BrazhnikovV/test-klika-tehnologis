<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerObeuwsh\appDevDebugProjectContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerObeuwsh/appDevDebugProjectContainer.php') {
    touch(__DIR__.'/ContainerObeuwsh.legacy');

    return;
}

if (!\class_exists(appDevDebugProjectContainer::class, false)) {
    \class_alias(\ContainerObeuwsh\appDevDebugProjectContainer::class, appDevDebugProjectContainer::class, false);
}

return new \ContainerObeuwsh\appDevDebugProjectContainer();
