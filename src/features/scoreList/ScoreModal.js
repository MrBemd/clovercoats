import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, InputNumber, Modal, Row, Col, Slider} from 'antd';
import {addScore} from './scoreListSlice';

export function ScoreModal (isModalVisible, setIsModalVisible) {
  const dispatch = useDispatch();
  const [scoreWij, setScoreWij] = useState();
  const [scoreZij, setScoreZij] = useState();
  const [roemWij, setRoemWij] = useState(0);
  const [roemZij, setRoemZij] = useState(0);

  return (
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
            dispatch(addScore({wij: scoreWij + roemWij, zij: scoreZij + roemZij}));
            setIsModalVisible(false);
            setScoreZij(null);
            setScoreWij(null);
            setRoemWij(0);
            setRoemZij(0);
          }}>
          Opslaan
        </Button>
      ]}
    >
      <Row>
        <Col span={6} offset={3}>
          <div className='center scoreLabel'>Wij</div>
          <InputNumber
            placeholder='0'
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
          <div className='center'>Roem {roemWij}</div>
          <Slider value={roemWij} defaultValue={0} min={0} max={100} step={10} onChange={(value) => {
            setRoemWij(value);
          }} />
        </Col>
        <Col span={6} offset={6}>
          <div className='center scoreLabel'>Zij</div>
          <InputNumber
            placeholder='0'
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
          <div className='center'>Roem {roemZij}</div>
          <Slider value={roemZij} defaultValue={0} min={0} max={100} step={10} onChange={(value) => {
            setRoemZij(value);
          }} />
        </Col>
      </Row>
    </Modal>
  );
}
