import React from 'react';
import S from './StyledEditor';

const Editor = () => {
  return (
    <S.Container>
      <S.ToolContainer>
        <S.ToolItem>H1</S.ToolItem>
        <S.ToolItem>H2</S.ToolItem>
        <S.ToolItem>H3</S.ToolItem>
        <S.ToolItem>H4</S.ToolItem>
        <S.ToolItem>H5</S.ToolItem>
      </S.ToolContainer>
    </S.Container>
  );
};

export default Editor;
