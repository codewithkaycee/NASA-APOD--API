//Add eventlister to the button so it can be clickable to fetch data in the input.
document.querySelector('button').addEventListener('click',getFetch );


function getFetch() {
    const generate = document.querySelector('input').value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=aNozvMy9XtriIw6Rmn80sbhbag1iG3eL72nfiIwU&date=${generate}`;
  
    //get the API endpoint.
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        //display black background image when the media is shown.
        document.querySelector('body').style.backgroundImage = `url('')`;


        // stop the H1 from showing when the button is clicked
        document.querySelector('h1').setAttribute('style', 'display: none;')

        // P element will help display text 
        document.querySelector('p').setAttribute('style', 'display: block;')

        // display title, date and explanation to page
        document.querySelector('h2').innerHTML = data.title
        document.querySelector('h3').innerHTML = data.date
        document.querySelector('p').innerHTML = data.explanation
        
        if (data.copyright !== undefined){
          document.querySelector('h4').innerHTML = `&copy; ${data.copyright}`
        } else (
          document.querySelector('h4').innerHTML = 'No copyright information available'
        )


        // On button press, show image/video, description and title.
        document.querySelector('button').addEventListener('click', function(){
          document.querySelector('img').src = '';
          document.querySelector('iframe').src = '';
        })

        
        // Show image or video depending on type
        if (data.media_type === 'image'){
          document.querySelector('img').setAttribute('style', 'display: block;')
          document.querySelector('img').src = data.hdurl
          document.querySelector('iframe').setAttribute('style', 'display: none;')
        } else if (data.media_type === 'video'){
          document.querySelector('iframe').setAttribute('style', 'display: block;')
          document.querySelector('iframe').src = data.url
          document.querySelector('img').setAttribute('style', 'display: none;')
        }
      })
      .catch(error => console.log(`error ${error}`));
  }



