import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getScore,
  addScore
} from './scoreListSlice';
import {Table, Modal, Button, InputNumber} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

export function ScoreList () {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scoreWij, setScoreWij] = useState(0);
  const [scoreZij, setScoreZij] = useState(0);
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
      render: () => {
        return <div className='deleteButton'><DeleteOutlined /></div>;
      }
    }
  ];

  return (
    <div>
      <Table dataSource={score} columns={columns} pagination={false} summary={pageData => {
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
      </div>

      <Modal
        onCancel={() => setIsModalVisible(false)}
        title='Voer een nieuwe score in'
        centered
        visible={isModalVisible}
        footer={[
          <Button key='back' onClick={() => setIsModalVisible(false)}>
            Annuleren
          </Button>,
          <Button key='submit' type='primary' onClick={() => {
            dispatch(addScore({wij: scoreWij, zij: scoreZij}));
            setIsModalVisible(false);
            setScoreZij(0);
            setScoreWij(0);
          }}>
            Opslaan
          </Button>
        ]}
      >
        <div className='inputScore'>
          <InputNumber
            defaultValue={scoreWij}
            min={0}
            max={262}
            onChange={(value) => {
              setScoreWij(value);
            }}
          />
          <InputNumber
            defaultValue={scoreZij}
            min={0}
            max={262}
            onChange={(value) => {
              setScoreZij(value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
