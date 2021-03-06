//app.js
App({
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function(options) {
    // Do something when show.
  },
  onHide: function() {
    // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,

    // 公共变量
    uploadMaxSize: 4,

    // 跳转使用到的页面
    startPage: "/pages/loginRegisterPage/loginRegisterPage",
    loginPage: "/pages/loginPage/loginPage",
    registerPage: '/pages/registerPage/registerPage',
    firstTab: '/pages/ringFirstPage/ringFirstPage',
    bugCommit: "/pages/bugSubmittingPage/bugSubmittingPage",
    bugSearch: "/pages/bugSearchingPage/bugSearchingPage",
    bugDetail: "/pages/defectDetailedInfo/defectDetailedInfo",
    projectProgressDetail: "/pages/projectProgressDetail/projectProgressDetail",
    reqCommit: "/pages/businessRequSubmit/businessRequSubmit",
    sceneView: "/pages/businessRequLibLooking/businessRequLibLooking",
    sceneDetail: "/pages/sceneDetailedInfo/sceneDetailedInfo",
    messageEdit: "/pages/messageEditing/messageEditing",
    imageView: "/pages/defectImageView/defectImageView",

    // 转发用到的图片
    transferTitle: "信息共享, 携手并进",
    transferImage: "/image/common/transfer.jpg",

    // 登录注册页面(已完成)
    getUserByPhone: "https://www.fundserviceplatform.cn/fundService/api/getUserByPhone",
    getAllCompany: "https://www.fundserviceplatform.cn/fundService/api/getAllCompany",
    addUserInfo: "https://www.fundserviceplatform.cn/fundService/api/addUserInfo",

    // 故障信息共享（已完成）
    getFirstPageInfo: "https://www.fundserviceplatform.cn/fundService/api/getFirstPageInfo",
    getMainVersion: "https://www.fundserviceplatform.cn/fundService/api/getMainVersion",
    getDefectPropertyValue: "https://www.fundserviceplatform.cn/fundService/api/getDefectPropertyValue",
    getSearchBugInfo: "https://www.fundserviceplatform.cn/fundService/api/getSearchBugInfo",
    addNewDefect: "https://www.fundserviceplatform.cn/fundService/api/addNewDefect",
    modifyDefectById: "https://www.fundserviceplatform.cn/fundService/api/modifyDefectById",
    getDefectById: "https://www.fundserviceplatform.cn/fundService/api/getDefectById",
    getMessageByDefectId: "https://www.fundserviceplatform.cn/fundService/api/getMessageByDefectId",
    addMessage: "https://www.fundserviceplatform.cn/fundService/api/addMessage",
    uploadServerURL: "https://www.fundserviceplatform.cn/fundService/api/uploadImage",
    uploadViewServerURL: "http://www.fundserviceplatform.cn:8080/defectImageView",
    roundImage: "/image/ringFirstPage/roundImg.png",
    commitImage: "/image/ringFirstPage/bugCommitImg.png",
    searchImage: "/image/ringFirstPage/bugSearchImg.png",
    rightArrowImage: "/image/common/rightArrow.png",

    // 测试场景共建（已完成）
    getTop3BusinessReq: "https://www.fundserviceplatform.cn/fundService/api/getTop3BusinessReq",
    addBusinessReq: "https://www.fundserviceplatform.cn/fundService/api/addBusinessReq",
    getScenarioByReqId: "https://www.fundserviceplatform.cn/fundService/api/getScenarioByReqId",
    getAllBusinessReq: "https://www.fundserviceplatform.cn/fundService/api/getAllBusinessReq",
    downloadURL: "https://www.fundserviceplatform.cn/fundService/api/downloadFile",
    reqImg: "/image/testInformationShare/requirementSubmit.png",
    sceneImg: "/image/testInformationShare/scenarioLibPic.png",

    // 项目信息中心使用（已完成）
    getNewStatus: "https://www.fundserviceplatform.cn/fundService/api/getNewStatus",
    getProjectProgress: "https://www.fundserviceplatform.cn/fundService/api/getProjectProgress",
    getAllVersion: "https://www.fundserviceplatform.cn/fundService/api/getAllVersion",
    uniformImgServerURL: "http://www.fundserviceplatform.cn:8080/uniformTest/",
    threeLineIcon: "/image/common/threeline.png",

    // 排行榜(已完成)
    getFundCompanyRank: "https://www.fundserviceplatform.cn/fundService/api/getFundCompanyRank",
    modifyLikeCountByPhone: "https://www.fundserviceplatform.cn/fundService/api/modifyLikeCountByPhone",
    redStarImg: "/image/rankList/redStar.png",
    redHeartImg: "/image/rankList/redHeart.png",
    grayHeartImg: "/image/rankList/grayHeart.png"
  }
})