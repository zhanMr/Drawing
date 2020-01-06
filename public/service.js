const CACHE_NAME = 'MyCache2';
self.addEventListener('install', async e => {

    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
        '/',
        '/image/icon.png',
        '/manifest.json'
    ]);
    await self.skipWaiting();
})

self.addEventListener('activate', async e => {
    const keys = await caches.keys();
    console.log(keys);
    for(const item of keys){
        if(item !== CACHE_NAME){
            caches.delete(item);
        }
    }
    await self.clients.claim();
})

self.addEventListener('fetch', e => {

    e.respondWith(N(e.request));
})



async function N(req){
    try{
        console.log(11);
        const f = await fetch(req);
        return f;
    }catch(e){
        console.log(22);
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);
        return cached;
    }
}