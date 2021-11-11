import React from 'react';
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
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Header = () => {
  return (
    <>      
      <HeaderBlock>
        <Wrapper>
          <div className="logo">
            SHOPPING MALL
          </div>
          <div className="right">
            <div>username</div>
            <button>로그아웃</button>
          </div>
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;
