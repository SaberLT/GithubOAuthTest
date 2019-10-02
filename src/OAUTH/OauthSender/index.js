// @flow
import * as React from 'react';
import { buildURL } from '../utils';

class OauthSender extends React.Component {
  render() {
    const {
      authorizeUrl,
      clientId,
      redirectUri,
      state,
      args,
      render,
      component,
      children,
    } = this.props;

    const url = buildURL(`${authorizeUrl}`, {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state: state ? JSON.stringify(state) : undefined,
      ...(args || {}),
    });

    if (component != null) {
      return React.createElement(component, { url });
    }

    if (render != null) {
      return render({ url });
    }

    if (children != null) {
      React.Children.only(children);
      return children({ url });
    }

    return null;
  }
}

export { OauthSender };
