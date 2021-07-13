import styled from 'styled-components';
const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }
  .formInsertComunnity{
    *{
      border-radius: 8px;
    }
    button {
      border: 0;
      padding: 9px 12px;
      color: #FFFFFF;
      margin: 0 16px 16px 0;
      background-color: #6F92BB;
    }
  }

  // My CSS
  .description{
    text-transform: lowercase;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;
    color: #999;
  }
  .sorte{
    font-family: Verdana;
    font-style: normal;
    font-size: 12px;
    line-height: 15px;
    color: #999999;
    >b{
      font-weight: bold;
    }
  }
`; 
export default Box