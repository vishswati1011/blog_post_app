// let cacheData="blogV1";

// this.addEventListener("install",(event)=>{
//     event.waitUntil(
//         caches.open(cacheData).then((cache)=>{
//             cache.addAll([
//                 "/static/js/bundle.js",
//                 "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
//                 "/static/js/main.chunk.js",
//                 "/static/js/0.chunk.js",
//                 "/index.html",
//                 "/",
//                 "/favicon.ico",                
//                 "/home",
//                 "/employee",
//                 "/project",
//                 "/blog",
//                 "/addBlog",
//                 "/profile",
//                 "/map"
//             ])
//         })
//     )
// })

// this.addEventListener("fetch",(event)=>{
//     // console.log("navigator",navigator.onLine)
//     // if(!navigator.onLine){
//         event.respondWith(
//             caches.match(event.request).then((result)=>{
//                 if(result){
//                     return result
//                 }
//                 let requestUrl=event.request.clone();
//                 return fetch(requestUrl);
//             })
//         )
//     // }
// })