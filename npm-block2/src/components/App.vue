<template>
    <div>
      <h2>Student Records Management</h2>
      <input placeholder="Search by name" v-model="searchName" />
      <table class="student-table">
        <tr v-for="(student, index) in filteredStudents" :key="index">
          <td :class="{ 'highlighted-cell': student.highlighted }">{{ student.name }}</td>
          <td>
            <input type="checkbox" v-model="student.workDone" class="checkbox-input" />
          </td>
          <td>{{ student.group }}</td>
          <td>{{ student.grade }}</td>
          <td><a @click="deleteStudent(student.id)" class="action-link">Delete</a></td>
        </tr>
      </table>
  
      <div class="add-student-form">
        <input placeholder="Full Name" v-model="newStudent.name" />
        <input v-model="newStudent.workDone" type="checkbox" class="checkbox-input" />
        <select v-model="newStudent.group" id="groupSelect" name="group">
          <option value="" disabled selected>Select Group</option>
          <option value="Group A">RPZ 20 1/9</option>
          <option value="Group B">RPZ 20 2/9</option>
        </select>
        <input v-model="newStudent.grade" type="number" placeholder="Grade" />
        <button @click="addStudent" class="add-button">Add Student</button>
      </div>
      <h4 v-for="student in students">{{ student.name }}</h4>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newStudent: {
          id: "",
          name: "",
          group: "",
          grade: "",
          workDone: false,
        },
        students: [],
        searchName: "",
        deleteLink: "",
      };
    },
    computed: {
      filteredStudents: function () {
        const searchNameLower = this.searchName.toLowerCase();
        return this.students.map((student) => ({
          ...student,
          highlighted:
            student.name.toLowerCase().includes(searchNameLower) &&
            searchNameLower.length > 0,
        }));
      },
    },
    mounted: function () {
      axios.get("http://34.82.81.113:3000/students").then((response) => {
        this.students = response.data;
      });
    },
    methods: {
      deleteStudent(id) {
        axios.delete("http://34.82.81.113:3000/students" + id).then(() => {
          this.students = this.students.filter((student) => student.id !== id);
        });
      },
      addStudent() {
        axios.post("http://34.82.81.113:3000/students", this.newStudent).then((response) => {
          this.students.push(response.data);
        });
  
        this.newStudent.name = "";
        this.newStudent.workDone = false;
        this.newStudent.group = "";
        this.newStudent.grade = "";
      },
    },
  };
  </script>
  


<!-- http://34.82.81.113:3000/students -->