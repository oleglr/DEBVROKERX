import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '@deriv/shared';
import { Button, Loading, Text } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import 'Sass/cashier-container.scss';

const CashierContainer = ({ iframe_height, iframe_url, clearIframe, is_crypto, is_loading }) => {
    const history = useHistory();

    React.useEffect(() => {
        return () => {
            clearIframe();
        };
    }, [clearIframe]);

    return (
        <div className='cashier__wrapper'>
            {is_loading && <Loading is_fullscreen />}
            {iframe_url && (
                <iframe
                    className='cashier__content'
                    height={iframe_height}
                    src={iframe_url}
                    frameBorder='0'
                    scrolling='auto'
                />
            )}
            {is_crypto && (
                <div className='cashier-container__transfer-onramp'>
                    <div className='cashier-container__transfer-onramp__header'>
                        <Text line_height='xxl'>
                            <Localize i18n_default_text='Looking for a way to buy cryptocurrency?' />
                        </Text>
                    </div>
                    <div>
                        <Button
                            className='cashier-container__transfer-onramp__button'
                            has_effect
                            text={localize('Try our Fiat onramp')}
                            onClick={() => history.push(routes.cashier_onramp)}
                            primary
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

CashierContainer.propTypes = {
    iframe_height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iframe_url: PropTypes.string,
    clearIframe: PropTypes.func,
    is_crypto: PropTypes.bool,
    is_loading: PropTypes.bool,
};

export default CashierContainer;
