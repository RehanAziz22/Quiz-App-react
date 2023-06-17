import { Box, Button, Chip, Grid, Typography, Container } from "@mui/material";
import { style } from "@mui/system";
import { useState, useEffect } from "react";
import CardMedia from '@mui/material/CardMedia';
import TimerIcon from '@mui/icons-material/Timer';
import meterImg from './meter.png'
import "./App.css";
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
const ariaLabel = { 'aria-label': 'description' };


function App() {
  const [questions, setQuestions] = useState([
    {
      question: "Html Stands For _____",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },
    {
      question: "Css Stands For ______",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "Js Stands For ______",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "Dom Stands For ______",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "Ram Stands For ______",
      options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correctAns: "Random Acccess Memory",
    },
    {
      question: "Rom Stands For ______",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ]);
  const [indexNumber, setIndexNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState("")

  let givenMinutes = 2;
  let givenSeconds = 59;
  const [seconds, setSeconds] = useState(givenSeconds)
  const [minutes, setMinutes] = useState(givenMinutes)
  let timer;
  let percentage = ((score / questions.length) * 100);

  let getName = (val) => {
    setName(val);
    name == '' ? setDisabled(true) : setDisabled(false)

  }
  // --------------- timer
  useEffect(() => {

    timer = setInterval(() => {

      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000)
    return () => clearInterval(timer)
  })

  let start = () => {
    setSeconds(59)
    setMinutes(2)
    setShowQuestions(true)


  }

  let stop = () => {
    clearInterval(timer);
  }

  useEffect(() => {

    if (minutes === 0 && seconds === 0) {
      stop()
      setResult(true)
    }
  })
  // ---------------------- check Q
  let checkQuestion = (a, b) => {
    if (a == b) {
      setScore(score + 1)
    }
    if (indexNumber + 1 == questions.length) {
      setResult(true)
    }
    else {
      setIndexNumber(indexNumber + 1)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md" sx={{
          minWidth: "250px", width: "90%", background: "white", color: "black", marginTop: "20px",
          boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px, rgb(51 51 51) 0px 0px 0px 3px,rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          borderRadius: "10px;", padding: "10px"
        }}>
          {/* <Typography varient="h1" sx={{ color: "black", fontSize: "30px", fontWeight: "bold" }} >
            QUIZ APP</Typography> */}
          {/* ---------------------start box */}
          {showQuestions ?
            (result ? (<>
              <Box className="meter"
                sx={{ minWidth: "100px", maxWidth: "300px", minHeight: "200px", maxHeight: "200px", margin: " 0px auto" }}
              >
                <CardMedia
                  sx={percentage == 0 ? { rotate: '0deg' } :percentage <= 25 ? { rotate: '45deg' } : percentage <= 50 ? { rotate: '90deg' } : percentage <= 75 ? { rotate: '120deg' } : percentage <= 100 ? { rotate: '165deg' }:{}}
                  component="img"
                  className="arrowimg"
                  height="auto"
                  image="https://thumbs.dreamstime.com/b/red-arrow-isolated-white-background-red-arrow-vector-stock-arrow-icon-110771171.jpg"
                  alt="green iguana"
                />
              </Box>
              <h3>{name.charAt(0).toUpperCase() + name.slice(1)} your percentage is {percentage.toFixed(1)}%</h3></>) :
              <Box className="options-con" sx={{ background: "white", color: "black", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;", margin: "20px 30px", padding: "20px" }}>
                <Box sx={{ padding: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", margin: "2px 0px 10px", padding: 1 }}>
                    <Typography varient="h6" sx={{ color: "black" }} >
                      Questions #{indexNumber + 1}/{questions.length}
                    </Typography>
                    <Typography varient="h6" sx={{ color: "black", display: "flex", alignItems: "center", fontSize: "20px" }} >
                      <TimerIcon sx={{ fontSize: "22px" }} /> <span>{minutes < 10 ? ": 0" + minutes : `: ${minutes}`}:{seconds < 10 ? "0" + seconds : seconds}</span>
                    </Typography>
                  </Box>

                  {/* -------------------------Questions */}
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    {questions[indexNumber].question}
                  </Typography>
                </Box>

                {/* -------------------------Options */}

                <Box>
                  <Grid container sx={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "5px 0px" }}>
                    {questions[indexNumber].options.map((e, i) => (<Grid item key={i} md={12}>
                      <Chip className="chip" sx={{
                        width: "100%", margin: "5px 0px", fontSize: "16px"
                      }} onClick={() => checkQuestion(e, questions[indexNumber].correctAns)} label={e} />
                    </Grid>))}
                  </Grid>
                </Box>
              </Box>)
            // {/* ----------------------Quiz box */}

            :
            (<Container >
              <Box
                sx={{ minWidth: "300px", maxWidth: "500px", minHeight: "auto", maxHeight: "400px", margin: " 0px auto" }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  image="https://img.freepik.com/premium-vector/quiz-comic-pop-art-style_175838-505.jpg?w=2000"
                  alt="green iguana"
                />
              </Box>
              <Typography varient="h5" sx={{
                fontSize: "20px",
                fontFamily: "cursive",
                margin: "8px 0px"
              }} >
                Note : You have "{givenMinutes} min {givenSeconds} seconds" time to attempt the quiz, each question carry equal marks. Click on start button to start Quiz
              </Typography>
              <Box component="form" >
                {/* <TextField required={true} onChange={(e) => getName(e.target.value)} placeholder="Enter Your Name" inputProps={ariaLabel} /> */}
                <Input onChange={(e) => getName(e.target.value)} placeholder="Enter Your Name" inputProps={ariaLabel} required />
                <Button onClick={start} type="submit" disabled={disabled} sx={{ margin: "10px" }} variant="contained">start</Button>
              </Box>
            </Container>)
          }
        </Container>
      </header>
    </div>
  );
}

export default App;
