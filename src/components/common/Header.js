import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: black;
    text-decoration: none;    
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const TopBar = styled.div`
  height: 4rem;
  width: 10rem;
  align-items: left;

  .content {
    display: none;
    list-style-type: none;
    border: 1px solid;
    background: white;    
  }

  .content .link {
    color: black;
    text-decoration: none;
  }

  &:hover .content {
    display: block;
  }
  
`

const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>      
      <HeaderBlock>
        <Wrapper>
          <TopBar>            
            입점 신청
            <ul className="content">
              <li><Link to="/store/register" className="link">가입</Link></li>
              <li><Link to="/store/login" className="link">로그인</Link></li>
            </ul>
          </TopBar>
          <Link to="/" className="logo">
            SHOPPING MALL
          </Link>
          <div className="right">
            <div>username</div>
            <button>로그아웃</button>
          </div>
        </Wrapper>        
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
