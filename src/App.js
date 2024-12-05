import React, { useState } from "react";
import { Container, Typography, Button, Grid, Paper, Box } from "@mui/material";
import InputForm from "./Components/InputForm";
import Predictions from "./Components/Predictions";
import { trainModel, predict } from "./Components/mlUtils";

const App = () => {
  const [data, setData] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleAddData = (formData) => {
    setData([
      ...data,
      {
        input: data.length + 1,
        output: parseFloat(formData.totalStudents),
        ...formData,
      },
    ]);
  };

  const handleTrainModel = async () => {
    const trainedModel = await trainModel(data);
    setModel(trainedModel);

    const newPredictions = data.map((d) => {
      const predictedEnrollment = predict(trainedModel, d.input + 1);
      return {
        courseCode: d.courseCode,
        predictedEnrollment: Math.round(predictedEnrollment),
        predictedSections: Math.ceil(predictedEnrollment / (d.maxStudentsPerSection || 30)),
      };
    });

    setPredictions(newPredictions);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Course Section Forecasting
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Add Enrollment Data
              </Typography>
              <InputForm onAddData={handleAddData} />
              <Button
                onClick={handleTrainModel}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Train Model
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {predictions.length > 0 && (
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Predictions
                </Typography>
                <Predictions predictions={predictions} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
