import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const InputForm = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    semester: "",
    courseCode: "",
    totalStudents: "",
    maxStudentsPerSection: 30,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData(formData);
    setFormData({
      semester: "",
      courseCode: "",
      totalStudents: "",
      maxStudentsPerSection: 30,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Semester</Form.Label>
        <Form.Control
          type="text"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Course Code</Form.Label>
        <Form.Control
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Total Students Enrolled</Form.Label>
        <Form.Control
          type="number"
          name="totalStudents"
          value={formData.totalStudents}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Max Students per Section</Form.Label>
        <Form.Control
          type="number"
          name="maxStudentsPerSection"
          value={formData.maxStudentsPerSection}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" className="mt-3">Add Data</Button>
    </Form>
  );
};

export default InputForm;
