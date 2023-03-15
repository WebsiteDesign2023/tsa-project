(function() 
 {
  var allQuestions = [{
    question: "What number is the largest?",
    options: ["1", "7", "9", "5"],
    answer: 3
  }, {
    question: "What is 2+5?",
      options: ["6", "5", "10", "7"],
      answer: 4
  }, {
    question: "There are three friends in the rain how many boots do they need if they each have 2 paws?",
    options: ["6", "3", "4","10"],
    answer: 1
  },{
    question: "What is 8-4?",
    options: ["3", "5", "2", "4"],
    answer: 4
  }, {
    question: "Cedar has 3 red balloons and 2 orange balloons, how many in all?",
    options: ["2", "6", "5", "8"],
    answer: 3
  },{
    question: "Which number is the biggest?",
    options: ["4", "11", "6", "1"],
    answer: 2
  },{
    question: "Benjamin has 5 cupcakes and 5 cookies, how many in all?",
    options: ["10", "6", "12", "11"],
    answer: 1
  },{
    question: "The three friends are going to the fair, each ticket costs $2, how much are they going to pay?",
    options: ["5", "6", "4", "3"],
    answer: 2
  },{
    question: "What is 10-2?",
    options: ["2", "5", "6", "8"],
    answer: 4
  },{
    question: "How many paws does Cedar have?",
    options: ["2", "3", "4", "5"],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question Number ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();