const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = '/assets/img/logo.png';
logo.alt = 'Logo';
app.appendChild(logo);

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {
  console.log("Request status: " + request.status);
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      // Append the cards to the container element
      container.appendChild(card);

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.title;
      // Add h1 to card
      card.appendChild(h1);

      // Create a p and set the text content to the films's description
      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300); // Limit up to 300 characters
      p.textContent = `${movie.description}...`; // End with an ellipses
      // Add p to card
      card.appendChild(p);

      const h2_director = document.createElement('h2');
      h2_director.textContent = `Director: ${movie.director}`;
      card.appendChild(h2_director);

      const h2_producer = document.createElement('h2');
      h2_producer.textContent = `Producer: ${movie.producer}`;
      card.appendChild(h2_producer);

      const h2_release_date = document.createElement('h2');
      h2_release_date.textContent = `Release date: ${movie.release_date}`;
      card.appendChild(h2_release_date);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `OH MY GOD, it's not working! ` + request.status;
    app.appendChild(errorMessage);
  }

}

// Send request
request.send();