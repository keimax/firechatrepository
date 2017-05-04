function LoadJSCodeBlob(e,o,t){var n=document.createElement("script"),r=URL.createObjectURL(e);t&&(Module.blobInfo||(Module.blobInfo={}),Module.blobInfo[r]=t),n.src=r,n.onload=function(){URL.revokeObjectURL(r),o&&o()},document.body.appendChild(n)}function LoadJSCode(e,o,t){if(!Math.fround&&t&&"asmUrl"==t.id){console.log("optimizing out Math.fround calls");for(var n={LOOKING_FOR_MODULE:0,SCANNING_MODULE_VARIABLES:1,SCANNING_MODULE_FUNCTIONS:2},r=["EMSCRIPTEN_START_ASM","EMSCRIPTEN_START_FUNCS","EMSCRIPTEN_END_FUNCS"],a="var",i="global.Math.fround;",d=0,s=n.LOOKING_FOR_MODULE,l=0,u=0;s<=n.SCANNING_MODULE_FUNCTIONS&&d<e.length;d++)if(47==e[d]&&47==e[d+1]&&32==e[d+2]&&String.fromCharCode.apply(null,e.subarray(d+3,d+3+r[s].length))===r[s])s++;else if(s!=n.SCANNING_MODULE_VARIABLES||u||61!=e[d]||String.fromCharCode.apply(null,e.subarray(d+1,d+1+i.length))!==i){if(u&&40==e[d]){for(var c=0;u>c&&e[d-1-c]==e[l-c];)c++;if(c==u){var p=e[d-1-c];if(36>p||p>36&&48>p||p>57&&65>p||p>90&&95>p||p>95&&97>p||p>122)for(;c;c--)e[d-c]=32}}}else{for(l=d-1;32!=e[l-u];)u++;u&&String.fromCharCode.apply(null,e.subarray(l-u-a.length,l-u))===a||(l=u=0)}}LoadJSCodeBlob(new Blob([e],{type:"text/javascript"}),o,t)}function DecompressAndLoadFile(e,o,t){e+=window.unityDecompressReleaseFileExtension;var n=new XMLHttpRequest;n.open("GET",e,!0),n.onprogress=t,n.responseType="arraybuffer",n.onload=function(){var t=new Uint8Array(n.response),r=(new Date).getTime(),a=window.unityDecompressReleaseFile(t),i=(new Date).getTime();console.log("Decompressed "+e+" in "+(i-r)+"ms. You can remove this delay if you configure your web server to host files using "+window.unityDecompressReleaseFileExtension+" compression."),o(a)},n.onerror=function(){console.log("Could not download "+e),didShowErrorMessage||0!=document.URL.indexOf("file:")||(alert("It seems your browser does not support running Unity WebGL content from file:// urls. Please upload it to an http server, or try a different browser."),didShowErrorMessage=!0)},n.send(null)}function LoadCompressedFile(e,o,t){if(CompressionState.current==CompressionState.Unsupported)return void DecompressAndLoadFile(e,o);if(CompressionState.current==CompressionState.Pending)return void CompressionState.pendingServerRequests.push(function(){LoadCompressedFile(e,o,t)});CompressionState.current==CompressionState.Uninitialized&&(CompressionState.current=CompressionState.Pending);var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onprogress=function(e){t&&t(e),CompressionState.current==CompressionState.Pending&&(0==n.status||200==n.status?CompressionState.Set(CompressionState.Supported):CompressionState.Set(CompressionState.Unsupported))},n.onload=function(){if(0==n.status||200==n.status){CompressionState.Set(CompressionState.Supported);var r=new Uint8Array(n.response);o(r)}else CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,o,t)},n.onerror=function(){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,o,t)};try{n.send(null)}catch(r){CompressionState.Set(CompressionState.Unsupported),DecompressAndLoadFile(e,o,t)}}function LoadCompressedJS(e,o,t){LoadCompressedFile(e,function(n){t&&(t.url=e),LoadJSCode(n,o,t)})}function fetchRemotePackageWrapper(e,o,t,n){LoadCompressedFile(e,function(e){t(e.buffer)},function(t){var n=e,r=o;if(t.total&&(r=t.total),t.loaded){Module.dataFileDownloads||(Module.dataFileDownloads={}),Module.dataFileDownloads[n]={loaded:t.loaded,total:r};var a=0,i=0,d=0;for(var s in Module.dataFileDownloads){var l=Module.dataFileDownloads[s];a+=l.total,i+=l.loaded,d++}a=Math.ceil(a*Module.expectedDataFileDownloads/d),Module.setStatus&&Module.setStatus("Downloading data... ("+i+"/"+a+")")}else Module.dataFileDownloads||Module.setStatus&&Module.setStatus("Downloading data...")})}function SetIndexedDBAndLoadCompressedJS(e){SetIndexedDBAndLoadCompressedJS.called||(SetIndexedDBAndLoadCompressedJS.called=!0,Module.indexedDB=e,Module.wasmBinaryFile&&"object"==typeof Wasm?LoadCompressedFile(Module.wasmBinaryFile,function(e){Module.wasmBinary=e,LoadCompressedJS(Module.codeUrl,null,{id:"codeUrl"})}):LoadCompressedJS(Module.asmUrl,function(){LoadCompressedJS(Module.codeUrl,null,{id:"codeUrl"})},{id:"asmUrl"}))}function LoadCode(){try{var e=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,o=e.open("/idbfs-test");o.onerror=function(e){e.preventDefault(),SetIndexedDBAndLoadCompressedJS()},o.onsuccess=function(){o.result.close(),SetIndexedDBAndLoadCompressedJS(e)},setTimeout(function(){SetIndexedDBAndLoadCompressedJS()},1e3)}catch(t){SetIndexedDBAndLoadCompressedJS()}}function CompatibilityCheck(){hasWebGL?mobile?confirm("Please note that Unity WebGL is not currently supported on mobiles. Press Ok if you wish to continue anyway.")||window.history.back():-1==browser.indexOf("Firefox")&&-1==browser.indexOf("Chrome")&&-1==browser.indexOf("Safari")&&(confirm("Please note that your browser is not currently supported for this Unity WebGL content. Try installing Firefox, or press Ok if you wish to continue anyway.")||window.history.back()):(alert("You need a browser which supports WebGL to run this content. Try installing Firefox."),window.history.back())}function UnityErrorHandler(e,o,t){return Module.errorhandler&&Module.errorhandler(e,o,t)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),didShowErrorMessage||-1!=e.indexOf("UnknownError")||-1!=e.indexOf("Program terminated with exit(0)"))?void 0:(didShowErrorMessage=!0,-1!=e.indexOf("DISABLE_EXCEPTION_CATCHING")?void alert("An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project's WebGL player settings to be able to catch the exception or see the stack trace."):-1!=e.indexOf("Cannot enlarge memory arrays")?void alert("Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings."):-1!=e.indexOf("Invalid array buffer length")||-1!=e.indexOf("Invalid typed array length")||-1!=e.indexOf("out of memory")?void alert("The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."):void alert("An error occurred running the Unity content on this page. See your browser's JavaScript console for more info. The error was:\n"+e))}function demangleSymbol(e){return Module.debugSymbols&&Module.debugSymbols[e]&&(e=Module.debugSymbols[e]),e.lastIndexOf("__Z",0)||(e=(Module.demangle||demangle)(e)),e}function demangleError(e){var o=-1!=browser.indexOf("Chrome")?"(\\s+at\\s+)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*\\((blob:.*)\\)":"(\\s*)(([\\w\\d_\\.]*?)([\\w\\d_$]+)(/[\\w\\d_\\./]+|))(\\s+\\[.*\\]|)\\s*@(blob:.*)",t=new RegExp(o,"g"),n=new RegExp("^"+o+"$");return e.replace(t,function(e){var o=e.match(n),t=demangleSymbol(o[4]),r=o[7].match(/^(blob:.*)(:\d+:\d+)$/),a=r&&Module.blobInfo&&Module.blobInfo[r[1]]&&Module.blobInfo[r[1]].url?Module.blobInfo[r[1]].url:"blob";return o[1]+t+(o[2]!=t?" ["+o[2]+"]":"")+" ("+(r?a.substr(a.lastIndexOf("/")+1)+r[2]:o[7])+")"})}function SetFullscreen(e){if("undefined"==typeof runtimeInitialized||!runtimeInitialized)return void console.log("Runtime not initialized yet.");if("undefined"==typeof JSEvents)return void console.log("Player not loaded yet.");var o=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1},Module.cwrap("SetFullscreen","void",["number"])(e),JSEvents.canPerformEventHandlerRequests=o}var CompressionState={Uninitialized:0,Pending:1,Unsupported:2,Supported:3,current:0,pendingServerRequests:[],Set:function(e){if(CompressionState.current==CompressionState.Pending){CompressionState.current=e;for(var o=0;o<CompressionState.pendingServerRequests.length;o++)CompressionState.pendingServerRequests[o]()}}};Module.memoryInitializerRequest={status:-1,response:null,callback:null,addEventListener:function(e,o){if("load"!=e)throw"Unexpected type "+e;this.callback=o}},LoadCompressedFile(Module.memUrl,function(e){Module.memoryInitializerRequest.status=200,Module.memoryInitializerRequest.response=e,Module.memoryInitializerRequest.callback&&Module.memoryInitializerRequest.callback()}),LoadCode();var browser=function(){var e,o=navigator.userAgent,t=o.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(t[1])?(e=/\brv[ :]+(\d+)/g.exec(o)||[],"IE "+(e[1]||"")):"Chrome"===t[1]&&(e=o.match(/\bOPR\/(\d+)/),null!=e)?"Opera "+e[1]:(t=t[2]?[t[1],t[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=o.match(/version\/(\d+)/i))&&t.splice(1,1,e[1]),t.join(" "))}(),hasWebGL=function(){if(!window.WebGLRenderingContext)return 0;var e=document.createElement("canvas"),o=e.getContext("webgl");return o||(o=e.getContext("experimental-webgl"))?1:0}(),mobile=function(e){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);Module.compatibilitycheck?Module.compatibilitycheck():CompatibilityCheck();var didShowErrorMessage=!1;"function"!=typeof window.onerror&&(Error.stackTraceLimit=50,window.onerror=function(e,o,t){return!Module.debugSymbolsUrl||Module.debugSymbols?UnityErrorHandler(demangleError(e),o,t):void LoadCompressedJS(Module.debugSymbolsUrl,function(){UnityErrorHandler(demangleError(e),o,t)})}),Module.locateFile=function(e){return Module.dataUrl},Module.preRun=[],Module.postRun=[],Module.print=function(){return function(e){console.log(e)}}(),Module.printErr=function(e){console.error(e)},Module.canvas=document.getElementById("canvas"),Module.progress=null,Module.setStatus=function(e){if(null==this.progress){if("function"!=typeof UnityProgress)return;this.progress=new UnityProgress(canvas)}if(Module.setStatus.last||(Module.setStatus.last={time:Date.now(),text:""}),e!==Module.setStatus.text){this.progress.SetMessage(e);var o=e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);o&&this.progress.SetProgress(parseInt(o[2])/parseInt(o[4])),""===e&&this.progress.Clear()}},Module.totalDependencies=0,Module.monitorRunDependencies=function(e){this.totalDependencies=Math.max(this.totalDependencies,e),Module.setStatus(e?"Preparing... ("+(this.totalDependencies-e)+"/"+this.totalDependencies+")":"All downloads complete.")},Module.setStatus("Downloading (0.0/1)");var Module;"undefined"==typeof Module&&(Module=eval("(function() { try { return Module || {} } catch(e) { return {} } })()")),Module.expectedDataFileDownloads||(Module.expectedDataFileDownloads=0,Module.finishedDataFileDownloads=0),Module.expectedDataFileDownloads++,function(){var e=function(e){function o(e){console.error("package error:",e)}function t(){function o(e,o){if(!e)throw o+(new Error).stack}function t(e,o,t,n){this.start=e,this.end=o,this.crunched=t,this.audio=n}function n(n){Module.finishedDataFileDownloads++,o(n,"Loading data file failed."),o(n instanceof ArrayBuffer,"bad input to processPackageData");var r=new Uint8Array(n);t.prototype.byteArray=r;var a=e.files;for(i=0;i<a.length;++i)t.prototype.requests[a[i].filename].onload();Module.removeRunDependency("datafile_build.data")}Module.FS_createPath("/","Il2CppData",!0,!0),Module.FS_createPath("/Il2CppData","Metadata",!0,!0),Module.FS_createPath("/","Resources",!0,!0),Module.FS_createPath("/","Managed",!0,!0),Module.FS_createPath("/Managed","mono",!0,!0),Module.FS_createPath("/Managed/mono","2.0",!0,!0),t.prototype={requests:{},open:function(e,o){this.name=o,this.requests[o]=this,Module.addRunDependency("fp "+this.name)},send:function(){},onload:function(){var e=this.byteArray.subarray(this.start,this.end);this.finish(e)},finish:function(e){var o=this;Module.FS_createDataFile(this.name,null,e,!0,!0,!0),Module.removeRunDependency("fp "+o.name),this.requests[this.name]=null}};var a=e.files;for(i=0;i<a.length;++i)new t(a[i].start,a[i].end,a[i].crunched,a[i].audio).open("GET",a[i].filename);Module.addRunDependency("datafile_build.data"),Module.preloadResults||(Module.preloadResults={}),Module.preloadResults[r]={fromCache:!1},l?(n(l),l=null):u=n}var n;if("object"==typeof window)n=window.encodeURIComponent(window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/");else{if("undefined"==typeof location)throw"using preloaded data can only be done on a web page or in a web worker";n=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var r="build.data",a="build.data";"function"!=typeof Module.locateFilePackage||Module.locateFile||(Module.locateFile=Module.locateFilePackage,Module.printErr("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));var d="function"==typeof Module.locateFile?Module.locateFile(a):(Module.filePackagePrefixURL||"")+a,s=e.remote_package_size,l=(e.package_uuid,null),u=null;fetchRemotePackageWrapper(d,s,function(e){u?(u(e),u=null):l=e},o),Module.calledRun?t():(Module.preRun||(Module.preRun=[]),Module.preRun.push(t))};e({files:[{audio:0,start:0,crunched:0,end:116799,filename:"/data.unity3d"},{audio:0,start:116799,crunched:0,end:116820,filename:"/methods_pointedto_by_uievents.xml"},{audio:0,start:116820,crunched:0,end:119666,filename:"/preserved_derived_types.xml"},{audio:0,start:119666,crunched:0,end:1976166,filename:"/Il2CppData/Metadata/global-metadata.dat"},{audio:0,start:1976166,crunched:0,end:2710314,filename:"/Resources/unity_default_resources"},{audio:0,start:2710314,crunched:0,end:2737939,filename:"/Managed/mono/2.0/machine.config"}],remote_package_size:2737939,package_uuid:"3c5ec5b5-b0e9-4fc8-8262-991fe89faa24"})}();