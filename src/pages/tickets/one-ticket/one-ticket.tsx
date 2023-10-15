import classNames from 'classnames';

import panelStyles from '@/pages/panel.module.css';
import { ITicket } from '@/services/ticket-validation-scheme';

import cssStyles from './one-ticket.module.css';
import ticketLogoIcon from './ticket-logo-icon.svg';

function transferTextMessage(stops: unknown[]) {
  const count = stops.length;
  let suffix = '';
  switch (count) {
    case 0:
      suffix = 'пересадок';
      break;
    case 1:
      suffix = 'пересадка';
      break;
    case 2:
      suffix = 'пересадки';
      break;
    case 3:
      suffix = 'пересадки';
      break;
    case 4:
      suffix = 'пересадки';
      break;
  }

  return `${count.toFixed()} ${suffix}`;
}

export function OneTicket({ ticket }: { ticket: ITicket }) {
  const price = new Intl.NumberFormat('ru').format(ticket.price);

  return (
    <>
      <div className={classNames(panelStyles.panelColorAndBorder, cssStyles.ticketLayout)}>
        <div className={cssStyles.flexRowSpaceBetween}>
          <div className={cssStyles.price}>{`${price} Р`}</div>
          <img src={ticketLogoIcon} alt="Company Logo" width={'110px'} height={'36px'} />
        </div>
        <div className={classNames(cssStyles.flexRow, cssStyles.elemGray, cssStyles.marginTop20)}>
          <div
            className={cssStyles.elemWidth}
          >{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</div>
          <div className={cssStyles.elemWidth}>В пути</div>
          <div className={cssStyles.elemWidth}>{transferTextMessage(ticket.segments[0].stops)}</div>
        </div>
        <div className={classNames(cssStyles.flexRow, cssStyles.elemBlack)}>
          <div
            className={cssStyles.elemWidth}
          >{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</div>
          <div className={cssStyles.elemWidth}>В пути</div>
          <div className={cssStyles.elemWidth}>{ticket.segments[0].stops.join(', ')}</div>
        </div>
        <div className={classNames(cssStyles.flexRow, cssStyles.elemGray, cssStyles.marginTop10)}>
          <div
            className={cssStyles.elemWidth}
          >{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</div>
          <div className={cssStyles.elemWidth}>В пути</div>
          <div className={cssStyles.elemWidth}>{transferTextMessage(ticket.segments[0].stops)}</div>
        </div>
        <div className={classNames(cssStyles.flexRow, cssStyles.elemBlack)}>
          <div
            className={cssStyles.elemWidth}
          >{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}</div>
          <div className={cssStyles.elemWidth}>В пути</div>
          <div className={cssStyles.elemWidth}>{ticket.segments[0].stops.join(', ')}</div>
        </div>
      </div>
    </>
  );
}
