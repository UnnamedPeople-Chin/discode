"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingsModalWebviewHtml = getSettingsModalWebviewHtml;
function getSettingsModalWebviewHtml() {
    return `<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>DisCode Settings</title>
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'unsafe-inline';"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"/>
    <style>

html, body { margin:0; padding:0; height:100%; overflow:hidden; }
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #0d0e11; }
::-webkit-scrollbar-thumb { background: #262a36; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #d70028; }
.font-headline-xl, .font-headline-lg, .font-headline-sm { font-family: "Noto Serif", serif; }
.font-code-inline, .font-body-md, .font-label-md, .font-label-sm { font-family: "Space Mono", monospace; }
*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:""}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-bottom-1{bottom:-.25rem}.-right-1{right:-.25rem}.bottom-0{bottom:0}.left-0{left:0}.right-0{right:0}.right-2{right:.5rem}.right-3{right:.75rem}.top-0{top:0}.top-2{top:.5rem}.z-50{z-index:50}.m-3{margin:.75rem}.-mt-8{margin-top:-2rem}.mb-2{margin-bottom:.5rem}.mb-2\.5{margin-bottom:.625rem}.mb-5{margin-bottom:1.25rem}.mt-0\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\.5{margin-top:.375rem}.mt-2{margin-top:.5rem}.mt-auto{margin-top:auto}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.h-1{height:.25rem}.h-1\.5{height:.375rem}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-14{height:3.5rem}.h-2{height:.5rem}.h-2\.5{height:.625rem}.h-24{height:6rem}.h-3{height:.75rem}.h-3\.5{height:.875rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-8{height:2rem}.h-full{height:100%}.h-screen{height:100vh}.w-1\.5{width:.375rem}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-14{width:3.5rem}.w-2{width:.5rem}.w-2\.5{width:.625rem}.w-3\.5{width:.875rem}.w-3\/4{width:75%}.w-4{width:1rem}.w-60{width:15rem}.w-8{width:2rem}.w-80{width:20rem}.w-9{width:2.25rem}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\[170px\]{max-width:170px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}@keyframes ping{75%,to{transform:scale(2);opacity:0}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0\.5{gap:.125rem}.gap-1{gap:.25rem}.gap-1\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-2\.5{gap:.625rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-4{border-width:4px}.border-b{border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-2{border-left-width:2px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-\[\#18191c\]{--tw-border-opacity:1;border-color:rgb(24 25 28/var(--tw-border-opacity,1))}.border-outline-variant\/10{border-color:rgba(68,70,79,.1)}.border-outline-variant\/20{border-color:rgba(68,70,79,.2)}.border-outline-variant\/30{border-color:rgba(68,70,79,.3)}.border-outline-variant\/40{border-color:rgba(68,70,79,.4)}.border-primary{--tw-border-opacity:1;border-color:rgb(255 180 171/var(--tw-border-opacity,1))}.border-transparent{border-color:transparent}.border-white\/5{border-color:hsla(0,0%,100%,.05)}.bg-\[\#111214\]{--tw-bg-opacity:1;background-color:rgb(17 18 20/var(--tw-bg-opacity,1))}.bg-\[\#18191c\]{--tw-bg-opacity:1;background-color:rgb(24 25 28/var(--tw-bg-opacity,1))}.bg-\[\#1e1f22\]{--tw-bg-opacity:1;background-color:rgb(30 31 34/var(--tw-bg-opacity,1))}.bg-\[\#23a55a\]{--tw-bg-opacity:1;background-color:rgb(35 165 90/var(--tw-bg-opacity,1))}.bg-\[\#2b2d31\]{--tw-bg-opacity:1;background-color:rgb(43 45 49/var(--tw-bg-opacity,1))}.bg-\[\#f0b232\]{--tw-bg-opacity:1;background-color:rgb(240 178 50/var(--tw-bg-opacity,1))}.bg-primary{--tw-bg-opacity:1;background-color:rgb(255 180 171/var(--tw-bg-opacity,1))}.bg-secondary-container{--tw-bg-opacity:1;background-color:rgb(215 0 40/var(--tw-bg-opacity,1))}.bg-surface{--tw-bg-opacity:1;background-color:rgb(18 19 22/var(--tw-bg-opacity,1))}.bg-surface-bright{--tw-bg-opacity:1;background-color:rgb(56 57 60/var(--tw-bg-opacity,1))}.bg-surface-container{--tw-bg-opacity:1;background-color:rgb(31 31 35/var(--tw-bg-opacity,1))}.bg-surface-container-high{--tw-bg-opacity:1;background-color:rgb(41 42 45/var(--tw-bg-opacity,1))}.bg-surface-container-highest{--tw-bg-opacity:1;background-color:rgb(52 53 56/var(--tw-bg-opacity,1))}.bg-surface-container-low{--tw-bg-opacity:1;background-color:rgb(27 27 31/var(--tw-bg-opacity,1))}.bg-surface-container-low\/40{background-color:rgba(27,27,31,.4)}.bg-surface-container-lowest{--tw-bg-opacity:1;background-color:rgb(13 14 17/var(--tw-bg-opacity,1))}.bg-surface-container-lowest\/60{background-color:rgba(13,14,17,.6)}.bg-surface-container-lowest\/80{background-color:rgba(13,14,17,.8)}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.bg-gradient-to-t{background-image:linear-gradient(to top,var(--tw-gradient-stops))}.from-\[\#18191c\]{--tw-gradient-from:#18191c var(--tw-gradient-from-position);--tw-gradient-to:rgba(24,25,28,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.via-surface-container-lowest\/60{--tw-gradient-to:rgba(13,14,17,0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),rgba(13,14,17,.6) var(--tw-gradient-via-position),var(--tw-gradient-to)}.to-transparent{--tw-gradient-to:transparent var(--tw-gradient-to-position)}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0\.5{padding:.125rem}.p-1{padding:.25rem}.p-2{padding:.5rem}.p-2\.5{padding:.625rem}.p-3{padding:.75rem}.p-4{padding:1rem}.px-0\.5{padding-left:.125rem;padding-right:.125rem}.px-1\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\.5{padding-top:.625rem;padding-bottom:.625rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.pb-2{padding-bottom:.5rem}.pb-3{padding-bottom:.75rem}.pb-4{padding-bottom:1rem}.pt-0{padding-top:0}.pt-1{padding-top:.25rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.text-left{text-align:left}.text-center{text-align:center}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.text-\[10px\]{font-size:10px}.text-\[11px\]{font-size:11px}.text-\[12px\]{font-size:12px}.text-\[13px\]{font-size:13px}.text-\[15px\]{font-size:15px}.text-\[16px\]{font-size:16px}.text-\[18px\]{font-size:18px}.text-\[9px\]{font-size:9px}.text-base{font-size:1rem;line-height:1.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-none{line-height:1}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-tighter{letter-spacing:-.05em}.tracking-wider{letter-spacing:.05em}.tracking-widest{letter-spacing:.1em}.text-\[\#007acc\]{--tw-text-opacity:1;color:rgb(0 122 204/var(--tw-text-opacity,1))}.text-\[\#5865f2\]{--tw-text-opacity:1;color:rgb(88 101 242/var(--tw-text-opacity,1))}.text-amber-400{--tw-text-opacity:1;color:rgb(251 191 36/var(--tw-text-opacity,1))}.text-emerald-400{--tw-text-opacity:1;color:rgb(52 211 153/var(--tw-text-opacity,1))}.text-on-surface{--tw-text-opacity:1;color:rgb(227 226 230/var(--tw-text-opacity,1))}.text-on-surface-variant{--tw-text-opacity:1;color:rgb(233 188 183/var(--tw-text-opacity,1))}.text-outline{--tw-text-opacity:1;color:rgb(140 142 152/var(--tw-text-opacity,1))}.text-outline-variant{--tw-text-opacity:1;color:rgb(68 70 79/var(--tw-text-opacity,1))}.text-primary{--tw-text-opacity:1;color:rgb(255 180 171/var(--tw-text-opacity,1))}.text-secondary-container{--tw-text-opacity:1;color:rgb(215 0 40/var(--tw-text-opacity,1))}.text-tertiary{--tw-text-opacity:1;color:rgb(140 142 152/var(--tw-text-opacity,1))}.text-tertiary-container{--tw-text-opacity:1;color:rgb(165 167 178/var(--tw-text-opacity,1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-0{opacity:0}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-2xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-2xl{--tw-shadow:0 25px 50px -12px rgba(0,0,0,.25);--tw-shadow-colored:0 25px 50px -12px var(--tw-shadow-color)}.shadow-inner{--tw-shadow:inset 0 2px 4px 0 rgba(0,0,0,.05);--tw-shadow-colored:inset 0 2px 4px 0 var(--tw-shadow-color)}.shadow-inner,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-sm{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.outline{outline-style:solid}.ring-2{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-\[\#18191c\]{--tw-ring-opacity:1;--tw-ring-color:rgb(24 25 28/var(--tw-ring-opacity,1))}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.hover\:bg-\[\#35373c\]:hover{--tw-bg-opacity:1;background-color:rgb(53 55 60/var(--tw-bg-opacity,1))}.hover\:bg-primary-container:hover{--tw-bg-opacity:1;background-color:rgb(255 84 75/var(--tw-bg-opacity,1))}.hover\:bg-secondary-container:hover{--tw-bg-opacity:1;background-color:rgb(215 0 40/var(--tw-bg-opacity,1))}.hover\:bg-surface-bright:hover{--tw-bg-opacity:1;background-color:rgb(56 57 60/var(--tw-bg-opacity,1))}.hover\:bg-surface-container:hover{--tw-bg-opacity:1;background-color:rgb(31 31 35/var(--tw-bg-opacity,1))}.hover\:bg-surface-container-high:hover{--tw-bg-opacity:1;background-color:rgb(41 42 45/var(--tw-bg-opacity,1))}.hover\:text-on-surface:hover{--tw-text-opacity:1;color:rgb(227 226 230/var(--tw-text-opacity,1))}.hover\:text-primary:hover{--tw-text-opacity:1;color:rgb(255 180 171/var(--tw-text-opacity,1))}.hover\:text-white:hover{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.focus\:border-secondary-container:focus{--tw-border-opacity:1;border-color:rgb(215 0 40/var(--tw-border-opacity,1))}.focus\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\:translate-y-0\.5:active{--tw-translate-y:0.125rem}.active\:translate-y-0\.5:active,.peer:checked~.peer-checked\:translate-x-4{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\:translate-x-4{--tw-translate-x:1rem}.peer:checked~.peer-checked\:translate-x-5{--tw-translate-x:1.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.peer:checked~.peer-checked\:bg-secondary-container{--tw-bg-opacity:1;background-color:rgb(215 0 40/var(--tw-bg-opacity,1))}@media (min-width:640px){.sm\:inline{display:inline}}@media (min-width:768px){.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1280px){.xl\:w-96{width:24rem}}
    </style>
</head>
<body class="bg-surface-container-lowest text-on-surface font-body-md text-xs antialiased h-screen flex flex-col select-none">

    <!-- Top Telemetry Header Bar -->
    <header class="h-10 bg-surface-container-lowest border-b border-outline-variant/40 flex items-center justify-between px-4 flex-shrink-0 z-50">
        <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-secondary-container" title="Crimson Node"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-surface-variant"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-surface-bright"></div>
            </div>
            <span class="font-code-inline text-outline-variant">|</span>
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[15px]">terminal</span>
                <span class="font-label-sm uppercase tracking-wider text-on-surface font-bold">SYS.EXT // DISCODE_BRIDGE</span>
                <span class="font-label-sm text-tertiary-container hidden sm:inline">(0x8F91)</span>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5 text-outline font-code-inline text-[11px]">
                <span class="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span class="text-primary font-bold" id="topConnStatus">RPC: CONNECTED</span>
            </div>
            <button id="topBtnClose" aria-label="Close modal" class="text-outline hover:text-primary transition-colors flex items-center justify-center p-1">
                <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
        </div>
    </header>

    <!-- Main 3-Column Layout -->
    <div class="flex-1 flex overflow-hidden">

        <!-- COLUMN 1: Left Navigation Sidebar -->
        <aside class="w-60 bg-surface-container-low border-r border-outline-variant/30 flex flex-col justify-between flex-shrink-0">
            <div class="flex flex-col">
                <!-- Monogram Crest -->
                <div class="p-3 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest/60">
                    <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 bg-secondary-container flex items-center justify-center text-white font-headline-sm font-bold shadow-md">
                            <span class="font-code-inline text-[13px] tracking-tighter">零壱</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-headline-sm text-sm text-on-surface tracking-wider leading-none font-bold">DisCode</span>
                            <span class="font-label-sm text-[9px] text-outline-variant mt-0.5 tracking-widest">VSCODE RPC</span>
                        </div>
                    </div>
                    <span class="bg-surface-container-highest px-1.5 py-0.5 text-on-surface-variant font-code-inline text-[10px]">v1.3.0</span>
                </div>

                <!-- Navigation Tabs -->
                <nav class="flex flex-col py-2 gap-0.5" id="navTabs">
                    <button class="nav-tab-btn w-full text-left px-3 py-2 bg-surface-container-high text-on-surface font-label-md flex items-center justify-between border-l-2 border-primary shadow-sm" data-section="activity" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-[15px]">terminal</span>
                            01. ACTIVITY
                        </span>
                        <span class="w-1.5 h-1.5 bg-primary"></span>
                    </button>

                    <button class="nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent" data-section="timer" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-outline text-[15px]">schedule</span>
                            02. TIMERS
                        </span>
                        <span class="font-code-inline text-[9px] text-outline">OFFSET</span>
                    </button>

                    <button class="nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent" data-section="appearance" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-outline text-[15px]">palette</span>
                            03. APPEARANCE
                        </span>
                        <span class="font-code-inline text-[9px] text-outline">UI</span>
                    </button>

                    <button class="nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent" data-section="privacy" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-outline text-[15px]">shield</span>
                            04. PRIVACY
                        </span>
                        <span class="font-code-inline text-[9px] text-outline">SEC</span>
                    </button>

                    <button class="nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent" data-section="behavior" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-outline text-[15px]">memory</span>
                            05. BEHAVIOR
                        </span>
                        <span class="font-code-inline text-[9px] text-outline">DAE</span>
                    </button>

                    <button class="nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent" data-section="general" type="button">
                        <span class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-outline text-[15px]">hub</span>
                            06. CONNECTION
                        </span>
                        <span class="font-code-inline text-[9px] text-outline">IPC</span>
                    </button>
                </nav>

                <!-- Kyoto Relay Badge -->
                <div class="m-3 p-2.5 bg-surface-container border border-outline-variant/30 flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                        <span class="font-label-sm text-[9px] text-outline-variant">KYOTO RELAY</span>
                        <span class="font-code-inline text-[9px] text-secondary-container font-bold">JP-EAST</span>
                    </div>
                    <span class="font-body-md text-[11px] text-tertiary">墨絵調の仮想端末設定</span>
                    <div class="w-full bg-surface-container-lowest h-1 mt-1 overflow-hidden">
                        <div class="bg-secondary-container h-full w-3/4"></div>
                    </div>
                </div>
            </div>

            <!-- Socket Footer Diagnostic -->
            <div class="p-3 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-1">
                <div class="flex items-center justify-between font-code-inline text-[10px]">
                    <span class="text-tertiary">SOCKET STREAM</span>
                    <span class="text-primary font-bold flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
                        LIVE
                    </span>
                </div>
                <div class="flex items-center justify-between font-code-inline text-[10px]">
                    <span class="text-tertiary-container">IPC LATENCY</span>
                    <span class="text-primary font-bold">14 ms</span>
                </div>
            </div>
        </aside>

        <!-- COLUMN 2: Center Configuration Canvas -->
        <main class="flex-1 bg-surface flex flex-col overflow-y-auto px-6 py-5 min-w-0">
            
            <!-- Header Module -->
            <header class="flex flex-col gap-1 pb-4 bg-surface-container-low/40 p-4 border border-outline-variant/20 mb-5 flex-shrink-0">
                <div class="flex items-center justify-between">
                    <h1 class="font-headline-lg text-xl text-on-surface font-semibold">
                        Discord Rich Presence
                    </h1>
                    <span class="font-label-sm text-[10px] text-outline bg-surface-container-highest px-2 py-0.5">
                        ACTIVE_PROFILE: DEV_NIGHT
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-headline-sm text-xs text-primary tracking-widest font-bold">外部アクティビティ連携設定</span>
                    <span class="text-outline">/</span>
                    <span class="font-body-md text-xs text-tertiary">Presence Tokens, Timers & Safeguards</span>
                </div>
                <p class="font-body-md text-[11px] text-tertiary-container mt-1">
                    Configure real-time activity strings, elapsed timestamp offsets, and sensitive workspace metadata masking for the Discord IPC daemon.
                </p>
            </header>

            <!-- SECTION: ACTIVITY (Default View) -->
            <div class="setting-section flex flex-col gap-5" data-section="activity">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">01. Presence Display Pattern</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-outline font-code-inline">STR_PATTERN_V2</span>
                    </div>

                    <!-- Details Input -->
                    <div class="flex flex-col gap-1.5">
                        <label class="font-label-sm text-on-surface-variant flex items-center justify-between text-[11px]" for="detailsEditing">
                            <span>DETAILS FORMAT STRING</span>
                            <span class="font-code-inline text-[10px] text-tertiary-container">DEFAULT: "Editing {fileName}"</span>
                        </label>
                        <div class="relative flex items-center">
                            <input class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/40 focus:border-secondary-container focus:outline-none transition-colors" id="detailsEditing" type="text" value="Editing {fileName}"/>
                            <span class="absolute right-3 font-code-inline text-[10px] text-primary">LINE_1</span>
                        </div>
                    </div>

                    <!-- Token Cloud -->
                    <div class="flex flex-col gap-1.5">
                        <span class="font-label-sm text-outline uppercase tracking-wider text-[10px]">AVAILABLE METADATA TOKENS (CLICK TO APPEND)</span>
                        <div class="flex flex-wrap gap-1.5" id="tokenContainer">
                            <button class="token-btn bg-surface-container hover:bg-secondary-container hover:text-white px-2 py-1 font-code-inline text-[11px] text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1" data-token="{fileName}" data-target="detailsEditing" type="button">
                                <span>{fileName}</span>
                                <span class="text-primary font-bold">+</span>
                            </button>
                            <button class="token-btn bg-surface-container hover:bg-secondary-container hover:text-white px-2 py-1 font-code-inline text-[11px] text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1" data-token="{workspace}" data-target="detailsEditing" type="button">
                                <span>{workspace}</span>
                                <span class="text-primary font-bold">+</span>
                            </button>
                            <button class="token-btn bg-surface-container hover:bg-secondary-container hover:text-white px-2 py-1 font-code-inline text-[11px] text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1" data-token="{gitBranch}" data-target="detailsEditing" type="button">
                                <span>{gitBranch}</span>
                                <span class="text-primary font-bold">+</span>
                            </button>
                            <button class="token-btn bg-surface-container hover:bg-secondary-container hover:text-white px-2 py-1 font-code-inline text-[11px] text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1" data-token="{lineCount}" data-target="detailsEditing" type="button">
                                <span>{lineCount}</span>
                                <span class="text-primary font-bold">+</span>
                            </button>
                            <button class="token-btn bg-surface-container hover:bg-secondary-container hover:text-white px-2 py-1 font-code-inline text-[11px] text-on-surface border border-outline-variant/30 transition-colors flex items-center gap-1" data-token="{language}" data-target="detailsEditing" type="button">
                                <span>{language}</span>
                                <span class="text-primary font-bold">+</span>
                            </button>
                        </div>
                    </div>

                    <!-- State Input -->
                    <div class="flex flex-col gap-1.5 mt-2">
                        <label class="font-label-sm text-on-surface-variant flex items-center justify-between text-[11px]" for="stateEditing">
                            <span>STATE FORMAT STRING</span>
                            <span class="font-code-inline text-[10px] text-tertiary-container">DEFAULT: "Workspace: {workspace}"</span>
                        </label>
                        <div class="relative flex items-center">
                            <input class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/40 focus:border-secondary-container focus:outline-none transition-colors" id="stateEditing" type="text" value="Workspace: {workspace}"/>
                            <span class="absolute right-3 font-code-inline text-[10px] text-outline">LINE_2</span>
                        </div>
                    </div>

                    <!-- Idle Details & State -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                        <div class="flex flex-col gap-1">
                            <label class="font-label-sm text-[10px] text-outline" for="detailsIdle">IDLE DETAILS LINE</label>
                            <input class="bg-surface-container-lowest text-on-surface font-body-md text-xs px-2.5 py-1.5 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="detailsIdle" type="text" value="Idling"/>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="font-label-sm text-[10px] text-outline" for="stateIdle">IDLE STATE LINE</label>
                            <input class="bg-surface-container-lowest text-on-surface font-body-md text-xs px-2.5 py-1.5 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="stateIdle" type="text" value="Taking a break"/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION: TIMERS -->
            <div class="setting-section flex flex-col gap-5" data-section="timer" style="display:none;">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">02. Time Elapsed & Customizer</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-outline font-code-inline">EPOCH_SYNC</span>
                    </div>

                    <!-- Toggle Show Elapsed -->
                    <div class="flex items-center justify-between bg-surface-container-lowest/80 p-3 border border-outline-variant/30">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface font-bold">Show Elapsed Session Time</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Renders Discord timestamp telemetry counter under status.</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input checked class="sr-only peer" id="showElapsedTime" type="checkbox"/>
                            <div class="w-10 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </div>
                        </label>
                    </div>

                    <!-- Timer Mode & Custom Duration -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="font-label-sm text-[10px] text-outline" for="timerMode">TIMESTAMP LOGIC (TIMER MODE)</label>
                            <select class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="timerMode">
                                <option value="session">Elapsed since VS Code launch</option>
                                <option value="file">File switch reset counter</option>
                                <option value="manual">Manual offset duration</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="font-label-sm text-[10px] text-outline">INITIAL DURATION OFFSET</label>
                            <div class="flex items-center gap-2">
                                <div class="flex-1 flex items-center bg-surface-container-lowest border border-outline-variant/30 px-2 py-1">
                                    <input class="w-full bg-transparent text-on-surface font-code-inline text-xs focus:outline-none" id="timerHours" min="0" max="999" type="number" value="0"/>
                                    <span class="text-tertiary font-code-inline text-[10px]">hrs</span>
                                </div>
                                <div class="flex-1 flex items-center bg-surface-container-lowest border border-outline-variant/30 px-2 py-1">
                                    <input class="w-full bg-transparent text-on-surface font-code-inline text-xs focus:outline-none" id="timerMinutes" min="0" max="59" type="number" value="0"/>
                                    <span class="text-tertiary font-code-inline text-[10px]">min</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Offset Buttons + Dedicated Apply Button -->
                    <div class="flex flex-col gap-2 mt-1">
                        <span class="font-label-sm text-[10px] text-outline">QUICK OFFSET ACTIONS</span>
                        <div class="flex items-center gap-2">
                            <button class="flex-1 bg-surface-container hover:bg-secondary-container hover:text-white font-code-inline text-xs py-2 text-on-surface border border-outline-variant/30 transition-colors" id="btnPlus1" type="button">+1h</button>
                            <button class="flex-1 bg-surface-container hover:bg-secondary-container hover:text-white font-code-inline text-xs py-2 text-on-surface border border-outline-variant/30 transition-colors" id="btnPlus2" type="button">+2h</button>
                            <button class="flex-1 bg-surface-container hover:bg-secondary-container hover:text-white font-code-inline text-xs py-2 text-on-surface border border-outline-variant/30 transition-colors" id="btnPlus3" type="button">+3.5h</button>
                            <button class="flex-1 bg-surface-container-highest hover:bg-surface-bright font-code-inline text-xs py-2 text-outline hover:text-on-surface border border-outline-variant/30 transition-colors" id="btnResetTimer" type="button">Reset</button>
                        </div>
                        <div class="mt-2">
                            <button class="w-full bg-secondary-container hover:bg-primary-container text-white font-code-inline text-xs py-2.5 flex items-center justify-center gap-2 uppercase tracking-wider font-bold shadow-lg transition-transform active:translate-y-0.5" id="btnApplyTimer" type="button">
                                <span class="material-symbols-outlined text-[16px]">bolt</span>
                                <span>Apply Timer Instantly (Bypass Buffer)</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION: APPEARANCE -->
            <div class="setting-section flex flex-col gap-5" data-section="appearance" style="display:none;">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">03. Appearance & Visual Assets</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-outline font-code-inline">ASSET_BRAND</span>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="font-label-sm text-[10px] text-outline" for="largeImageStyle">PRIMARY LARGE ICON STYLE</label>
                        <select class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="largeImageStyle">
                            <option value="fileIcon">Dynamic File or Programming Language (React, TS, Py, Go, etc.)</option>
                            <option value="editorIcon">Official Visual Studio Code Logo</option>
                        </select>
                        <span class="text-[10px] text-tertiary-container mt-0.5">Determines whether the prominent square badge shows the file language icon or editor logo.</span>
                    </div>
                </div>
            </div>

            <!-- SECTION: PRIVACY -->
            <div class="setting-section flex flex-col gap-5" data-section="privacy" style="display:none;">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-3 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">04. Privacy & Telemetry Safeguards</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-primary font-code-inline">ANONYMIZER</span>
                    </div>

                    <!-- Toggles -->
                    <div class="flex items-center justify-between py-2 border-b border-outline-variant/10">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface">Display Active File Name</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Uncheck to mask document names as "a file".</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input checked class="sr-only peer" id="showFileName" type="checkbox"/>
                            <div class="w-9 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-outline-variant/10">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface">Display Workspace Folder Name</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Uncheck to mask project directories as "Confidential Project".</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input checked class="sr-only peer" id="showWorkspaceName" type="checkbox"/>
                            <div class="w-9 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-outline-variant/10">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface">Display Git Branch Name</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Show the checked-out branch name (e.g. main*, dev).</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input class="sr-only peer" id="showGitBranch" type="checkbox"/>
                            <div class="w-9 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between py-2">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface">Debug Session Telemetry</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Show active debugging status when F5 session begins.</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input checked class="sr-only peer" id="showDebugStatus" type="checkbox"/>
                            <div class="w-9 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- SECTION: BEHAVIOR -->
            <div class="setting-section flex flex-col gap-5" data-section="behavior" style="display:none;">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">05. Daemon Behavior & Idle Limits</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-outline font-code-inline">DAEMON_RULES</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="font-label-sm text-[10px] text-outline" for="whenNoFileOpen">WHEN NO FILE IS OPEN</label>
                            <select class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="whenNoFileOpen">
                                <option value="keepLastFile">Keep last active file visible</option>
                                <option value="showWorkspace">Show workspace name only</option>
                                <option value="idle">Display idle status</option>
                                <option value="clear">Clear presence from Discord</option>
                            </select>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <label class="font-label-sm text-[10px] text-outline" for="idleAction">WHEN USER IS IDLE</label>
                            <select class="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="idleAction">
                                <option value="showIdle">Display idle status</option>
                                <option value="keepFile">Keep active file</option>
                                <option value="clear">Clear presence</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="font-label-sm text-[10px] text-outline" for="idleTimeoutSeconds">IDLE TIMEOUT THRESHOLD (SECONDS)</label>
                        <input class="bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none" id="idleTimeoutSeconds" min="30" max="86400" type="number" value="300"/>
                        <span class="text-[10px] text-tertiary-container">Minimum 30 seconds before Discord presence switches to Idle mode.</span>
                    </div>
                </div>
            </div>

            <!-- SECTION: CONNECTION -->
            <div class="setting-section flex flex-col gap-5" data-section="general" style="display:none;">
                <div class="bg-surface-container-low p-4 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-3 bg-secondary-container"></span>
                            <span class="font-label-md text-on-surface uppercase tracking-wider font-bold">06. Discord IPC Connection</span>
                        </div>
                        <span class="font-label-sm text-[10px] text-outline font-code-inline">IPC_CLIENT</span>
                    </div>

                    <div class="flex items-center justify-between bg-surface-container-lowest/80 p-3 border border-outline-variant/30">
                        <div class="flex flex-col">
                            <span class="font-body-md text-on-surface font-bold">Enable Rich Presence Service</span>
                            <span class="font-label-sm text-[10px] text-tertiary">Transmit VS Code activity over local named pipe socket.</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input checked class="sr-only peer" id="enabled" type="checkbox"/>
                            <div class="w-10 h-5 bg-surface-container-highest peer-checked:bg-secondary-container transition-colors relative flex items-center px-0.5 rounded-full">
                                <div class="w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </div>
                        </label>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="font-label-sm text-[10px] text-outline" for="clientId">CUSTOM DISCORD APPLICATION CLIENT ID</label>
                        <input class="bg-surface-container-lowest text-on-surface font-body-md text-xs px-3 py-2 border border-outline-variant/30 focus:border-secondary-container focus:outline-none font-code-inline" id="clientId" placeholder="Leave blank for official DisCode default ID" type="text" value=""/>
                    </div>
                </div>
            </div>

            <!-- Sticky Bottom Toolbar -->
            <footer class="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/20 bg-surface-container-lowest p-3 shadow-md">
                <div class="flex items-center gap-2">
                    <button class="px-3 py-2 bg-surface-container hover:bg-surface-container-high text-tertiary hover:text-on-surface font-code-inline text-[11px] uppercase transition-colors border border-outline-variant/30" id="btnResetDefaults" type="button">
                        Reset to Defaults
                    </button>
                    <span class="font-label-sm text-[10px] text-outline-variant hidden sm:inline">NO UNSAVED LOCKS</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="font-code-inline text-[11px] text-primary opacity-0 transition-opacity" id="saveStatus">CHANGES_COMMITTED</span>
                    <button class="px-6 py-2.5 bg-secondary-container hover:bg-primary-container text-white font-code-inline text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-transform active:translate-y-0.5 font-bold" id="btnSave" type="button">
                        <span class="material-symbols-outlined text-[16px]">check</span>
                        <span>Save Changes</span>
                    </button>
                </div>
            </footer>
        </main>

        <!-- COLUMN 3: Right Live Discord Preview Panel -->
        <aside class="w-80 xl:w-96 bg-surface-container-low border-l border-outline-variant/30 p-4 flex flex-col justify-between flex-shrink-0 overflow-y-auto">
            <div class="flex flex-col gap-3">
                
                <!-- Section Badge & Sync Indicator -->
                <div class="flex items-center justify-between pb-2 bg-surface-container-lowest/60 p-2.5 border border-outline-variant/30">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[16px]">visibility</span>
                        <span class="font-label-md text-[11px] text-on-surface tracking-wider font-bold">LIVE PREVIEW / プレビュー</span>
                    </div>
                    <div class="flex items-center gap-1.5 bg-surface-container px-2 py-0.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                        <span class="font-code-inline text-[10px] text-primary font-bold">SYNC: ACTIVE</span>
                    </div>
                </div>

                <!-- Japanese Framing Outer Card -->
                <div class="relative bg-surface-container-lowest p-3 border border-outline-variant/30 shadow-2xl overflow-hidden">
                    <!-- Red corner accents -->
                    <div class="absolute top-0 left-0 w-2.5 h-2.5 bg-secondary-container"></div>
                    <div class="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary-container"></div>
                    <div class="absolute bottom-0 left-0 w-2.5 h-2.5 bg-secondary-container"></div>
                    <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary-container"></div>

                    <!-- Mini Discord Profile Card -->
                    <div class="w-full bg-[#18191c] text-on-surface overflow-hidden shadow-xl flex flex-col">
                        
                        <!-- Header Banner with Japanese Sunset fallback -->
                        <div class="relative h-24 w-full overflow-hidden" style="background: linear-gradient(135deg, #1b0206 0%, #7d0016 50%, #111215 100%); background-size: cover; background-position: center;">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#18191c] via-surface-container-lowest/60 to-transparent"></div>
                            <div class="absolute top-2 right-2 px-1.5 py-0.5 bg-secondary-container text-white font-code-inline text-[9px] font-bold shadow">
                                神楽
                            </div>
                        </div>

                        <!-- Profile Info -->
                        <div class="px-3 pb-3 pt-0 relative flex flex-col">
                            
                            <!-- Avatar Offset -->
                            <div class="relative -mt-8 mb-2 flex items-end justify-between">
                                <div class="relative">
                                    <div class="w-14 h-14 rounded-full border-4 border-[#18191c] bg-surface-container-high overflow-hidden shadow-lg flex items-center justify-center font-bold text-white text-base relative" style="background: linear-gradient(135deg, #7d0016, #1b0206);">
                                        <img class="w-full h-full object-cover" id="previewAvatarImg" onerror="this.style.display='none'; document.getElementById('previewAvatarFallback').style.display='block';" src="" alt="Avatar"/>
                                        <span id="previewAvatarFallback" class="text-xs font-bold font-code-inline">⚔</span>
                                    </div>
                                    <div id="previewStatusDot" class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#23a55a] rounded-full ring-2 ring-[#18191c]"></div>
                                </div>
                                <div class="flex items-center gap-1 bg-[#111214] px-1.5 py-0.5">
                                    <span class="material-symbols-outlined text-primary text-[12px]">code</span>
                                    <span class="material-symbols-outlined text-[#5865f2] text-[12px]">bolt</span>
                                    <span class="material-symbols-outlined text-secondary-container text-[12px]">verified</span>
                                </div>
                            </div>

                            <!-- Name -->
                            <div class="flex flex-col mb-2.5">
                                <div class="flex items-center gap-1.5">
                                    <span class="font-headline-sm text-sm text-on-surface font-bold leading-tight truncate max-w-[170px]" id="previewProfileName">Connecting to Discord...</span>
                                </div>
                                <span class="font-code-inline text-[10px] text-outline truncate" id="previewUserTag">@detecting...</span>
                            </div>

                            <!-- Activity Box -->
                            <div class="bg-[#1e1f22] p-2.5 flex flex-col gap-1.5 shadow-inner border border-white/5">
                                <div class="flex items-center justify-between text-[10px] font-code-inline font-bold tracking-wider text-outline uppercase">
                                    <span>PLAYING A GAME</span>
                                    <span class="text-primary font-code-inline text-[9px]">RICH RPC</span>
                                </div>

                                <div class="flex items-start gap-2.5 mt-0.5">
                                    <!-- App Icon Badge -->
                                    <div class="relative flex-shrink-0">
                                        <div class="w-11 h-11 bg-surface-container-highest flex items-center justify-center text-[#007acc] shadow-sm font-bold text-xs" id="previewAppIconWrap">
                                            <span class="font-code-inline text-primary font-bold" id="previewBadgeIcon">TS</span>
                                        </div>
                                        <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-secondary-container flex items-center justify-center text-white shadow-sm">
                                            <span class="material-symbols-outlined text-[9px]">edit</span>
                                        </div>
                                    </div>

                                    <!-- Strings -->
                                    <div class="flex flex-col min-w-0 flex-1 leading-snug">
                                        <span class="font-headline-sm text-xs font-bold text-on-surface truncate">
                                            Visual Studio Code
                                        </span>
                                        <span class="font-body-md text-[11px] text-on-surface-variant truncate mt-0.5" id="previewLine1">
                                            Editing index.tsx
                                        </span>
                                        <span class="font-body-md text-[10px] text-tertiary truncate" id="previewLine2">
                                            In DisCode-Core (main*)
                                        </span>
                                        <div class="flex items-center gap-1 mt-1 text-tertiary-container font-code-inline text-[10px]" id="previewTimerRow">
                                            <span class="material-symbols-outlined text-[11px] text-primary">schedule</span>
                                            <span id="previewTimerDigits">00:00:00 elapsed</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-1.5 pt-1 flex flex-col">
                                    <button class="w-full bg-[#2b2d31] hover:bg-[#35373c] text-on-surface font-code-inline text-[10px] py-1 text-center transition-colors" type="button">
                                        View Repository
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Preview Mode Toggle Toolbar -->
                <div class="bg-surface-container p-2 flex items-center justify-between border border-outline-variant/30">
                    <span class="font-label-sm text-[10px] text-outline">VIEWPORT MODE</span>
                    <div class="flex items-center gap-1 bg-surface-container-lowest p-0.5">
                        <button class="px-2 py-0.5 bg-secondary-container text-white font-code-inline text-[9px]" id="btnModeDetailed" type="button">
                            DETAILED
                        </button>
                        <button class="px-2 py-0.5 text-outline hover:text-on-surface font-code-inline text-[9px]" id="btnModeCompact" type="button">
                            COMPACT
                        </button>
                    </div>
                </div>

                <!-- Telemetry Readout -->
                <div class="bg-surface-container-lowest p-2 flex flex-col gap-1 border border-outline-variant/20">
                    <div class="flex items-center justify-between font-code-inline text-[9px] text-tertiary">
                        <span>DISCORD_CLIENT</span>
                        <span class="text-on-surface font-bold" id="previewFooterClient">IPC: DETECTING...</span>
                    </div>
                    <div class="flex items-center justify-between font-code-inline text-[9px] text-tertiary">
                        <span>USER_ID</span>
                        <span class="text-primary font-mono" id="previewFooterUserId">--</span>
                    </div>
                </div>

            </div>

            <!-- Footer Seal -->
            <div class="pt-3 flex items-center justify-between text-outline-variant font-label-sm text-[10px]">
                <span>伝統と電脳の調和</span>
                <span>DISCODE KYOTO © 2026</span>
            </div>
        </aside>

    </div>

    <!-- Client Script -->
    <script>
        (function () {
            const vscode = acquireVsCodeApi();

            const detailsInput = document.getElementById('detailsEditing');
            const stateInput = document.getElementById('stateEditing');
            const previewLine1 = document.getElementById('previewLine1');
            const previewLine2 = document.getElementById('previewLine2');
            const previewTimerRow = document.getElementById('previewTimerRow');
            const previewTimerDigits = document.getElementById('previewTimerDigits');
            const showElapsedTime = document.getElementById('showElapsedTime');
            const showFileName = document.getElementById('showFileName');
            const showWorkspaceName = document.getElementById('showWorkspaceName');
            const showGitBranch = document.getElementById('showGitBranch');
            const timerMode = document.getElementById('timerMode');
            const timerHours = document.getElementById('timerHours');
            const timerMinutes = document.getElementById('timerMinutes');
            const btnSave = document.getElementById('btnSave');
            const saveStatus = document.getElementById('saveStatus');
            const tokenButtons = document.querySelectorAll('.token-btn');

            // Live Profile elements
            const previewAvatarImg = document.getElementById('previewAvatarImg');
            const previewAvatarFallback = document.getElementById('previewAvatarFallback');
            const previewProfileName = document.getElementById('previewProfileName');
            const previewUserTag = document.getElementById('previewUserTag');
            const previewStatusDot = document.getElementById('previewStatusDot');
            const previewFooterClient = document.getElementById('previewFooterClient');
            const previewFooterUserId = document.getElementById('previewFooterUserId');
            const previewBadgeIcon = document.getElementById('previewBadgeIcon');
            const kyotoRelayStatus = document.getElementById('kyotoRelayStatus');

            let currentDiscordUser = null;
            let currentPresence = null;
            let realStartTimestamp = null;
            let livePreviewData = {
                fileName: 'App.tsx',
                workspace: 'my-project',
                gitBranch: 'main',
                lineCount: '128 lines',
                language: 'TypeScript'
            };

            function formatTime(totalSec) {
                const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
                const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
                const secs = String(totalSec % 60).padStart(2, '0');
                return hrs + ':' + mins + ':' + secs + ' elapsed';
            }

            function updateDiscordAccount(user, connState) {
                if (user && user.id) {
                    currentDiscordUser = user;
                    previewProfileName.textContent = user.globalName || user.username;
                    previewUserTag.textContent = '@' + user.username + (user.discriminator && user.discriminator !== '0' ? '#' + user.discriminator : '');
                    if (user.avatarUrl) {
                        previewAvatarImg.src = user.avatarUrl;
                        previewAvatarImg.style.display = 'block';
                        previewAvatarFallback.style.display = 'none';
                    }
                    previewStatusDot.className = 'absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#23a55a] rounded-full ring-2 ring-[#18191c]';
                    previewFooterClient.textContent = 'IPC: ' + user.username.toUpperCase() + ' // LIVE';
                    previewFooterUserId.textContent = user.id;
                    if (kyotoRelayStatus) {
                        kyotoRelayStatus.textContent = 'CONNECTED: ' + user.username;
                        kyotoRelayStatus.className = 'text-xs text-emerald-400 font-bold';
                    }
                } else if (connState && connState.isConnected) {
                    previewProfileName.textContent = connState.user || 'Discord User';
                    previewUserTag.textContent = '@connected';
                    previewStatusDot.className = 'absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#23a55a] rounded-full ring-2 ring-[#18191c]';
                    previewFooterClient.textContent = 'IPC: CONNECTED';
                    previewFooterUserId.textContent = 'ACTIVE';
                } else {
                    previewProfileName.textContent = 'Discord Offline';
                    previewUserTag.textContent = '@not-connected';
                    previewAvatarImg.style.display = 'none';
                    previewAvatarFallback.style.display = 'block';
                    previewStatusDot.className = 'absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#f0b232] rounded-full ring-2 ring-[#18191c]';
                    previewFooterClient.textContent = 'IPC: DISCONNECTED';
                    previewFooterUserId.textContent = 'OFFLINE';
                    if (kyotoRelayStatus) {
                        kyotoRelayStatus.textContent = 'CONNECTING...';
                        kyotoRelayStatus.className = 'text-xs text-amber-400 font-bold';
                    }
                }
            }

            function syncPreview() {
                let dVal = detailsInput.value || 'Editing {fileName}';
                let sVal = stateInput.value || 'Workspace: {workspace}';

                const curFile = showFileName.checked ? (livePreviewData.fileName || 'App.tsx') : 'a file';
                const curWs = showWorkspaceName.checked ? (livePreviewData.workspace || 'my-project') : 'Confidential Project';
                const curBranch = showGitBranch.checked ? (livePreviewData.gitBranch || 'main') : '';

                dVal = dVal
                    .replace(/\{fileName\}/g, curFile)
                    .replace(/\{workspace\}/g, curWs)
                    .replace(/\{gitBranch\}/g, curBranch)
                    .replace(/\{lineCount\}/g, livePreviewData.lineCount || '128 lines')
                    .replace(/\{currentLine\}/g, livePreviewData.currentLine || '1')
                    .replace(/\{language\}/g, livePreviewData.language || 'TypeScript');

                sVal = sVal
                    .replace(/\{fileName\}/g, curFile)
                    .replace(/\{workspace\}/g, curWs)
                    .replace(/\{gitBranch\}/g, curBranch)
                    .replace(/\{lineCount\}/g, livePreviewData.lineCount || '128 lines')
                    .replace(/\{currentLine\}/g, livePreviewData.currentLine || '1')
                    .replace(/\{language\}/g, livePreviewData.language || 'TypeScript');

                previewLine1.textContent = dVal;
                previewLine2.textContent = sVal;

                if (showElapsedTime.checked) {
                    previewTimerRow.style.display = 'flex';
                } else {
                    previewTimerRow.style.display = 'none';
                }
            }

            function tickTimer() {
                if (showElapsedTime.checked && realStartTimestamp) {
                    const nowSec = Math.floor(Date.now() / 1000);
                    const diffSec = Math.max(0, nowSec - realStartTimestamp);
                    previewTimerDigits.textContent = formatTime(diffSec);
                    previewTimerRow.style.display = 'flex';
                } else if (!showElapsedTime.checked) {
                    previewTimerRow.style.display = 'none';
                }
            }

            // Tab Switching
            function activateSection(secId) {
                document.querySelectorAll('.setting-section').forEach(sec => {
                    sec.style.display = sec.dataset.section === secId ? 'flex' : 'none';
                });
                document.querySelectorAll('.nav-tab-btn').forEach(btn => {
                    const isActive = btn.dataset.section === secId;
                    if (isActive) {
                        btn.className = 'nav-tab-btn w-full text-left px-3 py-2 bg-surface-container-high text-on-surface font-label-md flex items-center justify-between border-l-2 border-primary shadow-sm';
                    } else {
                        btn.className = 'nav-tab-btn w-full text-left px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md transition-colors flex items-center justify-between border-l-2 border-transparent';
                    }
                });
            }

            document.querySelectorAll('.nav-tab-btn').forEach(btn => {
                btn.addEventListener('click', () => activateSection(btn.dataset.section));
            });

            // Input listeners
            detailsInput.addEventListener('input', syncPreview);
            stateInput.addEventListener('input', syncPreview);
            showElapsedTime.addEventListener('change', syncPreview);
            showFileName.addEventListener('change', syncPreview);
            showWorkspaceName.addEventListener('change', syncPreview);
            showGitBranch.addEventListener('change', syncPreview);

            // Dynamic Tokens
            tokenButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const token = btn.getAttribute('data-token');
                    const targetId = btn.getAttribute('data-target') || 'detailsEditing';
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.value = targetEl.value + ' ' + token;
                        syncPreview();
                        targetEl.focus();
                    }
                });
            });

            // Quick Offset Buttons
            document.getElementById('btnPlus1').addEventListener('click', () => {
                const cur = parseInt(timerHours.value || '0', 10);
                timerHours.value = cur + 1;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp -= 3600;
                tickTimer();
            });

            document.getElementById('btnPlus2').addEventListener('click', () => {
                const cur = parseInt(timerHours.value || '0', 10);
                timerHours.value = cur + 2;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp -= 7200;
                tickTimer();
            });

            document.getElementById('btnPlus3').addEventListener('click', () => {
                const curH = parseInt(timerHours.value || '0', 10);
                const curM = parseInt(timerMinutes.value || '0', 10);
                timerHours.value = curH + 3;
                timerMinutes.value = (curM + 30) % 60;
                if (!realStartTimestamp) realStartTimestamp = Math.floor(Date.now() / 1000);
                realStartTimestamp -= 12600;
                tickTimer();
            });

            document.getElementById('btnResetTimer').addEventListener('click', () => {
                timerHours.value = 0;
                timerMinutes.value = 0;
                realStartTimestamp = Math.floor(Date.now() / 1000);
                tickTimer();
                vscode.postMessage({ command: 'resetTimer' });
                showStatusBadge('TIMER_RESET_OK');
            });

            // Instant Apply Timer
            document.getElementById('btnApplyTimer').addEventListener('click', () => {
                const totalMinutes = (parseInt(timerHours.value || '0', 10) * 60) + parseInt(timerMinutes.value || '0', 10);
                vscode.postMessage({
                    command: 'applyTimer',
                    settings: {
                        'timer.mode': timerMode.value,
                        'timer.customOffsetMinutes': totalMinutes,
                        'appearance.showElapsedTime': showElapsedTime.checked
                    }
                });
                showStatusBadge('TIMER_APPLIED_INSTANT');
            });

            function showStatusBadge(text) {
                saveStatus.textContent = text;
                saveStatus.style.opacity = '1';
                setTimeout(() => {
                    saveStatus.style.opacity = '0';
                }, 2500);
            }

            // Save Changes
            btnSave.addEventListener('click', () => {
                const totalMinutes = (parseInt(timerHours.value || '0', 10) * 60) + parseInt(timerMinutes.value || '0', 10);
                const newSettings = {
                    enabled: document.getElementById('enabled').checked,
                    'appearance.largeImageStyle': document.getElementById('largeImageStyle').value,
                    'appearance.showElapsedTime': showElapsedTime.checked,
                    'timer.mode': timerMode.value,
                    'timer.customOffsetMinutes': totalMinutes,
                    'formatting.detailsEditing': detailsInput.value,
                    'formatting.stateEditing': stateInput.value,
                    'formatting.detailsIdle': document.getElementById('detailsIdle').value,
                    'formatting.stateIdle': document.getElementById('stateIdle').value,
                    'behavior.whenNoFileOpen': document.getElementById('whenNoFileOpen').value,
                    'behavior.idleAction': document.getElementById('idleAction').value,
                    'idleTimeoutSeconds': parseInt(document.getElementById('idleTimeoutSeconds').value || '300', 10),
                    'privacy.showFileName': showFileName.checked,
                    'privacy.showWorkspaceName': showWorkspaceName.checked,
                    'privacy.showGitBranch': showGitBranch.checked,
                    'privacy.showDebugStatus': document.getElementById('showDebugStatus').checked,
                    clientId: document.getElementById('clientId').value.trim()
                };
                vscode.postMessage({ command: 'saveSettings', settings: newSettings });
                showStatusBadge('CHANGES_COMMITTED');
            });

            // Reset to defaults
            document.getElementById('btnResetDefaults').addEventListener('click', () => {
                vscode.postMessage({ command: 'resetDefaults' });
                showStatusBadge('DEFAULTS_RESTORED');
            });

            // Close
            document.getElementById('topBtnClose').addEventListener('click', () => {
                vscode.postMessage({ command: 'close' });
            });

            // Viewport mode switch
            const btnDetailed = document.getElementById('btnModeDetailed');
            const btnCompact = document.getElementById('btnModeCompact');
            btnDetailed.addEventListener('click', () => {
                btnDetailed.className = 'px-2 py-0.5 bg-secondary-container text-white font-code-inline text-[9px]';
                btnCompact.className = 'px-2 py-0.5 text-outline hover:text-on-surface font-code-inline text-[9px]';
                previewLine2.style.display = 'block';
                if (showElapsedTime.checked) previewTimerRow.style.display = 'flex';
            });

            btnCompact.addEventListener('click', () => {
                btnCompact.className = 'px-2 py-0.5 bg-secondary-container text-white font-code-inline text-[9px]';
                btnDetailed.className = 'px-2 py-0.5 text-outline hover:text-on-surface font-code-inline text-[9px]';
                previewLine2.style.display = 'none';
                previewTimerRow.style.display = 'none';
            });

            // Handle incoming messages from extension
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'init' && message.settings) {
                    const s = message.settings;
                    if (s.enabled !== undefined) document.getElementById('enabled').checked = Boolean(s.enabled);
                    if (s['formatting.detailsEditing']) detailsInput.value = s['formatting.detailsEditing'];
                    if (s['formatting.stateEditing']) stateInput.value = s['formatting.stateEditing'];
                    if (s['formatting.detailsIdle']) document.getElementById('detailsIdle').value = s['formatting.detailsIdle'];
                    if (s['formatting.stateIdle']) document.getElementById('stateIdle').value = s['formatting.stateIdle'];
                    if (s['appearance.largeImageStyle']) document.getElementById('largeImageStyle').value = s['appearance.largeImageStyle'];
                    if (s['appearance.showElapsedTime'] !== undefined) showElapsedTime.checked = Boolean(s['appearance.showElapsedTime']);
                    if (s['timer.mode']) timerMode.value = s['timer.mode'];
                    if (s['timer.customOffsetMinutes'] !== undefined) {
                        const totalM = parseInt(s['timer.customOffsetMinutes'], 10) || 0;
                        timerHours.value = Math.floor(totalM / 60);
                        timerMinutes.value = totalM % 60;
                    }
                    if (s['behavior.whenNoFileOpen']) document.getElementById('whenNoFileOpen').value = s['behavior.whenNoFileOpen'];
                    if (s['behavior.idleAction']) document.getElementById('idleAction').value = s['behavior.idleAction'];
                    if (s.idleTimeoutSeconds) document.getElementById('idleTimeoutSeconds').value = s.idleTimeoutSeconds;
                    if (s['privacy.showFileName'] !== undefined) showFileName.checked = Boolean(s['privacy.showFileName']);
                    if (s['privacy.showWorkspaceName'] !== undefined) showWorkspaceName.checked = Boolean(s['privacy.showWorkspaceName']);
                    if (s['privacy.showGitBranch'] !== undefined) showGitBranch.checked = Boolean(s['privacy.showGitBranch']);
                    if (s['privacy.showDebugStatus'] !== undefined) document.getElementById('showDebugStatus').checked = Boolean(s['privacy.showDebugStatus']);
                    if (s.clientId) document.getElementById('clientId').value = s.clientId;

                    if (message.previewData) {
                        livePreviewData = Object.assign(livePreviewData, message.previewData);
                        if (livePreviewData.language) {
                            previewBadgeIcon.textContent = livePreviewData.language.substring(0, 3).toUpperCase();
                        }
                        if (livePreviewData.startTimestamp) {
                            realStartTimestamp = livePreviewData.startTimestamp;
                        }
                    }

                    if (message.currentPresence && message.currentPresence.startTimestamp) {
                        realStartTimestamp = message.currentPresence.startTimestamp;
                    }

                    updateDiscordAccount(message.discordUser, message.connectionState);
                    syncPreview();
                    tickTimer();
                } else if (message.command === 'liveUpdate') {
                    if (message.discordUser) {
                        updateDiscordAccount(message.discordUser);
                    }
                    if (message.previewData) {
                        livePreviewData = Object.assign(livePreviewData, message.previewData);
                        if (livePreviewData.language) {
                            previewBadgeIcon.textContent = livePreviewData.language.substring(0, 3).toUpperCase();
                        }
                        if (livePreviewData.startTimestamp) {
                            realStartTimestamp = livePreviewData.startTimestamp;
                        }
                    }
                    if (message.presence && message.presence.startTimestamp) {
                        realStartTimestamp = message.presence.startTimestamp;
                    }
                    syncPreview();
                    tickTimer();
                } else if (message.command === 'connectionUpdate') {
                    updateDiscordAccount(message.discordUser, message.connectionState);
                } else if (message.command === 'actionResult') {
                    showStatusBadge(message.ok ? 'SYNC_COMPLETE' : 'ERROR_OCCURRED');
                }
            });

            // Ambient 1-second timer tick
            setInterval(tickTimer, 1000);

            // Escape key to close
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') vscode.postMessage({ command: 'close' });
            });

            // Ready
            syncPreview();
            vscode.postMessage({ command: 'ready' });
        })();
    </script>
</body>
</html>`;
}
//# sourceMappingURL=settingsModalWebviewHtml.js.map