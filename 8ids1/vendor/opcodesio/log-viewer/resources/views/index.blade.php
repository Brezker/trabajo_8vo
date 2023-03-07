<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset(mix('img/log-viewer-32.png', 'vendor/log-viewer')) }}">

    <title>Log Viewer{{ config('app.name') ? ' - ' . config('app.name') : '' }}</title>

    <!-- Style sheets-->
    <link href="{{ asset(mix('app.css', 'vendor/log-viewer')) }}" rel="stylesheet">
</head>

<body class="h-full px-3 lg:px-5 bg-gray-100 dark:bg-gray-900">
<div id="log-viewer" class="flex h-full max-h-screen max-w-full">
    <router-view></router-view>
</div>

@php $showSupportLink = config('log-viewer.show_support_link', true) @endphp
<div class="absolute bottom-4 right-4 flex items-center">
    <p class="text-xs text-gray-400 dark:text-gray-500 @if($showSupportLink) mr-5 -mb-0.5 @endif">
        <span>Version: <span class="font-semibold">{{ \Opcodes\LogViewer\Facades\LogViewer::version() }}</span></span>
    </p>
    @if($showSupportLink)
    <a href="https://www.buymeacoffee.com/arunas" target="_blank">
        <img src="{{ asset(mix('img/bmc.png', 'vendor/log-viewer')) }}" class="h-6" alt="Support me by buying me a cup of coffee ❤️" />
    </a>
    @endif
</div>

<!-- Global LogViewer Object -->
<script>
    window.LogViewer = @json($logViewerScriptVariables);
</script>
<script src="{{ asset(mix('app.js', 'vendor/log-viewer')) }}"></script>
</body>
</html>
