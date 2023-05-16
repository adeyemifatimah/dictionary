import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  $('#wordMeaning').click(function() {
    const wording = $('#words').val();
    $('#words').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wording}`

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response)
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
    // if(response.meanings.definitions === undefined){
    //   $('showMeaning').text('this is not available')
    // }else{
      $('.showMeaning').text(`The word ${wording} is ${response[0].meanings[1].definitions[0].definition}`);
    
      $('.showMeaning2').text(`Another definition of ${wording} is ${response[0].meanings[0].definitions[0].definition}.`);
      $('.showSynonyms').text(`The word similar to this is ${response[0].meanings[0].synonyms[0]}.`);
      $('.showAntonyms').text(`The word opposite  to this is ${response[0].meanings[0].antonyms[0]}.`);
      $('.showExample').text(`An example of this word is ${response[1].meanings[0].definitions[0].example}.`);
      $('.showExample2').text(`Another example of this word is ${response[0].meanings[1].definitions[0].example}.`);
      $('.showPartofspeech').text(`The word similar to this is ${response[0].meanings[0].partOfSpeech}.`);
      $('.showAudio').html(`the audio word ${wording} is <audio controls><source src="${response[0].phonetics[0].audio}" type="audio/mpeg"></audio>`);


    }
  });
});