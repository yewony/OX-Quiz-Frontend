import React, { useState } from "react";
import { Button, Card, Typography, Container, Box, AppBar, Toolbar, IconButton, Grid, Paper, List, ListItem, ListItemText, Divider, BottomNavigation, BottomNavigationAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const themeColors = {
  primary: "#2D336B",
  background: "#F8F9FA",
  card: "#FFFFFF",
  text: "#333333",
  buttonPrimary: "#A9B5DF",
  buttonSecondary: "#7886C7",
  accent: "#2D336B",
};

const App = () => {
  const [screen, setScreen] = useState("home");
  const [navValue, setNavValue] = useState("home");
  const [savedQuizData, setSavedQuizData] = useState([
    { id: 1, title: "Saved Quiz 1", answer: "O" },
    { id: 2, title: "Saved Quiz 2", answer: "X" }
  ]);
  const [quizHistory, setQuizHistory] = useState([
    { id: 1, title: "Saved Quiz 1", correct: true },
    { id: 2, title: "Saved Quiz 2", correct: false }
  ]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [dialogState, setDialogState] = useState({ open: false, isEdit: false, quiz: { id: null, title: "", answer: "O" } });

  const openAddDialog = () => setDialogState({ open: true, isEdit: false, quiz: { id: null, title: "", answer: "O" } });
  const openEditDialog = (quiz) => setDialogState({ open: true, isEdit: true, quiz });
  const closeDialog = () => setDialogState({ open: false, isEdit: false, quiz: { id: null, title: "", answer: "O" } });

  const saveQuiz = () => {
    if (dialogState.isEdit) {
      setSavedQuizData(
        savedQuizData.map((q) => (q.id === dialogState.quiz.id ? dialogState.quiz : q))
      );
    } else {
      const newQuiz = { ...dialogState.quiz, id: Math.max(0, ...savedQuizData.map((q) => q.id)) + 1 };
      setSavedQuizData([...savedQuizData, newQuiz]);
    }
    closeDialog();
  };

  const deleteQuiz = (id) => {
    setSavedQuizData(savedQuizData.filter((q) => q.id !== id));
  };

  const startQuiz = () => {
    if (savedQuizData.length > 0) {
      const randomIndex = Math.floor(Math.random() * savedQuizData.length);
      setCurrentQuizIndex(randomIndex);
      setShowResult(null);
      setScreen("quiz");
    }
  };

  const checkAnswer = (answer) => {
    const currentQuiz = savedQuizData[currentQuizIndex];
    const isCorrect = answer === currentQuiz.answer;
    setShowResult(isCorrect);
    setQuizHistory([...quizHistory, { id: currentQuiz.id, title: currentQuiz.title, correct: isCorrect }]);
  };

  const nextQuiz = () => {
    const randomIndex = Math.floor(Math.random() * savedQuizData.length);
    setCurrentQuizIndex(randomIndex);
    setShowResult(null);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "20px", backgroundColor: themeColors.background, minHeight: "100vh", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <AppBar position="static" style={{ backgroundColor: themeColors.primary, borderRadius: "16px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setScreen("home")}> <MenuIcon /> </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#fff" }}>퀴즈 앱</Typography>
        </Toolbar>
      </AppBar>

      <Box flexGrow={1}>
        {screen === "home" && (
          <Box mt={4}>
            <Card elevation={5} style={{ padding: "25px", marginBottom: "20px", borderRadius: "16px", backgroundColor: themeColors.card }}>
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: themeColors.buttonPrimary, color: "#fff", fontSize: "18px", padding: "14px", borderRadius: "16px" }}
                onClick={startQuiz}
              >
                퀴즈 시작
              </Button>
            </Card>
          </Box>
        )}

        {screen === "quiz" && currentQuizIndex !== null && (
          <Box mt={4}>
            <Paper elevation={5} style={{ padding: "20px", borderRadius: "16px" }}>
              <Typography variant="h5" fontWeight="bold" color={themeColors.text}>
                {savedQuizData[currentQuizIndex].title}
              </Typography>
              <Box display="flex" justifyContent="center" gap={3} mt={3}>
                <Button variant="contained" color="primary" style={{borderRadius: "16px", padding: "10px"}} onClick={() => checkAnswer("O")}>O</Button>
                <Button variant="contained" color="primary" style={{borderRadius: "16px", padding: "10px"}} onClick={() => checkAnswer("X")}>X</Button>
              </Box>
              {showResult !== null && (
                <Typography variant="h6" color={showResult ? "green" : "red"} mt={2}>
                  {showResult ? "정답입니다!" : "틀렸습니다!"}
                </Typography>
              )}
              {showResult !== null && (
                <Button variant="contained" color="primary" fullWidth onClick={nextQuiz} style={{ borderRadius: "16px", marginTop: "20px" }}>다음 퀴즈</Button>
              )}
            </Paper>
          </Box>
        )}

        {screen === "history" && (
          <Box mt={4}>
            <Paper elevation={5} style={{ padding: "20px", borderRadius: "15px" }}>
              <Typography variant="h5" fontWeight="bold">내 퀴즈</Typography>
              <List>
                {savedQuizData.map((quiz) => (
                  <ListItem
                    key={quiz.id}
                    secondaryAction={
                      <Box>
                        <IconButton color="primary" onClick={() => openEditDialog(quiz)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => deleteQuiz(quiz.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={quiz.title} />
                  </ListItem>
                ))}
              </List>
              <Button
                style={{ backgroundColor: themeColors.buttonPrimary, color: "#fff", fontSize: "14px", padding: "10px", borderRadius: "16px" }}
                variant="contained"
                fullWidth
                onClick={openAddDialog}
                startIcon={<AddIcon />}
              >
                퀴즈 추가
              </Button>
            </Paper>
          </Box>
        )}

        {screen === "settings" && (
          <Box mt={4}>
            <Paper elevation={5} style={{ padding: "20px", borderRadius: "15px" }}>
              <Typography variant="h5" fontWeight="bold">설정</Typography>
              <Typography onClick={() => setScreen("quiz-history")}>내 퀴즈 기록 보기</Typography>
            </Paper>
          </Box>
        )}

        {screen === "quiz-history" && (
          <Box mt={4}>
            <Paper elevation={5} style={{ padding: "20px", borderRadius: "15px" }}>
              <Typography variant="h5" fontWeight="bold">퀴즈 기록</Typography>
              <List>
                {quizHistory.map((record) => (
                  <ListItem key={record.id}>
                    <ListItemText primary={`${record.title}: ${record.correct ? "정답" : "오답"}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Box>

      <Dialog open={dialogState.open} onClose={closeDialog}>
        <DialogTitle>{dialogState.isEdit ? "퀴즈 수정" : "퀴즈 추가"}</DialogTitle>
        <DialogContent>
          <DialogContentText>퀴즈 제목을 입력하고 정답을 선택하세요.</DialogContentText>
          <TextField
            fullWidth
            label="퀴즈 제목"
            value={dialogState.quiz.title}
            onChange={(e) => setDialogState((prev) => ({ ...prev, quiz: { ...prev.quiz, title: e.target.value } }))}
          />
          <RadioGroup
            row
            value={dialogState.quiz.answer}
            onChange={(e) => setDialogState((prev) => ({ ...prev, quiz: { ...prev.quiz, answer: e.target.value } }))}
          >
            <FormControlLabel value="O" control={<Radio />} label="O" />
            <FormControlLabel value="X" control={<Radio />} label="X" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">취소</Button>
          <Button onClick={saveQuiz} color="primary">저장</Button>
        </DialogActions>
      </Dialog>

      <BottomNavigation
        value={navValue}
        onChange={(event, newValue) => {
          setNavValue(newValue);
          setScreen(newValue);
        }}
        showLabels
        sx={{
          backgroundColor: themeColors.background,
          borderTop: "1px solid #ddd",
          '& .Mui-selected': {
            color: themeColors.primary
          },
          '& .MuiBottomNavigationAction-root': {
            minWidth: "auto",
            transition: "none",
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: "12px",
            transition: "none",
          },
          '& .MuiSvgIcon-root': {
            transition: "none",
          }
        }}
      >
        <BottomNavigationAction label="랭킹(준비중)" icon={<LeaderboardIcon />} disabled />
        <BottomNavigationAction label="내 퀴즈" icon={<FavoriteIcon />} onClick={() => setScreen("history")} />
        <BottomNavigationAction label="홈" icon={<HomeIcon />} onClick={() => setScreen("home")} />
        <BottomNavigationAction label="카테고리" icon={<CategoryIcon />} onClick={() => setScreen("categories")} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon />} onClick={() => setScreen("settings")} />
      </BottomNavigation>
    </Container>
  );
};

export default App;
