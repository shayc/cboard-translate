/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["fonts/MaterialIcons-Regular.woff2","570eb83859dc23dd0eec423a49e147fe"],["images/mulberry-symbols/Zero.svg","03e2afb28398db9fbf0e53051a5589d2"],["images/mulberry-symbols/above.svg","2ed2f1b463fb7bf330ab77cabdcc5d31"],["images/mulberry-symbols/afraid_man.svg","b21f598c62505291450e5384d2e779b3"],["images/mulberry-symbols/afternoon.svg","0e9af2a8974dc75a0e8c6f54a2ba363e"],["images/mulberry-symbols/angry_man.svg","f526ae3c91085789d877234218616fff"],["images/mulberry-symbols/apple.svg","a91b53ae57ae47165907d9ac8e78a89c"],["images/mulberry-symbols/apple_juice.svg","90f46200868aa3d2708cd57729ead9cc"],["images/mulberry-symbols/apricot.svg","9d8a3118b724a7b15f41e8bccb18f01a"],["images/mulberry-symbols/bad.svg","4474f5b6530a5b2e4a72de4548fb689a"],["images/mulberry-symbols/banana.svg","665c6b3212f6ac7b3e1fada2e8d193f6"],["images/mulberry-symbols/beef.svg","0414db9289acd8375be00af84cfdb873"],["images/mulberry-symbols/below.svg","64344f6456b53cd3f41412056be56af1"],["images/mulberry-symbols/biscuits.svg","60e5cf9077a8cc31d01a235936cc4c1a"],["images/mulberry-symbols/blouse.svg","0b05e5f2b84697c0e889393aeb27e59a"],["images/mulberry-symbols/blue.svg","65a8123f0ce492d6c6c61019a4a33fcf"],["images/mulberry-symbols/bobble_hat.svg","31fb64469637156f8db23361b736b53d"],["images/mulberry-symbols/boots.svg","9a3e4513b7930aa9c6ec3e4f4c92fc2d"],["images/mulberry-symbols/boxer_shorts.svg","e458fe327fe1a9fc28029aa58494618f"],["images/mulberry-symbols/bra.svg","948f48c556ae472bf5748baa32262070"],["images/mulberry-symbols/bread_slice.svg","25ef4d736f07b037b6fe32aa99a66530"],["images/mulberry-symbols/breakfast_2.svg","c5227fca1dcd2bbd0a17f0ff426994a3"],["images/mulberry-symbols/cat.svg","3c07e6aaffb0f9eba7a4bef51c15d9fc"],["images/mulberry-symbols/cereal.svg","ae80d8397812dbae0350a9768bfc019d"],["images/mulberry-symbols/chicken.svg","c4198a09de8fba94a59e3459c6c9a8a2"],["images/mulberry-symbols/chocolate.svg","ae0bc742ee31c00dde90cba19c4d6fcd"],["images/mulberry-symbols/circle.svg","935c4614b5eb636af280dfb96762782d"],["images/mulberry-symbols/clock.svg","f8aa9d7d7632854e39e927bc1a9ddd26"],["images/mulberry-symbols/clothes_generic.svg","ee393e783912edcc32947184cbc59633"],["images/mulberry-symbols/coffee.svg","914673d633ee9904fe362487aa78f128"],["images/mulberry-symbols/colour.svg","5fb7edd754b9766325492cc23e21d145"],["images/mulberry-symbols/confused_man.svg","1099606594da23325ffe0a3230569dbd"],["images/mulberry-symbols/correct.svg","b56b9c1207e69ec0bb52c7008029d732"],["images/mulberry-symbols/crisps.svg","03075ea1b392c7ee40de9044601cf13e"],["images/mulberry-symbols/croissant.svg","6f2051393bc451f1f6ef254ff82e285b"],["images/mulberry-symbols/dinner.svg","775c6f70a88cf624eed9a908a8a09133"],["images/mulberry-symbols/disgusted_man.svg","e937ce527806b384bf3708fff56e6ded"],["images/mulberry-symbols/dog.svg","d50b613f95f2b3509c1c988660863482"],["images/mulberry-symbols/donkey.svg","a2a81ae6e5a30b5fea913452e01dc2c2"],["images/mulberry-symbols/dove.svg","2d186e23984af46bab661dbfd9d42fac"],["images/mulberry-symbols/down.svg","06f0274919bfc9a930eb5de014c97e80"],["images/mulberry-symbols/drinks.svg","128744dea6e57449bfd5c06e62c4deae"],["images/mulberry-symbols/egg_boiled.svg","bc122fd306d8454a8cec08b36269b17b"],["images/mulberry-symbols/egg_fried.svg","b613307c9f17282ca4180a4859f364da"],["images/mulberry-symbols/eight.svg","b3beb668eb01a0db7b9f53cf886fb45d"],["images/mulberry-symbols/first_aid_box.svg","8f4bdf6f86e7c396547935da8c422d6e"],["images/mulberry-symbols/fish.svg","042a78ccb5843c46582d66379de6557e"],["images/mulberry-symbols/five.svg","be39181f88f8b89532396aece03d1117"],["images/mulberry-symbols/four.svg","5055cfbb7e7d3ad352f07659d9eccc7b"],["images/mulberry-symbols/fox.svg","74e2dd612f8a89cb8152c94caad76979"],["images/mulberry-symbols/fruit.svg","0a2664d8c1fda5ad9652f7a8f35c1c69"],["images/mulberry-symbols/giraffe.svg","bdf9d51f20079a2481063e4c928e6ebe"],["images/mulberry-symbols/gloves.svg","7a1669345447fe2917790dd8e8c34bf1"],["images/mulberry-symbols/good.svg","785f0503d907e2d69351b8cd10e3f106"],["images/mulberry-symbols/gorilla.svg","52a49963d5ffc394b738aff01d9757ae"],["images/mulberry-symbols/great.svg","633f9748b214a5bab6ff3db5de5c0916"],["images/mulberry-symbols/green.svg","1e48a11f482ccdb58101aa656fcd3992"],["images/mulberry-symbols/hamburger.svg","692789a5d895b1fa12b04623d1ae3121"],["images/mulberry-symbols/hamster.svg","2267c78635fe2fdd25729156650f1b74"],["images/mulberry-symbols/happy_man.svg","1742ee509e3a959e21fa2b8870828586"],["images/mulberry-symbols/hedgehog.svg","cfaaa9b28a567ddb985da11130fb4f8e"],["images/mulberry-symbols/hello.svg","2f403ce92b944ae9243bd03dba310651"],["images/mulberry-symbols/hexagon.svg","ad76c7c234f720b5b0427e5c3033904d"],["images/mulberry-symbols/horse.svg","08d3819cc474ab7824a72f36cef1ba7c"],["images/mulberry-symbols/hot_dog.svg","775e1ff27ec75ddd45ef3c0cef66dbdf"],["images/mulberry-symbols/hungry.svg","c00a545cd2560bf129adbdeb0ce8b8c9"],["images/mulberry-symbols/ice_cream.svg","3fc71e85d5b1b79b9e5ac52b4daa8fdb"],["images/mulberry-symbols/jacket.svg","26f6ecb0e04293e6e98090e5c2f24ba0"],["images/mulberry-symbols/kiwi.svg","47ab36281be1789dee2a204ff6902f0e"],["images/mulberry-symbols/left.svg","5a33a30a1f6bf0c51209d59d3472ad6d"],["images/mulberry-symbols/lunch_2.svg","7cb5f3c9386d3135235c0a6ddb1eb0d1"],["images/mulberry-symbols/mango.svg","85b53414352766b2fb15755a4c81e872"],["images/mulberry-symbols/marshmallows.svg","32485894e7ee33691bca33a2d9a14ae7"],["images/mulberry-symbols/mash_potato_1.svg","676e5bbb2300052318084b68aedce02f"],["images/mulberry-symbols/melon.svg","cddae834dc31e723c94f39bcb20e1bfa"],["images/mulberry-symbols/milkshake.svg","da5e89235d3a90491cf17d5a5215c970"],["images/mulberry-symbols/mistake_no_wrong.svg","6235c90206b1f6077f1a12b1cb12c8c2"],["images/mulberry-symbols/morning.svg","a6f2a7a69f2a530deede2176d4fae5d4"],["images/mulberry-symbols/need_toilet.svg","6a7ab6e4e1d2ae2c7aa21b5e2f0b138d"],["images/mulberry-symbols/nine.svg","f02bcbc27b92822a93fc01e9b629be54"],["images/mulberry-symbols/now.svg","0d9238593a96f0c5f6f874107be9f5e5"],["images/mulberry-symbols/on.svg","8bfe4920c1781724197c46c3fc8a701c"],["images/mulberry-symbols/one.svg","9ae746cd438213ce3d1d5f94e1447cd1"],["images/mulberry-symbols/orange.svg","ffb92af3fe9af6bded81a7ee0965a7fa"],["images/mulberry-symbols/orange_juice.svg","89970783e571dcea7bde6e6ceaba9651"],["images/mulberry-symbols/pancakes.svg","6551c2cb018043d193df54409808b1bb"],["images/mulberry-symbols/pants.svg","0a9c208e7da3fec8704b1bd6e2103505"],["images/mulberry-symbols/pasta.svg","e5d48467ed65f373b200c7d51880d61a"],["images/mulberry-symbols/peach.svg","b2343fff687881a2b165acb3030695d6"],["images/mulberry-symbols/pear.svg","01f43670ecd181af8df0b8e9d755b52e"],["images/mulberry-symbols/pineapple.svg","7578856d2ce9ac4a10a94bd032a2f4c8"],["images/mulberry-symbols/pink.svg","385e75e181a24187f091dd571669e4f0"],["images/mulberry-symbols/pizza.svg","d86c790aee0ac2780628753f6426b8ce"],["images/mulberry-symbols/porridge.svg","dceff0352b955a1d0bb258a81311c761"],["images/mulberry-symbols/potato.svg","5768fa1ec5325595f1fc60034e5d1b23"],["images/mulberry-symbols/ready_meal.svg","88e369e154e9e4fb8f7546e8c8453837"],["images/mulberry-symbols/red.svg","8bdd1990087e766bc036683d6a651aca"],["images/mulberry-symbols/rice.svg","f823b7eb1d127b86ec2a5d1e22bb1913"],["images/mulberry-symbols/right.svg","580649f88a4ee142411162dced390d37"],["images/mulberry-symbols/sad_man.svg","1ff7b96ae048e006f630dbeba2945f68"],["images/mulberry-symbols/salad.svg","5a9e81b11c974ef21139d96aab7713c5"],["images/mulberry-symbols/seven.svg","9f1008d05a41f7985de6191ee7cb2b79"],["images/mulberry-symbols/shapes.svg","0db6b305d44c6fcb069bd4fd11e8a640"],["images/mulberry-symbols/shirt.svg","950ca39ff51458f3599d06b34a03fe84"],["images/mulberry-symbols/six.svg","b923f5789ee0d5d2cb7352793c0552f0"],["images/mulberry-symbols/soup.svg","9823b755e6fcd7c6661cc9d188386fb2"],["images/mulberry-symbols/soup_carrot.svg","a7128699b7a988bbf80e05c336bf5681"],["images/mulberry-symbols/soup_chicken.svg","a5378d48f588ac8981176b77058e4b91"],["images/mulberry-symbols/soup_mushroom.svg","0925a053a86ca71a8d86e6a478e55027"],["images/mulberry-symbols/soup_onion.svg","5e80ea787e85a9ebce4128c77dc4d1ba"],["images/mulberry-symbols/soup_pea.svg","643255f26a34920d28e8e711fc0f72ef"],["images/mulberry-symbols/soup_tomato.svg","aded8cd473a2dcd1b252c33dacb50f0e"],["images/mulberry-symbols/soup_vegetable.svg","d052a8cabd48d94094ea087c006ad207"],["images/mulberry-symbols/spaghetti_bolognaise.svg","82a19886f864b4b2f52d40a4d8607dd9"],["images/mulberry-symbols/square.svg","a3299cdc3fe9b2ef9e614f977d504980"],["images/mulberry-symbols/t-shirt.svg","8c6dd9fda5b281b5b972beae952386e0"],["images/mulberry-symbols/tea.svg","2aeb0f2b82d20cc7fb140c7aff1b4d8e"],["images/mulberry-symbols/thirsty.svg","ad737a4ac5a4105be7d9f85611f5f059"],["images/mulberry-symbols/three.svg","932f4326f3fb664046dc5d20170f09e3"],["images/mulberry-symbols/today.svg","add087002bd466d98780bd4d871de365"],["images/mulberry-symbols/tomorrow.svg","5340944bb1939089132d84e79d72b627"],["images/mulberry-symbols/trousers.svg","7ecc820950b62e1eee8a6b4bca69e3a5"],["images/mulberry-symbols/two.svg","e656515c4e21fc0285874eafc643a99e"],["images/mulberry-symbols/under_1.svg","e5da272a44fe4346f1d8b77722d8706a"],["images/mulberry-symbols/up.svg","edd3b7b62b4c8c528b0109b358813a45"],["images/mulberry-symbols/water.svg","64cb6ec93b94c0f780c5805e56ceeacb"],["images/mulberry-symbols/watermelon.svg","0ac391527e3cfdf19d4ec378becc0997"],["images/mulberry-symbols/when.svg","de887f87d223ec5191a36f00ca368b6a"],["images/mulberry-symbols/wolf.svg","0c535990f67a9dc10eaaa029961db85a"],["images/mulberry-symbols/yellow.svg","54c6187bebd8ce74f24dbcb9dcde01da"],["images/mulberry-symbols/yesterday.svg","12c29c33d16503cc05f446801296a81a"],["index.html","8fb1f906e1d44bda0c53b41b5715e930"],["manifest.json","df33d49787ee6b11c0b3390acd8b7daa"],["static/css/main.d09880ad.css","076e53ae53d475de7861e0ff65d47966"],["static/js/main.3261cd5c.js","c8ee95371613722c2e338562914b1ac1"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /\.\w{8}\./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/images\//, toolbox.cacheFirst, {"cache":{"name":"images-cache"}});




