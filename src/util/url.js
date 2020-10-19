const URL = {
    datasetPreviewUrl: '/query/attQuery/view/',
    showFeatureUrl: '/query/attQuery/locate/',
    termQueryUrl:'/query/attQuery/viewByValue/',
    wildQueryUrl:'/query/attQuery/viewWildByValue/',
    rangeQueryUrl:'/query/attQuery/numberRangeSelect/',

    mapAreaQueryUrl: '/query/geomQuery/area/',
    mapIdentifyQueryUrl: '/query/geomQuery/identify/',

    datasetInitUrl: '/file/dataset/init?path=',
    datasetCreateUrl: '/file/dataset/create2',
    shpInitUrl: '/file/dataset/init/shp?path=',
    shpCreateUrl: '/file/dataset/create/shp',
    datasetDetailUrl: '/file/dataset/',
    datasetLogGetUrl: '/file/dataset/monitor/log/',
    datasetTaskDeleteUrl: '/file/dataset/monitor/delete/',
    datasetLogDownloadUrl: '/file/dataset/monitor/logDownload?id=',
    datasetMonitergetUrl: '/file/dataset/monitor/',
    datasetListFinishPublicUrl: '/file/dataset/allFinishPublic?pageSize=',
    datasetListFinishUrl: '/file/dataset/allFinish?pageSize=',
    datasetPublicUrl: '/file/dataset/publicDataset/',
    datasetPublicCancelUrl: '/file/dataset/publicDatasetCancel/',
    datasetListUrl: '/file/dataset/all?pageSize=',
    datasetListMonitorUrl: '/file/dataset/allMonitor?pageSize=',
    datasetMoniterListUrl: '/file/dataset/monitor/all?pageSize=',
    datasetMoniterListFinishUrl: '/file/dataset/monitor/allFinish?pageSize=',
    tiffServiceUrl: '/file/dataset/init/tiff',
    esServiceUrl: '/file/dataset/init/es',
    fileGetUrl: '/file/userSpace/all?path=',
    fileCreateUrl: '/file/userSpace/new/',
    fileUploadUrl: '/file/userSpace/upload?path=',
    fileDownloadUrl: '/file/userSpace/download?path=',
    fileDeleteUrl: '/file/userSpace/delete?path=',
    dataPreviewUrl: '/file/userSpace/preview?path=',
    datasetDeleteUrl: '/file/dataset/',

    parallelRegisterUrl: '/server/parallel/register',
    parallelListUrl: '/server/parallel/get?pageSize=',
    personalParallelListUrl: '/server/parallel/getpersonal?pageSize=',
    personalParallelPublicUrl: '/server/parallel/publicPersonal/',
    personalParallelPublicCancelUrl: '/server/parallel/publicPersonalCancel/',
    parallelDetailUrl: '/server/parallel/get/',
    parallelRunUrl: '/server/parallel/use/',
    parallelKillUrl: '/server/parallel/kill/',
    parallelLogUrl: '/server/parallel/log/',
    parallelJobUrl: '/server/parallel/jobs/',
    parallelAllJobUrl: '/server/parallel/jobs?pageSize=',
    parallelDeleteUrl: '/server/parallel/unregister/',
    mapServicedelete: '/server/mapservice/delete/',
    mapServieceInfo: '/server/mapservice/',
    getPersonalService: '/server/mapservice/personal?pageSize=',
    publicPersonalService: '/server/mapservice/personalPublic/',
    publicPersonalCancelService: '/server/mapservice/personalPublicCancel/',
    getSysService: '/server/mapservice/public?pageSize=',
    searchPersonalService: '/server/mapservice/personal/search/',
    searchSysService: '/server/mapservice/public/search/',
    externalDataGetUrl: '/server/external2/all?pageSize=',
    pgConnectUrl: '/server/external2/connect',
    sqlQueryUrl: '/server/external2/query',
    externalDataAddUrl: '/server/external2/add',
    externalDataPreviewUrl: '/server/external2/tablePreview/',
    externalDataDeleteUrl: '/server/external2/tableDelete/',
    externalDataInfoUrl: '/server/external2/tableInfo/',
    selectSalt: "/server/user/selectSalt?name=",
    userRegister: "/server/user/register",
    departInit: "/server/user/init",
    dagSaveUrl:"/server/workflow/dags/save",
    jobInfoUrl:'/server/workflow/jobs/',
    dragInfoUrl:'/server/workflow/dags/',
    jobDetailUrl:'/server/workflow/tasks/',
    taskDeleteUrl: '/server/workflow/tasks/delete/',
    taskAllUrl:'/server/workflow/tasks/all?pageSize=',
    dagsAllUrl:'/server/workflow/dags/all?pageNo=',
    taskSubmitUrl:'/server/workflow/tasks/submit',
    dagDeleteUrl:'/server/workflow/dags/delete/',
    dagLoadUrl:'/server/workflow/dags/load/',
    addMapUrl: '/tile/gttileservice/setOpt/',
    getBands: "/tile/gttileservice/getbands/",

    getmapService:"mapservice/allselect",
    getwebTool:"/onlinetools/allselect",
    baseUrl:'http://10.79.231.81',
    getEduCasesUrl: "/teachModel/allselect",

    addUser:"/user/insert",
    batchAddUsers:"/user/batchinsert",
    checkByName:"/user/checkbyname",
    deleteUserById:"/user/delete/{id}",
    deleteUserByName:"/user/deletebyname/{name}",
    batchDeleteUserById:"/user//batchdelete/{ids}",
    searchUsersById:"/user/select/{id}",
    searchUsersByName:"/user/select/{name}",
    batchsearchUsersById:"/user/batchseletct/{ids}",
    searchAllUsers:"/user/allselect",
    updateUserInfo:"/user/update",
    batchUpdateUserInfo:"/user/batchupdate",
    userLogin: "/user/login",
    userLoginStatus: "/user/loginstatus",
    userLogout:"/user/logout",
    getGeoPopular:"/geodata/populardata",
    getPaperNew:"/studentpaper/selectnew",
    getJournalNew:"/academicpaper/selectnew",
    getLectureNew:"/lecture/selectnew",
    geodataAllSelect:"/geodata/allselect",
    bytype1Select:"/geodata/bytype1/",
    bytype2Select:"/geodata/bytype2/",
    userNameSelect:"/geodata/byuserName/",
    geoPopularSelect:"/geodata/populardata/",
    paperAllSelect:"/studentpaper/allselect",
    journalAllSelect:"/academicpaper/allselect",
    lectureAllSelect:"/lecture/allselect",
};
export default URL;
