import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { TRANSFER_PARAM } from '@/app-constants';
import panelStyles from '@/pages/panel.module.css';
import { getNewSearcParams } from '@/utils/get-new-searc-params';

import checkIconChecked from './check-icon-checked.svg';
import checkIconEmpty from './check-icon-empty.svg';
import styles from './transfer-filter.module.css';

const ITEMS = [
  { value: -1, label: 'Все' },
  { value: 0, label: 'Бес пересадок' },
  { value: 1, label: '1 пересадка' },
  { value: 2, label: '2 пересадки' },
  { value: 3, label: '3 пересадки' },
];

export function TransferFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const transferParam000 = parseInt(searchParams.get(TRANSFER_PARAM) ?? '', 10);
  const transferParam = isNaN(transferParam000) ? -1 : transferParam000;

  function handleItemClicked(value: number) {
    const newParams = getNewSearcParams(searchParams);
    if (value === -1) {
      delete newParams[TRANSFER_PARAM];
    } else {
      newParams[TRANSFER_PARAM] = value.toFixed(0);
    }

    setSearchParams(newParams);
  }

  return (
    <div className={classNames(styles.layout, panelStyles.panelColorAndBorder)}>
      <div className={styles.header}>Количество пересадок</div>
      {ITEMS.map(({ value, label }) => (
        <div key={label} className={styles.itemContainer} onClick={() => handleItemClicked(value)}>
          <div className={styles.itemSubcontainer}>
            {transferParam === value ? (
              <img src={checkIconChecked} alt="icon checked" width="20px" height="20px" />
            ) : (
              <img src={checkIconEmpty} alt="icon checked" width="20px" height="20px" />
            )}
            <div className={styles.itemText}>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
