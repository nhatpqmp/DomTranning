import React from 'react';
import './NoticationPopup.scss';

const NotificationPopup = ({notification, hideTimeAgo, truncateProductName, position}) => {
  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated ${position}`}>
      <div className={`Avava-SP__Inner`}>
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${notification.productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {notification.firstName} in {notification.city}, {notification.country}
              </div>
              <div className={`Avada-SP__Subtitle${truncateProductName ? ' truncate' : ''}`}>
                purchased {notification.productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {!hideTimeAgo && notification.dayAgo && (
                  <>
                    {notification.dayAgo}{' '}
                    <span className="uni-blue">
                      <i className="fa fa-check" aria-hidden="true" /> by Avada
                    </span>
                  </>
                )}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
