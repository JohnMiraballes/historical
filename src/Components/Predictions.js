import React from "react";
import { Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Predictions = ({ predictions }) => {
  const courseCodes = predictions.map((prediction) => prediction.courseCode);
  const enrollments = predictions.map((prediction) => prediction.predictedEnrollment);
  const sections = predictions.map((prediction) => prediction.predictedSections);

  const chartData = {
    labels: courseCodes,
    datasets: [
      {
        label: "Predicted Enrollment",
        data: enrollments,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Custom color for predicted enrollment
      },
      {
        label: "Predicted Sections",
        data: sections,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Custom color for predicted sections
      },
    ],
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Predicted Enrollment</th>
            <th>Predicted Sections</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.courseCode}</td>
              <td>{prediction.predictedEnrollment}</td>
              <td>{prediction.predictedSections}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-4">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </>
  );
};

export default Predictions;
