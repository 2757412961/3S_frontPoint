const platformUrl={
   searchModelUrl:'/parallel/search',//search的url功能有点问题
   getModelbyUserUrl:'/parallel/getMine',
   getModelbyTypeUrl:'/parallel/getType/',
   deleteModelUrl:'/parallel/unregister/',
   getModelbyId:'/parallel/get/',
   downloadModelUrl:'/parallel/download/',
   registerModelUrl:'/parallel/register',
   getAllUsagesUrl:'/parallel/getAllUsages',

   getAllFiles:'/userSpace/getAllFiles',
   downloadOutput:'/userSpace/download',

   getAllDagUrl:'workflow/dags/all',
   saveDagUrl:'workflow/dags/save',
   deleteDagbyName:'workflow/dags/delete/',
   getDagbyName:'workflow/dags/',
   searchDagbyName:'workflow/dags/search/',
   runDag:'workflow/tasks/submit',

   workFlowTaskList:'/workflow/tasks/all?pageSize=',
   workFlowTask:'/workflow/tasks/',
   workFlowTaskDelete:'/workflow/tasks/delete/'

};
export default platformUrl;