import React, { useState } from "react";
import { Container, Navbar, Button, Card, Row, Col } from "react-bootstrap";
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
        input: data.length + 1, // Example x-axis data
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
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#">Course Section Forecasting</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white text-center">
                Add Enrollment Data
              </Card.Header>
              <Card.Body>
                <InputForm onAddData={handleAddData} />
              </Card.Body>
            </Card>
            <Button
              onClick={handleTrainModel}
              variant="success"
              className="w-100 mt-3"
            >
              Train Model
            </Button>
          </Col>
          <Col md={8}>
            {predictions.length > 0 && (
              <Card className="shadow-sm">
                <Card.Header className="bg-secondary text-white text-center">
                  Predictions
                </Card.Header>
                <Card.Body>
                  <Predictions predictions={predictions} />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
