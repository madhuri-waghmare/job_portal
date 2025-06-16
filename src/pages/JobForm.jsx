import { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company is required"),
});

function JobForm({ editingJob, setEditingJob }) {
  const initialValues = {
    title: "",
    company: "",
  };

  useEffect(() => {
    console.log(editingJob)
    if (editingJob) {
      initialValues.title = editingJob.title;
      initialValues.company = editingJob.company;
    }
  }, [editingJob]);

  const handleSubmit = async (values, { resetForm }) => {
    if (!auth.currentUser) return alert("Not authorized");

    if (editingJob) {
      await updateDoc(doc(db, "jobs", editingJob.id), values);
      setEditingJob(null);
    } else {
      await addDoc(collection(db, "jobs"), values);
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={JobSchema}
      onSubmit={handleSubmit}
    >
     
      {({ resetForm }) => (
        <div className="container">
           {console.log(editingJob, initialValues)}
        <Form>
          <h2>{editingJob ? "Edit Job" : "Add Job"}</h2>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" className="form-control"   />
            <ErrorMessage name="title" component="div" className="text-danger" />
          </div>
          <div>
            <label htmlFor="company">Company</label>
            <Field type="text" name="company" className="form-control" />
            <ErrorMessage name="company" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">{editingJob ? "Update Job" : "Add Job"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); setEditingJob(null); }}>Cancel</button>
        </Form>
        </div>
      )}
    </Formik>
  );
}

export default JobForm;