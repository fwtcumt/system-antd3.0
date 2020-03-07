import React from 'react';
import { Breadcrumb, Divider } from 'antd';
import './index.less';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.landIn();
    this.reveal();
  }

  landIn = () => {
    const landInTexts = document.querySelectorAll(".landIn");
    landInTexts.forEach(landInText => {
      let letters = landInText.textContent.split("");
      landInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        landInText.append(span);
      });
    });
  }

  reveal = () => {
    let delay = 0.3;
    let revealText = document.querySelector(".reveal");
    let letters = revealText.textContent.split("");
    revealText.textContent = "";
    let middle = letters.filter(e => e !== " ").length / 2;
    letters.forEach((letter, i) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
      revealText.append(span);
    });
  }

  render() {
  
    return (
      <div className="layout-flex">
        <div className="flex-header">
          <Breadcrumb>
            <Breadcrumb.Item >世界军事</Breadcrumb.Item>
            <Breadcrumb.Item >亚洲</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex-body">
          <div className="animation-wave">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <Divider />
          <div className="animation-landIn">
            <p className="landIn">Ano hi watashitachi mada shiranai no Fushigi no monogatari desu.</p>
          </div>
          <Divider />
          <div className="animation-reveal">
            <div className="reveal">sword art online</div>
          </div>
          <Divider />
          <div className="animation-fill">
          <ul>
            <li><a href="##">home</a></li>
            <li><a href="##">categories</a></li>
            <li><a href="##">about</a></li>
          </ul>
          </div>
          <Divider />
          <div className="animation-test">
            <div className="button">你好</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
