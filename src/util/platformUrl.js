const platformUrl= {
   searchModelUrl: '/parallel/search',//search的url功能有点问题
   getModelbyUserUrl: '/parallel/getMine',
   getModelbyTypeUrl: '/parallel/getType/',
   deleteModelUrl: '/parallel/unregister/',
   getModelbyId: '/parallel/get/',
   downloadModelUrl: '/parallel/download/',
   registerModelUrl: '/parallel/register',
   getAllUsagesUrl: '/parallel/getAllUsages',

   getAllFiles: '/userSpace/getAllFiles',
   downloadOutput: '/userSpace/download',

   getAllDagUrl: 'workflow/dags/all',
   saveDagUrl: 'workflow/dags/save',
   deleteDagbyName: 'workflow/dags/delete/',
   getDagbyName: 'workflow/dags/',
   searchDagbyName: 'workflow/dags/search/',
   runDag: 'workflow/tasks/submit',

   workFlowTaskList: '/workflow/tasks/all?pageSize=',
   workFlowTask: '/workflow/tasks/',
   workFlowTaskDelete: '/workflow/tasks/delete/',

   //可视化平台的文件相关操作
   submitTempFile: '/file/submit', //上传用户指定的多个文件至临时目录
   getTempFileList: '/file/list', //获取临时路径下的子文件,type=1 访问工程文件夹 type=2 访问数据文件夹
   readProjectFile: '/file/', //获取存储json路径下的子文件,type=1 访问工程文件夹 type=2 访问数据文件夹
   readDataFile: '/file/dataJson/', //获取存储数据json路径下的文件json文件内容 用于前端直接通过url获取到geojson数据
   projectSubmit:'/file/projectSubmit', //向存储工程json路径提交工程json
   datafileSubmit:'/file/datafileSubmit', //向存储数据json路径提交json文件
   dataJsonSubmit:'/file/dataJsonSubmit',//接收json对象以及文件名，将json对象写入数据路径的对应的文件中
   deleteData:'/file/dataDelete/', //在存储数据json路径删除指定文件

   //地图交互，从空间数据中获取数据列表
   DataBaseGeoData: '/geodata/allselect'


}
export default platformUrl;
