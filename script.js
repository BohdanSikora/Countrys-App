'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry = function(data) {
    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
}
const renderError = function(msg) {
    countriesContainer.insertAdjacentHTML('beforeend', msg)
    countriesContainer.style.opacity = 1;
}
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

//   const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
  
//     request.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
  
//       const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//     </article>
//     `;
//       countriesContainer.insertAdjacentHTML('beforeend', html);
//       countriesContainer.style.opacity = 1;
//     });
//   };

const getCountryAndNeighbour = function(country) {

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`)
request.send();

request.addEventListener('load', function(){
    // console.log(this.responseText)
    const [data] = JSON.parse(this.responseText);
    console.log(data)
    renderCountry(data)

    const [naighbour] = data.borders
    if (!naighbour) return

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${naighbour}`)
    request2.send();

    request2.addEventListener('load', function(){
        const data2 = JSON.parse(this.responseText)
        console.log(data2)
        renderCountry(data2,'neighbour')
        })
    });
}
getCountryAndNeighbour('ukraine')
// getCountryAndNeighbour('usa')
// getCountryAndNeighbour('poland')
setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
        console.log('2 second passed')
        setTimeout(() => {
            console.log('3 second passed')
            setTimeout(() => {
                console.log('4 second passed')
            },1000)       
        },1000)
    },1000)
},1000)

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`)
// request.send();
// const request = fetch('https://restcountries.com/v2/name/ukraine')
// console.log(request)  

// const getCountData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function(response){
//         console.log(response)
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data)
//         renderCountry(data[0])
//     })

// const getJSON = function(url, errorMsg = 'Something went wrong') {
//     fetch(url).then(response => {
//         if(!response.ok)
//         throw new Error(`${errorMsg} (${response.status})`)
//         return response.json()
//     })
// }

// const request = fetch('https://restcountries.com/v2/name/ukraine')
// console.log(request)  

// const getCountData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//         console.log(response)

//         if(!response.ok)
//         throw new Error(`Coutry not found (${response.status})`)
//         return response.json()
//     })
//     .then((data) => {renderCountry(data[0])
//         const neighbour = 'sdsdadad' 

//     if(!neighbour) return;
    
//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.error(`${err}🚫`);
//         renderError(`Something went wrong ${err.massage}. Try again!🚫`)
// })
//     .finally(() => {
//         countriesContainer.style.opacity = 1;
//     })
// };


// const getJSON = function(url, errorMsg = 'Something went wrong') {
//     fetch(url).then(response => {
//         if(!response.ok)
//         throw new Error(`${errorMsg} (${response.status})`)
//         return response.json()
//     })
// }

// const request = fetch('https://restcountries.com/v2/name/ukraine')
// console.log(request)  

const getCountryData = function (country) {
    // Country 1
    getJSON(`https://restcountries.com/v2/name/${country}`,'Country not found')
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
  
        if (!neighbour) throw new Error('No neighbour found!');
  
        // Country 2
        return getJSON(
          `https://restcountries.com/v2/name/${neighbour}`,
          'Country not found'
        );
      })
  
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} 💥💥💥`);
        renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    getCountryData('ukraine');
  });
  


// // challenge

// const whereAmI = function(lat, lng) {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res =>{
//         if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//         return res.json()
//     })
//     .then(data => {
//         console.log(data)
//         console.log(`You are in ${data.city}, ${data.country}`)
//         return fetch(`https://restcountries.com/v2/name/${data.country}`)
//     })
//     .then(res => {
//                 if(!res.ok)
//                 throw new Error(` (${res.status})`)
//                 return res.json()
//             })
//             .then(data => renderCountry(data[0]))
//             .catch(err => console.error(`${err.massage} ❌`))
// }
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// const lotteryPromise = new Promise(function(resolve, reject) {
//     console.log('Lotter draw is happening')
    
//     setTimeout(function(){
//     if (Math.random() >= 0.5) {
//         resolve('You win 🏆')
//     } else {
//         reject(new Error('You lost ⚰️'))
//     }
//     }, 2000)
    
// })
// // lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// // const wait = function(seconds) {
// //     return new Promise(function(resolve) {
// //         setTimeout(resolve, seconds * 1000)
// //     }) 
// // }
// // wait(1)
// //    .then(() =>{
// //     console.log('I waited for 1 second')
// //     return wait(1)
// //    })
// //     .then(() => {
// //         console.log('I waited for 2 second')
// //         return wait(1)
// //     })
// //     .then(() => {
// //         console.log('I waited for 3 second')
// //         return wait(1)
// //     })
// //     .then(() => {
// //         console.log('I waited for 4 second')
// //         return wait(1)
// //     })

// // // setTimeout(() => {
// // //     console.log('1 second passed');
// // //     setTimeout(() => {
// // //         console.log('2 second passed')
// // //         setTimeout(() => {
// // //             console.log('3 second passed')
// // //             setTimeout(() => {
// // //                 console.log('4 second passed')
// // //             },1000)       
// // //         },1000)
// // //     },1000)
// // // },1000)

// // Promise.resolve('huj').then(x => console.log(x));
// // Promise.reject(new Error ('Problem!')).catch(x => console.error(x))




// // const getPosition = function() {
// // return new Promise(function(resolve, reject) {
// //     navigator.geolocation.getCurrentPosition(
// //         position => resolve(position),
// //         err => reject(err)
// //     );
// //     navigator.geolocation.getCurrentPosition(resolve, reject)
// // })
// // }
// // getPosition().then(pos => console.log(pos))

// // const whereAmI = function() {
// //     getPosition().then(pos => {
// //         const {latitude: lat,longitude:lng} = pos.coords
// //         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
// //     })
// //         .then(res =>{
// //             if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
// //             return res.json()
// //         })
// //         .then(data => {
// //             console.log(data)
// //             console.log(`You are in ${data.city}, ${data.country}`)
// //             return fetch(`https://restcountries.com/v2/name/${data.country}`)
// //         })
// //         .then(res => {
// //             if(!res.ok)
// //             throw new Error(` (${res.status})`)
// //             return res.json()
// //         })
// //         .then(data => renderCountry(data[0]))
// //         .catch(err => console.error(`${err.massage} ❌`))
// //     }
// //     btn.addEventListener('click', whereAmI)

//     const wait = function (seconds) {
//         return new Promise(function (resolve) {
//           setTimeout(resolve, seconds * 1000);
//         });
//       };

//     const imgContainer = document.querySelector('.images')
//     const createImage = function(imgPath) {
//         return new Promise(function(resolve, reject){
//             const img = document.createElement('img');
//             img.src = imgPath
//             img.addEventListener('load', function(){
//                 imgContainer.append(img)
//                 resolve(img)
//             })
//             img.addEventListener('error', function() {
//                 reject(new Error('Image not found'))
//             })
//         })
//     }
//     let currentImg;
//     createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log('Image 1 loaded')
//         return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display ='none';
//         return createImage('img/img-2.jpg')
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 loaded')
//         return wait(2)
//     })
//     .then(() => {
//         currentImg.style.display ='none';
        
//     })
//     .catch(error => console.error(err))
    


// const loadNPause = async function() {
//     try {
//        let img = await createImage('img/img-1.jpg');
//        console.log('Image 1 loaded');
//        await wait(2);
//         img.style.display = 'none';

//         img = await createImage('img/img-2.jpg');
//         console.log('Image 2 loaded');
//         await wait(2);
//         Img.style.display = 'none';

//     } catch(err) {
//         console.error(err)
//     }
// }
// loadNPause()

//     const getPosition = function() {
//     return new Promise(function(resolve, reject) {
//         navigator.geolocation.getCurrentPosition(
//            resolve, reject)
//     });
//     }
//     const whereAmI = async function () {
//         try {
//           // Geolocation
//           const pos = await getPosition();
//           const { latitude: lat, longitude: lng } = pos.coords;
      
//           // Reverse geocoding
//           const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//           if (!resGeo.ok) throw new Error('Problem getting location data');
      
//           const dataGeo = await resGeo.json();
//           console.log(dataGeo);
      
//           // Country data
//           const res = await fetch(
//             `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//           );
          
//           // BUG in video:
//           // if (!resGeo.ok) throw new Error('Problem getting country');
          
//           // FIX:
//           if (!res.ok) throw new Error('Problem getting country');
      
//           const data = await res.json();
//           console.log(data);
//           renderCountry(data[0]);
//         } catch (err) {
//           console.error(`${err} 💥`);
//           renderError(`💥 ${err.message}`);
//         }
//       };
//       whereAmI();
//       whereAmI();
//       whereAmI();
//       console.log('FIRST');
      
//       // try {
//       //   let y = 1;
//       //   const x = 2;
//       //   y = 3;
//       // } catch (err) {
//       //   alert(err.message);
//       // }
      
      
//       ///////////////////////////////////////
//       // Returning Values from Async Functions
//       const getPosition = function () {
//         return new Promise(function (resolve, reject) {
//           navigator.geolocation.getCurrentPosition(resolve, reject);
//         });
//       };
      
//       const whereAmI = async function () {
//         try {
//           // Geolocation
//           const pos = await getPosition();
//           const { latitude: lat, longitude: lng } = pos.coords;
      
//           // Reverse geocoding
//           const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//           if (!resGeo.ok) throw new Error('Problem getting location data');
//           const dataGeo = await resGeo.json();
      
//           // Country data
//           const res = await fetch(
//             `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//           );
//           if (!resGeo.ok) throw new Error('Problem getting country');
//           const data = await res.json();
//           renderCountry(data[0]);
      
//           return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//         } catch (err) {
//           console.error(`${err} 💥`);
//           renderError(`💥 ${err.message}`);
      
//           // Reject promise returned from async function
//           throw err;
//         }
//       };
      
//       console.log('1: Will get location');
//       // const city = whereAmI();
//       // console.log(city);
      
//       // whereAmI()
//       //   .then(city => console.log(`2: ${city}`))
//       //   .catch(err => console.error(`2: ${err.message} 💥`))
//       //   .finally(() => console.log('3: Finished getting location'));
      
//       (async function () {
//         try {
//           const city = await whereAmI();
//           console.log(`2: ${city}`);
//         } catch (err) {
//           console.error(`2: ${err.message} 💥`);
//         }
//         console.log('3: Finished getting location');
//       })();
      
      
     
//       const get3Countries = async function (c1, c2, c3) {
//         try {
//           // const [data1] = await getJSON(
//           //   `https://restcountries.eu/rest/v2/name/${c1}`
//           // );
//           // const [data2] = await getJSON(
//           //   `https://restcountries.eu/rest/v2/name/${c2}`
//           // );
//           // const [data3] = await getJSON(
//           //   `https://restcountries.eu/rest/v2/name/${c3}`
//           // );
//           // console.log([data1.capital, data2.capital, data3.capital]);
      
//           const data = await Promise.all([
//             getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//             getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//             getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//           ]);
//           console.log(data.map(d => d[0].capital));
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       get3Countries('portugal', 'canada', 'tanzania');
      
      
//       ///////////////////////////////////////
//       // Other Promise Combinators: race, allSettled and any
//       // Promise.race
//       (async function () {
//         const res = await Promise.race([
//           getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//           getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//           getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//         ]);
//         console.log(res[0]);
//       })();
      
//       const timeout = function (sec) {
//         return new Promise(function (_, reject) {
//           setTimeout(function () {
//             reject(new Error('Request took too long!'));
//           }, sec * 1000);
//         });
//       };
      
//       Promise.race([
//         getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//         timeout(5),
//       ])
//         .then(res => console.log(res[0]))
//         .catch(err => console.error(err));
      
//       // Promise.allSettled
//       Promise.allSettled([
//         Promise.resolve('Success'),
//         Promise.reject('ERROR'),
//         Promise.resolve('Another success'),
//       ]).then(res => console.log(res));
      
//       Promise.all([
//         Promise.resolve('Success'),
//         Promise.reject('ERROR'),
//         Promise.resolve('Another success'),
//       ])
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
      
//       // Promise.any [ES2021]
//       Promise.any([
//         Promise.resolve('Success'),
//         Promise.reject('ERROR'),
//         Promise.resolve('Another success'),
//       ])
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
      
      
      ///////////////////////////////////////
      // Coding Challenge #3
      
      /* 
      PART 1
      Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
      Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
      
      PART 2
      1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
      2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
      3. Check out the 'imgs' array in the console! Is it like you expected?
      4. Use a promise combinator function to actually get the images from the array 😉
      5. Add the 'paralell' class to all the images (it has some CSS styles).
      
      TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
      
     
      */
      
      /*
      const wait = function (seconds) {
        return new Promise(function (resolve) {
          setTimeout(resolve, seconds * 1000);
        });
      };
      
      const imgContainer = document.querySelector('.images');
      
      const createImage = function (imgPath) {
        return new Promise(function (resolve, reject) {
          const img = document.createElement('img');
          img.src = imgPath;
      
          img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
          });
      
          img.addEventListener('error', function () {
            reject(new Error('Image not found'));
          });
        });
      };
      
      let currentImg;
      
      // createImage('img/img-1.jpg')
      //   .then(img => {
      //     currentImg = img;
      //     console.log('Image 1 loaded');
      //     return wait(2);
      //   })
      //   .then(() => {
      //     currentImg.style.display = 'none';
      //     return createImage('img/img-2.jpg');
      //   })
      //   .then(img => {
      //     currentImg = img;
      //     console.log('Image 2 loaded');
      //     return wait(2);
      //   })
      //   .then(() => {
      //     currentImg.style.display = 'none';
      //   })
      //   .catch(err => console.error(err));
      
      // PART 1
      const loadNPause = async function () {
        try {
          // Load image 1
          let img = await createImage('img/img-1.jpg');
          console.log('Image 1 loaded');
          await wait(2);
          img.style.display = 'none';
      
          // Load image 1
          img = await createImage('img/img-2.jpg');
          console.log('Image 2 loaded');
          await wait(2);
          img.style.display = 'none';
        } catch (err) {
          console.error(err);
        }
      };
      // loadNPause();
      
      // PART 2
      const loadAll = async function (imgArr) {
        try {
          const imgs = imgArr.map(async img => await createImage(img));
          const imgsEl = await Promise.all(imgs);
          console.log(imgsEl);
          imgsEl.forEach(img => img.classList.add('parallel'));
        } catch (err) {
          console.error(err);
        }
      };
      loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
      */
    // const whereAmI = async function() {
    //     // await fetch(`https://restcountries.com/v2/name/${country}`)
    //     // console.log(res)
    //     const pos = await getPosition() 
    //     const {latitude: lat,longitude:lng} = pos.coords
    //     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    //     const dataGeo = await resGeo.json()

    //     const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    //     const data = await res.json();
    //     console.log(data);
    //     renderCountry(data[0]);
    // }
    // whereAmI('ukraine')
    // console.log('FIRST')


    // const get3Countries = async function(c1, c2, c3) {
    //     try {
    //         const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
    //         const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
    //         const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)

    //         console.log([data1.capital,data2.capital,data3.capital ])
    //     } catch(err) {
    //         console.error(err)
    //     }
    // }
    // get3Countries('ukraine', 'paland', 'iceland')


    // // promise.race


    // (async function(){
    //     const res = await Promise.race([
    //        getJSON(`https://restcountries.com/v2/name/italy`),
    //        getJSON(`https://restcountries.com/v2/name/mexico`),
    //        getJSON(`https://restcountries.com/v2/name/ukraine`)
    //     ])
    //     console.log(res[0])
    // })()


    // const timeout = function(s) {
    //     return new  Promise(function(_, reject){
    //         setTimeout(function() {
    //             reject(new Error('Request took too long!'))
    //         }, sec * 1000)
    //     })
    // }

    // Promise.race([
    //     getJSON(`https://restcountries.com/v2/name/ukraine`),
    //     timeout(1)
    // ])
    // .then(res => console.log(res[0]))
    // .catch(err => console.error(err))

    // //promise.allSettler

    // Promise.allSettled([
    //     Promise.resolve('Success'),
    //     Promise.reject('ERROR'),
    //     Promise.resolve('Anather success')

    // ]).then(res => console.log(res[0]))


