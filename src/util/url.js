const URL = {
    addUser:"/user/insert",
    batchAddUsers:"/user/batchinsert",
    checkByName:"/user/checkbyname/",
    deleteUserById:"/user/delete/",
    deleteUserByName:"/user/deletebyname/",
    batchDeleteUserById:"/user//batchdelete/",
    searchUsersById:"/user/select/",
    searchUsersByName:"/user/selectbyname/",
    batchsearchUsersById:"/user/batchseletct/",
    searchAllUsers:"/user/allselect",
    updateUserInfo:"/user/update",
    batchUpdateUserInfo:"/user/batchupdate",
    userLogin: "/user/login",
    userLoginStatus: "/user/loginstatus",
    userLogout:"/user/logout",
    // 空间数据专业期刊讲座信息学位论文常用工具地图集市查询全部
    searchAllGeoData:"/geodata/allselect",
    searchAllStudentPaper:"/studentpaper/allselect",
    searchAllAcademicPaper:"/academicpaper/allselect",
    searchAllLecture:"/lecture/allselect",
    searchAllOnlineTools:"/onlinetools/allselect",
    searchAllMapService:"/mapservice/allselect",
    // 空间数据专业期刊讲座信息学位论文常用工具地图集市按id查询
    searchGeoDataById:"/geodata/select/",
    searchStudentPaperById:"/studentpaper/select/",
    searchAcademicPaperById:"/academicpaper/select/",
    searchLectureById:"/lecture/select/",
    searchOnlineToolsById:"/onlinetools/select/",
    searchMapServiceById:"/mapservice/select/",
    // 空间数据专业期刊讲座信息学位论文常用工具地图集市按id删除
    deleteGeoDataById:"/geodata/delete/",
    deleteStudentPaperById:"/studentpaper/delete/",
    deleteAcademicPaperById:"/academicpaper/delete/",
    deleteLectureById:"/lecture/delete/",
    deleteOnlineToolsById:"/onlinetools/delete/",
    deleteMapServiceById:"/mapservice/delete/",
    // 上传教学案例
    uploadTeachingCase:"/teachModel/uploadTeachModel",
    //日志
    searchAllLog:"/log/allselect",
    addLog:"/log/insert",

    getmapService:"mapservice/allselect",
    getwebTool:"/onlinetools/allselect",
    getteamInfo:"/member/selectteachers",
    getstudentInfo:"/member/selectbyversion",
    baseUrl:'http://10.79.231.81:90',
    getEduCasesUrl: "/teachModel/allselect",
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
    // 后台上传数据的接口
    uploadGeodata:"/geodata/insert",
    uploadStudentpaper:"/studentpaper/insert",
    uplodAdacademicPaper:"/academicpaper/insert",
    uploadLecture:"/lecture/insert",
    uploadOnlinetools:"/onlinetools/insert",
    uploadMapservice:"/mapservice/insert",

    getfileList:'/userSpace/getFileInfoList',
    getpublicdataList:'/geodata/getFileInfoList',
    previewData:function (type) {
        return '/userSpace/preview/'+type;
    }

    statisticData:"/user/statistic"
};
export default URL;
