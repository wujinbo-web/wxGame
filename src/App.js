import React, { Component } from 'react';
import QuestionList from './mock/data';
import './App.less';
const music=require('./images/video/music.mp3');
const icon1=require('./images/icon1.png');
const icon2=require('./images/icon2.png');
const icon3=require('./images/icon3.png');
const icon4=require('./images/icon4.png');
const icon5=require('./images/icon5.png');
const icon6=require('./images/icon6.png');
const icon7=require('./images/icon7.png');
const icon8=require('./images/icon8.png');
const icon9=require('./images/icon9.png');
const icon10=require('./images/icon10.png');
const face1=require('./images/face/1.gif');
const face2=require('./images/face/2.gif');
const face3=require('./images/face/3.gif');
const face4=require('./images/face/4.gif');
const face5=require('./images/face/5.gif');
const guohui=require('./images/guohui.png');
const font=require('./images/font1.png');
const qipao=require('./images/qipao.png');
const btn1=require('./images/btn/btn1.png');
const btn2=require('./images/btn/btn2.png');
const btn3=require('./images/btn/btn3.png');
const btn4=require('./images/btn/btn4.png');
const btn5=require('./images/btn/btn5.png');
const btn6=require('./images/btn/btn6.png');
const regular=require('./images/regular.png');
const focksPublic=require('./images/focksPublic.png');
const qrCode=require('./images/qrCode.png');
const redBag=require('./images/redbag.png');

const laba1=require('./images/video/laba1.png');
const laba2=require('./images/video/laba2.png');

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      index_isDisable: false,  //规则遮罩
      focksOnPublicNumber: false, //关注公众号遮罩
      page_show: 1,  //1首页 2答题页面 3填写手机号
      questionEnsure: 0, //回答状态  0未回答 1回答正确 2回答错误 3很遗憾未中奖 4.恭喜你
      qsList:[],  //随机生成的问题序号列表
      qsNow: 0, //当前问题序号
      qs_ensure: 0, //已答对题数
      selectNow: '',//当前选择
      phone:'',
      play_istrue: 1,  //0 暂停 1开始播放
    }
  }
  //重新开始游戏
  resetGame=()=>{
    let page_show=1;
    let questionEnsure=0;
    let qsNow=0;
    let qs_ensure=0;
    let selectNow="";
    let phone=""
    this.setState({ page_show,questionEnsure,qsNow,qs_ensure,selectNow,phone});
  }
  //填写手机手机号
  writePhone=()=>{
    this.setState({page_show:3});
  }
  //初始化之前
  componentWillMount(){
    //1先随意生成指定范围内的10个数字
    let qsList=this.getRandomNum(QuestionList.length-1);
    this.setState({qsList});
  }
  //挂载之后
  componentDidMount(){
    //QuestionList 题库列表
    let { play_istrue } = this.state;
    let muc = document.getElementById('muc');
  }
  //生成指定范围内不重复的10个数字
  getRandomNum = (end=14) =>{
    let arr=[];
    while(arr.length<10){
      let num = Math.round(Math.random()*end);
      //如果数组中不包含这个随机数就加1
      if(arr.indexOf(num)===-1){
        arr.push(num);
      }
    }
    return arr;
  }

  //隐藏规则
  disableMask=()=>{
    let index_isDisable=false;
    this.setState({index_isDisable});
  }
  //隐藏关注公众号
  disableFocksPublic=()=>{
    let focksOnPublicNumber=false;
    this.setState({focksOnPublicNumber});
  }
  //点击规则
  showMask=()=>{
    let index_isDisable=true;
    this.setState({index_isDisable});
  }
  //开始答题
  startQuestion=()=>{
    if(0){
      //当未关注公众号时候提示他关注公众号
      let focksOnPublicNumber=true;
      this.setState({focksOnPublicNumber});
    }else{
      //进入答题环节
      let page_show=2;
      this.setState({page_show});
    }
  }

  //获取问题
  getQuestion=(type)=>{
    let { qsList, qsNow } = this.state;
    let nowData = QuestionList[qsList[qsNow]];
    if(type==="title"){
      return nowData.question;
    }else if(type==="answer"){
      return nowData.list;
    }else if(type==="index"){
      //返回答案序号
      return nowData.answer;
    }else if(type==="ensure"){
      //返回正确答案 信息
      return nowData.list[nowData.answer];
    }
  }
  //下标转字母
  transfromEnglish=(num)=>{
    if(num===0){
      return 'A';
    }else if(num===1){
      return 'B';
    }else if(num===2){
      return 'C';
    }else if(num===3){
      return 'D';
    }else{
      return '';
    }
  }

  //选择答案
  selectItem = (index) =>{
    this.setState({selectNow:index});
  }

  //提交答案
  submitAnswer=()=>{
    //选择的答案
    let { selectNow } = this.state;
    let ensure = this.getQuestion("index");
    if(selectNow===""){
      alert("请选择答案");
      return;
    }
    //判断答案是否正确
    if(ensure==selectNow){
      //正确
      let { qs_ensure } = this.state;
      this.setState({questionEnsure: 1, qs_ensure:qs_ensure+1});
    }else{
      //错误
      this.setState({questionEnsure: 2});
    }

  }

  //下一题
  nextQuestion = () => {
    //1题目qsNow+1，2当前选择为空selectNow，3.回答状态questionEnsure=0
    let { qsNow, selectNow, questionEnsure, qs_ensure } = this.state;
    if (qsNow<9) {
      this.setState({qsNow:qsNow+1,selectNow:"",questionEnsure:0});
    }else{
       //判断正确的答题数
       if(qs_ensure>=9){
         //中奖
         this.setState({questionEnsure:4});
       }else{
         //没中奖
         this.setState({questionEnsure:3});
       }
    }
  }

  //修改手机号
  changePhone(e){
    let phone=e.target.value;
    this.setState({phone});
  }

  //提交手机号
  submitPhone = ()=>{
    let { phone } = this.state;
    console.log(phone);
    //判断手机
    if(!(/^1[34578]\d{9}$/.test(phone))){
      alert("手机号填写有误，请重新填写");
      return false
    }

    //请求数据 存入手机号
    alert("提交成功,审核通过后花费将在3个工作日内充值到账");

    //重置游戏
    this.resetGame();
  }

  musicPlay = ()=>{
    let { play_istrue } = this.state;
    let muc = document.getElementById('muc');
    muc.play();
    this.setState({ play_istrue: 1 });
  }

  musicPause = () => {
    console.log(111);
    let { play_istrue } = this.state;
    let muc = document.getElementById('muc');
    muc.pause();
    this.setState({ play_istrue: 0 });
  }

  render() {
    let { index_isDisable, page_show,focksOnPublicNumber, questionEnsure, qsNow, selectNow, qs_ensure, play_istrue } = this.state;
    return (
      <div className="App">
        <audio src={music} className="muc" id="muc" preload="auto" autoPlay loop="loop"></audio>
        {
          play_istrue==0?<img
          src={laba2}
          className="play"
          onClick={this.musicPlay.bind(this)}
          />:<img src={laba1} className="play musss" onClick={this.musicPause.bind(this)}/>
        }

        {
          //判断是否在首页
          page_show===1?
          <div className="index">
            {
              //规则
              index_isDisable?<div className="mask" onClick={this.disableMask}>
                <img src={regular} alt="规则公告"/>
              </div>:""
            }
            {
              //未关注账号
              focksOnPublicNumber?<div className="focks" onClick={this.disableFocksPublic}>
                <img className="face" src={face2} alt="扎心勒-动画" />
                <img className="cloumn" src={focksPublic} alt="关注公众号" />
                <img className="code" src={qrCode} alt="二维码" />
                <img className="guohui" src={guohui} alt="国徽" />
              </div>:""
            }
            <img src={icon1} className="icon1" alt="水果袋" />
            <img src={icon2} className="icon2" alt="菜叶" />
            <img src={icon3} className="icon3" alt="牙膏" />
            <img src={icon4} className="icon4" alt="报纸" />
            <img src={icon5} className="icon5" alt="西瓜" />
            <img src={icon6} className="icon6" alt="垃圾桶" />
            <img src={face1} className="face1" alt="hi动画" />
            <img src={guohui} className="icon7" alt="国徽" />
            <img src={font} className="icon8" alt="垃圾分类知识" />
            <img src={qipao} className="icon9" alt="气泡" />

            <img src={btn1} className="btn1" alt="开始答题" onClick={this.startQuestion}/>
            <img src={btn2} className="btn2" alt="游戏规则" onClick={this.showMask}/>
            <div className="header">
              共青团杭州市余杭区委员会
              <span>宣</span>
            </div>
          </div>:""
        }
        {
          page_show===2?<div className="question">
            {
                //回答正确界面
              questionEnsure===1?<div className="ensure_fail">
                <div className="content">
                  <img src={face3} className="face"/>
                  <p className="title">恭喜你！回答正确<br/>正确答案为:</p>
                  <p className="answer">
                    {this.transfromEnglish(this.getQuestion("index"))+'.'+this.getQuestion('ensure')}
                  </p>
                  <img src={btn4} className="btn" alt="下一题" onClick={this.nextQuestion} />
                  <img src={guohui} className="guohui" alt="国徽" />
                </div>
              </div>:""
            }
            {
              //回答错误界面
              questionEnsure===2?<div className="ensure_fail">
                <div className="content">
                  <img src={face4} className="face"/>
                  <p className="title">很遗憾！回答错误<br/>正确答案为:</p>
                  <p className="answer">
                    {this.transfromEnglish(this.getQuestion("index"))+'.'+this.getQuestion('ensure')}
                  </p>
                  <img src={btn4} className="btn" alt="下一题" onClick={this.nextQuestion} />
                  <img src={guohui} className="guohui" alt="国徽" />
                </div>
              </div>:""
            }
            {
              //未中中奖
              questionEnsure===3?<div className="mask" onClick={this.resetGame.bind(this)}>
                <div className="content">
                  <img src={face5} className="face" alt="嫌弃表情" />
                  <p className="title">
                    很抱歉你未中奖<br />
                    本次正确答题为{qs_ensure}题，请再接再励！
                  </p>
                  <img src={guohui} className="guohui" alt="国徽" />
                </div>
              </div>:""
            }
            {
              //中奖
              questionEnsure===4?<div className="mask">
                <div className="content2">
                  <img src={guohui} className="guoqi" />
                  <p className="title">
                    恭喜你！成功抽中了<br/>
                    <span>10元</span>手机话费！
                  </p>
                  <p className="title2">
                    感谢您对”垃圾分类知识有奖问答”的<br/>
                    支持！谢谢参与
                  </p>
                </div>
                <img src={redBag} className="redbag" alt="红包" />
                <img src={btn5} className="btn" alt="填写手机按钮"/>
              </div>:""
            }
            <img src={icon6} className="icon1" alt="垃圾桶"/>
            <img src={icon7} className="icon2" alt="垃圾桶"/>
            <img src={icon4} className="icon3" alt="报纸"/>
            <img src={icon2} className="icon4" alt="彩菜叶"/>
            <div className="qipao">
              <p className="num">{qsNow+1}</p>
              <p>question</p>
            </div>
            <div className="content">
              <div className="title">
                {
                  this.getQuestion('title')
                }
              </div>
              {
                this.getQuestion('answer').map((item,index)=>{
                  return(<p
                    className={`answer ${selectNow===index?"active":""}`}
                    key={index}
                    onClick={this.selectItem.bind(this,index)}
                  >
                    {this.transfromEnglish(index)+'.'+item}
                  </p>)

                })
              }
              <img src={guohui} className="guohui" alt="国徽"/>
            </div>
            <img src={btn3} className="btn1" alt="提交答案" onClick={this.submitAnswer}/>
          </div>:""
        }
        {
          page_show===3?<div className="wrap">
              <img src={icon7} className="icon1" />
              <img src={icon5} className="icon2" />
              <img src={icon8} className="icon3" />
              <img src={icon1} className="icon4" />
              <img src={icon6} className="icon5" />
              <img src={icon4} className="icon6" />
              <img src={icon9} className="icon7" />
              <img src={icon10} className="icon8" />
              <img src={icon3} className="icon9" />
              <img src={icon2} className="icon10" />
              <div className="content">
                <p className="title">话费将会在3个工作日内充值到账</p>
                <input placeholder="请输入充值手机号" onChange={this.changePhone.bind(this)} />
              </div>
              <img src={btn6} className="btn" onClick={this.submitPhone}/>
          </div>:""
        }
      </div>
    );
  }
}

export default App;
