<template>


  <div class="row ">
    <div class="col-12">
      <!-- <br>{{ documento_unico_seleccionado}} -->
       <!-- {{ documentosSeleccionados.length }}<br>
      {{ Usuario }}</br> -->
      <CardLayout  :title="'Documentos Recibidos'" :clase="'text-white'"  :clasehead="'bg-blue-800 border-0'">
        <!-- Botones de la parte superior derecha -->
         
        <template #buttons>
              <div class="d-flex columns justify-content-end">
                <!-- <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_inicio">
                <label class="form-label px-2 text-white align-content-center" >-</label>
                <input type="date" class="form-control wid-130" v-model="filtros.f_fecha_fin"> -->
                <button v-if="Usuario.rol_id  in [1, 2, 3, 9]" :disabled="documentosSeleccionados.length !== 1" @click="openModalCorreo" class="btn btn-info bg-blue-500 b-dark btn-sm mx-1">
                  <i class="ph-duotone ph-envelope"></i> Responder Administrado
                </button>
                <button :disabled="documentosSeleccionados.length !== 1" @click="btn_devolverdocumento" class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-arrow-left"></i> Devolver
                </button>
                <button :disabled="documentosSeleccionados.length !== 1" @click="btn_Derivardocumento" class="btn btn-warning bg-yellow-700 b-dark btn-sm mx-1">
                  <i class="ti ti-arrow-right"></i> Derivar
                </button>
                <button :disabled="documentosSeleccionados.length === 0" @click="btn_ArchivarDocumentos" class="btn btn-danger bg-red-300 b-dark btn-sm mx-1">
                  <i class="ph-duotone ph-arrow-fat-down"></i> Archivar ({{ documentosSeleccionados.length }})
                </button>
                <!-- <button @click="btn_Archivardocumento" class="btn btn-light b-dark btn-sm mx-1">
                  <i class="ph-duotone ph-printer"></i> Imprimir
                </button> -->
                <button @click="CargarExpedientes" class="btn btn-success b-dark btn-sm mx-1">
                  <i class="ti ti-refresh"></i>
                </button>
                <button @click="limpiar_seleccion" class="btn btn-warning btn-sm mx-1">
                  <i class="fa fa-broom"></i>
                </button>
              </div>
        </template>
        <!-- Contenido principal de la tarjeta -->
        <template #default>
          <!-- {{ iddocumento_unico_seleccionado_dobleclik }} -->
          <!-- {{ documento_unico_seleccionado }} -->
          <DataTable
                :headers="headers"
                :items="Lista_documentos"
                :filterKeys="['tipopase', 'asunto', 'numerodocumento', 'origen_nombre', 'destino_nombre','proveido', 'pase_fechaenvio', 'pase_fecharecepcion']"
                :clasehead="'bg-info-100'"
                :selectable="true"
                :itemIdKey="'idpase'"
                :auto-height="true"
                :height-offset="120"
                :loading="isLoading"
                :loadingLabel="'Cargando documentos'"
                @selection-change="onSelectionChange"
                ref="dataTableRef"
              >
                <template #default="{ item, index, currentPage, itemsPerPage, selectable, isItemSelected, toggleSelectItem, itemIdKey, handleMouseDown, isDragging, focusedRowIndex, isKeyboardNavigation }">
                  <tr @click="handleRowClick(item, index, $event)" 
                      @mousedown="handleMouseDown(index, $event)"
                      :class="{ 
                        'bg-light-danger': documento_unico_seleccionado.idpase === item.idpase && !(isKeyboardNavigation && focusedRowIndex === index),
                        'bg-blue-100 bg-opacity-25': selectable && isItemSelected(item[itemIdKey]) && !(isKeyboardNavigation && focusedRowIndex === index),
                        'keyboard-focused': isKeyboardNavigation && focusedRowIndex === index
                      }">
                    <!-- Checkbox para selección múltiple -->
                    <td v-if="selectable" class="text-center mx-2  px-2" width="2%" @click.stop>
                      <div class="d-flex align-items-center">
                            <div class="form-check form-check-inline m-0 pc-icon-checkbox">
                              <input 
                                type="checkbox"
                                class="form-check-input form-check form-check-inline m-0 pc-icon-checkbox"
                                :checked="isItemSelected(item[itemIdKey])"
                                @change="toggleSelectItem(item[itemIdKey])"
                              />
                              <i class="material-icons-two-tone pc-icon-uncheck">check_box_outline_blank</i>
                              <i class="material-icons-two-tone text-primary pc-icon-check">check_box</i>
                            </div>
                          </div>

                        
                    </td>
                    
                    <!-- {{ item.primogenio_id }} -->
                    <td  class="px-2 mx-0 text-center">{{ (currentPage - 1) * itemsPerPage + index + 1}}</td>

                    <td class="px-2 mx-0 ">
                      <span v-if="item.tipopase==='Original'" class="badge  bg-light f-12 text-secondary">Original</span>
                      <span v-if="item.tipopase==='Copia'" class="badge bg-light bg-gray-400 text-secondary f-12">Copia</span>
                    </td>
                    <td>
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap">
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} {{ item.cabecera }} 
                          </p>  
                          <p v-if="item.procedencia!=='Interno'" class="m-b-0 pt-0 f-w-600 f-12 uppercase text-gray-700">
                              <div v-if="item.administrado_tipodocumento==='RUC'"><i class="fa fa-building text-muted"></i> {{ item.administrado_razonsocial }}</div>
                              <div v-else><i class="fa fa-user text-muted"></i> {{ item.administrado_nombre }} {{ item.administrado_apellidopat }} {{ item.administrado_apellidomat }}</div>
                          </p>  
                          <p v-if="item.procedencia==='Interno'" class="m-b-0 pt-0 f-w-700 f-12 uppercase text-dark">
                              {{ item.tipodocumento_nombre }} - N° - {{ item.numeracion_tipodoc_oficina }} - {{ item.anio }} - {{ item.origen_sigla }} - MDVO/D
                          </p> 
                          <p class="m-b-0 text-dark uppercase text-justify f-12 f-w-500"  style=" line-height: 1.2;">
                            {{ item.asunto }} 
                            <span v-if="item.prioridad==='Urgente'" class="badge capitalize py-1 bg-red-300 f-w-600 f-10">
                              Urgente</span> 
                            <span v-if="item.proyectar" class="badge bg-yellow-700  mx-1 f-w-600 f-10">
                              Proyectado</span> 
                          </p>
                          <p class="m-b-0 text-primary  text-justify f-12"  style=" line-height: 1.2;">
                              {{ item.descripcion }} 
                          </p>
                          <p class="m-b-0 text-yellow-900 f-w-500 f-12 pt-2 text-italic"  style=" line-height: 1.2;">
                            <span v-if="item.pase_proveido!==''" > {{ item.pase_proveido }}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td v-if="item.expediente_procedencia!=='Interno'" class="text-wrap f-13">{{ item.expediente }} - {{ item.anio }}</td>
                    <td v-if="item.expediente_procedencia==='Interno'" class="text-wrap f-13">-</td>

                    <td class="text-wrap" v-if="item.procedencia==='Interno'">Int</td>
                    <td class="text-wrap" v-else >Ext</td>

                    
                    <td>
                      {{ item.folios }}
                    </td>
                    <td class="text-wrap  lh-sm  f-12 f-w-500">
                      {{ item.origen_nombre }}
                    </td>
                 
                    <td  class="px-2 mx-0 text-center">
                      <div class="d-inline-block align-middle">
                        <div class="d-inline-block text-wrap ">
                          <p class="m-b-0 text-gray-600  f-12">{{ FormatFecha.convertirFecha_sola(item.pase_fecharecepcion) }}</p>
                          <p class="m-b-0 text-gray-600 f-12">{{ FormatFecha.convertirFecha_horasola(item.pase_fecharecepcion) }}</p>                            
                             
                        </div>
                      </div>
                    </td>
                    <td class="px-0 mx-0 text-left" @click.stop>
                      <a v-if="item.pdf_principal!==null"  :href="item.pdf_principal" target="_blank"  class="btn  btn-sm">
                         <img src="../../assets/images/iconos/pdf.png" alt="Proyectar" class="wid-30">
                        
                      </a>
                      <a v-if="item.pdf_anexo1!==null"  :href="item.pdf_anexo1" target="_blank"  class="btn btn-danger bg-gray-800 border-0 btn-sm mx-1">
                         <i class="fa fa-file-pdf text-white f-20"></i> 
                      </a>
                      <a v-if="item.pdf_anexo2!==null"  :href="item.pdf_anexo2" target="_blank"  class="btn btn-danger  bg-gray-600 border-0 btn-sm">
                         <i class="fa fa-file-pdf text-white f-20"></i> 
                      </a>
                    </td>
                    <td v-if="Usuario.rol_id!==2" class="px-0 mx-0 text-center" @click.stop>
                        <!-- <div class="dropdown" v-if="item.proyectar">
                          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" :id="'btnmenu_'+ (index+1)" data-bs-toggle="dropdown" aria-expanded="false">
                              Acción
                          </button>
                          <ul class="dropdown-menu bg-secondary  dropdown-menu-end " :aria-labelledby="'btnmenu_'+index">
                              <router-link :to="{ name: 'NuevoDocumento', params: { idreferencia: item.documento_id,idpase: item.idpase } }" class="dropdown-item text-white text-hover-dark">
                                <i class="fa fa-chevron-right text-xs"></i> Atender
                              </router-link>
                              <li><a class="dropdown-item text-white text-hover-dark" @click="Pase_Archivar_Documento">
                                  <i class="fa fa-chevron-right text-xs "></i> Aceptar Proyectado</a>
                              </li>
                          </ul>
                        </div>        -->
                        <router-link  
                          :to="{ name: 'NuevoDocumento', params: { idreferencia: item.documento_id,idpase: item.idpase } }" class="btn btn-primary btn-sm rounded-3">
                          <i class="ph-duotone ph-seal-check f-20"></i> 
                        </router-link>
                        <button type="button" class="btn btn-success btn-sm rounded-3 mx-1" @click="handleDoubleClick(item.primogenio_id)">
                                                  <i class="fa fa-search"></i></button>
                    </td>

                  </tr>
                </template>
              </DataTable>
        </template>
      </CardLayout>
    </div>
  </div>

  <!-- ------------------------------------------------- -->
    <!-- ------------------------------------------------- -->

    <!-- Modal DEVOLVER -->
    <div class="modal modal-lg fade" id="modal_PASE" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-yellow-800 py-2  ">
                    <h6 class="modal-title text-white" id="modal_PASE_Aria">
                        <i class="fa fa-book p-r-15"></i>DEVOLVER DOCUMENTO
                    </h6>
                    <button type="button" class="btn-close btn-sm f-10" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1  mb-2 rounded-2">Datos del Documento:</label>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Documento</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_unico_seleccionado.cabecera}} 
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Tipo</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_unico_seleccionado.tipodocumento_nombre}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Tipo Pase:</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_unico_seleccionado.tipopase}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Folios:</label>
                    </div>
                    <div class="col-md-3">
                           {{documento_unico_seleccionado.folios}}
                    </div>
                    
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Origen</label>
                    </div>
                    <div class="col-md-5">
                           {{documento_unico_seleccionado.origen_nombre}}
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Fecha Envío:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_unico_seleccionado.pase_fechaenvio)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary"></label>
                    </div>
                    <div class="col-md-5">
                           
                    </div>
                    <div class="col-md-2">
                      <label class="form-label text-secondary">Fecha Recepción:</label>
                    </div>
                    <div class="col-md-3">
                           {{FormatFecha.fecha_larga_hora(documento_unico_seleccionado.pase_fecharecepcion)}}
                    </div>
                  </div>
                  <!-- Fila 1------ -->
                  <div class="row g-1">
                    <div class="col-md-2">
                      <label class="form-label text-secondary">MOTIVO:</label>
                    </div>
                    <div class="col-md-10">
                           {{documento_unico_seleccionado.pase_proveido }}
                    </div>
                  </div>

                  <!-- ---------- -->
                  <!-- Fila 3------ -->
                  <div class="row">                  
                    <div class="mb-3">
                      <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1 mb-2 rounded-2 pt-3">Motivo:</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="PaseDevolver.proveido" rows="3"></textarea>
                    </div>
                  </div>
                  
                </div>
              
                <div class="modal-footer py-0">                    
                    <button :disabled="isSending_devolver" type="submit" class="btn btn-danger" @click="DevolverDocumento()">
                        <i class="ti ti-arrow-left"></i>Devolver</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>


    <!-- MODAL DERIVAR DOCUMETNO -->

    <div class="modal modal-lg fade" id="modal_PASE_DERIVAR" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success  pt-3 pb-2 ">
                    <h6 class="modal-title text-white" id="modal_PASE_Aria">
                        <i class="fa fa-book p-r-15"></i>NUEVO PASE
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <!-- --------------------------------------------------- -->
                  
                  <!-- --------------------------------------------------- -->
                      <div class="row g-1">
                          <div class="col-md-3">
                            <label class="form-label text-gray-600 f-13  mb-0">Proveído</label>
                            <input maxlength="6" type="text" readonly v-model="DocumentoNuevo.numerodocumento" class="form-control" />
                            <ErrorMessage :error="errorsDoc.codigo" />
                          </div>
                          <div class="col-md-2">
                            <label label class="form-label text-gray-600 f-13  mb-0">Año</label>
                            <input readonly type="text" v-model="anioactual" class="form-control" />
                          </div>
                          <div class="col-md-4">
                            <label class="form-label f-13">Prioridad</label>
                            <div class="d-flex ">
                                    <input  v-model="DocumentoNuevo.prioridad"
                                            class="btn-check" checked type="radio" name="radioprioridad" value="Normal" id="lbl_radioprioridad1">
                                    <label class=" btn btn-outline-secondary b-gray py-1 px-2 m-r-5 w-100 f-w-600" for="lbl_radioprioridad1"> Normal </label>

                                    <input  v-model="DocumentoNuevo.prioridad"
                                            class="btn-check"  type="radio" name="radioprioridad" value="Urgente" id="lbl_radioprioridad2">
                                    <label class=" btn btn-outline-danger b-gray px-2 py-1 m-r-5 w-100 f-w-600" for="lbl_radioprioridad2"> Urgente </label>
                            </div>
                            <ErrorMessage :error="errorsDoc.prioridad" />
                          </div>
                      </div>
                      <!-- Fila 2------ -->
                      <div class="row mb-2">
                          <div class="col-md-12">
                          <label class="form-label text-gray-600 f-13 ">MOTIVO</label>
                          <textarea maxlength="249" type="text" v-model="DocumentoNuevo.pase_proveido" class="form-control" ></textarea>
                          <ErrorMessage :error="errorsDoc.pase_proveido" />
                          </div>
                      </div>
                      <!-- Fila 3------ -->
                      <div class="row mb-4">
                          <div class="col-md-9  ">
                              <label class="form-label align-content-center f-13 p-r-15 text-gray-600  f-w-600">Destino:</label>
                              <multiselect v-model="Original"
                                            @update:modelValue="Add_Original" 
                                            class="f-6"
                                            label="destino"
                                            track-by="id"
                                            placeholder="Seleccionar"
                                            selectLabel=""
                                            deselectLabel=""
                                            selectedLabel=""
                                            :options="listaDestinos">
                              </multiselect>
                            <ErrorMessage :error="error_destino_original" />
                          </div>
                      </div>

                      <div class="row">
                          <div class="col-md-12  ">
                            <div class="p-2  rounded-1 mt-1">
                                <div v-for="Item in Array_oficina_original" :key="Item.id" class="d-flex border-bottom" style="margin-top: 1px; margin-bottom: 1px;">
                                    <div class="w-100"><i class="f-8 fa fa-chevron-right"></i> {{ Item.destino }}</div>
                                    <div class="flex-shrink-1">
                                        <div class="btn f-4 btn-link-hover-danger btn-sm py-0" @click="Remove_Original(Item.id)" >
                                            <i class="fa fa-trash" style="font-size:10px"></i>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>

                  

                  <!-- --------------------------------------------------- -->
                  <!-- --------------------------------------------------- -->
                </div>

                <div class="modal-footer py-0">                    
                    <button :disabled="isSending_derivar" type="submit" class="btn btn-danger" @click="Registrar_Derivacion_Proveido()">
                      <i class="ti ti-arrow-right"></i>Derivar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ARCHIVAR DOCUMETNO -->

    <!-- Modal para agregar Requisito -->
    <div class="modal modal-lg fade" id="modal_PASE_ARCHIVAR" tabindex="-1" aria-labelledby="modal_PASE_Aria" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-red-300  pt-3 pb-2 ">
                    <h6 class="modal-title text-white " id="modal_PASE_Aria">
                        <i class="ph-duotone ph-arrow-fat-down p-r-15"></i>
                        <span v-if="documentosSeleccionados.length === 1">ARCHIVAR DOCUMENTO</span>
                        <span v-else>ARCHIVAR {{ documentosSeleccionados.length }} DOCUMENTOS</span>
                    </h6>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body py-2">
                  <!-- Mostrar información para un solo documento -->
                  <div v-if="documentosSeleccionados.length === 1">
                    <!-- <label for="reqnombre" class="form-label text-secondary f-16 f-w-600 py-1  mb-2 rounded-2">Datos del Documento:</label> -->
                    <!-- Fila 1------ -->
                    <div class="row g-1">
                      <div class="col-md-2">
                        <label class="form-label f-13">Documento</label>
                      </div>
                      <div class="col-md-5">
                             {{documento_unico_seleccionado.cabecera}}
                      </div>
                      <div class="col-md-2">
                        <label class="form-label f-13">Tipo</label>
                      </div>
                      <div class="col-md-3">
                             {{documento_unico_seleccionado.tipodocumento_nombre}}
                      </div>
                    </div>

                    <!-- Fila 1------ -->
                    <div class="row g-1">
                      
                      <div class="col-md-2">
                        <label class="form-label f-13">Tipo Pase:</label>
                      </div>
                      <div class="col-md-5">
                             {{documento_unico_seleccionado.tipopase}}
                      </div>
                      <div class="col-md-2">
                        <label class="form-label f-13">Folios:</label>
                      </div>
                      <div class="col-md-3">
                             {{documento_unico_seleccionado.folios}}
                      </div>
                      
                    </div>
                    <!-- Fila 1------ -->
                    <div class="row g-1">
                      <div class="col-md-2">
                        <label class="form-label f-13">Origen</label>
                      </div>
                      <div class="col-md-5">
                             {{documento_unico_seleccionado.origen_nombre}}
                      </div>
                      <div class="col-md-2">
                        <label class="form-label f-13">Fecha Envío:</label>
                      </div>
                      <div class="col-md-3">
                             {{FormatFecha.fecha_larga_hora(documento_unico_seleccionado.pase_fechaenvio)}}
                      </div>
                    </div>
                    <!-- Fila 1------ -->
                    <div class="row g-1">
                      <div class="col-md-2">
                        <label class="form-label f-13"></label>
                      </div>
                      <div class="col-md-5">
                             
                      </div>
                      <div class="col-md-2">
                        <label class="form-label f-13">Fecha Recepción:</label>
                      </div>
                      <div class="col-md-3">
                             {{FormatFecha.fecha_larga_hora(documento_unico_seleccionado.pase_fecharecepcion)}}
                      </div>
                    </div>
                    <!-- Fila 1------ -->
                    <div class="row g-1">
                      <div class="col-md-2">
                        <label class="form-label f-13">Asunto:</label>
                      </div>
                      <div class="col-md-10">
                             {{documento_unico_seleccionado.asunto}}
                      </div>
                    </div>
                    <!-- Fila 1------ -->
                    <div v-if="documento_unico_seleccionado.pase_proveido!==''" class="row g-1">
                      <div class="col-md-2">
                        <label class="form-label f-13">Proveido:</label>
                      </div>
                      <div class="col-md-10">
                             {{documento_unico_seleccionado.pase_proveido}}
                      </div>
                    </div>
                  </div>

                  <!-- Mostrar lista para múltiples documentos -->
                  <div v-else>
                    <div class="row g-1 mb-3">
                      <div class="col-md-12">
                        <label class="form-label f-13 fw-bold">Documentos seleccionados para archivar:</label>
                        <div class="border rounded p-2" style="max-height: 200px; overflow-y: auto;">
                          <div v-for="(documento, index) in documentosSeleccionados" :key="documento.idpase" class="d-flex justify-content-between align-items-center py-1 border-bottom">
                            <span class="f-12">
                              <strong>{{ index + 1 }}.</strong> {{ documento.tipodocumento_nombre }} {{ documento.cabecera || documento.numerodocumento }}
                            </span>
                            <small class="text-muted">{{ documento.origen_nombre }}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Fila 3------ -->
                  <div class="row pt-3">  
                    <div class="mb-1">
                        <label class="form-label f-13 ">Mensaje:</label>
                        <textarea type="text" id="reqnombre" class="form-control" v-model="PaseArchivar.proveido" rows="3"></textarea>
                    </div>
                  </div>

                  <!-- Fila 3------ -->
                  <div class="row pt-3">  
                    <div class="mb-1">
                        <label class="form-label f-13">Respuestas rápidas:</label>
                        <div class="d-flex flex-wrap justify-content-center">
                          <button type="button" class="btn btn-dark btn-sm py-0 text-sm m-1" @click="PaseArchivar.proveido='Se tomó conocimiento y se archivó el documento.'">Se tomó conocimiento y se archivó el documento.</button>
                          <button type="button" class="btn btn-dark btn-sm py-0 text-sm m-1" @click="PaseArchivar.proveido='Se tomaron las acciones correspondientes y se archivó el documento.'">Se tomaron las acciones correspondientes y se archivó el documento.</button>
                          <button type="button" class="btn btn-dark btn-sm py-0 text-sm m-1" @click="PaseArchivar.proveido='Se aceptó el documento y se archivó.'">Se aceptó el documento y se archivó.</button>
                          <button type="button" class="btn btn-dark btn-sm py-0 text-sm m-1" @click="PaseArchivar.proveido='Se archiva por equivocación'">Se archiva por equivocación</button>
                          <button type="button" class="btn btn-dark btn-sm py-0 text-sm m-1" @click="PaseArchivar.proveido='Se archiva por falta de información'">Se archiva por falta de información de información</button>
                          </div>
                    </div>
                  </div>
                 
                  <div class="modal-footer py-0">                    
                      <button :disabled="isSending_archivo" type="submit" class="btn btn-danger bg-red-300" @click="Pase_Archivar_Documento()">
                        <i class="ph-duotone ph-arrow-fat-down"></i>
                        <span v-if="documentosSeleccionados.length === 1">Archivar Documento</span>
                        <span v-else>Archivar {{ documentosSeleccionados.length }} Documentos</span>
                      </button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  </div>
                </div>
            </div>
        </div>
    </div>

    <Modal_ruta :id="iddocumento_unico_seleccionado_dobleclik"/>
    <Modal_correo_administrado :id="iddocumento_unico_seleccionado_dobleclik" />


</template>

<script lang="ts">
import DataTable from '../../components/table/DataTable.vue';  
import CardLayout from '../../layout/CardLayout.vue';  
import { ref, onMounted, defineComponent, computed, watch } from 'vue';
import NumberFormat from '../../utils/FormatNumber';
import NProgress from 'nprogress'; 
import { HOST_URL } from '../../config';
import { FormatFecha } from '../../utils/FormatFecha';
import { list_meses } from '../../utils/listas.fijas';
import { DocumentoExterno, DocumentoFull, DocumentoPase, initialize_CrearDocumentoErrores, initialize_CrearDocumentoExterno, initialize_DocumentoPase, initialize_SigaPase, SigaPase } from '../../interfaces/documento.interface';

import { add_documentoInterno, add_pasedocumento, del_documento, get_correlativo_nrodocumento_buzon, get_listadocumento_estado_UsuarioDestino, recepcionar_pase } from '../../services/DocumentoServices';
import Notif from '../../utils/notificaciones';
import { Destino, Destino_Oficina, initializeUsuarioLog, UsuarioLog } from '../../types/interfaces';
import { usarAuthStore } from '../../stores/autentificacionStore';
import { Modal } from 'bootstrap';
import { Listas } from '../../composables/ListasIndependientes';
import { ListasStore } from '../../stores/listasStore';
import Multiselect from 'vue-multiselect'
import Modal_ruta from '../../components/Modal_ruta.vue';
import Modal_correo_administrado from '../../components/Modal_correo_administrado.vue';
import { RouterLink } from 'vue-router';
import { get_destinos_general } from '../../services/DestinosServices';
import Alerta from '../../utils/alertas';
import ErrorMessage from '../../components/ErrorMessage.vue';

export default defineComponent({
  components: {
    CardLayout,
    Multiselect,
    DataTable,
    Modal_ruta,
    Modal_correo_administrado,
    ErrorMessage
  },
  setup() {
    const anioactual        = ref(new Date().getFullYear());        
    const DestinoOficina    = ref<Destino>();
    const authStore         = usarAuthStore();
    const Usuario           = ref<UsuarioLog>(initializeUsuarioLog());
    const proveido          = ref("");
    const FrmMotivo         = ref("");
    const FrmMotivoArchivo  = ref("");
    Usuario.value           = authStore.usuario_Logueado;
    const StoreList         = ListasStore();
    const FunList           = Listas();
    const Lista_documentos  = ref<DocumentoPase[]>([]);

    const isSending_derivar = ref(false);
    const isSending_archivo = ref(false);
    const isSending_devolver = ref(false);
    const isLoading = ref(false);

    
    const currentYear       = new Date().getFullYear(); // Año actual

    const documento_unico_seleccionado = computed<DocumentoPase>(() => {
      if (documentosSeleccionados.value.length > 0) {
        const primerDocumento = documentosSeleccionados.value[0];
        return primerDocumento || initialize_DocumentoPase();
      }
      return initialize_DocumentoPase();
    });
    
    // Variables para selección múltiple
    const documentosSeleccionados = ref<DocumentoPase[]>([]);
    const dataTableRef = ref();

    const PaseDevolver      = ref<SigaPase>(initialize_SigaPase())
    const PaseDerivar       = ref<SigaPase>(initialize_SigaPase())
    const PaseArchivar      = ref<SigaPase>(initialize_SigaPase())


    // ----------------------------------------------------------
    const DocumentoNuevo = ref<DocumentoExterno>(initialize_CrearDocumentoExterno());
    const errorsDoc = ref<any>(initialize_CrearDocumentoErrores());
    const Pase = ref<SigaPase>(initialize_SigaPase());
      
    // ----------------------------------------------------------

    // -----------------------------------------------
    const on_changeOficina = () =>{
        if (DestinoOficina.value){
          PaseDerivar.value.buzondestino_id= parseInt(DestinoOficina.value?.id, 10) || 0;
        }
    }

    const CargarExpedientes = async () => {
      try {
        isLoading.value = true;
        NProgress.start();
        Lista_documentos.value=[];
        const RespuestaJSON = await get_listadocumento_estado_UsuarioDestino('Recibido',Usuario.value.buzon_id);
        if (RespuestaJSON.success) {
          Lista_documentos.value = RespuestaJSON.data;
          limpiarSeleccionTabla(); // Usar la función completa que limpia tanto la tabla como el estado local
          // Notif.Success(RespuestaJSON.message);
        } else {
          console.log(RespuestaJSON.message);
        }
      } catch (error) {
        console.error('Error al cargar la lista de inscripciones:', error);
      } finally {
        isLoading.value = false;
        NProgress.done();
      }
    };

    const seleccionar_documento = (docseleccionado: DocumentoPase) => {
      // Limpiar selección anterior y seleccionar solo este documento
      documentosSeleccionados.value = [docseleccionado];
    };

    // Función para limpiar la selección
    const limpiar_seleccion = () => {
      documentosSeleccionados.value = [];
    };

    // REGISTRAR PERSONA -------------------
    const RecepcionarDocumento     = async (id:number) => {         
      try {
          NProgress.start();
          //--------
          const RespuestaJSON     = await recepcionar_pase(id);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            limpiarSeleccionTabla();
            closeModal();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
      }
    };


    // DEVOLVER DOCUMENTO -----------------------------------------------------------
    const DevolverDocumento = async () => {     
      if(PaseDevolver.value.proveido===""){
        Notif.Error("Debe indicar el motivo por el que se devuelve el documento");
        return;
      } 
      try {
          NProgress.start();
          isSending_devolver.value = true;
          //--------
          const RespuestaJSON = await add_pasedocumento(PaseDevolver.value);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            limpiarSeleccionTabla();
            closeModal();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
          isSending_devolver.value = false;
      }
    };


    // DAR PASE DOCUMENTO  ---------------------------------------------------
    const Pase_Archivar_Documento = async () => {          
    
      if(PaseArchivar.value.proveido===""){
        Notif.Error("Debe indicar el motivo por el que se Archiva el documento");
        return;
      } 

      // Si hay múltiples documentos seleccionados, archivar todos
      if (documentosSeleccionados.value.length > 1) {
        // await Archivar_Multiples_Documentos();
        alert("a");
        return;
      }

      // Comportamiento original para un solo documento
      try {
          NProgress.start();
          isSending_archivo.value = true;
          //--------
          const RespuestaJSON = await add_pasedocumento(PaseArchivar.value);
          if (RespuestaJSON.success) {
            CargarExpedientes();
            limpiarSeleccionTabla();
            closeModal_archivar();
          } else {
              Notif.Error(RespuestaJSON.message);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      } finally {
          NProgress.done(); // Detiene la barra de progreso
          isSending_archivo.value = false;
      }
    };

    // Nueva función para archivar múltiples documentos
    const Archivar_Multiples_Documentos = async () => {
      try {
        NProgress.start();
        isSending_archivo.value = true;
        
        const totalDocumentos = documentosSeleccionados.value.length;
        let documentosArchivados = 0;
        let errores = 0;

        // Mostrar confirmación con la lista de documentos
        const documentosTexto = documentosSeleccionados.value
          .map(doc => `<div class='text-md alert alert-warning py-1 my-1 mx-2'>${doc.tipodocumento_nombre} ${doc.cabecera || doc.numerodocumento}</div>`)
          .join('\n');
        
        const isConfirmado = await Alerta.Confirmacion_Recepción(
          `Confirmación`,
          `<h6>¿Confirma el archivado de ${totalDocumentos} documento(s)?</h6>` + documentosTexto
        );

        if (!isConfirmado) {
          return;
        }

        // Procesar documentos uno por uno
        for (const documento of documentosSeleccionados.value) {
          try {
            const paseArchivarIndividual: SigaPase = {
              idpase: documento.idpase,
              buzonorigen_id: Usuario.value.buzon_id,
              buzondestino_id: Usuario.value.buzon_id,
              tipopase: "Original",
              proveido: PaseArchivar.value.proveido, // Usar el mismo motivo para todos
              observacion: "",
              estadopase: 'Archivo_porconfirmar',
              documento_id: documento.documento_id,
              usuario_id: Usuario.value.id.toString(),
              usuarionombre: Usuario.value.username,
              idpase_previo: documento.idpase,
              primogenio_id: documento.primogenio_id,
              fechaenvio: '', // Requerido por la interfaz
              fecharecepcion: '', // Requerido por la interfaz
              tipoaccion: 'Archivo' // Requerido por la interfaz
            };

            const RespuestaJSON = await add_pasedocumento(paseArchivarIndividual);
            
            if (RespuestaJSON.success) {
              documentosArchivados++;
            } else {
              errores++;
              console.error(`Error al archivar documento ${documento.numerodocumento}: ${RespuestaJSON.message}`);
            }
          } catch (error) {
            errores++;
            console.error(`Error al procesar documento ${documento.numerodocumento}:`, error);
          }
        }

        // Mostrar resultados
        if (documentosArchivados > 0) {
          Notif.Success(`Se archivaron ${documentosArchivados} de ${totalDocumentos} documentos correctamente.`);
        }
        
        if (errores > 0) {
          Notif.Error(`Se produjeron errores en ${errores} documento(s). Revise la consola para más detalles.`);
        }

        // Recargar datos y limpiar selección
        CargarExpedientes();
        limpiarSeleccionTabla();
        closeModal_archivar();

      } catch (error) {
        console.error('Error en archivado múltiple:', error);
        Notif.Error('Error inesperado durante el archivado múltiple.');
      } finally {
        NProgress.done();
        isSending_archivo.value = false;
      }
    };

    
    // Funciones para selección múltiple ----------------------------------------

    const onSelectionChange = (selectionData: { selectedIds: string[], selectedItems: DocumentoPase[], count: number }) => {
      documentosSeleccionados.value = selectionData.selectedItems;
      // console.log('Documentos seleccionados:', selectionData);
    };

    // Función para manejar el click en la fila
    const handleRowClick = (item: DocumentoPase, index: number, event: Event) => {
      const target = event.target as HTMLElement;
      
      // Establecer foco de teclado en la fila clickeada
      if (dataTableRef.value && dataTableRef.value.setKeyboardFocus) {
        dataTableRef.value.setKeyboardFocus(index);
        // Enfocar el contenedor de la tabla para habilitar navegación por teclado
        const tableContainer = dataTableRef.value.$el.querySelector('.table-container');
        if (tableContainer) {
          tableContainer.focus();
        }
      }
      
      // Verificar si el click fue en botones, enlaces o elementos de acción
      if (target.closest('button') || target.closest('a') || target.closest('.btn')) {
        // Si es en un botón o acción, solo seleccionar el documento para funcionalidad de modales
        seleccionar_documento(item);
        return;
      }
      
      // Si no es en un botón y la tabla es seleccionable, alternar la selección del checkbox
      const checkbox = (event.currentTarget as HTMLElement).querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) {
        // Simular click en el checkbox
        const changeEvent = new Event('change', { bubbles: true });
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(changeEvent);
      }
      
      // NO llamar a seleccionar_documento aquí ya que interfiere con la selección múltiple
      // La selección se maneja a través del checkbox y onSelectionChange
    };

    // Función para limpiar selección desde el padre
    const limpiarSeleccionTabla = () => {
      if (dataTableRef.value && dataTableRef.value.limpiarSeleccion) {
        dataTableRef.value.limpiarSeleccion();
      }
      documentosSeleccionados.value = [];
    };

    // -----------------------------------------------------------------


    const headers = ref([
      { text: '#', width: '3%', key: 'index', type: 'string' as const, sortable: false, filterable: false }, 
      { text: 'TIPO', width: '5%', key: 'tipopase', type: 'string' as const, sortable: false, filterable: false },
      { text: 'ASUNTO', width: '35%', key: 'asunto', type: 'string' as const, sortable: false, filterable: false },
      { text: 'Exp.', width: '5%', key: 'expediente', type: 'number' as const, sortable: true, filterable: false },
      { text: 'P.', width: '5%', key: 'procedencia', type: 'string' as const, sortable: false, filterable: false },
      { text: 'FOL', width: '5%', key: 'folios', type: 'number' as const, sortable: false, filterable: false },
      { text: 'REMITE', width: '15%', key: 'origen_nombre', type: 'string' as const, sortable: true, filterable: true },
      { text: 'RECIBIDO EL', width: '5%', key: 'pase_fecharecepcion', type: 'date' as const, sortable: false, filterable: false },
      { text: 'PDF', width: '2%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false },
      ...(Usuario.value.rol_id !== 2 ? [{ text: '', width: '4%', key: 'acciones', type: 'string' as const, sortable: false, filterable: false }] : []),
    ]);

    const checkValue = (value: string | number | null | undefined): string => {
        return value ? value.toString() : 'N/A';
    };

    const resetear= () =>{
      CargarExpedientes();
      
    };

    onMounted(async () => {
        CargarExpedientes();
        FunList.load_Destinos();
    });

    const btn_devolverdocumento=()=>{
      resetear_Formulario();
      if(documento_unico_seleccionado.value.idpase !==0){
        PaseDevolver.value.idpase           = documento_unico_seleccionado.value.idpase;
        PaseDevolver.value.buzonorigen_id   = Usuario.value.buzon_id;
        PaseDevolver.value.buzondestino_id  = documento_unico_seleccionado.value.origen_id;
        PaseDevolver.value.tipopase      = "Original";
        PaseDevolver.value.proveido      = FrmMotivo.value;
        PaseDevolver.value.observacion   = "";
        PaseDevolver.value.estadopase    = 'Enviado';
        PaseDevolver.value.documento_id  = documento_unico_seleccionado.value.documento_id;
        PaseDevolver.value.usuario_id    = Usuario.value.id.toString();
        PaseDevolver.value.usuarionombre = Usuario.value.username;
        PaseDevolver.value.idpase_previo = documento_unico_seleccionado.value.idpase;
        PaseDevolver.value.primogenio_id = documento_unico_seleccionado.value.primogenio_id;
        openModal(documento_unico_seleccionado.value)
      }else{
        Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
      }
    }


    const btn_Derivardocumento=()=>{
      console.log("Estado de Derivacion: ",DocumentoNuevo.value);
      resetear_Formulario();
      if(documento_unico_seleccionado.value.idpase!==0){
        console.log("Estado de Derivacion: ",documento_unico_seleccionado.value);
        PaseDerivar.value.buzonorigen_id  = Usuario.value.buzon_id;
        PaseDerivar.value.tipopase        = "Original";
        PaseDerivar.value.proveido        = FrmMotivo.value;
        PaseDerivar.value.observacion     = "";
        // if(Usuario.value.rol_id==='2'){
          PaseDerivar.value.estadopase    = 'Enviado';
        // }else{
          // PaseDerivar.value.estadopase = 'Enviado';
        // }
        
        PaseDerivar.value.documento_id = documento_unico_seleccionado.value.documento_id;
        PaseDerivar.value.usuario_id= Usuario.value.id.toString();
        PaseDerivar.value.usuarionombre= Usuario.value.username;
        PaseDerivar.value.idpase_previo = documento_unico_seleccionado.value.idpase;
        PaseDerivar.value.tipoaccion = "Pase";
        PaseDerivar.value.primogenio_id = documento_unico_seleccionado.value.primogenio_id;
        // Modificación de Documento a Derivar ---------------------------------------------
        DocumentoNuevo.value.tipodocumento_id=1;
        if(Usuario.value.rol_id===2 || Usuario.value.rol_id===8){
          DocumentoNuevo.value.estado = "Enviado";
          console.log("Estado de Derivacion: ",DocumentoNuevo.value.estado);
        }else{
          DocumentoNuevo.value.estado = "Iniciado";
          console.log("Estado de Derivacion: ",DocumentoNuevo.value.estado);
        }
        DocumentoNuevo.value.asunto = documento_unico_seleccionado.value.asunto;
        DocumentoNuevo.value.folios = documento_unico_seleccionado.value.folios;
        DocumentoNuevo.value.pdf_principal = documento_unico_seleccionado.value.pdf_principal;
        DocumentoNuevo.value.pdf_anexo1 = documento_unico_seleccionado.value.pdf_anexo1;
        DocumentoNuevo.value.pdf_anexo2 = documento_unico_seleccionado.value.pdf_anexo2;
        //Asignandole el Primogenio ---------------------------------------------------------
        DocumentoNuevo.value.referencias_id = documento_unico_seleccionado.value.primogenio_id.toString();
        obtener_correlativo();
        openModal_derivar(documento_unico_seleccionado.value);
      }else{
        Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
      }
    }

    // const btn_Archivardocumento=()=>{
    //   if(documento_unico_seleccionado.value.idpase!==0){
    //     PaseArchivar.value.idpase= documento_unico_seleccionado.value.idpase;
    //     PaseArchivar.value.buzonorigen_id = Usuario.value.buzon_id;
    //     PaseArchivar.value.buzondestino_id = Usuario.value.buzon_id;
    //     PaseArchivar.value.tipopase = "Original";
    //     PaseArchivar.value.proveido = FrmMotivoArchivo.value;
    //     PaseArchivar.value.observacion = "";
    //     // PaseArchivar.value.estadopase = 'Archivo_porconfirmar';
    //     if(Usuario.value.rol_id===8){
    //       PaseArchivar.value.estadopase = 'Archivo';
    //     }else{
    //       PaseArchivar.value.estadopase = 'Archivo_porconfirmar';
    //     }
    //     PaseArchivar.value.documento_id = documento_unico_seleccionado.value.documento_id;
    //     PaseArchivar.value.usuario_id= Usuario.value.id.toString();
    //     PaseArchivar.value.usuarionombre= Usuario.value.username;
    //     PaseArchivar.value.idpase_previo = documento_unico_seleccionado.value.idpase;
    //     PaseArchivar.value.primogenio_id = documento_unico_seleccionado.value.primogenio_id;
    //     openModal_archivar()
    //   }else{
    //     Alerta.Advertencia("Advertencia","Debe Seleccionar un registro primero");
    //   }
    // }

    // Nueva función para archivar múltiples documentos
    const btn_ArchivarDocumentos = () => {
      if (documentosSeleccionados.value.length === 0) {
        Alerta.Advertencia("Advertencia", "Debe seleccionar al menos un documento para archivar");
        return;
      }
      
      // Si hay solo un documento, usar el comportamiento original
      // if (documentosSeleccionados.value.length === 1) {
      //   btn_Archivardocumento();
      //   return;
      // }
      
      // Para múltiples documentos, abrir modal con información del primer documento como referencia
      const primerDocumento = documentosSeleccionados.value[0];
      PaseArchivar.value.idpase = primerDocumento.idpase;
      PaseArchivar.value.buzonorigen_id = Usuario.value.buzon_id;
      PaseArchivar.value.buzondestino_id = Usuario.value.buzon_id;
      PaseArchivar.value.tipopase = "Original";
      PaseArchivar.value.proveido = FrmMotivoArchivo.value;
      PaseArchivar.value.observacion = "";
      if(Usuario.value.rol_id===8){
          PaseArchivar.value.estadopase = 'Archivo';
        }else{
          PaseArchivar.value.estadopase = 'Archivo_porconfirmar';
        }
      PaseArchivar.value.documento_id = primerDocumento.documento_id;
      PaseArchivar.value.usuario_id = Usuario.value.id.toString();
      PaseArchivar.value.usuarionombre = Usuario.value.username;
      PaseArchivar.value.idpase_previo = primerDocumento.idpase;
      PaseArchivar.value.primogenio_id = primerDocumento.primogenio_id;
      openModal_archivar();
    }

    const openModal = (doc:DocumentoPase) => {
      const modalElement = document.getElementById('modal_PASE');
      if (modalElement) {
        const modal = new Modal(modalElement);
        seleccionar_documento(doc);
        modal.show();
      }
    };

    const closeModal = () => {
      const modalElement = document.getElementById('modal_PASE');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };

    const openModal_derivar = (doc:DocumentoPase) => {
      const modalElement = document.getElementById('modal_PASE_DERIVAR');
      if (modalElement) {
        const modal = new Modal(modalElement);
        seleccionar_documento(doc);
        modal.show();
      }
    };

    const closeModal_derivar = () => {
      const modalElement = document.getElementById('modal_PASE_DERIVAR');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };

    const openModal_archivar = () => {
      const modalElement = document.getElementById('modal_PASE_ARCHIVAR');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    };

    const closeModal_archivar = () => {
      const modalElement = document.getElementById('modal_PASE_ARCHIVAR');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
        if (modal) modal.hide();
      }
    };
    const iddocumento_unico_seleccionado_dobleclik = ref(0);
    const openRuta_modal = (idoc:number) => {
      iddocumento_unico_seleccionado_dobleclik.value = idoc;
      const modalElement = document.getElementById('ruta_Modal');
      if (modalElement) {
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
    };

    const handleDoubleClick = (iddoc:number) => {
      openRuta_modal(iddoc);
    };

    // DERIVAR DOCUMENTO CON PROVEIDO
    //------------------------------------
    const listaDestinos = ref<Destino_Oficina[]>([]);
    
    const Array_oficina_original  = ref<Destino_Oficina[]>([]);
    const error_destino_original  = ref("");
    const Array_oficina_copia     = ref<Destino_Oficina[]>([]);
    //Destinos
    const Original  = ref<Destino_Oficina>();


  
    onMounted(async () => {
        cargar_Destinos();
    });

    
    const checkIfDarkTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };  
    

  
    const cargar_Destinos = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_destinos_general(Usuario.value.oficina_id);
        if(RespuestaJSON.success){
            listaDestinos.value = RespuestaJSON.data;
        }else{
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
          NProgress.done();
      }
    };

    // Cargar Destinos
    const obtener_correlativo = async () => {
      NProgress.start();
      try {
        const RespuestaJSON = await get_correlativo_nrodocumento_buzon("Interno",DocumentoNuevo.value.tipodocumento_id, Usuario.value.buzon_id);
        if(RespuestaJSON.success){
          DocumentoNuevo.value.numeracion_tipodoc_oficina = RespuestaJSON.data;
          DocumentoNuevo.value.numerodocumento = RespuestaJSON.data;
        }else{
            Notif.Error(RespuestaJSON.message);
        }
      } catch (error) {
          Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
      }finally {
          NProgress.done();
      }
    };

    // ----------------------------------------------------------
    const Add_Original = () => {
      if (Original.value) {
        const exists = Array_oficina_original.value.some(
          oficina => oficina.id === Original.value?.id
        );
        if (exists) {
          Notif.Advertencia("El destino ya ha sido agregado");
        } else {
          Array_oficina_original.value.push(Original.value);
          // Notif.Success("Destino agregado correctamente");
        }
      } else {
        Notif.Error("Seleccione un destino");
      }
    };
    // ----------------------------------------------------------
    const Remove_Original = (id: string) => {
      const index = Array_oficina_original.value.findIndex(oficina => oficina.id === id);
      if (index !== -1) {
        Array_oficina_original.value.splice(index, 1); // Elimina el elemento encontrado
        // Notif.Success("Elemento eliminado correctamente");
      } else {
        Notif.Error("Elemento no encontrado");
      }
    };

    // REGISTRAR DOCUMENTO  -------------------------------------------------------------
    const validateFieldDocumentos =  (field: string, value: any) => {
      switch (field) {
        case 'asunto':
          errorsDoc.value[field] = value ? '' : 'Asunto obligatorio';
          break;
      }
    };
    watch(() => DocumentoNuevo.value.asunto, (newVal) => validateFieldDocumentos('asunto', newVal));
    
    // ----------------------------------------------------------        
    const validateDocumento = () => {
      Object.keys(DocumentoNuevo.value).forEach(key => {
        validateFieldDocumentos(key, (DocumentoNuevo.value as any)[key]);
      });
      console.log(errorsDoc.value);
      return !Object.values(errorsDoc.value).some(error => error);
    };


    // -----------------------------------------------------------
    const Registrar_Derivacion_Proveido = async () => {   
        if (!validateDocumento()) {
            Notif.Error("Debe completar todos los campos del documento");
            return;
        }
        if (Array_oficina_original.value.length===0) {
            error_destino_original.value="Elige al menos 1 destino"
            Notif.Error("Debes agregar al menos un destino");
            return;
        }else{
            error_destino_original.value="";
        }          
        try {
            NProgress.start();
            isSending_derivar.value = true;
            // DocumentoNuevo.value.estado="Iniciado";
            DocumentoNuevo.value.cabecera =  "Proveido - N° " +
                                              DocumentoNuevo.value.numeracion_tipodoc_oficina  + " - " + anioactual.value  + " - " + Usuario.value.buzon_sigla  + " -MDVO/D";

            const RespuestaJSON = await add_documentoInterno(DocumentoNuevo.value, Array_oficina_original.value, Array_oficina_copia.value, PaseDerivar.value.idpase_previo);
            if (RespuestaJSON.success) {
                Alerta.Sucessfull_timer("Completado","Documento agregado correctamente");
                CargarExpedientes();
                resetear_Formulario();
                limpiarSeleccionTabla();
                closeModal_derivar();
            } else {
                Notif.Error(RespuestaJSON.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            NProgress.done(); 
            isSending_derivar.value = false;
        }
    };

    //resetear
    const resetear_Formulario = () => {
      DocumentoNuevo.value = initialize_CrearDocumentoExterno();
      errorsDoc.value = initialize_CrearDocumentoErrores();
      Array_oficina_original.value = [];
      Array_oficina_copia.value = [];
      error_destino_original.value = "";
      FrmMotivo.value = "";
      FrmMotivoArchivo.value = "";
      Original.value = undefined; // Resetear el valor del multiselect
      
    };

    // Función para abrir modal de correo
    const openModalCorreo = async () => {
      if(documento_unico_seleccionado.value.idpase !== 0){
        iddocumento_unico_seleccionado_dobleclik.value = documento_unico_seleccionado.value.primogenio_id;
        
        // Pequeño delay para asegurar que el ID se actualice
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const modalElement = document.getElementById('modalcorreo_administrado');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      } else {
        Alerta.Advertencia("Advertencia","Debe seleccionar un documento primero");
      }
    };

    return {
      headers,
      HOST_URL,
      FormatFecha,
      checkValue,
      CargarExpedientes,Lista_documentos,
      list_meses,
      resetear,
      NumberFormat,
      Usuario,
      openModal,closeModal,FrmMotivo, FrmMotivoArchivo,DestinoOficina,StoreList,RecepcionarDocumento,documento_unico_seleccionado,
      anioactual,
      seleccionar_documento,
      btn_devolverdocumento,proveido,
      PaseDevolver, DevolverDocumento,
       PaseDerivar,
      on_changeOficina, btn_Derivardocumento,
      Pase_Archivar_Documento,openModal_archivar, closeModal_archivar,  btn_ArchivarDocumentos, Archivar_Multiples_Documentos, PaseArchivar,
      iddocumento_unico_seleccionado_dobleclik,handleDoubleClick,
      //derivar
      DocumentoNuevo,
      Registrar_Derivacion_Proveido,
      Pase,
      Original,
      Array_oficina_original, 
      Add_Original, Remove_Original,   
      errorsDoc,
      listaDestinos,
      error_destino_original,
      obtener_correlativo, isSending_derivar,
      isSending_archivo, isSending_devolver, isLoading,
      // Selección múltiple
      documentosSeleccionados,
      onSelectionChange,
      handleRowClick,
      limpiarSeleccionTabla,
      dataTableRef,
      limpiar_seleccion,
      openModalCorreo
      
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.text-sentence {
    text-transform: lowercase; /* Capitaliza la primera letra de cada palabra */
}

.text-sentence::first-letter {
    text-transform: uppercase; /* Asegura que solo la primera letra de la oración esté en mayúscula */
}
.handpointer{
  cursor: pointer;
}

/* Asegurar que el foco de teclado sea visible por encima de otros estilos */
.keyboard-focused {
  background-color: #fef3c7 !important; /* bg-yellow-100 */
  /* border: 2px solid #f59e0b !important;  */
  /* box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3) !important; */
  position: relative !important;
  z-index: 10 !important;
}

.keyboard-focused td {
  background-color: inherit !important;
}
</style>





