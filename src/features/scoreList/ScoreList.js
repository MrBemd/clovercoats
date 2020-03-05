import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getScore,
  addScore,
  deleteScore,
  startNew
} from './scoreListSlice';
import {Table, Modal, Button, InputNumber} from 'antd';
import {DeleteTwoTone, ExclamationCircleOutlined} from '@ant-design/icons';

export function ScoreList () {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scoreWij, setScoreWij] = useState();
  const [scoreZij, setScoreZij] = useState();
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
          Nieuwe ronde starten
        </Button>
      </div>

      <Modal
        onCancel={() => setIsModalVisible(false)}
        title='Voer een nieuwe score in'
        visible={isModalVisible}
        footer={[
          <Button key='back' onClick={() => setIsModalVisible(false)}>
            Annuleren
          </Button>,
          <Button
            key='submit'
            type='primary'
            disabled={scoreWij === undefined || scoreZij === undefined}
            onClick={() => {
              dispatch(addScore({wij: scoreWij, zij: scoreZij}));
              setIsModalVisible(false);
              setScoreZij(null);
              setScoreWij(null);
            }}>
            Opslaan
          </Button>
        ]}
      >
        <div className='inputScore'>
          <InputNumber
            type='tel'
            value={scoreWij}
            min={0}
            max={262}
            onChange={(value) => {
              const diff = (162 - value) > 0 ? 162 - value : 0;
              setScoreWij(value);
              setScoreZij(diff);
            }}
          />
          <InputNumber
            type='tel'
            value={scoreZij}
            min={0}
            max={262}
            onChange={(value) => {
              const diff = (162 - value) > 0 ? 162 - value : 0;
              setScoreZij(value);
              setScoreWij(diff);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
