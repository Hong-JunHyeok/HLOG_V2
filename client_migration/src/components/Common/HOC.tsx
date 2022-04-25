import React from 'react';

interface WithContainer {
  TargetComponent: () => JSX.Element,
  WrapComponent: ({ children }) => JSX.Element,
}

export const withContainer = ({
  TargetComponent,
  WrapComponent
  }: WithContainer) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <WrapComponent>
          <TargetComponent />
        </WrapComponent>
      )
    }
  }
}
