import chalk from 'chalk'
import { select, input } from '@inquirer/prompts'

//Creates variables for storing the users answer, an array of their answers, their score and counter for timer
let userAnswer
const allAnswers = []
const score = []
let counter = 0

//Selection of quiz questions in an object
const quizQuestions = [
    { question: "1 + 1 = ?", a: "0", b: "1", c: "2", answer: "c"},
    { question: "How many days in a week?", a: "0", b: "7", c: "10", answer: "b"},
    { question: "How many days are in February?", a: "10", b: "28", c:"31", answer: "b"},
    { question: "Who was the first president of the US?", a:"George Washington", b: "Michael Jackson", c: "Jerry Seinfeld", answer: "a"},
    { question: "Night of the Living Dead was released in?", a:"1940", b:"1968", c:"2001", answer: "b"},
]

export async function showMainMenu() {

    //This function will sum up their score inside of the score array and return its total
    function totalScore() {
        const totalScore = score.reduce((acc, value) => {
                return acc + value
            }, 0)
            return totalScore
        }
    
    //This creates the menu for the game
    const action = await select({
        message: "Main Menu for quiz game!",
        choices: [
            { name: "Start Quiz", value: "start" },
            { name: "Quit", value: "quit" },
        ]
    })

    //When choosing start
    switch (action) {
        case "start":

        //Once start is selected, the timer starts
        const time = setInterval(() => { 
        counter++
        }, 1000)

        //Lets user know how much time the quiz shold take and how many questions
        console.log(chalk.yellow("\nWelcome to the start of the quiz! \nYou have 30 seconds to complete 5 questions.\n"))

        //Creates a loop for iterating through questions one at a time in the quizQuestions array
        for(let i = 0; i < quizQuestions.length; i++) {
            
            //If the timer is greater that 30, end game
            if(counter > 30) {
            console.log(chalk.blue("You have run out of time."))
            clearInterval(time)
            break
            }

            //Outputs questions to user
            console.log(chalk.blue(quizQuestions[i].question))
            console.log("A: ", quizQuestions[i].a)
            console.log("B: ", quizQuestions[i].b) 
            console.log("C: ", quizQuestions[i].c)

            //Gets user input
            userAnswer = await input({ message: "\nEnter your answer:" }) 

            //Validates user input to be A, B, or C.  If not, asks for new input until A B or C is chosen
            while(userAnswer != "a" && userAnswer != "b" && userAnswer != "c") {
                userAnswer = await input({ message: "Invalid choice!  Enter A, B, or C:" }) 
            }

            //Answer is pushed to array
            allAnswers.push(userAnswer)

            //If the answer is correct, log it to screen and store score, else log incorrect and store a 0
            if(userAnswer === quizQuestions[i].answer){
                console.log(chalk.green("\nCorrect!\n"))
                score.push(1)
            } else {
                console.log(chalk.red("\nIncorrect!\n"))
                score.push(0)
            }  

        }

        //Once quizQuestion array is finished, stop timer
        clearInterval(time)
        
        //Output score and total time taken, even if overtime
        console.log(chalk.blue("End of quiz!  Your total score is: "), totalScore(),"points\n")
        console.log(chalk.blue("Total time taken is: "), counter, chalk.blue( " seconds!\n"))

        break

        //Quits the game
        case "quit":
            console.log(chalk.blue("\nThanks for taking the quiz.  Goodbye!\n"));
            return;
        }

    await showMainMenu();
}


