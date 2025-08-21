<template>
  <div class="row pt-4 pb-3 border-top">
    <div class="col-lg-12">
      <div class="container-fluid">
          <!-- -------------------------------------------- -->
          <!-- Contenido del tab REGISTRAR -->
          <!-- -------------------------------------------- -->
           <!-- {{ documento }} -->
           <div class="row">
            <div class="col-md-12">
                <div class="alert alert-warning">
                  <h5 class="my-0 py-0">
                    <i class="ph-duotone ph-pencil"></i>
                    Editar Expediente N°:   {{ documento.numerodocumento }} 
                    <span v-if="DocumentoRegistrado.pase_estadopase==='Iniciado'" class="badge bg-orange-800">Pendiente de Envío</span>
                    <span v-if="DocumentoRegistrado.pase_estadopase==='Enviado'" class="badge bg-danger">Pendiente de Recepción</span>
                  </h5>
                </div>
            </div>
           </div>
          <div class="row pb-1" >
            <div class="d-flex" style="z-index: 2"> 
              <span class="f-14 f-w-500 mt-1  px-3 text-white bg-blue-700
                      py-1 rounded-1">1. Datos del Solicitante:</span>
            </div>
            <div class="col-12 p-3 card rounded-1 shadow-sm mb-1" style="margin-top:-12px">   
              <!-- -------------------------------------------- -->                          
              <div class="mb-0">
                <!-- Formulario Búsqueda -->
                <div class="row g-1">
                  <div class="col-12">
                    <div class="mb-1">
                        <div class="row g-1">
                          <div class="col-md-2">
                            <label class="form-label mb-0 f-13">Tipo de Documento</label>
                            <select v-model="buscar_tipodoc" class="form-select">
                              <option >Seleccione</option>
                              <option value="DNI">DNI</option>
                              <option value="RUC">RUC</option>
                              <option value="CE">CE</option>
                              <option value="Pasaporte">Pasaporte</option>
                            </select>
                          </div>
                          <div class="col-md-2">
                            <label class="form-label mb-0 f-13">Número de documento</label>
                            <input type="text" v-model="buscar_numdoc" @change="Buscar_Administrado_x_DNI" class="form-control" placeholder="">
                          </div>
                          
                          <div class="col-md-1 align-content-end">
                            <!-- <label class="form-label mb-0 f-13">Acción</label> -->
                            <div class="btn btn-secondary btn-sm rounded-1 w-100" @click="openModal_BuscarAdministrado">
                                <i class="fa fa-search"></i> 
                            </div>
                          </div>
                          <div class="col-md-1 align-content-end">
                            
                            <div class="btn btn-success btn-sm rounded-1 w-100 d-flex justify-content-center" @click="openModal_registrarAdministrado">
                              <i class="fa fa-plus p-r-5 align-content-center"></i>Nuevo 
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                
                <div class="row pt-2">
                  <div class="col-md-12">
                    <table v-if="AdministradoExistente.numdocumento!==''"  class="table table-sm mb-1" id="pc-dt-simple">
                      <thead>
                        <tr >
                          <th style="width:10%; font-size: 11px;" class="py-1 b-light f-w-600">Documento</th>
                          <th style="width:15%; font-size: 11px;" class="py-1 b-light f-w-600">Nombres y Apellidos</th>
                          <th style="width:10%; font-size: 11px;" class="py-1 b-light f-w-600">Celular</th>
                          <th style="width:15%; font-size: 11px;" class="py-1 b-light f-w-600">Correo</th>
                          <th style="width:5%; font-size: 11px;" class="py-1 b-light"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td class="py-1">{{ AdministradoExistente.tipodocumento }} - {{ AdministradoExistente.numdocumento }}</td>
                          <td v-if="AdministradoExistente.tipodocumento==='DNI'" class="py-1">{{ AdministradoExistente.nombre }} {{ AdministradoExistente.apellidopat }} {{ AdministradoExistente.apellidomat }}</td>
                          <td v-else class="py-1">{{ AdministradoExistente.razonsocial }}</td>
                          <td class="py-1">{{ AdministradoExistente.celular }}</td>
                          <td class="py-1">{{ AdministradoExistente.correo }} </td>
                          <td class="py-1 justify-content-center">
                            <a href="#" @click="reset_formAdministrado" class="avtar avtar-xs btn btn-danger m-auto">
                              <i class="ti ti-trash f-20 "></i>
                            </a>
                            <a href="#" @click="Editar_administrado(AdministradoExistente)" class="avtar avtar-xs btn btn-warning m-auto">
                              <i class="ti ti-pencil f-20 "></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else class="alert alert-warning">
                      <i class="ph-duotone ph-warning align-content-center"></i> Sin Asignar</div>
                  </div>
                </div>
              </div>
              <!-- -------------------------------------------- -->
            </div>    
          </div>
          <!-- -------------------------------------------- -->
          <!-- Contenido del tab REGISTRAR -->
          <!-- -------------------------------------------- -->
          
          <div class="row">
            <div class="d-flex" style="z-index: 2"> 
              <span class="f-14 f-w-500 mt-1  px-3 text-white bg-blue-800
                      py-1 rounded-1">2. Datos del Expediente:</span>
            </div>
            <div class="col-12 p-3 card rounded-2" style="margin-top:-12px; ">   
              <!-- -------------------------------------------- -->                          
              <div class="mb-1">
                <div class="row g-1 mt-1">
                  <div class="col-md-2">
                      <label class="form-label f-13">Tipode de Trámite</label>
                      <div class="d-flex mb-1">
                              <input  v-model="documento.estupa"
                                      class="btn-check" checked type="radio" name="group5" :value="false" id="customCheckinlh3">
                              <label class=" btn btn-outline-secondary b-gray py-1 px-2 m-r-5 w-100 f-w-600" for="customCheckinlh3"> Normal </label>
        
                              <input  v-model="documento.estupa"
                                      class="btn-check"  type="radio" name="group5" :value="true" id="customCheckinlh1">
                              <label class=" btn btn-outline-secondary b-gray px-2 py-1 m-r-5 w-100 f-w-600" for="customCheckinlh1"> TUPA </label>
                      </div>
                      <ErrorMessage :error="errorsdocumento.estupa" />
                  </div>
                  <div class="col-md-4">
                      <label class="form-label f-13">Tipo de Documento</label>
                      <multiselect 
                              v-model="frm_tipodocumento"
                              @update:modelValue="on_changeTipoDocumento" 
                              class="f-6"
                              label="nombre"
                              track-by="id"
                              placeholder="Seleccionar"
                              selectLabel=""
                              deselectLabel=""
                              selectedLabel=""
                              :options="StoreList.ListaTipoDocumentos">
                      </multiselect>
                      <ErrorMessage :error="errorsdocumento.tipodocumento_id" />
                  </div>
                  <div class="col-md-2">
                      <label class="form-label f-13">Número Folios</label>
                      <div class="btn-group btn-group-sm mb-0 border" role="group">
                        <button type="button" @click="decreaseValue()" class="btn btn-link-secondary"><i class="ti ti-minus f-w-600"></i></button>
                        <input 
                            class="text-center border-0 m-0 form-control rounded-0 shadow-none" 
                            type="number" 
                            v-model="documento.folios" 
                            min="1" 
                        >
                        <button type="button" @click="increaseValue()" class="btn btn-link-secondary"><i class="ti ti-plus f-w-600"></i></button>
                      </div>
                      <ErrorMessage :error="errorsdocumento.folios" />
                  </div> 
                  <div class="col-md-2">
                      <label class="form-label f-13">Prioridad</label>
                      <div class="d-flex mb-1">
                              <input  v-model="documento.prioridad"
                                      class="btn-check" checked type="radio" name="radioprioridad" value="Normal" id="lbl_radioprioridad1">
                              <label class=" btn btn-outline-secondary b-gray py-1 px-2 m-r-5 w-100 f-w-600" for="lbl_radioprioridad1"> Normal </label>
        
                              <input  v-model="documento.prioridad"
                                      class="btn-check"  type="radio" name="radioprioridad" value="Urgente" id="lbl_radioprioridad2">
                              <label class=" btn btn-outline-danger b-gray px-2 py-1 m-r-5 w-100 f-w-600" for="lbl_radioprioridad2"> Urgente </label>
                      </div>
                      <ErrorMessage :error="errorsdocumento.estupa" />
                  </div>
                  <div class="col-md-2" v-if="documento.prioridad==='Urgente'">
                      <label class="form-label f-13">Fecha Vencimiento</label>
                      <input type="date" v-model="documento.fechavencimiento" class="form-control" >
                  </div> 
                </div>
              </div>

              <!-- -------------------------------------------- -->                          
              <!-- -------------------------------------------- -->                          
              <div class="mb-1">
                <div class="row g-1">
                  <div class="col-md-6">
                    
                      <label class="form-label f-13">Cabecera:</label>
                      <input maxlength="225" type="text" v-model="documento.cabecera" class="form-control" >
                      <ErrorMessage :error="errorsdocumento.cabecera" />

                      <!-- // -------------------------------- -->
                      <label class="form-label f-13">Asunto:</label>
                      <input maxlength="225" type="text" v-model="documento.asunto" class="form-control" >
                      <ErrorMessage :error="errorsdocumento.asunto" />
                      <!-- // ---------------------------------- -->
                      <label class="form-label f-13">Observación:</label>
                      <textarea type="text" v-model="documento.descripcion" class="form-control" rows="3"></textarea>
                      <ErrorMessage :error="errorsdocumento.descripcion" />

                      
                      
                      

                  </div>
                  <div class="col-md-6">

                    <!-- //---------------------------------- -->
                      <label class="form-label f-13">Oficina Destino:</label>
                      <div class="d-flex">
                        <multiselect v-model="Buzon_destino"
                                    @update:modelValue="on_change_destino"
                                    class="f-6"
                                    label="destino"
                                    track-by="id"
                                    placeholder="Seleccionar"
                                    selectLabel=""
                                    deselectLabel=""
                                    selectedLabel=""
                                    :options="StoreList.ListaDestinos">
                        </multiselect>
                      </div>
                      <ErrorMessage :error="errorsdocumento.buzondestino_id" />

                      
                    <!-- ------------- -->
                    <label class="form-label f-13">Adjuntar Archivo:</label>
                    
                    <!-- -*-*-*-*-*-*-*-*- -->
                    <div class="px-0 rounded-1 mt-1">
                      <div v-if="Array_archivos.length===0" @click="openModal_Adjunto"
                          class="alert alert-secondary b-gray text-secondary  w-100 hei-80 flex-column justify-content-center d-flex handpointer">
                          <i class="ph-duotone ph-file-pdf f-24 m-auto "></i>
                          <p class="m-auto">Agregar un documento Adjunto</p>
                      </div> 
                      <div v-else v-for="Item in Array_archivos" :key="Item.id" class="d-flex px-3 alert alert-secondary" style="margin-top: 1px; margin-bottom: 1px;">
                          <div class="w-100 align-content-center">
                            <a :href="Item.url" class="text-secondary f-w-500 f-13" target="_blank">
                              <i class="fa fa-chevron-right"></i>  {{ Item.nombrefile }}
                            </a>
                          </div>
                          <div class="flex-shrink-1">
                              <div class="btn f-4 btn-outline-danger  btn-sm py-1" @click="Remove_Adjunto(Item.id)" >
                                  <i class="fa fa-trash" style="font-size:12px"></i> 
                              </div> 
                          </div>
                      </div>
                    </div>
                    <!-- -*-*-*-*-*-*-*-*- -->
                      
                    <!-- ------------- -->
                  </div>
                </div>
              </div>
              <!-- -------------------------------------------- -->                          
              <!-- -------------------------------------------- -->

              
              <div v-if="StoreList.ListaRequisitosAsignados.length>0 && documento.estupa">
                <label class="form-label f-13">Requisitos Obligatorios:</label>
                <div class="alert alert-secondary  bg-opacity-10" >
                  <table  class="table table-hover table-xs pb-0 mb-0 f-13" id="pc-dt-simple">
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="75%">Requisito</th>
                            <th width="10%" class="text-center">*</th>
                            <th width="10%" class="text-center">Formato</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(reqAsignado, index) in StoreList.ListaRequisitosAsignados" :key="reqAsignado.idreq">
                          <td class="py-0">{{ index+1 }}</td>
                          <td class="py-0">{{ reqAsignado.nombrerequisito }}</td>
                          <td class="py-0">{{ reqAsignado.esobligatorio ? "* Obligatorio" : "-" }}</td>
                          <td class="text-center py-0">
                            <a v-if="reqAsignado.formatopdf!==''"
                                :href="HOST_URL + reqAsignado.formatopdf" target="_blank">
                              <img src="../../assets/images/pdf.png" class="img-fluid wid-25 p-0">
                            </a>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- ------------------- -->
                </div>
              </div>
              <!-- -------------------------------------------- -->                          
              <!-- -------------------------------------------- -->
              
            </div>    
            <!-- -------------------------------------------- -->
            <div   class="col-lg-12 text-center" >
                <button :disabled="isSending" @click="ActualizarDocumento" class="btn btn-lg btn-success m-auto">
                    <i class="ph-duotone ph-check-fat p-r-5"></i>Actualizar Trámite</button>

                <button @click="generarPDF(DocumentoRegistrado)"  class="btn btn-primary btn-lg mx-1">
                  <i class="ph-duotone ph-printer px-1"></i>Imprimir</button>

                <!-- <button @click="DerivarExpediente" class="btn btn-lg btn-warning bg-yellow-700 m-auto">
                  <i class="ph-duotone ph-paper-plane-right p-r-5"></i>Derivar documento</button> -->
              </div>     
              <!-- -------------------------------------------- -->
          </div>

      
          
      </div>
    </div>
  </div>



  <!-- ------------------------------------------- -->
  <!-- ----- MODAL REGISTRAR ADMINISTRADO  ------- -->
  <!-- ------------------------------------------- -->
  <div class="modal modal-lg fade" id="add_ReferenciaModal" tabindex="-1" aria-labelledby="add_ReferenciaModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header py-2">
              <h5 class="modal-title py-0" id="add_ReferenciaModalLabel">
                <i class="fa fa-plus p-r-15"></i>Registrar Administrado
              </h5>
              <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body py-1">
            <!-- ------------------------ -->
             <!-- Form -->
             <div class="row g-1">
                  <div class="col-md-12">
                      <div class="mb-1">
                        <div class="row g-1">
                          <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Tipo de Documento</label>
                            <select v-model="persona.tipodocumento" @change="on_changeTipoDoc" class="form-select">
                              <option >Seleccione</option>
                              <option value="DNI">DNI</option>
                              <option value="RUC">RUC</option>
                              <option value="CE">CE</option>
                              <option value="Pasaporte">Pasaporte</option>
                            </select>
                          </div>
                          <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Número de documento</label>
                            <input type="text" v-model="persona.numdocumento" @change="on_numDocChange" class="form-control" placeholder="">
                          </div>
                        </div>
                      </div>
                      <!-- ---------------------------------------- -->
                      <div class="mb-1" v-if="persona.tipodocumento !== 'RUC'">
                        <div class="row g-1">
                          <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Nombres</label>
                            <input type="text" :disabled="isDisabled" v-model="persona.nombre" class="form-control" />
                          </div>
                          <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Apellido Paterno</label>
                            <input type="text" :disabled="isDisabled" v-model="persona.apellidopat" class="form-control" />
                          </div>
                          <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Apellido Materno</label>
                            <input type="text" :disabled="isDisabled" v-model="persona.apellidomat" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <!-- -------------------------------------------- -->
                      <div class="mb-1" v-if="persona.tipodocumento==='RUC'">
                        <label class="form-label mb-0 f-13">Razón Social</label>
                        <input type="text"  :disabled="isDisabled"  v-model="persona.razonsocial" class="form-control" >
                      </div>
                      <!-- ---------------------------------------------- -->
                  </div>
                  <div class="col-md-12">
                    <!-- -------------------------------------------- -->
                    <div class="row g-1">
                        <div class="col-md-4">
                            <label class="form-label mb-0 f-13">Celular</label>
                            <input type="text" v-model="persona.celular" class="form-control" placeholder="">
                            
                        </div>
                        <div class="col-md-8">
                            <label class="form-label mb-0 f-13">Correo</label>
                            <input type="email" v-model="persona.correo" class="form-control" placeholder="">
                            
                        </div>
                    </div>
                    <!-- -------------------------------------------- -->
                    <div class="mb-1">
                      <label class="form-label mb-0 f-13">Dirección:</label>
                      <input type="text mt-0" v-model="persona.direccion" class="form-control" >
                    </div>
                    <!-- -------------------------------------------- -->
                  </div>
                </div>
             <!-- ----------------------- -->
            <!-- -------------------------------------------- -->                          
            <div class="row">
              <div class="col-lg-8 ">
                <div class="row">
                  <div class="col-md-4">
                    <ErrorMessage class="text-danger" :error="errors.tipodocumento" />
                    <ErrorMessage :error="errors.numdocumento" />
                    <ErrorMessage :error="errors.celular" />
                    <ErrorMessage :error="errors.correo" />
                    <ErrorMessage :error="errors.direccion" />
                  </div>
                  <div class="col-md-4">
                    <ErrorMessage :error="errors.nombre" />
                    <ErrorMessage :error="errors.apellidopat" />
                    <ErrorMessage :error="errors.apellidomat" />
                    <ErrorMessage :error="errors.razonsocial" />
                  </div>
                </div>
              </div>
            </div>   
            <!-- -------------------------------------------- -->
          </div>
          <div class="modal-footer py-1">
            
              <button type="submit" class="btn btn-success" @click="RegistrarPersona">
                <i class="p-r-5 ph-duotone ph-check-circle"></i>Registrar</button>
              <button  type="submit" class="btn btn-success" @click="ActualizarPersona">
                  <i class="p-r-5 ph-duotone ph-check-circle"></i>Actualizar</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                <i class="p-r-5 ph-duotone ph-x-circle"></i>Cancelar</button>
          </div>
          
      </div>
    </div>
  </div>
  <!-- ------------------------------------------- -->
  <!-- ----- MODAL BUSCAR ADMINISTRADO  ------- -->
  <!-- ------------------------------------------- -->
  <div class="modal modal-lg fade" id="Buscar_AdministradoModal" tabindex="-1" aria-labelledby="Buscar_AdministradoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header py-2">
              <h5 class="modal-title py-0" id="Buscar_AdministradoModalLabel">
                <i class="fa fa-search p-r-15"></i>Buscar Administrado
              </h5>
              <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div class="modal-body py-1">
            <!-- ------------------------ -->
           
            <div class="row g-1">
              <div class="col-md-5 d-flex ">
                <label class="form-label mb-0 f-13 align-content-center p-r-5">Nombre</label>
                <input type="text" v-model="buscar_nombre" @change="Buscar_Administrado_x_Nombre" class="form-control" placeholder="">
              </div>
              <div class="col-md-5 d-flex">
                <label class="form-label mb-0 f-13 align-content-center p-r-5">Apellido</label>
                <input type="text" v-model="buscar_apellido" @change="Buscar_Administrado_x_Nombre" class="form-control" placeholder="">
              </div>
              <div class="col-md-2 align-content-end">
                <!-- <label class="form-label mb-0 f-13">Acción</label> -->
                <div class="btn btn-secondary btn-sm rounded-1 w-100" @click="Buscar_Administrado_x_Nombre">
                    <i class="fa fa-search"></i> Buscar
                </div>
              </div>
              
            </div>
            <hr class="my-1">

            <div v-if="buscar_msjerror" class="alert alert-danger my-1">
              <i class="fa fa-exclamation-triangle p-r-5"></i>Debe Ingresar un nombre ó Apellido
            </div>
            
            <!-- TABLE --- -->            
            <DataTable v-if="Lista_Administrados.length>0"
              :headers="headers_tablaadministrados"
              :items="Lista_Administrados"
              :filterKeys="['nombre', 'apellidopat', 'apellidomat', 'numdocumento']"
              :clasehead="'bg-info-100 py-0'"
            >
              <template #default="{ item, index, currentPage, itemsPerPage }">
                <tr>
                  <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                  <td class="py-0">{{ item.nombre }}</td>
                  <td class="py-0">{{ item.apellidopat }}</td>
                  <td class="py-0">{{ item.apellidomat }}</td>
                  <td class="py-0">{{ item.numdocumento }}</td>
                  <td class="py-0">
                    <!-- ------------------ -->
                    <button type="button" class="btn btn-success btn-sm " @click="add_registrado(item)">
                      <i class="fa fa-plus"></i></button>
                    <!-- ------------------ -->
                  </td>
                </tr>
              </template>
            </DataTable>
            <div v-else class="alert alert-info mt-1 ">
              <i class="fa fa-exclamation-triangle p-r-5"></i>No se encontraron registros con estas coincidencias
            </div>

            
            <!-- -------------------------------------------- -->
          </div>
          <div class="modal-footer ">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                <i class="p-r-5 ph-duotone ph-x-circle"></i>Cancelar</button>
          </div>
      </div>
    </div>
  </div>

  <!-- ------------------------------------------- -->
  <!-- ----- MODAL 1 ------- -->
  <!-- ------------------------------------------- -->
  <div class="modal modal-lg fade" id="add_adjuntoModal" tabindex="-1" aria-labelledby="add_adjuntoModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header py-2">
              <h5 class="modal-title py-0" id="add_adjuntoModalLabel">
                <i class="ph-duotone ph-paperclip p-r-15"></i>Agregar Adjunto
              </h5>
              <button :disabled="isUploading" type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
                <!--  ------ -->
               
                <label class="form-label text-gray-600 f-13  mb-0">Archivo</label>
                <div class="file-input-wrapper b-gray rounded-1 py-3 text-center w-100">                    
                      <input type="file" @change="onFileSelected"  @dragover.prevent @drop.prevent="handleDropFile" accept=".pdf" class="file-input">
                      <div class="p-1">
                        <i class="ph-duotone ph-file-pdf f-30"></i>
                        <div v-if="file_documento" class="uploaded-files">
                            <p>{{ file_documento.name }}</p>
                        </div>
                        <p v-else class="f-14 f-w-600">Arraste ó Seleccione un archivo</p>                      
                      </div>
                </div>
                <div id="loadingfile" style="position: relative; height: 4px;"></div>
                <button :disabled="isUploading" @click="SubirArchivo" class="btn w-100  btn-success mt-0 m-auto mt-1">
                  <i class="ph-duotone ph-check-circle p-r-5"></i>Agregar</button>               
                <!-- Fin:  ------ -->
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {  nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import ErrorMessage from '../../components/ErrorMessage.vue';
import { Destino, initializeUsuarioLog, Oficina, PersonaRegistro, Tramite, UsuarioLog } from '../../types/interfaces';
import { get_datosRUC,get_datosDNI } from '../../services/apisunat';
import { add_administrado, get_administrado_id, get_administrado_numdoc, get_busqueda_administrados, registrar_UsarioCasilla, upd_administrado } from '../../services/AdministradoService';
import Alerta from '../../utils/alertas';
import Notif from '../../utils/notificaciones';
import NProgress from 'nprogress';
import { add_documentoExterno, add_documentoMesaPartes, derivar_documento_mesapartes, get_documentoCompleto_externo, get_documentoCompleto_primerpase, subir_adjunto, upd_documentoMesaPartes } from '../../services/DocumentoServices';
import { HOST_URL } from '../../config';
import Multiselect from 'vue-multiselect'
import DataTable from '../../components/table/DataTable.vue';  

import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import { Administrado, initializeAdministrado } from '../../interfaces/administrado.interface';
import { Adjunto, DocumentoExterno, DocumentoFull,  initialize_Adjunto,  initialize_CrearDocumentoExterno, initialize_CrearDocumentoExternoErrores, initialize_DocumentoFull, initialize_tipodocumento, tipodocumento } from '../../interfaces/documento.interface';
import { Modal } from 'bootstrap';
import { pdf_documento } from '../../composables/generarPDF_nuevodocumento'
import QRCode from 'qrcode';
import escudomunicipal from "@/assets/logomuni26.png"
import IMGunidos from "@/assets/unidos_isotipo.png"
import jsPDF from "jspdf";
import { FormatFecha } from '../../utils/FormatFecha';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { useRoute, useRouter } from 'vue-router';


const isDarkTheme = ref(false);

interface distritoload {
  id: string;
  nombre: string;
}

interface tipodocumentoLoad {
  id: string;
  nombre: string;
}


export default {
    components: {
      ErrorMessage,
      Multiselect,
      DataTable
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const iddocumento = Number(route.params.iddocumento);

        const authStore = usarAuthStore();
        const Usuario = ref<UsuarioLog>(initializeUsuarioLog());

        const { generarPDF } = pdf_documento();
        
        Usuario.value = authStore.usuario_Logueado;
        const ArchivoTemporal = ref<Adjunto>(initialize_Adjunto());
        const Array_archivos = ref<Adjunto[]>([]);
        const esexistente = ref(false);
        const isUploading = ref(false); 
        
        const Departamentos = ref("");
        const Provincias = ref("");
        const Distritos = ref<distritoload[]>([]);

        const buscar_tipodoc  = ref("");
        const buscar_numdoc   = ref("");
        const buscar_nombre   = ref("");
        const buscar_apellido = ref("");
        const buscar_msjerror = ref(false);
        
        const StoreList = ListasStore();
        const FunList = Listas();

        const TramiteActual = ref<Tramite>();
        const Buzon_destino = ref<Destino>();
        const isDisabled = ref(false);
        const isSending = ref(false);
        const secuencia = ref(1);

        onMounted(async () => {
          isDarkTheme.value = checkIfDarkTheme();
          await FunList.load_TiposDocumentos();
          await FunList.load_TramitesTupa();
          await FunList.load_Destinos();
          await CargarDocumentoID();
        });

        const checkIfDarkTheme = () => {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        };  

        
        // --------------
        const Lista_Administrados = ref<Administrado[]>([]);

        const AdministradoExistente = ref<Administrado>(initializeAdministrado());
        const persona = ref<Administrado>(initializeAdministrado());
        const errors = ref<any>(initializeAdministrado());

        const DocumentoRegistrado = ref<DocumentoFull>(initialize_DocumentoFull());

        const frm_tipodocumento = ref<tipodocumento>(initialize_tipodocumento()); 

        // -----------------------------------------------
        const on_changeTipoDocumento = () =>{
          if (frm_tipodocumento.value){
            documento.value.tipodocumento_id= frm_tipodocumento.value.id;
          }
        }

        // -------------------------
        const ubigeoSelected = ref({
            departamento: '',
            provincia: '',
            distrito: ''   
        });
        
         
        // VALIDACIONES ---------------------------------------------------------
        // ----------------------------------------------------------------------
        const validateField = (field: string, value: any) => {
          console.log(`Validating field: ${field}, value: ${value}`);
          switch (field) {
            case 'tipodocumento':
              errors.value[field] = value ? '' : 'Seleccione tipo de documento';
              break;
            case 'numdocumento':
              errors.value[field] = value ? '' : 'Nº de documento obligatorio';
              break;
            case 'nombre':
              errors.value.nombre = persona.value.tipodocumento!=="RUC" && !value ? '* Nombre obligatorio' : '';
              break;
            case 'apellidopat':
              errors.value.apellidopat = persona.value.tipodocumento!=="RUC" && !value ? '* Apellido Paterno obligatorio' : '';
              break;
            case 'apellidomat':
              errors.value.apellidomat = persona.value.tipodocumento!=="RUC" && !value ? '* Apellido Materno obligatorio' : '';
              break;
            case 'razonsocial':
              errors.value.razonsocial = persona.value.tipodocumento==="RUC" && !value ? '* Razón Social obligatoria' : '';
              break;
            case 'celular':
              errors.value[field] = value ? '' : 'Celular obligatorio';
              break;  
            case 'correo':
              errors.value[field] = value && /\S+@\S+\.\S+/.test(value) ? '' : 'Correo Obligatorio';
              break;
            default:
              console.log("Field not handled explicitly:", field);
          }
        };
        watch(() => persona.value.tipodocumento, (newVal)     => validateField('tipodocumento', newVal));
        watch(() => persona.value.numdocumento, (newVal)      => validateField('numdocumento', newVal));
        if(persona.value.tipodocumento==="RUC"){
            watch(() => persona.value.razonsocial, (newVal)   => validateField('razonsocial', newVal));
        }else{
            watch(() => persona.value.nombre, (newVal)        => validateField('nombre', newVal));
            watch(() => persona.value.apellidopat, (newVal)   => validateField('apellidopat', newVal));
            watch(() => persona.value.apellidomat, (newVal)   => validateField('apellidomat', newVal));
        }
        watch(() => persona.value.celular, (newVal)           => validateField('celular', newVal));
        watch(() => persona.value.correo, (newVal)            => validateField('correo', newVal));
        
        // REGISTRO DE NUEVO ADMINISTRADO ---------------
        // ---Validación de DNI -------------------------
        const on_numDocChange = async () => {
          try {
            NProgress.start();
            if (persona.value.numdocumento.length == 8) {
              const data = await get_datosDNI(persona.value.numdocumento);
              persona.value.nombre      =   `${data.nombres}`;
              persona.value.apellidopat =   `${data.apellidoPaterno}`;
              persona.value.apellidomat =   `${data.apellidoMaterno}`;
            }else if(persona.value.numdocumento.length == 11) {
                const data = await get_datosRUC(persona.value.numdocumento);
                persona.value.razonsocial = data.razonSocial;
                persona.value.direccion = data.direccion;
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            Alerta.Error('Error', 'No se pudo obtener los datos.');
          } finally {
            NProgress.done();
          }
        };

        // REGISTRO 
        const add_registrado = (adm: Administrado) => {
          AdministradoExistente.value = adm;
          documento.value.administrado_id = parseInt(adm.id);
          closeModal_BuscarAdministrado();
        }

        // ---Validación de DNI ------------------------------------------------------------
     
        const Buscar_Administrado_x_DNI = async () => {
          persona.value= initializeAdministrado();
          try {
            
            if (buscar_numdoc.value.length == 8 || buscar_numdoc.value.length == 11) {
              NProgress.start();
              const RespuestaJSON = await get_administrado_numdoc(buscar_numdoc.value);
              if (RespuestaJSON.success) {
                  AdministradoExistente.value = RespuestaJSON.data;
                  documento.value.administrado_id = parseInt(AdministradoExistente.value.id);
                  Notif.SuccessTop("Datos cargados correctamente");
                  secuencia.value  = 2;
              }else{
                  documento.value.administrado_id =  0;
              }    
            }  
          } catch (error) {
            console.error('Error fetching data:', error);
            Alerta.Error('Error', 'No se pudo obtener los datos.');
          } finally {
            NProgress.done();
          }
        };

        

        // ---Buscar Administrado ------------------------------------------------------------
        const Buscar_Administrado_x_Nombre = async () => {
          if(buscar_nombre.value==="" && buscar_apellido.value===""){
            buscar_msjerror.value=true;
            return;
          }else{
            buscar_msjerror.value=false;
          }
          
          NProgress.start();
          try {
              const RespuestaJSON = await get_busqueda_administrados(buscar_nombre.value,buscar_apellido.value);
              if (RespuestaJSON.success) {
                Lista_Administrados.value = RespuestaJSON.data;
              }else{
                Lista_Administrados.value = [];
              }
          } catch (error) {
              console.error('Error al cargar las licencias:', error);
          } finally {
              NProgress.done();
          }
        };

        //
        // FILE -----------------------------------------------------------------------------
        const file_documento = ref<File | null>(null);
        const fileInputRef = ref<HTMLInputElement | null>(null);
        
        const onFileSelected = (event: Event) => {
          const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
          if (selectedFile) {
            file_documento.value = selectedFile;
            SubirArchivo();
          }
        };
        const handleDropFile = (event: DragEvent) => {
            event.preventDefault();
            if (event.dataTransfer && event.dataTransfer.files.length > 0) {
              file_documento.value = event.dataTransfer.files[0];
              SubirArchivo();
            }
        };
        
        const SubirArchivo = async () => {
            if(ArchivoTemporal.value.nombrefile===''){
              Notif.Error('Selecione el tipo de archivo a subir.');
              return;
            }
            if (!file_documento.value) {
              Notif.Error('Debe cargar un archivo PDF');
              return;
            }
            const formData = new FormData();
            formData.append('archivopdf', file_documento.value);
            
            try {
              NProgress.configure({
                parent: '#loadingfile', // Selector del contenedor
                showSpinner: true, // Opcional: oculta el spinner si no lo necesitas
              });
              NProgress.start();
              isUploading.value = true; 
              const RespuestaJSON = await subir_adjunto(formData);
              if (RespuestaJSON.success) {
                  const temp = ref<Adjunto>(initialize_Adjunto());
                  temp.value.id  = Array_archivos.value.length+1;
                  temp.value.url = HOST_URL+RespuestaJSON.data.toString();
                  temp.value.nombrefile = file_documento.value.name;
                  
                  // Asignando -------------------------------------------
                  Array_archivos.value.push(temp.value);  
                  documento.value.pdf_principal = HOST_URL+RespuestaJSON.data.toString();
                  // ------------------------------------------------------

                  closeModal_Adjunto();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
            } catch (error) {
              console.error('Error subiendo archivo:', error);
              Notif.Error('Ocurrió un error durante la subida');
            } finally {
              NProgress.done(); // Detener la barra de progreso
              isUploading.value = false; // Habilitar el botón nuevamente
              ArchivoTemporal.value = initialize_Adjunto();
              file_documento.value = null;
              if (fileInputRef.value) {
                fileInputRef.value.value = "";
              }
              NProgress.configure({
                parent: 'body', 
                showSpinner: true, 
              });
            }
        };

        const Remove_Adjunto = (id: number) => {
          const index = Array_archivos.value.findIndex(adj => adj.id === id);
          if (index !== -1) {
            Array_archivos.value.splice(index, 1); // Elimina el elemento encontrado
            file_documento.value = null;

            if (fileInputRef.value) {
              fileInputRef.value.value = "";
            }
            documento.value.pdf_principal = "";     
          } else {
            Notif.Error("Elemento no encontrado");
          }
        };

        // Tabla Búsqueda ------------------------------------------------------------
        const headers_tablaadministrados = ref([
          { text: '#', width: '5%', key: 'index' }, 
          { text: 'NOMBRE', width: '30%', key: 'nombre' },
          { text: 'APELLIDO P', width: '20%', key: 'apellidopat' },
          { text: 'APELLIDO M', width: '20%', key: 'apellidomat' },
          { text: 'DNI', width: '15%', key: 'numdocumento' },
          { text: '', width: '10%', key: 'acciones' },
        ]);

        // Btn Editar Administrado ---------------------------------------------------
        const Editar_administrado = async (person: Administrado) => {
          openModal_registrarAdministrado();
          persona.value= AdministradoExistente.value;
        };
        
        // REGISTRAR USUARIO ---------------------------------------------------------
        //Validación de Formulario Persona
        const validate = () => {
          Object.keys(persona.value).forEach(key => {
            validateField(key, (persona.value as any)[key]);
          });
          console.log(errors.value);
          return !Object.values(errors.value).some(error => error);
        };
        // ****************************************************************************       
        // REGISTRAR PERSONA -------------------
        const RegistrarPersona = async () => {          
          if (!validate()) {
            // console.log("Errors object before returning validate:", Object.values(errors.value));
            return;
          }
          try {
              NProgress.start();
              //--------
              const RespuestaJSON = await add_administrado(persona.value);
              if (RespuestaJSON.success) {
                  secuencia.value  = 2;
                  persona.value.id = RespuestaJSON.data;
                  AdministradoExistente.value = persona.value;
                  documento.value.administrado_id=RespuestaJSON.data;
                  closeModal_RegistrarAdministrado();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); // Detiene la barra de progreso
          }
        };

        // ACTUALIZAR PERSONA -------------------
        const ActualizarPersona = async () => {          
          if (!validate()) {
            // console.log("Errors object before returning validate:", Object.values(errors.value));
            return;
          }
          try {
              NProgress.start();
              //--------
              const RespuestaJSON = await upd_administrado(persona.value);
              if (RespuestaJSON.success) {
                  secuencia.value  = 2;                 
                  AdministradoExistente.value = persona.value;
                  //documento.value.administrado_id=RespuestaJSON.data;
                  closeModal_RegistrarAdministrado();
                  Notif.Success(RespuestaJSON.message);
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); // Detiene la barra de progreso
          }
        };
        
        // CARGAR DOCUMENTOS EXISTENTES POR ID

        const CargarDocumentoID = async () => {          
         
          try {
              NProgress.start();
              //--------
              
              const RespuestaJSON = await get_documentoCompleto_externo(iddocumento.toString());
              if (RespuestaJSON.success) {
                
                  DocumentoRegistrado.value = RespuestaJSON.data;
                  documento.value = RespuestaJSON.data;
                  documento.value.buzondestino_id = DocumentoRegistrado.value.pase_buzondestino_id;
                  //AdministradoExistente.value.id = DocumentoRegistrado.value.administrado_id.toString();
                  // Get Administado 
                  frm_tipodocumento.value = initialize_tipodocumento();
                  frm_tipodocumento.value.id = DocumentoRegistrado.value.tipodocumento_id;
                  frm_tipodocumento.value.nombre = DocumentoRegistrado.value.tipodocumento_nombre;

                  Buzon_destino.value = {
                      id: '',
                      destino: '',
                      tipobuzon: '',
                      responsable : '',
                  };
                  
                  if (DocumentoRegistrado.value) {
                      console.log("Documento Registrado:", DocumentoRegistrado.value); // Verifica el objeto completo

                      if (DocumentoRegistrado.value.pase_buzondestino_id) {
                          Buzon_destino.value.id = DocumentoRegistrado.value.pase_buzondestino_id.toString();
                          Buzon_destino.value.destino = DocumentoRegistrado.value.pase_buzondestino_nombre.toString();
                      } else {
                          console.error("pase_iddestino no está definido");
                      }
                  } else {
                      console.error("DocumentoRegistrado está vacío o no contiene datos.");
                  }

                  //adjunto
                  if(DocumentoRegistrado.value.pdf_principal!==''){
                    const temp = ref<Adjunto>(initialize_Adjunto());
                    temp.value.id  = 1;
                    temp.value.url = DocumentoRegistrado.value.pdf_principal;
                    temp.value.nombrefile = "Documento PDF Principal";
                    
                    // Asignando -------------------------------------------
                    Array_archivos.value.push(temp.value);     
                  }
                  
                 
                  
                  try {
                      const RespuestaJSON_Adm = await get_administrado_id(DocumentoRegistrado.value.administrado_id.toString());
                      if (RespuestaJSON_Adm.success) {
                          AdministradoExistente.value = RespuestaJSON_Adm.data;
                      } else {
                          Notif.Error(RespuestaJSON.message);
                      }
                  } catch (error) {
                      console.error('Error uploading file:', error);
                  }
             
                  // secuencia.value  = 2;
                  // persona.value.id = RespuestaJSON.data;
                  // AdministradoExistente.value = persona.value;
                  // documento.value.administrado_id=RespuestaJSON.data;
                  // closeModal_RegistrarAdministrado();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); // Detiene la barra de progreso
          }
        };

        

        // ACTUALIZAR DOCUMENTO  -------------------------------------------------------------
        // -----------------------------------------------
        const documento = ref<DocumentoExterno>( initialize_CrearDocumentoExterno());
        const errorsdocumento = ref<any>(initialize_CrearDocumentoExternoErrores());
        
        //Validación de Formulario Documento
        const validateFieldDocumentos =  (field: string, value: any) => {
          switch (field) {
            case 'asunto':
              errorsdocumento.value[field] = value ? '' : 'Campo obligatorio';
              break;
            case 'tipodocumento_id':
              errorsdocumento.value[field] = value ? '' : 'Campo obligatorio';
              break;
            case 'estupa':
              errorsdocumento.value[field] = typeof value === 'boolean' ? '' : 'Campo obligatorio';
              break;
            case 'folios':
              errorsdocumento.value[field] = value ? '' : 'Campo obligatorio';
              break;
            case 'buzondestino_id':
              errorsdocumento.value[field] = value ? '' : 'Campo obligatorio';
              break;
          }
        };
        watch(() => documento.value.asunto, (newVal) => validateField('asunto', newVal));
        watch(() => documento.value.tipodocumento_id, (newVal) => validateField('tipodocumento_id', newVal));
        watch(() => documento.value.estupa, (newVal) => validateField('estupa', newVal));
        watch(() => documento.value.folios, (newVal) => validateField('folios', newVal));
        watch(() => documento.value.buzondestino_id, (newVal) => validateField('buzondestino_id', newVal));
        
        const validateDocumento = () => {
          Object.keys(documento.value).forEach(key => {
            validateFieldDocumentos(key, (documento.value as any)[key]);
          });
          console.log(errorsdocumento.value);
          return !Object.values(errorsdocumento.value).some(error => error);
        };
        // -----------------------------------------------
        const onChangeTramite = async () =>{
          if(TramiteActual.value){
            documento.value.tramitetupa_id = parseInt(TramiteActual.value?.id, 10) || 0;
            FunList.load_Requisitos_TramitesTupa(documento.value.tramitetupa_id.toString());
          }
        }
        // -----------------------------------------------
        const on_changeTipoDoc = () =>{
          if (persona.value.tipodocumento=="DNI" || persona.value.tipodocumento=="RUC" ){
              isDisabled.value=true;
          }else{
              isDisabled.value=false;
          }
        }
        // -----------------------------------------------
        const on_change_destino = () =>{
          if (Buzon_destino.value){
              documento.value.buzondestino_id= parseInt(Buzon_destino.value?.id, 10) || 0;
          }else{
              isDisabled.value=false;
          }
        }
        // -----------------------------------------------
        const ActualizarDocumento = async () => {   
          if(documento.value.administrado_id===0){
            Notif.Error("Debe ingresar un solicitante");
            return
          }else if(documento.value.pdf_principal===''){
            Alerta.Advertencia("Falta Adjunto","Debe subir un documento PDF");
            return
          }else if(!validateDocumento()) {
            Notif.Error("Ingrese todos los campos obligatorios");
            //alert(validateDocumento());
            return;
          }
          if(Array_archivos.value.length>0){
            documento.value.pdf_principal = Array_archivos.value[0].url;
          }

          try {
              NProgress.start();
              isSending.value = true;
              //--------
              const RespuestaJSON = await upd_documentoMesaPartes(documento.value);
              if (RespuestaJSON.success) {
                  Alerta.Sucessfull("Actualización Completada","Se guardaron los cambios");
                  reset_formularioDatos();
                  CargarDocumentoID();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); 
              isSending.value = false; // Detener la barra de progreso
          }
          // reset_formularioDatos();
        };

        //DERIVAR DOCUMENTO 
        //-------------------------------------------------------------------------
        const DerivarExpediente = async () => {
          const isConfirmado = await Alerta.Confirmacion_envio(
            '¿Estás seguro de derivar el documento?',
            'Verifica los datos'
          );
          if (isConfirmado) {
            try {
              
              const RespuestaJSON = await derivar_documento_mesapartes(DocumentoRegistrado.value.pase_id,'Enviado');
              if (RespuestaJSON.success) {
                Alerta.Sucessfull_timer('Envio Completado', 'El documento ha sido derivado');      
                router.push('/office/mesapartes_recibidos');
              } else {
                console.log(RespuestaJSON.message);
                Alerta.Error('Error', 'No se pudo eliminar');
              }
            } catch (error) {
              console.error('Error al eliminar la inscripción:', error);
            }
          }
        };

        

        const focusNext = (nextElementId: string): void => {
          nextTick(() => {
            const nextElement = document.getElementById(nextElementId);
            if (nextElement) {
              (nextElement as HTMLElement).focus();
            }
          });
        };

        //reset
        

        const reset_formAdministrado =() =>{
          documento.value.administrado_id =  0;
          AdministradoExistente.value= initializeAdministrado();
        }

        const reset_formularioDatos = () =>{
          persona.value= initializeAdministrado();
          documento.value = initialize_CrearDocumentoExterno();
          AdministradoExistente.value= initializeAdministrado();
          secuencia.value = 1;
          errors.value = initializeAdministrado();
          errorsdocumento.value = initialize_CrearDocumentoExternoErrores();
          // Reset Form
          Buzon_destino.value = {
              id: '',
              destino: '',
              tipobuzon: '',
              responsable: '',
          };
          buscar_tipodoc.value="";
          buscar_numdoc.value="";
          buscar_nombre.value="";
          buscar_tipodoc.value="";
          buscar_apellido.value="";
          
          Array_archivos.value=[];
          ArchivoTemporal.value = initialize_Adjunto();
          file_documento.value = null;
          frm_tipodocumento.value = initialize_tipodocumento();

        };


      // Función para incrementar la cantidad de un producto
      const increaseValue = () => {
            documento.value.folios++; // Incrementar la cantidad
      };

      // Función para disminuir la cantidad de un producto
      const decreaseValue = () => {
        if (documento.value.folios > 1) {
            documento.value.folios--; // Decrementar la cantidad
        }
      };



      //-----------------------------------------------------------------------
      //-----------------------------------------------------------------------
      //MODAL REGISTRAR ADMINISTRADO ------------------------------------------
      const openModal_registrarAdministrado = () => {
        persona.value= initializeAdministrado();
        const modalElement = document.getElementById('add_ReferenciaModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      };

      const closeModal_RegistrarAdministrado = () => {
        const modalElement = document.getElementById('add_ReferenciaModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          if (modal) modal.hide();
        }
      };

      //-----------------------------------------------------------------------
      //-----------------------------------------------------------------------
      //MODAL BUSQUEDA ADMINISTRADO -------------------------------------------
      const openModal_BuscarAdministrado = () => {
        const modalElement = document.getElementById('Buscar_AdministradoModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      };
      
      const closeModal_BuscarAdministrado = () => {
        const modalElement = document.getElementById('Buscar_AdministradoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          if (modal) modal.hide();
        }
      };

      //-----------------------------------------------------------------------
      //-----------------------------------------------------------------------
      //MODAL ADJUNTAR ARCHIVO ------------------------------------------------

      const openModal_Adjunto = () => {
        const modalElement = document.getElementById('add_adjuntoModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      };
      
      const closeModal_Adjunto = () => {
        const modalElement = document.getElementById('add_adjuntoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
          if (modal) modal.hide();
        }
      };

      return {
        secuencia, increaseValue,decreaseValue,
        Buscar_Administrado_x_DNI,
        Buzon_destino,
        documento,TramiteActual,
        errors, errorsdocumento, 
        on_numDocChange, isDisabled, on_changeTipoDoc,
        isDarkTheme, persona, 
        RegistrarPersona,
        ubigeoSelected, Departamentos, Provincias, Distritos,
        ActualizarDocumento,
        reset_formularioDatos,
        StoreList,
        HOST_URL,
        onChangeTramite,
        focusNext,
        on_change_destino,
        openModal_registrarAdministrado,closeModal_RegistrarAdministrado,
        buscar_tipodoc,buscar_numdoc,
        buscar_nombre,
        reset_formAdministrado,
        Lista_Administrados,
        openModal_BuscarAdministrado, closeModal_BuscarAdministrado,buscar_apellido,headers_tablaadministrados,
        Buscar_Administrado_x_Nombre,add_registrado,AdministradoExistente,
        buscar_msjerror,Editar_administrado, on_changeTipoDocumento,frm_tipodocumento,
        DocumentoRegistrado,
        pdf_documento,
        generarPDF,fileInputRef,
        onFileSelected, handleDropFile,file_documento,SubirArchivo,
        esexistente, isUploading, Array_archivos,ArchivoTemporal,openModal_Adjunto, closeModal_Adjunto,Remove_Adjunto,
        iddocumento,ActualizarPersona,DerivarExpediente,isSending
      }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>


.text-amarillo {
  color: rgb(217, 144, 4) !important;
}
.image-container{
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* This mai the 4:3 aspect ratio */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the image covers the container */
  transform: translate(-50%, -50%);
}

.file-input-wrapper {
  position: relative;
  width: 100%;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.custom-file-label {
  display: inline-block;
  width: 100%;
  padding: 10px 15px;
  background-color: #d7edf7;
  color: #353535;
  border: 2px;
  border-radius: 4px;
  border-style:dashed;
  border-color: #aed0e0;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-file-label:hover {
  background-color: #0056b3;
}


/* Transición suave de entrada y salida */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, max-height 0.5s ease;
}

/* Estados de entrada y salida */
.fade-enter, .fade-leave-to /* .fade-leave-active en Vue 2 */ {
  opacity: 0;
  max-height: 0; /* Para animar el tamaño del contenido */
  overflow: hidden;
}

input, select,textarea, multiselect{
  background-color: #d7edf738 !important;
}
    /* Deshabilitar las flechas en campos de tipo number */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield; /* Para Firefox */
}
</style>
