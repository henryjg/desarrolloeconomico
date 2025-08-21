<template>
  <!-- <br> -->
  <!-- {{ Usuario }} - {{ frm_tipodocumento_general }} -->
  <!-- <br>USUARIO<br>
  {{ Usuario }} -->
  <!-- <br><br>DOCUMENTO<br>
    {{ DocumentoNuevo }}

    <br><br>ORIGINAL<br>
    {{ Array_oficina_original }} 
    <br><br>REFERENCIAS<br>
    {{ Array_referencias_elegidas }}
   <br>
  {{ idpase }} -{{ idreferencia }}

  <br><br>
  {{ ListaSinProveido_general }} -->



  <div class="row pt-3">
    <div class="col-12">
      <h4 class="text-secondary"><iconDocument class="wid-25 "/>  Nuevo Documento </h4>
      
    </div>
  </div>

  <div class="row">
    <div class="col-12 bg-verdeoliva-4">
      <div class="card pb-2 mb-2  rounded-1 shadow-sm">
          <div class="card-header py-1 bg-blue-700 rounded-top-1 text-white">
                <i class="ph-duotone ph-navigation-arrow p-r-10 "></i>Destinatarios
          </div>

          
          
          <div class="card-body row py-2 ">
                <!-- <div class="col-md-12">
                  <div class="d-flex mb-2">
                      <label class="form-label align-content-center f-13 p-r-15 text-gray-600 f-w-600  wid-95">Remitente:</label>
                      <input disabled class="form-control" :value="Usuario.buzon_nombre">
                  </div>
                </div> -->
                <!-- Fila 2------ -->
                <div class="col-md-9 mb-0 ">
                  <div class="d-flex">
                      <label class="form-label align-content-center f-13 p-r-15 text-gray-600 f-w-600 wid-100">Original:</label>
                      <multiselect v-model="Original"
                                  @update:modelValue="Add_Original" 
                                  class="f-6"
                                  label="destino_usuario"
                                  track-by="id"
                                  placeholder="Seleccionar"
                                  selectLabel=""
                                  deselectLabel=""
                                  selectedLabel=""
                                  :options="filteredOriginalDestinos">
                      </multiselect>
                  </div>
                  <ErrorMessage :error="error_destino_original" />
                  
                  <div class="px-0 py-2  rounded-1 mt-1">
                 
                    <label class="form-label align-content-center f-13 p-r-15 text-gray-600 f-w-600 wid-100">{{ Array_oficina_original.length }} Oficinas</label>
                    <div  v-if="Array_oficina_original.length>0" class="align-content-center f-14 f-w-500 alert alert-secondary b-gray mb-0 py-1 px-2">
                      <span 
                        class="badge text-white  bg-blue-600 mx-1 text-md py-0" 
                        v-for="Item in Array_oficina_original" :key="Item.id" style="margin-top: 1px; margin-bottom: 1px;">
                        {{ Item.destino_usuario }} - {{ Item.sigla}} 
                            <div class="btn f-4 text-white btn-sm my-0 py-0" @click="Remove_Original(Item.id)" >
                                <i class="fa fa-trash my-0 py-0" style="font-size:10px"></i>
                            </div> 
                      </span>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      
    </div>
  </div>


   
  <div class="row g-2 pt-1">
    <div class="col-md-7">

        <!-- CARD INFORMACIÓN DEL DOCUMENTO  -->
        <div class="card  rounded-1 shadow-sm mb-1">
          <!-- {{ signedPdfUrl }}
          <br>
          {{ pdfUrl }} -->
          <!-- <div class="btn btn-outline-secondary btn-sm py-1 mx-1 d-flex" @click="openFirmaModal" >
            <i class="ph-duotone ph-fingerprint-simple Firmar p-r-5" style="font-size:17px"></i> Firmar </div> -->
          <div class="card-header py-1 bg-blue-700 rounded-top-1 text-white">
            <i class="ph-duotone ph-clipboard-text p-r-10"></i>Documento
          </div>
          <div class="card-body p-3">           
            <!-- -------------- -->
   
            <!-- Fila 1------ -->
            <div class="row mb-1 g-2">
              <div class="col-md-5">
                <label class="form-label f-13">Tipo de documento</label>
                <div class="row g-1">
                  <div class="col-md-12">
                    <multiselect v-model="frm_tipodocumento"
                                  @update:modelValue="on_changeTipoDocumento" 
                                  class="f-6"
                                  label="nombre"
                                  track-by="id"
                                  placeholder="Seleccionar"
                                  selectLabel=""
                                  deselectLabel=""
                                  selectedLabel=""
                                  :options="ListaSinProveido_TipoDocumento">
                    </multiselect>
                    <ErrorMessage :error="errorsDoc.tipodocumento_id" />
                  </div>
                </div>
              </div>
              <!-- -------------- -->
              <div class="col-md-3">
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
              <!-- ------ -->
              <div class="col-md-4" v-if="DocumentoNuevo.prioridad==='Urgente' && DocumentoNuevo.proyectar">
                  <label class="form-label f-13">Vencimiento</label>
                  <input type="date" v-model="DocumentoNuevo.fechavencimiento" class="form-control" >
              </div> 
              <!-- ------ -->
              
            </div>
            <!-- Fila 2------ -->
            <div class="row g-1">
              <div class="col-md-3">
                <label class="form-label text-gray-600 f-13  mb-0">Número</label>
                <input maxlength="6" type="text" readonly v-model="DocumentoNuevo.numerodocumento" class="form-control" />
                <ErrorMessage :error="errorsDoc.codigo" />
              </div>
              <div class="col-md-2">
                <label class="form-label text-gray-600 f-13  mb-0">Año</label>
                <input readonly type="text" v-model="anioactual" class="form-control" />
              </div>
              <div class="col-md-3">
               <label class="form-label text-gray-600 f-13  mb-0">Nro Folio</label>
                <div class="input-group input-group-sm ">
                  <button type="button" 
                    :class="errorsDoc.folios!=='' ? 'bg-red-500 text-white b-danger' : 'btn-secondary'"
                    class="btn btn-secondary btn-sm" @click="DocumentoNuevo.folios > 1 && DocumentoNuevo.folios--">-</button>
                  <input
                    type="number"
                    min="1"
                    class="form-control text-center no-arrows"
                    v-model="DocumentoNuevo.folios"
                    :style="errorsDoc.folios!=='' ? 'border-color: red; border-width: 1px; border-style: solid; border-radius: 0;' : ''"
                  />
                  <button type="button" 
                    :class="errorsDoc.folios!=='' ? 'bg-red-500 text-white b-danger' : 'btn-secondary'"
                    class="btn btn-secondary btn-sm" @click="DocumentoNuevo.folios++">+</button>
                </div>
                
                <!-- <input maxlength="6" type="text" v-model="DocumentoNuevo.folios" class="form-control" /> -->
                <ErrorMessage :error="errorsDoc.folios" />
              </div>

              
              
              
            </div>
            <!-- Fila 3------ -->
            <div class="row">
              <div class="col-md-12">
                <label class="form-label text-gray-600 f-13 ">Asunto</label>
                <textarea maxlength="249" type="text" v-model="DocumentoNuevo.asunto" class="form-control" ></textarea>
                <ErrorMessage :error="errorsDoc.asunto" />
              </div>
            </div>
          </div>
        </div>
        <!-- FIN CARD DOCUMENTO -->
         

        <!-- CARD REFERENCIAS ------------------- -->
      <div class="card  rounded-1 shadow-sm">
        <div class="card-header py-1 bg-blue-700 rounded-top-1 text-white">
          <i class="fa fa-folder-open p-r-10"></i>Referencias
          <div class="btn btn-success btn-sm rounded-3 py-0 px-3 mx-4" @click="openModal">
                <i class="fa fa-search"></i> Agregar
            </div>
        </div>
        <div class="card-body py-2">
          <div class="px-0 py-2  rounded-1">
            
            <!-- REFERENCIAS SELECIONADAS -->
            <div v-if="Array_referencias_elegidas.length>0">
              <label class="form-label f-13">Documentos Referenciados:</label>
              
              <div class="alert alert-secondary  bg-opacity-10" >
                <!-- ------------------- -->
                <table  class="table table-hover table-xs pb-0 mb-0 f-13" id="pc-dt-simple">
                  <thead>
                      <tr >
                          <th class=" text-sm" width="3%">#</th>
                          <th class=" text-sm" width="45%">Documento</th>
                          <th class=" text-sm" width="35%">Origen</th>
                          <th class=" text-sm" width="10%">DOC</th>
                          <th class=" text-sm" width="5%" ></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(Item,index) in Array_referencias_elegidas" :key="Item.iddoc">
                        <td class="py-0">{{ index+1 }}</td>
                        <td class="py-0">
                          <p class="mb-0 f-w-600 text-uppercase text-md">{{ Item.cabecera }}</p>
                          <p class="mb-0  text-sm text-wrap">{{ Item.asunto }}</p>
                        </td>
                        <td class="py-0 text-wrap text-md">{{ Item.buzonorigen_nombre }}</td>
                        <td  class="px-2 mx-0 text-left">
                            <a v-if="Item.pdf_principal!==null"  :href="Item.pdf_principal" target="_blank"  class="btn btn-danger btn-sm">
                              <i class="fa fa-file-pdf f-20"></i> 
                            </a>
                            <a v-if="Item.pdf_anexo1!==null"  :href="Item.pdf_anexo1" target="_blank"  class="btn btn-danger bg-gray-800 border-0 btn-sm mx-1">
                              <i class="fa fa-file-pdf text-white f-20"></i> 
                            </a>
                            <a v-if="Item.pdf_anexo2!==null"  :href="Item.pdf_anexo2" target="_blank"  class="btn btn-danger  bg-gray-600 border-0 btn-sm">
                              <i class="fa fa-file-pdf text-white f-20"></i> 
                            </a>
                        </td>
                        <td class="text-center py-0">
                          <div v-if="idreferencia !==Item.iddoc" class="btn f-4 btn-link-hover-danger btn-sm py-0" @click="Remove_AgregarReferencia(Item.iddoc)" >
                            <i class="fa fa-trash" style="font-size:10px"></i> 
                          </div> 
                        </td>
                    </tr>
                  </tbody>
                </table>
                <!-- ------------------- -->
              </div>
            </div>
            <div v-else class="alert alert-secondary  bg-opacity-10" >
                Sin referencias
            </div>

          </div>                       
        </div>
      </div>
      <!-- FIN CARD REFERENCIAS ------------------- -->
      
        
    </div>

    <div class="col-md-5">
      <!-- INICIO CARD ADJUNTO -->
      
      <!-- CARD ADJUNTO ------------------- -->

      <div class="card  rounded-1 shadow-sm">
          <div class="card-header py-1 bg-blue-800 rounded-top-1 text-white d-flex">
              <div class="w-100"><i class="fa fa-folder-open p-r-10"></i>Adjuntos</div>
          </div>
          
          <div class="card-body px-3 py-2"> 
                  <!-- <label class="form-label text-gray-600 f-13 ">Crear Documento</label> -->
                  <div class="d-flex w-75">
                    <div  class="d-flex">
                      <div v-if="DocumentoNuevo.pdf_principal===''" class="btn btn-danger border-0 bg-red-300  btn-sm rounded-1 px-3 py-1 flex-shrink-1 d-flex mx-1"  @click="openModal_Generar">
                          <i class="fa fa-plus  align-content-center p-r-5 "></i> Crear Documento
                      </div>
                    </div>
                    <div v-if="Array_archivos.length!==3"
                          class="btn btn-secondary  btn-sm rounded-1 px-3 py-1 flex-shrink-1 d-flex"  @click="openModal_Adjunto">
                          <i class="fa fa-plus  align-content-center p-r-5 "></i> Adjuntar
                    </div>
                  </div>
              <!-- Inicio: ------ -->
              <div class="px-0 py-2  rounded-1 mt-1">
                <div v-if="Array_archivos.length===0" class="alert alert-secondary text-secondary f-13">No existe archivos adjunto.</div>
                <div v-else v-for="Item in Array_archivos" :key="Item.id" class="d-flex alert py-0 mb-1 alert-light" >
                    <div class="w-100 align-content-center">
                        <a :href="Item.url" class="text-secondary f-w-500 f-13" target="_blank">
                          <img src="../../../assets/images/document.png" class="wid-25" >  {{ Item.nombrefile }}
                        </a>
                    </div>
                   
                    <div v-if="Usuario.rol_id===1" class="flex-shrink-1">
                    <!-- <div class="flex-shrink-1"> -->
                      <div v-if="Item.estado_firma==='Sin Firma'" class="btn btn-outline-secondary btn-sm py-1 mx-1 d-flex" @click="openFirmaModal(Item)">
                        <i class="ph-duotone ph-fingerprint-simple Firmar p-r-5" style="font-size:17px"></i> Firmar
                      </div>
                    </div>
                    
                    <div class="flex-shrink-1 ">
                        <div class="avtar avtar-xs btn-link-danger btn-pc-default handpointer" @click="Remove_Adjunto(Item.id)" >
                            <i class="fa fa-trash" style="font-size:12px"></i> 
                        </div> 
                    </div>
                </div>
              </div>
              <!-- Fin: ------ -->
          </div>
      </div>
      <!-- FIN CARD ADJUNTO -->
    </div>    
  </div>


  
  
  
  <div class="d-flex gap-2 g-1 justify-content-center">
        <!-- -------------------------------------------- -->
        <div class="text-center" >
          <button :disabled="isSending" @click="RegistrarDocumento" class="btn btn-lg w-100  btn-success mt-0 m-auto text-nowrap">
              <i class="ph-duotone ph-floppy-disk p-r-5"></i>Enviar Documento</button>
        </div>
  </div>   
 

<!-- ------------------------------------------- -->
<!-- ----- MODAL 1 ------- -->
<!-- ------------------------------------------- -->
<div class="modal modal-lg fade" id="add_adjuntoModal" tabindex="-1" aria-labelledby="add_adjuntoModalLabel" 
      aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header py-2">
            <h5 class="modal-title py-0" id="add_adjuntoModalLabel">
              <i class="ph-duotone ph-paperclip p-r-15"></i>Agregar Adjunto
            </h5>
            <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
              <!--  ------ -->
              <div class="mb-1">
                <label class="form-label text-gray-600 f-13  mb-0">Tipo de Archivo</label>
                <select v-model="ArchivoTemporal.tipo_archivo" class="form-select">
                    <option v-if="DocumentoNuevo.pdf_principal===''" value="Documento Principal">Documento Principal</option>
                    <option v-if="DocumentoNuevo.pdf_anexo1===''" value="Anexo1">Anexo 1</option>                        
                    <option v-if="DocumentoNuevo.pdf_anexo2===''" value="Anexo2">Anexo 2</option>                        
                </select>
              </div>
              <label class="form-label text-gray-600 f-13  mb-0">Archivo</label>
              <div class="file-input-wrapper b-gray rounded-1 py-3 text-center w-100">                    
                    <!-- ----------------------------------------------- -->
                     <!-- {{ DocumentoNuevo.proyectar }} -->
                    <input 
                            type="file" 
                            @change="onFileSelected"  
                            @dragover.prevent 
                            @drop.prevent="handleDropFile" 
                            accept="application/pdf,
                                    application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                    application/vnd.ms-excel,
                                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                    application/vnd.ms-powerpoint,
                                    application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                    application/zip,
                                    application/x-rar-compressed,
                                    image/vnd.adobe.photoshop,
                                    .dwg,.ai,.pbix"
                            class="file-input ">
                    <!-- ----------------------------------------------- -->
                    <div class="p-1">
                      <i class="ph-duotone ph-file-pdf f-30"></i>
                      <div v-if="file_documento" class="uploaded-files">
                          <p>{{ file_documento.name }}</p>
                      </div>
                      <p v-else class="f-14 f-w-600">Arraste ó Seleccione un archivo</p>                      
                    </div>
                    <!-- ----------------------------------------------- -->
              </div>
              <div id="loadingfile" style="position: relative; height: 4px;"></div>
              <button :disabled="isUploading" @click="SubirArchivo" class="btn w-100  btn-success mt-0 m-auto mt-1">
                <i class="ph-duotone ph-check-circle p-r-5"></i>Agregar</button>               
              <!-- Fin:  ------ -->
        </div>
    </div>
  </div>
</div>


  <!-- ------------------------------------------- -->
  <!-- ----- MODAL ------- -->
  <!-- ------------------------------------------- -->
  <div class="modal modal-xl fade" id="add_ReferenciaModal" tabindex="-1" aria-labelledby="add_ReferenciaModalLabel" 
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header py-2">
              <h5 class="modal-title py-0" id="add_ReferenciaModalLabel">
                <i class="fa fa-plus p-r-15"></i>Agregar Referencia
              </h5>
              <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body py-1">
            <!-- CUERPO *************** -->
            <!-- Formulario de búsqueda ------ -->
            <div class="row g-1">
              <div class="col-md-2 px-1">
                <label class="form-label text-gray-600 f-13 mb-0">Número</label>
                <input type="text" v-model="Referencia.numerodocumento" class="form-control " />
              </div>
              <div class="col-md-3">
                <label class="form-label text-gray-600 f-13  mb-0">Documento</label>
                <multiselect 
                              v-model="frm_referencia_tipodoc"
                              @update:modelValue="on_changeReferencia_TipoDocumento"
                              class="f-6"
                              label="nombre"
                              track-by="id"
                              placeholder="Seleccionar"
                              selectLabel=""
                              deselectLabel=""
                              selectedLabel=""
                              :options="StoreList.ListaTipoDocumentos">
                </multiselect>
              </div>
              <div class="col-md-1 px-1">
                <label class="form-label text-gray-600 f-13  mb-0">Año</label>
                <select class="form-select" v-model="Referencia.anio">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="col-md-5">
                <label class="form-label text-gray-600 f-13  mb-0">Servidor</label>
                <multiselect  v-model="frm_referencia_usuariodestinoid"
                              @update:modelValue="on_changeReferencia_Oficina"
                              class="f-6"
                              label="destino"
                              track-by="id"
                              placeholder="Seleccionar"
                              selectLabel=""
                              deselectLabel=""
                              selectedLabel=""
                              :options="listaDestinos">
                </multiselect>
              </div>
              <div class="col-md-1 align-content-end">
                <div class="btn btn-success btn-sm rounded-3 w-100" @click="BuscarReferencias">
                  <i class="fa fa-search"></i> Buscar
                </div>
              </div>
            </div>
            <!-- RESULTADOS ---------------- -->
            <div v-if="Array_referencias.length>0">
                <label class="form-label f-13">Resultado de bùsqueda:</label>
                <div class="alert alert-secondary  bg-opacity-10" >
                    <!-- ------------------- -->
                    <DataTable
                      :headers="headers"
                      :items="Array_referencias"
                      :filterKeys="['numerodocumento', 'usrorigen_username', 'asunto', 'tipodocumento_nombre']"
                      :clasehead="'bg-info-100'"
                    >
                      <template #default="{ item, index, currentPage, itemsPerPage }">
                        <tr>
                          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                          <td class="py-0">{{ item.cabecera }}</td>
                          <td class="py-0 f-w-600 text-wrap">{{ item.buzonorigen_nombre }}</td>
                          <td class="py-0 text-wrap f-12 f-w-500">{{ item.asunto }}</td>
                          <td class="text-center py-0">
                            <div class="btn f-4 btn-success btn-sm py-0" @click="Add_Referencia(item)" >
                              <i class="fa fa-check" style="font-size:10px"></i> Elegir
                            </div> 
                          </td>
                        </tr>
                      </template>
                    </DataTable>                  
                    <!-- ------------------- -->
                </div>
            </div>
            <!-- ********************** -->
          </div>
          <div class="modal-footer py-0">
              <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
      </div>
    </div>
  </div>

  <!-- ----- MODAL GENERAR DOCUMENTO  ------- -->
  <!-- ------------------------------------------- -->
  <div class="modal modal-xl fade" id="add_GenerarModal" tabindex="-1" aria-labelledby="add_Documento_generadoLabel" 
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header py-2">
              <h5 class="modal-title py-0" id="add_Documento_generadoLabel">
                <i class="fa fa-plus p-r-15"></i>Agregar Documento
              </h5>
              <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body py-1">
            <!-- CUERPO *************** -->
            <div class="row g-2">
              <!-- {{ Array_referencias_elegidas }} -->
              <div class="col-6">
                <!-- ------------------------ -->
                <label class="form-label f-13 pb-0">Documento</label>
                <div v-if="StoreList.ListaTipoDocumentos" class=" align-content-center f-14 f-w-500 alert alert-secondary b-gray mb-0 py-1 px-2">
                    {{ StoreList.obtenerNombrePorId(DocumentoNuevo.tipodocumento_id.toString()) }} -
                    N° {{ DocumentoNuevo.numeracion_tipodoc_oficina }} - {{ anioactual }} - {{ Usuario.buzon_sigla }} - MDVO
                </div>
                <!-- ------------------------ -->
                <label class="form-label f-13 pb-0">Remitente:</label>
                <div  class=" align-content-center f-14 f-w-500 alert alert-secondary b-gray py-1 px-2">
                    {{ Usuario.oficina_nombre }}
                </div>
                <!-- ------------------------ -->
                <div v-if="Array_referencias_elegidas.length>0">
                  <label class="form-label f-13 pb-0">Referencias:</label>
                  <div class="align-content-center f-14 f-w-500 alert alert-secondary b-gray mb-0 py-1 px-2">
                    <span
                       class="badge bg-secondary mx-1 text-md"
                       v-for="ItemRef in Array_referencias_elegidas" :key="ItemRef.iddoc" style="margin-top: 1px; margin-bottom: 1px;">
                       <div v-if="ItemRef.procedencia!=='Interno'"> Exp. {{ ItemRef.numerodocumento }} - {{ ItemRef.anio }}</div>
                       <div v-else>N° {{ DocumentoNuevo.numeracion_tipodoc_oficina }} - {{ anioactual }} - {{ Usuario.buzon_sigla }} - MDVO/D</div>
                    </span>
                  </div>
                </div>
                <!-- ----------------------- -->
              </div>
              <div class="col-6">
                <!-- ------------------------ -->
                <label class="form-label f-13 pb-0">Para:</label>
                <div class="align-content-center f-14 f-w-500 alert alert-secondary b-gray mb-0 py-1 px-2">
                  <span 
                     class="badge bg-secondary mx-1 text-md" 
                     v-for="Item in Array_oficina_original" :key="Item.id" style="margin-top: 1px; margin-bottom: 1px;">
                     {{ Item.destino }}
                  </span>
                  
                </div>
              </div>
            </div>
            <!-- ------------------------------- -->        
            <div class="row g-1">
                <div class="col-md-12">
                  <label class="form-label f-13 ">Asunto</label>
                  <input maxlength="249" type="text" v-model="DocumentoNuevo.asunto" class="form-control" ></input>
                </div>
            </div>
            
             <!-- ------------------------------- -->        
            <label class="form-label f-13 mt-2">Herrammientas</label>
            <div class="alert alert-info py-1">
                <div class="row">
                    <div class="col-3">
                      <div class="d-flex">
                        <label class="form-label f-13 p-r-5 align-content-center ">Plantillas:</label>
                        <select class="form-select bg-light" id="tipoDocumento" v-model="selectedDocumento" @change="onDocumentoChange">
                            <option v-for="documento in listaDocumentos" 
                                :value="documento.documento">{{documento.tipo}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="btn btn-danger bg-red-300 py-1">
                        <i class="ph-duotone ph-eye p-r-5"></i>Vista Previa</div>
                    </div>
                </div>
            </div>
            <!-- RESULTADOS ---------------- -->
            <div class="row pt-0">
              <div class="col-12">
                <label class="form-label f-13 pb-0">Editor de Texto | CUERPO DEL DOCUMENTO:</label>
                <div  style="height: 400px;">
                  <QuillEditor content-type="html" v-model:content="editorDescripcion" :modules="modules" toolbar="minimal" style="min-height: 300px; max-height: 350px;"/>
                </div>
              
              </div>
            </div>
            <!-- ********************** -->
          </div>
          <div class="modal-footer py-0">
            
            
            <button :disabled="isgenering"  type="button" class="btn btn-success" @click="GenerarPDF" data-bs-dismiss="modal">Generar Documento</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          </div>
      </div>
    </div>
  </div>
  
  <!-- //----------------------------- -->
  <Modal_Firma
      :urlpdf="pdfUrl"
      :url-server="urlServer"
      @update:signed-pdf="handleSignedPdf"
    />
</template>

<script lang="ts">
import {  computed, onMounted, ref, watch } from 'vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';
import { Destino, Destino_Oficina,   } from '../../../types/interfaces';
import Alerta from '../../../utils/alertas';
import Notif from '../../../utils/notificaciones';
import NProgress from 'nprogress';
import { add_documentoInterno, get_resultadoreferencias, subir_adjunto, get_correlativo_nrodocumento_buzon, get_documentoCompleto_primerpase, add_documentoInterno_deoficina, subir_adjunto_especialista, get_correlativo_nrodocumento_buzon_oficinaprincipal } from '../../../services/DocumentoServices';
import { HOST_URL, ServerFirma } from '../../../config';
import Multiselect from 'vue-multiselect'
import { initializeUsuarioLog, type UsuarioLog } from '../../../types/interfaces';
import { usarAuthStore } from '../../../stores/autentificacionStore';
import { FormatFecha } from '../../../utils/FormatFecha';

import { Listas } from '../../../composables/ListasIndependientes';
import { ListasStore } from '../../../stores/listasStore';
import { initialize_SigaPase,  SigaPase, Adjunto, initialize_Adjunto, ReferenciaDoc, initialize_ReferenciaDoc, initialize_CrearDocumentoErrores, tipodocumento, initialize_tipodocumento, DocumentoFull, DocumentoExterno, initialize_CrearDocumentoExterno, initialize_DocumentoFull } from '../../../interfaces/documento.interface';
import { Modal } from 'bootstrap';
import { get_all_buzones_oficina } from '../../../services/DestinosServices';
const currentYear = new Date().getFullYear(); // Año actual
import DataTable from '../../../components/table/DataTable.vue';  

import { pdf_generar_documentotramite } from '../../../composables/generarPDF_formatos';
import { useRoute, useRouter } from 'vue-router';
import dataMarca from '../../../datos/data_marca.json';

import { QuillEditor, Delta } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'

import Modal_Firma from '../../../components/Modal_Firma.vue';
import iconDocument from '../../../components/icons/icon_newdocument.vue';
import iconFirma from '../../../components/icons/icon_firma.vue';

import * as pdfjsLib from 'pdfjs-dist';
import { Console } from 'console';
const isDarkTheme = ref(false);

interface buscardoc{
  iddocumento: string;
  numdoc: string;
  anio: string;
}

export default {
    components: {
      ErrorMessage,
      Multiselect,
      DataTable,
      QuillEditor,
      Modal_Firma,
      iconDocument,iconFirma
    },
    setup () {
        
        const Usuario       = ref<UsuarioLog>(initializeUsuarioLog());
        const authStore     = usarAuthStore();
        Usuario.value       = authStore.usuario_Logueado;
        //------------------------------------
        const route = useRoute();
        const router = useRouter();

        const idreferencia = Number(route.params.idreferencia);
        const idpase = Number(route.params.idpase);
        
        const isUploading   = ref(false); 
        const isSending   = ref(false); 
        const isgenering   = ref(false);
        const opcion_archivo = ref();
        const anioactual    = ref(new Date().getFullYear());        
        const listaDestinos = ref<Destino_Oficina[]>([]);
        
        const Array_oficina_original  = ref<Destino_Oficina[]>([]);
          
        const error_destino_original  = ref("");

        const Array_archivos          = ref<Adjunto[]>([]);
        const Array_referencias       = ref<DocumentoFull[]>([]);
        const Array_referencias_elegidas = ref<DocumentoFull[]>([]);


        //creación de documentos ------------------------------------------------
        const serieDocumento = ref("");
        const serieDocumento_proyectado = ref("");
        const editorDescripcion = ref("");

        const { generar_documento,url_doc_pdf} = pdf_generar_documentotramite();


        //Destinos ---------------------------------------------------------------
        const Original  = ref<Destino_Oficina>();

        // Propiedades computadas para filtrar las opciones de los dropdowns
        const filteredOriginalDestinos = computed(() => {
          const originalIds = Array_oficina_original.value.map(item => item.id);
          return listaDestinos.value.filter(destino => 
            !originalIds.includes(destino.id)
          );
        });

      
          
        //Stores ----------------------------------------------------------------
        const StoreList = ListasStore();
        const FunList   = Listas();

        // PRUEBA

        // const pdfUrl = ref('http://localhost:5173/tramitedocumentario/src/assets/Prueba.pdf');
        const pdfUrl = ref('');
        const urlServer = ServerFirma;
        const signedPdfUrl = ref<string | null>(null);
        const currentFileToSign = ref<Adjunto | null>(null);

        const headers = ref([
          { text: '#', width: '5%', key: 'index' }, 
          { text: 'Documentos', width: '15%', key: 'codigo' },
          { text: 'Emitido Por:', width: '35%', key: 'codigo' },
          { text: 'Asunto', width: '45%', key: 'asunto' },
          { text: '', width: '10%', key: 'acciones' },
        ]);

       
      
        onMounted(async () => {
            isDarkTheme.value = checkIfDarkTheme();
            FunList.load_TiposDocumentos();
            FunList.load_TramitesTupa();
            cargar_Destinos_oficina();
            if(idreferencia && idreferencia!=0){
              await obtener_documento_Referenciado();
            }
            onDocumentoChange();
        });

        const listaDocumentos = ref([{ documento: '', tipo: 'Seleccionar', descripcion: '' }, ...dataMarca]);
        const selectedDocumento = ref(listaDocumentos.value[0].documento);

        const onDocumentoChange = () => {
          const documento = listaDocumentos.value.find(doc => doc.documento === selectedDocumento.value);
          if (documento) {
            editorDescripcion.value = documento.descripcion;
          }
        };

        const checkIfDarkTheme = () => {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        };  
        
        // ----------------------------------------------------------
        const DocumentoNuevo = ref<DocumentoExterno>(initialize_CrearDocumentoExterno());
        const Referencia = ref<ReferenciaDoc>(initialize_ReferenciaDoc());
        const errorsDoc = ref<any>(initialize_CrearDocumentoErrores());
        const Pase = ref<SigaPase>(initialize_SigaPase());
        const ArchivoTemporal = ref<Adjunto>(initialize_Adjunto());
        const frm_tipodocumento = ref<tipodocumento>(initialize_tipodocumento()); 
        const frm_tipodocumento_general = ref<tipodocumento>(initialize_tipodocumento()); 
        const frm_referencia_usuariodestinoid = ref<Destino>();
        const frm_referencia_tipodoc = ref<tipodocumento>(initialize_tipodocumento()); 
          
        // ----------------------------------------------------------
        const GenerarPDF = async () =>{
          isgenering.value = true;
          NProgress.start();
          try {
            await generar_documento(serieDocumento.value, editorDescripcion.value,DocumentoNuevo.value, Array_oficina_original.value, Array_referencias.value);
            DocumentoNuevo.value.pdf_principal = HOST_URL+ url_doc_pdf.value;
            DocumentoNuevo.value.pdf_principal_html = editorDescripcion.value;
            const temp = ref<Adjunto>(initialize_Adjunto());
                temp.value.id  = Array_archivos.value.length+1;
                temp.value.url = HOST_URL+ url_doc_pdf.value;
                temp.value.nombrefile = serieDocumento.value;
                temp.value.estado_firma = "Sin Firma";
                temp.value.tipo_archivo = "Documento Principal";
                Array_archivos.value.push(temp.value);
          } catch (error) {
              Alerta.Error('Error', 'No se pudo generar el PDF.');
          }finally {
              NProgress.done();
              isgenering.value = false;
          }
        }
        // -----------------------------------------------------------
        const on_changeTipoDocumento = () =>{
          if (frm_tipodocumento.value){
            DocumentoNuevo.value.tipodocumento_id= frm_tipodocumento.value.id;
            obtener_correlativo();
          }
        }
        const on_changeTipoDocumento_general = () =>{
          if (frm_tipodocumento_general.value){
            obtener_correlativo_general();
          }
        }

        const on_changeReferencia_TipoDocumento = () =>{
          if (frm_referencia_tipodoc.value){
            Referencia.value.tipodocumento_id= frm_referencia_tipodoc.value.id;
          }
        }

        const on_changeReferencia_Oficina = () =>{
          if (frm_referencia_usuariodestinoid.value){
            Referencia.value.buzonorigen_id= Number(frm_referencia_usuariodestinoid.value.id);
          }
        }

        const cargar_Destinos_oficina = async () => {
          NProgress.start();
          try {
            const RespuestaJSON = await get_all_buzones_oficina(Usuario.value.oficina_id);
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

        // ---------------------------------------------------------------------------------+
        // FILE -----------------------------------------------------------------------------
        const file_documento = ref<File | null>(null);
        const onFileSelected = (event: Event) => {
          const selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
          if (selectedFile) {
            file_documento.value = selectedFile;
          }
        };
        const handleDropFile = (event: DragEvent) => {
            event.preventDefault();
            if (event.dataTransfer && event.dataTransfer.files.length > 0) {
              file_documento.value = event.dataTransfer.files[0];
            }
        };
        
        const SubirArchivo = async () => {
              serieDocumento.value =  StoreList.obtenerNombrePorId(DocumentoNuevo.value.tipodocumento_id.toString()) +
                                      "N° "+ DocumentoNuevo.value.numeracion_tipodoc_oficina+" - "+ anioactual.value+ Usuario.value.buzon_sigla + "- MDVO" ;

            if (ArchivoTemporal.value.tipo_archivo==="") {
              Notif.Error('Seleccione el tipo de archivo');
              return;
            }
            //VALIDAR EXISTENCIA PREVIA  -------------------
            if (DocumentoNuevo.value.pdf_principal!=="" && ArchivoTemporal.value.tipo_archivo==='Documento Principal') {
               Alerta.Error('Archivo Duplicado',ArchivoTemporal.value.tipo_archivo + ' ya ha sido agregado');
               return;
            }
            if (DocumentoNuevo.value.pdf_anexo1!=="" && ArchivoTemporal.value.tipo_archivo==='Anexo1') {
               Alerta.Error('Archivo Duplicado',ArchivoTemporal.value.tipo_archivo + ' ya ha sido agregado');
               return;
            }
            if (DocumentoNuevo.value.pdf_anexo2!=="" && ArchivoTemporal.value.tipo_archivo==='Anexo2') {
               Alerta.Error('Archivo Duplicado',ArchivoTemporal.value.tipo_archivo + ' ya ha sido agregado');
               return;
            }
            // ----------------------------------------------
            if (!file_documento.value) {
              Notif.Error('Debe cargar un archivo PDF');
              return;
            }
            const formData = new FormData();
            
            
            try {
              NProgress.configure({
                parent: '#loadingfile', // Selector del contenedor
                showSpinner: true, // Opcional: oculta el spinner si no lo necesitas
              });
              NProgress.start();
              isUploading.value = true; 
              let RespuestaJSON;
              if(DocumentoNuevo.value.proyectar){
                formData.append('archivo_especialista', file_documento.value);
                RespuestaJSON = await subir_adjunto_especialista(formData);
              }else{
                formData.append('archivopdf', file_documento.value);
                RespuestaJSON = await subir_adjunto(formData);
              }
              
              if (RespuestaJSON.success) {
                  const temp = ref<Adjunto>(initialize_Adjunto());
                  // -------------------------
                  temp.value.id  = Array_archivos.value.length+1;
                  temp.value.url = HOST_URL+ RespuestaJSON.data.toString();
                  temp.value.nombrefile = ArchivoTemporal.value.tipo_archivo;
                  temp.value.estado_firma = "Sin Firma";
                  temp.value.tipo_archivo = ArchivoTemporal.value.tipo_archivo;
                  // -------------------------
                  Array_archivos.value.push(temp.value);

                  if(ArchivoTemporal.value.tipo_archivo==='Documento Principal'){
                    DocumentoNuevo.value.pdf_principal =HOST_URL+ RespuestaJSON.data.toString();
                  }else if(ArchivoTemporal.value.tipo_archivo==='Anexo1'){
                    DocumentoNuevo.value.pdf_anexo1 =HOST_URL+ RespuestaJSON.data.toString();
                  }else if(ArchivoTemporal.value.tipo_archivo==='Anexo2'){
                    DocumentoNuevo.value.pdf_anexo2 =HOST_URL+ RespuestaJSON.data.toString();
                  }
                  closeModal_Adjunto();
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
            } catch (error) {
              console.error('Error subiendo archivo:', error);
              Notif.Error('Ocurrió un error durante la subida');
            } finally {
              NProgress.done(); // Detener la barra de progreso
              NProgress.configure({
                parent: 'body', 
                showSpinner: true, 
              });
              isUploading.value = false; // Habilitar el botón nuevamente
              ArchivoTemporal.value = initialize_Adjunto();
              file_documento.value = null;
            }
        };

        // ------------------------------------------------------------------------------------
        // Cargar Destinos --------------------------------------------------------------------
        
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

        const obtener_correlativo_general = async () => {
          NProgress.start();
          try {
            const RespuestaJSON = await get_correlativo_nrodocumento_buzon_oficinaprincipal("Interno",frm_tipodocumento_general.value.id, Usuario.value.oficina_id);
            if(RespuestaJSON.success){
              serieDocumento_proyectado.value=RespuestaJSON.data;
              DocumentoNuevo.value.descripcion = RespuestaJSON.data;
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
        const obtener_documento_Referenciado = async () => {
          NProgress.start();
          try {
            const RespuestaJSON = await get_documentoCompleto_primerpase(idreferencia.toString());
            const DocumentoRef = ref<DocumentoFull>(initialize_DocumentoFull());
            // -----------------------------------------------------------------------------------------
            const Referencia = ref<ReferenciaDoc>(initialize_ReferenciaDoc());
            if(RespuestaJSON.success){
              DocumentoRef.value=RespuestaJSON.data;
              // Referencia.value.iddoc = idreferencia;
              // Referencia.value.anio = 2015;
              // Referencia.value.numerodocumento = DocumentoRef.value.numerodocumento;
              Array_referencias_elegidas.value.push(DocumentoRef.value);   
            }else{
                Notif.Error(RespuestaJSON.message);
            }
            // -----------------------------------------------------------------------------------------

          } catch (error) {
              Alerta.Error('Error', 'No se pudieron cargar las oficinas.');
          }finally {
              NProgress.done();
          }
        };

        // const crearpdf_print =()=>{
        //   pdf_generar_trazabilidad();
        // }
        

        const Remove_Adjunto = (id: number) => {
          const index = Array_archivos.value.findIndex(adj => adj.id === id);
          if (index !== -1) {
           
            if(Array_archivos.value[index].tipo_archivo==='Documento Principal'){
                DocumentoNuevo.value.pdf_principal="";
            }else if(Array_archivos.value[index].tipo_archivo==='Anexo1'){
                DocumentoNuevo.value.pdf_anexo1="";
            }else if(Array_archivos.value[index].tipo_archivo==='Anexo2'){
                DocumentoNuevo.value.pdf_anexo2="";
            }
            Array_archivos.value.splice(index, 1); 
          } else {
            Notif.Error("Elemento no encontrado");
          }
        };


        // const AgregarAdjunto = async () => {
        //     if (ArchivoTemporal.value.url==="") {
        //       Notif.Error('Debe cargar un archivo PDF');
        //       return;
        //     }
        //     Array_archivos.value.push(ArchivoTemporal.value);
        // };

        // ----------------------------------------------------------
        // DESTINATARIOS
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
              Original.value = undefined;
            }
          } else {
            Notif.Error("Seleccione un destino");
          }
        };
        
        const Remove_Original = (id: string) => {
          const index = Array_oficina_original.value.findIndex(oficina => oficina.id === id);
          if (index !== -1) {
            Array_oficina_original.value.splice(index, 1);
          } else {
            Notif.Error("Elemento no encontrado");

          }
        };

        // ----------------------------------------------------------
        

        // --------------------------------------------------------------------------------------
        const years = computed(() => {
          const yearList = [];
          for (let year = currentYear; year >= 2015; year--) {
            yearList.push(year);
          }
          return yearList;
        });

        // --------------------------------------------------------------------------------------
        // REFERENCIAS
        // --------------------------------------------------------------------------------------
        const BuscarReferencias = async () => {
          Array_referencias.value=[];
          try {
            NProgress.start();
            const RespuestaJSON = await get_resultadoreferencias(Referencia.value);
            if (RespuestaJSON.success) {
                Array_referencias.value = RespuestaJSON.data;
                Notif.Success(RespuestaJSON.message);
            } else {
                Notif.Error(RespuestaJSON.message);
            }
          } catch (error) {
                console.error('Error al buscar referencias:', error);
          } finally {
                NProgress.done();
          }
        };
        
        const Add_Referencia = async (ref_seleccionada: DocumentoFull) => {
           Array_referencias_elegidas.value.push(ref_seleccionada);   
           closeModal();       
        };
        const Remove_AgregarReferencia = (id: number) => {
          const index = Array_referencias_elegidas.value.findIndex(document => document.iddoc === id);
          if (index !== -1) {
            Array_referencias_elegidas.value.splice(index, 1); // Elimina el elemento encontrado
            // Notif.Success("Elemento eliminado correctamente");
          } else {
            Notif.Error("Elemento no encontrado");
          }
        };
        
        // --------------------------------------------------------------------------------------
        // REGISTRAR DOCUMENTO  -----------------------------------------------------------------
        // --------------------------------------------------------------------------------------

        const validateFieldDocumentos =  (field: string, value: any) => {
          switch (field) {
            case 'tipodocumento_id':
              errorsDoc.value[field] = value ? '' : 'Tipo de documento obligatorio';
              break;
            case 'codigo':
              errorsDoc.value[field] = value ? '' : 'Código obligatorio';
              break;
            case 'folios':
              errorsDoc.value[field] = value ? '' : 'N° Folio obligatorio';
              break;
            case 'prioridad':
              errorsDoc.value[field] = value ? '' : 'Campo obligatorio';
              break;
            case 'asunto':
              errorsDoc.value[field] = value ? '' : 'Asunto obligatorio';
              break;
          }
        };
        
        watch(() => DocumentoNuevo.value.tipodocumento_id, (newVal) => validateFieldDocumentos('tipodocumento_id', newVal));
        watch(() => DocumentoNuevo.value.numerodocumento, (newVal) => validateFieldDocumentos('codigo', newVal));
        watch(() => DocumentoNuevo.value.folios, (newVal) => validateFieldDocumentos('folios', newVal));
        watch(() => DocumentoNuevo.value.prioridad, (newVal) => validateFieldDocumentos('prioridad', newVal));
        watch(() => DocumentoNuevo.value.asunto, (newVal) => validateFieldDocumentos('asunto', newVal));

        
        const validateDocumento = () => {
          Object.keys(DocumentoNuevo.value).forEach(key => {
            validateFieldDocumentos(key, (DocumentoNuevo.value as any)[key]);
          });
          console.log(errorsDoc.value);
          return !Object.values(errorsDoc.value).some(error => error);
        };

        // ------------------
        const RegistrarDocumento = async () => { 
          if (!validateDocumento()) {
            Notif.Error("Debe completar todos los campos del documento");
            return;
          }  
          // Asignamos Rerefencias
          if(Array_referencias_elegidas.value.length>0){
                DocumentoNuevo.value.referencias_id= Array_referencias_elegidas.value
                      .map(item => item.primogenio_id)  
                      .join(','); 
          }
           //Asignamos Archivos
           const index = Array_archivos.value.findIndex(adj => adj.tipo_archivo === 'Documento Principal');
          if (index === -1) { 
            Alerta.Error("Falta Documento Principal","No se puede registrar un documento sin generar o adjuntar el documento digital principal");
            return;
          }
          
          //Asignamos Archivos
          if (Array_archivos.value.length===0) {
              Alerta.Error("Faltan Adjuntos","Debes Adjuntar un Archivo");
              return;
          }

         
          //Asignamos Oficinas Destino
         if (Array_oficina_original.value.length===0) {
              error_destino_original.value="Elige al menos 1 destino"
              Notif.Error("Debes agregar al menos un destino");
              return;
          }else{
              error_destino_original.value="";
          }          
          try {
              NProgress.start();
              isSending.value = true;
              //--------
              DocumentoNuevo.value.cabecera   =   StoreList.obtenerNombrePorId(DocumentoNuevo.value.tipodocumento_id.toString()) + " - N° " +
                                                  DocumentoNuevo.value.numeracion_tipodoc_oficina  + " - " + anioactual.value  + " - " + Usuario.value.buzon_sigla  + " -MDVO/D";

              //FORZAMOS QUE ENVIE SIEMPRE
              DocumentoNuevo.value.estado="Enviado";
              // DocumentoNuevo.value.proyectar=true;

              //--------           
              const RespuestaJSON = await add_documentoInterno_deoficina(DocumentoNuevo.value, Array_oficina_original.value,  idpase);
              //--------
              if (RespuestaJSON.success) {
                  //persona.value.id = RespuestaJSON.data;
                  Alerta.Sucessfull_timer("Completado","Documento agregado correctamente");
                  router.push('/office/documentos_enviados');
              } else {
                  Notif.Error(RespuestaJSON.message);
              }
          } catch (error) {
              console.error('Error uploading file:', error);
          } finally {
              NProgress.done(); // Detiene la barra de progreso
              isSending.value
          }
        };


        const openModal = () => {
          const modalElement = document.getElementById('add_ReferenciaModal');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        };
        
        const closeModal = () => {
          const modalElement = document.getElementById('add_ReferenciaModal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
            if (modal) modal.hide();
          }
        };

        const openModal_Adjunto = () => {
            if( DocumentoNuevo.value.tipodocumento_id==0 || 
                DocumentoNuevo.value.numerodocumento==='' || 
                DocumentoNuevo.value.asunto==='' || 
                DocumentoNuevo.value.tipodocumento_id.toString()==='undefined'){

                Alerta.Advertencia("Datos Incompletos", "Para Adjuntar un documento, debes ingresar previamente datos del destinatario y del documento");
                return;
            }

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

        const openModal_Generar = () => {
            if( DocumentoNuevo.value.tipodocumento_id==0 || 
                DocumentoNuevo.value.numerodocumento==='' || 
                DocumentoNuevo.value.asunto==='' || 
                DocumentoNuevo.value.tipodocumento_id.toString()==='undefined'){

                Alerta.Advertencia("Datos Incompletos", "Para generar un documento, debes ingresar previamente datos del destinatario y del documento");
                return;
            }
            if(Array_oficina_original.value.length==0){
              Notif.Error("Debe ingresar al menos una oficina");
              return;
            }
            serieDocumento.value =  StoreList.obtenerNombrePorId(DocumentoNuevo.value.tipodocumento_id.toString()) +
                                  "N° "+ DocumentoNuevo.value.numeracion_tipodoc_oficina+" - "+ anioactual.value+ Usuario.value.buzon_sigla + "- MDVO" ;

            const modalElement = document.getElementById('add_GenerarModal');
            if (modalElement) {
              const modal = new Modal(modalElement);
              modal.show();
            }
        };
        
        const closeModal_Generar = () => {
          const modalElement = document.getElementById('add_GenerarModal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
            if (modal) modal.hide();
          }
        };
        // -------------------------------------------------------------------------------
        const modules = {
          name: 'blotFormatter',
          module: BlotFormatter,
          options: {
            /* options */
          },
        }

        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------
        // Nueva función para subir el PDF firmado
        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------


        const SubirArchivoFirmado = async (signedUrl: string, tipo_archivo: string) => {
            try {
              NProgress.start();
              isUploading.value = true;
              console.log("probadno"+tipo_archivo);

              // Descargar el PDF desde la URL
              const response = await fetch(signedUrl);
              if (!response.ok) {
                throw new Error('No se pudo descargar el PDF firmado');
              }
              const blob = await response.blob();
      
              // Convertir el Blob en un File
              const file = new File([blob], `${tipo_archivo}_firmado.pdf`, { type: 'application/pdf' });
      
              // Preparar FormData para subir el archivo
              const formData = new FormData();
              formData.append('archivopdf', file);
      
              // Subir el archivo al servidor
              const RespuestaJSON = await subir_adjunto(formData);
              if (RespuestaJSON.success) {
                // Actualizar Array_archivos
                const temp = ref<Adjunto>(initialize_Adjunto());
                temp.value.id = Array_archivos.value.length + 1;
                temp.value.url = HOST_URL + RespuestaJSON.data.toString();
                temp.value.nombrefile = `${tipo_archivo}_firmado`;
                temp.value.estado_firma = "Firmado";
                temp.value.tipo_archivo = tipo_archivo;
                // temp.value.tipo_archivo = "Documento Principal";
                Array_archivos.value.push(temp.value);
                
                console.log("Otra vez probadno: "+tipo_archivo);
                console.log("Archivo: "+RespuestaJSON.data.toString());

                // Actualizar DocumentoNuevo si es necesario
                if (tipo_archivo === 'Documento Principal') {
                  DocumentoNuevo.value.pdf_principal = HOST_URL + RespuestaJSON.data.toString();
                } else if (tipo_archivo === 'Anexo1') {
                  DocumentoNuevo.value.pdf_anexo1    = HOST_URL + RespuestaJSON.data.toString();
                } else if (tipo_archivo === 'Anexo2') {
                  DocumentoNuevo.value.pdf_anexo2    = HOST_URL + RespuestaJSON.data.toString();
                }
                console.log("Documento Principal: " + DocumentoNuevo.value.pdf_principal);
                console.log("Anexo1: " + DocumentoNuevo.value.pdf_anexo1);
                console.log("Anexo2: " + DocumentoNuevo.value.pdf_anexo2);
                
                Notif.Success('Archivo firmado subido correctamente');
              } else {
                Notif.Error(RespuestaJSON.message);
              }
            } catch (error) {
              console.error('Error subiendo archivo firmado:', error);
              Notif.Error('Ocurrió un error al subir el archivo firmado');
            } finally {
              NProgress.done();
              isUploading.value = false;
            }
        };

        // -------------------------------------------------------------------------------
        const openFirmaModal = (item: Adjunto) => {
          currentFileToSign.value = item;
          pdfUrl.value = item.url;
          const modalElement = document.getElementById('firmaModal');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        };

        // -------------------------------------------------------------------------------
        const handleSignedPdf = async (signedUrl: string) => {
          signedPdfUrl.value = signedUrl;
          if (currentFileToSign.value) {
            Remove_Adjunto(currentFileToSign.value.id);
            // Subir el archivo firmado
            await SubirArchivoFirmado(signedUrl, currentFileToSign.value.tipo_archivo);

            currentFileToSign.value = null;
          }
        };

      const ListaSinProveido_TipoDocumento = computed(() =>
        StoreList.ListaTipoDocumentos.filter(
          doc => doc.nombre == 'Informe' || doc.nombre == 'Carta' || doc.nombre == 'Actividad' 
        )
      );
      const ListaSinProveido_general = computed(() =>
        StoreList.ListaTipoDocumentos.filter(
          doc => doc.nombre !== 'Proveido'
        )
      );


    // Computed para mostrar/ocultar crear documento basado en proyectar
      const mostrarEditor = ref("");
      
      watch(() => DocumentoNuevo.value.proyectar, (newValue) => {
        if (newValue) {
          mostrarEditor.value = "mostrar";
        } else {
          mostrarEditor.value = "ocultar";
        }
      });
        
      return {
        ListaSinProveido_TipoDocumento,
        DocumentoNuevo,ArchivoTemporal,SubirArchivo,isUploading,Array_archivos,
        on_changeReferencia_TipoDocumento,on_changeReferencia_Oficina,
        onFileSelected, handleDropFile,file_documento,Remove_Adjunto,
        Referencia, Array_referencias, frm_referencia_usuariodestinoid,frm_referencia_tipodoc,
        RegistrarDocumento,
        Pase,
        Original,
        Array_oficina_original, 
        Add_Original, Remove_Original,
        isDarkTheme, 
        errorsDoc,
        HOST_URL,
        listaDestinos,
        StoreList,
        years,
        openModal,closeModal,
        openModal_Adjunto,closeModal_Adjunto,
        frm_tipodocumento,
        on_changeTipoDocumento,
        FormatFecha, anioactual,
        Usuario, BuscarReferencias,
        Array_referencias_elegidas,
        Add_Referencia,
        Remove_AgregarReferencia, headers,
        error_destino_original,
        obtener_correlativo,
        editorDescripcion,QuillEditor,openModal_Generar,closeModal_Generar,serieDocumento,GenerarPDF,
        idreferencia,listaDocumentos,idpase,
      selectedDocumento,
      onDocumentoChange,modules,
      openFirmaModal,
      pdfUrl,
      urlServer,
      signedPdfUrl,handleSignedPdf,
      opcion_archivo,
      filteredOriginalDestinos,
      isSending,
      isgenering,
      mostrarEditor,
      ListaSinProveido_general,
      on_changeTipoDocumento_general, 
      frm_tipodocumento_general,
      serieDocumento_proyectado
      // crearpdf_print
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
.bg-verdeolivo-5{
  background-color: #459f36 !important;
}
.bg-verdeolivo-4{
  background-color: #63b753 !important;
}
.bg-verdeolivo-3{
  background-color: #82cf6f !important;
}


input, select,textarea, multiselect{
  background-color: #e7ddc938   !important;
}

/* Para todos los navegadores */
input[type="number"] {
  -webkit-appearance: none; /* Chrome, Safari, Edge */
  -moz-appearance: textfield; /* Firefox */
  appearance: none; /* Estándar */
}

.no-arrows {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  border: 1px solid #ccc;
  padding: 5px;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Para Firefox */
  appearance: none; /* Estándar */
}
</style>
