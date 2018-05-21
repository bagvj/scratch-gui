import {intlReducer} from 'react-intl-redux';

const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'zh',
        messages: {}
    }
};

export {
    intlReducer as default,
    intlInitialState
};
