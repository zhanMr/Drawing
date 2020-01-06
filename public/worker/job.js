let total = 0;
for(let i = 0; i < 1000000; i++){
    total += i;
}

self.postMessage(total);