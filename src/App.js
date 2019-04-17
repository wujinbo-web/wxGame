import React, { Component } from 'react';
import QuestionList from './mock/data';
import './App.less';
const icon1=require('./images/icon1.png');
const icon2=require('./images/icon2.png');
const icon3=require('./images/icon3.png');
const icon4=require('./images/icon4.png');
const icon5=require('./images/icon5.png');
const icon6=require('./images/icon6.png');
const face1=require('./images/face/1.gif');
const face2=require('./images/face/2.gif');
const guohui=require('./images/guohui.png');
const font=require('./images/font1.png');
const qipao=require('./images/qipao.png');
const btn1=require('./images/btn/btn1.png');
const btn2=require('./images/btn/btn2.png');
const btn3=require('./images/btn/btn3.png');
const btn4=require('./images/btn/btn4.png');
const regular=require('./images/regular.png');
const focksPublic=require('./images/focksPublic.png');
const qrCode=require('./images/qrCode.png');

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      index_isDisable: false,  //规则遮罩
      focksOnPublicNumber: false, //关注公众号遮罩
      ensure: false, //回答正确遮罩
      page_show: 2,  //1首页 2答题页面 3填写手机号
      questionEnsure: 0, //回答状态  0未回答 1回答正确 2回答错误
      qsList:[],  //随机生成的问题序号列表
      qsNow: 0, //当前问题序号
      qs_ensure: 0, //已答对题数
    }
  }
  //初始化之前
  componentWillMount(){
    //1先随意生成指定范围内的10个数字
    let qsList=this.getRandomNum(QuestionList.length-1);
    this.setState({qsList});
  }
  componentDidMount(){
    //QuestionList 题库列表

  }
  //生成指定范围内不重复的10个数字
  getRandomNum = (end=14)=>{
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
    if(type==="title"){
      return QuestionList[qsList[qsNow]].question;
    }else if(type==="answer"){
      return QuestionList[qsList[qsNow]].list;
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

  render() {
    let { index_isDisable, page_show,focksOnPublicNumber, questionEnsure, qsNow } = this.state;
    return (
      <div className="App">
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
        <div className="question">

          {
            questionEnsure===1?<div className="ensure_fail">
              <div className="content">
                <p className="title">恭喜你！回答正确<br/>正确答案为:</p>
                <p className="answer">B.xxxxx</p>
                <img src={btn4} className="btn" alt="下一题" />
              </div>
            </div>:""
          }

          <img src={icon6} className="icon1" alt="垃圾桶"/>
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
                return <p className="answer" key={index}>{this.transfromEnglish(index)+'.'+item}</p>
              })
            }

            <img src={guohui} className="guohui" alt="国徽"/>
          </div>
          <img src={btn3} className="btn1" alt="提交答案"/>

        </div>

      </div>
    );
  }
}

export default App;
