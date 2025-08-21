<template>
    <div class="bandeja-mesa-partes">
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-item">INICIO</router-link>
        <span class="breadcrumb-item active">BANDEJA DE MESA DE PARTES</span>
      </nav>
      
      <div class="search-form">
        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" v-model="searchForm.tipo">
            <option value="">Elige opción</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div class="form-group">
          <label for="numero">Número</label>
          <input type="text" id="numero" v-model="searchForm.numero">
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" @click="buscar">BUSCAR</button>
          <button class="btn btn-secondary">
            <i class="icon-excel"></i> Excel
          </button>
          <router-link to="/operaciones/formulario" class="btn btn-success">+ NUEVO</router-link>
        </div>
      </div>
  
      <p class="payment-note">
        En caso haya realizado un pago y el trámite sigue "PENDIENTE DE PAGO" puede validar el Pago en 
        <a href="#" class="text-danger">↪</a>
      </p>
  
      <table class="results-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>CODIGO</th>
            <th>MONTO</th>
            <th>PLAZO</th>
            <th>DURACION</th>
            <th>REFERENCIA</th>
            <th>N° DE FOLIOS</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <!-- Table rows would be populated here -->
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const searchForm = ref({
    tipo: '',
    numero: ''
  })
  
  const buscar = () => {
    // Implement search functionality
    console.log('Searching with:', searchForm.value)
  }
  </script>
  
  <style scoped>
  .bandeja-mesa-partes {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .breadcrumb {
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .breadcrumb-item {
    color: #0056b3;
    text-decoration: none;
  }
  
  .breadcrumb-item.active {
    color: #333;
  }
  
  .search-form {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    margin-bottom: 5px;
  }
  
  .form-group select,
  .form-group input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-success {
    background-color: #28a745;
    color: white;
  }
  
  .payment-note {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .text-danger {
    color: #dc3545;
  }
  
  .results-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .results-table th,
  .results-table td {
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: left;
  }
  
  .results-table th {
    background-color: #0056b3;
    color: white;
  }
  </style>