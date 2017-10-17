import {addLocaleData} from 'react-intl';
import {updateIntl as superUpdateIntl} from 'react-intl-redux';
import {IntlProvider, intlReducer} from 'react-intl-redux';

import locales from 'scratch-l10n';

Object.keys(locales).forEach(locale => {
    // TODO: will need to handle locales not in the default intl - see www/custom-locales
    addLocaleData(locales[locale].localeData);
});

const intlInitialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'zh',
        messages: locales.zh.messages
    }
};

const updateIntl = locale => superUpdateIntl({
    locale: locale,
    messages: locales[locale].messages || locales.en.messages
});

export {
    intlReducer as default,
    IntlProvider,
    intlInitialState,
    updateIntl
};
