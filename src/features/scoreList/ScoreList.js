import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getScore,
  deleteScore,
  startNew
} from './scoreListSlice';
import {Table, Modal, Button} from 'antd';
import {DeleteTwoTone, ExclamationCircleOutlined} from '@ant-design/icons';
import {ScoreModal} from './ScoreModal';

export function ScoreList () {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const score = useSelector(getScore);
  const columns = [
    {
      title: 'Ronde',
      dataIndex: 'round',
      key: 'round'
    },
    {
      title: 'Wij',
      dataIndex: 'wij',
      key: 'wij'
    },
    {
      title: 'Zij',
      dataIndex: 'zij',
      key: 'zij'
    },
    {
      title: '',
      key: 'delete',
      render: (itm) => {
        return <div className='deleteButton'>
          <DeleteTwoTone twoToneColor='#eb2f96' onClick={() => {dispatch(deleteScore(itm.key));}} />
        </div>;
      }
    }
  ];

  const {confirm} = Modal;

  function showConfirm () {
    confirm({
      title: 'Wil je een nieuw spel starten?',
      icon: <ExclamationCircleOutlined />,
      content: 'Alle scores worden gereset.',
      cancelText: 'Annuleren',
      okText: 'Bevestigen',
      onOk () {
        dispatch(startNew());
      }
    });
  }

  const scoreModal = ScoreModal(isModalVisible, setIsModalVisible);

  return (
    <div>
      <Table
        dataSource={score}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: 'Nog geen score ingevoerd'
        }}
        summary={pageData => {
          let totalWij = 0;
          let totalZij = 0;

          pageData.forEach(({wij, zij}) => {
            totalWij += wij;
            totalZij += zij;
          });

          return (
            <>
              <tr>
                <th>Totaal</th>
                <td>
                  <strong>{totalWij}</strong>
                </td>
                <td>
                  <strong>{totalZij}</strong>
                </td>
                <td />
              </tr>
            </>
          );
        }} />

      <div className='buttonContainer'>
        <Button type='primary' onClick={() => setIsModalVisible(true)}>
          Score invoeren
        </Button>
        <Button type='secundary' onClick={showConfirm}>
          Nieuw spel starten
        </Button>
      </div>

      {scoreModal}
    </div>
  );
}
