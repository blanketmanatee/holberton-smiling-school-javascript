$(document).ready(function () {
    //   Quotes ===============================================================
  
    /**
     * Creates a carousel item and appends it to the DOM
     * @data  {Array} List of data to be displayed as Quotes
     * @return {undefined}  No return
     */
    function displayQuotes(data) {
      let classItem = "";
      for (let i in data) {
        classItem = i == 0 ? "carousel-item active" : "carousel-item";
        let $carouselItem = $(`
          <blockquote class="${classItem}">
          <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
              <img
                  src="${data[i].pic_url}"
                  class="d-block align-self-center"
                  alt="Carousel Pic ${i}"
              />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
              <div class="quote-text">
                  <p class="text-white pr-md-4 pr-lg-5">
                  ${data[i].text}
                  </p>
                  <h4 class="text-white font-weight-bold">${data[i].name}</h4>
                  <span class="text-white">${data[i].title}</span>
              </div>
              </div>
          </div>
          </blockquote>;
      `);
  
        $("#carousel-items").append($carouselItem);
      }
  
      // END OF displayQuotes
    }
  
    /**
     * Modifies to logic of bootstrap carousel in order for
     * it to move 1 slide at a time
     * @id  {string} Id of a carousel item slide
     * @return {undefined}  No return
     */
    function slideOne(id) {
      $(`#${id} .carousel-item`).each(function () {
        let minPerSlide = 4;
        let next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(":first");
        }
        next.children(":first-child").clone().appendTo($(this));
  
        for (let i = 0; i < minPerSlide; i++) {
          next = next.next();
          if (!next.length) {
            next = $(this).siblings(":first");
          }
  
          next.children(":first-child").clone().appendTo($(this));
        }
      });
    }
  
    /**
     * Creates the string equivalent of a card element in bootstrap
     * @cardData  {object} An object containing data for creating the card
     * @return {string}  string equivalent of a card element in bootstrap
     */
    function createCard(cardData) {
      let starState = "";
      let starString = "";
      let star;
      for (let i = 1; i <= 5; i++) {
        if (i <= cardData.star) {
          starState = "images/star_on.png";
        } else {
          starState = "images/star_off.png";
        }
  
        star = `<img src="${starState}" alt="star on" width="15px" />`;
        starString += i == 1 ? star : "\n" + star;
      }
  
      let card = `
      <div class="card">
        <img
          src="${cardData.thumb_url}"
          class="card-img-top"
          alt="Video thumbnail"
        />
        <div class="card-img-overlay text-center">
          <img
            src="images/play.png"
            alt="Play"
            width="64px"
            class="align-self-center play-overlay"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title font-weight-bold">${cardData.title}</h5>
          <p class="card-text text-muted">
              ${cardData["sub-title"]}
          </p>
          <div class="creator d-flex align-items-center">
            <img
              src="${cardData.author_pic_url}"
              alt="Creator of Video"
              width="30px"
              class="rounded-circle"
            />
            <h6 class="pl-3 m-0 main-color">${cardData.author}</h6>
          </div>
          <div class="info pt-3 d-flex justify-content-between">
            <div class="rating">
              ${starString}
            </div>
            <span class="main-color">${cardData.duration}</span>
          </div>
        </div>
      </div>
      `;
  
      return card;
  
      // END OF createCard
    }
  
    /**
     * Creates cards and attaches them to the DOM in order to display
     * the Popular Videos section
     * @data  {Arrray} list of data for creating cards
     * @return {undefined}  no return
     */
    function displayPopular(data) {
      let classItem = "";
      for (let i in data) {
        classItem = i == 0 ? "carousel-item active" : "carousel-item";
        let card = createCard(data[i]);
        let $carouselItem = $(`
        <div class="${classItem}">
          <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
            ${card}
            </div>
        </div>
            `);
        $("#popular-items").append($carouselItem);
      }
  
      slideOne("popular");
      // END OF displayPopular
    }
  
    /**
     * Creates cards and attaches them to the DOM in order to display
     * the Latest Videos section
     * @data  {Array} list of data for creating cards
     * @return {undefined}  no return
     */
    function displayLatest(data) {
      let classItem = "";
      for (let i in data) {
        classItem = i == 0 ? "carousel-item active" : "carousel-item";
        let card = createCard(data[i]);
        let $carouselItem = $(`
        <div class="${classItem}">
          <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
            ${card}
            </div>
        </div>
            `);
        $("#latest-videos-items").append($carouselItem);
      }
  
      slideOne("latest-videos");
      // END OF displayLatest
    }
  
    /**
     * Calls the needed functions in order to correctly display
     * the search options in dom and results from API response
     * @data  {data} object containing data from API response
     * @return {string}  parsed title
     */
    function displaySearchAndResults(data) {
      displayResults(data);
      displaySearch(data);
      // END OF displayResults
    }
  
    /**
     * Function to show loader when waiting for API response
     * @active  {boolean} indicates whether loader should be displayed or
     * removed
     * @id  {string} Id of DOM object to attach loader to
     * @return {string}  parsed title
     */
    function displayLoader(active, id) {
      if (active) {
        let $loader = $(`<div class="loader" id="loader-${id}"></div>`);
        $(`#${id}`).append($loader);
      } else {
        let $loader = $(`#loader-${id}`);
        $loader.remove();
      }
  
      // END OF displayLoader
    }
  
    /**
     * Function to make GET request to API
     * @url  {string} url of API endpoint
     * @callback  {function} callback function to be executed
     * and that depends on the section of the web page which is being
     * generated by JS
     * @id  {string} Value needed to display loader
     * @data  {object} object to send in API request
     * @return {string}  parsed title
     */
    function requestData(url, callback, id, data = {}) {
      displayLoader(true, id);
      $.ajax({
        url: url,
        type: "GET",
        data: data,
        headers: { "Content-Type": "application/json" },
        success: function (response) {
          displayLoader(false, id);
          callback(response);
        },
        error: function (error) {
          alert(`Error Getting Data from ${url}`);
        },
      });
      // END OF requestData
    }
  
    // PERFORM DYNAMIC CONTENT REQUESTS ===================================
    let requestsHomepage = [
      {
        url: "https://smileschool-api.hbtn.info/quotes",
        func: displayQuotes,
        id: "carousel-items",
      }
    ];
  
    let $homepage = $("#homepage");
  
    let requestObject;
  
    if (Object.keys($homepage).length) requestObject = requestsHomepage;
  
    for (let r of requestObject) {
      requestData(r.url, r.func, r.id);
    }
  
    // ======================================================================
  
    //   END OF DOCUMENT READY
  });
  