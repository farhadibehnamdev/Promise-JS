const ACCESS_KEY = "VP853hlPvHDtmA1KBQW90lvrnVerl4Js0msRD2EhMOg";
const endpoint = `https://api.unsplash.com/photoss/?page=2&per_page=12&client_id=${ACCESS_KEY}`;
const placeholder = document.querySelector(".image-placeholder");
const loading = document.querySelector(".lds-ripple");
const renderPhotos = function (data) {
  const itemsPerRow = 4;
  const rows = Math.ceil(data.length / itemsPerRow);
  let output = Array.from({ length: rows }, (_, rowIndex) => {
    const startIndex = rowIndex * itemsPerRow;
    const rowItems = data.slice(startIndex, startIndex + itemsPerRow);
    const innerHtml = rowItems
      .map((item, index) => {
        return `<div class="flex  justify-center justify-items-center gap-10">
            <img class=" rounded-md w-40 h-40" src=${item.urls.thumb} alt="photo" />
          </div>`;
      })
      .join("");

    return `<div class="grid grid-cols-4 gap-10">
            ${innerHtml}
          </div>`;
  }).join("");

  placeholder.innerHTML = output;
};
const getPhotos = function () {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          switch (response.status) {
            case 404:
              throw new Error("Not Found Error!!");
            case 500:
              throw new Error("Server Error!!");
            default:
              throw new Error("Some error occured!!");
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
getPhotos()
  .then((response) => response.json())
  .then((data) => {
    setTimeout(() => {
      renderPhotos(data);
    }, 5000);
  })
  .catch((error) => {
    placeholder.innerHTML = `<span class="rounded-md p-5 bg-red-400 shadow-md text-black font-bold">${error.message}</span>`;
  });
