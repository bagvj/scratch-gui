import {intlReducer} from 'react-intl-redux';

const intlInitialState = {
    intl: {
        defaultLocale: 'zh',
        locale: 'zh',
        messages: {}
    }
};

export {
    intlReducer as default,
    intlInitialState
};
